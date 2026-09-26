export type NavLink = {
  label: string;
  href: string;
};

export const PRIMARY_NAV: NavLink[] = [
  { label: "Routes", href: "/king-fahd-causeway-taxi/" },
  { label: "Airport transfers", href: "/airport-transfers/" },
  { label: "Corporate", href: "/corporate-accounts/" },
  { label: "Fleet", href: "/fleet/" },
  { label: "Fares", href: "/fares/" },
  { label: "Contact", href: "/contact/" },
];

export const ROUTE_LINKS: NavLink[] = [
  { label: "Bahrain to Dammam", href: "/taxi-bahrain-to-dammam/" },
  { label: "Dammam to Bahrain", href: "/taxi-dammam-to-bahrain/" },
  { label: "Bahrain to Dammam Airport", href: "/bahrain-to-dammam-airport-taxi/" },
  { label: "Dammam Airport to Bahrain", href: "/dammam-airport-to-bahrain-taxi/" },
  { label: "Bahrain Airport to Dammam", href: "/bahrain-airport-to-dammam-taxi/" },
  { label: "Bahrain to Khobar", href: "/taxi-bahrain-to-khobar/" },
  { label: "Khobar to Bahrain", href: "/taxi-khobar-to-bahrain/" },
  { label: "Bahrain to Dhahran", href: "/taxi-bahrain-to-dhahran/" },
  { label: "Bahrain to Riyadh", href: "/taxi-bahrain-to-riyadh/" },
  { label: "Bahrain to Jubail", href: "/taxi-bahrain-to-jubail/" },
  { label: "Bahrain to Al Ahsa / Hofuf", href: "/taxi-bahrain-to-al-ahsa-hofuf/" },
  { label: "Bahrain to Ras Tanura", href: "/taxi-bahrain-to-ras-tanura/" },
  { label: "Bahrain to Abqaiq", href: "/taxi-bahrain-to-abqaiq/" },
  { label: "Bahrain to Qatif", href: "/taxi-bahrain-to-qatif/" },
  { label: "King Fahd Causeway Hub", href: "/king-fahd-causeway-taxi/" },
];

export const SERVICE_LINKS: NavLink[] = [
  { label: "Visa U-Turn Service", href: "/visa-u-turn-service/" },
  { label: "Airport Transfers", href: "/airport-transfers/" },
  { label: "Hourly Chauffeur Hire", href: "/hourly-chauffeur-hire/" },
  { label: "Corporate Accounts", href: "/corporate-accounts/" },
  { label: "Family Van Transfer", href: "/family-van-transfer/" },
  { label: "VIP Luxury Transfer", href: "/vip-luxury-transfer/" },
  { label: "Wheelchair Accessible Transfer", href: "/wheelchair-accessible-transfer/" },
];

export const PICKUP_LINKS: NavLink[] = [
  { label: "Manama", href: "/pickup/manama/" },
  { label: "Juffair", href: "/pickup/juffair/" },
  { label: "Seef", href: "/pickup/seef/" },
  { label: "Muharraq", href: "/pickup/muharraq/" },
  { label: "Riffa", href: "/pickup/riffa/" },
  { label: "Adliya", href: "/pickup/adliya/" },
  { label: "Amwaj Islands", href: "/pickup/amwaj-islands/" },
  { label: "Budaiya", href: "/pickup/budaiya/" },
  { label: "Isa Town", href: "/pickup/isa-town/" },
  { label: "Hamad Town", href: "/pickup/hamad-town/" },
  { label: "Sitra", href: "/pickup/sitra/" },
  { label: "Bahrain Airport", href: "/pickup/bahrain-airport/" },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "FAQs", href: "/faqs/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Terms & Conditions", href: "/terms-and-conditions/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Cancellation & Refund Policy", href: "/cancellation-and-refund-policy/" },
];

export const COMPANY_LINKS: NavLink[] = [
  { label: "About us", href: "/about/" },
  { label: "Our fleet", href: "/fleet/" },
  { label: "Fare table", href: "/fares/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Travel guides", href: "/blog/" },
];

// Curated for the footer: the trips people actually book, plus the full index.
export const FOOTER_ROUTE_LINKS: NavLink[] = [
  { label: "Bahrain to Dammam", href: "/taxi-bahrain-to-dammam/" },
  { label: "Dammam to Bahrain", href: "/taxi-dammam-to-bahrain/" },
  { label: "Bahrain to Khobar", href: "/taxi-bahrain-to-khobar/" },
  { label: "Bahrain Airport to Dammam", href: "/bahrain-airport-to-dammam-taxi/" },
  { label: "Bahrain to Dammam Airport", href: "/bahrain-to-dammam-airport-taxi/" },
  { label: "Bahrain to Riyadh", href: "/taxi-bahrain-to-riyadh/" },
  { label: "All routes", href: "/king-fahd-causeway-taxi/" },
];

export const SUPPORT_LINKS: NavLink[] = [
  { label: "Book a trip", href: "/booking/" },
  { label: "Contact", href: "/contact/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "Cancellation & refunds", href: "/cancellation-and-refund-policy/" },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Terms & Conditions", href: "/terms-and-conditions/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
];
