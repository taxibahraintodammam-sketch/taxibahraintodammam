'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Car, CheckCircle } from 'lucide-react';

type Mode = 'login' | 'register';

export default function DriverLoginRegister() {
    const router = useRouter();
    const [mode, setMode] = useState<Mode>('login');

    // Login state
    const [loginPhone, setLoginPhone] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Register state
    const [reg, setReg] = useState({
        full_name: '',
        phone_number: '',
        password: '',
        email: '',
        city: '',
        vehicle_model: '',
        vehicle_plate: '',
    });
    const [registering, setRegistering] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [registered, setRegistered] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [otp, setOtp] = useState('');

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateRegForm = () => {
        if (!reg.full_name || !reg.phone_number || !reg.password || !reg.email || !reg.city || !reg.vehicle_model) {
            setRegisterError('Please fill in all required fields');
            return false;
        }
        if (!EMAIL_RE.test(reg.email)) {
            setRegisterError('Enter a valid email address');
            return false;
        }
        if (reg.password.length < 6) {
            setRegisterError('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const handleSendOtp = async () => {
        setRegisterError('');
        if (!validateRegForm()) return;

        setSendingOtp(true);
        try {
            const res = await fetch('/api/driver-auth/send-otp/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: reg.email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to send code');
            setOtpSent(true);
        } catch (err) {
            setRegisterError(err instanceof Error ? err.message : 'Failed to send code');
        } finally {
            setSendingOtp(false);
        }
    };

    const handleLogin = async () => {
        setLoginError('');
        if (!loginPhone || !loginPassword) { setLoginError('Enter your phone number and password'); return; }

        setLoggingIn(true);
        try {
            const res = await fetch('/api/driver-auth/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: loginPhone, password: loginPassword }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');
            router.push(`/driver/${data.token}/`);
        } catch (err) {
            setLoginError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoggingIn(false);
        }
    };

    const handleRegister = async () => {
        setRegisterError('');
        if (!otp || otp.length < 6) {
            setRegisterError('Enter the 6-digit code sent to your email');
            return;
        }

        setRegistering(true);
        try {
            const res = await fetch('/api/driver-auth/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...reg, otp }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');
            setRegistered(true);
        } catch (err) {
            setRegisterError(err instanceof Error ? err.message : 'Registration failed');
        } finally {
            setRegistering(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-sm">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mx-auto mb-3">
                        <Car className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Driver Portal</h1>
                    <p className="text-sm text-gray-500">Taxi Bahrain to Dammam</p>
                </div>

                <div className="bg-white rounded-2xl border-2 border-gray-100 p-5">
                    <div className="flex gap-2 mb-5 bg-gray-100 rounded-xl p-1">
                        <button
                            onClick={() => setMode('login')}
                            className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-colors ${mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => { setMode('register'); setRegistered(false); setOtpSent(false); setOtp(''); setRegisterError(''); }}
                            className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-colors ${mode === 'register' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                        >
                            Register
                        </button>
                    </div>

                    {mode === 'login' ? (
                        <div className="space-y-3">
                            <input
                                value={loginPhone}
                                onChange={e => setLoginPhone(e.target.value)}
                                placeholder="Phone number"
                                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={e => setLoginPassword(e.target.value)}
                                placeholder="Password"
                                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
                            <button
                                onClick={handleLogin}
                                disabled={loggingIn}
                                className="w-full bg-black text-white font-bold py-3 rounded-xl disabled:opacity-40 flex items-center justify-center gap-2"
                            >
                                {loggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Log In
                            </button>
                        </div>
                    ) : registered ? (
                        <div className="text-center py-4">
                            <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                            <p className="font-bold text-gray-900 mb-1">Registered!</p>
                            <p className="text-sm text-gray-500 mb-4">Your application is now waiting for admin approval. Once approved, you can log in with your phone number and password.</p>
                            <button onClick={() => setMode('login')} className="text-sm font-semibold text-primary underline">
                                Back to Login
                            </button>
                        </div>
                    ) : otpSent ? (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-600">
                                We sent a 6-digit code to <strong>{reg.email}</strong>. Enter it below to finish registering.
                            </p>
                            <input
                                value={otp}
                                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="6-digit code"
                                inputMode="numeric"
                                className="w-full text-center text-2xl tracking-[0.5em] font-bold border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {registerError && <p className="text-sm text-red-600">{registerError}</p>}
                            <button
                                onClick={handleRegister}
                                disabled={registering}
                                className="w-full bg-black text-white font-bold py-3 rounded-xl disabled:opacity-40 flex items-center justify-center gap-2"
                            >
                                {registering ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Verify &amp; Register
                            </button>
                            <div className="flex justify-between text-xs">
                                <button onClick={() => { setOtpSent(false); setOtp(''); setRegisterError(''); }} className="font-semibold text-gray-500 underline">
                                    Change details
                                </button>
                                <button onClick={handleSendOtp} disabled={sendingOtp} className="font-semibold text-primary underline disabled:opacity-40">
                                    Resend code
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <input
                                value={reg.full_name}
                                onChange={e => setReg({ ...reg, full_name: e.target.value })}
                                placeholder="Full name *"
                                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                value={reg.phone_number}
                                onChange={e => setReg({ ...reg, phone_number: e.target.value })}
                                placeholder="Phone number *"
                                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                type="password"
                                value={reg.password}
                                onChange={e => setReg({ ...reg, password: e.target.value })}
                                placeholder="Password (min 6 characters) *"
                                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                type="email"
                                value={reg.email}
                                onChange={e => setReg({ ...reg, email: e.target.value })}
                                placeholder="Email *"
                                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                value={reg.city}
                                onChange={e => setReg({ ...reg, city: e.target.value })}
                                placeholder="City *"
                                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                value={reg.vehicle_model}
                                onChange={e => setReg({ ...reg, vehicle_model: e.target.value })}
                                placeholder="Vehicle model *"
                                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                value={reg.vehicle_plate}
                                onChange={e => setReg({ ...reg, vehicle_plate: e.target.value })}
                                placeholder="Vehicle plate (optional)"
                                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {registerError && <p className="text-sm text-red-600">{registerError}</p>}
                            <button
                                onClick={handleSendOtp}
                                disabled={sendingOtp}
                                className="w-full bg-black text-white font-bold py-3 rounded-xl disabled:opacity-40 flex items-center justify-center gap-2"
                            >
                                {sendingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Send Verification Code
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
