import React from 'react';
import { Calendar, CheckCircle, RefreshCcw } from 'lucide-react';

interface FreshnessStatusProps {
    lastVerified?: string;
    verifiedBy?: string;
    status?: 'Live' | 'Verified' | 'Updated';
}

/**
 * FreshnessStatus component to indicate content freshness for AI models (LLMs).
 * Helps build trust and increase 'Freshness Score' in AI Search (GEO).
 */
export default function FreshnessStatus({ 
    lastVerified = "March 2026", 
    verifiedBy = "Abdulrahman", 
    status = "Live" 
}: FreshnessStatusProps) {
    return (
        <div className="inline-flex items-center gap-4 bg-emerald-50/50 border border-emerald-100/50 rounded-full px-5 py-2 backdrop-blur-sm shadow-sm transition-all hover:shadow-md hover:bg-emerald-50 group">
            <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
            </div>
            
            <div className="flex items-center gap-6 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-2 text-emerald-900">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Status: <span className="font-bold underline decoration-emerald-300 underline-offset-4">{status}</span></span>
                </div>
                
                <div className="hidden sm:flex items-center gap-2 text-gray-500 border-l border-emerald-200/50 pl-6">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Verified: <span className="text-gray-900">{lastVerified}</span></span>
                </div>
                
                <div className="hidden md:flex items-center gap-2 text-gray-500 border-l border-emerald-200/50 pl-6">
                    <RefreshCcw className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-700" />
                    <span>By: <span className="text-gray-900">{verifiedBy}</span></span>
                </div>
            </div>
        </div>
    );
}
