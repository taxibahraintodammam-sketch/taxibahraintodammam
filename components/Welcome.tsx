import { CheckCircle2 } from 'lucide-react';

export default function Welcome() {
    return (
        <section className="py-20 bg-gray-50 text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Welcome to <span className="text-primary">Taxi Service KSA</span> – Your Trusted Travel Partner in Saudi Arabia
                        </h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            Are you looking for a reliable, comfortable, and luxury taxi service in Saudi Arabia? Look no further.
                            Taxi Service KSA is the leading provider of elite chauffeur services, airport transfers, and intercity travel across the Kingdom.
                        </p>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Whether you are a pilgrim performing Umrah, a business traveler attending meetings in Riyadh, or a tourist exploring the historic streets of Jeddah,
                            we ensure your journey is smooth, safe, and stress-free. Our fleet of high-end vehicles and professional drivers are at your service 24/7.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "24/7 Customer Support",
                                "Fixed & Transparent Pricing",
                                "Professional & Multilingual Drivers",
                                "Luxury Fleet (Sedans, SUVs, Vans)",
                                "Real-time Flight Tracking",
                                "Seamless Umrah Transfers"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop"
                            alt="Luxury Taxi Service Saudi Arabia"
                            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-xl">
                                <p className="text-gray-900 font-semibold text-lg">&quot;The most reliable chauffeur service I&apos;ve used in Jeddah.&quot;</p>
                                <p className="text-primary text-sm mt-1">⭐⭐⭐⭐⭐</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
