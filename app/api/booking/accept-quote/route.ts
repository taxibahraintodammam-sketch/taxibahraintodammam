import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { sendMail } from '@/lib/mail-server';
import { sendStatusEmail, escapeHtml, shortRef } from '@/lib/status-email';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Public: the customer accepts their quote from the link in the quote email. */
export async function POST(request: NextRequest) {
    const ip = getClientIp(request);
    if (!checkRateLimit(`accept-quote:${ip}`, 5, 60_000)) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    let bookingId: unknown;
    try {
        ({ bookingId } = await request.json());
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    if (typeof bookingId !== 'string' || !UUID_RE.test(bookingId)) {
        return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
    }

    const { data: booking, error: fetchError } = await supabaseAdmin
        .from('bookings')
        .select('id, status, customer_name, customer_email, customer_phone, pickup_location, destination, pickup_date, pickup_time, total_price, currency, deleted_at')
        .eq('id', bookingId)
        .maybeSingle();

    if (fetchError || !booking || booking.deleted_at) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status === 'confirmed') {
        return NextResponse.json({ success: true, alreadyConfirmed: true });
    }
    if (!['quote_sent', 'pending'].includes(booking.status)) {
        return NextResponse.json(
            { error: 'Booking cannot be accepted in this state', currentStatus: booking.status },
            { status: 409 }
        );
    }

    const { error: updateError } = await supabaseAdmin
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', bookingId);
    if (updateError) {
        return NextResponse.json({ error: 'Failed to confirm booking' }, { status: 500 });
    }

    // Customer confirmation + admin heads-up. Awaited (not fire-and-forget) so
    // serverless doesn't cut them off; a mail failure doesn't undo the booking.
    const results = await Promise.allSettled([
        booking.customer_email
            ? sendStatusEmail({
                  bookingId: booking.id,
                  status: 'confirmed',
                  customerEmail: booking.customer_email,
                  customerName: booking.customer_name,
              })
            : Promise.resolve(false),
        sendMail({
            sender: 'booking',
            to: process.env.ADMIN_EMAIL || 'booking@taxibahraintodammam.com',
            replyTo: booking.customer_email || undefined,
            subject: `✅ Quote accepted online - #${shortRef(booking.id)} ${escapeHtml(booking.customer_name)}`,
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #000; border-bottom: 2px solid #C6FF00; padding-bottom: 10px;">Quote accepted — booking is now confirmed</h2>
                <p><strong>Booking:</strong> #${shortRef(booking.id)}</p>
                <p><strong>Customer:</strong> ${escapeHtml(booking.customer_name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(booking.customer_email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(booking.customer_phone)}</p>
                <p><strong>Route:</strong> ${escapeHtml(booking.pickup_location)} to ${escapeHtml(booking.destination)}</p>
                <p><strong>Date/Time:</strong> ${escapeHtml(booking.pickup_date)} ${escapeHtml(booking.pickup_time)}</p>
                ${booking.total_price ? `<p><strong>Quoted price:</strong> ${escapeHtml(booking.currency || 'BHD')} ${Number(booking.total_price).toFixed(2)}</p>` : ''}
                <hr>
                <p style="font-size: 12px; color: #666;">Assign a driver in the Admin Dashboard.</p>
            </div>`,
        }),
    ]);
    results.forEach((r) => {
        if (r.status === 'rejected') console.error('accept-quote: email failed', r.reason);
    });

    return NextResponse.json({ success: true });
}
