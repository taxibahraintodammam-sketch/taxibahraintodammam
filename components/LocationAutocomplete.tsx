'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Suggestion {
    display_name: string;
}

interface LocationAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    name?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
}

// Free location search using OpenStreetMap's Nominatim API — no API key or
// billing account needed (unlike Google Places). Suggestions are just a
// convenience; the field stays a normal free-text input either way, since
// pickup points like "my hotel in Aziziyah" won't always resolve to a match.
export default function LocationAutocomplete({
    value, onChange, name, placeholder, className, required,
}: LocationAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const requestIdRef = useRef(0);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!value || value.trim().length < 3) {
            setSuggestions([]);
            setLoading(false);
            return;
        }

        const currentRequestId = ++requestIdRef.current;
        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=sa&limit=5&accept-language=en`
                );
                const data = await res.json();
                if (currentRequestId === requestIdRef.current) {
                    setSuggestions(Array.isArray(data) ? data : []);
                    setOpen(true);
                }
            } catch {
                if (currentRequestId === requestIdRef.current) setSuggestions([]);
            } finally {
                if (currentRequestId === requestIdRef.current) setLoading(false);
            }
        }, 450);

        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [value]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={wrapperRef} className="relative">
            <input
                name={name}
                value={value}
                onChange={(e) => { onChange(e.target.value); setOpen(true); }}
                onFocus={() => suggestions.length > 0 && setOpen(true)}
                placeholder={placeholder}
                required={required}
                autoComplete="off"
                className={className}
            />
            {loading && (
                <Loader2 className="w-4 h-4 text-gray-400 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
            )}
            {open && suggestions.length > 0 && (
                <div className="absolute z-[300] top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => { onChange(s.display_name); setOpen(false); setSuggestions([]); }}
                            className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50 last:border-0 leading-snug"
                        >
                            {s.display_name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
