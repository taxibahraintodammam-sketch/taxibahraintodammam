/**
 * Content for the bespoke "Dammam -> Bahrain" cross-border journey page
 * (app/[locale]/taxi-dammam-to-bahrain/page.tsx, English only).
 *
 * Numbers already published elsewhere (distance, drive time, fares) are
 * read from content/routes.ts and content/fares.ts at render time rather
 * than repeated here, so this file can't drift from the source of truth.
 */

export type DbFaq = { question: string; answer: string };

export const DB_ROUTE_SLUG = "taxi-dammam-to-bahrain";

export const DB_META = {
  title: "Dammam to Bahrain Taxi | Private Causeway Transfer",
  description:
    "Private door-to-door taxi from your Dammam address across the King Fahd Causeway to your exact Bahrain destination. One vehicle, no border-side changeover. Fixed fare, toll included.",
};

export const DB_HERO = {
  eyebrow: "Dammam → Bahrain",
  heading: "Dammam to Bahrain. One Car, All the Way.",
  sub: "Private door-to-door transport from your Dammam address across the King Fahd Causeway to your Bahrain address, hotel, office or airport.",
  routeLabels: ["Dammam", "Saudi exit", "Causeway", "Bahrain entry", "Bahrain"],
  routeCaption: "Cross-border route",
  formHeading: "Build My Dammam → Bahrain Trip",
  fields: {
    pickup: "Pickup location in Dammam",
    destination: "Bahrain destination",
    date: "Date",
    time: "Pickup time",
    passengers: "Passengers",
    luggage: "Large bags",
    vehicle: "Vehicle",
    reason: "Why are you travelling?",
  },
  reasons: ["Business", "Weekend", "Airport", "Family", "Hotel", "Other"],
  primaryCta: "Get My Fare on WhatsApp",
  messageIntro: "Hi, I need a taxi from Dammam to Bahrain.",
} as const;

export const DB_NARRATIVE = {
  eyebrow: "Your Journey Starts in Dammam",
  heading: "Your Journey Starts in Dammam — Not at the Border",
  body: [
    "You don’t need to first reach a transport hub or a fixed pickup point. The driver collects you from your agreed Dammam address — home, hotel, office, a residential compound, a business-district building, or King Fahd International Airport arrivals.",
    "The same vehicle then continues across the King Fahd Causeway into Bahrain, all the way to the address you give us at booking. No changeover at the border, no second taxi to arrange on the other side.",
  ],
} as const;

export const DB_JOURNEY = {
  eyebrow: "The Complete Journey",
  heading: "Dammam Pickup to Your Bahrain Destination",
  stages: [
    { step: "01", title: "Dammam pickup", body: "Driver arrives at the agreed address." },
    { step: "02", title: "Saudi exit", body: "Passenger completes Saudi departure formalities." },
    { step: "03", title: "King Fahd Causeway", body: "Vehicle crosses approximately 25 km." },
    { step: "04", title: "Bahrain entry", body: "Passenger completes Bahrain entry formalities." },
    { step: "05", title: "Bahrain destination", body: "Driver continues to the exact agreed destination." },
  ],
} as const;

export const DB_BORDER_MIDDLE = {
  eyebrow: "A Common Misconception",
  heading: "The Border Is Halfway Through Your Trip, Not the End.",
  wrongLabel: "EASY TO ASSUME",
  wrong: "Dammam → Causeway → Bahrain, and stop thinking there.",
  rightLabel: "WHAT WE ACTUALLY BOOK",
  right: "Dammam address → Saudi border → Causeway → Bahrain border → your final Bahrain address.",
  note: "The final destination matters when quoting and planning the trip — it’s part of the booking, not an afterthought once you’re across the bridge.",
} as const;

export type DbDestinationOption = {
  label: string;
  pickupSlug?: string;
  kind?: "airport" | "hotel" | "office" | "other";
};

