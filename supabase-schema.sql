-- ============================================================================
-- taxibahraintodammam.com — Supabase schema for the admin panel + booking API
-- ============================================================================
-- Reconstructed from how app/admin/** and app/api/** actually query these
-- tables (several admin pages ship their own CREATE TABLE snippet inline for
-- self-service setup; this file collects all of those plus the tables that
-- didn't have one, like `bookings`, into a single script).
--
-- How to run: Supabase Dashboard -> SQL Editor -> paste this whole file -> Run.
-- Safe to re-run: every statement is IF NOT EXISTS / OR REPLACE.
--
-- Auth model actually implemented in lib/admin-auth.ts: any signed-in
-- Supabase user is treated as admin unless the ADMIN_EMAILS env var lists
-- specific allowed emails (checked in the Next.js API layer, not in RLS).
-- So RLS below just distinguishes "authenticated" (signed-in admin) from
-- "public" (anon site visitors), matching what each table actually needs.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- bookings — the core table. Written by the (currently dormant) public quote
-- form and by admin/bookings/**; read/edited only from the admin panel.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       timestamptz NOT NULL DEFAULT now(),
  pickup_location  text NOT NULL,
  destination      text NOT NULL,
  pickup_date      text NOT NULL,
  pickup_time      text NOT NULL,
  vehicle_type     text NOT NULL,
  vehicle_image    text,
  passengers       int NOT NULL DEFAULT 1,
  luggage          int NOT NULL DEFAULT 0,
  customer_name    text NOT NULL,
  customer_phone   text NOT NULL,
  customer_email   text NOT NULL,
  status           text NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending','quote_sent','confirmed','in_progress','cancelled','completed')),
  special_requests text,
  total_price      numeric,
  currency         text,
  payment_status   text,
  payment_method   text,
  driver_name      text,
  driver_phone     text,
  driver_plate     text,
  flight_number    text,
  actual_vehicle   text,
  tags             text,
  internal_notes   text,
  has_return_trip  boolean NOT NULL DEFAULT false,
  child_seats      int,
  reminder_sent    boolean NOT NULL DEFAULT false,
  deleted_at       timestamptz,
  deleted_by       text
);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings (status);
CREATE INDEX IF NOT EXISTS bookings_pickup_date_idx ON bookings (pickup_date);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings (created_at DESC);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can create bookings" ON bookings;
CREATE POLICY "Public can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin full access" ON bookings;
CREATE POLICY "Admin full access" ON bookings
  FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- support_inquiries — /contact form (app/api/send-contact) writes via the
-- service-role key server-side; admin/support/** reads/updates as the signed-in
-- admin, so it still needs an authenticated RLS policy.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS support_inquiries (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  email        text NOT NULL,
  phone        text,
  subject      text NOT NULL,
  message      text NOT NULL,
  status       text NOT NULL DEFAULT 'open' CHECK (status IN ('open','resolved')),
  booking_ref  text,
  admin_notes  text,
  created_at   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS support_inquiries_status_idx ON support_inquiries (status);

ALTER TABLE support_inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON support_inquiries;
CREATE POLICY "Admin full access" ON support_inquiries
  FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- newsletter_subscribers — /api/newsletter writes via the service-role key.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text UNIQUE NOT NULL,
  source     text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON newsletter_subscribers;
CREATE POLICY "Admin full access" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- blogs — public reads published posts; admin/blogs/** manages everything.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blogs (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text NOT NULL,
  slug             text UNIQUE NOT NULL,
  excerpt          text NOT NULL DEFAULT '',
  content          text NOT NULL DEFAULT '',
  featured_image   text,
  category         text NOT NULL DEFAULT 'General',
  tags             text[] NOT NULL DEFAULT '{}',
  author           text NOT NULL DEFAULT '',
  status           text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','scheduled')),
  published_at     timestamptz,
  seo_title        text,
  seo_description  text,
  seo_keywords     text[],
  views            int NOT NULL DEFAULT 0,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS blogs_status_idx ON blogs (status);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published blogs" ON blogs;
CREATE POLICY "Public can read published blogs" ON blogs
  FOR SELECT USING (status = 'published');
DROP POLICY IF EXISTS "Admin full access" ON blogs;
CREATE POLICY "Admin full access" ON blogs
  FOR ALL USING (auth.role() = 'authenticated');

-- Increments blogs.views from the public blog-post page (lib/blogService.ts
-- calls this instead of an UPDATE, so views can go up without a public
-- UPDATE policy on the whole row).
CREATE OR REPLACE FUNCTION increment_blog_view(blog_id uuid)
RETURNS void AS $$
  UPDATE blogs SET views = views + 1 WHERE id = blog_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- ----------------------------------------------------------------------------
-- blog_comments — public can post (goes in as 'pending') and read approved
-- comments; admin moderates.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_comments (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_slug    text NOT NULL,
  name         text NOT NULL,
  email        text NOT NULL,
  comment      text NOT NULL,
  status       text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  admin_reply  text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  approved_at  timestamptz
);
CREATE INDEX IF NOT EXISTS blog_comments_slug_idx ON blog_comments (blog_slug);

ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can submit comments" ON blog_comments;
CREATE POLICY "Public can submit comments" ON blog_comments
  FOR INSERT WITH CHECK (status = 'pending');
DROP POLICY IF EXISTS "Public can read approved comments" ON blog_comments;
CREATE POLICY "Public can read approved comments" ON blog_comments
  FOR SELECT USING (status = 'approved');
DROP POLICY IF EXISTS "Admin full access" ON blog_comments;
CREATE POLICY "Admin full access" ON blog_comments
  FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- reviews — public can submit (goes in as 'pending') and read approved
-- reviews; admin moderates and can attach a response.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text NOT NULL,
  email          text NOT NULL,
  rating         int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title          text NOT NULL,
  review         text NOT NULL,
  route          text,
  travel_date    text,
  location       text,
  service        text,
  status         text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  admin_response text,
  created_at     timestamptz NOT NULL DEFAULT now(),
  approved_at    timestamptz,
  responded_at   timestamptz
);
CREATE INDEX IF NOT EXISTS reviews_status_idx ON reviews (status);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can submit reviews" ON reviews;
CREATE POLICY "Public can submit reviews" ON reviews
  FOR INSERT WITH CHECK (status = 'pending');
DROP POLICY IF EXISTS "Public can read approved reviews" ON reviews;
CREATE POLICY "Public can read approved reviews" ON reviews
  FOR SELECT USING (status = 'approved');
DROP POLICY IF EXISTS "Admin full access" ON reviews;
CREATE POLICY "Admin full access" ON reviews
  FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- questions — public can ask (goes in as 'pending') and read answered
-- questions; admin answers.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS questions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  email        text NOT NULL,
  category     text NOT NULL,
  question     text NOT NULL,
  location     text,
  service      text,
  status       text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','answered','rejected')),
  answer       text,
  answered_by  text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  answered_at  timestamptz
);
CREATE INDEX IF NOT EXISTS questions_status_idx ON questions (status);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can submit questions" ON questions;
CREATE POLICY "Public can submit questions" ON questions
  FOR INSERT WITH CHECK (status = 'pending');
DROP POLICY IF EXISTS "Public can read answered questions" ON questions;
CREATE POLICY "Public can read answered questions" ON questions
  FOR SELECT USING (status = 'answered');
DROP POLICY IF EXISTS "Admin full access" ON questions;
CREATE POLICY "Admin full access" ON questions
  FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- drivers — driver-application intake (public submits, admin reviews). No
-- public read: applications contain personal contact details.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS drivers (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name      text NOT NULL,
  phone_number   text NOT NULL,
  email          text NOT NULL,
  city           text NOT NULL,
  vehicle_model  text NOT NULL,
  vehicle_plate  text,
  status         text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  admin_notes    text,
  created_at     timestamptz NOT NULL DEFAULT now(),
  reviewed_at    timestamptz
);
-- Safe to re-run on a table created before vehicle_plate existed.
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS vehicle_plate text;
-- Unique token for the driver's own no-login self-service link (app/driver/[token]).
-- Generated lazily by the admin panel the first time it's shared, not at signup.
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS access_token text UNIQUE;
CREATE INDEX IF NOT EXISTS drivers_access_token_idx ON drivers (access_token);
-- Self-registration (app/driver/login) — phone + password, no SMS/OTP provider
-- needed. NULL for drivers the admin added directly via "Add Driver" (they
-- only have the token link until/unless they also register a password).
-- Partial index so it only enforces uniqueness among rows that actually
-- have a password, and re-running this migration can't fail on older rows
-- that happen to share a phone number.
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS password_hash text;
CREATE UNIQUE INDEX IF NOT EXISTS drivers_phone_number_password_idx
  ON drivers (phone_number) WHERE password_hash IS NOT NULL;
-- Day-to-day availability, separate from the approval `status` above.
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS duty_status text NOT NULL DEFAULT 'off_duty'
  CHECK (duty_status IN ('on_duty','off_duty','on_leave','suspended'));
CREATE INDEX IF NOT EXISTS drivers_status_idx ON drivers (status);

ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can apply" ON drivers;
CREATE POLICY "Public can apply" ON drivers
  FOR INSERT WITH CHECK (status = 'pending');
DROP POLICY IF EXISTS "Admin full access" ON drivers;
CREATE POLICY "Admin full access" ON drivers
  FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- driver_expenses — company-side money-out ledger per driver (fuel,
-- maintenance, salary advance, penalty deductions). Admin-only: no public
-- access, since it's internal financials. Receipt/fuel-slip photos are
-- uploaded to the 'driver-receipts' Storage bucket (create it manually in
-- the Supabase Dashboard -> Storage -> New bucket -> public, same as
-- 'blog-images') and only the resulting public URL is stored here.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS driver_expenses (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id     uuid NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  category      text NOT NULL DEFAULT 'fuel' CHECK (category IN ('fuel','maintenance','advance','penalty','other')),
  amount        numeric NOT NULL,
  currency      text NOT NULL DEFAULT 'BHD',
  expense_date  date NOT NULL DEFAULT current_date,
  description   text,
  receipt_url   text,
  source        text NOT NULL DEFAULT 'admin' CHECK (source IN ('admin','driver')),
  created_at    timestamptz NOT NULL DEFAULT now()
);
-- Safe to re-run on a table created before source existed.
ALTER TABLE driver_expenses ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'admin' CHECK (source IN ('admin','driver'));
CREATE INDEX IF NOT EXISTS driver_expenses_driver_id_idx ON driver_expenses (driver_id);

ALTER TABLE driver_expenses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON driver_expenses;
CREATE POLICY "Admin full access" ON driver_expenses
  FOR ALL USING (auth.role() = 'authenticated');

-- Link a booking to a roster driver (drivers must already exist above for this
-- FK to resolve, so it's added here rather than inline on the bookings table).
-- driver_name/driver_phone/driver_plate on bookings stay as a point-in-time
-- text snapshot for print/email even if the driver's profile changes later.
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS bookings_driver_id_idx ON bookings (driver_id);

-- Optional link from a customer review to the roster driver it's about, so
-- the admin panel can show a per-driver average rating. Same ordering
-- reason as bookings.driver_id above — drivers must already exist.
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS reviews_driver_id_idx ON reviews (driver_id);

-- ----------------------------------------------------------------------------
-- driver_documents — license, Iqama/ID, vehicle registration, insurance scans
-- per driver, with an expiry_date so the admin panel can flag what's about to
-- lapse. Admin-only, same Storage bucket as driver_expenses ('driver-receipts').
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS driver_documents (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id     uuid NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  doc_type      text NOT NULL DEFAULT 'license' CHECK (doc_type IN ('license','iqama_id','vehicle_registration','insurance','other')),
  document_number text,
  expiry_date   date,
  file_url      text,
  reminder_sent boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);
-- Safe to re-run on a table created before reminder_sent existed.
ALTER TABLE driver_documents ADD COLUMN IF NOT EXISTS reminder_sent boolean NOT NULL DEFAULT false;
CREATE INDEX IF NOT EXISTS driver_documents_driver_id_idx ON driver_documents (driver_id);
CREATE INDEX IF NOT EXISTS driver_documents_expiry_idx ON driver_documents (expiry_date);

ALTER TABLE driver_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON driver_documents;
CREATE POLICY "Admin full access" ON driver_documents
  FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- driver_vehicle_maintenance — service history per driver's vehicle, with a
-- next_due_date so the admin panel can flag what's coming up.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS driver_vehicle_maintenance (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id     uuid NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  service_type  text NOT NULL DEFAULT 'general' CHECK (service_type IN ('oil_change','tire_rotation','inspection','general','other')),
  service_date  date NOT NULL DEFAULT current_date,
  next_due_date date,
  odometer_km   integer,
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS driver_vehicle_maintenance_driver_id_idx ON driver_vehicle_maintenance (driver_id);
CREATE INDEX IF NOT EXISTS driver_vehicle_maintenance_due_idx ON driver_vehicle_maintenance (next_due_date);

ALTER TABLE driver_vehicle_maintenance ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON driver_vehicle_maintenance;
CREATE POLICY "Admin full access" ON driver_vehicle_maintenance
  FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- driver_advance_repayments — money a driver pays back against an 'advance'
-- expense. Outstanding balance = sum(driver_expenses where category='advance')
-- minus sum(this table), computed in the app, not stored.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS driver_advance_repayments (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id    uuid NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  amount       numeric NOT NULL,
  currency     text NOT NULL DEFAULT 'BHD',
  repaid_date  date NOT NULL DEFAULT current_date,
  note         text,
  created_at   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS driver_advance_repayments_driver_id_idx ON driver_advance_repayments (driver_id);

ALTER TABLE driver_advance_repayments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON driver_advance_repayments;
CREATE POLICY "Admin full access" ON driver_advance_repayments
  FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- driver_settlements — a paper trail of what was actually paid out to a
-- driver for a period. The admin reads the Finance panel's earned/spent
-- numbers and logs the agreed payout here; this table doesn't recompute or
-- enforce that math, since payroll/commission terms differ per driver.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS driver_settlements (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id     uuid NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  period_start  date NOT NULL,
  period_end    date NOT NULL,
  amount_paid   numeric NOT NULL,
  currency      text NOT NULL DEFAULT 'BHD',
  note          text,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS driver_settlements_driver_id_idx ON driver_settlements (driver_id);

ALTER TABLE driver_settlements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON driver_settlements;
CREATE POLICY "Admin full access" ON driver_settlements
  FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- driver_otp_verifications — short-lived email verification codes for
-- self-registration (app/driver/login). Only ever read/written by API
-- routes using the service-role key, so no public/authenticated policy is
-- needed — RLS with zero policies denies everything else by default.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS driver_otp_verifications (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text NOT NULL,
  otp_code   text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS driver_otp_verifications_email_idx ON driver_otp_verifications (email);
ALTER TABLE driver_otp_verifications ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- Admin-only utility tables (no public access at all) — every one of these
-- already shipped a matching CREATE TABLE snippet inline in its admin page;
-- collected here verbatim so the whole schema lives in one file.
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS customer_notes (
  phone      text PRIMARY KEY,
  notes      text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE customer_notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON customer_notes;
CREATE POLICY "Admin full access" ON customer_notes FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS email_templates (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title      text NOT NULL,
  category   text NOT NULL DEFAULT 'General',
  subject    text NOT NULL,
  body       text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON email_templates;
CREATE POLICY "Admin full access" ON email_templates FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS whatsapp_templates (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title      text NOT NULL,
  category   text NOT NULL DEFAULT 'Custom',
  body       text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE whatsapp_templates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON whatsapp_templates;
CREATE POLICY "Admin full access" ON whatsapp_templates FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS b2b_leads (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name       text NOT NULL,
  email              text NOT NULL,
  country            text,
  group_name         text NOT NULL DEFAULT 'General',
  status             text NOT NULL DEFAULT 'not_contacted',
  last_contacted_at  timestamptz,
  notes              text,
  created_at         timestamptz DEFAULT now()
);
ALTER TABLE b2b_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON b2b_leads;
CREATE POLICY "Admin full access" ON b2b_leads FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS promo_codes (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code            text UNIQUE NOT NULL,
  discount_type   text CHECK (discount_type IN ('percentage','fixed')) NOT NULL,
  discount_value  numeric NOT NULL,
  max_uses        integer,
  used_count      integer DEFAULT 0,
  expires_at      timestamptz,
  is_active       boolean DEFAULT true,
  created_at      timestamptz DEFAULT now()
);
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON promo_codes;
CREATE POLICY "Admin full access" ON promo_codes FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS locations (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  type       text NOT NULL DEFAULT 'City',
  status     text NOT NULL DEFAULT 'Active',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON locations;
CREATE POLICY "Admin full access" ON locations FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS booking_audit_logs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  uuid NOT NULL,
  admin_email text NOT NULL,
  action      text NOT NULL,
  field_name  text,
  old_value   text,
  new_value   text,
  created_at  timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS booking_audit_logs_booking_id_idx ON booking_audit_logs (booking_id);
ALTER TABLE booking_audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON booking_audit_logs;
CREATE POLICY "Admin full access" ON booking_audit_logs FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS fleet (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  type         text NOT NULL DEFAULT 'Sedan',
  passengers   int  NOT NULL DEFAULT 4,
  luggage      int  NOT NULL DEFAULT 3,
  status       text NOT NULL DEFAULT 'Active',
  price_label  text NOT NULL DEFAULT '',
  created_at   timestamptz DEFAULT now()
);
ALTER TABLE fleet ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON fleet;
CREATE POLICY "Admin full access" ON fleet FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS pricing_rules (
  route      text NOT NULL,
  vehicle    text NOT NULL,
  price      integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (route, vehicle)
);
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access" ON pricing_rules;
CREATE POLICY "Admin full access" ON pricing_rules FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- End of schema.
-- ============================================================================
