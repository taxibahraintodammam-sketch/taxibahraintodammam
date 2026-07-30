"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Star, ExternalLink } from 'lucide-react';
import { reviewService } from '@/lib/reviewQuestionService';

export default function HomeTrustBar() {
    const [stats, setStats] = useState<{ count: number; avg: number } | null>(null);

    useEffect(() => {
        let active = true;
        reviewService.getApprovedReviews()
            .then((reviews) => {
                if (!active || reviews.length === 0) return;
                const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
                setStats({ count: reviews.length, avg });
            })
            .catch(() => {});
        return () => { active = false; };
    }, []);

    return (
        <div className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-8 gap-y-3 text-sm">
                    <Link
                        href="/terms-conditions/"
                        className="flex items-center gap-2 text-gray-800 font-medium hover:text-primary transition-colors"
                    >
                        <ShieldCheck className="w-5 h-5 text-gray-900 shrink-0" />
                        Free cancellation up to 24 hours before pickup
                    </Link>

                    <div className="hidden sm:block h-6 w-px bg-gray-300" />

                    <a
                        href="https://www.trustpilot.com/review/taxiserviceksa.com"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="flex items-center gap-2 font-semibold text-gray-800 hover:text-[#00b67a] transition-colors"
                    >
                        <span className="flex items-center justify-center w-5 h-5 bg-[#00b67a] rounded-sm shrink-0">
                            <Star className="w-3 h-3 fill-white text-white" />
                        </span>
                        Trustpilot
                        <span className="text-gray-500 font-normal inline-flex items-center gap-1">
                            Verified reviews <ExternalLink className="w-3 h-3" />
                        </span>
                    </a>

                    {stats && (
                        <>
                            <div className="hidden sm:block h-6 w-px bg-gray-300" />
                            <Link
                                href="/submit-review/"
                                className="flex items-center gap-2 font-semibold text-gray-800 hover:text-primary transition-colors"
                            >
                                <span className="flex items-center gap-0.5" aria-hidden="true">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < Math.round(stats.avg) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                                        />
                                    ))}
                                </span>
                                {stats.avg.toFixed(1)}
                                <span className="text-gray-500 font-normal">({stats.count} verified reviews)</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
