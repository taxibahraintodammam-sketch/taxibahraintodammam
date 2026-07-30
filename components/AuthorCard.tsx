
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { TwitterIcon as Twitter, FacebookIcon as Facebook, LinkedinIcon as Linkedin, InstagramIcon as Instagram } from '@/components/icons/BrandIcons';
import { AUTHORS } from '@/lib/constants';

interface AuthorCardProps {
    authorName: string;
    showBio?: boolean;
    className?: string;
    asH1?: boolean;
    textClass?: string;
}

export default function AuthorCard({ authorName, showBio = true, className = '', asH1 = false, textClass = '' }: AuthorCardProps) {
    const author = AUTHORS.find(a => a.name === authorName) || AUTHORS[0]; // Fallback to default

    // Safely generate slug if not present (though it should be in constants)
    const authorSlug = author.slug || author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                        src={author.avatar}
                        alt={author.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-full border-4 border-gray-50 shadow-sm"
                    />
                </div>

                <div className="flex-1 text-center sm:text-left">
                    {asH1 ? (
                        <h1 className={`text-3xl font-bold mb-2 ${textClass || 'text-gray-900'}`}>
                            {author.name}
                        </h1>
                    ) : (
                        <h3 className={`text-xl font-bold mb-1 ${textClass || 'text-gray-900'}`}>
                            <Link href={`/author/${authorSlug}`} className="hover:text-primary transition-colors">
                                {author.name}
                            </Link>
                        </h3>
                    )}
                    <p className={`text-sm mb-3 font-medium uppercase tracking-wider ${textClass ? 'opacity-80' : 'text-gray-500'}`}>{author.role || 'Author'}</p>

                    {showBio && (
                        <p className={`mb-4 leading-relaxed text-sm ${textClass ? 'opacity-90' : 'text-gray-600'}`}>
                            {author.bio}
                        </p>
                    )}

                    <div className="flex items-center justify-center sm:justify-start gap-3">
                        {author.social.twitter && (
                            <a href={author.social.twitter} target="_blank" rel="nofollow noopener noreferrer" aria-label={`Follow ${author.name} on Twitter`} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                        )}
                        {author.social.facebook && (
                            <a href={author.social.facebook} target="_blank" rel="nofollow noopener noreferrer" aria-label={`Follow ${author.name} on Facebook`} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-[#4267B2] hover:bg-[#4267B2]/10 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                        )}
                        {author.social.linkedin && (
                            <a href={author.social.linkedin} target="_blank" rel="nofollow noopener noreferrer" aria-label={`Follow ${author.name} on LinkedIn`} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        )}
                        {author.social.instagram && (
                            <a href={author.social.instagram} target="_blank" rel="nofollow noopener noreferrer" aria-label={`Follow ${author.name} on Instagram`} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                        )}
                        {!asH1 && (
                            <Link href={`/author/${authorSlug}`} className="ml-auto text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1">
                                View Profile <ExternalLink className="w-3 h-3" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
