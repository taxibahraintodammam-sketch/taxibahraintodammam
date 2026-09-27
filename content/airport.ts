import type { VehicleClass } from "@/content/fares";

/**
 * Copy for /airport-transfers/ (components/airport/). Arabic in airport.ar.ts.
 *
 * Grounded in what the site already states: name-board meeting in the
 * arrivals hall, flight tracking, 80–100 min door to door on the BAH/DMM
 * corridors (content/routes.ts), fares from content/fares.ts, standard
 * border waiting included, 24/7 with no night surcharge, EN/AR drivers.
 * NOT stated: a free airport waiting period, terminal numbers, lounge or
 * airline services, child-seat availability, delay compensation.
 * {fare}/{fareSar}/{time} tokens are filled from the data files.
 */

export type Step = { title: string; body: string };

export type AirportCopy = {
  meta: { title: string; description: string; ogLocale: string };
  crumb: string;
  hero: { eyebrow: string; heading: string; sub: string; primary: string; secondary: string; secondaryMessage: string; promise: string };
  widget: {
    title: string;
    arriving: string;
    departing: string;
    airport: string;
    airports: string[];
    flight: string;
    flightPlaceholder: string;
    date: string;
    time: string;
    timeArriving: string;
    timeDeparting: string;
    destination: string;
    destinationPlaceholder: string;
    pickup: string;
    pickupPlaceholder: string;
    passengers: string;
    bags: string;
    submit: string;
    note: string;
    intro: { arriving: string; departing: string };
    notSet: string;
  };
  landing: { eyebrow: string; heading: string; intro: string; steps: Step[] };
  meeting: { eyebrow: string; heading: string; intro: string; steps: Step[]; placardLabel: string; placardName: string; placardNote: string; terminalNote: string };
  tracking: {
    eyebrow: string;
    heading: string;
    body: string[];
    boardLabel: string;
    board: { label: string; value: string; tone?: "late" | "ok" }[];
    illustration: string;
    waiting: string;
  };
  airports: {
    eyebrow: string;
    heading: string;
    intro: string;
    boards: { code: string; name: string; country: string; rows: { to: string; href?: string }[] }[];
    other: string;
  };
  corridor: { eyebrow: string; heading: string; body: string; stops: string[]; reverse: string; driverHeading: string; driver: string[]; youHeading: string; you: string[] };
  timing: {
    eyebrow: string;
    heading: string;
    body: string;
    drivingLabel: string;
    totalLabel: string;
    segments: string[];
    typical: string;
    factorsHeading: string;
    factors: string[];
    departure: string;
  };
  situations: { eyebrow: string; heading: string; items: (Step & { link?: { label: string; href: string } })[] };
  luggage: {
    eyebrow: string;
    heading: string;
    body: string;
    passengers: string;
    suitcases: string;
    match: string;
    rows: { vehicle: Exclude<VehicleClass, "bus">; name: string; people: string; bags: string; note: string }[];
    tooBig: string;
    fleetLink: string;
  };
  split: { eyebrow: string; heading: string; body: string; arriving: { title: string; items: string[] }; departing: { title: string; items: string[] } };
  night: { heading: string; body: string; moments: string[]; advice: string };
  hotels: { eyebrow: string; heading: string; body: string; journeys: { label: string; href?: string }[] };
  compare: { eyebrow: string; heading: string; body: string; booked: { title: string; items: string[] }; later: { title: string; items: string[] }; fair: string };
  details: { eyebrow: string; heading: string; items: string[]; cta: string; ctaNote: string; message: string };
  example: { tag: string; heading: string; from: string; to: string; facts: { label: string; value: string }[]; reasoning: string[] };
  pricing: { eyebrow: string; heading: string; body: string; published: string; factorsHeading: string; factors: string[]; faresLink: string; cta: string };
  documents: { eyebrow: string; heading: string; items: string[]; responsibility: string; links: { label: string; href: string }[] };
  faq: { eyebrow: string; heading: string; allFaqs: string; items: { question: string; answer: string }[] };
  final: { heading: string; body: string; primary: string; secondary: string; facts: string[] };
  sticky: { fare: string; whatsapp: string };
};

