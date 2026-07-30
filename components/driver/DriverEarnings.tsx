import { Banknote, CheckCircle } from 'lucide-react';

export default function DriverEarnings() {
  const benefits = [
      "7000–12000 SAR/month (depending on trips)",
      "High-value trips",
      "Tips from VIP clients",
      "Flexible schedule"
  ];

  return (
    <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-8 shadow-sm h-full w-full">
        <h3 className="text-2xl font-black text-emerald-900 mb-6 flex items-center gap-2">
            <Banknote className="w-8 h-8 text-emerald-600 shrink-0" /> How Much Can You Earn?
        </h3>
        <ul className="space-y-4">
            {benefits.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{text}</span>
                </li>
            ))}
        </ul>
    </div>
  );
}
