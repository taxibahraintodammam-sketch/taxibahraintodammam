import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
    name: string;
    description: string | React.ReactNode;
    href: string;
    icon: LucideIcon;
}

interface RelatedServicesProps {
    services: Service[];
    title?: string;
    description?: string;
}

export default function RelatedServices({ services, title, description }: RelatedServicesProps) {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="bg-primary text-black font-semibold tracking-wider uppercase text-sm px-4 py-1.5 rounded-full inline-block mb-4">
                        Related Services
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {title || 'Explore Our Services'}
                    </h2>
                    {description && (
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <Link key={index} href={service.href} className="group">
                            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary transition-all h-full flex flex-col">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                                    <service.icon className="w-6 h-6 text-black" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                    {service.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 flex-1">
                                    {service.description}
                                </p>
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <span>Learn More</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
