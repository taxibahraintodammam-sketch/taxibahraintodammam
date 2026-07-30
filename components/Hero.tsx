"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, Shield, Sparkles, Award } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import HeroBookingWidget from './HeroBookingWidget';
import { useState, useEffect, ReactNode } from 'react';

interface HeroProps {
    images?: string[];
    title?: ReactNode;
    subtitle?: string;
    location?: string;
    h1Text?: string; // Custom H1 text for SEO
    bookingFormTitle?: string; // Custom title for the booking widget
    hideBookingForm?: boolean; // Option to hide the booking widget
    children?: ReactNode;
}

export default function Hero(props: HeroProps) {
    const { images, title, subtitle, location, h1Text, bookingFormTitle, hideBookingForm } = props;

    // Use custom images if provided, otherwise use default homepage slides
    const slides = images || [
        '/hero-slide-1.webp', // Kaaba Makkah
        '/hero-slide-2.webp', // Madinah Mosque
        '/hero-slide-3.webp', // Luxury Car
        '/hero-slide-4.webp', // Jeddah
        '/hero-slide-5.webp', // Riyadh
    ];

    // Alt text for each slide (SEO optimized with keywords)
    const slideAltTexts = images
        ? images.map((img, idx) => {
            // Extract meaningful alt text from image path with SEO keywords
            const imgLower = img.toLowerCase();
            if (imgLower.includes('makkah') || imgLower.includes('kaaba')) {
                return 'Makkah Kaaba at night - Premium Umrah taxi service from Jeddah Airport to Makkah, Saudi Arabia';
            }
            if (imgLower.includes('madinah') || imgLower.includes('mosque') || imgLower.includes('prophet')) {
                return 'Prophet\'s Mosque in Madinah - Professional Ziyarat tour service and Umrah taxi from Makkah to Madinah';
            }
            if (imgLower.includes('jeddah') || imgLower.includes('corniche') || imgLower.includes('airport')) {
                return 'Jeddah Corniche sunset view - Airport transfer service from King Abdulaziz International Airport to Makkah and Madinah';
            }
            if (imgLower.includes('taif') || imgLower.includes('mountain') || imgLower.includes('rose')) {
                return 'Taif mountains and rose gardens - Luxury intercity taxi service from Jeddah to Taif, Saudi Arabia';
            }
            if (imgLower.includes('alula') || imgLower.includes('hegra') || imgLower.includes('tomb')) {
                return 'AlUla Hegra tombs UNESCO World Heritage Site - Heritage tour and luxury transportation service in Saudi Arabia';
            }
            return `Premium chauffeur and taxi service in Saudi Arabia - Professional airport transfer and luxury transportation`;
        })
        : [
            'Makkah Kaaba at night - Premium Umrah taxi service from Jeddah Airport to Makkah, Saudi Arabia',
            'Prophet\'s Mosque in Madinah - Professional Ziyarat tour service and Umrah taxi from Makkah to Madinah',
            'Luxury GMC Yukon chauffeur vehicle - premium transportation and taxi service in Saudi Arabia',
            'Jeddah city view - Airport transfer service from King Abdulaziz International Airport to Makkah and Madinah',
            'Riyadh cityscape - Premium intercity taxi and chauffeur service from Jeddah to Riyadh, Saudi Arabia'
        ];

    return (
        <section className="relative bg-gray-900 text-white min-h-[750px] flex flex-col justify-center items-center py-20 overflow-hidden" aria-label="Hero section">
            {/* Background Image - Static with Premium Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                    src={slides[0]}
                    alt={slideAltTexts[0] || "Premium taxi service in Saudi Arabia"}
                    fill
                    priority
                    quality={90}
                    className="object-cover w-full h-full scale-105"
                    sizes="100vw"
                />
                {/* Advanced Gradient Overlay for maximum readability */}
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[2px]" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/50" aria-hidden="true" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
                
                {/* Visual Accent */}
                <div className="mb-8">
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                        {location || "Premium Kingdom-Wide Transport"}
                    </span>
                </div>

                {/* Title & SEO H1 */}
                <div className="mb-12 max-w-4xl">
                    <h1 className="text-white tracking-tighter leading-[0.95] mb-8">
                        {h1Text || title || "BEST Online Taxi Service"}
                    </h1>
                    {subtitle && (
                        <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Direct WhatsApp CTA - Clearly Dominant */}
                <div className="w-full max-w-md mb-16">
                    <a 
                        href="https://wa.me/966569487569?text=Hello%2C%20I%20want%20to%20get%20a%20taxi%20quote."
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="group flex items-center justify-center gap-4 bg-primary text-white font-black py-8 px-12 rounded-3xl text-2xl shadow-[0_20px_50px_rgba(255,193,7,0.3)] transition-all hover:scale-[1.02] active:scale-95"
                    >
                        <WhatsAppIcon className="w-8 h-8 fill-current" />
                        Book via WhatsApp
                    </a>
                </div>

                {/* Trust Signals - Subtle & Clean */}
                <div className="flex flex-wrap justify-center gap-8 text-gray-400 mb-12">
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Licensed Drivers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">25k+ Happy Travelers</span>
                    </div>
                </div>

                {/* Custom Content (Buttons, etc.) */}
                {props.children && (
                    <div className="relative z-20 w-full mt-8">
                        {props.children}
                    </div>
                )}

                {/* Booking Widget Container - Only show if not hidden */}
                {!hideBookingForm && (
                    <div className="w-full animate-fade-in-up delay-200 mt-4 backdrop-blur-sm p-4 rounded-[2.5rem]">
                        <HeroBookingWidget title={bookingFormTitle || (h1Text ? `Online Booking for ${h1Text}` : undefined)} />
                    </div>
                )}
            </div>

        </section>
    );
}
