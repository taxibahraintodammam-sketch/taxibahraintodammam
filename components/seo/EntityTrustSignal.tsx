import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle } from 'lucide-react';

export interface TrustMetric {
    label: string;
    value: string;
    icon?: any;
}

export interface EntityTrustSignalProps {
    brandName: string;
    description: string | React.ReactNode;
    foundingDate?: string;
    licenseInfo?: string;
    metrics: TrustMetric[];
    isRtl?: boolean;
    labels?: {
        verified: string;
        license: string;
        since: string;
    };
    theme?: 'light' | 'dark';
}

const EntityTrustSignal: React.FC<EntityTrustSignalProps> = ({
    brandName,
    description,
    foundingDate = "2015",
    licenseInfo = "Officially Licensed",
    metrics,
    isRtl = false,
    labels = {
        verified: "Verified Business",
        license: "License",
        since: "Serving since"
    },
    theme = 'light'
}) => {
    const isDark = theme === 'dark';

    return (
        <div className={`my-8 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <div className={`${isDark ? 'bg-black border-gray-800' : 'bg-white border-slate-100'} rounded-xl shadow-sm border p-6 relative overflow-hidden transition-colors`}>
                {/* Background Pattern */}
                <div className={`absolute top-0 right-0 p-4 opacity-5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <ShieldCheck className="w-32 h-32" />
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">

                    {/* Brand Identity Column */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <ShieldCheck className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${isDark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                                {labels.verified}
                            </span>
                        </div>
                        <h3 className={`text-xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {brandName}
                        </h3>
                        <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {description}
                        </p>

                        <div className={`flex flex-wrap items-center gap-4 text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {foundingDate && (
                                <div className={`flex items-center gap-1 px-2 py-1 rounded border ${isDark ? 'bg-gray-900 border-gray-800 text-gray-300' : 'bg-gray-50 border-gray-100'}`}>
                                    <Award className="w-3 h-3" />
                                    <span>{labels.since} {foundingDate}</span>
                                </div>
                            )}
                            {licenseInfo && (
                                <div className={`flex items-center gap-1 px-2 py-1 rounded border ${isDark ? 'bg-blue-900/20 text-blue-300 border-blue-900/30' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                    <CheckCircle className="w-3 h-3" />
                                    <span>{licenseInfo}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Authority Metrics Column */}
                    <div className="flex-shrink-0 w-full md:w-auto flex flex-row md:flex-col gap-3">
                        {metrics.map((metric, index) => (
                            <div key={index} className={`flex-1 p-3 rounded-lg border flex items-center gap-3 min-w-[120px] ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-slate-50 border-slate-100'}`}>
                                {metric.icon && (
                                    <div className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-primary'}`}>
                                        <metric.icon className="w-4 h-4" />
                                    </div>
                                )}
                                <div>
                                    <div className={`text-lg font-bold leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {metric.value}
                                    </div>
                                    <div className={`text-[10px] uppercase tracking-wide font-semibold mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                        {metric.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntityTrustSignal;
