'use client';

import { Calendar, RefreshCw } from 'lucide-react';

interface BylineDateProps {
    /** ISO date string for when the page was originally published */
    datePublished: string;
    /** ISO date string for when the page was last updated */
    dateModified?: string;
    /** Optional author name */
    author?: string;
    /** Visual style variant */
    variant?: 'default' | 'compact' | 'inline';
    /** Additional CSS classes */
    className?: string;
}

/**
 * BylineDate – Visible date component for Google Search byline dates.
 * 
 * Per Google Search Central guidelines, dates must be:
 * - User-visible on the page and featured prominently
 * - Labeled with text like "Published" or "Last updated"
 * - Consistent with structured data dates
 */
export default function BylineDate({
    datePublished,
    dateModified,
    author,
    variant = 'default',
    className = '',
}: BylineDateProps) {
    const formatDate = (iso: string) => {
        const date = new Date(iso);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Compact inline variant (for route/service pages)
    if (variant === 'compact') {
        return (
            <div className={`flex flex-wrap items-center gap-3 text-sm text-gray-500 ${className}`}>
                {author && (
                    <>
                        <span className="font-medium text-gray-700">{author}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    </>
                )}
                {dateModified ? (
                    <span className="flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5" />
                        Updated {formatDate(dateModified)}
                    </span>
                ) : (
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Published {formatDate(datePublished)}
                    </span>
                )}
            </div>
        );
    }

    // Inline variant (for embedding inside hero sections)
    if (variant === 'inline') {
        return (
            <span className={`inline-flex items-center gap-1.5 text-sm text-gray-400 ${className}`}>
                <Calendar className="w-3.5 h-3.5" />
                {dateModified
                    ? `Updated ${formatDate(dateModified)}`
                    : `Published ${formatDate(datePublished)}`}
            </span>
        );
    }

    // Default variant (prominent block for guides/articles)
    return (
        <div className={`flex flex-wrap items-center gap-4 text-sm text-gray-600 ${className}`}>
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                    <span className="font-medium text-gray-700">Published</span>{' '}
                    {formatDate(datePublished)}
                </span>
            </div>
            {dateModified && dateModified !== datePublished && (
                <>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-gray-400" />
                        <span>
                            <span className="font-medium text-gray-700">Last updated</span>{' '}
                            {formatDate(dateModified)}
                        </span>
                    </div>
                </>
            )}
            {author && (
                <>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="font-medium text-gray-700">{author}</span>
                </>
            )}
        </div>
    );
}
