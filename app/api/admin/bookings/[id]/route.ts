import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Soft delete — sets deleted_at timestamp instead of removing the row
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await getAdminSession(request);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { error } = await supabaseAdmin
            .from('bookings')
            .update({
                deleted_at: new Date().toISOString(),
                deleted_by: session.user.email,
            })
            .eq('id', id);

        if (error) {
            console.error('Supabase Soft Delete Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Booking moved to trash' });
    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Restore — clears deleted_at so the booking reappears in the main list
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await getAdminSession(request);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { error } = await supabaseAdmin
            .from('bookings')
            .update({ deleted_at: null, deleted_by: null })
            .eq('id', id);

        if (error) {
            console.error('Supabase Restore Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Booking restored' });
    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
