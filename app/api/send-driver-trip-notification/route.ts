import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function escapeHtml(str: string | undefined | null): string {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function formatTime12h(timeStr?: string): string {
    if (!timeStr) return '—';
    try {
        const parts = timeStr.split(':');
        if (parts.length < 2) return timeStr;
        let hours = parseInt(parts[0], 10);
        const minutes = parts[1];
        if (isNaN(hours)) return timeStr;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${ampm}`;
    } catch {
        return timeStr;
    }
}

// Sent automatically the moment a booking's driver_id is saved — this is
// the driver-facing counterpart to send-driver-assignment, which notifies
// the customer instead. Looks the driver's email up server-side from
// driver_id rather than trusting whatever the client sends.
export async function POST(request: NextRequest) {
    try {
        const session = await getAdminSession(request);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { bookingId } = await request.json();
        if (!bookingId) {
            return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
        }

        const { data: booking, error: bookingError } = await supabaseAdmin
            .from('bookings')
            .select('id, driver_id, pickup_location, destination, pickup_date, pickup_time, vehicle_type, passengers, customer_name, customer_phone, special_requests, currency, total_price')
            .eq('id', bookingId)
            .single();

        if (bookingError || !booking || !booking.driver_id) {
            return NextResponse.json({ error: 'Booking or driver not found' }, { status: 404 });
        }

        const { data: driver, error: driverError } = await supabaseAdmin
            .from('drivers')
            .select('full_name, email')
            .eq('id', booking.driver_id)
            .single();

        if (driverError || !driver || !driver.email) {
            return NextResponse.json({ error: 'Driver has no email on file' }, { status: 404 });
        }

        const refId = `#${String(booking.id).slice(0, 8).toUpperCase()}`;

        await sendMail({
            to: driver.email,
            subject: `🚗 New Trip Assigned — ${booking.pickup_date} at ${formatTime12h(booking.pickup_time)}`,
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #000; padding: 25px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="margin: 0; color: #C6FF00; text-transform: uppercase; letter-spacing: 2px;">New Trip Assigned</h1>
                </div>
                <div style="padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 10px 10px; background-color: #fff;">
                    <p style="font-size: 16px;">Hi <strong>${escapeHtml(driver.full_name)}</strong>,</p>
                    <p>You've been assigned a new trip (Ref: ${refId}):</p>
                    <div style="background-color: #f8f9fa; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #ebedf0;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                            <tr><td style="padding: 5px 0; color: #666; width: 40%;">Pickup</td><td style="font-weight: bold; color: #000;">${escapeHtml(booking.pickup_location)}</td></tr>
                            <tr><td style="padding: 5px 0; color: #666;">Destination</td><td style="font-weight: bold; color: #000;">${escapeHtml(booking.destination)}</td></tr>
                            <tr><td style="padding: 5px 0; color: #666;">Date</td><td style="font-weight: bold; color: #000;">${escapeHtml(booking.pickup_date)}</td></tr>
                            <tr><td style="padding: 5px 0; color: #666;">Time</td><td style="font-weight: bold; color: #000; font-size: 16px;">${formatTime12h(booking.pickup_time)}</td></tr>
                            <tr><td style="padding: 5px 0; color: #666;">Vehicle</td><td style="font-weight: bold; color: #000;">${escapeHtml(booking.vehicle_type)}</td></tr>
                            <tr><td style="padding: 5px 0; color: #666;">Passengers</td><td style="font-weight: bold; color: #000;">${booking.passengers}</td></tr>
                            <tr><td style="padding: 5px 0; color: #666;">Customer</td><td style="font-weight: bold; color: #000;">${escapeHtml(booking.customer_name)}</td></tr>
                            <tr><td style="padding: 5px 0; color: #666;">Customer Phone</td><td style="font-weight: bold; color: #000;"><a href="tel:${escapeHtml(booking.customer_phone)}" style="color: #16a34a;">${escapeHtml(booking.customer_phone)}</a></td></tr>
                        </table>
                    </div>
                    ${booking.special_requests ? `<p style="font-size: 13px; color: #92400e; background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 12px;">📝 ${escapeHtml(booking.special_requests)}</p>` : ''}
                    <p style="font-size: 13px; color: #999; text-align: center; margin-top: 25px;">Log in to your driver portal to view and manage this trip.</p>
                </div>
            </div>`,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('send-driver-trip-notification error:', err);
        return NextResponse.json({ error: 'Failed to send driver notification' }, { status: 500 });
    }
}