export const DB_DESTINATION_OPTIONS: DbDestinationOption[] = [
  { label: "Manama", pickupSlug: "manama" },
  { label: "Juffair", pickupSlug: "juffair" },
  { label: "Seef", pickupSlug: "seef" },
  { label: "Amwaj", pickupSlug: "amwaj-islands" },
  { label: "Muharraq", pickupSlug: "muharraq" },
  { label: "Riffa", pickupSlug: "riffa" },
  { label: "Adliya", pickupSlug: "adliya" },
  { label: "Hamad Town", pickupSlug: "hamad-town" },
  { label: "Isa Town", pickupSlug: "isa-town" },
  { label: "Bahrain Airport", kind: "airport" },
  { label: "Hotel", kind: "hotel" },
  { label: "Office", kind: "office" },
  { label: "Other", kind: "other" },
];

export const DB_DESTINATION = {
  eyebrow: "Where Are You Going in Bahrain?",
  heading: "Your Final Bahrain Address Sets the Plan",
  intro: "The final fare is confirmed against your actual Bahrain destination, not simply the country — use your exact address when you book.",
  options: DB_DESTINATION_OPTIONS,
  genericNote: "Send this exact location on WhatsApp and we’ll confirm the fare against it.",
  airportNote: "Your trip is now airport-bound — the pickup needs to be planned around your flight’s departure time, not the road estimate alone. See “Catching a Flight From BAH?” below.",
  officeNote: "Business travel — send the company or office name, address and your preferred pickup time.",
  hotelNote: "Send the hotel name, address and whether you’d like lobby or room-area pickup.",
} as const;

export const DB_FLYING_FROM_BAHRAIN = {
  eyebrow: "Catching a Flight From BAH?",
  heading: "Don’t Plan Around the 70–90 Minute Road Estimate Alone",
  body: "If you’re leaving Dammam to catch a flight from Bahrain International Airport, work backwards from the departure time rather than the road estimate alone.",
  chain: ["Flight departure", "Airline’s recommended airport arrival", "Bahrain airport", "Bahrain immigration", "Causeway", "Saudi immigration", "Dammam pickup"],
  note: "The 70–90 minute reference is the typical vehicle journey, not the complete airport planning window. Border conditions can change — build margin into the plan.",
  linkLabel: "See our airport transfers service",
  linkHref: "/airport-transfers/",
} as const;

export const DB_DMM_ARRIVAL = {
  eyebrow: "Landing at DMM and Going to Bahrain?",
  heading: "Direct Transfer From King Fahd International Airport",
  flow: ["DMM arrivals", "Meet driver", "Load luggage", "Saudi exit", "Causeway", "Bahrain entry", "Bahrain destination"],
  linkLabel: "See the dedicated DMM → Bahrain airport transfer",
  linkHref: "/dammam-airport-to-bahrain-taxi/",
} as const;

export const DB_BUSINESS = {
  eyebrow: "Business Travel",
  heading: "Dammam Meeting Done. Bahrain Next.",
  scenarios: [
    "Dammam office → Bahrain meeting",
    "Dammam hotel → Bahrain office",
    "Dammam business district → Bahrain airport",
  ],
  body: "One vehicle, a direct journey, no border-side taxi change, and a known fare before you leave. We don’t promise a specific meeting arrival time — border conditions are outside our control.",
} as const;

export const DB_WEEKEND = {
  eyebrow: "Weekend Travel",
  heading: "Heading to Bahrain for the Weekend?",
  body: "Traffic can be heavier during Thursday evening and Friday morning as weekend travel peaks in the Saudi-to-Bahrain direction — build extra margin into the journey rather than planning around the shortest possible crossing.",
  calendar: [
    { label: "Thursday evening", note: "Potentially heavier" },
    { label: "Friday morning", note: "Potentially heavier" },
    { label: "Public holidays", note: "Potentially heavier" },
    { label: "Other times", note: "Conditions vary" },
  ],
} as const;

