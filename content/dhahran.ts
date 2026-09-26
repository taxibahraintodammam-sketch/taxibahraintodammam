import type { VehicleClass } from "@/content/fares";

/**
 * Copy for the Bahrain → Dhahran page (app/[locale]/taxi-bahrain-to-dhahran),
 * rendered by components/dhahran/. Arabic lives in dhahran.ar.ts with the
 * same shape.
 *
 * There is deliberately NO Dhahran fare or duration here: none is published
 * in content/fares.ts or content/routes.ts. The page quotes on request and
 * uses the real Khobar/Dammam figures (injected via {khobar}/{dammam}/
 * {khobarFare}/{dammamFare} tokens) only as a clearly labelled guide.
 */

export type DhahranLink = { label: string; href: string };

export type DhahranArrival = {
  key: "business" | "hotel" | "family" | "return" | "airport";
  label: string;
  title: string;
  body: string;
  send: string[];
  vehicle: string;
  message: string;
};

export type DhahranCopy = {
  meta: { title: string; description: string; ogLocale: string };
  crumb: string;
  hero: {
    eyebrow: string;
    headingLead: string;
    headingPlace: string;
    sub: string;
    trust: string[];
    note: string;
  };
  panel: {
    title: string;
    from: string;
    to: string;
    pickup: string;
    pickupPlaceholder: string;
    destination: string;
    destinationOptions: string[];
    date: string;
    passengers: string;
    journey: string;
    oneWay: string;
    return: string;
    submit: string;
    secondary: string;
    note: string;
    messageIntro: string;
    toConfirm: string;
  };
  why: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    body: string;
    points: { title: string; body: string }[];
    closing: string;
  };
  arrivals: {
    eyebrow: string;
    heading: string;
    intro: string;
    sendLabel: string;
    vehicleLabel: string;
    cta: string;
    types: DhahranArrival[];
  };
  destinations: {
    eyebrow: string;
    heading: string;
    intro: string;
    columns: { dest: string; drop: string; note: string };
    rows: { dest: string; drop: string; note: string }[];
    nearbyLabel: string;
    nearby: DhahranLink[];
    accessNote: string;
    footnote: string;
    cta: string;
    ctaMessage: string;
  };
  business: {
    eyebrow: string;
    heading: string;
    body: string[];
    points: { body: string; link?: DhahranLink }[];
  };
  vehicles: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: { vehicle: Exclude<VehicleClass, "bus">; purpose: string; body: string }[];
    fleetLink: string;
  };
  journey: {
    eyebrow: string;
    heading: string;
    stops: { name: string; note: string }[];
    timing: string;
    caveatsHeading: string;
    caveats: string[];
    causewayLink: string;
  };
  tripType: {
    eyebrow: string;
    heading: string;
    bestFor: string;
    oneWay: { title: string; body: string; uses: string[] };
    return: { title: string; body: string; uses: string[] };
    cta: string;
    ctaMessage: string;
  };
  fare: {
    eyebrow: string;
    heading: string;
    body: string;
    reference: string;
    faresLink: string;
    included: string;
    previewLabel: string;
    fields: string[];
    greeting: string;
    cta: string;
  };
  before: {
    heading: string;
    sendLabel: string;
    send: string[];
    confirmLabel: string;
    confirm: string[];
    altLead: string;
    altBooking: string;
    altOr: string;
    altContact: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: { question: string; answer: string }[];
  };
};

