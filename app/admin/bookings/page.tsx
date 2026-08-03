'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { adminFetch } from '@/lib/admin-fetch';
import { absoluteUrl } from '@/lib/url';
import { useRouter } from 'next/navigation';
import {
    Calendar,
    Search,
    Filter,
    Download,
    Trash2,
    Eye,
    X,
    CheckCircle,
    Clock,
    Car,
    Copy,
    Share2,
    MessageSquare,
    Edit2,
    Save,
    Plus,
    Printer,
    FileText,
    ExternalLink,
    Calculator,
    CreditCard,
    ArrowUpDown,
    Bell,
    Volume2,
    Map,
    AlertTriangle,
    MapPin,
    UserCircle,
    Handshake,
    Wallet,
    TrendingUp,
    CheckSquare,
    Crown,
    Activity,
    Users,
    Mail,
    Truck
} from 'lucide-react';
import { getPrice } from '@/lib/pricing';
import { driverService, Driver } from '@/lib/driverService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

const VEHICLE_OPTIONS = [
    'Toyota Camry',
    'GMC Yukon XL / Denali',
    'Hyundai Staria VIP',
    'Hyundai Starex',
    'Toyota Hiace',
    'Toyota Coaster',
    'Mercedes S-Class',
    'BMW 7 Series',
    'Mercedes Sprinter',
    'Luxurious Bus',
];

