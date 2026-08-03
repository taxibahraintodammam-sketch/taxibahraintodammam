import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendMail } from '@/lib/mail-server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DOC_TYPE_LABEL: Record<string, string> = {
    license: 'Driving License',
    iqama_id: 'Iqama / ID',
    vehicle_registration: 'Vehicle Registration',
    insurance: 'Insurance',
    other: 'Document',
};

// Meant to be hit daily by an external scheduler (Vercel Cron, or any cron
// service) with `Authorization: Bearer ${CRON_SECRET}` — same convention as
// app/api/cron/send-reminders. Each document is only ever emailed about
// once (reminder_sent), so re-running this on a schedule won't spam anyone.
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + 30);
    const cutoffStr = cutoff.toLocaleDateString('en-CA');

    const { data: docs, error } = await supabaseAdmin
        .from('driver_documents')
        .select('id, doc_type, expiry_date, driver_id, drivers(full_name, email)')
        .eq('reminder_sent', false)
        .not('expiry_date', 'is', null)
        .lte('expiry_date', cutoffStr);

    if (error) {
        console.error('driver-document-reminders query error:', error);
        return NextResponse.json({ error: 'Failed to load documents' }, { status: 500 });
    }
    if (!docs || docs.length === 0) {
        return NextResponse.json({ sent: 0 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    let sent = 0;

    for (const doc of docs) {
        const driver = Array.isArray(doc.drivers) ? doc.drivers[0] : doc.drivers;
        const docLabel = DOC_TYPE_LABEL[doc.doc_type] || 'Document';
        const expiryDate = new Date(doc.expiry_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const isExpired = new Date(doc.expiry_date) < new Date();

        try {
            if (driver?.email) {
                await sendMail({
                    to: driver.email,
                    subject: isExpired
                        ? `⚠️ Your ${docLabel} has expired`
                        : `⏰ Your ${docLabel} expires on ${expiryDate}`,
                    html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333; max-width: 480px; margin: 0 auto;">
                        <div style="background-color: #000; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                            <h1 style="margin: 0; color: #C6FF00; font-size: 18px;">Document Reminder</h1>
                        </div>
                        <div style="padding: 25px; border: 1px solid #eee; border-top: none; border-radius: 0 0 10px 10px; background-color: #fff;">
                            <p>Hi ${driver.full_name || 'there'},</p>
                            <p>Your <strong>${docLabel}</strong> ${isExpired ? 'expired on' : 'is set to expire on'} <strong>${expiryDate}</strong>.</p>
                            <p>Please renew it and upload the new copy in your driver portal as soon as possible.</p>
                        </div>
                    </div>`,
                });
            }

            if (adminEmail) {
                await sendMail({
                    to: adminEmail,
                    subject: `Driver document ${isExpired ? 'expired' : 'expiring soon'}: ${driver?.full_name || 'Unknown driver'} — ${docLabel}`,
                    html: `<p>${driver?.full_name || 'A driver'}'s <strong>${docLabel}</strong> ${isExpired ? 'expired on' : 'expires on'} <strong>${expiryDate}</strong>.</p>`,
                });
            }

            await supabaseAdmin.from('driver_documents').update({ reminder_sent: true }).eq('id', doc.id);
            sent++;
        } catch (err) {
            console.error(`Failed to send reminder for document ${doc.id}:`, err);
        }
    }

    return NextResponse.json({ sent });
}
