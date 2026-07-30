import { CheckCircle2 } from 'lucide-react';

export default function DriverEligibility() {
  const criteria = [
      "Own car (Model 2020 or newer)",
      "Valid license",
      "English or Arabic communication",
      "Professional attitude",
      "Available for long trips, airport transfers, and border routes"
  ];

  return (
    <div className="text-center max-w-4xl mx-auto w-full my-12">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8">Who Can Apply?</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-[2rem] p-8 md:p-12 shadow-sm text-left">
            <ul className="grid md:grid-cols-2 gap-6">
                {criteria.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                        <span className="text-lg font-bold text-gray-700">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
}