interface Booking {
    id: string;
    created_at: string;
    pickup_location: string;
    destination: string;
    pickup_date: string;
    pickup_time: string;
    vehicle_type: string;
    passengers: number;
    luggage: number;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    status: 'pending' | 'quote_sent' | 'confirmed' | 'in_progress' | 'no_show' | 'cancelled' | 'completed';
    special_requests?: string;
    total_price?: number;
    payment_status?: string;
    driver_id?: string;
    driver_name?: string;
    driver_phone?: string;
    driver_plate?: string;
    flight_number?: string;
    actual_vehicle?: string;
    tags?: string; // Comma separated tags e.g. "VIP, Priority"
    internal_notes?: string;
    has_return_trip?: boolean;
    child_seats?: number;
    currency?: string;
    payment_method?: string;
}

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');
    const [dbPrices, setDbPrices] = useState<Record<string, Record<string, number>>>({});
    const [approvedDrivers, setApprovedDrivers] = useState<Driver[]>([]);

    // Sheet State
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBooking, setEditedBooking] = useState<Booking | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [showReturnPrompt, setShowReturnPrompt] = useState(false);
    const [returnTripDraft, setReturnTripDraft] = useState({
        pickup_date: '',
        pickup_time: '',
        passengers: 1,
        luggage: 0,
        vehicle_type: 'Toyota Camry',
    });
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Booking; direction: 'asc' | 'desc' } | null>(null);
    const [newBookingAlert, setNewBookingAlert] = useState<Booking | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    // Quick Date filter helper
    const setQuickDate = (preset: 'today' | 'tomorrow' | 'week' | 'month' | 'all') => {
        const today = new Date();
        const todayStr = today.toLocaleDateString('en-CA');
        
        switch (preset) {
            case 'today':
                setStartDate(todayStr);
                setEndDate(todayStr);
                break;
            case 'tomorrow':
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                const tomorrowStr = tomorrow.toLocaleDateString('en-CA');
                setStartDate(tomorrowStr);
                setEndDate(tomorrowStr);
                break;
            case 'week':
                setStartDate(todayStr);
                const nextWeek = new Date(today);
                nextWeek.setDate(today.getDate() + 7);
                setEndDate(nextWeek.toLocaleDateString('en-CA'));
                break;
            case 'month':
                setStartDate(todayStr);
                const nextMonth = new Date(today);
                nextMonth.setMonth(today.getMonth() + 1);
                setEndDate(nextMonth.toLocaleDateString('en-CA'));
                break;
            case 'all':
                setStartDate('');
                setEndDate('');
                break;
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Reset to page 1 whenever any filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, paymentFilter, startDate, endDate]);
    
    const [sendingQuote, setSendingQuote] = useState(false);
    const [quoteSent, setQuoteSent] = useState(false);
    const [sendingReceipt, setSendingReceipt] = useState(false);
    const [receiptSent, setReceiptSent] = useState(false);
    const [ccEmails, setCcEmails] = useState('');

    // Auto-fill & Duplicate State
    const [duplicateFound, setDuplicateFound] = useState<Booking | null>(null);

    const emptyNewBooking = (): Partial<Booking> => ({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        pickup_location: '',
        destination: '',
        pickup_date: new Date().toISOString().split('T')[0],
        pickup_time: '12:00',
        vehicle_type: 'Sedan',
        passengers: 1,
        luggage: 0,
        total_price: 0,
        special_requests: '',
        internal_notes: '',
        tags: '',
        actual_vehicle: '',
        payment_status: 'unpaid',
        driver_id: undefined,
        driver_name: '',
        driver_phone: '',
        driver_plate: '',
        flight_number: '',
        currency: 'SAR',
        payment_method: 'Cash to Driver',
        has_return_trip: false
    });

    const [newBooking, setNewBooking] = useState<Partial<Booking>>(emptyNewBooking());

    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/admin/login');
            } else {
                fetchBookings();
                fetchDbPrices();
                driverService.getApprovedDrivers().then(setApprovedDrivers).catch(err => console.error('Failed to load approved drivers:', err));
                // Request browser notification permission
                if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
                    Notification.requestPermission();
                }
            }
        };
        checkSession();

        // Real-time Subscription for New and Updated Bookings
        const subscription = supabase
            .channel('public:bookings')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, (payload) => {
                const newB = payload.new as Booking;
                setBookings(prev => [newB, ...prev]);
                setNewBookingAlert(newB);

                // Play notification sound
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                audio.play().catch(e => console.log("Audio play blocked by browser", e));

                // Browser push notification
                if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
                    new Notification('🚖 New Booking!', {
                        body: `${newB.customer_name} — ${newB.pickup_location} → ${newB.destination}`,
                        icon: '/favicon.ico'
                    });
                }

                // Clear notification after 10 seconds
                setTimeout(() => setNewBookingAlert(null), 10000);
            })
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'bookings' }, (payload) => {
                const updatedB = payload.new as Booking;
                setBookings(prev => prev.map(b => b.id === updatedB.id ? updatedB : b));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [router]);

    const fetchDbPrices = async () => {
        try {
            const { data, error } = await supabase.from('pricing_rules').select('route,vehicle,price');
            if (!error && data) {
                const priceMap: Record<string, Record<string, number>> = {};
                data.forEach(row => {
                    if (!priceMap[row.route]) priceMap[row.route] = {};
                    priceMap[row.route][row.vehicle] = row.price;
                });
                setDbPrices(priceMap);
            }
        } catch (err) {
            console.error('Failed to load DB pricing rules:', err);
        }
    };

    const formatTime12h = (timeStr?: string) => {
        if (!timeStr) return '—';
        try {
            const parts = timeStr.split(':');
            if (parts.length < 2) return timeStr;
            let hours = parseInt(parts[0], 10);
            const minutes = parts[1];
            if (isNaN(hours)) return timeStr;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            return `${hours}:${minutes} ${ampm}`;
        } catch (e) {
            return timeStr;
        }
    };

    const getTimeSince = (dateStr: string) => {
        const created = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - created.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${Math.floor(diffHours / 24)}d ago`;
    };

    const getCurrencyTooltip = (sar: number) => {
        if (!sar) return "Price not set";
        const usd = (sar / 3.75).toFixed(2);
        const eur = (sar / 4.1).toFixed(2);
        return `≈ $${usd} USD | ≈ €${eur} EUR`;
    };

    const fetchBookings = async () => {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBookings(data || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-fill & Duplicate Logic
    useEffect(() => {
        if (!isCreating || !newBooking.customer_phone) {
            setDuplicateFound(null);
            return;
        }

        const phone = newBooking.customer_phone.trim();
        if (phone.length < 5) return;

        // 1. Auto-fill logic
        const existingCustomer = bookings.find(b => b.customer_phone === phone);
        if (existingCustomer && !newBooking.customer_name) {
            setNewBooking(prev => ({
                ...prev,
                customer_name: existingCustomer.customer_name,
                customer_email: existingCustomer.customer_email
            }));
        }

        // 2. Duplicate detection (Phone + Date + Time)
        const duplicate = bookings.find(b => 
            b.customer_phone === phone && 
            b.pickup_date === newBooking.pickup_date && 
            b.pickup_time === newBooking.pickup_time
        );
        setDuplicateFound(duplicate || null);

    }, [newBooking.customer_phone, newBooking.pickup_date, newBooking.pickup_time, isCreating, bookings]);

    // Opens a quick prompt for the details that usually differ on the return
    // leg (date, passengers, luggage, vehicle) instead of silently guessing
    // +7 days and copying the outbound vehicle/passenger count.
    const openReturnTripPrompt = () => {
        if (!selectedBooking) return;
        const originalDate = new Date(selectedBooking.pickup_date);
        const suggestedDate = new Date(originalDate);
        suggestedDate.setDate(originalDate.getDate() + 7);

        setReturnTripDraft({
            pickup_date: suggestedDate.toISOString().split('T')[0],
            pickup_time: selectedBooking.pickup_time || '12:00',
            passengers: selectedBooking.passengers || 1,
            luggage: selectedBooking.luggage || 0,
            vehicle_type: selectedBooking.vehicle_type || 'Toyota Camry',
        });
        setShowReturnPrompt(true);
    };

    const generateReturnTrip = () => {
        if (!selectedBooking) return;
        try {
            const newB: Partial<Booking> = {
                customer_name: selectedBooking.customer_name,
                customer_email: selectedBooking.customer_email || '',
                customer_phone: selectedBooking.customer_phone || '',
                pickup_location: selectedBooking.destination,
                destination: selectedBooking.pickup_location,
                pickup_date: returnTripDraft.pickup_date,
                pickup_time: returnTripDraft.pickup_time,
                vehicle_type: returnTripDraft.vehicle_type,
                passengers: returnTripDraft.passengers,
                luggage: returnTripDraft.luggage,
                total_price: selectedBooking.total_price || 0,
                special_requests: `Return trip for booking #${selectedBooking.id.slice(0, 8)}`,
                payment_status: 'unpaid',
                currency: selectedBooking.currency || 'SAR',
                payment_method: selectedBooking.payment_method || 'Cash to Driver',
                status: 'pending',
                has_return_trip: false
            };

            setNewBooking(newB);
            setIsCreating(true);
            setShowReturnPrompt(false);
            setSelectedBooking(null);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setBookings(bookings.map(b =>
                b.id === id ? { ...b, status: newStatus as any } : b
            ));

            // Allow updating status from the detail view too
            if (selectedBooking && selectedBooking.id === id) {
                setSelectedBooking({ ...selectedBooking, status: newStatus as any });
                setEditedBooking({ ...(editedBooking as Booking), status: newStatus as any });
            }

            // Send Email Notification
            const booking = bookings.find(b => b.id === id);
            if (booking && ['quote_sent', 'confirmed', 'in_progress', 'cancelled', 'completed'].includes(newStatus)) {
                adminFetch('/api/send-status-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        bookingId: booking.id,
                        status: newStatus,
                        customerEmail: booking.customer_email,
                        customerName: booking.customer_name,
                        totalPrice: booking.total_price,
                        currency: booking.currency || 'SAR'
                    })
                }).catch(err => console.error('Failed to send status email:', err));
            }

        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const deleteBooking = async (id: string) => {
        if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) return;

        try {
            const response = await adminFetch(`/api/admin/bookings/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete');
            }

            setBookings(bookings.filter(b => b.id !== id));
            if (selectedBooking?.id === id) {
                setSelectedBooking(null);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
            alert('Failed to delete booking. Ensure you have the right permissions.');
        }
    };

    // Auto-suggest Price as user fills trip details
    useEffect(() => {
        if (!isCreating) return;
        if (newBooking.pickup_location && newBooking.destination && newBooking.vehicle_type) {
            const price = getResolvedPrice(
                newBooking.pickup_location, 
                newBooking.destination, 
                newBooking.vehicle_type,
                !!newBooking.has_return_trip
            );
            if (price && price !== newBooking.total_price) {
                setNewBooking(prev => ({ ...prev, total_price: price }));
            }
        }
    }, [newBooking.pickup_location, newBooking.destination, newBooking.vehicle_type, newBooking.has_return_trip, isCreating, dbPrices]);

    const saveDetails = async () => {
        if (!editedBooking) return;
        try {
            const driverJustAssigned = editedBooking.driver_id && editedBooking.driver_id !== selectedBooking?.driver_id;
            const { id, created_at, status, ...updateData } = editedBooking;
            const { error } = await supabase
                .from('bookings')
                .update(updateData)
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setBookings(bookings.map(b => b.id === id ? editedBooking : b));
            setSelectedBooking(editedBooking);
            setIsEditing(false);

            // Best-effort — a failed notification shouldn't block the save itself.
            if (driverJustAssigned) {
                adminFetch('/api/send-driver-trip-notification', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bookingId: id }),
                }).catch(err => console.warn('Driver trip notification failed:', err));
            }
        } catch (error) {
            console.error('Error updating booking details:', error);
            alert("Failed to update booking details.");
        }
    };

    const saveNewBooking = async () => {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .insert([newBooking])
                .select();

            if (error) throw error;

            if (data && data[0]) {
                setBookings([data[0], ...bookings]);
                setIsCreating(false);

                if (data[0].driver_id) {
                    adminFetch('/api/send-driver-trip-notification', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ bookingId: data[0].id }),
                    }).catch(err => console.warn('Driver trip notification failed:', err));
                }

                // Reset new booking state
                setNewBooking(emptyNewBooking());
                alert('Booking created successfully!');
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking.');
        }
    };

    const openBookingDetails = (booking: Booking) => {
        setSelectedBooking(booking);
        setEditedBooking(booking);
        setIsEditing(false);
    };

    // Filter Logic
    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.tags?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.customer_phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.driver_name?.toLowerCase().includes(searchTerm.toLowerCase());

        // Status Filter
        let matchesStatus = true;
        const today = new Date().toLocaleDateString('en-CA');
        if (statusFilter === 'today') {
            matchesStatus = booking.pickup_date === today;
        } else if (statusFilter === 'upcoming') {
            matchesStatus = booking.pickup_date > today;
        } else if (statusFilter !== 'all') {
            matchesStatus = booking.status === statusFilter;
        }

        // Payment Filter
        let matchesPayment = true;
        if (paymentFilter !== 'all') {
            matchesPayment = booking.payment_status === paymentFilter;
        }

        const dateInRange = (!startDate || booking.pickup_date >= startDate) && 
                          (!endDate || booking.pickup_date <= endDate);

        return matchesSearch && matchesStatus && matchesPayment && dateInRange;
    }).sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        const aVal = a[key] ?? '';
        const bVal = b[key] ?? '';
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const paginatedBookings = filteredBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const requestSort = (key: keyof Booking) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const bulkUpdateStatus = async (newStatus: string) => {
        if (!selectedIds.length) return;
        if (!confirm(`Are you sure you want to update ${selectedIds.length} bookings to ${newStatus}?`)) return;

        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status: newStatus })
                .in('id', selectedIds);

            if (error) throw error;

            setBookings(bookings.map(b => 
                selectedIds.includes(b.id) ? { ...b, status: newStatus as any } : b
            ));
            setSelectedIds([]);
            alert('Bulk update successful!');
        } catch (error) {
            console.error('Error in bulk update:', error);
            alert('Failed to update bookings.');
        }
    };

    const bulkReassignDriver = async (driverId: string) => {
        if (!selectedIds.length || !driverId) return;
        const driver = approvedDrivers.find(d => d.id === driverId);
        if (!driver) return;
        if (!confirm(`Reassign ${selectedIds.length} bookings to ${driver.full_name}?`)) return;

        try {
            const { error } = await supabase
                .from('bookings')
                .update({
                    driver_id: driver.id,
                    driver_name: driver.full_name,
                    driver_phone: driver.phone_number,
                    driver_plate: driver.vehicle_plate || null,
                })
                .in('id', selectedIds);

            if (error) throw error;

            setBookings(bookings.map(b =>
                selectedIds.includes(b.id)
                    ? { ...b, driver_id: driver.id, driver_name: driver.full_name, driver_phone: driver.phone_number, driver_plate: driver.vehicle_plate }
                    : b
            ));
            setSelectedIds([]);
            alert(`Reassigned ${selectedIds.length} bookings to ${driver.full_name}.`);
        } catch (error) {
            console.error('Error in bulk reassign:', error);
            alert('Failed to reassign driver.');
        }
    };

    const bulkDelete = async () => {
        if (!selectedIds.length) return;
        if (!confirm(`CAUTION: Are you sure you want to DELETE ${selectedIds.length} bookings? This cannot be undone.`)) return;

        try {
            const { error } = await supabase
                .from('bookings')
                .delete()
                .in('id', selectedIds);

            if (error) throw error;

            setBookings(bookings.filter(b => !selectedIds.includes(b.id)));
            setSelectedIds([]);
            alert('Bulk delete successful!');
        } catch (error) {
            console.error('Error in bulk delete:', error);
            alert('Failed to delete bookings.');
        }
    };


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':     return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'quote_sent':  return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'confirmed':   return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'in_progress': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'completed':   return 'bg-sky-100 text-sky-800 border-sky-200';
            case 'no_show':     return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'cancelled':   return 'bg-rose-100 text-rose-800 border-rose-200';
            default:            return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800 border-green-200';
            case 'unpaid': return 'bg-red-100 text-red-800 border-red-200';
            case 'partial': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'refunded': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const shareB2BOptions = (booking: Booking) => {
        const text = `*B2B Booking Request* \n\n*Ref:* #${booking.id.slice(0, 8).toUpperCase()}\n*From:* ${booking.pickup_location}\n*To:* ${booking.destination}\n*Date:* ${booking.pickup_date} at ${booking.pickup_time}\n*Vehicle:* ${booking.vehicle_type}\n*Pax:* ${booking.passengers} | *Bags:* ${booking.luggage}\n\n*Notes:* ${booking.special_requests || 'N/A'}\n\nPlease confirm if you can cover this.`;

        navigator.clipboard.writeText(text).then(() => {
            alert('B2B details copied to clipboard!');
        });
    };

    const shareClientDetails = (booking: Booking) => {
        const text = `*Booking Details (Client)* \n\n*Ref:* #${booking.id.slice(0, 8).toUpperCase()}\n*Client:* ${booking.customer_name}\n*Phone:* ${booking.customer_phone}\n*Pickup:* ${booking.pickup_location}\n*Dropoff:* ${booking.destination}\n*Date:* ${booking.pickup_date} at ${booking.pickup_time}\n*Vehicle:* ${booking.vehicle_type}\n*Pax:* ${booking.passengers} | *Bags:* ${booking.luggage}\n\n*Fare:* ${booking.currency || 'SAR'} ${booking.total_price || 'Confirming'}\n\n*Notes:* ${booking.special_requests || 'N/A'}\n\nThank you for choosing Taxi Bahrain to Dammam.`;

        navigator.clipboard.writeText(text).then(() => {
            alert('Client details copied to clipboard!');
        });
    };

    const shareDriverDetails = (booking: Booking) => {
        const text = `*NEW TRIP FOR DRIVER* \n\n*Ref:* #${booking.id.slice(0, 8).toUpperCase()}\n*Client:* ${booking.customer_name}\n*Phone:* ${booking.customer_phone}\n\n*Pickup:* ${booking.pickup_location}\n*Dropoff:* ${booking.destination}\n*Date:* ${booking.pickup_date}\n*Time:* ${booking.pickup_time}\n\n*Vehicle:* ${booking.vehicle_type}\n*Pax:* ${booking.passengers} | *Bags:* ${booking.luggage}\n\n*Notes:* ${booking.special_requests || 'None'}`;

        navigator.clipboard.writeText(text).then(() => {
            alert('Driver details (No Price) copied!');
        });
    };

    const sendWhatsAppHello = (booking: Booking) => {
        const returnText = booking.has_return_trip ? " (Including Round Trip 🔄)" : "";
        const childSeatText = booking.child_seats ? ` (With ${booking.child_seats} Child Seat(s) 👶)` : "";
        
        const text = `Hello ${booking.customer_name}! 🚕 *Taxi Bahrain to Dammam* here. 
        
We have received your booking request from *${booking.pickup_location}* to *${booking.destination}* on *${booking.pickup_date}*${returnText}${childSeatText}. 

Our team is reviewing the availability and will send you the quotation shortly. Thank you!`;
        openWhatsApp(booking.customer_phone, text);
    };

    const sendWhatsAppDriver = (booking: Booking) => {
        const driverName = booking.driver_name || "[Assign Driver]";
        const vehicle = booking.actual_vehicle || booking.vehicle_type;
        const text = `Hi ${booking.customer_name}! Your trip for *${booking.pickup_date} at ${booking.pickup_time}* is confirmed. ✅
        
🚗 *Vehicle:* ${vehicle}
👤 *Driver:* ${driverName}
📍 *Pickup:* ${booking.pickup_location}
📦 *Luggage:* ${booking.luggage} Bags

Your professional chauffeur will contact you shortly via WhatsApp/Call. Have a safe journey with *Taxi Bahrain to Dammam*!`;
        openWhatsApp(booking.customer_phone, text);
    };

    const sendWhatsAppPrice = (booking: Booking) => {
        const hasReturn = booking.has_return_trip || booking.special_requests?.includes('RETURN TRIP');
        
        const text = `Hi ${booking.customer_name}! The total fare for your trip is *${booking.currency || 'SAR'} ${booking.total_price || 0}* ${hasReturn ? '(Round Trip Included)' : ''}.

💳 *Payment Status:* ${(booking.payment_status || 'unpaid').toUpperCase()}

Please let us know if you would like to proceed with the booking. *Taxi Bahrain to Dammam*`;
        openWhatsApp(booking.customer_phone, text);
    };

    const openInGoogleMaps = (pickup: string, destination: string) => {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`;
        window.open(url, '_blank');
    };

    const openWhatsApp = (phone: string, text: string = "") => {
        if (!phone) return;
        // Basic phone normalization
        let cleanPhone = phone.replace(/[^\d]/g, "");
        if (!cleanPhone.startsWith("966") && cleanPhone.length === 9) {
            cleanPhone = "966" + cleanPhone;
        } else if (!cleanPhone.startsWith("966") && cleanPhone.length === 10 && cleanPhone.startsWith("0")) {
            cleanPhone = "966" + cleanPhone.substring(1);
        }
        
        const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const getResolvedPrice = (from: string, to: string, vehicle: string, isRoundTrip: boolean = false) => {
        const normalizeLocationLocal = (loc: string) => {
            const locations = ['Jeddah', 'Makkah', 'Madinah', 'Taif', 'Riyadh', 'Yanbu'];
            const lower = loc.toLowerCase();
            for (const city of locations) {
                if (lower.includes(city.toLowerCase())) return city.toLowerCase();
            }
            return null;
        };
        const loc1 = normalizeLocationLocal(from);
        const loc2 = normalizeLocationLocal(to);
        if (loc1 && loc2 && vehicle) {
            const routeKey = [loc1, loc2].sort().join('-');
            const routeKeyDirect = `${loc1}-${loc2}`;
            
            const dbRouteRules = dbPrices[routeKey] || dbPrices[routeKeyDirect];
            if (dbRouteRules) {
                const matchingVehicle = Object.keys(dbRouteRules).find(key => 
                    key.toLowerCase().includes(vehicle.toLowerCase()) || 
                    vehicle.toLowerCase().includes(key.toLowerCase())
                );
                if (matchingVehicle && dbRouteRules[matchingVehicle]) {
                    const basePrice = dbRouteRules[matchingVehicle];
                    return isRoundTrip ? basePrice * 2 : basePrice;
                }
            }
        }
        return getPrice(from, to, vehicle, isRoundTrip);
    };

    const suggestPrice = (from: string, to: string, vehicle: any, target: 'new' | 'edit') => {
        const isRoundTrip = target === 'new' ? !!newBooking.has_return_trip : !!editedBooking?.has_return_trip;
        const price = getResolvedPrice(from, to, vehicle, isRoundTrip);
        if (price) {
            if (target === 'new') {
                setNewBooking({ ...newBooking, total_price: price });
            } else if (editedBooking) {
                setEditedBooking({ ...editedBooking, total_price: price });
            }
        } else {
            alert("No standard pricing found for this route and vehicle. Please set price manually.");
        }
    };

    const resendEmail = async (booking: Booking) => {
        try {
            const response = await adminFetch('/api/send-status-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: booking.id,
                    status: booking.status,
                    customerEmail: booking.customer_email,
                    customerName: booking.customer_name
                })
            });

            if (response.ok) {
                alert('Email notification resent successfully!');
                await refreshSelectedBooking(booking.id);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error('Error resending email:', error);
            alert('Failed to resend email. Please check server logs.');
        }
    };

    const refreshSelectedBooking = async (id: string) => {
        const { data } = await supabase.from('bookings').select('*').eq('id', id).single();
        if (data) {
            setSelectedBooking(data);
            setBookings(prev => prev.map(b => b.id === id ? data : b));
        }
    };

    const sendQuoteEmail = async (booking: Booking) => {
        if (!booking.total_price) {
            alert('Please set a price before sending the quote.');
            return;
        }
        setSendingQuote(true);
        setQuoteSent(false);
        try {
            const res = await adminFetch('/api/send-quote-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    booking,
                    currency: booking.currency || 'SAR',
                    additionalEmails: ccEmails.split(',').map(e => e.trim()).filter(e => e.includes('@')),
                }),
            });
            if (!res.ok) throw new Error('Failed');
            setQuoteSent(true);
            await refreshSelectedBooking(booking.id);
            setTimeout(() => setQuoteSent(false), 4000);
        } catch {
            alert('Failed to send quote email. Please try again.');
        } finally {
            setSendingQuote(false);
        }
    };

    const sendReceiptEmail = async (booking: Booking) => {
        if (!booking.customer_email) {
            alert('No customer email on this booking.');
            return;
        }
        if (!booking.total_price) {
            alert('Please set a price before sending the receipt.');
            return;
        }
        setSendingReceipt(true);
        setReceiptSent(false);
        try {
            const curr = booking.currency || 'SAR';
            const amount = booking.total_price.toFixed(2);
            const refId = `RCP-${booking.id.slice(0, 8).toUpperCase()}`;
            const res = await adminFetch('/api/send-receipt-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    booking,
                    pdfBase64: null,
                    filename: `Receipt-${refId}.pdf`,
                    currency: curr,
                    paymentMethod: booking.payment_method || 'Cash to Driver',
                    amountPaid: amount,
                    textOnly: true,
                }),
            });
            if (!res.ok) throw new Error('Failed');
            await supabase.from('bookings').update({ payment_status: 'paid' }).eq('id', booking.id);
            setReceiptSent(true);
            await refreshSelectedBooking(booking.id);
            setTimeout(() => setReceiptSent(false), 4000);
        } catch {
            alert('Failed to send receipt. Please try again.');
        } finally {
            setSendingReceipt(false);
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredBookings.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredBookings.map(b => b.id));
        }
    };


    const handleExport = () => {
        const dataToExport = selectedIds.length > 0 
            ? bookings.filter(b => selectedIds.includes(b.id)) 
            : filteredBookings;

        if (dataToExport.length === 0) return;
        
        const headers = ["ID", "Customer", "Phone", "From", "To", "Date", "Time", "Vehicle", "Price", "Currency", "Status", "Payment", "Driver"];
        const rows = dataToExport.map(b => [
            b.id,
            b.customer_name,
            b.customer_phone,
            b.pickup_location,
            b.destination,
            b.pickup_date,
            b.pickup_time,
            b.vehicle_type,
            b.total_price || 0,
            b.currency || 'SAR',
            b.status,
            b.payment_status,
            b.driver_name || ''
        ]);

        // Quote every field so a comma inside a name/location can't corrupt the row.
        const escapeCsvField = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
        const csvContent = [headers, ...rows].map(row => row.map(escapeCsvField).join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `bookings_export_${new Date().toLocaleDateString('en-CA')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const todayStr = new Date().toLocaleDateString('en-CA');
    // Group by currency instead of summing everything as SAR — a KWD or AED
    // booking's total_price is not directly comparable to a SAR one.
    const todayRevenueByCurrency = bookings
        .filter(b => b.pickup_date === todayStr && !['cancelled', 'pending'].includes(b.status))
        .reduce((acc, b) => {
            const curr = b.currency || 'SAR';
            acc[curr] = (acc[curr] || 0) + (b.total_price || 0);
            return acc;
        }, {} as Record<string, number>);

    const todayActive = bookings.filter(b => b.pickup_date === todayStr && b.status === 'confirmed').length;
    
    const urgentCount = bookings.filter(b => {
        const isToday = b.pickup_date === todayStr;
        const currentTime = new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0');
        const isOverdue = (b.pickup_date < todayStr || (isToday && b.pickup_time < currentTime)) && b.status === 'pending';
        return isOverdue || (isToday && b.status === 'pending');
    }).length;

    const customerStats = bookings.reduce((acc, b) => {
        if (b.customer_phone) {
            acc[b.customer_phone] = (acc[b.customer_phone] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="text-gray-900 p-4 md:p-6 max-w-full xl:max-w-7xl mx-auto w-full">
            {/* Real-time New Booking Alert */}
            {newBookingAlert && (
                <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-right-4">
                    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-primary/30 flex items-center gap-4 max-w-sm">
                        <div className="bg-primary/20 p-2 rounded-full">
                            <Bell className="w-5 h-5 text-primary animate-bounce" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold">New Booking Received!</p>
                            <p className="text-xs text-slate-400 truncate">{newBookingAlert.customer_name} - {newBookingAlert.pickup_location}</p>
                        </div>
                        <Button size="sm" onClick={() => setNewBookingAlert(null)} variant="ghost" className="h-7 text-slate-400 hover:text-white">
                            Dismiss
                        </Button>
                        <Volume2 className="w-3 h-3 text-slate-600" />
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                        Booking Management
                    </h1>
                    <p className="text-gray-500 text-sm">Monitor and process your transport reservations easily.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button onClick={() => setIsCreating(true)} className="bg-primary text-black hover:bg-black hover:text-white font-bold shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> New Booking
                    </Button>
                    <Button variant="outline" onClick={handleExport} className="bg-white hover:bg-gray-50 border-gray-200 text-gray-700 shadow-sm">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-2xl flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl"><Users className="w-5 h-5 text-blue-600" /></div>
                    <div>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Total Bookings</p>
                        <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-2xl flex items-center gap-4">
                    <div className="bg-emerald-100 p-3 rounded-xl"><TrendingUp className="w-5 h-5 text-emerald-600" /></div>
                    <div>
                        <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider">Today's Revenue</p>
                        {Object.keys(todayRevenueByCurrency).length === 0 ? (
                            <p className="text-2xl font-bold text-emerald-700">SAR 0</p>
                        ) : (
                            Object.entries(todayRevenueByCurrency).map(([curr, amount]) => (
                                <p key={curr} className="text-2xl font-bold text-emerald-700">{curr} {amount.toLocaleString()}</p>
                            ))
                        )}
                    </div>
                </div>
                <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-2xl flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-xl"><Activity className="w-5 h-5 text-indigo-600" /></div>
                    <div>
                        <p className="text-indigo-600 text-[10px] font-bold uppercase tracking-wider">Active Jobs Today</p>
                        <p className="text-2xl font-bold text-indigo-700">{todayActive}</p>
                    </div>
                </div>
                <div className={`border p-4 rounded-2xl flex items-center gap-4 shadow-sm transition-all ${urgentCount > 0 ? 'bg-red-50 border-red-200 animate-pulse' : 'bg-white border-gray-200'}`}>
                    <div className={`${urgentCount > 0 ? 'bg-red-200' : 'bg-gray-100'} p-3 rounded-xl`}><AlertTriangle className={`w-5 h-5 ${urgentCount > 0 ? 'text-red-700' : 'text-gray-400'}`} /></div>
                    <div>
                        <p className={`${urgentCount > 0 ? 'text-red-700' : 'text-gray-500'} text-[10px] font-bold uppercase tracking-wider`}>Urgent/Pending</p>
                        <p className={`text-2xl font-bold ${urgentCount > 0 ? 'text-red-700' : 'text-gray-900'}`}>{urgentCount}</p>
                    </div>
                </div>
            </div>

            {/* Status Tabs for Quick Filtering */}
            <div className="flex gap-2 border-b border-gray-200 pb-px mb-6 overflow-x-auto whitespace-nowrap scrollbar-none bg-white p-2 rounded-xl shadow-sm border">
                {[
                    { value: 'all', label: 'All Bookings', count: bookings.length },
                    { value: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
                    { value: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
                    { value: 'quote_sent', label: 'Quote Sent', count: bookings.filter(b => b.status === 'quote_sent').length },
                    { value: 'in_progress', label: 'In Progress', count: bookings.filter(b => b.status === 'in_progress').length },
                    { value: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
                    { value: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length },
                ].map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setStatusFilter(tab.value)}
                        className={`pb-2.5 pt-1 px-4 text-xs font-bold transition-all relative border-b-2 rounded-t-lg ${
                            statusFilter === tab.value
                                ? 'border-primary text-black bg-primary/5'
                                : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        <span className="flex items-center gap-1.5">
                            {tab.label}
                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                                statusFilter === tab.value
                                    ? 'bg-primary text-black font-extrabold'
                                    : 'bg-gray-100 text-gray-600'
                            }`}>
                                {tab.count}
                            </span>
                        </span>
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 mb-6">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search by Name, Phone, Email, Driver, or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary shadow-sm h-11"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mr-1">Quick</span>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => setQuickDate('today')} className="h-7 px-1.5 text-[10px] font-bold">Today</Button>
                            <Button variant="ghost" size="sm" onClick={() => setQuickDate('tomorrow')} className="h-7 px-1.5 text-[10px] font-bold">Tom</Button>
                            <Button variant="ghost" size="sm" onClick={() => setQuickDate('week')} className="h-7 px-1.5 text-[10px] font-bold">Week</Button>
                        </div>
                        <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">From</span>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="text-xs bg-transparent border border-gray-200 rounded-md px-2 py-1 focus:ring-0 cursor-pointer w-[130px]"
                            />
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">To</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="text-xs bg-transparent border border-gray-200 rounded-md px-2 py-1 focus:ring-0 cursor-pointer w-[130px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="bg-white border-gray-200 text-gray-900 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                <SelectValue placeholder="All Bookings" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 text-gray-900 shadow-sm">
                            <SelectItem value="all">All Bookings</SelectItem>
                            <SelectItem value="today">Today's Pickups</SelectItem>
                            <SelectItem value="upcoming">Upcoming (Tomorrow+)</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="quote_sent">Quote Sent</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="no_show">No Show</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1">
                    <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                        <SelectTrigger className="bg-white border-gray-200 text-gray-900 shadow-sm">
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                <SelectValue placeholder="Payment" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 text-gray-900 shadow-lg">
                            <SelectItem value="all">All Payments</SelectItem>
                            <SelectItem value="unpaid">Unpaid</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="partial">Partial</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                </div>
                {(searchTerm || statusFilter !== 'all' || paymentFilter !== 'all' || startDate || endDate) && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('all');
                            setPaymentFilter('all');
                            setStartDate('');
                            setEndDate('');
                            setCurrentPage(1);
                        }}
                        className="h-11 px-4 text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold"
                    >
                        Clear All
                    </Button>
                )}
            </div>

            {/* Bulk Actions Power Toolbar */}
            {selectedIds.length > 0 && (
                <div className="bg-slate-900 text-white p-3 rounded-xl mb-6 flex flex-wrap items-center justify-between gap-2 animate-in slide-in-from-top-4 shadow-2xl border border-primary/30 sticky top-4 z-40 mx-2">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/20 p-2 rounded-lg">
                            <CheckSquare className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white leading-none">{selectedIds.length} Bookings Selected</p>
                            <p className="text-[10px] text-slate-400">Choose an action to apply to all selected</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="h-8 w-px bg-slate-700 mx-2 hidden md:block"></div>
                        <Button size="sm" onClick={() => bulkUpdateStatus('confirmed')} className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 px-4 text-[11px] font-bold rounded-lg border-b-2 border-emerald-800 transition-all active:translate-y-0.5">
                            <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Confirm All
                        </Button>
                        <Button size="sm" onClick={() => bulkUpdateStatus('completed')} className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 text-[11px] font-bold rounded-lg border-b-2 border-blue-800 transition-all active:translate-y-0.5">
                            <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Complete All
                        </Button>
                        <Button size="sm" onClick={() => bulkUpdateStatus('cancelled')} className="bg-slate-700 hover:bg-slate-800 text-white h-9 px-4 text-[11px] font-bold rounded-lg border-b-2 border-slate-900 transition-all active:translate-y-0.5">
                            <X className="w-3.5 h-3.5 mr-1.5" /> Cancel All
                        </Button>
                        <Button size="sm" onClick={() => bulkUpdateStatus('no_show')} className="bg-orange-600 hover:bg-orange-700 text-white h-9 px-4 text-[11px] font-bold rounded-lg border-b-2 border-orange-800 transition-all active:translate-y-0.5">
                            <X className="w-3.5 h-3.5 mr-1.5" /> No Show
                        </Button>
                        <select
                            value=""
                            onChange={e => bulkReassignDriver(e.target.value)}
                            className="h-9 px-3 text-[11px] font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white border-b-2 border-indigo-800 cursor-pointer focus:outline-none"
                        >
                            <option value="" disabled>Reassign Driver...</option>
                            {approvedDrivers.map(d => (
                                <option key={d.id} value={d.id} className="text-gray-900">{d.full_name}</option>
                            ))}
                        </select>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={bulkDelete}
                            className="bg-red-600 hover:bg-red-700 text-white h-9 px-4 text-[11px] font-bold rounded-lg border-b-2 border-red-800 transition-all active:translate-y-0.5"
                        >
                            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedIds([])}
                            className="text-slate-400 hover:text-white h-9 hover:bg-slate-800 transition-all"
                        >
                            Deselect
                        </Button>
                    </div>
                </div>
            )}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
                <Table className="min-w-[700px]">
                    <TableHeader className="bg-gray-50">
                        <TableRow className="border-gray-200 hover:bg-transparent">
                            <TableHead className="w-[50px]">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                    checked={selectedIds.length === filteredBookings.length && filteredBookings.length > 0}
                                    onChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead className="text-gray-500 font-semibold">Booking ID</TableHead>
                            <TableHead className="text-gray-500 font-semibold cursor-pointer hover:text-black" onClick={() => requestSort('customer_name')}>
                                <div className="flex items-center gap-1">
                                    Customer <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-gray-500 font-semibold">Trip Details</TableHead>
                            <TableHead className="text-gray-500 font-semibold">Vehicle</TableHead>
                            <TableHead className="text-gray-500 font-semibold cursor-pointer hover:text-black" onClick={() => requestSort('pickup_date')}>
                                <div className="flex items-center gap-1">
                                    Date & Time <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-gray-500 font-semibold cursor-pointer hover:text-black" onClick={() => requestSort('total_price')}>
                                <div className="flex items-center gap-1">
                                    Price <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-gray-500 font-semibold cursor-pointer hover:text-black" onClick={() => requestSort('status')}>
                                <div className="flex items-center gap-1">
                                    Status <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-gray-500 font-semibold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedBookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-20 text-gray-500">
                                    <div className="flex flex-col items-center gap-3">
                                        <Search className="w-10 h-10 text-gray-200" />
                                        <p className="text-lg font-medium text-gray-400">No bookings found</p>
                                        <Button variant="outline" size="sm" onClick={() => {setSearchTerm(''); setStatusFilter('all'); setStartDate(''); setEndDate('');}}>
                                            Clear all filters
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedBookings.map((booking) => {
                                const isSelected = selectedIds.includes(booking.id);
                                const now = new Date();
                                const todayStr = now.toLocaleDateString('en-CA');
                                const currentTime = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
                                
                                const isToday = booking.pickup_date === todayStr;
                                const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
                                const isTomorrow = booking.pickup_date === tomorrow.toLocaleDateString('en-CA');
                                
                                const isOverdue = (booking.pickup_date < todayStr || (isToday && booking.pickup_time < currentTime)) && 
                                                 booking.status === 'pending';
                                
                                const actionNeeded = (isToday || isTomorrow || isOverdue) && 
                                                    booking.status !== 'completed' && booking.status !== 'cancelled';

                                return (
                                    <TableRow key={booking.id} className={`border-gray-200 hover:bg-gray-50 transition-colors ${isOverdue ? 'bg-red-100/50' : actionNeeded ? 'bg-red-50/50' : ''} ${isSelected ? 'bg-primary/5' : ''}`}>
                                        <TableCell>
                                            <input 
                                                type="checkbox" 
                                                className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                                checked={isSelected}
                                                onChange={() => toggleSelect(booking.id)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-gray-500">
                                            <div className="flex items-center gap-1 group/id cursor-copy" onClick={() => {
                                                navigator.clipboard.writeText(booking.id);
                                            }}>
                                                {booking.id.slice(0, 8)}
                                                <Copy className="w-3 h-3 opacity-0 group-hover/id:opacity-100 transition-opacity" />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{booking.customer_name}</span>
                                                    {customerStats[booking.customer_phone] >= 3 && (
                                                        <span title="Platinum Client (Repeat)">
                                                            <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                                        </span>
                                                    )}
                                                    {booking.status === 'pending' && (
                                                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                                                            <Clock className="w-2.5 h-2.5" />
                                                            {getTimeSince(booking.created_at)}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-500">{booking.customer_email}</span>
                                                {booking.tags && (
                                                    <div className="flex gap-1 mt-1 flex-wrap">
                                                        {booking.tags.split(',').map(tag => (
                                                            <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-sm font-bold uppercase tracking-tighter">
                                                                {tag.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1 text-sm">
                                                <div className="flex items-center gap-1 text-gray-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                    {booking.pickup_location}
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                    {booking.destination}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`bg-gray-100 border-gray-200 text-gray-800 font-medium whitespace-nowrap ${booking.actual_vehicle && booking.actual_vehicle !== booking.vehicle_type ? 'border-amber-300 ring-1 ring-amber-100' : ''}`}>
                                                {booking.vehicle_type}
                                            </Badge>
                                            {booking.actual_vehicle && booking.actual_vehicle !== booking.vehicle_type && (
                                                <div className="text-[9px] text-amber-600 font-bold uppercase mt-1">
                                                    Sent: {booking.actual_vehicle}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <span className={isOverdue ? 'text-red-700 font-black' : actionNeeded ? 'text-red-600 font-bold animate-pulse' : 'text-gray-700'}>{booking.pickup_date}</span>
                                                {isOverdue && <Badge className="bg-red-700 text-white border-none animate-pulse text-[10px]">OVERDUE</Badge>}
                                                {isToday && !isOverdue && <Badge className="bg-red-500 hover:bg-red-600 animate-pulse text-[10px] uppercase border-none text-white px-1.5 py-0">Today</Badge>}
                                                {isTomorrow && <Badge className="bg-orange-500 hover:bg-orange-600 text-[10px] uppercase border-none text-white px-1.5 py-0">Tomorrow</Badge>}
                                            </div>
                                            <div className={`text-xs ${isOverdue ? 'text-red-700 font-bold' : 'text-gray-500'}`}>{formatTime12h(booking.pickup_time)}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="group relative w-fit">
                                                <span className="text-sm font-bold text-gray-900 border-b border-dotted border-gray-400 cursor-help whitespace-nowrap">
                                                    {booking.currency || 'SAR'} {booking.total_price ?? '—'}
                                                </span>
                                                {(!booking.currency || booking.currency === 'SAR') && booking.total_price ? (
                                                    <div className="invisible group-hover:visible absolute left-0 -top-8 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap z-50 shadow-xl">
                                                        {getCurrencyTooltip(booking.total_price)}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                defaultValue={booking.status}
                                                onValueChange={(val) => updateStatus(booking.id, val)}
                                            >
                                                <SelectTrigger className={`h-8 w-[110px] ${getStatusColor(booking.status)} uppercase text-[9px] font-bold tracking-widest shadow-sm border-gray-200`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="quote_sent">Quote Sent</SelectItem>
                                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                                    <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="no_show">No Show</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openInGoogleMaps(booking.pickup_location, booking.destination)}
                                                    className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                                                    title="View Map Route"
                                                >
                                                    <MapPin className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openWhatsApp(booking.customer_phone)}
                                                    className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                                    title="Open WhatsApp"
                                                >
                                                    <MessageSquare className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        const url = absoluteUrl(`/track-booking/${booking.id}`);
                                                        navigator.clipboard.writeText(url);
                                                        alert('Journey link copied to clipboard!');
                                                    }}
                                                    className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                                                    title="Copy Journey Link"
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => router.push(`/admin/bookings/${booking.id}/handover`)}
                                                    className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                                    title="Driver Handover Sheet"
                                                >
                                                    <Printer className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openBookingDetails(booking)}
                                                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => deleteBooking(booking.id)}
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card List (shown below md breakpoint instead of the table) */}
            <div className="md:hidden space-y-3">
                {paginatedBookings.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm text-center py-16 px-4">
                        <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                        <p className="text-base font-medium text-gray-400 mb-3">No bookings found</p>
                        <Button variant="outline" size="sm" onClick={() => { setSearchTerm(''); setStatusFilter('all'); setStartDate(''); setEndDate(''); }}>
                            Clear all filters
                        </Button>
                    </div>
                ) : (
                    paginatedBookings.map((booking) => {
                        const isSelected = selectedIds.includes(booking.id);
                        const now = new Date();
                        const todayStr = now.toLocaleDateString('en-CA');
                        const currentTime = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');

                        const isToday = booking.pickup_date === todayStr;
                        const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
                        const isTomorrow = booking.pickup_date === tomorrow.toLocaleDateString('en-CA');

                        const isOverdue = (booking.pickup_date < todayStr || (isToday && booking.pickup_time < currentTime)) &&
                            booking.status === 'pending';

                        return (
                            <div
                                key={booking.id}
                                className={`bg-white rounded-xl border shadow-sm p-4 ${isOverdue ? 'border-red-300 bg-red-50/40' : isSelected ? 'border-primary/40 bg-primary/5' : 'border-gray-200'}`}
                            >
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div className="flex items-start gap-2 min-w-0">
                                        <input
                                            type="checkbox"
                                            className="mt-1 rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 shrink-0"
                                            checked={isSelected}
                                            onChange={() => toggleSelect(booking.id)}
                                        />
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className="font-bold text-gray-900 truncate">{booking.customer_name}</span>
                                                {customerStats[booking.customer_phone] >= 3 && (
                                                    <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">{booking.customer_email}</p>
                                            <div
                                                className="flex items-center gap-1 text-[10px] font-mono text-gray-400 mt-0.5 cursor-copy"
                                                onClick={() => navigator.clipboard.writeText(booking.id)}
                                            >
                                                #{booking.id.slice(0, 8)} <Copy className="w-2.5 h-2.5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1 shrink-0">
                                        {isOverdue && <Badge className="bg-red-700 text-white border-none text-[9px]">OVERDUE</Badge>}
                                        {isToday && !isOverdue && <Badge className="bg-red-500 text-white border-none text-[9px] uppercase px-1.5 py-0">Today</Badge>}
                                        {isTomorrow && <Badge className="bg-orange-500 text-white border-none text-[9px] uppercase px-1.5 py-0">Tomorrow</Badge>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                    <div className="col-span-2 flex flex-col gap-1 bg-gray-50 rounded-lg p-2 border border-gray-100">
                                        <div className="flex items-center gap-1.5 text-gray-700">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                                            <span className="truncate">{booking.pickup_location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-700">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                                            <span className="truncate">{booking.destination}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Date & Time</p>
                                        <p className={isOverdue ? 'text-red-700 font-bold' : 'text-gray-800 font-medium'}>{booking.pickup_date}</p>
                                        <p className="text-gray-500">{formatTime12h(booking.pickup_time)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Price</p>
                                        <p className="font-bold text-gray-900">{booking.currency || 'SAR'} {booking.total_price ?? '—'}</p>
                                        <p className="text-gray-500 truncate">{booking.vehicle_type}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <Select
                                        defaultValue={booking.status}
                                        onValueChange={(val) => updateStatus(booking.id, val)}
                                    >
                                        <SelectTrigger className={`h-9 flex-1 ${getStatusColor(booking.status)} uppercase text-[10px] font-bold tracking-widest shadow-sm border-gray-200`}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="quote_sent">Quote Sent</SelectItem>
                                            <SelectItem value="confirmed">Confirmed</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="no_show">No Show</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between gap-1 border-t border-gray-100 pt-3">
                                    <Button variant="ghost" size="icon" onClick={() => openInGoogleMaps(booking.pickup_location, booking.destination)} className="h-9 w-9 text-rose-600 hover:bg-rose-50" title="View Map Route">
                                        <MapPin className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => openWhatsApp(booking.customer_phone)} className="h-9 w-9 text-emerald-600 hover:bg-emerald-50" title="Open WhatsApp">
                                        <MessageSquare className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/bookings/${booking.id}/handover`)} className="h-9 w-9 text-orange-600 hover:bg-orange-50" title="Driver Handover Sheet">
                                        <Printer className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => openBookingDetails(booking)} className="h-9 w-9 text-blue-600 hover:bg-blue-50" title="View Details">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => deleteBooking(booking.id)} className="h-9 w-9 text-red-500 hover:bg-red-50" title="Delete">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination (shared by table and mobile card list) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm mt-3 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-900">{paginatedBookings.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredBookings.length)}</span> of <span className="font-semibold text-gray-900">{filteredBookings.length}</span> bookings
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="bg-white border-gray-200"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let pageNum = i + 1;
                            // Basic logic to show pages around current if total is large
                            if (totalPages > 5 && currentPage > 3) {
                                pageNum = currentPage - 3 + i;
                                if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                            }
                            if (pageNum <= 0) pageNum = i + 1;

                            return (
                                <Button
                                    key={pageNum}
                                    variant={currentPage === pageNum ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={currentPage === pageNum ? "bg-primary text-black" : "bg-white"}
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="bg-white border-gray-200"
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Booking Details Sheet */}
            <Sheet open={!!selectedBooking} onOpenChange={(open) => {
                if (!open) {
                    setSelectedBooking(null);
                    setIsEditing(false);
                }
            }}>
                <SheetContent className="overflow-y-auto bg-white border-l border-gray-200 text-gray-900 w-full sm:max-w-xl">
                    <div className="flex justify-between items-start mb-6">
                        <SheetHeader className="text-left">
                            <SheetTitle className="text-2xl font-bold text-gray-900">Booking Details</SheetTitle>
                            <SheetDescription className="text-gray-500">
                                ID: #{selectedBooking?.id.toUpperCase()}
                            </SheetDescription>
                        </SheetHeader>
                        {!isEditing ? (
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={openReturnTripPrompt} className="bg-white text-blue-600 hover:bg-blue-50 border-blue-200">
                                    <ArrowUpDown className="w-4 h-4 mr-2" /> Return Trip
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="bg-white text-gray-700 hover:bg-gray-50 border-gray-200">
                                    <Edit2 className="w-4 h-4 mr-2" /> Edit Details
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setEditedBooking(selectedBooking); }} className="text-gray-500 hover:bg-gray-100">
                                    Cancel
                                </Button>
                                <Button size="sm" onClick={saveDetails} className="bg-primary text-black hover:bg-black hover:text-white transition-all font-bold">
                                    <Save className="w-4 h-4 mr-2" /> Save
                                </Button>
                            </div>
                        )}
                    </div>

                    {selectedBooking && editedBooking && (
                        <div className="space-y-8">
                            {/* Status Section */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">Current Status</label>
                                <div className="flex items-center justify-between">
                                    <Badge className={`${getStatusColor(selectedBooking.status)} text-sm px-3 py-1`}>
                                        {selectedBooking.status.toUpperCase()}
                                    </Badge>
                                    <Select
                                        defaultValue={selectedBooking.status}
                                        onValueChange={(val) => updateStatus(selectedBooking.id, val)}
                                        disabled={isEditing}
                                    >
                                        <SelectTrigger className="h-9 w-[150px] bg-white border-gray-300 text-sm shadow-sm disabled:opacity-50">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 text-gray-900">
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="quote_sent">Quote Sent</SelectItem>
                                            <SelectItem value="confirmed">Confirmed</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="no_show">No Show</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    Customer Information
                                </h3>
                                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Full Name</span>
                                            {isEditing ? (
                                                <Input value={editedBooking.customer_name} onChange={(e) => setEditedBooking({ ...editedBooking, customer_name: e.target.value })} className="h-8 text-sm bg-white" />
                                            ) : (
                                                <span className="text-sm font-medium text-gray-900">{selectedBooking.customer_name}</span>
                                            )}
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Phone Number</span>
                                            <div className="flex items-center gap-2">
                                                {isEditing ? (
                                                    <Input value={editedBooking.customer_phone} onChange={(e) => setEditedBooking({ ...editedBooking, customer_phone: e.target.value })} className="h-8 text-sm bg-white" />
                                                ) : (
                                                    <>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {selectedBooking.customer_phone}
                                                        </span>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-6 w-6 text-emerald-600" 
                                                            onClick={() => openWhatsApp(selectedBooking.customer_phone)}
                                                        >
                                                            <MessageSquare className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <span className="block text-xs text-gray-500 mb-1">Email Address</span>
                                            {isEditing ? (
                                                <Input value={editedBooking.customer_email} onChange={(e) => setEditedBooking({ ...editedBooking, customer_email: e.target.value })} className="h-8 text-sm bg-white" />
                                            ) : (
                                                <div className="flex items-center justify-between">
                                                    <a href={`mailto:${selectedBooking.customer_email}`} className="text-sm font-medium text-blue-600 hover:underline">
                                                        {selectedBooking.customer_email}
                                                    </a>
                                                    <Button variant="ghost" size="sm" onClick={() => resendEmail(selectedBooking)} className="h-7 text-[10px] text-gray-500 hover:text-gray-900 border border-gray-100">
                                                        <Share2 className="w-3 h-3 mr-1" /> Resend Notification
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trip Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Trip Information</h3>
                                <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-red-500"></div>

                                    <div className="pl-4 relative">
                                        <span className="block w-3 h-3 bg-green-500 rounded-full absolute left-[-21px] top-1.5 border-2 border-white shadow-[0_0_0_2px_rgba(34,197,94,0.3)]"></span>
                                        <span className="block text-xs text-gray-500 mb-1">Pickup Location</span>
                                        {isEditing ? (
                                            <Input value={editedBooking.pickup_location} onChange={(e) => setEditedBooking({ ...editedBooking, pickup_location: e.target.value })} className="h-8 text-sm bg-white" />
                                        ) : (
                                            <p className="text-base font-medium text-gray-900">{selectedBooking.pickup_location}</p>
                                        )}
                                    </div>

                                    <div className="pl-4 relative">
                                        <span className="block w-3 h-3 bg-red-500 rounded-full absolute left-[-21px] top-1.5 border-2 border-white shadow-[0_0_0_2px_rgba(239,68,68,0.3)]"></span>
                                        <span className="block text-xs text-gray-500 mb-1">Destination</span>
                                        {isEditing ? (
                                            <Input value={editedBooking.destination} onChange={(e) => setEditedBooking({ ...editedBooking, destination: e.target.value })} className="h-8 text-sm bg-white" />
                                        ) : (
                                            <p className="text-base font-medium text-gray-900">{selectedBooking.destination}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pl-4 pt-4 border-t border-gray-200 mt-4">
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Date</span>
                                            {isEditing ? (
                                                <Input type="date" value={editedBooking.pickup_date} onChange={(e) => setEditedBooking({ ...editedBooking, pickup_date: e.target.value })} className="h-8 text-sm bg-white" />
                                            ) : (
                                                <span className="font-medium bg-white border border-gray-200 px-2 py-1 rounded text-sm block w-fit text-gray-900">{selectedBooking.pickup_date}</span>
                                            )}
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Time</span>
                                            {isEditing ? (
                                                <Input type="time" value={editedBooking.pickup_time} onChange={(e) => setEditedBooking({ ...editedBooking, pickup_time: e.target.value })} className="h-8 text-sm bg-white" />
                                            ) : (
                                                <span className="font-medium bg-white border border-gray-200 px-2 py-1 rounded text-sm block w-fit text-gray-900">{formatTime12h(selectedBooking.pickup_time)}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pl-4 pt-3 mt-1 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Flight Number (If applicable)</span>
                                            <div className="flex items-center gap-2">
                                                {isEditing ? (
                                                    <Input value={editedBooking.flight_number || ''} onChange={(e) => setEditedBooking({ ...editedBooking, flight_number: e.target.value })} className="h-8 text-sm bg-white w-32" placeholder="e.g. EK803" />
                                                ) : (
                                                    <>
                                                        <span className="text-sm font-semibold text-gray-900">{selectedBooking.flight_number || 'N/A'}</span>
                                                        {selectedBooking.flight_number && (
                                                            <a 
                                                                href={`https://www.flightradar24.com/data/flights/${selectedBooking.flight_number}`} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                                                            >
                                                                <ExternalLink className="w-3 h-3" /> Track Flight
                                                            </a>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="block text-xs text-gray-500 mb-1">Round Trip?</span>
                                            {isEditing ? (
                                                <button
                                                    onClick={() => setEditedBooking({ ...editedBooking, has_return_trip: !editedBooking.has_return_trip })}
                                                    className={`h-8 px-3 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                                                        editedBooking.has_return_trip 
                                                        ? 'bg-blue-600 text-white border-blue-700 shadow-sm' 
                                                        : 'bg-white text-gray-400 border border-gray-200'
                                                    }`}
                                                >
                                                    {editedBooking.has_return_trip ? '🔄 Enabled' : 'Disabled'}
                                                </button>
                                            ) : (
                                                <Badge className={selectedBooking.has_return_trip ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-400 border-gray-200'}>
                                                    {selectedBooking.has_return_trip ? '🔄 ROUND TRIP' : 'ONE WAY'}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle & Requirements */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Vehicle & Requirements</h3>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Vehicle Type</span>
                                            {isEditing ? (
                                                <div className="space-y-2">
                                                    <Input 
                                                        value={editedBooking.vehicle_type} 
                                                        onChange={(e) => setEditedBooking({ ...editedBooking, vehicle_type: e.target.value })} 
                                                        className="h-8 text-sm bg-white" 
                                                        placeholder="e.g. Sedan, Custom Van"
                                                    />
                                                    <div className="flex flex-wrap gap-1">
                                                        {['Toyota Camry', 'GMC Yukon XL / Denali', 'Hyundai Staria VIP', 'Hyundai Starex', 'Toyota Hiace', 'Toyota Coaster', 'Mercedes S-Class', 'BMW 7 Series', 'Mercedes Sprinter'].map((v) => (
                                                            <span 
                                                                key={v}
                                                                onClick={() => setEditedBooking({ ...editedBooking, vehicle_type: v })}
                                                                className={`text-[10px] px-1.5 py-0.5 rounded cursor-pointer transition-colors border ${
                                                                    editedBooking.vehicle_type === v 
                                                                    ? 'bg-primary border-primary text-black font-bold' 
                                                                    : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                                                                }`}
                                                            >
                                                                {v.split(' ')[0]} {v.split(' ')[1] || ''}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <Badge variant="outline" className="text-sm bg-white border-gray-200 text-gray-900 font-medium">
                                                    {selectedBooking.vehicle_type}
                                                </Badge>
                                            )}
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Total Quote</span>
                                            <div className="flex items-center gap-2">
                                                {isEditing ? (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-1">
                                                            <div className="relative">
                                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">CURR</span>
                                                                <Input 
                                                                    value={editedBooking.currency || 'SAR'} 
                                                                    onChange={(e) => setEditedBooking({ ...editedBooking, currency: e.target.value.toUpperCase() })} 
                                                                    className="h-8 text-[10px] pl-9 w-20 bg-white font-bold" 
                                                                    placeholder="SAR"
                                                                />
                                                            </div>
                                                            <Input 
                                                                type="number" 
                                                                value={editedBooking.total_price || ''} 
                                                                onChange={(e) => setEditedBooking({ ...editedBooking, total_price: parseFloat(e.target.value) })} 
                                                                className="h-8 text-sm bg-white font-bold w-24" 
                                                                placeholder="Price"
                                                            />
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-8 w-8 text-primary" 
                                                                onClick={() => suggestPrice(editedBooking.pickup_location, editedBooking.destination, editedBooking.vehicle_type, 'edit')}
                                                                title="Suggest Price"
                                                            >
                                                                <Calculator className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {['SAR', 'USD', 'AED', 'KWD', 'OMR', 'BHD'].map((curr) => (
                                                                <span 
                                                                    key={curr}
                                                                    onClick={() => setEditedBooking({ ...editedBooking, currency: curr })}
                                                                    className={`text-[9px] px-1 py-0.5 rounded cursor-pointer transition-colors border ${
                                                                        editedBooking.currency === curr 
                                                                        ? 'bg-primary border-primary text-black font-bold' 
                                                                        : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                                                                    }`}
                                                                >
                                                                    {curr}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="text-lg font-bold text-green-600">
                                                            {selectedBooking.total_price ? `${selectedBooking.currency || 'SAR'} ${selectedBooking.total_price}` : 'Calculating...'}
                                                        </span>
                                                        {selectedBooking.total_price ? (
                                                            <div className="flex flex-col gap-1 w-full mt-1">
                                                                <input
                                                                    type="text"
                                                                    value={ccEmails}
                                                                    onChange={e => setCcEmails(e.target.value)}
                                                                    placeholder="CC emails (comma separated, optional)"
                                                                    className="w-full border border-gray-200 rounded px-2 py-1 text-[11px] outline-none focus:border-blue-400"
                                                                />
                                                                <Button
                                                                    size="sm"
                                                                    disabled={sendingQuote}
                                                                    onClick={() => sendQuoteEmail(selectedBooking)}
                                                                    className={`h-7 text-[10px] font-bold px-3 ${quoteSent ? 'bg-green-500 text-white hover:bg-green-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                                                >
                                                                    {sendingQuote ? 'Sending...' : quoteSent ? '✓ Quote Sent!' : '📧 Send Quote Email'}
                                                                </Button>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Passengers</span>
                                            {isEditing ? (
                                                <Input type="number" value={editedBooking.passengers} onChange={(e) => setEditedBooking({ ...editedBooking, passengers: parseInt(e.target.value) })} className="h-8 text-sm bg-white" />
                                            ) : (
                                                <span className="font-medium text-gray-900">{selectedBooking.passengers} <span className="text-xs text-gray-500">People</span></span>
                                            )}
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Luggage</span>
                                            {isEditing ? (
                                                <Input type="number" value={editedBooking.luggage} onChange={(e) => setEditedBooking({ ...editedBooking, luggage: parseInt(e.target.value) })} className="h-8 text-sm bg-white" />
                                            ) : (
                                                <span className="font-medium text-gray-900">{selectedBooking.luggage} <span className="text-xs text-gray-500">Bags</span></span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Payment Status</span>
                                            {isEditing ? (
                                                <div className="space-y-2">
                                                    <Input 
                                                        value={editedBooking.payment_status || ''} 
                                                        onChange={(e) => setEditedBooking({ ...editedBooking, payment_status: e.target.value })} 
                                                        className="h-8 text-sm bg-white" 
                                                        placeholder="e.g. unpaid, paid, custom state"
                                                    />
                                                    <div className="flex flex-wrap gap-1">
                                                        {['unpaid', 'paid', 'partial', 'refunded'].map((v) => (
                                                            <span 
                                                                key={v}
                                                                onClick={() => setEditedBooking({ ...editedBooking, payment_status: v })}
                                                                className="text-[10px] px-1.5 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer transition-colors border border-gray-200 uppercase"
                                                            >
                                                                {v}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <Badge variant="outline" className={`${getPaymentStatusColor(selectedBooking.payment_status || 'unpaid')} text-xs font-bold`}>
                                                    {(selectedBooking.payment_status || 'unpaid').toUpperCase()}
                                                </Badge>
                                            )}
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Driver Name</span>
                                            {isEditing ? (
                                                <div className="space-y-1">
                                                    <Select
                                                        onValueChange={(driverId) => {
                                                            const d = approvedDrivers.find(dr => dr.id === driverId);
                                                            if (d) {
                                                                setEditedBooking({
                                                                    ...editedBooking,
                                                                    driver_id: d.id,
                                                                    driver_name: d.full_name,
                                                                    driver_phone: d.phone_number,
                                                                    driver_plate: d.vehicle_plate || editedBooking.driver_plate,
                                                                });
                                                            }
                                                        }}
                                                    >
                                                        <SelectTrigger className="h-8 text-sm bg-white">
                                                            <SelectValue placeholder={approvedDrivers.length ? 'Pick from roster...' : 'No approved drivers yet'} />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white border-gray-200">
                                                            {approvedDrivers.map(d => (
                                                                <SelectItem key={d.id} value={d.id}>{d.full_name} — {d.vehicle_model}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <Input value={editedBooking.driver_name || ''} onChange={(e) => setEditedBooking({ ...editedBooking, driver_name: e.target.value })} className="h-8 text-sm bg-white" placeholder="Or type a name manually" />
                                                </div>
                                            ) : (
                                                <span className="font-medium text-gray-900">{selectedBooking.driver_name || 'Not Assigned'}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div>
                                        <span className="block text-xs text-gray-500 mb-1">Payment Method</span>
                                        {isEditing ? (
                                            <div className="space-y-2">
                                                <Input
                                                    value={editedBooking.payment_method || ''}
                                                    onChange={(e) => setEditedBooking({ ...editedBooking, payment_method: e.target.value })}
                                                    className="h-8 text-sm bg-white"
                                                    placeholder="Cash to Driver"
                                                />
                                                <div className="flex flex-wrap gap-1">
                                                    {['Cash to Driver', 'Credit Card', 'Bank Transfer', 'Online Payment', 'Complimentary'].map((m) => (
                                                        <span
                                                            key={m}
                                                            onClick={() => setEditedBooking({ ...editedBooking, payment_method: m })}
                                                            className={`text-[10px] px-1.5 py-0.5 rounded cursor-pointer transition-colors border ${
                                                                editedBooking.payment_method === m
                                                                ? 'bg-primary border-primary text-black font-bold'
                                                                : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                                                            }`}
                                                        >
                                                            {m}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="font-medium text-gray-900 text-sm">{selectedBooking.payment_method || 'Cash to Driver'}</span>
                                        )}
                                    </div>

                                    {/* Driver Details Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Driver Phone</span>
                                            {isEditing ? (
                                                <Input value={editedBooking.driver_phone || ''} onChange={(e) => setEditedBooking({ ...editedBooking, driver_phone: e.target.value })} className="h-8 text-sm bg-white" placeholder="+966 5XX XXX XXXX" />
                                            ) : (
                                                <span className="font-medium text-gray-900">{selectedBooking.driver_phone || '—'}</span>
                                            )}
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Vehicle Plate</span>
                                            {isEditing ? (
                                                <Input value={editedBooking.driver_plate || ''} onChange={(e) => setEditedBooking({ ...editedBooking, driver_plate: e.target.value })} className="h-8 text-sm bg-white" placeholder="e.g. ABC 1234" />
                                            ) : (
                                                <span className="font-medium text-gray-900">{selectedBooking.driver_plate || '—'}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Assign Driver & Notify Button */}
                                    {!isEditing && selectedBooking.driver_name && selectedBooking.driver_phone && (
                                        <DriverNotifyButton booking={selectedBooking} onSuccess={(id) => refreshSelectedBooking(id)} />
                                    )}

                                    <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Actual Vehicle Sent</span>
                                            {isEditing ? (
                                                <Input value={editedBooking.actual_vehicle || ''} onChange={(e) => setEditedBooking({ ...editedBooking, actual_vehicle: e.target.value })} className="h-8 text-sm bg-white" placeholder="e.g. Camry 2024" />
                                            ) : (
                                                <span className="font-medium text-gray-900">{selectedBooking.actual_vehicle || 'Matches Booking'}</span>
                                            )}
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 mb-1">Internal Management Tags</span>
                                            {isEditing ? (
                                                <Input value={editedBooking.tags || ''} onChange={(e) => setEditedBooking({ ...editedBooking, tags: e.target.value })} className="h-8 text-sm bg-white" placeholder="VIP, Urgent, Recurring" />
                                            ) : (
                                                <div className="flex gap-1 flex-wrap">
                                                    {selectedBooking.tags ? (
                                                        selectedBooking.tags.split(',').map(tag => (
                                                            <Badge key={tag} variant="secondary" className="text-[9px] bg-indigo-50 text-indigo-700">{tag.trim()}</Badge>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-400 text-xs italic">No tags</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-500 mb-1">Special Requests / Notes</span>
                                        {isEditing ? (
                                            <textarea value={editedBooking.special_requests || ''} onChange={(e) => setEditedBooking({ ...editedBooking, special_requests: e.target.value })} className="w-full min-h-[60px] p-2 text-sm border border-gray-200 rounded-md bg-white text-gray-900" />
                                        ) : (
                                            <div className="bg-white border border-gray-200 p-3 rounded text-sm text-gray-700 min-h-[40px] whitespace-pre-wrap">
                                                {selectedBooking.special_requests || "No special requests."}
                                            </div>
                                        )}
                                    </div>

                                    {/* Email Activity Log */}
                                    {(() => {
                                        const notes = selectedBooking.internal_notes || '';
                                        const emailLines = notes.split('\n').filter(l => l.startsWith('📧'));
                                        if (emailLines.length === 0) return null;
                                        return (
                                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                                                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Email Activity</span>
                                                </div>
                                                <div className="space-y-1.5">
                                                    {emailLines.map((line, i) => (
                                                        <div key={i} className="flex items-start gap-2 text-xs text-blue-800 bg-white rounded-md px-3 py-1.5 border border-blue-100">
                                                            <span className="font-medium">{line.replace('📧 ', '')}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <div className="bg-slate-900/5 p-4 rounded-lg border-2 border-slate-200 border-dashed">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-slate-900 animate-pulse"></div>
                                            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Internal Admin Notes (Private)</span>
                                        </div>
                                        {isEditing ? (
                                            <textarea
                                                value={(editedBooking.internal_notes || '').split('\n').filter(l => !l.startsWith('📧')).join('\n')}
                                                onChange={(e) => {
                                                    const emailLines = (editedBooking.internal_notes || '').split('\n').filter(l => l.startsWith('📧'));
                                                    const combined = [...emailLines, ...e.target.value.split('\n').filter(l => !l.startsWith('📧'))].join('\n');
                                                    setEditedBooking({ ...editedBooking, internal_notes: combined });
                                                }}
                                                className="w-full min-h-[80px] p-2 text-sm border-2 border-slate-200 rounded-md bg-white text-slate-800 placeholder:text-slate-300"
                                                placeholder="Write a private note for the team..."
                                            />
                                        ) : (
                                            <div className="text-sm text-slate-700 italic border-l-4 border-slate-300 pl-3 py-1">
                                                {(selectedBooking.internal_notes || '').split('\n').filter(l => !l.startsWith('📧')).join('\n') || "No private notes yet. Team can record internal details here."}
                                            </div>
                                        )}
                                    </div>

                                    {!isEditing && (
                                        <div className="space-y-3">
                                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest text-center mt-6 mb-2">Quick WhatsApp Templates</span>
                                            <div className="grid grid-cols-3 gap-2">
                                                <Button size="sm" variant="outline" className="flex flex-col h-16 gap-1 border-emerald-100 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800" onClick={() => sendWhatsAppHello(selectedBooking)}>
                                                    <UserCircle className="w-4 h-4" />
                                                    <span className="text-[10px] font-bold">Hello</span>
                                                </Button>
                                                <Button size="sm" variant="outline" className="flex flex-col h-16 gap-1 border-blue-100 hover:bg-blue-50 text-blue-700 hover:text-blue-800" onClick={() => sendWhatsAppDriver(selectedBooking)}>
                                                    <Handshake className="w-4 h-4" />
                                                    <span className="text-[10px] font-bold">Driver Info</span>
                                                </Button>
                                                <Button size="sm" variant="outline" className="flex flex-col h-16 gap-1 border-purple-100 hover:bg-purple-50 text-purple-700 hover:text-purple-800" onClick={() => sendWhatsAppPrice(selectedBooking)}>
                                                    <Wallet className="w-4 h-4" />
                                                    <span className="text-[10px] font-bold">Price Info</span>
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-200 space-y-3">
                                {!isEditing && selectedBooking.status === 'pending' && (
                                    <>
                                        <Button
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-md transition-all"
                                            onClick={() => { sendQuoteEmail(selectedBooking); updateStatus(selectedBooking.id, 'quote_sent'); }}
                                            disabled={sendingQuote}
                                        >
                                            <FileText className="w-5 h-5 mr-2" /> Send Quote to Customer
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-bold h-10 transition-all"
                                            onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" /> Confirm Directly (Skip Quote)
                                        </Button>
                                    </>
                                )}

                                {!isEditing && selectedBooking.status === 'quote_sent' && (
                                    <Button
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 transition-all"
                                        onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                                    >
                                        <CheckCircle className="w-5 h-5 mr-2" /> Mark as Confirmed
                                    </Button>
                                )}

                                {!isEditing && selectedBooking.status === 'confirmed' && (
                                    <Button
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-12 transition-all"
                                        onClick={() => updateStatus(selectedBooking.id, 'in_progress')}
                                    >
                                        <Truck className="w-5 h-5 mr-2" /> Start Trip — Driver En Route
                                    </Button>
                                )}

                                {!isEditing && selectedBooking.status === 'in_progress' && (
                                    <Button
                                        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold h-12 transition-all"
                                        onClick={() => updateStatus(selectedBooking.id, 'completed')}
                                    >
                                        <CheckCircle className="w-5 h-5 mr-2" /> Complete Journey
                                    </Button>
                                )}

                                {!isEditing && selectedBooking.status === 'completed' && (
                                    <Button
                                        className={`w-full font-bold h-12 transition-all ${receiptSent ? 'bg-green-500 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                                        onClick={() => sendReceiptEmail(selectedBooking)}
                                        disabled={sendingReceipt}
                                    >
                                        {sendingReceipt ? (
                                            <span className="flex items-center gap-2"><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"></span> Sending Receipt...</span>
                                        ) : receiptSent ? (
                                            <span>✓ Receipt Sent to Customer!</span>
                                        ) : (
                                            <span className="flex items-center gap-2"><Mail className="w-5 h-5" /> Send Payment Receipt</span>
                                        )}
                                    </Button>
                                )}

                                {!isEditing && (
                                    <div className="mt-4 border-t border-gray-200 pt-3 flex flex-col gap-2">
                                        <Button 
                                            variant="outline" 
                                            className="w-full bg-purple-50 border-purple-200 hover:bg-purple-100 hover:text-purple-900 text-purple-700 transition-all font-semibold" 
                                            onClick={() => window.open(`/admin/bookings/${selectedBooking.id}/letterhead/`, '_blank')}
                                        >
                                            <FileText className="w-4 h-4 mr-2" /> View/Print Quotation
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full bg-blue-50 border-blue-200 hover:bg-blue-100 hover:text-blue-900 text-blue-700 transition-all font-semibold"
                                            onClick={() => window.open(`/admin/bookings/${selectedBooking.id}/invoice/`, '_blank')}
                                        >
                                            <Printer className="w-4 h-4 mr-2" /> View/Print Invoice
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full bg-green-50 border-green-300 hover:bg-green-100 hover:text-green-900 text-green-700 transition-all font-semibold"
                                            onClick={() => window.open(`/admin/bookings/${selectedBooking.id}/receipt/`, '_blank')}
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" /> View/Send Receipt
                                        </Button>
                                        <Button variant="outline" className="w-full bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-900 text-gray-700 transition-all font-semibold" onClick={() => shareB2BOptions(selectedBooking)}>
                                            <Copy className="w-4 h-4 mr-2 text-gray-500" /> Copy B2B Message
                                        </Button>
                                        <Button variant="outline" className="w-full bg-green-50 border-green-200 hover:bg-green-100 hover:text-green-900 text-green-700 transition-all font-semibold" onClick={() => shareClientDetails(selectedBooking)}>
                                            <MessageSquare className="w-4 h-4 mr-2 text-green-600" /> Copy Client Details (WhatsApp)
                                        </Button>
                                        <Button variant="outline" className="w-full bg-amber-50 border-amber-200 hover:bg-amber-100 hover:text-amber-900 text-amber-700 transition-all font-semibold" onClick={() => shareDriverDetails(selectedBooking)}>
                                            <Car className="w-4 h-4 mr-2 text-amber-600" /> Copy for Driver (No Price)
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            className="w-full bg-slate-50 border-slate-200 hover:bg-slate-100 hover:text-slate-900 text-slate-700 transition-all font-bold" 
                                            onClick={() => {
                                                const url = `/admin/bookings/${selectedBooking.id}/handover/`;
                                                window.open(url, '_blank');
                                            }}
                                        >
                                            <Printer className="w-4 h-4 mr-2 text-slate-600" /> Driver Handover Sheet (PDF)
                                        </Button>
                                    </div>
                                )}

                                {!isEditing && (
                                    <Button variant="ghost" className="w-full hover:bg-red-50 text-red-500 hover:text-red-600 mt-2 transition-all" onClick={() => deleteBooking(selectedBooking.id)}>
                                        <Trash2 className="w-4 h-4 mr-2" /> Delete This Booking
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* Return Trip Quick Prompt */}
            <Dialog open={showReturnPrompt} onOpenChange={setShowReturnPrompt}>
                <DialogContent className="bg-white border-gray-200 text-gray-900 sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Return Trip Details</DialogTitle>
                        <DialogDescription>
                            Pickup and drop-off will be swapped automatically. Confirm whatever's different from the outbound trip below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Return Date</label>
                            <Input
                                type="date"
                                value={returnTripDraft.pickup_date}
                                onChange={(e) => setReturnTripDraft({ ...returnTripDraft, pickup_date: e.target.value })}
                                className="bg-white border-gray-200"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Pickup Time</label>
                            <Input
                                type="time"
                                value={returnTripDraft.pickup_time}
                                onChange={(e) => setReturnTripDraft({ ...returnTripDraft, pickup_time: e.target.value })}
                                className="bg-white border-gray-200"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Passengers</label>
                            <Input
                                type="number"
                                min={1}
                                value={returnTripDraft.passengers}
                                onChange={(e) => setReturnTripDraft({ ...returnTripDraft, passengers: parseInt(e.target.value) || 1 })}
                                className="bg-white border-gray-200"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Luggage</label>
                            <Input
                                type="number"
                                min={0}
                                value={returnTripDraft.luggage}
                                onChange={(e) => setReturnTripDraft({ ...returnTripDraft, luggage: parseInt(e.target.value) || 0 })}
                                className="bg-white border-gray-200"
                            />
                        </div>
                        <div className="space-y-1 col-span-2">
                            <label className="text-sm font-medium text-gray-700">Vehicle Type</label>
                            <Select
                                value={returnTripDraft.vehicle_type}
                                onValueChange={(val) => setReturnTripDraft({ ...returnTripDraft, vehicle_type: val })}
                            >
                                <SelectTrigger className="bg-white border-gray-200">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-200">
                                    {VEHICLE_OPTIONS.map((v) => (
                                        <SelectItem key={v} value={v}>{v}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {selectedBooking && returnTripDraft.vehicle_type !== selectedBooking.vehicle_type && (
                                <p className="text-[11px] text-amber-600 font-medium">
                                    Different from outbound vehicle ({selectedBooking.vehicle_type})
                                </p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowReturnPrompt(false)}>Cancel</Button>
                        <Button className="bg-primary text-black hover:bg-black hover:text-white font-bold" onClick={generateReturnTrip}>
                            Continue to Booking Form
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Create Booking Sheet */}
            <Sheet open={isCreating} onOpenChange={setIsCreating}>
                <SheetContent className="overflow-y-auto bg-white border-l border-gray-200 text-gray-900 w-full sm:max-w-xl">
                    <SheetHeader className="text-left mb-6">
                        <SheetTitle className="text-2xl font-bold text-gray-900">Create New Booking</SheetTitle>
                        <SheetDescription className="text-gray-500">
                            Manually add a booking from WhatsApp or other sources.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-6">
                        {/* Customer Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Customer Details</h3>
                            {duplicateFound && (
                                <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex items-center gap-3 animate-pulse">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-red-700">Possible Duplicate!</p>
                                        <p className="text-[10px] text-red-600">This client already has a booking at this date/time.</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="h-7 text-[10px]" onClick={() => openBookingDetails(duplicateFound)}>View Old</Button>
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <Input
                                        placeholder="John Doe"
                                        value={newBooking.customer_name}
                                        onChange={(e) => setNewBooking({ ...newBooking, customer_name: e.target.value })}
                                        className="bg-white border-gray-200 focus:border-primary"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                    <div className="relative">
                                        <Input
                                            placeholder="+966..."
                                            value={newBooking.customer_phone}
                                            onChange={(e) => setNewBooking({ ...newBooking, customer_phone: e.target.value })}
                                            className="bg-white border-gray-200 focus:border-primary"
                                        />
                                        <div className="absolute right-3 top-2.5">
                                            <div className="w-2 h-2 rounded-full bg-primary/20 animate-ping"></div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400">Searching repeat customer as you type...</p>
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="customer@example.com"
                                        value={newBooking.customer_email}
                                        onChange={(e) => setNewBooking({ ...newBooking, customer_email: e.target.value })}
                                        className="bg-white border-gray-200 focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Trip Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Trip Information</h3>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Pickup Location</label>
                                    <Input
                                        placeholder="Hotel, Airport, etc."
                                        value={newBooking.pickup_location}
                                        onChange={(e) => setNewBooking({ ...newBooking, pickup_location: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Destination</label>
                                    <Input
                                        placeholder="Hotel, Airport, etc."
                                        value={newBooking.destination}
                                        onChange={(e) => setNewBooking({ ...newBooking, destination: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700">Pickup Date</label>
                                            <Input
                                                type="date"
                                                value={newBooking.pickup_date}
                                                onChange={(e) => setNewBooking({ ...newBooking, pickup_date: e.target.value })}
                                                className="bg-white border-gray-200"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-700">Pickup Time</label>
                                            <Input
                                                type="time"
                                                value={newBooking.pickup_time}
                                                onChange={(e) => setNewBooking({ ...newBooking, pickup_time: e.target.value })}
                                                className="bg-white border-gray-200"
                                            />
                                        </div>
                                        <div className="space-y-1 sm:col-span-2">
                                            <label className="text-sm font-medium text-gray-700">Flight Number (If applicable)</label>
                                            <Input
                                                placeholder="e.g. SV123 or EK803"
                                                value={newBooking.flight_number}
                                                onChange={(e) => setNewBooking({ ...newBooking, flight_number: e.target.value })}
                                                className="bg-white border-gray-200"
                                            />
                                        </div>
                                    </div>
                            </div>
                        </div>

                        {/* Vehicle Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Vehicle & Pricing</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Vehicle Type</label>
                                    <Select
                                        value={newBooking.vehicle_type}
                                        onValueChange={(val) => setNewBooking({ ...newBooking, vehicle_type: val })}
                                    >
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200">
                                            {VEHICLE_OPTIONS.map((v) => (
                                                <SelectItem key={v} value={v}>{v}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Total Price</label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            value={newBooking.total_price}
                                            onChange={(e) => setNewBooking({ ...newBooking, total_price: parseFloat(e.target.value) })}
                                            className="bg-white border-gray-200 font-bold"
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => suggestPrice(newBooking.pickup_location || '', newBooking.destination || '', newBooking.vehicle_type, 'new')}
                                            title="Suggest standard price"
                                        >
                                            <Calculator className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex gap-1 mt-1 flex-wrap">
                                        {['SAR', 'USD', 'AED', 'EUR', 'KWD', 'OMR'].map((c) => (
                                            <span
                                                key={c}
                                                onClick={() => setNewBooking({ ...newBooking, currency: c })}
                                                className={`text-[10px] px-1.5 py-0.5 rounded cursor-pointer border transition-colors ${
                                                    (newBooking.currency || 'SAR') === c
                                                    ? 'bg-primary border-primary text-black font-bold'
                                                    : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                                                }`}
                                            >
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Passengers</label>
                                    <Input
                                        type="number"
                                        value={newBooking.passengers}
                                        onChange={(e) => setNewBooking({ ...newBooking, passengers: parseInt(e.target.value) })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Luggage</label>
                                    <Input
                                        type="number"
                                        value={newBooking.luggage}
                                        onChange={(e) => setNewBooking({ ...newBooking, luggage: parseInt(e.target.value) })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Payment Status</label>
                                    <Select
                                        value={newBooking.payment_status}
                                        onValueChange={(val: any) => setNewBooking({ ...newBooking, payment_status: val })}
                                    >
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200">
                                            <SelectItem value="unpaid">Unpaid</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="partial">Partial</SelectItem>
                                            <SelectItem value="refunded">Refunded</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Driver Name</label>
                                    <Select
                                        onValueChange={(driverId) => {
                                            const d = approvedDrivers.find(dr => dr.id === driverId);
                                            if (d) {
                                                setNewBooking({
                                                    ...newBooking,
                                                    driver_id: d.id,
                                                    driver_name: d.full_name,
                                                    driver_phone: d.phone_number,
                                                    driver_plate: d.vehicle_plate || newBooking.driver_plate,
                                                });
                                            }
                                        }}
                                    >
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder={approvedDrivers.length ? 'Pick from roster...' : 'No approved drivers yet'} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200">
                                            {approvedDrivers.map(d => (
                                                <SelectItem key={d.id} value={d.id}>{d.full_name} — {d.vehicle_model}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        placeholder="Or type a name manually"
                                        value={newBooking.driver_name}
                                        onChange={(e) => setNewBooking({ ...newBooking, driver_name: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Internal Management Tags</label>
                                    <Input
                                        placeholder="VIP, Priority, Repeat Buyer..."
                                        value={newBooking.tags}
                                        onChange={(e) => setNewBooking({ ...newBooking, tags: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Payment Method</label>
                                    <Select
                                        value={newBooking.payment_method || 'Cash to Driver'}
                                        onValueChange={(val) => setNewBooking({ ...newBooking, payment_method: val })}
                                    >
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200">
                                            <SelectItem value="Cash to Driver">Cash to Driver</SelectItem>
                                            <SelectItem value="Credit Card">Credit Card</SelectItem>
                                            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                            <SelectItem value="Online Payment">Online Payment</SelectItem>
                                            <SelectItem value="Complimentary">Complimentary</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1 sm:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Round Trip?</label>
                                    <button
                                        type="button"
                                        onClick={() => setNewBooking({ ...newBooking, has_return_trip: !newBooking.has_return_trip })}
                                        className={`h-9 px-4 rounded-md text-[11px] font-black uppercase tracking-widest transition-all border ${
                                            newBooking.has_return_trip
                                            ? 'bg-blue-600 text-white border-blue-700'
                                            : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        {newBooking.has_return_trip ? '🔄 Round Trip Enabled' : 'One Way Only'}
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Special Requests / Notes (Client Facing)</label>
                                    <textarea
                                        value={newBooking.special_requests}
                                        onChange={(e) => setNewBooking({ ...newBooking, special_requests: e.target.value })}
                                        className="w-full min-h-[80px] p-2 text-sm border border-gray-200 rounded-md bg-white text-gray-900"
                                        placeholder="Enter any additional details..."
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-indigo-700 font-bold">Internal Admin Notes (Private)</label>
                                    <textarea
                                        value={newBooking.internal_notes}
                                        onChange={(e) => setNewBooking({ ...newBooking, internal_notes: e.target.value })}
                                        className="w-full min-h-[80px] p-2 text-sm border border-indigo-200 rounded-md bg-indigo-50 text-gray-900 focus:ring-1 focus:ring-indigo-300"
                                        placeholder="Private team-only notes..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex gap-3 mt-6 border-t pt-6">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsCreating(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1 bg-primary text-black hover:bg-black hover:text-white font-bold"
                            onClick={saveNewBooking}
                        >
                            <Plus className="w-4 h-4 mr-2" /> Create Booking
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

function DriverNotifyButton({ booking, onSuccess }: { booking: any; onSuccess: (id: string) => void }) {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleNotify = async () => {
        setSending(true);
        try {
            const res = await adminFetch('/api/send-driver-assignment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ booking }),
            });
            if (res.ok) {
                setSent(true);
                onSuccess(booking.id);
                setTimeout(() => setSent(false), 4000);
            }
        } catch { /* ignore */ } finally {
            setSending(false);
        }
    };

    return (
        <button
            onClick={handleNotify}
            disabled={sending || sent}
            className={`flex items-center gap-2 w-full justify-center py-2.5 rounded-xl font-bold text-sm transition-all ${sent ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
            {sent ? (
                <><CheckCircle className="w-4 h-4" /> Driver Details Sent to Customer</>
            ) : sending ? (
                <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending...</>
            ) : (
                <><Truck className="w-4 h-4" /> Notify Customer — Driver Assigned</>
            )}
        </button>
    );
}

