import { supabaseAdmin } from './supabase-admin';

export interface PortalDriver {
    id: string;
    full_name: string;
    phone_number: string;
    email: string;
    city: string;
    vehicle_model: string;
    vehicle_plate: string | null;
    status: string;
}

// Every driver-portal route resolves the token to a driver server-side (never
// trusts a client-supplied driver id), so a driver can only ever act on their
// own rows no matter what a crafted request claims.
export async function getDriverByToken(token: string): Promise<PortalDriver | null> {
    const { data, error } = await supabaseAdmin
        .from('drivers')
        .select('id, full_name, phone_number, email, city, vehicle_model, vehicle_plate, status')
        .eq('access_token', token)
        .single();

    if (error || !data || data.status !== 'approved') return null;
    return data;
}
