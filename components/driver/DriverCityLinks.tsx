import Link from 'next/link';

interface DriverCityLinksProps {
    currentCityId?: string;
}

const citiesData = [
    { id: 'riyadh', name: 'Riyadh' },
    { id: 'jeddah', name: 'Jeddah' },
    { id: 'makkah', name: 'Makkah' },
    { id: 'madinah', name: 'Madinah' },
    { id: 'dammam', name: 'Dammam' },
    { id: 'khobar', name: 'Khobar' },
    { id: 'dhahran', name: 'Dhahran' },
    { id: 'taif', name: 'Taif' },
    { id: 'tabuk', name: 'Tabuk' },
    { id: 'abha', name: 'Abha' },
    { id: 'khamis-mushait', name: 'Khamis Mushait' },
    { id: 'hail', name: 'Hail' },
    { id: 'buraidah', name: 'Buraidah' },
    { id: 'najran', name: 'Najran' },
    { id: 'jubail', name: 'Jubail' },
    { id: 'yanbu', name: 'Yanbu' },
    { id: 'al-qassim', name: 'Al Qassim' },
    { id: 'al-ahsa', name: 'Al Ahsa' }
];

export default function DriverCityLinks({ currentCityId }: DriverCityLinksProps) {
    const toShow = currentCityId ? citiesData.filter(c => c.id !== currentCityId) : citiesData;

    return (
        <section className="py-24 px-4 bg-white border-t border-gray-100 w-full rounded-[2.5rem]">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-8">We are also hiring in other cities</h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {toShow.map(city => (
                        <Link 
                            key={city.id} 
                            href={`/join-as-driver/${city.id}`}
                            className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-primary hover:text-white hover:border-primary transition-colors inline-block"
                        >
                            Driver jobs in {city.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
