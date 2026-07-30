"use client";

import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
    question: string;
    answer: string;
}

interface HomeFAQProps {
    faqs: FAQItem[];
}

export default function HomeFAQ({ faqs }: HomeFAQProps) {
    const visible = faqs.slice(0, 6);
    const left = visible.filter((_, i) => i % 2 === 0);
    const right = visible.filter((_, i) => i % 2 === 1);

    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-600 mb-8">
                    If you have any questions, here are the answers.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[left, right].map((column, colIdx) => (
                        <Accordion key={colIdx} type="single" collapsible className="space-y-3">
                            {column.map((faq, idx) => (
                                <AccordionItem
                                    key={faq.question}
                                    value={`col${colIdx}-item${idx}`}
                                    className="bg-white rounded-xl border border-gray-100 px-5 shadow-sm"
                                >
                                    <AccordionTrigger className="text-sm sm:text-base font-semibold text-gray-900 hover:no-underline py-4">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-gray-600 leading-relaxed pb-4">
                                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link href="/faq/">
                        <span className="inline-flex items-center justify-center bg-primary hover:bg-blue-700 text-white text-sm font-semibold rounded-full px-8 py-3 transition-colors">
                            See all FAQs
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
