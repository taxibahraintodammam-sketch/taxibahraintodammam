import React from 'react';
import { Sun, CloudSun, Snowflake, Wind, Thermometer } from 'lucide-react';

interface WeatherSeason {
    name: string;
    low: number;
    high: number;
}

interface WeatherWidgetProps {
    city: string;
    currentTemp: number;
    condition: string;
    seasons: WeatherSeason[];
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city, currentTemp, condition, seasons }) => {
    return (
        <div className="bg-[#F2F2F2] rounded-[24px] p-8 w-full max-w-sm mx-auto font-sans text-gray-900 shadow-sm border border-gray-200/50">
            <div className="flex justify-between items-start mb-8">
                <h3 className="font-bold text-sm tracking-widest text-gray-500 uppercase">WEATHER</h3>
                <span className="text-xs font-semibold bg-white px-2 py-1 rounded-md text-gray-400 capitalize">{city}</span>
            </div>

            <div className="flex flex-col items-center mb-10">
                <div className="flex items-center gap-4 mb-2">
                    <Sun className="w-16 h-16 text-amber-500 fill-amber-500 stroke-1" />
                    <span className="text-6xl font-light tracking-tighter text-gray-900">
                        {currentTemp}<span className="text-4xl align-top font-normal">°C</span>
                    </span>
                </div>
                <p className="text-lg text-gray-500 font-medium capitalize">{condition}</p>
            </div>

            <div className="space-y-4">
                {seasons.map((season) => (
                    <div key={season.name} className="flex justify-between items-center text-sm border-b border-gray-300/50 pb-2 last:border-0 last:pb-0">
                        <span className="font-bold text-gray-700 w-24">{season.name}</span>
                        <div className="flex items-center gap-6 text-gray-600 font-mono">
                            <div className="flex items-center gap-1.5 w-16 justify-end">
                                <span className="text-cyan-600 font-bold">{season.low}°</span>
                                <span className="text-xs text-gray-400">Low</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <div className="flex items-center gap-1.5 w-16 justify-end">
                                <span className="text-amber-600 font-bold">{season.high}°</span>
                                <span className="text-xs text-gray-400">High</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherWidget;
