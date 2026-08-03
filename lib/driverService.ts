import { supabase } from './supabase';

export interface Driver {
    id: string;
    full_name: string;
    phone_number: string;
    email: string;
    city: string;
    vehicle_model: string;
    vehicle_plate?: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_notes?: string;
    created_at: string;
    reviewed_at?: string;
}

export type DriverExpenseCategory = 'fuel' | 'maintenance' | 'advance' | 'penalty' | 'other';

export interface DriverExpense {
    id: string;
    driver_id: string;
    category: DriverExpenseCategory;
    amount: number;
    currency: string;
    expense_date: string;
    description?: string;
    receipt_url?: string;
    created_at: string;
}

export type DriverDocType = 'license' | 'iqama_id' | 'vehicle_registration' | 'insurance' | 'other';

export interface DriverDocument {
    id: string;
    driver_id: string;
    doc_type: DriverDocType;
    document_number?: string;
    expiry_date?: string;
    file_url?: string;
    created_at: string;
}

export interface DriverAdvanceRepayment {
    id: string;
    driver_id: string;
    amount: number;
    currency: string;
    repaid_date: string;
    note?: string;
    created_at: string;
}

export interface DriverSettlement {
    id: string;
    driver_id: string;
    period_start: string;
    period_end: string;
    amount_paid: number;
    currency: string;
    note?: string;
    created_at: string;
}

