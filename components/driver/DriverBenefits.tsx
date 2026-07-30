import { ShieldCheck, CheckCircle } from 'lucide-react';

export default function DriverBenefits() {
  const points = [
      "Weekly payouts",
      "Verified company",
      "Active clients",
      "Premium bookings"
  ];

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 shadow-sm h-full w-full">
        <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-primary shrink-0" /> Why Join Our VIP Taxi Service?
        </h3>
        <ul className="space-y-4">
            {points.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{text}</span>
                </li>
            ))}
        </ul>
    </div>
  );
}
