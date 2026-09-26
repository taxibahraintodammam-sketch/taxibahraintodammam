import { NextResponse, type NextRequest } from 'next/server';
import { sendMail, mailStatus, type Sender } from '@/lib/mail-server';
import { isInternalRequest } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

/**
 * Sends a test email from booking@ or info@ to that same mailbox (ImprovMX
 * forwards it to you), so the SMTP setup can be checked after deploying.
 *
 *   curl -H "x-internal-secret: $INTERNAL_API_SECRET" \
 *     "https://taxibahraintodammam.com/api/test-resend/?sender=booking"
 *
 * Locked to INTERNAL_API_SECRET: this used to be a public GET that sent an
 * email on every hit. The recipient is never taken from the request, so it
 * can't be used to send mail anywhere else.
 */
export async function GET(request: NextRequest) {
    if (!isInternalRequest(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const param = request.nextUrl.searchParams.get('sender');
    const sender: Sender = param === 'booking' ? 'booking' : 'info';
    const status = mailStatus();
    const target = status.find((s) => s.sender === sender)!;

    try {
        const result = await sendMail({
            sender,
            to: target.address,
            subject: `Email test: ${target.address}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h1 style="color: #000; font-size: 20px;">It works.</h1>
                    <p>This test was sent from <strong>${target.address}</strong> via ${
                        target.smtpConfigured ? `SMTP (${target.smtpHost}:${target.smtpPort})` : 'the Resend fallback'
                    }.</p>
                    <p style="font-size: 12px; color: #666;">Sent at: ${new Date().toISOString()}</p>
                </div>
            `,
        });
        return NextResponse.json({ success: true, sender, status, details: result });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('❌ Email test failed:', error);
        return NextResponse.json({ success: false, sender, status, error: message }, { status: 500 });
    }
}
