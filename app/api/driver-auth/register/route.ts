import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request);
        if (!checkRateLimit(`driver-register:${ip}`, 5, 60_000)) {
            return NextResponse.json({ error: 'Too many requests, please try again shortly' }, { status: 429 });
        }

        const body = await request.json();
        const full_name = String(body.full_name || '').trim();
        const phone_number = String(body.phone_number || '').trim();
        const password = String(body.password || '');
        const email = String(body.email || '').trim().toLowerCase();
        const otp = String(body.otp || '').trim();
        const city = String(body.city || '').trim();
        const vehicle_model = String(body.vehicle_model || '').trim();
        const vehicle_plate = body.vehicle_plate ? String(body.vehicle_plate).trim() : null;

        if (!full_name || !phone_number || !email || !city || !vehicle_model) {
            return NextResponse.json({ error: 'Full name, phone, email, city and vehicle are required' }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
        }
        if (!otp) {
            return NextResponse.json({ error: 'Enter the verification code sent to your email' }, { status: 400 });
        }

        const { data: otpRow } = await supabaseAdmin
            .from('driver_otp_verifications')
            .select('id, expires_at')
            .eq('email', email)
            .eq('otp_code', otp)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (!otpRow || new Date(otpRow.expires_at) < new Date()) {
            return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 400 });
        }

        const { data: existing } = await supabaseAdmin
            .from('drivers')
            .select('id')
            .eq('phone_number', phone_number)
            .not('password_hash', 'is', null)
            .maybeSingle();

        if (existing) {
            return NextResponse.json({ error: 'This phone number is already registered. Try logging in instead.' }, { status: 409 });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const { error } = await supabaseAdmin.from('drivers').insert({
            full_name,
            phone_number,
            email,
            city,
            vehicle_model,
            vehicle_plate,
            password_hash,
            access_token: randomUUID(),
            status: 'pending',
        });

        if (error) {
            console.error('driver-auth register error:', error);
            return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
        }

        // Used codes can't be replayed, and no reason to keep spent/expired ones around.
        await supabaseAdmin.from('driver_otp_verifications').delete().eq('email', email);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('driver-auth register POST error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
