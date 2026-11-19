-- Tighten the public "create booking" policy.
--
-- Problem: the old policy was  FOR INSERT WITH CHECK (true)  so anyone holding
-- the public anon key could insert a booking that is already 'confirmed',
-- marked 'paid', priced, assigned to a driver (it then shows in that driver's
-- portal), carries admin notes/tags, or is pre-marked as soft-deleted.
--
-- Fix: a public insert must look exactly like what the website's booking form
-- sends (hooks/useBookingFlow.ts) — a fresh 'pending' request with no
-- admin-only fields set, and sane sizes on the free-text fields.
--
-- Run: Supabase dashboard -> SQL Editor -> paste -> Run. Safe to re-run.
-- Run supabase/admin-only-rls.sql as well if you haven't already.

DROP POLICY IF EXISTS "Public can create bookings" ON public.bookings;

DO $$
DECLARE
    has_driver_id boolean := EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'bookings' AND column_name = 'driver_id'
    );
    check_sql text := $q$
        status = 'pending'
        AND total_price IS NULL
        AND payment_status IS NULL
        AND payment_method IS NULL
        AND driver_name IS NULL
        AND driver_phone IS NULL
        AND driver_plate IS NULL
        AND actual_vehicle IS NULL
        AND internal_notes IS NULL
        AND tags IS NULL
        AND deleted_at IS NULL
        AND deleted_by IS NULL
        AND coalesce(reminder_sent, false) = false
        AND length(coalesce(customer_name, ''))    BETWEEN 1 AND 120
        AND length(coalesce(customer_email, ''))   BETWEEN 3 AND 200
        AND length(coalesce(customer_phone, ''))   BETWEEN 5 AND 30
        AND length(coalesce(pickup_location, ''))  BETWEEN 1 AND 300
        AND length(coalesce(destination, ''))      BETWEEN 1 AND 300
        AND length(coalesce(special_requests, '')) <= 2000
        AND coalesce(passengers, 1) BETWEEN 1 AND 60
    $q$;
BEGIN
    IF has_driver_id THEN
        check_sql := check_sql || ' AND driver_id IS NULL';
    END IF;
    EXECUTE format(
        'CREATE POLICY "Public can create bookings" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (%s)',
        check_sql
    );
END $$;
