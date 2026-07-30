import Link from 'next/link';
import { Navigation, ArrowRight } from 'lucide-react';
import { getRelatedRoutes } from '@/data/routeGraph';

interface RelatedRoutesProps {
    originSlug: string;
    currentSlug: string;
    title?: string;
}

export default function RelatedRoutes({ originSlug, currentSlug, title }: RelatedRoutesProps) {
    const links = getRelatedRoutes(originSlug, currentSlug);
    if (links.length === 0) return null;

    return (
        <div className="border-t border-gray-200 pt-16 mt-16 pb-8">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">{title || 'Other Popular Routes'}</h3>
                <p className="text-gray-500 mt-2">More intercity transfers you might need</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        className="group block bg-gray-50 hover:bg-white p-5 rounded-xl border border-gray-100 hover:border-primary/50 hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Navigation className="w-4 h-4 text-primary" />
                            <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{link.name}</h4>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{link.description}</p>
                        <div className="flex items-center text-xs font-semibold text-primary">
                            View Route <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
