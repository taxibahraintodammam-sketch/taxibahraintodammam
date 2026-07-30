"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const data = [
    {
        name: 'Private Taxi',
        'Travel Time': 75, // minutes
        color: '#10b981' // emerald-500
    },
    {
        name: 'High-Speed Train',
        'Travel Time': 165, // ~2.75 hours average
        color: '#64748b' // slate-500
    },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                <p className="font-bold text-gray-900">{label}</p>
                <p className="text-sm text-gray-600">
                    Total Time: <span className="font-bold">{Math.floor(payload[0].value / 60)}h {payload[0].value % 60}m</span>
                </p>
                {label === 'High-Speed Train' && (
                    <div className="text-xs text-gray-500 mt-2 border-t pt-2">
                        Includes: Station Transfer, Security, Wait Time, Last Mile
                    </div>
                )}
                {label === 'Private Taxi' && (
                    <div className="text-xs text-green-600 mt-2 border-t pt-2 font-bold">
                        Direct Door-to-Door
                    </div>
                )}
            </div>
        );
    }
    return null;
};

export default function TransportComparisonChart() {
    return (
        <Card className="w-full max-w-3xl mx-auto bg-white shadow-xl">
            <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 w-fit">
                    2025 Data Study
                </div>
                <CardTitle className="text-2xl md:text-3xl font-black text-gray-900">
                    Door-to-Door Efficiency Index
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                    Jeddah Airport (JED) to Makkah Hotel
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            layout="vertical"
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                            <XAxis
                                type="number"
                                unit=" min"
                                tick={{ fill: '#64748b' }}
                                domain={[0, 180]}
                            />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tick={{ fill: '#0f172a', fontWeight: 'bold' }}
                                width={120}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="Travel Time" radius={[0, 4, 4, 0]} barSize={60}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 text-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    <div>
                        <span className="block font-bold text-gray-900 mb-1">Taxi</span>
                        75 Mins Guaranteed
                    </div>
                    <div>
                        <span className="block font-bold text-gray-900 mb-1">Train</span>
                        ~165 Mins Real World*
                    </div>
                </div>
                <p className="text-xs text-center text-gray-400 mt-2">
                    *Includes station transfers, security checks, and last-mile travel time.
                </p>
            </CardContent>
        </Card>
    );
}
