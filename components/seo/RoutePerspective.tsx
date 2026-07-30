import React from 'react';
import { User, Briefcase, Compass, Zap, Map } from 'lucide-react';

export interface RoutePerspectiveItem {
    id: string;
    targetAudience: string; // The "Perspective" (e.g., Pilgrim, Business)
    icon: any; // Lucide icon
    intent: string; // Query Intent (e.g., "Perform Umrah", "Fastest Transfer")
    description: string; // Unstructured rich text
    structuredFeatures: { label: string; value: string }[]; // Structured attributes for NER
    visualContext: string; // A descriptive caption for visual semantics
}

export interface RoutePerspectiveLabels {
    title: string;
    subtitle: string;
}

interface RoutePerspectiveProps {
    route: string;
    perspectives: RoutePerspectiveItem[];
    labels?: RoutePerspectiveLabels;
    isRtl?: boolean;
}

const RoutePerspective: React.FC<RoutePerspectiveProps> = ({
    route,
    perspectives,
    isRtl = false,
    labels = {
        title: route ? `${route}: Journey Perspectives` : "Journey Perspectives: Choose Your Travel Style",
        subtitle: "Tailored route planning based on your specific travel intent"
    }
}) => {
    return (
        <div className={`my-16 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="text-center mb-10">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                    Context Sharpening
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {labels.title}
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Map className="w-4 h-4" />
                    <span className="font-medium">Route Context: {route}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
                    {labels.subtitle}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {perspectives.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                        {/* Header - Perspective Definition */}
                        <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <item.icon className="w-5 h-5 text-primary" />
                                    <h3 className="font-bold text-gray-900">{item.targetAudience} Perspective</h3>
                                </div>
                                <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-white rounded-md border border-gray-200 inline-block">
                                    Intent: {item.intent}
                                </span>
                            </div>
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                <Compass className={`w-6 h-6 text-gray-400 group-hover:text-primary transition-colors ${isRtl ? 'rotate-90' : ''}`} />
                            </div>
                        </div>

                        {/* Unstructured Content (Narrative) */}
                        <div className="p-6 pb-4">
                            <p className="text-gray-700 text-sm leading-relaxed mb-4 border-l-4 border-primary/20 pl-4 italic">
                                "{item.description}"
                            </p>
                        </div>

                        {/* Structured Content (Attributes) */}
                        <div className="px-6 pb-6">
                            <div className="bg-primary/5 rounded-xl p-4">
                                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 opacity-70">
                                    Route Attributes
                                </h4>
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                    {item.structuredFeatures.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex flex-col">
                                            <span className="text-[10px] text-gray-500 uppercase">{feature.label}</span>
                                            <span className="text-sm font-semibold text-gray-900">{feature.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Visual Semantics / Captioning */}
                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
                                <span className="font-mono">Visual Context:</span>
                                <span>{item.visualContext}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoutePerspective;
