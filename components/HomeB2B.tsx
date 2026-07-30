"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, Quote } from 'lucide-react';
import { reviewService, Review } from '@/lib/reviewQuestionService';
import { cn } from '@/lib/utils';

type TabKey = 'agents' | 'corporate';

const CHECKLISTS: Record<TabKey, string[]> = {
    agents: [
        '24/7 support for you and your clients',
        'Competitive rates for Umrah agencies & tour operators',
        'Fixed-rate quotes across Saudi Arabia & the GCC',
        'Comfortable vehicles with English-speaking drivers',
    ],
    corporate: [
        'Centralized billing & monthly statements',
        'Duty of care: vetted drivers & GPS tracking',
        'Fixed-rate quotes across Saudi Arabia & the GCC',
        'Comfortable vehicles with English-speaking drivers',
    ],
};

export default function HomeB2B() {
    const [tab, setTab] = useState<TabKey>('agents');
    const [review, setReview] = useState<Review | null>(null);

    useEffect(() => {
        let active = true;
        reviewService.getApprovedReviews()
            .then((reviews) => {
                if (active && reviews.length > 0) setReview(reviews[0]);
            })
            .catch(() => {});
        return () => { active = false; };
    }, []);

    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-5">
                    The transfer partner you can rely on
                </h2>

                <div className="flex items-center justify-center gap-2 mb-8">
                    <button
                        type="button"
                        onClick={() => setTab('agents')}
                        className={cn(
                            'px-4 py-2.5 rounded-full text-sm font-semibold transition-colors',
                            tab === 'agents' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        )}
                    >
                        Travel Agents &amp; Umrah Operators
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('corporate')}
                        className={cn(
                            'px-4 py-2.5 rounded-full text-sm font-semibold transition-colors',
                            tab === 'corporate' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        )}
                    >
                        Corporate &amp; Business Travel
                    </button>
                </div>

                <div className="rounded-[2rem] p-6 sm:p-10 bg-gradient-to-br from-primary/10 via-blue-50 to-primary/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
                                {tab === 'agents'
                                    ? "Transform your clients' Saudi Arabia transfers into a seamless experience"
                                    : 'Give your team reliable, accountable transport across the Kingdom'}
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-5">
                                {tab === 'agents'
                                    ? "Elevate your clients' travel experience with stress-free, private car transfers — whether they're heading to the airport, between cities, or on a guided day trip."
                                    : 'Fixed-rate transfers, centralized billing, and vetted drivers for your executives, delegates, and event guests.'}
                            </p>

                            <p className="font-bold text-gray-900 mb-3">Partnering with us includes:</p>
                            <ul className="space-y-2 mb-6">
                                {CHECKLISTS[tab].map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-3">
                                <Link href="/contact/">
                                    <span className="inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold rounded-full px-6 py-3 transition-colors shadow-sm">
                                        Inquire B2B Pricing
                                    </span>
                                </Link>
                                <a href="mailto:taxiserviceksa9988@gmail.com">
                                    <span className="inline-flex items-center justify-center text-gray-900 hover:text-primary text-sm font-semibold px-2 py-3 transition-colors underline">
                                        Email Business Team
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            {review ? (
                                <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm mx-auto">
                                    <Quote className="w-6 h-6 text-primary/40 mb-2" />
                                    <p className="text-gray-800 text-sm leading-relaxed mb-4">
                                        &ldquo;{review.title || review.review}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                                            {review.name.charAt(0).toUpperCase()}
                                        </span>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{review.name}</p>
                                            <p className="text-xs text-gray-500">{review.location || 'Verified traveler'}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm mx-auto">
                                    <p className="text-gray-800 text-sm leading-relaxed">
                                        Trusted by travel agencies, Umrah operators, and corporate teams across the Kingdom since 2012.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
