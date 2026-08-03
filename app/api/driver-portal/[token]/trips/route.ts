import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getDriverByToken } from '@/lib/driverPortalAuth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// A driver can move a trip forward, not sideways into a state that's really
// an admin/customer decision (cancelling, re-opening a quote, etc).
const DRIVER_SETTABLE_STATUSES = ['in_progress', 'completed'];

const TRIP_FIELDS =
    'id, pickup_location, destination, pickup_date, pickup_time, vehicle_type, ' +
    'passengers, luggage, customer_name, customer_phone, status, special_requests, ' +
    'flight_number, has_return_trip, total_price, currency, payment_status, payment_method';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params;
    const driver = await getDriverByToken(token);
    if (!driver) {
        return NextResponse.json({ error: 'Link invalid or inactive' }, { status: 404 });
    }

    const { data, error } = await supabaseAdmin
        .from('bookings')
        .select(TRIP_FIELDS)
        .eq('driver_id', driver.id)
        .order('pickup_date', { ascending: false });

    if (error) {
        console.error('driver-portal trips GET error:', error);
        return NextResponse.json({ error: 'Failed to load trips' }, { status: 500 });
    }

    return NextResponse.json({ trips: data });
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const ip = getClientIp(request);
        if (!checkRateLimit(`driver-portal-trip-status:${ip}`, 20, 60_000)) {
            return NextResponse.json({ error: 'Too many requests, please try again shortly' }, { status: 429 });
        }

        const { token } = await params;
        const driver = await getDriverByToken(token);
        if (!driver) {
            return NextResponse.json({ error: 'Link invalid or inactive' }, { status: 404 });
        }

        const body = await request.json();
        const bookingId = String(body.booking_id || '');
        const status = String(body.status || '');

        if (!bookingId || !DRIVER_SETTABLE_STATUSES.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('bookings')
            .update({ status })
            .eq('id', bookingId)
            .eq('driver_id', driver.id)
            .select(TRIP_FIELDS)
            .single();

        if (error || !data) {
            return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
        }

        return NextResponse.json({ trip: data });
    } catch (err) {
        console.error('driver-portal trips PATCH error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
