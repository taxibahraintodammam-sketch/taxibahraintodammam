import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Driver self-service can only log these — advance/penalty are things the
// company applies to a driver, not something a driver should self-report.
const ALLOWED_CATEGORIES = ['fuel', 'maintenance', 'other'];

async function getDriverByToken(token: string) {
    const { data, error } = await supabaseAdmin
        .from('drivers')
        .select('id, full_name, vehicle_model, status')
        .eq('access_token', token)
        .single();

    if (error || !data) return null;
    return data;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params;
    const driver = await getDriverByToken(token);

    if (!driver || driver.status !== 'approved') {
        return NextResponse.json({ error: 'Link invalid or inactive' }, { status: 404 });
    }

    return NextResponse.json({ full_name: driver.full_name, vehicle_model: driver.vehicle_model });
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const ip = getClientIp(request);
        if (!checkRateLimit(`driver-portal:${ip}`, 10, 60_000)) {
            return NextResponse.json({ error: 'Too many requests, please try again shortly' }, { status: 429 });
        }

        const { token } = await params;
        const driver = await getDriverByToken(token);
        if (!driver || driver.status !== 'approved') {
            return NextResponse.json({ error: 'Link invalid or inactive' }, { status: 404 });
        }

        const formData = await request.formData();
        const category = String(formData.get('category') || '');
        const amount = parseFloat(String(formData.get('amount') || ''));
        const currency = String(formData.get('currency') || 'BHD');
        const expense_date = String(formData.get('expense_date') || '');
        const descriptionRaw = formData.get('description');
        const description = descriptionRaw ? String(descriptionRaw) : undefined;
        const file = formData.get('file') as File | null;

        if (!ALLOWED_CATEGORIES.includes(category)) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }
        if (!amount || amount <= 0) {
            return NextResponse.json({ error: 'Enter a valid amount' }, { status: 400 });
        }
        if (!expense_date) {
            return NextResponse.json({ error: 'Missing date' }, { status: 400 });
        }

        let receipt_url: string | undefined;
        if (file && file.size > 0) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabaseAdmin.storage
                .from('driver-receipts')
                .upload(fileName, file);

            if (uploadError) {
                console.error('driver-portal upload error:', uploadError);
                return NextResponse.json({ error: 'Photo upload failed' }, { status: 500 });
            }

            const { data: urlData } = supabaseAdmin.storage.from('driver-receipts').getPublicUrl(fileName);
            receipt_url = urlData.publicUrl;
        }

        const { error: insertError } = await supabaseAdmin.from('driver_expenses').insert({
            driver_id: driver.id,
            category,
            amount,
            currency,
            expense_date,
            description,
            receipt_url,
            source: 'driver',
        });

        if (insertError) {
            console.error('driver-portal insert error:', insertError);
            return NextResponse.json({ error: 'Failed to save expense' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('driver-portal POST error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
