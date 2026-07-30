import React from 'react';
import { TrendingUp, Clock, AlertCircle, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export interface TrendingNoteProps {
    topic: string;
    status: 'High Demand' | 'Seasonal Update' | 'Traffic Alert' | 'Insider Tip';
    lastUpdated: string;
    content: string;
    tags: string[]; // Lexical variations
    linkText?: string;
    linkUrl?: string;
    isRtl?: boolean;
}

const TrendingTravelNote: React.FC<TrendingNoteProps> = ({
    topic,
    status,
    lastUpdated,
    content,
    tags,
    linkText = "WhatsApp Booking for this service",
    linkUrl = "#booking",
    isRtl = false
}) => {
    // Status colors
    const statusColors = {
        'High Demand': 'bg-red-100 text-red-700 border-red-200',
        'Seasonal Update': 'bg-blue-100 text-blue-700 border-blue-200',
        'Traffic Alert': 'bg-amber-100 text-amber-700 border-amber-200',
        'Insider Tip': 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };

    return (
        <div className={`my-8 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <div className={`rounded-xl border-l-4 shadow-sm bg-white p-6 ${status === 'High Demand' ? 'border-l-red-500' : status === 'Traffic Alert' ? 'border-l-amber-500' : 'border-l-blue-500'}`}>

                {/* Header: Status & Update Time */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 border ${statusColors[status]}`}>
                        <TrendingUp className="w-3 h-3" />
                        {status}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>Updated: {lastUpdated}</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        {status === 'Traffic Alert' && <AlertCircle className="w-5 h-5 text-amber-500" />}
                        {topic}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                        {content}
                    </p>
                </div>

                {/* Lexical Tags (Semantic Cluster) */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">
                            #{tag.replace(/\s+/g, '')}
                        </span>
                    ))}
                </div>

                {/* Contextual Bridge Action */}
                <div className="pt-4 border-t border-gray-100 mt-4">
                    <Link href={linkUrl} className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors gap-1 group">
                        {linkText}
                        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TrendingTravelNote;
