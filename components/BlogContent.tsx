
'use client';
import React from 'react';

import { useEffect, useRef } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { createRoot } from 'react-dom/client';

import { ArrowRight, Check, X, Info, List } from 'lucide-react';

interface BlogContentProps {
    content: string; // HTML content
}

export default function BlogContent({ content }: BlogContentProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const container = contentRef.current;
        const cleanupFunctions: (() => void)[] = [];

        // --- Helper to create and manage React roots ---
        const renderReactComponent = (element: Element, Component: React.ReactNode) => {
            const wrapperDiv = document.createElement('div');
            element.replaceWith(wrapperDiv); // Replace the original element with our wrapper
            const root = createRoot(wrapperDiv);
            root.render(Component);
            cleanupFunctions.push(() => {
                setTimeout(() => root.unmount(), 0);
                if (wrapperDiv.parentNode) {
                    wrapperDiv.remove();
                }
            });
            return wrapperDiv; // Return the new wrapper div
        };

        // --- 1. Table of Contents (TOC) ---
        const tocItems: { id: string; text: string; level: number }[] = [];
        const allHeaders = container.querySelectorAll('h2, h3');
        let tocContainer: HTMLDivElement | null = null;

        allHeaders.forEach((header, index) => {
            const text = header.textContent?.trim();
            if (text) {
                const id = header.id || `section-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                header.id = id;
                tocItems.push({ id, text, level: parseInt(header.tagName.substring(1)) });
            }
        });

        if (tocItems.length > 0) {
            const TOCComponent = (
                <div className="not-prose mb-10">
                    <Accordion type="single" collapsible className="w-full bg-gray-50 rounded-xl border border-gray-200" defaultValue="toc">
                        <AccordionItem value="toc" className="border-none">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-100/50 rounded-t-xl data-[state=open]:border-b border-gray-200">
                                <span className="flex items-center text-lg font-bold text-gray-900">
                                    <List className="w-5 h-5 mr-3 text-primary" />
                                    Table of Contents
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 bg-white/50 rounded-b-xl">
                                <ul className="space-y-3">
                                    {tocItems.map((item, idx) => (
                                        <li key={idx} className={`${item.level === 3 ? 'ml-6' : ''}`}>
                                            <a
                                                href={`#${item.id}`}
                                                className="flex items-start group text-gray-600 hover:text-primary transition-colors text-base leading-snug"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                            >
                                                <span className={`mr-2 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.level === 2 ? 'bg-primary' : 'bg-gray-300 group-hover:bg-primary/50'}`}></span>
                                                <span className={`${item.level === 2 ? 'font-medium' : ''}`}>{item.text}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            );

            // Insert TOC at the top
            const tocWrapper = document.createElement('div');
            container.prepend(tocWrapper);

            const root = createRoot(tocWrapper);
            root.render(TOCComponent);

            cleanupFunctions.push(() => {
                setTimeout(() => root.unmount(), 0);
                if (tocWrapper.parentNode) {
                    tocWrapper.remove();
                }
            });
        }

        // --- 1.5 Mid-Article Aggressive CTA ---
        const headings = Array.from(container.querySelectorAll('h2, h3'));
        if (headings.length >= 2) {
            const middleIndex = Math.floor(headings.length / 2);
            const middleHeading = headings[middleIndex];
            
            // Only inject if it's not the very last or very first thing
            if (middleHeading && middleIndex > 0 && middleIndex < headings.length) {
                const ctaWrapper = document.createElement('div');
                middleHeading.parentNode?.insertBefore(ctaWrapper, middleHeading);
                
                const MidArticleCTA = (
                    <div className="not-prose my-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-primary/20 shadow-lg block hover:shadow-xl transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all"></div>
                        <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                            <div className="flex-1">
                                <span className="inline-block px-3 py-1 bg-white text-gray-800 text-xs font-bold uppercase tracking-wider rounded-lg mb-3 shadow-sm">
                                    Flash Booking
                                </span>
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">Need a lift right now?</h4>
                                <p className="text-gray-700 text-sm md:text-base max-w-xl">
                                    Don't delay your journey. Get a premium chauffeur with instant confirmation anywhere in Saudi Arabia.
                                </p>
                            </div>
                            <div className="w-full md:w-auto flex-shrink-0">
                                <a href="/booking/" className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-primary text-black font-extrabold px-8 py-4 rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-primary/40 transition-all">
                                    Click To Book
                                    <ArrowRight className="w-5 h-5 flex-shrink-0" />
                                </a>
                            </div>
                        </div>
                    </div>
                );
                
                const root = createRoot(ctaWrapper);
                root.render(MidArticleCTA);
                cleanupFunctions.push(() => {
                    setTimeout(() => root.unmount(), 0);
                    if (ctaWrapper.parentNode) ctaWrapper.remove();
                });
            }
        }

        // --- 2. Process Pros, Cons, Key Takeaways ---
        const processSection = (headerText: string, icon: React.ElementType, iconColor: string, bgColor: string, borderColor: string) => {
            const header = Array.from(container.querySelectorAll('h2, h3')).find(h =>
                h.textContent?.toLowerCase().includes(headerText.toLowerCase())
            );

            if (header) {
                const items: string[] = [];
                let nextSibling = header.nextElementSibling;
                const elementsToRemove: Element[] = [header];

                while (nextSibling && (nextSibling.tagName === 'UL' || nextSibling.tagName === 'OL')) {
                    Array.from(nextSibling.children).forEach(li => {
                        items.push(li.innerHTML);
                    });
                    elementsToRemove.push(nextSibling);
                    nextSibling = nextSibling.nextElementSibling;
                }

                if (items.length > 0) {
                    const sectionComponent = (
                        <div className={`not-prose my-8 p-6 rounded-lg border ${borderColor} ${bgColor}`}>
                            <h3 className={`flex items-center text-lg font-semibold text-gray-900 mb-4`}>
                                {React.createElement(icon, { className: `h-6 w-6 mr-3 ${iconColor}` })}
                                {header.textContent}
                            </h3>
                            <ul className="space-y-3 list-none p-0 m-0">
                                {items.map((item, i) => (
                                    <li key={i} className="flex items-start text-gray-700">
                                        {React.createElement(icon, { className: `h-5 w-5 mr-3 flex-shrink-0 ${iconColor}` })}
                                        <span dangerouslySetInnerHTML={{ __html: item }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );

                    // Replace the first element to remove (the header) with the new component
                    const newWrapper = renderReactComponent(header, sectionComponent);

                    // Remove the rest of the original elements
                    elementsToRemove.slice(1).forEach(el => el.remove());
                }
            }
        };

        processSection('pros', Check, 'text-green-600', 'bg-green-50', 'border-green-200');
        processSection('cons', X, 'text-red-600', 'bg-red-50', 'border-red-200');
        processSection('key takeaways', Info, 'text-blue-600', 'bg-blue-50', 'border-blue-200');


        // --- 3. FAQ Section ---
        const faqHeader = Array.from(container.querySelectorAll('h2')).find(h2 =>
            h2.textContent?.toLowerCase().includes('frequently asked questions') || h2.textContent?.includes('FAQ')
        );

        if (faqHeader) {
            const questions: { question: string, answer: string }[] = [];
            let nextSibling = faqHeader.nextElementSibling;
            const elementsToRemove: Element[] = [faqHeader];

            while (nextSibling && nextSibling.tagName !== 'H2') {
                if (nextSibling.tagName === 'H3' || (nextSibling.tagName === 'P' && nextSibling.querySelector('strong'))) {
                    const questionText = nextSibling.tagName === 'H3'
                        ? (nextSibling.textContent || '')
                        : (nextSibling.querySelector('strong')?.textContent || '');

                    if (!questionText) {
                        nextSibling = nextSibling.nextElementSibling;
                        continue;
                    }

                    let answerHTML = '';
                    let answerSibling = nextSibling.nextElementSibling;
                    elementsToRemove.push(nextSibling); // Add question element to removal list

                    while (answerSibling && answerSibling.tagName !== 'H3' && answerSibling.tagName !== 'H2' && !(answerSibling.tagName === 'P' && answerSibling.querySelector('strong'))) {
                        answerHTML += answerSibling.outerHTML;
                        elementsToRemove.push(answerSibling); // Add answer element to removal list
                        answerSibling = answerSibling.nextElementSibling;
                    }

                    if (answerHTML) {
                        questions.push({ question: questionText, answer: answerHTML });
                    }
                    nextSibling = answerSibling; // Move to the next potential question or H2
                } else {
                    elementsToRemove.push(nextSibling); // Add non-Q&A elements between FAQ header and next H2 to removal list
                    nextSibling = nextSibling.nextElementSibling;
                }
            }

            if (questions.length > 0) {
                const accordionComponent = (
                    <Accordion type="single" collapsible className="w-full">
                        {questions.map((q, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-200">
                                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary hover:no-underline py-4">
                                    {q.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 pb-4">
                                    <div dangerouslySetInnerHTML={{ __html: q.answer }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                );

                // Replace the FAQ header with the new accordion component
                const newWrapper = renderReactComponent(faqHeader, <div className="mt-6 not-prose">{accordionComponent}</div>);

                // Remove all other original elements that were part of the FAQ section
                elementsToRemove.slice(1).forEach(el => el.remove());
            }
        }

        // --- Cleanup function ---
        return () => {
            cleanupFunctions.forEach(cleanup => cleanup());
        };

    }, [content]);

    return (
        <article
            ref={contentRef}
            className="prose prose-lg max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mt-12 prose-headings:mb-6 prose-headings:scroll-mt-24
                prose-h2:text-3xl prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-4 prose-h2:mt-16
                prose-h3:text-2xl prose-h3:text-gray-800
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
                prose-a:text-primary hover:prose-a:text-primary-dark prose-a:font-semibold prose-a:no-underline prose-a:border-b prose-a:border-primary/30 hover:prose-a:border-primary
                prose-strong:font-bold prose-strong:text-gray-900
                prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-3 prose-ul:my-8
                prose-li:pl-8 prose-li:relative prose-li:text-lg prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-2 prose-li:before:top-3 prose-li:before:w-2 prose-li:before:h-2 prose-li:before:bg-primary prose-li:before:rounded-full
                prose-ol:pl-8 prose-ol:space-y-3 prose-ol:text-lg prose-ol:marker:font-bold prose-ol:marker:text-primary
                prose-table:w-full prose-table:my-10 prose-table:overflow-hidden prose-table:rounded-xl prose-table:shadow-lg prose-table:border prose-table:border-gray-200
                prose-thead:bg-gray-50 prose-thead:text-gray-900 prose-thead:border-b-2 prose-thead:border-gray-200
                prose-th:p-5 prose-th:text-base prose-th:font-extrabold prose-th:uppercase prose-th:tracking-wider prose-th:text-gray-700
                prose-td:p-5 prose-td:border-b prose-td:border-gray-100 prose-td:text-base prose-td:text-gray-600 prose-td:bg-white
                prose-tr:hover:bg-gray-50/50 prose-tr:transition-colors
                prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-12 prose-img:border prose-img:border-gray-100
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:my-8"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}
