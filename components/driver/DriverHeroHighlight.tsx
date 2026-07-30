import { Banknote, ShieldCheck } from 'lucide-react';

export default function DriverHeroHighlight() {
  return (
    <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-emerald-400 font-bold text-lg md:text-xl">
        <div className="flex items-center justify-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 w-full md:w-auto text-center">
            <Banknote className="w-6 h-6 shrink-0" /> 
            <span className="text-white">Earn up to 12,000 SAR/month with your own car</span>
        </div>
        <div className="flex items-center justify-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 w-full md:w-auto text-center">
            <ShieldCheck className="w-6 h-6 shrink-0" /> 
            <span className="text-white">VIP clients only – No Uber/Careem competition</span>
        </div>
    </div>
  );
}
