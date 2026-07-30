import React from 'react';
import { Target, Layers, Link as LinkIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export interface ClusterItem {
    label: string;
    url: string;
    description?: string;
}

export interface ClusterGroup {
    category: string; // e.g., "Direct Booking", "Planning Guides", "History"
    relevance: 'Primary' | 'Secondary' | 'Tertiary'; // Maps to Semantic Distance (Close -> Far)
    items: ClusterItem[];
}

export interface TopicClusterProps {
    mainTopic: string;
    clusters: ClusterGroup[];
    isRtl?: boolean;
}

const TopicCluster: React.FC<TopicClusterProps> = ({
    mainTopic,
    clusters,
    isRtl = false
}) => {
    return (
        <div className={`my-12 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                    <Target className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-gray-900">
                        {mainTopic} <span className="text-gray-400 font-normal text-lg ms-2">{isRtl ? 'خريطة الموضوع' : '(Topic Map)'}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Primary Cluster: The "Core" (Closest Semantic Distance) */}
                    <div className="md:col-span-12 lg:col-span-4 space-y-4">
                        {clusters.filter(c => c.relevance === 'Primary').map((group, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-primary/20 ring-1 ring-primary/5">
                                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                                    <Target className="w-4 h-4" /> {group.category}
                                </h3>
                                <div className="space-y-3">
                                    {group.items.map((item, i) => (
                                        <Link key={i} href={item.url} className="block group">
                                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-primary text-gray-700 hover:text-white transition-all">
                                                <span className="font-semibold text-sm">{item.label}</span>
                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Secondary Cluster: The "Context" (Medium Distance) */}
                    <div className="md:col-span-6 lg:col-span-4 space-y-4">
                        {clusters.filter(c => c.relevance === 'Secondary').map((group, idx) => (
                            <div key={idx} className="h-full bg-slate-50/50 p-6 rounded-xl border border-slate-200 dashed-border">
                                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                    <Layers className="w-4 h-4" /> {group.category}
                                </h3>
                                <ul className="space-y-3">
                                    {group.items.map((item, i) => (
                                        <li key={i}>
                                            <Link href={item.url} className="flex flex-col group">
                                                <span className="text-sm font-medium text-blue-600 hover:text-blue-800 underline decoration-blue-200 hover:decoration-blue-800 transition-all">
                                                    {item.label}
                                                </span>
                                                {item.description && (
                                                    <span className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                                        {item.description}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Tertiary Cluster: The "Broad" (Far Distance) */}
                    <div className="md:col-span-6 lg:col-span-4">
                        {clusters.filter(c => c.relevance === 'Tertiary').map((group, idx) => (
                            <div key={idx} className="p-4">
                                <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                                    {group.category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item, i) => (
                                        <Link key={i} href={item.url} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicCluster;
