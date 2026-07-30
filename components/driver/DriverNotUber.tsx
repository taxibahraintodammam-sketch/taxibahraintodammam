import { AlertCircle, CheckCircle } from 'lucide-react';

export default function DriverNotUber() {
  const points = [
      "No random passengers",
      "No app competition",
      "Direct bookings only",
      "Premium clients"
  ];

  return (
    <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 shadow-sm h-full w-full">
        <h3 className="text-2xl font-black text-red-900 mb-6 flex items-center gap-2">
            <AlertCircle className="w-8 h-8 text-red-600 shrink-0" /> This is NOT a Ride-Hailing App
        </h3>
        <ul className="space-y-4">
            {points.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{text}</span>
                </li>
            ))}
        </ul>
    </div>
  );
}
