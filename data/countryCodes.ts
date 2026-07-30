export interface CountryCode {
  country: string;
  code: string;
  flag: string;
}

// Dialing codes for the booking form's phone-number country picker. Bahrain
// and Saudi Arabia are listed first since they're this site's actual market.
export const countryCodes: CountryCode[] = [
  { country: "Bahrain", code: "+973", flag: "🇧🇭" },
  { country: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { country: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { country: "Kuwait", code: "+965", flag: "🇰🇼" },
  { country: "Qatar", code: "+974", flag: "🇶🇦" },
  { country: "Oman", code: "+968", flag: "🇴🇲" },
  { country: "Egypt", code: "+20", flag: "🇪🇬" },
  { country: "Jordan", code: "+962", flag: "🇯🇴" },
  { country: "Lebanon", code: "+961", flag: "🇱🇧" },
  { country: "Iraq", code: "+964", flag: "🇮🇶" },
  { country: "India", code: "+91", flag: "🇮🇳" },
  { country: "Pakistan", code: "+92", flag: "🇵🇰" },
  { country: "Bangladesh", code: "+880", flag: "🇧🇩" },
  { country: "Sri Lanka", code: "+94", flag: "🇱🇰" },
  { country: "Nepal", code: "+977", flag: "🇳🇵" },
  { country: "Philippines", code: "+63", flag: "🇵🇭" },
  { country: "Indonesia", code: "+62", flag: "🇮🇩" },
  { country: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { country: "United States", code: "+1", flag: "🇺🇸" },
  { country: "Canada", code: "+1", flag: "🇨🇦" },
  { country: "Germany", code: "+49", flag: "🇩🇪" },
  { country: "France", code: "+33", flag: "🇫🇷" },
  { country: "Turkey", code: "+90", flag: "🇹🇷" },
  { country: "China", code: "+86", flag: "🇨🇳" },
  { country: "Australia", code: "+61", flag: "🇦🇺" },
];