export const DB_BORDER_TIME = {
  eyebrow: "Read This Before You Set a Pickup Time",
  heading: "70–90 Minutes Is a Planning Reference, Not a Promise",
  body: "The current typical door-to-door reference is 70–90 minutes. It includes the Dammam road journey, Saudi immigration, the causeway, Bahrain immigration and the final Bahrain road segment — but actual time can change due to border queues, traffic, weekend demand, holidays or operational conditions.",
  note: "We don’t guarantee arrival times, and we don’t run live border-queue data — the number above is a planning reference built from typical conditions.",
} as const;

export const DB_CAUSEWAY = {
  eyebrow: "25 KM Between the Two Sides",
  heading: "The Bridge Itself Is Only One Stage of the Journey",
  body: "Saudi exit processing and Bahrain entry processing both happen around the causeway crossing — the 25 km bridge is the middle of the trip, not the whole border process.",
} as const;

export const DB_DOCUMENTS = {
  eyebrow: "Your Documents. Our Vehicle.",
  heading: "Who Handles What",
  you: {
    label: "You",
    items: ["Passport", "Bahrain entry permission where required", "Personal eligibility", "Immigration procedures", "Entry decision"],
  },
  driver: {
    label: "Driver",
    items: ["Vehicle", "Driver", "Transport documentation", "Cross-border route", "Vehicle-side process"],
  },
  note: "We do not guarantee Bahrain entry, visa approval, immigration outcome or processing time. We can’t give nationality-specific visa advice.",
} as const;

export const DB_VISA = {
  eyebrow: "Before You Book",
  heading: "Check Your Bahrain Entry Eligibility Before Booking",
  body: "A valid passport is required (GCC nationals may use a national ID where accepted), along with any Bahrain entry visa or permit your nationality requires — requirements vary by nationality and can change. Confirm your own eligibility before travelling. We provide transportation, not immigration processing.",
} as const;

export const DB_VEHICLE_SELECTOR = {
  eyebrow: "Choose Your Vehicle Around Your Luggage",
  heading: "Passenger + Luggage Vehicle Selector",
  passengerOptions: [1, 2, 3, 4, 5, 6, 7],
  bagOptions: [0, 1, 2, 3, 4, 5, 6],
  travelTypes: [
    { value: "solo", label: "Solo" },
    { value: "couple", label: "Couple" },
    { value: "family", label: "Family" },
    { value: "business", label: "Business" },
    { value: "group", label: "Group" },
  ] as const,
  recommendLabel: "Vehicle that fits",
} as const;

export const DB_SUV_DECISION = {
  eyebrow: "Do I Need an SUV?",
  heading: "Match the Vehicle to the Trip, Not the Other Way Around",
  rows: [
    { label: "SUV makes sense if", body: "family, more luggage, more personal space, or longer-journey comfort matters to you." },
    { label: "Sedan makes sense if", body: "it’s 1–3 passengers with standard luggage." },
    { label: "Van makes sense if", body: "it’s a larger group and everyone wants to travel in one vehicle." },
    { label: "Luxury sedan makes sense if", body: "it’s executive or VIP travel." },
  ],
} as const;

export const DB_ONE_VEHICLE = {
  eyebrow: "No Border-Side Vehicle Change",
  heading: "One Continuous Journey, Not a Handover at the Bridge",
  leftLabel: "ONE CONTINUOUS JOURNEY",
  left: "Same driver, same vehicle, Dammam address to Bahrain address — through both immigration posts.",
  rightLabel: "MULTIPLE TAXIS",
  right: "A taxi to the border, a wait, then a second taxi arranged on the other side.",
} as const;

export const DB_INCLUDED = {
  eyebrow: "What’s Included",
  heading: "Know What’s Covered Before You Travel",
  yes: ["Private vehicle", "Driver", "Fuel", "King Fahd Causeway toll", "Standard waiting at both immigration posts", "Door-to-door transport"],
  noHeading: "Not included",
  no: ["Passenger visa / permit fees", "Personal purchases", "Unplanned detours", "Additional requirements caused by passenger-side changes", "Anything outside the agreed pickup / drop-off arrangement"],
} as const;

