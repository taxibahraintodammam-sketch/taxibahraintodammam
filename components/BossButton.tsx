"use client";

import { Heart, Sparkles, Crown } from 'lucide-react';
import { useState } from 'react';

export default function BossButton() {
    const [showMessage, setShowMessage] = useState(false);

    return (
        <>
            {/* Floating Hearts Animation */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                <div className="absolute -top-20 left-0 animate-float-slow">
                    <Heart className="w-4 h-4 text-pink-400 fill-pink-400 opacity-60" />
                </div>
                <div className="absolute -top-32 left-8 animate-float-medium">
                    <Heart className="w-3 h-3 text-red-400 fill-red-400 opacity-50" />
                </div>
                <div className="absolute -top-24 -left-4 animate-float-fast">
                    <Sparkles className="w-3 h-3 text-pink-300 opacity-70" />
                </div>
            </div>

            {/* Main Button */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
                <div className="group relative">
                    <button
                        onClick={() => setShowMessage(!showMessage)}
                        className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 text-white px-8 py-5 rounded-full shadow-2xl hover:shadow-pink-500/60 transition-all duration-500 hover:scale-110 active:scale-95 flex items-center gap-3 font-bold overflow-hidden"
                    >
                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>

                        {/* Crown icon */}
                        <div className="relative">
                            <Crown className="w-6 h-6 fill-yellow-300 text-yellow-300 animate-bounce" />
                        </div>

                        {/* Text */}
                        <div className="relative flex flex-col items-start">
                            <span className="text-xs opacity-90 font-normal">My Amazing Boss</span>
                            <span className="text-lg font-black tracking-wide">AMMARA</span>
                        </div>

                        {/* Heart icon */}
                        <div className="relative">
                            <Heart className="w-6 h-6 fill-white animate-pulse" />
                        </div>

                        {/* Sparkle effects */}
                        <div className="absolute top-1 right-2">
                            <Sparkles className="w-4 h-4 text-yellow-200 animate-ping" />
                        </div>
                    </button>

                    {/* Popup Message */}
                    {showMessage && (
                        <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 animate-in slide-in-from-right-5 fade-in duration-300">
                            <div className="bg-gradient-to-br from-pink-600 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-2xl max-w-xs border-2 border-white/20">
                                <div className="flex items-start gap-3">
                                    <Crown className="w-8 h-8 fill-yellow-300 text-yellow-300 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-black text-lg mb-2">Best Boss Ever! 👑</h3>
                                        <p className="text-sm leading-relaxed opacity-95">
                                            Thank you for being an amazing leader, mentor, and inspiration!
                                            Your guidance makes everything possible! 💖✨
                                        </p>
                                        <div className="mt-3 flex gap-1">
                                            <Heart className="w-4 h-4 fill-red-300 text-red-300" />
                                            <Heart className="w-4 h-4 fill-red-300 text-red-300" />
                                            <Heart className="w-4 h-4 fill-red-300 text-red-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hover Tooltip */}
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap shadow-xl border border-white/20">
                            Click for a special message! 💝
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for animations */}
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(10deg); }
                }
                
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-40px) rotate(-10deg); }
                }
                
                @keyframes float-fast {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-25px) rotate(15deg); }
                }
                
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
                
                .animate-float-slow {
                    animation: float-slow 4s ease-in-out infinite;
                }
                
                .animate-float-medium {
                    animation: float-medium 3.5s ease-in-out infinite;
                }
                
                .animate-float-fast {
                    animation: float-fast 3s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}
