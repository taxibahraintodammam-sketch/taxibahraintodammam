"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { reviewService, Review } from '@/lib/reviewQuestionService';

const PAGE_SIZE = 3;

export default function HomeTestimonials() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [start, setStart] = useState(0);

    useEffect(() => {
        let active = true;
        reviewService.getApprovedReviews()
            .then((data) => { if (active) setReviews(data); })
            .catch(() => {})
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);

    if (!loading && reviews.length === 0) return null;

    const visible = reviews.slice(start, start + PAGE_SIZE);
    const canPrev = start > 0;
    const canNext = start + PAGE_SIZE < reviews.length;

    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-start justify-between gap-4 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                        25,000+ travelers like you.<br />Moments they&apos;ll never forget.
                    </h2>
                    {reviews.length > PAGE_SIZE && (
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={() => setStart((s) => Math.max(0, s - PAGE_SIZE))}
                                disabled={!canPrev}
                                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                aria-label="Previous reviews"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setStart((s) => (s + PAGE_SIZE < reviews.length ? s + PAGE_SIZE : s))}
                                disabled={!canNext}
                                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                aria-label="Next reviews"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    {visible.map((review) => (
                        <div key={review.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-0.5 mb-3" aria-hidden="true">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{review.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-5 mb-4">
                                {review.review}
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <span className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                                    {review.name.charAt(0).toUpperCase()}
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{review.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {format(new Date(review.approved_at || review.created_at), 'MMMM d, yyyy')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                    <span className="flex items-center justify-center w-5 h-5 bg-[#00b67a] rounded-sm shrink-0">
                        <Star className="w-3 h-3 fill-white text-white" />
                    </span>
                    <span className="font-semibold text-gray-900">Excellent</span>
                    <a
                        href="https://www.trustpilot.com/review/taxiserviceksa.com"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="text-gray-600 underline hover:text-primary"
                    >
                        Read verified reviews on Trustpilot
                    </a>
                    <span className="text-gray-300">|</span>
                    <Link href="/submit-review/" className="text-gray-600 underline hover:text-primary">
                        Share your experience
                    </Link>
                </div>
            </div>
        </section>
    );
}
