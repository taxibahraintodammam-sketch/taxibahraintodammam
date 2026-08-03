'use client';

import { useState, useEffect } from 'react';
import { Loader2, MapPin, Phone, Calendar, Play, CheckCircle } from 'lucide-react';

interface Trip {
    id: string;
    pickup_location: string;
    destination: string;
    pickup_date: string;
    pickup_time: string;
    vehicle_type: string;
    passengers: number;
    luggage: number;
    customer_name: string;
    customer_phone: string;
    status: string;
    special_requests?: string;
    flight_number?: string;
    total_price?: number;
    currency?: string;
}

const STATUS_STYLE: Record<string, string> = {
    pending: 'bg-gray-100 text-gray-600',
    quote_sent: 'bg-gray-100 text-gray-600',
    confirmed: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-amber-100 text-amber-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

export default function DriverTripsTab({ token }: { token: string }) {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/driver-portal/${token}/trips/`);
            const data = await res.json();
            setTrips(data.trips || []);
        } catch (err) {
            console.error('Error loading trips:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const updateStatus = async (tripId: string, status: string) => {
        setUpdatingId(tripId);
        try {
            const res = await fetch(`/api/driver-portal/${token}/trips/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ booking_id: tripId, status }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed');
            setTrips(prev => prev.map(t => t.id === tripId ? data.trip : t));
        } catch (err) {
            console.error('Error updating trip status:', err);
            alert('Failed to update trip status');
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return <div className="text-center py-12"><Loader2 className="w-5 h-5 animate-spin text-gray-400 mx-auto" /></div>;
    }

    if (trips.length === 0) {
        return <div className="text-center py-12 text-sm text-gray-400">No trips assigned to you yet</div>;
    }

    return (
        <div className="space-y-3">
            {trips.map(trip => (
                <div key={trip.id} className="bg-white rounded-2xl border-2 border-gray-100 p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(trip.pickup_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} · {trip.pickup_time}
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${STATUS_STYLE[trip.status] || 'bg-gray-100 text-gray-600'}`}>
                            {trip.status.replace('_', ' ')}
                        </span>
                    </div>

                    <div className="flex items-start gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-900">
                            <p className="font-semibold">{trip.pickup_location}</p>
                            <p className="text-gray-500">→ {trip.destination}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-3">
                        <a href={`tel:${trip.customer_phone}`} className="flex items-center gap-1.5 text-gray-700">
                            <Phone className="w-3.5 h-3.5 text-gray-400" /> {trip.customer_name}
                        </a>
                        <span className="text-gray-500">{trip.passengers} pax · {trip.vehicle_type}</span>
                    </div>

                    {trip.special_requests && (
                        <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2 mb-3">{trip.special_requests}</p>
                    )}

                    {trip.status === 'confirmed' && (
                        <button
                            onClick={() => updateStatus(trip.id, 'in_progress')}
                            disabled={updatingId === trip.id}
                            className="w-full bg-black text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                        >
                            {updatingId === trip.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                            Start Trip
                        </button>
                    )}
                    {trip.status === 'in_progress' && (
                        <button
                            onClick={() => updateStatus(trip.id, 'completed')}
                            disabled={updatingId === trip.id}
                            className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                        >
                            {updatingId === trip.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                            Mark Completed
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
