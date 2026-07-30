"use client";

import { Play } from 'lucide-react';
import { useState } from 'react';

export default function VideoTour() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/60"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block animate-fade-in">
                    The Experience
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                    Journey in <span className="text-primary">Pure Luxury</span>
                </h2>
                <p className="text-gray-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                    Experience the comfort of our premium fleet. From leather seats to ambient lighting, every detail is curated for your relaxation.
                </p>

                <button
                    onClick={() => setIsPlaying(true)}
                    className="group relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:scale-110 transition-all duration-300"
                >
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full bg-primary/10 group-hover:bg-primary/30 transition-colors"></div>
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                </button>
                <p className="mt-4 text-sm text-gray-400 uppercase tracking-widest">Watch Video Tour</p>
            </div>

            {/* Video Modal (Placeholder) */}
            {isPlaying && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="relative w-full max-w-5xl aspect-video bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <button
                            onClick={() => setIsPlaying(false)}
                            className="absolute top-4 right-4 text-white hover:text-primary z-10 bg-white/50 p-2 rounded-full"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="w-full h-full flex items-center justify-center text-white">
                            <p className="text-xl">Video Player Placeholder (YouTube Embed would go here)</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