export const DB_FARE = {
  eyebrow: "Know the Fare Before You Leave",
  heading: "Starting Fares, Dammam → Bahrain",
  vehicleHeader: "Vehicle",
  capacityHeader: "Capacity",
  fareHeader: "Starting fare",
  disclaimer: "Final fare depends on pickup point, timing and vehicle. Confirm on WhatsApp before departure.",
} as const;

export const DB_COST_EXPLAINER = {
  eyebrow: "Why the Price Isn’t Just “130 km”",
  heading: "You’re Paying for a Cross-Border Journey, Not Just Kilometres",
  parts: ["Vehicle", "Driver", "Fuel", "Causeway toll", "Border waiting", "Saudi-side pickup", "Bahrain-side destination", "Cross-border vehicle operation"],
} as const;

export const DB_PICKUP = {
  eyebrow: "Pickup Location",
  heading: "Where Should We Collect You?",
  types: ["Home", "Hotel", "Office", "DMM Airport", "Residential compound", "Business district"],
  body: "Send the exact location on WhatsApp and the fare is confirmed against the actual pickup point, not a general city rate.",
} as const;

export const DB_BOOKING_ADVANCE = {
  eyebrow: "Booking Ahead",
  heading: "A Few Hours’ Notice Is Usually Enough",
  body: "Where possible, book ahead, especially around busier travel windows like Thursday evening, Friday morning and public holidays. Same-day requests may be possible depending on driver availability — send your pickup, destination, time, passengers and vehicle and we’ll confirm.",
} as const;

export const DB_CHANGES = {
  eyebrow: "Plans Changed?",
  heading: "Tell Us as Early as Possible",
  body: "If your pickup time changes, message us as early as you can. We can’t promise unlimited changes at short notice — any adjustment depends on driver availability and the agreed booking terms.",
} as const;

export const DB_WHATSAPP_PREVIEW = {
  eyebrow: "Example Booking Message",
  heading: "What to Send on WhatsApp",
  customer: [
    "Hi, I need a private taxi from Dammam to Bahrain.",
    "Pickup: Dammam Corniche",
    "Date: 15 October",
    "Time: 5:30 PM",
    "Passengers: 2",
    "Large bags: 2",
    "Destination: Juffair, Bahrain",
    "Vehicle: Sedan",
  ],
  reply: "Thanks. We’ll confirm the vehicle and fixed fare for the complete cross-border trip.",
  note: "This is an example message to show you what to send, not a real conversation.",
} as const;

export const DB_FAQ_HEADING = "Frequently Asked Questions";

export const DB_FINAL_CTA = {
  heading: "Start in Dammam. Finish in Bahrain.",
  body: "Send your Dammam pickup point, Bahrain destination, travel date, passengers and luggage. We’ll confirm the vehicle and fixed fare before you travel.",
  primary: "Get My Dammam → Bahrain Fare",
  secondary: "WhatsApp My Trip",
} as const;

