import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPreview() {
    const posts = [
        {
            title: "Ultimate Guide to Umrah 2025",
            excerpt: "Everything you need to know about performing Umrah this year, from visa requirements to best travel times.",
            image: "https://images.unsplash.com/photo-1565552629477-e254f3a367c9?q=80&w=2068&auto=format&fit=crop",
            date: "Oct 15, 2024",
            author: "Ahmed Al-Sayed",
            slug: "/blog/umrah-guide-2025/"
        },
        {
            title: "Top 5 Luxury Hotels in Jeddah",
            excerpt: "Discover the most opulent accommodations in the Bride of the Red Sea for a truly royal stay.",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
            date: "Nov 02, 2024",
            author: "Sarah Khan",
            slug: "/blog/luxury-hotels-jeddah/"
        },
        {
            title: "Business Travel Etiquette in KSA",
            excerpt: "A comprehensive guide for international business travelers on navigating Saudi corporate culture.",
            image: "https://images.unsplash.com/photo-1554469384-e5898eb74c0f?q=80&w=2070&auto=format&fit=crop",
            date: "Nov 10, 2024",
            author: "Faisal Rahman",
            slug: "/blog/business-etiquette-ksa/"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">Travel Guide</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">Latest from Our Blog</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Expert insights, travel tips, and guides to help you make the most of your journey in Saudi Arabia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <div key={index} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-xs text-white">
                                    <div className="flex items-center">
                                        <Calendar className="w-3 h-3 mr-1 text-primary" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center">
                                        <User className="w-3 h-3 mr-1 text-primary" />
                                        {post.author}
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <Link href={post.slug} className="inline-flex items-center text-primary font-medium hover:text-amber-600 transition-colors">
                                    Read Article
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/blog/">
                        <Button
                            variant="outline"
                            className="bg-white border-gray-300 text-gray-900 hover:bg-gray-50 hover:text-primary hover:border-primary transition-all"
                        >
                            View All Articles
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
