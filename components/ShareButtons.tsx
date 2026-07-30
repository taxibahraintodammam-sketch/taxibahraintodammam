
'use client';

import { Link2, Mail } from 'lucide-react';
import { TwitterIcon as Twitter, FacebookIcon as Facebook, LinkedinIcon as Linkedin } from '@/components/icons/BrandIcons';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

interface ShareButtonsProps {
    title: string;
    description: string;
}

export default function ShareButtons({ title, description }: ShareButtonsProps) {
    const pathname = usePathname();
    const url = typeof window !== 'undefined' ? `${window.location.origin}${pathname}` : '';

    const shareLinks = [
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: 'hover:bg-[#1DA1F2] hover:text-white'
        },
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: 'hover:bg-[#4267B2] hover:text-white'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: 'hover:bg-[#0077b5] hover:text-white'
        },
        {
            name: 'Email',
            icon: Mail,
            url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`,
            color: 'hover:bg-gray-600 hover:text-white'
        }
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-700 mr-2">Share:</span>
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    aria-label={`Share on ${link.name}`}
                    className={`p-2 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 ${link.color}`}
                    title={`Share on ${link.name}`}
                >
                    <link.icon className="w-4 h-4" />
                </a>
            ))}
            <button
                onClick={copyToClipboard}
                className="p-2 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-primary hover:text-black"
                title="Copy Link"
            >
                <Link2 className="w-4 h-4" />
            </button>
        </div>
    );
}
