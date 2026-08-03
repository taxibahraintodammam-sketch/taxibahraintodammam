import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Public, booking-id-keyed lookup (the id itself is an unguessable UUID, same
// trust model as the driver portal's access_token). Only returns the subset
// of fields a customer needs to see their own trip status — never
// internal_notes, tags, or other admin-only fields.
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const ip = getClientIp(request);
    if (!checkRateLimit(`track-booking:${ip}`, 30, 60_000)) {
        return NextResponse.json({ error: 'Too many requests, please try again shortly' }, { status: 429 });
    }

    const { id } = await params;

    const { data: booking, error } = await supabaseAdmin
        .from('bookings')
        .select('id, pickup_location, destination, pickup_date, pickup_time, vehicle_type, passengers, status, total_price, currency, has_return_trip, driver_name, driver_phone, driver_plate, actual_vehicle')
        .eq('id', id)
        .single();

    if (error || !booking) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ booking });
}
