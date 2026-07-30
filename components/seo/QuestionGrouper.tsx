import React from 'react';
import { HelpCircle, GitBranch, ArrowRight, Quote } from 'lucide-react';

export interface SubQuestion {
    id: string;
    question: string; // Short-form breakdown
    answer: string;
    condition?: string; // The "qualifier" or "if" statement
    citation?: string; // Inline source citation
}

export interface QuestionGrouperProps {
    mainQuestion: string; // The "Long-Form" or "Grouper" question
    intro?: string;
    subQuestions: SubQuestion[];
    isRtl?: boolean;
    labels?: {
        condition: string;
        source: string;
    };
}

const QuestionGrouper: React.FC<QuestionGrouperProps> = ({
    mainQuestion,
    intro,
    subQuestions,
    isRtl = false,
    labels = {
        condition: "Condition",
        source: "Source"
    }
}) => {
    return (
        <div className={`my-12 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">

                {/* Header: The Grouper Question */}
                <div className="mb-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-xl mt-1">
                            <GitBranch className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
                                {mainQuestion}
                            </h2>
                            {intro && (
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {intro}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sub-Questions: The Short-Form Breakdown */}
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {subQuestions.map((item, index) => (
                        <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                            {/* Icon / Connector */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <ArrowRight className={`w-5 h-5 text-slate-500 ${isRtl ? 'rotate-180' : ''}`} />
                            </div>

                            {/* Content Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
                                {item.condition && (
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 mb-3 border border-amber-200">
                                        {labels.condition}: {item.condition}
                                    </span>
                                )}
                                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-primary" />
                                    {item.question}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-3">
                                    {item.answer}
                                </p>

                                {item.citation && (
                                    <div className="flex items-center gap-2 text-xs text-gray-400 italic border-t border-gray-50 pt-3">
                                        <Quote className="w-3 h-3" />
                                        <span>{labels.source}: {item.citation}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionGrouper;
