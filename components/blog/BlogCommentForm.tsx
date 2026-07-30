'use client';

import { useState } from 'react';
import { commentService } from '@/lib/commentService';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    blogSlug: string;
}

export default function BlogCommentForm({ blogSlug }: Props) {
    const [form, setForm] = useState({ name: '', email: '', comment: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.comment.trim()) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await commentService.submitComment({
                blog_slug: blogSlug,
                name: form.name.trim(),
                email: form.email.trim(),
                comment: form.comment.trim(),
            });
            setSubmitted(true);
        } catch {
            setError('Failed to submit comment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-green-800 mb-1">Comment Submitted!</h4>
                <p className="text-green-700 text-sm">Your comment is awaiting moderation and will appear once approved.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Leave a Comment
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Your name"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            placeholder="your@email.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Comment *</label>
                    <textarea
                        value={form.comment}
                        onChange={e => setForm({ ...form, comment: e.target.value })}
                        rows={4}
                        placeholder="Share your thoughts..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm resize-none"
                    />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <p className="text-xs text-gray-400">Your email will not be published. Comments are reviewed before appearing.</p>

                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gray-900 text-white hover:bg-gray-700 px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2"
                >
                    {loading ? 'Submitting...' : (
                        <>
                            <Send className="w-4 h-4" />
                            Post Comment
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
