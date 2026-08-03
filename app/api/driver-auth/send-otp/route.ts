import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendMail } from '@/lib/mail-server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request);
        if (!checkRateLimit(`driver-send-otp-ip:${ip}`, 5, 60_000)) {
            return NextResponse.json({ error: 'Too many requests, please try again shortly' }, { status: 429 });
        }

        const body = await request.json();
        const email = String(body.email || '').trim().toLowerCase();

        if (!EMAIL_RE.test(email)) {
            return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 });
        }
        // Separate, tighter limit per-email so one address can't be spammed
        // even from rotating IPs.
        if (!checkRateLimit(`driver-send-otp-email:${email}`, 3, 10 * 60_000)) {
            return NextResponse.json({ error: 'Too many codes requested for this email. Please try again later.' }, { status: 429 });
        }

        const otp_code = String(Math.floor(100000 + Math.random() * 900000));
        const expires_at = new Date(Date.now() + 10 * 60_000).toISOString();

        const { error } = await supabaseAdmin.from('driver_otp_verifications').insert({ email, otp_code, expires_at });
        if (error) {
            console.error('driver-auth send-otp insert error:', error);
            return NextResponse.json({ error: 'Failed to send code' }, { status: 500 });
        }

        await sendMail({
            to: email,
            subject: `Your verification code: ${otp_code}`,
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333; max-width: 480px; margin: 0 auto;">
                <div style="background-color: #000; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="margin: 0; color: #C6FF00; font-size: 18px; letter-spacing: 1px;">Taxi Bahrain to Dammam</h1>
                </div>
                <div style="padding: 25px; border: 1px solid #eee; border-top: none; border-radius: 0 0 10px 10px; background-color: #fff; text-align: center;">
                    <p style="margin-top: 0;">Your driver registration verification code is:</p>
                    <p style="font-size: 32px; font-weight: 900; letter-spacing: 8px; margin: 20px 0; color: #000;">${otp_code}</p>
                    <p style="font-size: 13px; color: #999;">This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
                </div>
            </div>`,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('driver-auth send-otp POST error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