export const DHAHRAN: DhahranCopy = {
  meta: {
    title: "Bahrain to Dhahran Taxi | Private Car with Driver via Causeway",
    description:
      "Private Bahrain to Dhahran taxi across the King Fahd Causeway: door-to-door for meetings, hotels and family visits, one-way or return. Fare confirmed on WhatsApp first.",
    ogLocale: "en_BH",
  },
  crumb: "Bahrain to Dhahran Taxi",
  hero: {
    eyebrow: "Bahrain → Dhahran · Private car with driver",
    headingLead: "Private taxi from Bahrain to",
    headingPlace: "Dhahran",
    sub: "Door-to-door cross-border transport for business trips, hotel stays, families and private travel.",
    trust: ["Private vehicle", "Cross-border service", "Fare confirmed before travel"],
    note: "Dhahran sits between Khobar and Dammam, a short drive beyond the Saudi end of the King Fahd Causeway.",
  },
  panel: {
    title: "Trip request",
    from: "Bahrain",
    to: "Dhahran",
    pickup: "Pickup in Bahrain",
    pickupPlaceholder: "Hotel, area or address",
    destination: "Dhahran destination",
    destinationOptions: [
      "A hotel in Dhahran",
      "Office or meeting venue",
      "Home or residential compound",
      "KFUPM / Dhahran Techno Valley",
      "Ithra (King Abdulaziz Center for World Culture)",
      "Not sure yet, I'll send a pin",
    ],
    date: "Travel date",
    passengers: "Passengers",
    journey: "Journey",
    oneWay: "One way",
    return: "Return",
    submit: "Get my Dhahran fare",
    secondary: "WhatsApp booking",
    note: "Opens WhatsApp with your trip details. No account or payment needed.",
    messageIntro: "Hi, I'd like a fare for a private taxi from Bahrain to Dhahran.",
    toConfirm: "(to confirm)",
  },
  why: {
    eyebrow: "Why Dhahran trips are different",
    headingLead: "Most Dhahran trips run to",
    headingAccent: "someone else's clock.",
    body: "A meeting at nine, a hotel check-in or a family expecting you for lunch: Dhahran journeys usually have a fixed appointment on the Saudi side. Sorting out transport after the border is where that time gets lost.",
    points: [
      { title: "Business schedules", body: "You need to arrive at a set time, not whenever a taxi turns up after the border." },
      { title: "Hotel check-ins", body: "Your bags go from your door in Bahrain to the hotel entrance without changing cars." },
      { title: "Meetings", body: "Arrive with time to spare instead of negotiating a fare at the Saudi exit." },
      { title: "Planned returns", body: "Many visits end with the same trip back. Book both legs together." },
      { title: "Luggage", body: "Suitcases, samples or a family's weekend bags all stay in one boot." },
      { title: "Early departures", body: "We run around the clock, so a pre-dawn pickup for a morning meeting is routine." },
    ],
    closing: "A pre-arranged private car takes out the guesswork: one booking and one driver, straight to the address.",
  },
  arrivals: {
    eyebrow: "Choose your arrival type",
    heading: "What kind of Dhahran trip is it?",
    intro: "Pick the one closest to yours. Each needs slightly different details from you.",
    sendLabel: "Send us",
    vehicleLabel: "Usually best",
    cta: "Ask about this trip on WhatsApp",
    types: [
      {
        key: "business",
        label: "Business",
        title: "Meetings and scheduled visits",
        body: "Tell us when you need to be at the door, not just when you'd like to leave. We work the pickup back from your meeting and allow for the border, the one part nobody can time to the minute.",
        send: ["Meeting address or venue", "The time you need to arrive", "Whether you're coming back the same day"],
        vehicle: "Sedan, or a luxury sedan for executive visits",
        message: "Hi, I need a private taxi from Bahrain to a business meeting in Dhahran.\nMeeting address: \nNeed to arrive by: \nReturning the same day? ",
      },
      {
        key: "hotel",
        label: "Hotel",
        title: "From your door to the hotel entrance",
        body: "We collect you from your Bahrain hotel, home or office and drop you at your Dhahran hotel's entrance. Give us the hotel name, and add a return on check-out day if you'd like one.",
        send: ["Bahrain pickup (a hotel name is fine)", "Your Dhahran hotel", "Check-in date and rough arrival time"],
        vehicle: "Sedan for light luggage, SUV if you're carrying more",
        message: "Hi, I need a private taxi from Bahrain to my hotel in Dhahran.\nBahrain pickup: \nDhahran hotel: \nDate and time: ",
      },
      {
        key: "family",
        label: "Family",
        title: "Everyone and everything in one car",
        body: "Visiting relatives or spending a weekend in Dhahran with children and bags? A private SUV or van keeps the family together through both border posts, with all the luggage in the same vehicle.",
        send: ["Number of adults and children", "Number of large bags", "Home or residential address in Dhahran"],
        vehicle: "SUV for up to 4, van for up to 7",
        message: "Hi, we're a family travelling from Bahrain to Dhahran.\nAdults / children: \nLarge bags: \nDhahran address: \nDate: ",
      },
      {
        key: "return",
        label: "Return",
        title: "Bahrain → Dhahran → Bahrain",
        body: "If you know when you're coming back, book both legs at once. Coming back the same day? Ask about the driver waiting, or about hourly hire if your day has several stops.",
        send: ["Outbound date and time", "Return date and time, or 'same day'", "Any extra stops in Dhahran"],
        vehicle: "Any class, depending on your group",
        message: "Hi, I'd like a return taxi Bahrain → Dhahran → Bahrain.\nOutbound: \nReturn: \nPassengers: ",
      },
      {
        key: "airport",
        label: "Airport",
        title: "Landing at Bahrain International",
        body: "Your driver meets you in BAH arrivals, tracks your flight and drives straight across the causeway to Dhahran. For other airport connections, send your flight details and we'll confirm what's possible before you book.",
        send: ["Flight number and landing time", "Passengers and checked bags", "Dhahran drop-off address"],
        vehicle: "SUV if you have checked luggage",
        message: "Hi, I'm landing at Bahrain International and need a taxi to Dhahran.\nFlight number: \nPassengers / bags: \nDhahran address: ",
      },
    ],
  },
  destinations: {
    eyebrow: "Your Dhahran destination",
    heading: "Where in Dhahran are you going?",
    intro: "Dhahran is a mix of campuses, company districts, hotels and quiet residential streets. Here's how drop-offs usually work for each.",
    columns: { dest: "Destination", drop: "Drop-off", note: "Good to know" },
    rows: [
      { dest: "Hotels", drop: "Main entrance", note: "Send the hotel name and we'll confirm the address." },
      { dest: "Offices & business districts", drop: "Building entrance or reception", note: "Tell us the building and the time you're expected." },
      { dest: "Residential areas & compounds", drop: "Your door or the compound gate", note: "Some compounds need your name at the gate. Please arrange this with your host." },
      { dest: "KFUPM & Dhahran Techno Valley", drop: "Public gate or visitor entrance", note: "Campus access rules are set by the university." },
      { dest: "Ithra", drop: "Visitor drop-off", note: "Check opening times before you travel." },
      { dest: "Company sites & controlled facilities", drop: "An approved meeting point", note: "Your host confirms access. We can't enter restricted areas." },
    ],
    nearbyLabel: "Also nearby",
    nearby: [
      { label: "Khobar", href: "/taxi-bahrain-to-khobar/" },
      { label: "Dammam", href: "/taxi-bahrain-to-dammam/" },
      { label: "Jubail (further north)", href: "/taxi-bahrain-to-jubail/" },
    ],
    accessNote:
      "For destinations within controlled or restricted facilities, passengers should confirm their access requirements with the destination or host. We can arrange transport to an approved pickup/drop-off point where applicable.",
    footnote: "Send us your exact Dhahran destination and we'll confirm the route and fare.",
    cta: "Send my destination",
    ctaMessage: "Hi, I'd like a taxi from Bahrain to Dhahran.\nMy Dhahran destination: ",
  },
  business: {
    eyebrow: "For business travel",
    heading: "Business travel without the extra logistics",
    body: [
      "Executives, consultants, contractors and company visitors usually come to Dhahran with a fixed agenda. The drive itself is short. The uncertainty is the border, so a pre-booked car is one less thing to plan around it.",
    ],
    points: [
      { body: "We plan the pickup backwards from your meeting time, with room for the border." },
      { body: "The same driver takes you from Bahrain to the door, with no handover at the causeway." },
      {
        body: "Meetings across Dhahran, Khobar and Dammam in one day? Hourly hire keeps the car and driver with you between stops.",
        link: { label: "Hourly chauffeur hire", href: "/hourly-chauffeur-hire/" },
      },
      {
        body: "Staff travelling every week? A corporate account gives you one coordinator and consolidated billing.",
        link: { label: "Corporate accounts", href: "/corporate-accounts/" },
      },
    ],
  },
  vehicles: {
    eyebrow: "Vehicles",
    heading: "The right vehicle for Dhahran",
    intro: "Choose by the purpose of the trip, not just the headcount.",
    items: [
      { vehicle: "sedan", purpose: "A solo meeting or a couple", body: "1–3 passengers with normal luggage. Quiet and practical for a short business run." },
      { vehicle: "suv", purpose: "More bags, more room", body: "Seats up to four with space for a third large case. A good fit for hotel stays and airport arrivals." },
      { vehicle: "van", purpose: "Families and groups", body: "Up to seven passengers and six large bags, so nobody travels separately." },
      { vehicle: "luxury", purpose: "Executive visits", body: "An executive-class car for senior guests and client meetings." },
    ],
    fleetLink: "Compare the full fleet",
  },
  journey: {
    eyebrow: "Plan the journey",
    heading: "From your door in Bahrain to Dhahran",
    stops: [
      { name: "Bahrain pickup", note: "Hotel, home, office or BAH" },
      { name: "King Fahd Causeway", note: "~25 km bridge, toll included" },
      { name: "Saudi border", note: "Each passenger clears immigration" },
      { name: "Eastern Province", note: "A short drive via Khobar" },
      { name: "Dhahran", note: "Your exact address" },
    ],
    timing:
      "As a guide, our Khobar trips usually take {khobar} door to door and Dammam trips {dammam}. Dhahran is between the two, but your exact time depends on traffic, your addresses and the border.",
    caveatsHeading: "Worth knowing",
    caveats: [
      "Border and immigration times vary, especially on Thursday evenings, Friday mornings and public holidays.",
      "Your driver can't speed up or control immigration processing.",
      "Passengers are responsible for valid passports, visas and entry documents.",
    ],
    causewayLink: "How the King Fahd Causeway crossing works",
  },
  tripType: {
    eyebrow: "Journey type",
    heading: "One-way or return?",
    bestFor: "Best for",
    oneWay: {
      title: "One way",
      body: "You book only the trip you're taking now, and arrange the way back later if your plans are open.",
      uses: ["Hotel stays", "Business visits with onward plans", "Relocation or long stays", "Onward travel in Saudi Arabia"],
    },
    return: {
      title: "Return",
      body: "The same trip back to Bahrain, arranged in one conversation. Return pricing is confirmed against your actual schedule, including any waiting time.",
      uses: ["Same-day meetings", "Short family visits", "Weekend stays with a fixed return"],
    },
    cta: "Request a return fare",
    ctaMessage: "Hi, I'd like a return fare Bahrain → Dhahran → Bahrain.\nPickup in Bahrain: \nDhahran destination: \nOutbound date & time: \nReturn date & time: \nPassengers: ",
  },
  fare: {
    eyebrow: "Get your exact fare",
    heading: "Dhahran fares are quoted for your trip",
    body: "Dhahran fares depend on your Bahrain pickup, your Dhahran destination, the vehicle and whether you need a return. Send us the details and we'll reply with a fixed fare before you travel.",
    reference:
      "For reference, published one-way sedan fares start from BHD {khobarFare} to neighbouring Khobar and BHD {dammamFare} to Dammam.",
    faresLink: "See all published fares",
    included: "Every fare includes the vehicle, driver, fuel, causeway toll and standard border waiting time.",
    previewLabel: "The message we'll open for you",
    fields: [
      "Bahrain pickup",
      "Dhahran destination",
      "Date",
      "Pickup time",
      "Passengers",
      "Luggage",
      "One-way or return",
      "Vehicle preference",
    ],
    greeting: "Hi, I'd like an exact fare for a taxi from Bahrain to Dhahran.",
    cta: "WhatsApp us for an exact fare",
  },
  before: {
    heading: "Before you book",
    sendLabel: "Send us",
    send: ["Pickup", "Destination", "Date", "Time", "Passengers", "Luggage"],
    confirmLabel: "We'll confirm",
    confirm: ["Vehicle", "Fare", "Pickup details", "Booking"],
    altLead: "Prefer not to use WhatsApp? Use the",
    altBooking: "booking form",
    altOr: "or",
    altContact: "contact us",
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Bahrain to Dhahran questions",
    items: [
      {
        question: "How long does Bahrain to Dhahran take?",
        answer:
          "It depends on your exact addresses and the border. As a guide, our Khobar trips usually take {khobar} and Dammam trips {dammam} door to door, and Dhahran sits between the two. Allow extra time on Thursday evenings, Friday mornings and public holidays.",
      },
      {
        question: "How much is a taxi from Bahrain to Dhahran?",
        answer:
          "We quote each Dhahran trip individually, based on your Bahrain pickup, Dhahran destination, vehicle and whether you need a return. Send the details on WhatsApp and we'll confirm a fixed fare before you travel. The causeway toll is always included.",
      },
      {
        question: "Can I book a private taxi from my Bahrain hotel?",
        answer: "Yes. We pick up from hotels, homes and offices anywhere in Bahrain, and from Bahrain International Airport arrivals.",
      },
      {
        question: "Can you take me directly to my Dhahran hotel?",
        answer: "Yes. Send us the hotel name and we'll drop you at the entrance.",
      },
      {
        question: "Can I book a return trip?",
        answer:
          "Yes. Send both legs when you book. Return pricing is confirmed against your schedule, including any waiting if you're coming back the same day.",
      },
      {
        question: "Can I travel with luggage?",
        answer:
          "Yes. A sedan takes two large bags, an SUV three and a van six. Tell us what you're carrying and we'll suggest the right vehicle.",
      },
      {
        question: "Can I book a sedan, SUV or van?",
        answer: "Yes, and a luxury sedan for executive travel. Choose one when you book, or let us recommend one for your group.",
      },
      {
        question: "Can I book an early-morning business trip?",
        answer:
          "Yes, we operate 24 hours a day. Tell us when you need to arrive and we'll suggest a pickup time that allows for the border.",
      },
      {
        question: "Do I need to change vehicles at the causeway?",
        answer: "No. The same car and driver take you from your Bahrain pickup to your Dhahran destination.",
      },
      {
        question: "What documents do I need for the Bahrain–Saudi journey?",
        answer:
          "A valid passport (or GCC national ID where accepted) and any Saudi visa or permit your nationality requires. Each passenger completes their own immigration formalities. We don't arrange visas or guarantee entry.",
      },
    ],
  },
};
