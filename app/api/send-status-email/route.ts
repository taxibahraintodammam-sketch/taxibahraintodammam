import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { getAdminSession, isInternalRequest } from '@/lib/admin-auth';
import { sendStatusEmail } from '@/lib/status-email';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        // Admin UI (Bearer session) or an internal server call (secret header).
        if (!isInternalRequest(request)) {
            const session = await getAdminSession(request);
            if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Callers are authenticated; this only stops a runaway loop. Bulk
        // status changes send one request per booking, so allow a batch.
        const ip = getClientIp(request);
        if (!checkRateLimit(`status-email:${ip}`, 60, 60_000)) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        const { bookingId, status, customerEmail, customerName, totalPrice, currency } = await request.json();
        if (!bookingId || !status || !customerEmail) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const sent = await sendStatusEmail({ bookingId, status, customerEmail, customerName, totalPrice, currency });
        if (!sent) return NextResponse.json({ message: 'No email sent for this status' });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('Error sending status email:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
