import React from 'react';
import { CheckSquare, Info, ShieldAlert, Luggage, ClipboardList, Ban } from 'lucide-react';

export default function TravelRequirements() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Checklist */}
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            <ClipboardList className="w-3 h-3" /> Mandatory Requirements
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Kuwait-Saudi Travel Checklist</h2>
                        <div className="space-y-4">
                            {[
                                { title: "Valid Passport", desc: "Original passport with at least 6 months validity." },
                                { title: "GCC ID / Iqama", desc: "For GCC residents, a valid residence permit is required." },
                                { title: "Saudi Visa / E-Visa", desc: "Ensure you have the correct entry permit (Tourist, Umrah, or Business)." },
                                { title: "Border Insurance", desc: "Vehicle insurance is covered by us, but personal travel insurance is recommended." },
                                { title: "Luggage Policy", desc: "2 Large suitcases per person in SUV. Please declare extra luggage in advance." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 transition-colors">
                                    <CheckSquare className="w-6 h-6 text-emerald-600 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Policies */}
                    <div className="flex-1 space-y-8">
                        <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <ShieldAlert className="w-6 h-6 text-primary" /> Cancellation Policy
                                </h3>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                        <p className="text-sm">Free cancellation up to 24 hours before pickup.</p>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                        <p className="text-sm">50% charge for cancellations within 12 hours.</p>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                        <p className="text-sm">Full charge for "No Show" or cancellations at the door.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        </div>

                        <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100">
                            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                                <Ban className="w-5 h-5" /> Prohibited Items
                            </h3>
                            <p className="text-sm text-amber-800 leading-relaxed">
                                Strictly no alcohol, drugs, or illegal substances are allowed in the vehicle. Drivers have the right to refuse service if local laws are violated.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
