'use client';

import { useState, useEffect } from 'react';
import { Loader2, Car, MapPin, Calendar, Phone, MessageCircle, CheckCircle2 } from 'lucide-react';

interface TrackedBooking {
    id: string;
    pickup_location: string;
    destination: string;
    pickup_date: string;
    pickup_time: string;
    vehicle_type: string;
    passengers: number;
    status: string;
    total_price: number | null;
    currency: string | null;
    has_return_trip: boolean;
    driver_name?: string;
    driver_phone?: string;
    driver_plate?: string;
    actual_vehicle?: string;
}

const STATUS_META: Record<string, { label: string; color: string }> = {
    pending: { label: 'Pending Confirmation', color: 'bg-gray-100 text-gray-600' },
    quote_sent: { label: 'Quote Sent', color: 'bg-gray-100 text-gray-600' },
    confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-700' },
    in_progress: { label: 'Driver On The Way', color: 'bg-amber-100 text-amber-700' },
    completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
};

export default function TrackBookingView({ bookingId }: { bookingId: string }) {
    const [booking, setBooking] = useState<TrackedBooking | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetch(`/api/track-booking/${bookingId}/`)
            .then(res => {
                if (!res.ok) throw new Error('not found');
                return res.json();
            })
            .then(data => setBooking(data.booking))
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [bookingId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    if (notFound || !booking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                <div className="text-center max-w-sm">
                    <p className="text-lg font-bold text-gray-900 mb-2">Booking not found</p>
                    <p className="text-sm text-gray-500">This link may be invalid. Please contact us if you need help finding your booking.</p>
                </div>
            </div>
        );
    }

    const statusMeta = STATUS_META[booking.status] || STATUS_META.pending;

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mx-auto mb-3">
                        <Car className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Taxi Bahrain to Dammam</h1>
                    <p className="text-sm text-gray-500">Booking Ref: #{booking.id.slice(0, 8).toUpperCase()}</p>
                </div>

                <div className="bg-white rounded-2xl border-2 border-gray-100 p-5 space-y-4">
                    <div className="flex items-center justify-center">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${statusMeta.color}`}>
                            {booking.status === 'completed' && <CheckCircle2 className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
                            {statusMeta.label}
                        </span>
                    </div>

                    <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-900">
                            <p className="font-semibold">{booking.pickup_location}</p>
                            <p className="text-gray-500">→ {booking.destination}{booking.has_return_trip ? ' (Round Trip)' : ''}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                        {new Date(booking.pickup_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} at {booking.pickup_time}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
                        <span>{booking.actual_vehicle || booking.vehicle_type} · {booking.passengers} pax</span>
                        {booking.total_price ? <span className="font-bold text-gray-900">{booking.currency || 'SAR'} {booking.total_price}</span> : null}
                    </div>

                    {booking.driver_name && booking.driver_phone && (
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Driver</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900">{booking.driver_name}</p>
                                    {booking.driver_plate && <p className="text-xs text-gray-500">{booking.driver_plate}</p>}
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={`tel:${booking.driver_phone}`}
                                        className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center"
                                        title="Call driver"
                                    >
                                        <Phone className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={`https://wa.me/${booking.driver_phone.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center"
                                        title="WhatsApp driver"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
