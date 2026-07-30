import React from 'react';
import { Network, ArrowUpRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export interface SemanticConcept {
    label: string;
    description: string;
    wikiLink?: string; // External link to authority (e.g., Wiki/Gov) for "Trust" signal
    internalLink?: string; // Internal link for "Cluster" signal
}

export interface SemanticFieldProps {
    title: string;
    explanation: string;
    concepts: SemanticConcept[];
    isRtl?: boolean;
    labels?: {
        readMore: string;
        relatedTopic: string;
    };
}

const SemanticField: React.FC<SemanticFieldProps> = ({
    title,
    explanation,
    concepts,
    isRtl = false,
    labels = {
        readMore: "Learn Concept",
        relatedTopic: "Related Topic"
    }
}) => {
    return (
        <div className={`my-16 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
                {/* Abstract Background for "Network/Graph" feel */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Network className="w-64 h-64" />
                </div>

                <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 mb-6 backdrop-blur-sm border border-white/10">
                        <BookOpen className="w-4 h-4" />
                        {labels.relatedTopic}
                    </div>

                    <h2 className="text-3xl font-black mb-4 leading-tight">
                        {title}
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-10 text-opacity-90">
                        {explanation}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {concepts.map((concept, index) => (
                            <div key={index} className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 p-5 rounded-xl transition-all duration-300 backdrop-blur-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">
                                        {concept.label}
                                    </h3>
                                    {(concept.wikiLink || concept.internalLink) && (
                                        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300" />
                                    )}
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {concept.description}
                                </p>
                                {(concept.wikiLink || concept.internalLink) && (
                                    <Link
                                        href={concept.internalLink || concept.wikiLink || "#"}
                                        className="absolute inset-0 z-10"
                                        aria-label={labels.readMore}
                                        rel={concept.wikiLink ? "nofollow noreferrer" : undefined}
                                        target={concept.wikiLink ? "_blank" : undefined}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SemanticField;
