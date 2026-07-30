'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Send } from 'lucide-react';
import { reviewService } from '@/lib/reviewQuestionService';

interface ReviewFormProps {
    locationName?: string;
    serviceName?: string;
}

export default function ReviewForm({ locationName, serviceName }: ReviewFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5,
        title: '',
        review: '',
        route: '',
        date: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await reviewService.submitReview({
                name: formData.name,
                email: formData.email,
                rating: formData.rating,
                title: formData.title,
                review: formData.review,
                route: formData.route || undefined,
                travel_date: formData.date || undefined,
                location: locationName,
                service: serviceName,
            });

            setSubmitted(true);

            // Reset form after 3 seconds
            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    rating: 5,
                    title: '',
                    review: '',
                    route: '',
                    date: '',
                });
            }, 3000);
        } catch (error) {
            console.error('Error submitting review:', error);
            // Optionally handle error state here
        }
    };

    return (
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Share Your Experience</h3>
                <p className="text-gray-600">
                    Help other travelers by sharing your experience with our taxi service
                    {locationName && ` in ${locationName}`}
                    {serviceName && ` for ${serviceName}`}.
                </p>
            </div>

            {submitted ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold text-green-900 mb-2">Thank You!</h4>
                    <p className="text-green-800">Your review has been submitted and will be published after verification.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                            Rating *
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= formData.rating
                                            ? 'fill-primary text-primary'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                </button>
                            ))}
                            <span className="ml-2 text-gray-600 font-medium">
                                {formData.rating} out of 5 stars
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Route Taken
                            </label>
                            <input
                                type="text"
                                value={formData.route}
                                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                                placeholder="e.g., Jeddah Airport to Makkah"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Date of Travel
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                            Review Title *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                            placeholder="Summarize your experience in one line"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                            Your Review *
                        </label>
                        <textarea
                            required
                            value={formData.review}
                            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                            rows={6}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none resize-none"
                            placeholder="Share details about your experience: driver professionalism, vehicle condition, punctuality, route knowledge, etc."
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Minimum 50 characters. Be specific and honest.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                            <strong>Note:</strong> Your review will be verified before publication. We only publish genuine reviews from actual customers. Your email will not be displayed publicly.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary text-black hover:bg-primary/90 font-bold text-lg py-6"
                    >
                        <Send className="w-5 h-5 mr-2" />
                        Submit Review
                    </Button>
                </form>
            )}
        </div>
    );
}
