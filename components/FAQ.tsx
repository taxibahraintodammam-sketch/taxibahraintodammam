import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How do I book a taxi from Jeddah Airport?",
        answer: "You can easily request a quotation through our website by clicking any 'WhatsApp Booking' or 'Book Journey' button. Our email-based booking system ensures you receive the most competitive premium rate for your trip."
    },
    {
        question: "What types of vehicles do you offer?",
        answer: "We offer a wide range of luxury vehicles including sedans (Lexus ES, Mercedes E-Class), SUVs (GMC Yukon, Chevrolet Tahoe), and luxury vans for larger groups. All our vehicles are well-maintained and air-conditioned."
    },
    {
        question: "Do you provide services for Umrah pilgrims?",
        answer: "Yes, we specialize in Umrah transportation. We provide reliable transfers between Jeddah Airport, Makkah, and Madinah. Our drivers are experienced with the routes and Ziyarat locations."
    },
    {
        question: "Are your prices fixed or metered?",
        answer: "We offer fixed, transparent pricing for all our intercity and airport transfer services. You will know the exact cost before your journey begins, with no hidden charges."
    },
    {
        question: "Is the service available 24/7?",
        answer: "Yes, our chauffeur services are available 24 hours a day, 7 days a week. Whether you have a late-night flight or an early morning meeting, we are always ready to serve you."
    }
];

export default function FAQ() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-400">
                    Find answers to common questions about our services and booking process.
                </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-zinc-800">
                        <AccordionTrigger className="text-white hover:text-primary text-left">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-400">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
