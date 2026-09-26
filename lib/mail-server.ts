import nodemailer, { type Transporter } from 'nodemailer';
import { Resend } from 'resend';

/**
 * Outbound email for the whole site.
 *
 * Two sending identities, both mailboxes on ImprovMX, sent through their
 * SMTP server with Nodemailer:
 *   - booking@  → anything about a specific booking (confirmations, quotes,
 *                 invoices, receipts, status changes, reminders, driver trips)
 *   - info@     → everything else (contact form, newsletter, B2B, driver
 *                 sign-up / OTP, admin notices)
 *
 * Each mailbox has its own SMTP credentials (ImprovMX → domain → SMTP
 * credentials). Resend is kept only as a fallback for a sender whose SMTP
 * credentials aren't configured, so existing deployments keep working.
 */

export type Sender = 'booking' | 'info';

const DOMAIN = process.env.EMAIL_DOMAIN || process.env.RESEND_EMAIL_DOMAIN || 'taxibahraintodammam.com';
const BRAND = 'Taxi Bahrain to Dammam';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.improvmx.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);

type Identity = { address: string; name: string; user?: string; pass?: string };

// Shared SMTP login, e.g. one Gmail account that has booking@ and info@
// added as "Send mail as" aliases. A mailbox with its own *_EMAIL_PASS logs
// in as itself instead.
const SHARED_USER = process.env.SMTP_USER;
const SHARED_PASS = process.env.SMTP_PASSWORD;

function login(ownUser: string | undefined, ownPass: string | undefined) {
    return ownPass ? { user: ownUser, pass: ownPass } : { user: SHARED_USER, pass: SHARED_PASS };
}

const IDENTITIES: Record<Sender, Identity> = {
    booking: {
        address: process.env.BOOKING_EMAIL_USER || `booking@${DOMAIN}`,
        name: `${BRAND} Bookings`,
        ...login(process.env.BOOKING_EMAIL_USER, process.env.BOOKING_EMAIL_PASS),
    },
    info: {
        // EMAIL_USER / EMAIL_PASS are the older single-mailbox variables; still honoured for info@.
        address: process.env.INFO_EMAIL_USER || process.env.EMAIL_USER || `info@${DOMAIN}`,
        name: BRAND,
        ...login(
            process.env.INFO_EMAIL_USER || process.env.EMAIL_USER,
            process.env.INFO_EMAIL_PASS || process.env.EMAIL_PASS
        ),
    },
};

// One transporter per SMTP login (both senders share one when using SMTP_USER).
const transporters = new Map<string, Transporter>();

function transporterFor(sender: Sender): Transporter | null {
    const id = IDENTITIES[sender];
    if (!id.user || !id.pass) return null;
    let t = transporters.get(id.user);
    if (!t) {
        t = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_PORT === 465, // 587 upgrades with STARTTLS
            auth: { user: id.user, pass: id.pass },
        });
        transporters.set(id.user, t);
    }
    return t;
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface Attachment {
    filename: string;
    content: string; // base64 encoded
}

export async function sendMail({
    to,
    cc,
    subject,
    html,
    sender = 'info',
    fromName,
    replyTo,
    attachments,
}: {
    to: string;
    cc?: string[];
    subject: string;
    html: string;
    /** Which mailbox the email comes from. Defaults to info@. */
    sender?: Sender;
    fromName?: string;
    replyTo?: string;
    attachments?: Attachment[];
}) {
    const id = IDENTITIES[sender];
    const from = `"${fromName ?? id.name}" <${id.address}>`;
    const reply = replyTo || id.address;
    const ccList = cc?.length ? cc : undefined;

    // 1. Nodemailer over ImprovMX SMTP (primary)
    const smtp = transporterFor(sender);
    if (smtp) {
        try {
            const info = await smtp.sendMail({
                from,
                to,
                cc: ccList?.join(', '),
                subject,
                html,
                replyTo: reply,
                attachments: attachments?.map((a) => ({
                    filename: a.filename,
                    content: Buffer.from(a.content, 'base64'),
                    contentType: 'application/pdf',
                })),
            });
            console.log(`✅ [${sender}@] email sent via SMTP: ${info.messageId}`);
            return info;
        } catch (error) {
            if (!resend) throw error;
            console.error(`❌ [${sender}@] SMTP failed, trying Resend:`, error);
        }
    }

    // 2. Resend fallback, from the same address
    if (resend) {
        const { data, error } = await resend.emails.send({
            from: `${fromName ?? id.name} <${id.address}>`,
            to,
            cc: ccList,
            subject,
            html,
            replyTo: reply,
            attachments: attachments?.map((a) => ({ filename: a.filename, content: a.content })),
        });
        if (error) throw new Error(`Resend failed for ${sender}@: ${error.message}`);
        console.log(`✅ [${sender}@] email sent via Resend: ${data?.id}`);
        return data;
    }

    console.warn(`⚠️ Email skipped: no SMTP credentials for ${sender}@ and no Resend key.`);
    return { message: 'Email skipped (no credentials configured)' };
}

/** Which senders are ready to send, for the test route. Never exposes secrets. */
export function mailStatus() {
    return (Object.keys(IDENTITIES) as Sender[]).map((sender) => ({
        sender,
        address: IDENTITIES[sender].address,
        smtpConfigured: Boolean(IDENTITIES[sender].user && IDENTITIES[sender].pass),
        smtpHost: SMTP_HOST,
        smtpPort: SMTP_PORT,
        resendFallback: Boolean(resend),
    }));
}
