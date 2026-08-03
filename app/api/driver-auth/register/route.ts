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
        const email = body.email ? String(body.email).trim() : '';
        const city = String(body.city || '').trim();
        const vehicle_model = String(body.vehicle_model || '').trim();
        const vehicle_plate = body.vehicle_plate ? String(body.vehicle_plate).trim() : null;

        if (!full_name || !phone_number || !city || !vehicle_model) {
            return NextResponse.json({ error: 'Full name, phone, city and vehicle are required' }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
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

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('driver-auth register POST error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
