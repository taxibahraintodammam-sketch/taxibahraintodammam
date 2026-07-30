import { Car, UserCheck, MapPin, CalendarCheck } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

export default function ProcessFlow() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="bg-primary/10 text-primary font-bold tracking-wider uppercase text-sm px-4 py-1.5 rounded-full inline-block mb-4">
                        How It Works
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Airport transportation made easy
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side: Detailed Steps */}
                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Car className="w-8 h-8 text-primary" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Requesting your airport taxi quote</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Quotation is processed quickly. If your plans change, you can cancel your request for free at any time.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                                    <UserCheck className="w-8 h-8 text-primary" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Meeting your driver</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    You'll be met on arrival and taken to your vehicle. The driver will track your flight, so they'll be waiting if it's delayed.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                                    <MapPin className="w-8 h-8 text-primary" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Arriving at your destination</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Get to your destination quickly and safely – no long lines for a taxi, no navigating public transit.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Visual Flowpath Image */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-lg">
                            <Image
                                src="/taxi_process_flow_diagram.png"
                                alt="Process Flow Diagram: Request Quote, Review, Meet Driver, Arrive"
                                width={600}
                                height={600}
                                className="object-contain drop-shadow-md rounded-xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
