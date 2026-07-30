import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const routes = [
  {
    from: "Jeddah Airport",
    to: "Makkah (Haram)",
    description: "The most convenient way to start your Umrah journey. Our driver will meet you at the arrival hall and take you directly to your hotel in Makkah.",
    time: "1 Hour 15 Mins",
    distance: "100 KM",
    image: "https://images.unsplash.com/photo-1565552629477-e2be80b53d8c?q=80&w=2074&auto=format&fit=crop"
  },
  {
    from: "Makkah",
    to: "Madinah",
    description: "Travel between the two Holy Cities in absolute comfort. Enjoy a scenic drive with our experienced chauffeurs who know the best routes.",
    time: "4 Hours 30 Mins",
    distance: "450 KM",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop"
  },
  {
    from: "Jeddah",
    to: "Madinah",
    description: "Direct transfers from Jeddah to Madinah. Perfect for pilgrims and visitors who want to visit the Prophet's Mosque without delays.",
    time: "4 Hours",
    distance: "415 KM",
    image: "https://images.unsplash.com/photo-1578895101408-1a36b8342f58?q=80&w=2070&auto=format&fit=crop"
  },
  {
    from: "Riyadh Airport",
    to: "Makkah",
    description: "Long-distance luxury transfer from Riyadh to Makkah. Ideal for those who prefer a private car over flying.",
    time: "8 Hours 30 Mins",
    distance: "870 KM",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop"
  },
  {
    from: "Taif",
    to: "Makkah",
    description: "Scenic drive from the cool mountains of Taif to the Holy City of Makkah. Enjoy the beautiful landscapes in comfort.",
    time: "1 Hour 10 Mins",
    distance: "90 KM",
    image: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    from: "Madinah Airport",
    to: "Madinah City",
    description: "Quick and reliable transfer from Prince Mohammad Bin Abdulaziz Airport to your hotel in Madinah.",
    time: "25 Mins",
    distance: "20 KM",
    image: "https://images.unsplash.com/photo-1565657829323-57f9b97771b6?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function PopularRoutes() {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Top Destinations</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">Popular Taxi Routes in KSA</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We cover all major routes across Saudi Arabia. Here are some of our most frequently booked transfers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {routes.map((route, index) => (
            <div key={index} className="bg-white border border-zinc-800 rounded-xl overflow-hidden hover:border-primary/50 transition-all group flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  width="800"
                  height="600"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="bg-white/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                    <p className="text-primary font-bold text-sm">{route.distance}</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                    <p className="text-white text-sm">{route.time}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 w-full">
                    <h3 className="text-lg sm:text-xl font-bold text-white truncate">{route.from}</h3>
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-bold text-white truncate">{route.to}</h3>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm flex-1">
                  {route.description}
                </p>
                <Link href={`/booking?service=${encodeURIComponent(`${route.from} to ${route.to}`.replace(/\s+/g, '-'))}`} className="w-full">
                  <Button className="w-full bg-white text-black hover:bg-primary hover:text-black font-bold transition-all hover:scale-105 active:scale-95">
                    Book This Route
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
