import React, { Suspense } from 'react';
import BookingFormContent from './BookingFormContent';

export default function BookingForm() {
    return (
        <Suspense fallback={
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-xl w-full max-w-2xl mx-auto text-center h-[500px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading booking form...</p>
                </div>
            </div>
        }>
            <BookingFormContent />
        </Suspense>
    );
}
