'use client';

import { useEffect, useState } from 'react';
import { questionService, Question } from '@/lib/reviewQuestionService';
import { CheckCircle, Calendar, Tag } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

interface QuestionsDisplayProps {
    location?: string;
    service?: string;
    category?: string;
    limit?: number;
}

export default function QuestionsDisplay({ location, service, category, limit = 6 }: QuestionsDisplayProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuestions();
    }, [location, service, category]);

    const loadQuestions = async () => {
        try {
            setLoading(true);
            let data = await questionService.getAnsweredQuestions();

            // Filter by location if specified
            if (location) {
                data = data.filter(q => q.location?.toLowerCase().includes(location.toLowerCase()));
            }

            // Filter by service if specified
            if (service) {
                data = data.filter(q => q.service?.toLowerCase().includes(service.toLowerCase()));
            }

            // Filter by category if specified
            if (category) {
                data = data.filter(q => q.category === category);
            }

            // Limit results
            data = data.slice(0, limit);

            setQuestions(data);
        } catch (error) {
            console.error('Error loading questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryLabel = (cat: string) => {
        const labels: { [key: string]: string } = {
            general: 'General',
            pricing: 'Pricing',
            booking: 'Booking',
            routes: 'Routes',
            vehicles: 'Vehicles',
            airport: 'Airport',
            umrah: 'Umrah',
            corporate: 'Corporate',
        };
        return labels[cat] || cat;
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="text-gray-500">Loading Q&A...</div>
            </div>
        );
    }

    if (questions.length === 0) {
        return null;
    }

    return (
        <div className="space-y-6">
            {questions.map((question) => (
                <div key={question.id} className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-primary/30 transition-all shadow-sm">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                            <Tag className="w-3 h-3" />
                            {getCategoryLabel(question.category)}
                        </span>
                        {question.location && (
                            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                                {question.location}
                            </span>
                        )}
                    </div>

                    {/* Question */}
                    <div className="mb-4">
                        <div className="flex items-start gap-3 mb-3">
                            <WhatsAppIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-500 mb-1">Question:</div>
                                <p className="text-lg font-medium text-gray-900">
                                    {question.question}
                                </p>
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-3 text-xs text-gray-500 ml-8">
                            <span className="font-medium text-gray-700">{question.name}</span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(question.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Answer */}
                    {question.answer && (
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-bold text-green-900">
                                    Answer from {question.answered_by || 'Our Driver'}:
                                </span>
                            </div>
                            <p className="text-green-800 leading-relaxed">
                                {question.answer}
                            </p>
                            {question.answered_at && (
                                <p className="text-xs text-green-600 mt-2">
                                    Answered on {new Date(question.answered_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