export const AIRPORT: AirportCopy = {
  meta: {
    title: "Airport Transfers Bahrain ↔ Saudi Arabia | Private Cross-Border Taxi",
    description:
      "Private airport transfers between Bahrain and Saudi Arabia via the King Fahd Causeway. Bahrain Airport and Dammam Airport pickups, flight tracking and door-to-door service.",
    ogLocale: "en_BH",
  },
  crumb: "Airport Transfers",
  hero: {
    eyebrow: "Airport transfers · Bahrain ↔ Saudi Arabia",
    heading: "From the airport terminal to your final address",
    sub: "Private airport transfers between Bahrain and Saudi Arabia, including Bahrain International Airport and Dammam Airport. Your driver, vehicle and cross-border journey are arranged before you travel.",
    primary: "Get my airport fare",
    secondary: "WhatsApp the airport team",
    secondaryMessage: "Hi, I need an airport transfer between Bahrain and Saudi Arabia.",
    promise: "One airport pickup. One private vehicle. One journey across the border.",
  },
  widget: {
    title: "Your flight",
    arriving: "Arriving",
    departing: "Departing",
    airport: "Airport",
    airports: ["Bahrain International (BAH)", "King Fahd International, Dammam (DMM)"],
    flight: "Flight number",
    flightPlaceholder: "e.g. GF 123",
    date: "Date",
    time: "Flight time",
    timeArriving: "Landing time",
    timeDeparting: "Departure time",
    destination: "Final destination",
    destinationPlaceholder: "Hotel, home or address",
    pickup: "Pickup address",
    pickupPlaceholder: "Where we collect you",
    passengers: "Passengers",
    bags: "Large suitcases",
    submit: "Get my airport fare",
    note: "Opens WhatsApp with your flight details filled in. We reply with the vehicle and a fixed fare.",
    intro: { arriving: "Hi, I need an airport pickup (arriving).", departing: "Hi, I need a transfer to the airport (departing)." },
    notSet: "to confirm",
  },
  landing: {
    eyebrow: "After you land",
    heading: "Your flight lands. Your journey doesn't have to get complicated.",
    intro:
      "Landing at Bahrain Airport and continuing into Saudi Arabia isn't the same as taking a taxi into Manama. You're crossing an international border with luggage, and your total journey time depends on what happens after you leave the terminal. Here's how it goes when the car is already arranged.",
    steps: [
      { title: "Land", body: "Your flight arrives at Bahrain International or at Dammam's King Fahd International Airport." },
      { title: "Clear immigration", body: "You complete the airport's passenger formalities, as every passenger does." },
      { title: "Collect your bags", body: "Pick up your checked luggage and head out to the arrivals hall." },
      { title: "Meet your driver", body: "Your driver is waiting with a name board, timed to your actual landing, not a guess." },
      { title: "Leave the airport", body: "Straight to the car and on your way, across the King Fahd Causeway if your address is on the other side." },
      { title: "Final address", body: "Dropped at the door you gave us: a hotel, a home or an office." },
    ],
  },
  meeting: {
    eyebrow: "Meeting point",
    heading: "Where will my driver meet me?",
    intro: "It's the question people worry about most, so here's exactly how it works.",
    steps: [
      { title: "You send your flight number", body: "That's what the pickup is built around, so please double-check it." },
      { title: "We confirm the pickup", body: "The pickup details and meeting point are confirmed with you in writing on WhatsApp before you fly." },
      { title: "Your driver waits in arrivals", body: "In the public arrivals hall, holding a board with your name." },
      { title: "You can reach us any time", body: "If something changes, or you can't spot your driver, message the team on WhatsApp." },
      { title: "Off to the car", body: "Your driver helps with the luggage and walks you to the vehicle." },
    ],
    placardLabel: "Arrivals hall",
    placardName: "YOUR NAME",
    placardNote: "Taxi Bahrain to Dammam",
    terminalNote: "Airports can change terminals or gates. Check your airline's terminal before you travel and tell us if it differs from what you booked.",
  },
  tracking: {
    eyebrow: "Flight tracking",
    heading: "Your flight moves. We keep the pickup in step with it.",
    body: [
      "Scheduled arrival times are a plan, not a promise. Flights come in late, and sometimes early. Because we track your flight, the pickup follows the real landing time instead of the time on your ticket.",
      "It only works with the right flight number, so send it exactly as it appears on your booking, and tell us if you change flights.",
    ],
    boardLabel: "Arrivals",
    board: [
      { label: "Scheduled", value: "14:10" },
      { label: "Expected", value: "14:55", tone: "late" },
      { label: "Your pickup", value: "Follows the landing", tone: "ok" },
    ],
    illustration: "Illustration only",
    waiting: "How long a driver can wait depends on your confirmed booking and the airport's waiting arrangements. If you're held up, message us and we'll coordinate.",
  },
  airports: {
    eyebrow: "Two airports",
    heading: "Two airports, one cross-border service",
    intro: "Most of our airport work runs through two airports, one on each side of the causeway.",
    boards: [
      {
        code: "BAH",
        name: "Bahrain International Airport",
        country: "Bahrain",
        rows: [
          { to: "Dammam", href: "/bahrain-airport-to-dammam-taxi/" },
          { to: "Khobar", href: "/taxi-bahrain-to-khobar/" },
          { to: "Jubail", href: "/taxi-bahrain-to-jubail/" },
          { to: "Al Ahsa / Hofuf", href: "/taxi-bahrain-to-al-ahsa-hofuf/" },
          { to: "Other Saudi destinations" },
        ],
      },
      {
        code: "DMM",
        name: "King Fahd International Airport",
        country: "Dammam, Saudi Arabia",
        rows: [
          { to: "Bahrain", href: "/dammam-airport-to-bahrain-taxi/" },
          { to: "Manama" },
          { to: "Other Bahrain addresses" },
        ],
      },
    ],
    other: "Flying out rather than in? We also run from your address to either airport.",
  },
  corridor: {
    eyebrow: "The border",
    heading: "The cross-border part of an airport transfer",
    body: "Once you're in the car, the airport is only the start. Between you and your address is an international border with two immigration posts.",
    stops: ["Airport", "Private vehicle", "Bahrain immigration", "King Fahd Causeway", "Saudi immigration", "Final address"],
    reverse: "Arriving at Dammam instead? The same route runs the other way, with Saudi exit first.",
    driverHeading: "Your driver handles",
    driver: ["The vehicle's side of the crossing and its paperwork", "The causeway toll, which is included in your fare", "Waiting with you at both posts"],
    youHeading: "You handle",
    you: ["Your own passport, visa and entry requirements", "Immigration for each passenger", "Keeping documents on you, not in the boot"],
  },
  timing: {
    eyebrow: "Planning",
    heading: "How much time should I allow?",
    body: "A route that looks short on the map can take longer than you'd expect, because it's an international border crossing. Driving is only one part of the total.",
    drivingLabel: "Driving time",
    totalLabel: "Total journey time",
    segments: ["Airport exit", "Bags", "Drive", "Bahrain post", "Causeway", "Saudi post", "Drive"],
    typical: "As a guide, our Bahrain Airport ↔ Dammam and Dammam Airport ↔ Bahrain trips typically take {time} door to door, including both border posts, once you're in the car.",
    factorsHeading: "What changes it",
    factors: ["How quickly you clear the airport", "Immigration queues", "Waiting for luggage", "Causeway traffic", "Border queues", "Your destination", "Time of day", "Public holidays", "Flight delays"],
    departure: "Flying out of Dammam? For an international flight we suggest reaching the terminal 2.5–3 hours early. We'll work your pickup time back from that.",
  },
  situations: {
    eyebrow: "Your situation",
    heading: "Which situation sounds like yours?",
    items: [
      {
        title: "Landing with the family",
        body: "Two adults, two children and four suitcases don't fit a sedan. Count the bags before you book: an SUV takes up to four people and three large cases, a van up to seven people and six. If you need a child seat, ask when you book and we'll confirm whether we can provide one.",
        link: { label: "Family & group transfers", href: "/family-van-transfer/" },
      },
      {
        title: "Arriving late at night",
        body: "We run 24 hours a day with no night surcharge. A 2 a.m. arrival is booked the same way as a 2 p.m. one. Just book ahead so the car is arranged before you board.",
      },
      {
        title: "Connecting straight into Saudi Arabia",
        body: "Land at Bahrain International and go directly to Dammam, Khobar or further, without stopping in Manama. You clear Bahrain arrivals, then both border posts on the causeway, in the same car.",
        link: { label: "Bahrain Airport to Dammam", href: "/bahrain-airport-to-dammam-taxi/" },
      },
      {
        title: "Flying out of Dammam",
        body: "We collect you from your address in Bahrain or the Eastern Province and drop you at DMM departures. Tell us your airline so we go to the right entrance.",
        link: { label: "Bahrain to Dammam Airport", href: "/bahrain-to-dammam-airport-taxi/" },
      },
      {
        title: "An executive arrival",
        body: "For a senior guest or client, book the luxury sedan: a Mercedes S-Class or BMW 7 Series class car for up to three passengers and two large cases, with the same name-board meeting and flight tracking.",
        link: { label: "VIP luxury transfer", href: "/vip-luxury-transfer/" },
      },
      {
        title: "A group arrival",
        body: "Up to seven people fit in one van with six large suitcases. For bigger groups we'll suggest more than one vehicle, so everyone leaves the airport at the same time.",
      },
    ],
  },
  luggage: {
    eyebrow: "Luggage",
    heading: "Your suitcases matter as much as your passenger count",
    body: "Airport trips are where luggage catches people out. Pick your group size and number of large suitcases to see which vehicle fits.",
    passengers: "Passengers",
    suitcases: "Large suitcases",
    match: "Fits",
    rows: [
      { vehicle: "sedan", name: "Sedan", people: "1–3 passengers", bags: "2 large bags", note: "A small party with normal luggage." },
      { vehicle: "suv", name: "SUV", people: "1–4 passengers", bags: "3 large bags", note: "When there's an extra large case or two." },
      { vehicle: "van", name: "Van", people: "Up to 7 passengers", bags: "Up to 6 large bags", note: "Larger families and groups." },
      { vehicle: "luxury", name: "Luxury sedan", people: "1–3 passengers", bags: "2 large bags", note: "A premium car for a smaller party." },
    ],
    tooBig: "That's more than one vehicle can carry. Send us the details and we'll plan two vehicles.",
    fleetLink: "See the fleet",
  },
  split: {
    eyebrow: "Arriving or departing",
    heading: "An airport pickup and an airport drop-off need different planning",
    body: "Arriving, we plan around your landing. Departing, we plan backwards from your flight, with a buffer for the border.",
    arriving: { title: "Arriving", items: ["Flight number", "Arrival airport", "Final destination", "Passenger count", "Luggage", "Preferred vehicle"] },
    departing: { title: "Departing", items: ["Pickup address", "Flight time", "Airport", "Passenger count", "Luggage", "Pickup time you'd like"] },
  },
  night: {
    heading: "Some flights don't care what time it is.",
    body: "We operate 24 hours a day, seven days a week, with no night or weekend surcharge. Early departures and late arrivals are part of normal work for us.",
    moments: ["2 a.m. arrivals", "Early-morning departures", "Overnight transfers", "Weekend flights", "Holiday travel"],
    advice: "We can't promise a car at a moment's notice, especially in busy periods, so book your airport transfer ahead.",
  },
  hotels: {
    eyebrow: "Door to door",
    heading: "Airport to hotel. Hotel to airport. Address to address.",
    body: "Airport transfers aren't limited to city centres. We drop at the door you give us, on either side of the causeway.",
    journeys: [
      { label: "Bahrain Airport → a Dammam hotel", href: "/bahrain-airport-to-dammam-taxi/" },
      { label: "Bahrain Airport → a Khobar hotel", href: "/taxi-bahrain-to-khobar/" },
      { label: "Bahrain Airport → a home in Saudi Arabia" },
      { label: "Dammam Airport → a Bahrain hotel or home", href: "/dammam-airport-to-bahrain-taxi/" },
      { label: "A Bahrain hotel → Dammam Airport", href: "/bahrain-to-dammam-airport-taxi/" },
      { label: "A Dammam hotel → Bahrain Airport", href: "/taxi-dammam-to-bahrain/" },
    ],
  },
  compare: {
    eyebrow: "Booking ahead",
    heading: "Pre-booked, or finding transport after you land?",
    body: "Both work for different people. These are the practical differences on a cross-border trip.",
    booked: { title: "A pre-booked private transfer", items: ["Driver and vehicle arranged before you fly", "Your destination is already known", "The border crossing is planned in", "The vehicle is matched to your luggage", "The fare is fixed before you travel"] },
    later: { title: "Finding transport after landing", items: ["Vehicle availability varies", "A cross-border destination may need extra arranging", "Whether your group and luggage fit needs checking", "The price is agreed at the time"] },
    fair: "Airport taxis serve plenty of trips well. Booking ahead mostly matters when you're crossing the border, carrying a lot, or landing at an awkward hour.",
  },
  details: {
    eyebrow: "Booking",
    heading: "Send these details",
    items: ["Airport", "Flight number", "Arrival or departure date", "Flight time", "Pickup address", "Destination", "Adults", "Children", "Large suitcases", "Hand luggage", "Vehicle preference"],
    cta: "Send my flight details",
    ctaNote: "Send these on WhatsApp and we'll confirm the vehicle and fare.",
    message: "Hi, I need an airport transfer.\nAirport: \nFlight number: \nDate: \nFlight time: \nPickup address: \nDestination: \nAdults: \nChildren: \nLarge suitcases: \nHand luggage: \nVehicle preference: ",
  },
  example: {
    tag: "Example booking",
    heading: "What a booking looks like",
    from: "Bahrain International Airport",
    to: "A hotel in Dammam",
    facts: [
      { label: "Passengers", value: "2 adults, 1 child" },
      { label: "Luggage", value: "3 large suitcases, 2 cabin bags" },
      { label: "Flight", value: "Example flight number" },
      { label: "Arrival", value: "Example evening landing" },
    ],
    reasoning: [
      "Three people fits a sedan, but three large suitcases don't: a sedan takes two. So we'd suggest the SUV (up to four passengers, three large cases).",
      "The flight number lets us track the landing, the hotel name sets the drop-off, and the child's age tells us whether to ask about a seat.",
      "We'd confirm the vehicle, the meeting instructions and the fixed fare on WhatsApp before the flight.",
    ],
  },
  pricing: {
    eyebrow: "Price",
    heading: "What your airport fare depends on",
    body: "Every airport transfer is quoted as a fixed fare before you travel, with the causeway toll and standard border waiting included.",
    published: "For reference, our published one-way fares for the Bahrain Airport ↔ Dammam and Dammam Airport ↔ Bahrain corridors start from BHD {fare} (about SAR {fareSar}) in a sedan.",
    factorsHeading: "The final fare depends on",
    factors: ["Airport", "Pickup or drop-off address", "Vehicle class", "Passengers", "Luggage", "Date and time", "Route", "One-way or return", "Special requirements"],
    faresLink: "See all published fares",
    cta: "Get my fixed airport fare",
  },
  documents: {
    eyebrow: "Documents",
    heading: "Before you cross the border",
    items: ["A valid travel document", "Any visa or entry permission you need", "Any other permits your situation requires", "Your correct airline and flight details"],
    responsibility: "We handle the vehicle's side of the crossing. Each passenger is responsible for their own documents and immigration eligibility. We don't give immigration or legal advice.",
    links: [
      { label: "Documents for crossing by road", href: "/blog/documents-required-bahrain-to-saudi-by-road/" },
      { label: "Visa U-turn service", href: "/visa-u-turn-service/" },
    ],
  },
  faq: {
    eyebrow: "Questions",
    heading: "Airport questions",
    allFaqs: "All FAQs",
    items: [
      { question: "Do you track my flight?", answer: "Yes. Send us your flight number and we follow the flight, so the pickup is timed to when you actually land rather than the scheduled time. Please double-check the number and tell us if you change flights." },
      { question: "Where will my driver meet me at the airport?", answer: "In the public arrivals hall, holding a board with your name. We confirm the pickup details and meeting point in writing before you travel, and you can message us on WhatsApp if you can't find each other." },
      { question: "Can I travel directly from Bahrain Airport to Saudi Arabia?", answer: "Yes. Your driver meets you at Bahrain International and drives you straight across the King Fahd Causeway to your address in Dammam, Khobar or elsewhere, in the same car, without stopping in Manama." },
      { question: "Can I book Dammam Airport to Bahrain?", answer: "Yes. We meet you in the arrivals hall at King Fahd International Airport in Dammam and drive you across the causeway to your hotel, home or office in Bahrain." },
      { question: "What happens if my flight is delayed?", answer: "Because we track the flight, the pickup moves with the new landing time. How long a driver can wait beyond that depends on your confirmed booking, so if you're held up at immigration or baggage, message us and we'll coordinate." },
      { question: "How much luggage can I bring?", answer: "It depends on the vehicle. A sedan takes two large suitcases, an SUV three, a van up to six, and the luxury sedan two, plus hand luggage. Tell us your luggage count and we'll match the vehicle." },
      { question: "Which vehicle should I choose for 4 passengers with luggage?", answer: "Four passengers with up to three large suitcases fit an SUV. With four or more large suitcases, book the van, which takes up to seven passengers and six large cases." },
      { question: "Can I book an airport transfer at night?", answer: "Yes. We run 24 hours a day, seven days a week, with no night surcharge. Book ahead for late or early flights so the car is arranged before you board." },
      { question: "Can you take my family directly to our hotel?", answer: "Yes, door to door. Send the hotel name and we'll drop you at the entrance, whether it's in Bahrain or Saudi Arabia." },
      { question: "Do passengers need their own visa and travel documents?", answer: "Yes. Each passenger is responsible for a valid travel document and any visa or entry permission they need. We handle the vehicle's side of the crossing, but we don't arrange visas or guarantee entry decisions." },
      { question: "Are causeway tolls included?", answer: "Yes. The King Fahd Causeway toll and standard waiting time at both border posts are included in the fixed fare we confirm before you travel." },
      { question: "How early should I book an airport transfer?", answer: "As early as you know your flight. Same-day bookings are sometimes possible, but booking ahead is safer, especially for Thursday evenings, Friday mornings, holidays and late-night flights." },
    ],
  },
  final: {
    heading: "Send us your flight details",
    body: "Give us your airport, flight number, destination, passenger count and luggage. We'll confirm the appropriate vehicle and fare before your journey.",
    primary: "Get my airport fare",
    secondary: "WhatsApp the airport team",
    facts: ["24/7 service", "English & Arabic speaking drivers", "Private vehicles", "Bahrain ↔ Saudi crossings"],
  },
  sticky: { fare: "Get airport fare", whatsapp: "WhatsApp" },
};
