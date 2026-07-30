import React from 'react';
import { CheckCircle2, AlertTriangle, Scale } from 'lucide-react';

export interface ConsensusPoint {
    topic: string;
    commonBelief: string; // What people usually search/think (Query Vocabulary)
    reality: string | React.ReactNode; // The expert truth (Document Richness)
    truthRange: string; // The "Safe" Truth Range
    factors: string[]; // Variables causing the range (Fuzzy Logic)
}

export interface TravelConsensusLabels {
    title: string;
    subtitle: string;
    beliefLabel: string;
    realityLabel: string;
    rangeLabel: string;
    factorsLabel: string;
}

interface TravelConsensusProps {
    points: ConsensusPoint[];
    contextName?: string;
    labels?: TravelConsensusLabels;
    isRtl?: boolean;
}

const TravelConsensus: React.FC<TravelConsensusProps> = ({
    points,
    contextName,
    isRtl = false,
    labels: userLabels
}) => {
    const defaultLabels = {
        title: contextName ? `${contextName} Reality Check: What to Expect` : "Travel Reality Check: What to Expect",
        subtitle: "Expert consensus on travel times and costs based on real pilgrim data",
        beliefLabel: "Common Estimate",
        realityLabel: "Pilgrim Reality",
        rangeLabel: "Safe Truth Range",
        factorsLabel: "Influencing Factors"
    };

    const labels = { ...defaultLabels, ...userLabels };
    return (
        <div className={`my-12 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="text-center mb-10">
                <p className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
                    <Scale className="w-8 h-8 text-primary" />
                    {labels.title}
                </p>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    {labels.subtitle}
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {points.map((point, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary"></div>

                        <h3 className="text-xl font-bold text-gray-900 mb-4">{point.topic}</h3>

                        <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {labels.beliefLabel}
                            </div>
                            <p className="text-gray-700 text-sm italic">"{point.commonBelief}"</p>
                        </div>

                        <div className="mb-6">
                            <div className="text-xs text-primary uppercase tracking-wider font-semibold mb-2 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                {labels.realityLabel}
                            </div>
                            <p className="text-gray-800 text-sm leading-relaxed mb-3">
                                {point.reality}
                            </p>
                            <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                                <span className="block text-xs text-gray-500 mb-1">{labels.rangeLabel}</span>
                                <span className="text-lg font-bold text-primary">{point.truthRange}</span>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs text-gray-400 uppercase font-medium mb-2 block">{labels.factorsLabel}</span>
                            <div className="flex flex-wrap gap-2">
                                {point.factors.map((factor, fIndex) => (
                                    <span key={fIndex} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                        {factor}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TravelConsensus;
