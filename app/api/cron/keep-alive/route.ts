import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Keeps the Supabase project awake. Free-tier projects are paused after
 * about a week with no database activity; this runs one real query a day
 * (see vercel.json), which counts as activity.
 *
 * Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}` automatically
 * when CRON_SECRET is set in the project. If it isn't set, the request is
 * still allowed: the query is a harmless row count, and refusing it would
 * let the project pause silently.
 */
export async function GET(request: NextRequest) {
    const secret = process.env.CRON_SECRET;
    if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!secret) console.warn('keep-alive: CRON_SECRET is not set; running unauthenticated.');

    const { count, error } = await supabaseAdmin
        .from('bookings')
        .select('id', { count: 'exact', head: true });

    if (error) {
        console.error('keep-alive: Supabase query failed', error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, bookings: count, at: new Date().toISOString() });
}
