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
        if (!checkRateLimit(`driver-login:${ip}`, 10, 60_000)) {
            return NextResponse.json({ error: 'Too many requests, please try again shortly' }, { status: 429 });
        }

        const body = await request.json();
        const phone_number = String(body.phone_number || '').trim();
        const password = String(body.password || '');

        if (!phone_number || !password) {
            return NextResponse.json({ error: 'Enter your phone number and password' }, { status: 400 });
        }

        const { data: driver } = await supabaseAdmin
            .from('drivers')
            .select('id, password_hash, status, access_token')
            .eq('phone_number', phone_number)
            .not('password_hash', 'is', null)
            .maybeSingle();

        if (!driver || !driver.password_hash) {
            return NextResponse.json({ error: 'Invalid phone number or password' }, { status: 401 });
        }

        const valid = await bcrypt.compare(password, driver.password_hash);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid phone number or password' }, { status: 401 });
        }

        if (driver.status === 'pending') {
            return NextResponse.json({ error: 'Your application is still awaiting admin approval. Please check back later.' }, { status: 403 });
        }
        if (driver.status !== 'approved') {
            return NextResponse.json({ error: 'Your account is not active. Please contact your manager.' }, { status: 403 });
        }

        let token = driver.access_token;
        if (!token) {
            token = randomUUID();
            await supabaseAdmin.from('drivers').update({ access_token: token }).eq('id', driver.id);
        }

        return NextResponse.json({ success: true, token });
    } catch (err) {
        console.error('driver-auth login POST error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
