import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: list all promo codes
export async function GET(request: NextRequest) {
    const session = await getAdminSession(request);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabaseAdmin
        .from('promo_codes')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

// POST: create promo code
export async function POST(request: NextRequest) {
    const session = await getAdminSession(request);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { code, discount_type, discount_value, max_uses, expires_at, is_active } = body;

    if (!code || !discount_type || !discount_value) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
        .from('promo_codes')
        .insert([{
            code: code.toUpperCase().trim(),
            discount_type,
            discount_value: Number(discount_value),
            max_uses: max_uses ? Number(max_uses) : null,
            expires_at: expires_at || null,
            is_active: is_active !== false,
            used_count: 0,
        }])
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

// PATCH: update promo code
export async function PATCH(request: NextRequest) {
    const session = await getAdminSession(request);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    // Only these columns may be changed — never id, created_at, used_count, etc.
    const EDITABLE = ['code', 'discount_type', 'discount_value', 'max_uses', 'expires_at', 'is_active'] as const;
    const updates: Record<string, unknown> = {};
    for (const key of EDITABLE) {
        if (key in rest) updates[key] = rest[key];
    }
    if (typeof updates.code === 'string') updates.code = updates.code.toUpperCase().trim();
    if (Object.keys(updates).length === 0) {
        return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
        .from('promo_codes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

// DELETE: remove promo code
export async function DELETE(request: NextRequest) {
    const session = await getAdminSession(request);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const { error } = await supabaseAdmin.from('promo_codes').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
