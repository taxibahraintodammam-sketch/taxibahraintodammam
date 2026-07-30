import Link from 'next/link';
import { Car, Mail, Phone, MessageCircle } from 'lucide-react';
import {
    FacebookIcon as Facebook, InstagramIcon as Instagram, TwitterIcon as Twitter,
    LinkedinIcon as Linkedin, YoutubeIcon as Youtube,
} from '@/components/icons/BrandIcons';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const SOCIAL_LINKS = [
    { title: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/people/Taxi-Service-KSA/61573850597962/' },
    { title: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/taxiserviceksa/' },
    { title: 'Twitter (X)', icon: Twitter, href: 'https://twitter.com/TaxiServiceKSA' },
    { title: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/taxi-service-ksa/' },
    { title: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/channel/UCeP44oxBUKUG5X-UhYmPMNw' },
];

const PINTEREST_PATH = 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z';

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
                                Taxi Service <span className="text-primary">KSA</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Taxi Service KSA Transport<br />
                            Jeddah, Saudi Arabia<br />
                            Kingdom of Saudi Arabia
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
                                    href="https://wa.me/966569487569?text=Hello%2C%20I%20would%20like%20to%20get%20a%20transfer%20quote."
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
                                <a href="tel:+966569487569" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4 shrink-0" />
                                    +966 56 948 7569
                                </a>
                            </li>
                            <li>
                                <a href="mailto:taxiserviceksa9988@gmail.com" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4 shrink-0" />
                                    taxiserviceksa9988@gmail.com
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
                            <a
                                href="https://www.pinterest.com/taxiserviceksa/"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                aria-label="Pinterest"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary text-gray-300 hover:text-white transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d={PINTEREST_PATH} />
                                </svg>
                            </a>
                        </div>

                        <a
                            href="https://wa.me/966569487569?text=Hello%2C%20I%20want%20to%20get%20a%20taxi%20quote."
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
                        Taxi Service KSA &copy; 2012-{new Date().getFullYear()}. All rights reserved.
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
