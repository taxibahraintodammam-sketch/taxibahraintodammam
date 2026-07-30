import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface FleetPricingProps {
    vehicleName: string;
    prices: {
        route: string;
        price: string;
        highlight?: boolean;
    }[];
    currency?: string;
    colorTheme?: 'primary' | 'emerald' | 'indigo' | 'amber' | 'blue';
}

export default function FleetPricing({
    vehicleName,
    prices,
    currency = 'SAR',
    colorTheme = 'primary'
}: FleetPricingProps) {

    const colorClasses = {
        primary: {
            bar: 'bg-primary',
            text: 'text-primary',
            bg: 'bg-gray-50',
            border: 'border-gray-100',
            rowBorder: 'border-gray-200/50'
        },
        emerald: {
            bar: 'bg-emerald-500',
            text: 'text-emerald-700',
            bg: 'bg-emerald-50/50',
            border: 'border-emerald-100',
            rowBorder: 'border-emerald-100/50'
        },
        indigo: {
            bar: 'bg-indigo-500',
            text: 'text-indigo-700',
            bg: 'bg-indigo-50/50',
            border: 'border-indigo-100',
            rowBorder: 'border-indigo-100/50'
        },
        amber: {
            bar: 'bg-amber-500',
            text: 'text-amber-700',
            bg: 'bg-amber-50/50',
            border: 'border-amber-100',
            rowBorder: 'border-amber-100/50'
        },
        blue: {
            bar: 'bg-blue-500',
            text: 'text-blue-700',
            bg: 'bg-blue-50/50',
            border: 'border-blue-100',
            rowBorder: 'border-blue-100/50'
        }
    };

    const theme = colorClasses[colorTheme] || colorClasses.primary;

    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className={`w-8 h-1 ${theme.bar} rounded-full`}></span>
                Fixed Rates
            </h3>
            <div className={`space-y-3 ${theme.bg} p-5 rounded-xl border ${theme.border}`}>
                {prices.map((item, index) => (
                    <div
                        key={index}
                        className={`flex justify-between items-center text-sm sm:text-base ${index !== prices.length - 1 ? `border-b ${theme.rowBorder} pb-2` : ''
                            } ${item.highlight ? 'font-bold' : ''}`}
                    >
                        <span className="text-gray-700 font-medium">{item.route}</span>
                        <a href={`/booking/?from=${encodeURIComponent(item.route)}&vehicle=${encodeURIComponent(vehicleName)}`} className={`font-bold ${theme.text} bg-primary/10 px-3 py-1 rounded-lg hover:bg-primary/20 transition-colors`}>WhatsApp Quote</a>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <CheckCircle2 className={`w-3 h-3 ${theme.text}`} />
                All prices include fuel, driver, and taxes. No hidden fees.
            </p>
        </div>
    );
}
