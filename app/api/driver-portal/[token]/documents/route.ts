import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getDriverByToken } from '@/lib/driverPortalAuth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const ALLOWED_DOC_TYPES = ['license', 'iqama_id', 'vehicle_registration', 'insurance', 'other'];

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params;
    const driver = await getDriverByToken(token);
    if (!driver) {
        return NextResponse.json({ error: 'Link invalid or inactive' }, { status: 404 });
    }

    const { data, error } = await supabaseAdmin
        .from('driver_documents')
        .select('id, doc_type, document_number, expiry_date, file_url, created_at')
        .eq('driver_id', driver.id)
        .order('expiry_date', { ascending: true });

    if (error) {
        console.error('driver-portal documents GET error:', error);
        return NextResponse.json({ error: 'Failed to load documents' }, { status: 500 });
    }

    return NextResponse.json({ documents: data });
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const ip = getClientIp(request);
        if (!checkRateLimit(`driver-portal-documents:${ip}`, 10, 60_000)) {
            return NextResponse.json({ error: 'Too many requests, please try again shortly' }, { status: 429 });
        }

        const { token } = await params;
        const driver = await getDriverByToken(token);
        if (!driver) {
            return NextResponse.json({ error: 'Link invalid or inactive' }, { status: 404 });
        }

        const formData = await request.formData();
        const doc_type = String(formData.get('doc_type') || '');
        const document_number = formData.get('document_number') ? String(formData.get('document_number')) : undefined;
        const expiry_date = formData.get('expiry_date') ? String(formData.get('expiry_date')) : undefined;
        const file = formData.get('file') as File | null;

        if (!ALLOWED_DOC_TYPES.includes(doc_type)) {
            return NextResponse.json({ error: 'Invalid document type' }, { status: 400 });
        }

        let file_url: string | undefined;
        if (file && file.size > 0) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabaseAdmin.storage
                .from('driver-receipts')
                .upload(fileName, file);

            if (uploadError) {
                console.error('driver-portal document upload error:', uploadError);
                return NextResponse.json({ error: 'Photo upload failed' }, { status: 500 });
            }
            const { data: urlData } = supabaseAdmin.storage.from('driver-receipts').getPublicUrl(fileName);
            file_url = urlData.publicUrl;
        }

        const { error: insertError } = await supabaseAdmin.from('driver_documents').insert({
            driver_id: driver.id,
            doc_type,
            document_number,
            expiry_date,
            file_url,
        });

        if (insertError) {
            console.error('driver-portal document insert error:', insertError);
            return NextResponse.json({ error: 'Failed to save document' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('driver-portal documents POST error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
