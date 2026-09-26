-- Restrict admin data to named admins.
--
-- Problem: every "Admin full access" policy used
--   USING (auth.role() = 'authenticated')
-- which means ANY signed-in Supabase user can read and write bookings,
-- customers, drivers (incl. password hashes and ID documents), invoices,
-- promo codes, etc. With public sign-up enabled on the project, anyone can
-- create such a user. The ADMIN_EMAILS env var only protects the API
-- routes, not direct database access from the browser.
--
-- Fix: an allowlist table + is_admin() function, and every admin policy
-- rewritten to use it. Public policies (booking inserts, published blogs,
-- approved reviews, driver applications...) are untouched.
--
-- How to run: Supabase dashboard -> SQL Editor -> paste this file ->
-- replace the email(s) in STEP 1 -> Run. Safe to run more than once.

-- STEP 1: who is an admin. Use the exact email(s) you log in to /admin with.
CREATE TABLE IF NOT EXISTS public.admin_users (
    email text PRIMARY KEY
);
-- No policies on purpose: only the service role (server) can read/edit it.
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

INSERT INTO public.admin_users (email) VALUES
    ('REPLACE_WITH_YOUR_ADMIN_EMAIL@example.com')
ON CONFLICT (email) DO NOTHING;

-- STEP 2: the check every policy uses.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    );
$$;

-- STEP 3: rewrite "Admin full access" on every table that has it.
DO $$
DECLARE
    t text;
BEGIN
    FOREACH t IN ARRAY ARRAY[
        'bookings', 'support_inquiries', 'newsletter_subscribers', 'blogs',
        'blog_comments', 'reviews', 'questions', 'drivers',
        'driver_vehicle_changes', 'driver_expenses', 'driver_documents',
        'driver_vehicle_maintenance', 'driver_advance_repayments',
        'driver_settlements', 'customer_notes', 'email_templates',
        'whatsapp_templates', 'b2b_leads', 'promo_codes', 'locations',
        'booking_audit_logs', 'fleet', 'pricing_rules'
    ]
    LOOP
        IF to_regclass('public.' || t) IS NOT NULL THEN
            EXECUTE format('DROP POLICY IF EXISTS "Admin full access" ON public.%I', t);
            EXECUTE format(
                'CREATE POLICY "Admin full access" ON public.%I FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin())',
                t
            );
        END IF;
    END LOOP;
END $$;

-- Check: should list your admin email(s).
SELECT email FROM public.admin_users;
