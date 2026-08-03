import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getDriverByToken } from '@/lib/driverPortalAuth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function sumByCurrency(rows: { amount: number; currency: string }[]) {
    return rows.reduce((acc, r) => {
        acc[r.currency] = (acc[r.currency] || 0) + r.amount;
        return acc;
    }, {} as Record<string, number>);
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params;
    const driver = await getDriverByToken(token);
    if (!driver) {
        return NextResponse.json({ error: 'Link invalid or inactive' }, { status: 404 });
    }

    const [{ data: bookings }, { data: expenses }] = await Promise.all([
        supabaseAdmin.from('bookings').select('total_price, currency, status').eq('driver_id', driver.id),
        supabaseAdmin.from('driver_expenses').select('amount, currency').eq('driver_id', driver.id),
    ]);

    const completed = (bookings || []).filter(b => b.status === 'completed');
    const earnedByCurrency = sumByCurrency(
        completed.map(b => ({ amount: b.total_price || 0, currency: b.currency || 'SAR' }))
    );
    const spentByCurrency = sumByCurrency(expenses || []);

    return NextResponse.json({
        driver: {
            full_name: driver.full_name,
            phone_number: driver.phone_number,
            email: driver.email,
            city: driver.city,
            vehicle_model: driver.vehicle_model,
            vehicle_plate: driver.vehicle_plate,
            duty_status: driver.duty_status,
        },
        earnings: {
            completedTrips: completed.length,
            earnedByCurrency,
            spentByCurrency,
        },
    });
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const ip = getClientIp(request);
        if (!checkRateLimit(`driver-portal-profile:${ip}`, 10, 60_000)) {
            return NextResponse.json({ error: 'Too many requests, please try again shortly' }, { status: 429 });
        }

        const { token } = await params;
        const driver = await getDriverByToken(token);
        if (!driver) {
            return NextResponse.json({ error: 'Link invalid or inactive' }, { status: 404 });
        }

        const body = await request.json();

        // A quick duty-status toggle carries just this one field; a profile
        // save carries the rest. Handle both through the same endpoint.
        if (body.duty_status !== undefined && Object.keys(body).length === 1) {
            const DUTY_STATUSES = ['on_duty', 'off_duty', 'on_leave', 'suspended'];
            if (!DUTY_STATUSES.includes(body.duty_status)) {
                return NextResponse.json({ error: 'Invalid duty status' }, { status: 400 });
            }
            const { error: dutyError } = await supabaseAdmin
                .from('drivers')
                .update({ duty_status: body.duty_status })
                .eq('id', driver.id);
            if (dutyError) {
                console.error('driver-portal duty status update error:', dutyError);
                return NextResponse.json({ error: 'Failed to update duty status' }, { status: 500 });
            }
            return NextResponse.json({ success: true });
        }

        const full_name = String(body.full_name || '').trim();
        const phone_number = String(body.phone_number || '').trim();
        const city = String(body.city || '').trim();
        const vehicle_model = String(body.vehicle_model || '').trim();
        const vehicle_plate = body.vehicle_plate ? String(body.vehicle_plate).trim() : null;

        if (!full_name || !phone_number || !city || !vehicle_model) {
            return NextResponse.json({ error: 'Full name, phone, city and vehicle are required' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('drivers')
            .update({ full_name, phone_number, city, vehicle_model, vehicle_plate })
            .eq('id', driver.id);

        if (error) {
            console.error('driver-portal profile update error:', error);
            return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('driver-portal PATCH error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
