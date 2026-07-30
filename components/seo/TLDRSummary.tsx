import React from 'react';
import { Info, Clock, CreditCard, Star } from 'lucide-react';

interface TLDRSummaryProps {
    title: string;
    summary: string;
    points: string[];
    pricing?: string;
    duration?: string;
}

/**
 * TLDRSummary component for GEO (Generative Engine Optimization)
 * Designed to be the primary 'Atomic Answer' that AI models (LLMs) extract.
 */
export default function TLDRSummary({ title, summary, points, pricing, duration }: TLDRSummaryProps) {
    return (
        <div className="relative group overflow-hidden rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl shadow-2xl p-6 sm:p-8 mb-12 transition-all hover:shadow-emerald-500/10 hover:border-emerald-500/20">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -m-4 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                        <Info className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                    {summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <ul className="space-y-3">
                        {points.map((point, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                                <Star className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="bg-gray-900/5 rounded-xl p-5 border border-gray-200/50 backdrop-blur-md">
                        <div className="space-y-4">
                            {pricing && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <CreditCard className="w-4 h-4" />
                                        <span>Official Price</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{pricing}</span>
                                </div>
                            )}
                            {duration && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <Clock className="w-4 h-4" />
                                        <span>Typical Duration</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{duration}</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200/50">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
                                    Verified Live Status: Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
