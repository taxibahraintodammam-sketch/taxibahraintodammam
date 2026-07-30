import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Ahmed Al-Sayed",
        role: "Business Traveler",
        content: "Excellent service! The driver was waiting for me at Jeddah airport even though my flight was delayed. The car was spotless and very comfortable.",
        rating: 5,
        location: "Riyadh, Saudi Arabia"
    },
    {
        name: "Fatima Khan",
        role: "Umrah Pilgrim",
        content: "We booked a round trip from Jeddah to Makkah. The driver was very polite and helpful with our luggage. Highly recommended for Umrah pilgrims.",
        rating: 5,
        location: "Lahore, Pakistan"
    },
    {
        name: "John Smith",
        role: "Tourist",
        content: "Great experience touring Madinah. The chauffeur knew all the historical sites and was very patient. Will definitely book again.",
        rating: 5,
        location: "London, UK"
    }
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Taxi Service KSA.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white border border-gray-200 p-8 rounded-lg hover:border-primary/50 hover:shadow-lg transition-all">
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                            <div>
                                <h4 className="text-gray-900 font-semibold">{testimonial.name}</h4>
                                <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
