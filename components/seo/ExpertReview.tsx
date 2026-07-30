import React from 'react';
import { ShieldCheck, CalendarRange, Star } from 'lucide-react';
import Image from 'next/image';

interface ExpertReviewProps {
    reviewerName?: string;
    reviewerTitle?: string;
    reviewDate?: string;
    expertise?: string[];
    theme?: 'light' | 'dark';
    isRtl?: boolean;
    labels?: {
        reviewTitle?: string;
        verifiedReview?: string;
    };
}

const ExpertReview: React.FC<ExpertReviewProps> = ({
    reviewerName = "Captain Abdulrahman Al-Harbi",
    reviewerTitle = "Senior Fleet Manager & Route Specialist",
    reviewDate = "December 2024",
    expertise = ["Haramain Logistics", "Hajj Permits", "Fleet Operations"],
    theme = 'light',
    isRtl = false,
    labels = {
        reviewTitle: "Route Analysis",
        verifiedReview: "Verified Expert Content"
    }
}) => {
    const isDark = theme === 'dark';

    return (
        <div className={`${isDark ? 'bg-black border-gray-800' : 'bg-white border-emerald-100'} border ${isRtl ? 'text-right' : 'text-left'} rounded-xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center max-w-4xl mx-auto my-8 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="flex-shrink-0 relative">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 p-0.5 ${isDark ? 'bg-gray-800 border-emerald-500/50' : 'bg-gray-200 border-emerald-500'}`}>
                    {/* Placeholder for Author Image - using generic avatar if no image */}
                    <div className={`w-full h-full flex items-center justify-center font-bold text-2xl ${isDark ? 'bg-gray-900 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                        A
                    </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
            </div>

            <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <p className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Verified Expert Content</p>
                    <span className="hidden sm:inline text-gray-300">•</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <CalendarRange className="w-3.5 h-3.5" />
                        <span>Last Updated: {reviewDate}</span>
                    </div>
                </div>

                <h3 className={`text-lg font-bold leading-tight mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Route Analysis by {reviewerName}
                </h3>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{reviewerTitle}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                    {expertise.map((item, index) => (
                        <span key={index} className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md font-medium ${isDark ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-800'}`}>
                            <Star className="w-3 h-3 fill-current opacity-50" />
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <div className="hidden sm:block border-l border-gray-100 pl-6 ml-2">
                <p className="text-xs text-gray-400 italic max-w-[150px] leading-relaxed">
                    "Accuracy is my amanah. Every operational detail here is verified against current Ministry regulations."
                </p>
            </div>
        </div>
    );
};

export default ExpertReview;
