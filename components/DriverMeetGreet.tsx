import { User, Phone, MapPin, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function DriverMeetGreet() {
    return (
        <div className="w-full max-w-4xl mx-auto my-12">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">How Our Meet & Greet Works</h3>
                <p className="text-gray-500">Zero stress arrival experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 transform -translate-y-1/2"></div>

                {/* Step 1 */}
                <Card className="border-2 border-dashed border-gray-200 hover:border-emerald-500 transition-colors bg-white relative">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                            <Search className="w-6 h-6" />
                        </div>
                        <div className="absolute top-4 right-4 text-xs font-bold text-gray-300">01</div>
                        <h4 className="font-bold text-gray-900 mb-2">Flight Tracking</h4>
                        <p className="text-sm text-gray-500">
                            We monitor your flight number. Land early or late? We'll be there.
                        </p>
                    </CardContent>
                </Card>

                {/* Step 2 */}
                <Card className="border-2 border-emerald-500 bg-emerald-50/50 relative shadow-lg transform md:-translate-y-2">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mb-4 text-white shadow-md">
                            <User className="w-6 h-6" />
                        </div>
                        <div className="absolute top-4 right-4 text-xs font-bold text-emerald-600">02</div>
                        <h4 className="font-bold text-gray-900 mb-2">Driver Waiting</h4>
                        <p className="text-sm text-gray-600 font-medium">
                            Your driver waits at the arrival hall with a name sign.
                        </p>
                    </CardContent>
                </Card>

                {/* Step 3 */}
                <Card className="border-2 border-dashed border-gray-200 hover:border-emerald-500 transition-colors bg-white relative">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                            <Phones className="w-6 h-6" />
                        </div>
                        <div className="absolute top-4 right-4 text-xs font-bold text-gray-300">03</div>
                        <h4 className="font-bold text-gray-900 mb-2">Real-time Updates</h4>
                        <p className="text-sm text-gray-500">
                            Receive real-time status updates on your driver's location and arrival.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function Phones({ className }: { className?: string }) {
    return <Phone className={className} />;
}
