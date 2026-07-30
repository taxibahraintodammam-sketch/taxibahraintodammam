import { FC } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface JsonLdFAQProps {
    faqs: FAQItem[];
}

// FAQ schema intentionally removed — Google deprecated rich results for FAQPage on most pages
const JsonLdFAQ: FC<JsonLdFAQProps> = ({ faqs: _faqs }) => null;

export default JsonLdFAQ;
