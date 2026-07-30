'use client';

import { useState } from 'react';
import { supabase, vehicles } from '@/lib/supabase';

export function useBookingFlow() {
    const [step, setStep] = useState(1);
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [returnDate, setReturnDate] = useState('');
    const [viaCity, setViaCity] = useState('');
    const [tripType, setTripType] = useState('');
    const [preferredTimeNote, setPreferredTimeNote] = useState('');

    const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);
    const [passengers, setPassengers] = useState(1);

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+973');
    const [openCountry, setOpenCountry] = useState(false);

    const [loading, setLoading] = useState(false);
    const [lastBookingId, setLastBookingId] = useState<string | null>(null);

    const handleBack = () => setStep((s) => Math.max(1, s - 1));

    const resetForm = () => {
        setStep(1);
        setPickup('');
        setDropoff('');
        setDate('');
        setTime('');
        setIsRoundTrip(false);
        setReturnDate('');
        setViaCity('');
        setTripType('');
        setPreferredTimeNote('');
        setSelectedVehicle(null);
        setPassengers(1);
        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
        setLastBookingId(null);
    };

    const sendWhatsAppAgain = () => {
        const text = `Hello, I'd like to follow up on my transfer request${lastBookingId ? ` (ref ${lastBookingId})` : ''}: ${pickup} to ${dropoff} on ${date} at ${time}.`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    };

    const handleSubmitBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedVehicle) return;
        setLoading(true);
        try {
            const finalFormData = {
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: `${countryCode}${customerPhone}`,
                pickup_location: pickup,
                destination: dropoff,
                pickup_date: date,
                pickup_time: time,
                vehicle_type: selectedVehicle.name,
                vehicle_image: selectedVehicle.image,
                passengers,
                luggage: selectedVehicle.luggage,
                has_return_trip: isRoundTrip,
                special_requests: preferredTimeNote.trim()
                    ? `[PREFERRED TIME: ${preferredTimeNote.trim()}]`
                    : undefined,
                status: 'pending' as const,
            };

            const { data, error } = await supabase.from('bookings').insert([finalFormData]).select();
            if (error) throw error;

            setLastBookingId(data?.[0]?.id ?? null);

            fetch('/api/send-booking-emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ booking: data?.[0], price: 'Need Quote' }),
            }).catch((err) => console.error('Email fetch failed:', err));

            setStep(4);
        } catch (error) {
            console.error('Booking submission failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        step, setStep,
        pickup, setPickup,
        dropoff, setDropoff,
        date, setDate,
        time, setTime,
        isRoundTrip, setIsRoundTrip,
        returnDate, setReturnDate,
        viaCity, setViaCity,
        tripType, setTripType,
        preferredTimeNote, setPreferredTimeNote,
        selectedVehicle, setSelectedVehicle,
        passengers, setPassengers,
        customerName, setCustomerName,
        customerEmail, setCustomerEmail,
        customerPhone, setCustomerPhone,
        countryCode, setCountryCode,
        openCountry, setOpenCountry,
        loading,
        handleBack,
        handleSubmitBooking,
        sendWhatsAppAgain,
        resetForm,
    };
}
