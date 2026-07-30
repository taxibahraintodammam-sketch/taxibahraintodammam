import React from 'react';
import { MapPin, Clock, Info, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Site {
  name: string;
  description: string;
  significance: string;
  recommendedTime?: string;
  location?: string;
  image?: string;
}

interface ZiyaratSitesProps {
  title: string;
  subtitle: string;
  sites: Site[];
  locationSlug: string;
}

const ZiyaratSites: React.FC<ZiyaratSitesProps> = ({ title, subtitle, sites, locationSlug }) => {
  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Spiritual Journey</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">{title}</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sites.map((site, index) => (
            <div key={index} className="group bg-white rounded-[2.5rem] p-4 border border-gray-100 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full">
              {/* Image Container - Aspect Ratio 16:9 */}
              <div className="relative aspect-[16/10] w-full rounded-[2rem] overflow-hidden mb-8">
                {site.image ? (
                  <Image
                    src={site.image}
                    alt={site.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-gray-200" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {site.recommendedTime && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-xl">
                    <Clock className="w-3.5 h-3.5" /> {site.recommendedTime}
                  </div>
                )}
              </div>

              <div className="px-4 pb-4 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{site.name}</h3>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
                  {site.description}
                </p>
                
                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Significance</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium italic">"{site.significance}"</p>
                </div>

                <Link href={`/booking/?service=ziyarat&destination=${encodeURIComponent(site.name)}`} className="block">
                  <Button className="w-full bg-primary text-white hover:bg-black rounded-2xl py-7 font-black transition-all shadow-lg shadow-primary/20 hover:shadow-black/20">
                    Book Private Visit
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/makkah-pattern.png')] opacity-5 pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Full Day Ziyarat Package</h3>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                Visit all the major sites listed above in a single 6-hour private tour. Includes bottled water, private chauffeur, and door-to-door pickup.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href={`/booking/?service=ziyarat-full-day&location=${locationSlug}`} className="w-full sm:w-auto">
                    <Button className="w-full bg-primary text-white hover:bg-white hover:text-primary font-black px-12 py-8 h-auto text-xl rounded-2xl transition-all">
                        Reserve Package
                    </Button>
                </Link>
                <Link href="/pricing/" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full bg-transparent text-white border-2 border-white/20 hover:bg-white/10 font-bold px-12 py-8 h-auto text-xl rounded-2xl">
                        View Rates
                    </Button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZiyaratSites;