async function uploadToDriverBucket(file: File): Promise<string | null> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('driver-receipts')
            .upload(fileName, file);

        if (uploadError) {
            console.error('Error uploading file:', uploadError);
            return null;
        }

        const { data } = supabase.storage
            .from('driver-receipts')
            .getPublicUrl(fileName);

        return data.publicUrl;
    } catch (error) {
        console.error('Exception uploading file:', error);
        return null;
    }
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

    // Get only active roster drivers — used to populate the "assign driver" dropdown on bookings
    async getApprovedDrivers() {
        const { data, error } = await supabase
            .from('drivers')
            .select('*')
            .eq('status', 'approved')
            .order('full_name', { ascending: true });

        if (error) throw error;
        return data as Driver[];
    },

    // Add a driver straight to the roster (admin adding their own driver, skips the application flow)
    async addDriver(driver: {
        full_name: string;
        phone_number: string;
        email?: string;
        city: string;
        vehicle_model: string;
        vehicle_plate?: string;
    }) {
        const { data, error } = await supabase
            .from('drivers')
            .insert({ ...driver, status: 'approved', reviewed_at: new Date().toISOString() })
            .select()
            .single();

        if (error) throw error;
        return data as Driver;
    },

    // Edit a driver's profile fields (admin)
    async updateDriverProfile(id: string, updates: {
        full_name: string;
        phone_number: string;
        email?: string;
        city: string;
        vehicle_model: string;
        vehicle_plate?: string;
    }) {
        const { data, error } = await supabase
            .from('drivers')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Driver;
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

    // Get every expense entry across all drivers (admin) — used for fleet-wide totals
    async getAllExpenses() {
        const { data, error } = await supabase
            .from('driver_expenses')
            .select('*')
            .order('expense_date', { ascending: false });

        if (error) throw error;
        return data as DriverExpense[];
    },

    // Get expense history for one driver (admin)
    async getExpenses(driverId: string) {
        const { data, error } = await supabase
            .from('driver_expenses')
            .select('*')
            .eq('driver_id', driverId)
            .order('expense_date', { ascending: false });

        if (error) throw error;
        return data as DriverExpense[];
    },

    // Log a new expense (fuel, maintenance, advance, penalty, other) against a driver (admin)
    async addExpense(expense: Omit<DriverExpense, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('driver_expenses')
            .insert(expense)
            .select()
            .single();

        if (error) throw error;
        return data as DriverExpense;
    },

    // Delete an expense entry (admin)
    async deleteExpense(id: string) {
        const { error } = await supabase
            .from('driver_expenses')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // Upload a receipt/fuel-slip photo to the 'driver-receipts' Supabase Storage bucket
    async uploadReceipt(file: File): Promise<string | null> {
        return uploadToDriverBucket(file);
    },

    // Get every document across all drivers (admin) — used for the fleet-wide expiry banner
    async getAllDocuments() {
        const { data, error } = await supabase
            .from('driver_documents')
            .select('*')
            .order('expiry_date', { ascending: true });

        if (error) throw error;
        return data as DriverDocument[];
    },

    // Get documents for one driver (admin)
    async getDocuments(driverId: string) {
        const { data, error } = await supabase
            .from('driver_documents')
            .select('*')
            .eq('driver_id', driverId)
            .order('expiry_date', { ascending: true });

        if (error) throw error;
        return data as DriverDocument[];
    },

    // Add a document (license, Iqama/ID, vehicle registration, insurance, other) for a driver
    async addDocument(doc: Omit<DriverDocument, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('driver_documents')
            .insert(doc)
            .select()
            .single();

        if (error) throw error;
        return data as DriverDocument;
    },

    // Delete a document entry (admin)
    async deleteDocument(id: string) {
        const { error } = await supabase
            .from('driver_documents')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // Upload a document scan/photo to the 'driver-receipts' Supabase Storage bucket
    async uploadDocumentFile(file: File): Promise<string | null> {
        return uploadToDriverBucket(file);
    },

    // Bookings completed by a driver — the earnings side of the per-driver profit view
    async getDriverBookingSummary(driverId: string) {
        const { data, error } = await supabase
            .from('bookings')
            .select('total_price, currency, status')
            .eq('driver_id', driverId);

        if (error) throw error;
        return data as { total_price: number | null; currency: string | null; status: string }[];
    },

    // Fleet-wide version of the above — every booking that has a driver assigned
    async getAllDriverBookingSummaries() {
        const { data, error } = await supabase
            .from('bookings')
            .select('driver_id, total_price, currency, status')
            .not('driver_id', 'is', null);

        if (error) throw error;
        return data as { driver_id: string; total_price: number | null; currency: string | null; status: string }[];
    },

    // Repayments a driver has made against an 'advance' expense (admin)
    async getAdvanceRepayments(driverId: string) {
        const { data, error } = await supabase
            .from('driver_advance_repayments')
            .select('*')
            .eq('driver_id', driverId)
            .order('repaid_date', { ascending: false });

        if (error) throw error;
        return data as DriverAdvanceRepayment[];
    },

    async addAdvanceRepayment(repayment: Omit<DriverAdvanceRepayment, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('driver_advance_repayments')
            .insert(repayment)
            .select()
            .single();

        if (error) throw error;
        return data as DriverAdvanceRepayment;
    },

    // Fleet-wide repayments — used for the all-drivers overview table
    async getAllAdvanceRepayments() {
        const { data, error } = await supabase
            .from('driver_advance_repayments')
            .select('*');

        if (error) throw error;
        return data as DriverAdvanceRepayment[];
    },

    async deleteAdvanceRepayment(id: string) {
        const { error } = await supabase
            .from('driver_advance_repayments')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // Logged payouts to a driver for a period (admin reads the Finance panel numbers and records what was paid)
    async getSettlements(driverId: string) {
        const { data, error } = await supabase
            .from('driver_settlements')
            .select('*')
            .eq('driver_id', driverId)
            .order('period_end', { ascending: false });

        if (error) throw error;
        return data as DriverSettlement[];
    },

    async addSettlement(settlement: Omit<DriverSettlement, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('driver_settlements')
            .insert(settlement)
            .select()
            .single();

        if (error) throw error;
        return data as DriverSettlement;
    },

    async deleteSettlement(id: string) {
        const { error } = await supabase
            .from('driver_settlements')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },
};
