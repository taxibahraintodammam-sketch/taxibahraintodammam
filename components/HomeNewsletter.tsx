"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, Check } from 'lucide-react';

export default function HomeNewsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error('Request failed');
            setStatus('success');
            setEmail('');
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Be the first to discover more
                    </h2>
                    <p className="text-gray-600">
                        Get handpicked travel ideas, insider highlights, and special Taxi Service KSA offers.
                    </p>
                </div>

                <div>
                    {status === 'success' ? (
                        <div className="flex items-center gap-2 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                            <Check className="w-5 h-5 shrink-0" />
                            You&apos;re subscribed! Check your inbox for updates.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    suppressHydrationWarning
                                    className="flex-1 h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="h-12 px-8 rounded-xl bg-primary hover:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shrink-0"
                                >
                                    {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
                                </button>
                            </div>
                            {status === 'error' && (
                                <p className="text-red-600 text-xs mt-2">Something went wrong. Please try again.</p>
                            )}
                            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                                By signing up, you are agreeing to receive marketing emails from Taxi Service KSA. You can unsubscribe anytime. For more details, check our{' '}
                                <Link href="/privacy-policy/" className="underline hover:text-gray-600">Privacy Policy</Link>.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
