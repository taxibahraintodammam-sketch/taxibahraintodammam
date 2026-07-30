import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { Blog } from '@/lib/blogService';

interface RelatedGuidesProps {
    blogs: Blog[];
    title?: string;
    subtitle?: string;
}

export default function RelatedGuides({
    blogs,
    title = "Expert Travel Guides & Local Insights",
    subtitle = "Deep dive into our curated articles written by local experts to help you plan the perfect journey."
}: RelatedGuidesProps) {
    if (!blogs || blogs.length === 0) {
        return null;
    }

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        {subtitle}
                    </p>
                </div>

                <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scroll-smooth hide-scrollbar px-4 sm:px-0 -mx-4 sm:mx-0">
                    {blogs.map((blog) => (
                        <Link
                            href={`/blog/${blog.slug}/`}
                            key={blog.id}
                            className="snap-center shrink-0 w-[300px] sm:w-[350px] group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-500/20 hover:-translate-y-1"
                        >
                            <div className="relative h-56 w-full overflow-hidden">
                                {blog.featured_image ? (
                                    <Image
                                        src={blog.featured_image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-gray-100 flex items-center justify-center">
                                        <span className="text-emerald-800 font-bold opacity-20 text-4xl">Guide</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1">
                                    <Tag className="w-3 h-3 text-emerald-600" />
                                    {blog.category}
                                </div>
                            </div>

                            <div className="flex-1 p-6 flex flex-col">
                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {blog.author}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                                    {blog.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {blog.excerpt}
                                </p>

                                <div className="mt-auto flex items-center text-emerald-600 font-bold text-sm">
                                    Read Guide
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/blog/">
                        <button className="bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold py-3 px-8 rounded-xl transition-all duration-300">
                            View All Guides
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