export const DB_FAQS: DbFaq[] = [
  {
    question: "How far is Dammam from Bahrain?",
    answer: "Around 130 km by road, from your Dammam pickup point across the King Fahd Causeway to your Bahrain destination.",
  },
  {
    question: "How long does Dammam to Bahrain take?",
    answer: "Typically 70–90 minutes door-to-door, including both immigration stops. Treat that as a planning reference, not a guarantee — border and traffic conditions can change it.",
  },
  {
    question: "Does the 70–90 minute estimate include immigration?",
    answer: "Yes, it includes standard waiting at both the Saudi exit post and the Bahrain entry post under normal conditions.",
  },
  {
    question: "Is the Causeway toll included?",
    answer: "Yes, the King Fahd Causeway toll is included in the fixed fare, along with fuel and standard waiting time at both immigration posts.",
  },
  {
    question: "Do I stay in the same vehicle throughout?",
    answer: "Yes — the same driver and vehicle take you from your Dammam pickup point through both immigration posts to your Bahrain destination. No changeover at the border.",
  },
  {
    question: "Can you pick me up from Dammam Airport?",
    answer: "Yes, King Fahd International Airport arrivals is a normal pickup point on this route — share your flight number, arrival time, passengers and luggage so the pickup can be planned.",
  },
  {
    question: "Can you pick me up from my hotel?",
    answer: "Yes — send the hotel name, address and your preferred pickup time on WhatsApp.",
  },
  {
    question: "Can you pick me up from my home?",
    answer: "Yes, home and office pickups within Dammam are standard — send the exact address so the fare is confirmed against it.",
  },
  {
    question: "Can you take me directly to Bahrain Airport?",
    answer: "Yes. If you’re catching a flight from Bahrain International Airport, don’t plan around the 70–90 minute road estimate alone — work backwards from your flight’s departure time, as explained above.",
  },
  {
    question: "Which vehicle is best for luggage?",
    answer: "A sedan covers 1–3 passengers with 2 large bags. Choose the SUV for a third bag or extra space, the van for up to 7 passengers with around 6 large bags, or the luxury sedan for a higher standard cabin at sedan-level luggage capacity.",
  },
  {
    question: "Can seven people travel together?",
    answer: "Yes, the van seats up to seven passengers with around six large suitcases in one vehicle.",
  },
  {
    question: "Can I book a luxury sedan?",
    answer: "Yes, the luxury sedan class is available on this route for executive or VIP travel.",
  },
  {
    question: "What documents do I need to enter Bahrain?",
    answer: "A valid passport (GCC nationals may use a national ID where accepted) and any Bahrain entry visa or permit your nationality requires. Requirements vary by nationality and can change — confirm your own eligibility before travelling.",
  },
  {
    question: "Do you provide Bahrain visas?",
    answer: "No — we provide transportation, not immigration processing. Passengers are responsible for their own visa or entry permit.",
  },
  {
    question: "Can you guarantee Bahrain immigration entry?",
    answer: "No. Entry decisions are made by Bahrain immigration, not by us — we can’t guarantee entry, a visa outcome, or a specific processing time.",
  },
  {
    question: "What happens if the Causeway is busy?",
    answer: "The fare doesn’t change, but your travel time might. Treat the 70–90 minute figure as a reference and build in extra margin around busier periods.",
  },
  {
    question: "Are Thursday evenings busy?",
    answer: "Traffic can be heavier during Thursday evening as weekend travel peaks in the Saudi-to-Bahrain direction — it’s worth planning with extra margin rather than assuming the shortest possible crossing.",
  },
  {
    question: "Are Friday mornings busy?",
    answer: "The same applies — Friday morning can see heavier traffic. Conditions vary week to week, so build in a buffer rather than cutting it close.",
  },
  {
    question: "Can I book late at night?",
    answer: "Yes, bookings run around the clock.",
  },
  {
    question: "Can I book early morning?",
    answer: "Yes — early departures, including for a Bahrain Airport flight, are a normal booking on this route.",
  },
  {
    question: "How much notice do you need?",
    answer: "A few hours' notice is usually enough. Booking the evening before is safer around Thursday evening, Friday morning and public holidays when demand is higher.",
  },
  {
    question: "Can I pay in BHD or SAR?",
    answer: "Yes, every fare is quoted in both BHD and SAR so you can settle in whichever currency is easiest.",
  },
  {
    question: "Is the fare fixed?",
    answer: "Yes, once confirmed on WhatsApp against your exact pickup point, Bahrain destination, date, timing, vehicle, passengers and luggage.",
  },
  {
    question: "What information do you need for a quote?",
    answer: "Your Dammam pickup point, exact Bahrain destination, travel date and time, passenger count, luggage, and vehicle preference — see the example WhatsApp message above.",
  },
  {
    question: "Can I change my pickup time?",
    answer: "Yes, message us as early as possible — moving a pickup time is normally straightforward with reasonable notice, but changes depend on driver availability close to departure.",
  },
  {
    question: "Can I book a return journey?",
    answer: "Yes — the Bahrain to Dammam direction is a separate booking with its own page, since it starts from a different pickup point and set of Bahrain pickup areas.",
  },
];
