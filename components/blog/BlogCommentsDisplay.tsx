import { commentService, BlogComment } from '@/lib/commentService';
import { MessageSquare, User } from 'lucide-react';

interface Props {
    blogSlug: string;
}

export default async function BlogCommentsDisplay({ blogSlug }: Props) {
    let comments: BlogComment[] = [];
    try {
        comments = await commentService.getApprovedComments(blogSlug);
    } catch {
        return null;
    }

    if (comments.length === 0) return null;

    return (
        <div className="mt-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </h3>

            <div className="space-y-6">
                {comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <span className="font-semibold text-gray-900 text-sm">{comment.name}</span>
                                <span className="text-xs text-gray-400 ml-3">
                                    {new Date(comment.approved_at || comment.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{comment.comment}</p>

                        {comment.admin_reply && (
                            <div className="mt-4 ml-4 pl-4 border-l-2 border-primary/30 bg-primary/5 rounded-r-xl p-4">
                                <div className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Taxi Service KSA</div>
                                <p className="text-gray-700 text-sm">{comment.admin_reply}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
