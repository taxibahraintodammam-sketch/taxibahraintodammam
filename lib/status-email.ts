import { sendMail } from '@/lib/mail-server';
import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * Customer emails for booking status changes, shared by the admin UI
 * (/api/send-status-email), bulk status updates and online quote acceptance
 * (/api/booking/accept-quote), so every path sends the same email without
 * one API route having to call another over HTTP.
 */

export const STATUS_EMAIL_STATUSES = ['quote_sent', 'confirmed', 'in_progress', 'cancelled', 'completed'] as const;
export type EmailStatus = (typeof STATUS_EMAIL_STATUSES)[number];

const SITE = 'https://taxibahraintodammam.com';

export function escapeHtml(str: string | undefined | null): string {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export function shortRef(bookingId: string) {
    return bookingId.slice(0, 8).toUpperCase();
}

export function buildStatusEmail(
    status: string,
    { bookingId, customerName, totalPrice, currency }: { bookingId: string; customerName?: string; totalPrice?: number | string | null; currency?: string | null }
): { subject: string; html: string } | null {
    const safeName = escapeHtml(customerName);
    const ref = `<span style="font-family: monospace; background: #f0f0f0; padding: 2px 6px; border-radius: 4px;">#${shortRef(bookingId)}</span>`;

    const wrapperStart = `
        <div style="font-family: Arial, sans-serif; padding: 25px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 25px;">
                <h2 style="color: #000; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Status Update</h2>
                <div style="width: 50px; height: 3px; background-color: #C6FF00; margin: 10px auto;"></div>
            </div>
            <p>Dear <strong>${safeName}</strong>,</p>
        `;
    const wrapperEnd = `
            <p style="margin-top: 30px;">Best regards,<br><strong>Customer Success Team</strong><br>Taxi Bahrain to Dammam</p>
        </div>
        `;

    switch (status) {
        case 'quote_sent': {
            const curr = escapeHtml(currency || 'BHD');
            const price = totalPrice ? `${curr} ${Number(totalPrice).toFixed(2)}` : null;
            // Full id: the accept page and API need it, and it's unguessable (unlike the 8-char ref).
            const acceptUrl = `${SITE}/booking/quote/?id=${encodeURIComponent(bookingId)}`;
            return {
                subject: `💰 Your Quote is Ready - Taxi Bahrain to Dammam`,
                html: `${wrapperStart}
                    <p>Thank you for choosing <strong>Taxi Bahrain to Dammam</strong>. Your official quote for booking ${ref} is ready.</p>
                    ${price ? `<div style="background-color: #000; color: #fff; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0;">
                        <p style="margin: 0 0 4px; font-size: 12px; color: #aaa; text-transform: uppercase; letter-spacing: 2px;">Total Quote Price</p>
                        <p style="margin: 0; font-size: 32px; font-weight: 900; color: #C6FF00;">${price}</p>
                        <p style="margin: 8px 0 0; font-size: 11px; color: #777;">Includes fuel, toll &amp; all fees</p>
                    </div>` : ''}
                    <p style="font-size: 14px; color: #555;">This quote is valid for <strong>48 hours</strong>. Click below to accept and confirm your booking instantly.</p>
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="${acceptUrl}" style="background-color: #C6FF00; color: #000; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-weight: 900; display: inline-block; font-size: 16px;">✅ Accept Quote Online</a>
                    </div>
                    <p style="font-size: 13px; color: #777; text-align: center;">Or reply to this email / WhatsApp us to confirm.</p>
                ${wrapperEnd}`,
            };
        }
        case 'in_progress':
            return {
                subject: '🚗 Your Driver is On the Way - Taxi Bahrain to Dammam',
                html: `${wrapperStart}
                    <p>Great news! Your driver for booking ${ref} is on the way to your pickup location.</p>
                    <div style="background-color: #F6FFF0; border-left: 4px solid #C6FF00; padding: 15px; margin: 20px 0;">
                        <p style="margin: 0; font-weight: bold; color: #000;">Driver is En Route</p>
                        <p style="margin: 5px 0 0; font-size: 14px; color: #555;">Please be ready at your pickup point. If you need to contact your driver, reply to this email or contact our support.</p>
                    </div>
                ${wrapperEnd}`,
            };
        case 'confirmed':
            return {
                subject: '✅ Booking Confirmed - Taxi Bahrain to Dammam',
                html: `${wrapperStart}
                    <p>We are pleased to inform you that your booking ${ref} has been <strong>successfully confirmed</strong>.</p>
                    <p>Our chauffeur will be ready at your specified pickup location and time. You will receive a notification when they are on the way.</p>
                    <div style="background-color: #F6FFF0; border-left: 4px solid #C6FF00; padding: 15px; margin: 20px 0;">
                        <p style="margin: 0; font-weight: bold; color: #000;">Prepared for Departure</p>
                        <p style="margin: 5px 0; font-size: 14px;">Your luxury vehicle has been reserved and our team is finalizing your route.</p>
                    </div>
                ${wrapperEnd}`,
            };
        case 'cancelled':
            return {
                subject: 'Booking Cancellation - Taxi Bahrain to Dammam',
                html: `${wrapperStart}
                    <p>Your booking ${ref} has been <strong>cancelled</strong> as per your request or system update.</p>
                    <p>If you believe this is an error or would like to reschedule, please reply to this email immediately.</p>
                ${wrapperEnd}`,
            };
        case 'completed':
            return {
                subject: '🌟 Your Trip with Taxi Bahrain to Dammam',
                html: `${wrapperStart}
                    <p>Thank you for choosing <strong>Taxi Bahrain to Dammam</strong> for your recent journey.</p>
                    <p>We hope you enjoyed the premium experience. Your feedback helps us maintain our leading standards in Saudi Arabia.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://www.trustpilot.com/review/taxibahraintodammam.com" style="background-color: #00B67A; color: #fff; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">⭐ Leave a Review on Trustpilot</a>
                    </div>
                ${wrapperEnd}`,
            };
        default:
            return null;
    }
}

async function appendEmailLog(bookingId: string, entry: string) {
    const { data } = await supabaseAdmin.from('bookings').select('internal_notes').eq('id', bookingId).single();
    const existing = data?.internal_notes || '';
    const updated = existing ? `${existing}\n${entry}` : entry;
    await supabaseAdmin.from('bookings').update({ internal_notes: updated }).eq('id', bookingId);
}

/** Sends the status email (if this status has one) and logs it on the booking. Returns false if none applies. */
export async function sendStatusEmail(params: {
    bookingId: string;
    status: string;
    customerEmail: string;
    customerName?: string;
    totalPrice?: number | string | null;
    currency?: string | null;
}): Promise<boolean> {
    const email = buildStatusEmail(params.status, params);
    if (!email) return false;

    await sendMail({ sender: 'booking', to: params.customerEmail, subject: email.subject, html: email.html });

    const logTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Riyadh', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    const statusLabel = params.status.charAt(0).toUpperCase() + params.status.slice(1);
    await appendEmailLog(params.bookingId, `📧 [${logTime}] Status email — ${statusLabel}`).catch(() => {});
    return true;
}
