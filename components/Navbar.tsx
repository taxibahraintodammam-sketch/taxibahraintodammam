"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
    Menu, X, Mail, Car, ChevronDown, Home, Briefcase,
    Info, Contact, MapPin, ShieldCheck, Phone,
    Star, Navigation, Globe, Clock, Sparkles, Building2,
    Camera, Users2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        {
            name: 'Services',
            href: '/services/',
            icon: Briefcase,
            children: [
                { name: 'Umrah Transport', href: '/services/umrah-transport/', desc: 'Premium spiritual journey transfers' },
                { name: 'Airport Transfers', href: '/services/airport-transfers/', desc: '24/7 MED & JED pickups' },
                { name: 'Business & Executive', href: '/services/business/', desc: 'Luxury chauffeur service' },
                { name: 'Intercity Transfers', href: '/services/intercity/', desc: 'Across all KSA cities' },
            ]
        },
        {
            name: 'Locations',
            href: '/locations/',
            icon: MapPin,
            mega: true,
            children: [
                {
                    category: 'Major Cities',
                    items: [
                        { name: 'Jeddah City', href: '/locations/jeddah/' },
                        { name: 'Riyadh City', href: '/locations/riyadh/' },
                        { name: 'Makkah Region', href: '/locations/makkah/' },
                        { name: 'Madinah Region', href: '/locations/madinah/' },
                        { name: 'Dammam City', href: '/locations/dammam/' },
                    ]
                },
                {
                    category: 'Tourism & Resorts',
                    items: [
                        { name: 'AlUla (Hegra)', href: '/locations/alula/' },
                        { name: 'NEOM / The Line', href: '/locations/neom/' },
                        { name: 'Yanbu / Red Sea', href: '/locations/yanbu/' },
                        { name: 'Taif (Al Hada)', href: '/locations/taif/' },
                        { name: 'Abha / Al Soudah', href: '/locations/abha/' },
                    ]
                },
                {
                    category: 'Eastern & Industrial',
                    items: [
                        { name: 'Al-Khobar', href: '/locations/al-khobar/' },
                        { name: 'Jubail Industrial', href: '/locations/jubail/' },
                        { name: 'Dhahran (Ithra)', href: '/locations/dhahran/ithra/' },
                        { name: 'Bahrain Causeway', href: '/routes/dammam-bahrain/' },
                    ]
                }
            ]
        },
        {
            name: 'Routes',
            href: '/routes/',
            icon: Navigation,
            mega: true,
            children: [
                {
                    category: 'From Jeddah',
                    items: [
                        { name: 'Jeddah to Makkah Transfer', href: '/routes/jeddah-makkah/' },
                        { name: 'Jeddah to Madinah Transfer', href: '/routes/jeddah-madinah/' },
                        { name: 'Jeddah to Yanbu Transfer', href: '/routes/jeddah-yanbu/' },
                        { name: 'Jeddah to Taif Transfer', href: '/routes/jeddah-taif/' },
                    ]
                },
                {
                    category: 'From Riyadh',
                    items: [
                        { name: 'Riyadh to Dammam Transfer', href: '/routes/riyadh-dammam/' },
                        { name: 'Riyadh Airport to KAFD', href: '/locations/riyadh/kafd/' },
                    ]
                },
                {
                    category: 'Executive & Pilgrimage',
                    items: [
                        { name: 'Corporate Business Travel', href: '/services/business/' },
                        { name: 'Makkah to Madinah Transfer', href: '/routes/makkah-madinah/' },
                        { name: 'Umrah Transfers', href: '/services/umrah-transport/' },
                    ]
                },
                {
                    category: 'Popular GCC Routes',
                    items: [
                        { name: 'Riyadh to Dubai', href: '/routes/riyadh-dubai/' },
                        { name: 'Dammam to Doha', href: '/routes/dammam-doha/' },
                        { name: 'Jeddah to Amman', href: '/routes/jeddah-amman/' },
                        { name: 'Kuwait to Riyadh', href: '/routes/kuwait-riyadh/' },
                        { name: 'King Fahd Causeway', href: '/border-crossings/taxi-king-fahd-causeway-border-crossing/' },
                        { name: 'GCC Chauffeur Service', href: '/services/gcc-chauffeur-service/' },
                    ]
                }
            ]
        },
        {
            name: 'Partners',
            href: '/partners/',
            icon: Users2,
            children: [
                { name: 'Partner with Us', href: '/partners/', desc: 'Overview of partnerships' },
                { name: 'Driver Registration', href: '/partners/driver-registration/', desc: 'Join our elite driver network' },
                // { name: 'Agency Login', href: '/admin/', desc: 'Manage your B2B bookings' },
            ]
        },
        {
            name: 'Company',
            href: '#',
            icon: Info,
            children: [
                { name: 'Track Booking', href: '/track-booking/', desc: 'Check your booking status' },
                { name: 'Gallery', href: '/gallery/', icon: Camera },
                { name: 'About Us', href: '/about/', icon: Info },
                { name: 'Contact', href: '/contact/', icon: Contact },
            ]
        },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-[100]">
            {/* Top Info Bar - Refined */}
            <div className={`bg-[#0a1442] text-white overflow-hidden transition-all duration-300 ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between text-[10px] font-black tracking-wide sm:tracking-widest uppercase gap-3">
                    <div className="flex items-center gap-4 sm:gap-6 text-gray-400 min-w-0">
                        <a href="mailto:taxiserviceksa9988@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors min-w-0">
                            <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="hidden sm:inline">taxiserviceksa9988@gmail.com</span>
                            <span className="sm:hidden truncate">Email Us</span>
                        </a>
                        <div className="hidden sm:flex items-center gap-2 cursor-default font-black">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            <span>Private Transfers 24/7</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        <div className="hidden md:flex items-center gap-2 text-gray-400">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            <span>Official Travel Partner</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                            <Globe className="w-3 h-3" />
                            <span>EN / UR / AR</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header - Premium Styling */}
            <header className={`py-4 transition-all duration-500 bg-[#0a1442] ${scrolled ? 'backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.3)]' : 'border-b border-white/10'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between h-16 items-center gap-2 sm:gap-4">
                        {/* Logo - Refined Branding */}
                        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
                            <div className="relative">
                                <div className="bg-primary p-2 sm:p-2.5 rounded-xl shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:scale-110">
                                    <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 bg-amber-400 p-0.5 rounded-full border-2 border-white animate-pulse">
                                    <Sparkles className="w-2 h-2 text-white" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base sm:text-xl font-black tracking-tighter leading-none text-white uppercase whitespace-nowrap">
                                    Taxi Service <span className="text-primary">KSA</span>
                                </span>
                                <span className="hidden sm:block text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Premium Chauffeur Service</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Elegant States */}
                        <nav className="hidden xl:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                                return (
                                    <div
                                        key={link.name}
                                        className="relative group py-2"
                                        onMouseEnter={() => setActiveDropdown(link.name)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`flex items-center px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 relative ${isActive
                                                ? 'text-white bg-white/10'
                                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {link.name}
                                            {link.children && <ChevronDown className={`ml-1.5 w-4 h-4 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                                            {isActive && (
                                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                                            )}
                                        </Link>

                                        {/* Dropdown Logic - Improved Shadows */}
                                        {link.children && (
                                            <div className={`absolute top-full mt-2 transition-all duration-300 ${activeDropdown === link.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'} ${link.name === 'Routes' || link.name === 'Locations' ? 'left-1/2 -translate-x-1/2 origin-top' : link.name === 'Company' || link.name === 'Partners' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'}`}>
                                                {link.mega ? (
                                                    <div className="p-10 bg-white rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] border border-gray-100 min-w-[750px] w-max grid grid-cols-3 xl:grid-cols-4 gap-10">
                                                        {link.children.map((section: any) => (
                                                            <div key={section.category}>
                                                                <div className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-6 flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                                                                    {section.category}
                                                                </div>
                                                                <div className="space-y-4">
                                                                    {section.items.map((item: any) => (
                                                                        <Link
                                                                            key={item.name}
                                                                            href={item.href}
                                                                            className={`block text-sm font-bold transition-all hover:text-primary hover:translate-x-1 ${pathname === item.href ? 'text-primary' : 'text-gray-600'}`}
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-3 bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 w-64 space-y-1">
                                                        {link.children.map((child: any) => (
                                                            <Link
                                                                key={child.name}
                                                                href={child.href}
                                                                className={`flex flex-col p-3 rounded-2xl transition-all group/item border border-transparent ${pathname === child.href ? 'bg-primary/5 border-primary/10' : 'hover:bg-gray-50 hover:border-gray-100'}`}
                                                            >
                                                                <div className={`text-sm font-bold transition-colors ${pathname === child.href ? 'text-primary' : 'text-gray-900 group-hover/item:text-primary'}`}>{child.name}</div>
                                                                {child.desc && <div className="text-[11px] text-gray-400 mt-0.5 font-medium">{child.desc}</div>}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <div className="ml-6 flex items-center gap-3">
                                <Link
                                    href="https://wa.me/966569487569"
                                    target="_blank"
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-3 rounded-xl text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                                    Book Now
                                </Link>
                            </div>
                        </nav>

                        {/* Mobile Toggle */}
                        <div className="xl:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
                            <Link
                                href="https://wa.me/966569487569"
                                target="_blank"
                                className="bg-emerald-500 text-white font-black rounded-xl px-2.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
                            >
                                <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
                                <span className="hidden sm:inline">Quick</span> Booking
                            </Link>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 sm:p-3 bg-white/10 rounded-xl text-white active:scale-95 transition-all shrink-0"
                                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            >
                                {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Side Drawer - Enhanced Active States */}
            <div className={`xl:hidden fixed inset-0 bg-gray-950/40 backdrop-blur-sm transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsOpen(false)} />

            <aside className={`xl:hidden fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white z-[110] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-8 border-b flex justify-between items-center bg-white">
                        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                            <div className="bg-primary p-1.5 rounded-lg">
                                <Car className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-black tracking-tight uppercase">Taxi Service <span className="text-primary">KSA</span></span>
                        </Link>
                        <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-50 rounded-lg active:scale-95 transition-all"><X className="w-5 h-5" /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-10 px-8">
                        <div className="space-y-10">
                            {navLinks.map((link) => {
                                const isLinkActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                                return (
                                    <div key={link.name} className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em]">{link.name}</div>
                                            {isLinkActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {link.children ? (
                                                <>
                                                    {link.mega ? (
                                                        link.children.map((section: any) => (
                                                            <div key={section.category} className="space-y-2 mt-2">
                                                                <div className="text-[10px] font-black text-gray-400 px-4 uppercase tracking-widest">{section.category}</div>
                                                                {section.items.map((item: any) => {
                                                                    const isItemActive = pathname === item.href;
                                                                    return (
                                                                        <Link
                                                                            key={item.name}
                                                                            href={item.href}
                                                                            onClick={() => setIsOpen(false)}
                                                                            className={`flex items-center gap-3 p-4 text-sm font-bold rounded-2xl transition-all ${isItemActive ? 'bg-primary/5 text-primary' : 'text-gray-600 active:bg-gray-50'}`}
                                                                        >
                                                                            <div className={`w-1.5 h-1.5 rounded-full ${isItemActive ? 'bg-primary' : 'bg-gray-200'}`} />
                                                                            {item.name}
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        link.children.map((child: any) => {
                                                            const isChildActive = pathname === child.href;
                                                            return (
                                                                <Link
                                                                    key={child.name}
                                                                    href={child.href}
                                                                    onClick={() => setIsOpen(false)}
                                                                    className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${isChildActive ? 'bg-primary/5 text-primary' : 'bg-gray-50 text-gray-900 active:bg-gray-100'}`}
                                                                >
                                                                    <div className={`w-2 h-2 rounded-full ${isChildActive ? 'bg-primary' : 'bg-gray-300'}`} />
                                                                    {child.name}
                                                                </Link>
                                                            );
                                                        })
                                                    )}
                                                </>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className={`flex items-center gap-4 p-5 rounded-2xl font-bold transition-all ${isLinkActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-900 active:bg-gray-100'}`}
                                                >
                                                    <link.icon className={`w-5 h-5 ${isLinkActive ? 'text-white' : 'text-primary'}`} />
                                                    {link.name}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-8 bg-gray-50 border-t space-y-6">
                        <Link href="https://wa.me/966569487569" onClick={() => setIsOpen(false)} className="block w-full">
                            <div className="w-full bg-primary hover:bg-black text-white font-black h-16 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center transition-all active:scale-95">
                                Book via WhatsApp
                            </div>
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
}

function ArrowRight({ className, strokeWidth = 2 }: { className?: string, strokeWidth?: number }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
