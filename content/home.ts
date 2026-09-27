/**
 * Homepage — "Pick your journey." The homepage is the map: it introduces
 * and connects the route, airport, causeway and service pages rather than
 * repeating them. Route distances, times and fares are filled from
 * content/routes.ts and content/fares.ts by the page. Booking terms (no
 * account, no advance payment, free cancellation before dispatch) and the
 * founder facts (Fahed Irshad, 15 years) are the site's existing claims.
 * No reviews are shown: the site hasn't collected publishable ones yet.
 */
export const HOME = {
  meta: {
    title: "Taxi Bahrain to Dammam | Bahrain–Saudi Causeway Transfers",
    description:
      "Private cross-border taxi between Bahrain and Saudi Arabia via the King Fahd Causeway: Dammam, Khobar, the Eastern Province and Riyadh. Fixed fare confirmed on WhatsApp, 24/7.",
  },

  hero: {
    eyebrow: "Bahrain ↔ Saudi Arabia · via the King Fahd Causeway",
    heading: "Bahrain ↔ Saudi Arabia. One journey, one driver, one fare.",
    sub: "Private cross-border transport via the King Fahd Causeway for airport trips, families, business travel, weekend journeys and long-distance routes. Tell us where you're going and we'll confirm the vehicle and fixed fare on WhatsApp.",
    corridor: "Bahrain ↔ Saudi corridor",
    shoreA: "Bahrain",
    shoreB: "Saudi Arabia",
    causeway: "King Fahd Causeway",
    imageAlt: "A private car crossing the King Fahd Causeway at sunset",
  },

  planner: {
    heading: "Plan your trip",
    direction: "Direction",
    directions: ["Bahrain → Saudi Arabia", "Saudi Arabia → Bahrain"],
    destination: "Where are you going?",
    toSaudi: ["Dammam", "Khobar", "Dammam Airport", "Qatif", "Jubail", "Ras Tanura", "Abqaiq", "Al Ahsa / Hofuf", "Riyadh"],
    toBahrain: ["Bahrain address", "Bahrain Airport"],
    other: "Other",
    otherPlaceholder: "Type the destination",
    pickup: "Pickup location",
    pickupBh: "Area, hotel or address in Bahrain",
    pickupSa: "City and address in Saudi Arabia",
    date: "Date",
    time: "Time",
    passengers: "Passengers",
    vehicle: "Vehicle",
    vehicles: ["Not sure", "Sedan", "SUV", "Van", "Luxury sedan"],
    submit: "Get My Fixed Fare",
    whatsapp: "WhatsApp Us",
    whatsappMessage: "Hi, I'd like a fare for a Bahrain–Saudi trip.",
    micro: "Nothing is booked or paid until you confirm. No account, no deposit.",
    messageIntro: "Hi, I'd like a fixed fare for a private car.",
    notSet: "not set",
  },

  trust: [
    { title: "Fixed fare", note: "Confirmed before travel" },
    { title: "Causeway toll", note: "Included in the fare" },
    { title: "24/7", note: "Day or night" },
    { title: "One vehicle", note: "Across the border" },
    { title: "English + Arabic", note: "Driver communication" },
    { title: "Airport pickups", note: "Flight tracked" },
  ],

  network: {
    eyebrow: "One corridor",
    heading: "One corridor. Many journeys.",
    intro: "Every trip starts the same way: Bahrain, immigration, the causeway, Saudi immigration. Then the road branches.",
    trunk: ["Bahrain", "Immigration", "Causeway", "Saudi immigration"],
    groups: { near: "Nearest", airport: "Airport", east: "Eastern Province", long: "Longer journey" },
    typical: "typical",
    from: "From",
    sedan: "sedan",
    view: "View route",
    km: "km",
    diagram: "Diagram, not to scale.",
    returnLabel: "Back to Bahrain",
    returnLinks: [
      { label: "Dammam → Bahrain", slug: "taxi-dammam-to-bahrain" },
      { label: "Khobar → Bahrain", slug: "taxi-khobar-to-bahrain" },
      { label: "Dammam Airport → Bahrain", slug: "dammam-airport-to-bahrain-taxi" },
    ],
    hubLink: "How the causeway crossing works",
  },

  purpose: {
    eyebrow: "Why you're crossing",
    heading: "What brings you across the causeway?",
    items: [
      { key: "airport", label: "Airport", line: "I have a flight.", body: "The flight sets the schedule. Pickups are planned around it.", href: "/airport-transfers" },
      { key: "family", label: "Family", line: "We're travelling together.", body: "Everyone and the luggage in one vehicle.", href: "/family-van-transfer" },
      { key: "business", label: "Business", line: "I need a dependable work transfer.", body: "One-off trips, or an account for regular travel.", href: "/corporate-accounts" },
      { key: "weekend", label: "Weekend", line: "I'm heading over for a short trip.", body: "Khobar is the closest city on the Saudi side.", href: "/taxi-bahrain-to-khobar" },
      { key: "uturn", label: "Visa U-turn", line: "I need to cross and come straight back.", body: "Bahrain → Saudi → Bahrain in the same car.", href: "/visa-u-turn-service" },
      { key: "hourly", label: "Chauffeur", line: "I need the car for several hours.", body: "Book the time, not every ride.", href: "/hourly-chauffeur-hire" },
      { key: "group", label: "Group", line: "We need more seats and luggage space.", body: "Vans up to 7, and a 30-seat coaster.", href: "/fleet" },
    ],
  },

  airports: {
    eyebrow: "Flying?",
    heading: "Flying into or out of the corridor?",
    body: "Your flight changes how the journey is planned. Arrivals are timed around the actual landing, departures are worked back from the flight time with room for the border.",
    boards: [
      { code: "BAH", name: "Bahrain International Airport", routes: [{ label: "BAH → Dammam", slug: "bahrain-airport-to-dammam-taxi", status: "Arrivals" }] },
      {
        code: "DMM",
        name: "King Fahd International Airport, Dammam",
        routes: [
          { label: "Bahrain → DMM", slug: "bahrain-to-dammam-airport-taxi", status: "Departures" },
          { label: "DMM → Bahrain", slug: "dammam-airport-to-bahrain-taxi", status: "Arrivals" },
        ],
      },
    ],
    note: "Flight tracking on airport pickups.",
    link: "All airport transfers",
  },

  vehicles: {
    eyebrow: "Space",
    heading: "Which vehicle fits your trip?",
    intro: "Tell us the passengers and bags before we recommend a vehicle. Two people with normal luggage fit a sedan; a family with several large bags is better in an SUV or van.",
    q1: "Passengers",
    q2: "Large bags",
    q3: "Travel style",
    styles: ["Standard", "Family", "Business", "Executive", "Group"],
    classes: [
      { key: "sedan", name: "Sedan", model: "Toyota Camry", cap: "1–3 passengers · 2 large bags", people: 3, bags: 2 },
      { key: "suv", name: "SUV", model: "GMC Yukon / Hyundai Staria VIP", cap: "1–4 passengers · 3 large bags", people: 4, bags: 3 },
      { key: "van", name: "Van", model: "Hiace / Starex / Sprinter class", cap: "Up to 7 passengers · 6 large bags", people: 7, bags: 6 },
      { key: "luxury", name: "Luxury sedan", model: "Mercedes S-Class / BMW 7 Series", cap: "1–3 passengers · 2 large bags", people: 3, bags: 2 },
    ],
    likely: "Likely fit",
    over: "More than 7? The 30-seat coaster, or two vehicles. Send the numbers on WhatsApp.",
    notSure: "Not sure? Send us your passenger and luggage count on WhatsApp.",
    notSureMessage: "Hi, which vehicle do I need? Passengers and luggage:",
    fleet: "See the fleet",
  },

  crossing: {
    eyebrow: "The crossing",
    heading: "One driver. One vehicle. Both sides of the border.",
    stages: [
      { n: "01", title: "Pickup", body: "Your agreed Bahrain or Saudi address." },
      { n: "02", title: "Exit immigration", body: "You handle your own documents." },
      { n: "03", title: "King Fahd Causeway", body: "About 25 km of bridge." },
      { n: "04", title: "Entry immigration", body: "You complete the entry formalities." },
      { n: "05", title: "Destination", body: "The driver continues to your address." },
    ],
    km: "25 km",
    kmLabel: "King Fahd Causeway",
    kmLine: "That's the bridge. The journey is longer.",
    reality: "Border queues vary, so we don't promise a crossing time, an arrival time or any immigration outcome. You handle your documents; the driver handles the vehicle.",
    link: "The full causeway crossing guide",
  },

  fares: {
    eyebrow: "Fares",
    heading: "See the fare before you book",
    route: "Bahrain ⇄ Dammam",
    names: { sedan: "Sedan", van: "Van", suv: "SUV", luxury: "Luxury sedan" },
    from: "From",
    note: "Starting fares. The final fare depends on your actual pickup, timing and vehicle, and is confirmed on WhatsApp.",
    partsLabel: "Your quoted fare",
    parts: ["Vehicle", "Driver", "Fuel", "Causeway toll", "Standard border waiting"],
    confirmed: "Confirmed before travel",
    all: "Compare all fares",
  },

  long: {
    eyebrow: "Further inland",
    heading: "When the causeway is only the beginning",
    body: "For longer journeys, the vehicle and the plan matter more: more hours in the car, more luggage, and a return to think about.",
    typical: "typical",
    km: "km",
  },

  corporate: {
    eyebrow: "Recurring travel",
    heading: "The same corridor, every week?",
    body: "Staff crossing on a rota, project teams, regular airport runs: a corporate account puts the recurring trips under one arrangement instead of one-off bookings.",
    uses: ["Staff transport", "Recurring business travel", "Shift rotations", "Project teams", "Regular airport transfers"],
    link: "Corporate accounts",
    hourly: {
      heading: "Don't need a single transfer?",
      body: "Several stops, a car for a few hours, the same driver all day: hourly chauffeur hire keeps the vehicle with you.",
      link: "Hourly chauffeur hire",
    },
    uturn: {
      heading: "Crossing to Saudi and coming straight back?",
      body: "Bahrain → Saudi → Bahrain in the same car, for a U-turn or exit and re-entry trip. We provide the transport, not immigration advice.",
      link: "Visa U-turn service",
    },
  },

  story: {
    eyebrow: "Why one corridor",
    heading: "Built around one route",
    body: [
      "We're a licensed operator focused entirely on Bahrain ↔ Saudi Arabia via the King Fahd Causeway, not a city taxi company that occasionally crosses the border.",
      "Taxi Bahrain to Dammam was founded by Fahed Irshad after 15 years in the transport industry. Knowing how the crossing actually runs, day to day and in both directions, is why everything here is organised around the route, the vehicle, the border and the airport timing.",
    ],
    link: "About us",
    doHeading: "We provide",
    do: ["The vehicle", "The driver", "The route", "A confirmed fare", "Cross-border transport"],
    dontHeading: "We don't decide",
    dont: ["Visa approval", "Border entry", "Immigration processing time", "Exact arrival time"],
    line: "Your transport is our responsibility. Your immigration eligibility and the decisions at the border remain with you and the relevant authorities.",
  },

  book: {
    eyebrow: "Booking",
    heading: "Book in one message",
    steps: [
      { n: "01", title: "Send your trip", body: "Pickup, destination, date, time, passengers, vehicle." },
      { n: "02", title: "We confirm", body: "Vehicle, fare and pickup arrangement." },
      { n: "03", title: "You confirm", body: "No account, no app, no checkout." },
      { n: "04", title: "Travel", body: "Collected, across the causeway, to your door." },
    ],
    previewTag: "Example booking message",
    customer: [
      "Hi, I need a private taxi from Juffair to Dammam.",
      "Date: 14 October",
      "Time: 8:00 AM",
      "Passengers: 3",
      "Luggage: 3 large bags",
      "Vehicle: SUV",
    ],
    reply: "Thanks. We'll confirm the vehicle and fixed all-inclusive fare for the trip.",
    send: "Send My Trip on WhatsApp",
    bookingLink: "Booking details",
  },

  faq: {
    eyebrow: "Questions",
    heading: "What passengers usually need to know",
    items: [
      { question: "How does the Bahrain–Saudi causeway crossing work?", answer: "The driver collects you, drives to the border island on the causeway, and you clear exit immigration for the country you're leaving and entry immigration for the one you're entering. The same car then takes you on to your address. The driver handles the vehicle paperwork." },
      { question: "How long does Bahrain to Dammam usually take?", answer: "Typically {dammamTime} door to door, over about {dammamKm} km. Border queues change it, so allow extra time if something at the other end is fixed." },
      { question: "Is the causeway toll included?", answer: "Yes. Every fare we quote has the toll built in, along with the vehicle, driver, fuel and standard waiting at the border." },
      { question: "Do I stay in the same vehicle across the border?", answer: "Yes. One car and one driver from your pickup to your destination, with no changeover at the border." },
      { question: "What documents do I need?", answer: "A valid passport, or a GCC national ID where accepted, and any visa or entry permit your nationality requires for the country you're entering. Requirements change, so check yours before you travel; we don't process visas." },
      { question: "Can you pick me up from either airport?", answer: "Yes. We collect from Bahrain International Airport and King Fahd International Airport in Dammam, and drop off at both. Airport pickups are timed around your actual flight." },
      { question: "How do I get the exact fare?", answer: "Send your pickup, destination, date, time, passengers and vehicle on WhatsApp, or use the planner at the top of this page. The fare is confirmed in the chat, with no account and no deposit." },
      { question: "Do you operate 24/7?", answer: "Yes, day or night. The border isn't equally busy at every hour, but you can book whatever time suits your trip." },
      { question: "What vehicle should I choose for luggage?", answer: "Count the large bags. A sedan takes two, an SUV three, and a van six with up to seven passengers. Send us the numbers if you're unsure." },
    ],
    all: "See all FAQs",
  },

  final: {
    heading: "Where are you going?",
    body: "Send us your pickup, destination, date, passengers and vehicle preference. We'll confirm the vehicle and fixed fare before you travel.",
    primary: "Get My Fixed Fare",
    secondary: "WhatsApp Us",
    routes: "View all routes",
  },

  sticky: { primary: "Get My Fixed Fare", whatsapp: "WhatsApp" },
};

export type HomeCopy = typeof HOME;
