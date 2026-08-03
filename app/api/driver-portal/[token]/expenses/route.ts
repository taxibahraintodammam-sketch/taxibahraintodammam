import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getDriverByToken } from '@/lib/driverPortalAuth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Driver self-service can only log these — advance/penalty are things the
// company applies to a driver, not something a driver should self-report.
const ALLOWED_CATEGORIES = ['fuel', 'maintenance', 'other'];

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
        if (!driver) {
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
                console.error('driver-portal expense upload error:', uploadError);
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
            console.error('driver-portal expense insert error:', insertError);
            return NextResponse.json({ error: 'Failed to save expense' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('driver-portal expenses POST error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
