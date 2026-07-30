'use client';

import { useEffect, useState } from 'react';
import { reviewService, Review } from '@/lib/reviewQuestionService';
import { Star, Quote, Calendar, MapPin } from 'lucide-react';

interface ReviewsDisplayProps {
    location?: string;
    service?: string;
    limit?: number;
}

export default function ReviewsDisplay({ location, service, limit = 4 }: ReviewsDisplayProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReviews();
    }, [location, service]);

    const loadReviews = async () => {
        try {
            setLoading(true);
            let data = await reviewService.getApprovedReviews();

            // Filter by location if specified
            if (location) {
                data = data.filter(r => r.location?.toLowerCase().includes(location.toLowerCase()));
            }

            // Filter by service if specified
            if (service) {
                data = data.filter(r => r.service?.toLowerCase().includes(service.toLowerCase()));
            }

            // Limit results
            data = data.slice(0, limit);

            setReviews(data);
        } catch (error) {
            console.error('Error loading reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="text-gray-500">Loading reviews...</div>
            </div>
        );
    }

    if (reviews.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                    {/* Header: Rating & Date */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= review.rating
                                            ? 'fill-primary text-primary'
                                            : 'text-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        {review.travel_date && (
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                {new Date(review.travel_date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </span>
                        )}
                    </div>

                    {/* Review Content */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{review.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                        "{review.review}"
                    </p>

                    {/* Author & Context */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <span className="text-sm font-bold text-gray-900 block">{review.name}</span>
                                {review.route && (
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{review.route}</span>
                                )}
                            </div>
                        </div>
                        {review.location && (
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded">
                                {review.location}
                            </span>
                        )}
                    </div>

                    {/* Admin Response - Elegant Integration */}
                    {review.admin_response && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Team Response</span>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                {review.admin_response}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
