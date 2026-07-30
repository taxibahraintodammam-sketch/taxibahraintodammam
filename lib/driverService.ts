import { supabase } from './supabase';

export interface Driver {
    id: string;
    full_name: string;
    phone_number: string;
    email: string;
    city: string;
    vehicle_model: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_notes?: string;
    created_at: string;
    reviewed_at?: string;
}

export const driverService = {
    // Get all driver applications (admin)
    async getAllDrivers() {
        const { data, error } = await supabase
            .from('drivers')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Driver[];
    },

    // Approve a driver application (admin)
    async approveDriver(id: string) {
        const { data, error } = await supabase
            .from('drivers')
            .update({ status: 'approved', reviewed_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Driver;
    },

    // Reject a driver application (admin)
    async rejectDriver(id: string) {
        const { data, error } = await supabase
            .from('drivers')
            .update({ status: 'rejected', reviewed_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Driver;
    },

    // Move a driver back to pending (admin)
    async revertToPending(id: string) {
        const { data, error } = await supabase
            .from('drivers')
            .update({ status: 'pending', reviewed_at: null })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Driver;
    },

    // Save internal notes on a driver application (admin)
    async saveNotes(id: string, notes: string) {
        const { data, error } = await supabase
            .from('drivers')
            .update({ admin_notes: notes })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Driver;
    },
};
