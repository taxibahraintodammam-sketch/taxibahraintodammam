'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { questionService } from '@/lib/reviewQuestionService';

interface QuestionFormProps {
    locationName?: string;
    serviceName?: string;
}

export default function QuestionForm({ locationName, serviceName }: QuestionFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        question: '',
        category: 'general',
    });

    const [submitted, setSubmitted] = useState(false);

    const categories = [
        { value: 'general', label: 'General Question' },
        { value: 'pricing', label: 'Pricing & Payment' },
        { value: 'booking', label: 'Booking Process' },
        { value: 'routes', label: 'Routes & Timing' },
        { value: 'vehicles', label: 'Vehicles & Capacity' },
        { value: 'airport', label: 'Airport Transfers' },
        { value: 'umrah', label: 'Umrah Transport' },
        { value: 'corporate', label: 'Corporate Services' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await questionService.submitQuestion({
                name: formData.name,
                email: formData.email,
                question: formData.question,
                category: formData.category,
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
                    question: '',
                    category: 'general',
                });
            }, 3000);
        } catch (error) {
            console.error('Error submitting question:', error);
            // Optionally handle error state here
        }
    };

    return (
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <WhatsAppIcon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Ask a Question</h3>
                </div>
                <p className="text-gray-600">
                    Have a question about our taxi service
                    {locationName && ` in ${locationName}`}
                    {serviceName && ` for ${serviceName}`}?
                    Our experienced drivers will answer within 24 hours.
                </p>
            </div>

            {submitted ? (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold text-blue-900 mb-2">Question Received!</h4>
                    <p className="text-blue-800">Our drivers will answer your question within 24 hours. Check back soon!</p>
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
                            Question Category *
                        </label>
                        <select
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none bg-white"
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                            Your Question *
                        </label>
                        <textarea
                            required
                            value={formData.question}
                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                            rows={6}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none resize-none"
                            placeholder="Ask anything about routes, pricing, vehicles, timing, or our services..."
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Be specific for better answers. Example: "How long does it take from Jeddah Airport to Makkah during Ramadan?"
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                            <strong>Note:</strong> Questions are answered by our experienced drivers who have years of knowledge about Saudi roads, traffic patterns, and local insights. Your email will not be displayed publicly.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary text-black hover:bg-primary/90 font-bold text-lg py-6"
                    >
                        <Send className="w-5 h-5 mr-2" />
                        Submit Question
                    </Button>
                </form>
            )}

            <div className="mt-6 pt-6 border-t-2 border-gray-100">
                <p className="text-sm text-gray-500 text-center">
                    Questions and answers will be published on this page to help other travelers.
                    For urgent booking inquiries, please email{' '}
                    <a href="mailto:taxiserviceksa9988@gmail.com" className="text-primary hover:underline font-medium">
                        taxiserviceksa9988@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
}
