import Link from 'next/link';
import { Car, Mail, Phone, MessageCircle } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

// No confirmed social profiles yet for this business — see content/business.ts
// BUSINESS.sameAs (FILL_ME). Add real links here once they exist rather than
// pointing visitors at another company's accounts.
const SOCIAL_LINKS: { title: string; icon: React.ComponentType<{ className?: string }>; href: string }[] = [];

export default function Footer() {
    return (
        <footer id="site-footer" className="bg-[#0a1442] text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand & Address */}
                    <div>
                        <Link href="/" className="flex items-center gap-2.5 group w-fit mb-6">
                            <div className="bg-primary p-2 rounded-xl">
                                <Car className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-black text-white tracking-tight">
                                Taxi Bahrain <span className="text-primary">to Dammam</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Manama, Bahrain<br />
                            Kingdom of Bahrain
                        </p>
                    </div>

                    {/* Column 2: Company */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-5">Company</h3>
                        <ul className="space-y-3.5">
                            <li><Link href="/about/" className="text-sm text-gray-300 hover:text-white transition-colors">About us</Link></li>
                            <li><Link href="/blog/" className="text-sm text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/driver-faq-saudi-arabia/" className="text-sm text-gray-300 hover:text-white transition-colors">Drive with us</Link></li>
                            <li><Link href="/sitemap/" className="text-sm text-gray-300 hover:text-white transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Need our help? */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-5">Need our help?</h3>
                        <ul className="space-y-3.5">
                            <li>
                                <a
                                    href="https://wa.me/97335014335?text=Hello%2C%20I%20would%20like%20to%20get%20a%20transfer%20quote."
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                                >
                                    <MessageCircle className="w-4 h-4 shrink-0" />
                                    Chat with Support
                                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">24/7</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+97335014335" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4 shrink-0" />
                                    +973 3501 4335
                                </a>
                            </li>
                            <li>
                                <a href="mailto:booking@taxibahraintodammam.com" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4 shrink-0" />
                                    booking@taxibahraintodammam.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Follow us + WhatsApp CTA */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-5">Follow us</h3>
                        <div className="flex gap-3 mb-6">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.title}
                                    href={social.href}
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    aria-label={social.title}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary text-gray-300 hover:text-white transition-colors"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>

                        <a
                            href="https://wa.me/97335014335?text=Hello%2C%20I%20want%20to%20get%20a%20taxi%20quote."
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="flex items-center gap-3 bg-white rounded-2xl p-4 hover:bg-gray-100 transition-colors"
                        >
                            <span className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                                <WhatsAppIcon className="w-6 h-6 text-emerald-600 fill-emerald-600" />
                            </span>
                            <span>
                                <span className="block text-sm font-bold text-gray-900">Go anywhere.</span>
                                <span className="block text-xs text-gray-500">WhatsApp booking makes it easy.</span>
                            </span>
                        </a>
                    </div>
                </div>

                {/* Language Row */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-8 border-t border-white/10 text-sm">
                    <Link href="/" className="font-bold text-white">English (EN)</Link>
                    <span className="text-white/20">·</span>
                    <Link href="/ar/" className="text-gray-400 hover:text-white transition-colors">العربية (AR)</Link>
                    <span className="text-white/20">·</span>
                    <Link href="/ur/" className="text-gray-400 hover:text-white transition-colors">اردو (UR)</Link>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-xs text-gray-500">
                        Taxi Bahrain to Dammam &copy; 2012-{new Date().getFullYear()}. All rights reserved.
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/terms-conditions/" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of use</Link>
                        <Link href="/privacy-policy/" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy policy</Link>
                        <Link href="/track-booking/" className="text-xs text-gray-500 hover:text-white transition-colors">Track booking</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
