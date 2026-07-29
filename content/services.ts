import type { VehicleClass } from "@/content/fares";

export type ServiceSection = {
  heading: string;
  paragraphs: string[];
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceContent = {
  slug: string;
  name: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  sections: ServiceSection[];
  vehicles: VehicleClass[];
  faqs: ServiceFaq[];
  minPriceBhd: number;
  related: string[];
};

export const SERVICES: ServiceContent[] = [
  {
    slug: "visa-u-turn-service",
    name: "Visa U-Turn Service",
    primaryKeyword: "visa U-turn service Bahrain",
    metaTitle: "Visa U-Turn Service Bahrain | Exit-Re-Entry Border Run",
    metaDescription:
      "Bahrain visa U-turn / exit-re-entry service via the King Fahd Causeway. A licensed driver takes you across into Saudi Arabia and straight back. Book on WhatsApp.",
    intro: [
      "A visa U-turn — also called an exit-re-entry or border run — is a round trip across the King Fahd Causeway into Saudi Arabia and straight back into Bahrain, done specifically to exit and re-enter Bahrain for immigration purposes. The whole round trip typically takes three to five hours depending on border queues and how long you spend on the Saudi side before returning.",
      "We provide the licensed vehicle and driver for the crossing itself, both directions, with one fixed fare covering the full round trip. What you do on each side of the border with your own documents and status is entirely your responsibility — we are a transport operator, not an immigration adviser, and we don't process visas or guarantee any particular outcome.",
    ],
    sections: [
      {
        heading: "How a Visa U-Turn Trip Works",
        paragraphs: [
          "Your driver collects you in Bahrain and takes you to the Bahrain-side immigration post at the start of the causeway, where you exit Bahrain in the normal way. You then cross the 25 km bridge, clear Saudi entry immigration on the other side, and — depending on your specific plan — either turn around after clearing Saudi entry or continue briefly into Saudi Arabia before heading back.",
          "The return leg mirrors the outbound one: exit Saudi Arabia at its immigration post, cross the causeway again, and clear Bahrain entry immigration to complete the round trip. The same driver and vehicle handle both directions, so there's no need to arrange separate transport on each side.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the vehicle and driver for the full round trip, fuel, the causeway toll in both directions, and standard waiting time at all four immigration checkpoints (Bahrain exit, Saudi entry, Saudi exit, Bahrain entry).",
          "Not included: any Saudi entry visa, permit, or fee your nationality requires, and any extended waiting time if you choose to spend significant time in Saudi Arabia before returning — tell us your rough plan when you book so we can quote accordingly. We do not advise on visa strategy, immigration eligibility, or how a U-turn interacts with your specific residency or visa status; that's a matter for your own research or an immigration professional.",
        ],
      },
      {
        heading: "Documents You'll Need",
        paragraphs: [
          "A valid passport is required for all four checkpoints, plus whatever Saudi entry visa or permit your nationality requires for even a brief crossing into Saudi Arabia. Requirements and eligibility for this kind of trip vary by nationality and by your specific Bahrain residency status, and they change over time — confirming your own situation before booking is entirely your responsibility.",
          "We do not guarantee entry or re-entry decisions at any of the four checkpoints. Immigration officers on both sides make their own determinations, and a booked round trip does not guarantee the outcome you're hoping for.",
        ],
      },
    ],
    vehicles: ["sedan", "suv", "van"],
    minPriceBhd: 45,
    faqs: [
      {
        question: "How long does a visa U-turn trip take in total?",
        answer:
          "Typically three to five hours round trip, depending on how much time you spend on the Saudi side and how busy all four checkpoints are at the time you travel.",
      },
      {
        question: "Do you guarantee I'll be allowed back into Bahrain?",
        answer:
          "No — entry and re-entry decisions are made entirely by immigration officers at each checkpoint. We provide the transport; we don't influence, guarantee, or advise on the immigration outcome.",
      },
      {
        question: "Can I be dropped off in Saudi Arabia for a few hours instead of turning around immediately?",
        answer:
          "Yes, tell us your rough plan on WhatsApp when you book so waiting time or a later pickup can be quoted properly rather than assumed.",
      },
      {
        question: "Is this legal and something people commonly do?",
        answer:
          "We simply provide licensed transport for a border crossing that is available to anyone with valid documents. Whether a U-turn suits your specific visa or residency situation is a question for your own research or an immigration professional, not something we advise on.",
      },
      {
        question: "What vehicle is best for this trip?",
        answer:
          "A sedan is enough for one to three passengers. Groups doing this together typically use the SUV or van rather than booking separate trips.",
      },
      {
        question: "Can I book this for very early morning to avoid queues?",
        answer:
          "Yes, we run this service 24 hours a day, and early morning or late night crossings often see shorter queues at all four checkpoints than peak daytime hours.",
      },
    ],
    related: ["king-fahd-causeway-taxi", "taxi-bahrain-to-khobar", "airport-transfers"],
  },
  {
    slug: "airport-transfers",
    name: "Airport Transfers",
    primaryKeyword: "airport transfer Bahrain Dammam",
    metaTitle: "Airport Transfers | Bahrain (BAH) & Dammam (DMM) via Causeway",
    metaDescription:
      "Cross-border airport transfers between Bahrain (BAH) and Dammam (DMM) via the King Fahd Causeway. Flight tracking, fixed fare, meet-and-greet. Book on WhatsApp.",
    intro: [
      "Our airport transfer service covers both Bahrain International Airport (BAH) and King Fahd International Airport in Dammam (DMM), for passengers arriving at one and heading to the other side of the causeway, or connecting straight through either airport without stopping in the country they land in.",
      "Every airport pickup includes flight tracking, so a delayed or early landing adjusts your driver's arrival rather than leaving you waiting or the driver sitting idle. Fixed fare, tolls included, one driver from the terminal to your final address.",
    ],
    sections: [
      {
        heading: "Which Transfer Do You Need?",
        paragraphs: [
          "If you're flying into Bahrain and heading to Dammam, or flying into Dammam and heading to Bahrain, use the dedicated route pages for those directions — they build the exact flight-to-address journey into one page with fares and timing specific to that leg.",
          "If you're departing from Bahrain to Dammam Airport, or departing from Dammam to Bahrain Airport, those directions also have their own pages with departure-focused timing advice rather than arrivals tracking.",
        ],
      },
      {
        heading: "Meet-and-Greet at Arrivals",
        paragraphs: [
          "For arrivals, your driver waits in the arrivals hall with a name board and tracks your flight number so the timing adjusts automatically for early or delayed landings. Once you're through immigration and baggage claim, we load up and head straight for the causeway or your final address.",
          "For departures, we work backwards from your stated flight time, building in extra buffer for border traffic on days and times that tend to run busier, such as Thursday evenings, Friday mornings, and public holidays.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: flight tracking (for arrivals), the vehicle and driver for the full trip, fuel, the causeway toll where the transfer crosses the border, and standard waiting time at immigration posts.",
          "Not included: your flight ticket, airport-side fees, and any visa or entry permit your nationality requires for the country you're entering. We do not guarantee flight connections — traffic and border conditions are outside our control, which is why we build timing buffers into every transfer rather than promising an exact arrival time.",
        ],
      },
    ],
    vehicles: ["sedan", "suv", "van", "luxury"],
    minPriceBhd: 27,
    faqs: [
      {
        question: "Do you track flights for both airports?",
        answer:
          "Yes, for arrivals at either BAH or DMM we track your flight number and adjust the driver's arrival time to match, rather than a fixed clock time.",
      },
      {
        question: "Can I book a connecting transfer without stopping in the country I land in?",
        answer:
          "Yes — see the Bahrain Airport to Dammam and Dammam Airport to Bahrain route pages for connecting passengers who continue straight through rather than stopping.",
      },
      {
        question: "What vehicle suits a family with a lot of luggage?",
        answer:
          "The SUV or van, both of which carry more luggage than a sedan and, in the van's case, seat up to seven passengers in one vehicle.",
      },
      {
        question: "How far ahead should I book an airport transfer?",
        answer:
          "As soon as your flight is confirmed is best, particularly for early-morning departures or travel around weekend peak periods, though same-day booking is usually possible too.",
      },
      {
        question: "Is a luxury vehicle available for executive airport pickups?",
        answer:
          "Yes, the Mercedes S-Class is available for airport transfers where a higher standard of vehicle is wanted for the arrival or departure leg.",
      },
    ],
    related: [
      "bahrain-to-dammam-airport-taxi",
      "dammam-airport-to-bahrain-taxi",
      "vip-luxury-transfer",
    ],
  },
  {
    slug: "hourly-chauffeur-hire",
    name: "Hourly Chauffeur Hire",
    primaryKeyword: "hourly chauffeur hire Bahrain",
    metaTitle: "Hourly Chauffeur Hire | Bahrain & Eastern Province",
    metaDescription:
      "Book a chauffeur and vehicle by the hour in Bahrain or Saudi Arabia's Eastern Province. Same driver, multiple stops, flexible schedule. Get a quote on WhatsApp.",
    intro: [
      "Hourly chauffeur hire keeps the same driver and vehicle with you for a set block of time rather than a single point-to-point transfer, which suits sightseeing, multiple business meetings, or a day with several stops on either side of the causeway.",
      "You set the schedule — we provide the vehicle, driver, and fuel for the agreed hours, with waiting time between stops built into the booking rather than charged separately.",
    ],
    sections: [
      {
        heading: "When Hourly Hire Makes Sense",
        paragraphs: [
          "If your day involves several stops — a few meetings around Dammam or Khobar, a family visiting relatives across more than one address, or a day exploring the Al Ahsa oasis — hourly hire is usually more practical than booking a series of separate transfers, since the same driver waits with you between stops.",
          "It's also common for visiting executives who want a vehicle on standby for an unpredictable schedule rather than fixed pickup times decided in advance.",
        ],
      },
      {
        heading: "How Booking Works",
        paragraphs: [
          "Tell us the date, the block of hours you need, your first pickup point, and roughly how many stops you expect, and we'll quote a fare based on that. If the day runs longer than planned, extra time is billed at the same hourly rate rather than a surprise charge.",
          "This service can be booked entirely within Bahrain, entirely within the Eastern Province, or across the causeway — the vehicle and driver stay with you regardless of which side of the border your stops are on, with the usual causeway toll and immigration process applying if you cross.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the vehicle and driver for the agreed hours, fuel, waiting time between stops, and the causeway toll if your day includes a border crossing.",
          "Not included: any Saudi or Bahrain entry visa or permit your nationality requires if your day crosses the causeway, and any purchases, entry tickets, or fees at the places you visit.",
        ],
      },
    ],
    vehicles: ["sedan", "suv", "van", "luxury"],
    minPriceBhd: 25,
    faqs: [
      {
        question: "What's the minimum booking for hourly hire?",
        answer:
          "Tell us your planned day on WhatsApp and we'll confirm a minimum block and fare — it varies by how many hours and stops you have in mind.",
      },
      {
        question: "Can the driver wait while I'm in a meeting or visiting a family member?",
        answer:
          "Yes, waiting time between stops is part of what hourly hire covers, rather than something charged separately on top.",
      },
      {
        question: "Can I use this to cross the causeway for a day trip?",
        answer:
          "Yes, the vehicle and driver stay with you whether your stops are in Bahrain, the Eastern Province, or both — the usual border process applies wherever the day includes a crossing.",
      },
      {
        question: "What if my day runs longer than booked?",
        answer:
          "Extra time is charged at the same hourly rate, so there's no surprise fee if a meeting overruns or you decide to add another stop.",
      },
      {
        question: "Which vehicle is best for a multi-stop business day?",
        answer:
          "The sedan or luxury Mercedes S-Class suit most executive schedules; the SUV or van are better if you're moving materials or a larger group between stops.",
      },
    ],
    related: ["corporate-accounts", "vip-luxury-transfer", "taxi-bahrain-to-al-ahsa-hofuf"],
  },
  {
    slug: "corporate-accounts",
    name: "Corporate Accounts",
    primaryKeyword: "corporate taxi account Bahrain",
    metaTitle: "Corporate Accounts | Recurring Cross-Border Staff Transport",
    metaDescription:
      "Set up a corporate account for recurring Bahrain–Saudi Arabia staff transport. Consolidated billing, multiple staff, shift-rotation scheduling. Contact us on WhatsApp.",
    intro: [
      "A corporate account consolidates recurring cross-border transport for your staff under a single arrangement, rather than each employee booking and paying individually. It's built for companies with regular rotation, commuting, or business-travel patterns between Bahrain and the Eastern Province.",
      "We handle the day-to-day scheduling once your recurring pattern is set up, and provide consolidated billing so your finance team deals with one account rather than reconciling dozens of individual trips.",
    ],
    sections: [
      {
        heading: "Who This Is For",
        paragraphs: [
          "Companies with staff on fixed shift rotations between Bahrain and Eastern Province facilities — refineries, terminals, industrial sites — are the most common users of this service, particularly on the Jubail, Ras Tanura, and Abqaiq routes where rotation-based travel is the norm rather than the exception.",
          "It also suits companies that regularly send staff to meetings, site visits, or airport connections across the causeway and want predictable, pre-arranged transport rather than booking each trip separately through WhatsApp.",
        ],
      },
      {
        heading: "How a Corporate Account Works",
        paragraphs: [
          "Share your typical staff numbers, routes, and rotation or travel patterns with us, and we'll set up a recurring schedule and a standing rate structure for your most common routes and vehicle classes. Day-to-day trip requests can then come from a nominated coordinator rather than each traveller booking separately.",
          "Billing is consolidated on whatever cycle suits your company — monthly is most common — with a clear breakdown by employee, route, and date rather than a single lump sum.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the same fixed-fare structure as our standard routes, applied consistently across your account, plus a single point of contact for scheduling and billing rather than treating each trip as new.",
          "Not included: any visa, work permit, or Iqama-linked documentation your staff individually require — that remains between your company, your staff, and the relevant authorities. We handle transport, not immigration or employment paperwork.",
        ],
      },
    ],
    vehicles: ["sedan", "suv", "van", "bus"],
    minPriceBhd: 22,
    faqs: [
      {
        question: "How many staff do we need to set up a corporate account?",
        answer:
          "There's no fixed minimum — message us your typical numbers and routes on WhatsApp and we'll confirm whether a standing account or simple recurring bookings suit you better.",
      },
      {
        question: "Can billing be split by department or project?",
        answer:
          "Yes, tell us how you'd like the billing broken down when we set up the account and we'll structure the monthly statement accordingly.",
      },
      {
        question: "Do you handle staff transport for a full bus-load of people?",
        answer:
          "Yes, our 30-seat coaster is available for corporate group transport in addition to sedans, SUVs, and vans for smaller groups.",
      },
      {
        question: "Can we add or remove routes from our account later?",
        answer:
          "Yes, corporate accounts are set up around your current needs but can be adjusted as your staff transport patterns change.",
      },
      {
        question: "Who do our staff contact to book a trip day-to-day?",
        answer:
          "Whichever coordinator or contact you nominate when the account is set up — trips can be requested by that person rather than each employee booking separately, if that's how you prefer to manage it.",
      },
    ],
    related: ["taxi-bahrain-to-jubail", "taxi-bahrain-to-ras-tanura", "hourly-chauffeur-hire"],
  },
  {
    slug: "family-van-transfer",
    name: "Family Van Transfer",
    primaryKeyword: "family van transfer Bahrain Saudi Arabia",
    metaTitle: "Family Van Transfer | Bahrain to Saudi Arabia, Up to 7 Passengers",
    metaDescription:
      "Book a family van for cross-border transfers between Bahrain and Saudi Arabia. Up to 7 passengers, 6 large bags, one fixed fare. Get a quote on WhatsApp.",
    intro: [
      "Our family van transfer keeps a group of up to seven passengers together in one vehicle rather than splitting across two cars, with room for up to six large suitcases as well as car seats, strollers, and the extra bags a family trip usually brings.",
      "It's available on every route we run, from the standard Bahrain–Dammam corridor to family visits further along the coast or inland to Al Ahsa, at one fixed fare for the whole group.",
    ],
    sections: [
      {
        heading: "Why Families Choose the Van",
        paragraphs: [
          "Splitting a family across two sedans usually costs more overall and means arriving separately at the border and at your destination. The van keeps everyone together for the whole trip, including through both immigration posts, and carries considerably more luggage than a sedan or even an SUV.",
          "It's a common choice for extended family visits to Al Ahsa or Qatif, for larger families doing the standard Bahrain–Dammam run, and for groups combining a family trip with a shopping visit to Khobar.",
        ],
      },
      {
        heading: "Car Seats and Special Requirements",
        paragraphs: [
          "If you need a child car seat, a wheelchair-accessible vehicle instead, or any other specific accommodation, mention it on WhatsApp when you book — for wheelchair accessibility specifically, see our dedicated wheelchair accessible transfer service, which uses a different vehicle specification.",
        ],
      },
      {
        heading: "Booking a Family Van",
        paragraphs: [
          "Tell us your route, passenger count, and luggage needs on WhatsApp, and we'll confirm the fixed fare for your specific trip. The same fare structure applies whether you're doing the standard Bahrain–Dammam run or a longer family visit further along the corridor.",
        ],
      },
    ],
    vehicles: ["van"],
    minPriceBhd: 42,
    faqs: [
      {
        question: "How many passengers and bags does the van hold?",
        answer:
          "Up to seven passengers and six large suitcases, along with hand luggage — enough for most families without needing a second vehicle.",
      },
      {
        question: "Can you provide a child car seat?",
        answer:
          "Mention your requirement on WhatsApp when you book so it can be arranged and confirmed ahead of the pickup.",
      },
      {
        question: "Is the van available on every route, or just Bahrain to Dammam?",
        answer:
          "It's available on every route we run, including the longer trips to Al Ahsa, Riyadh, and the industrial towns further along the coast.",
      },
      {
        question: "Is the van a good option for a wheelchair user?",
        answer:
          "For wheelchair-specific needs, use our dedicated wheelchair accessible transfer service instead, which uses a vehicle built for that purpose rather than the standard family van.",
      },
      {
        question: "Is the fare per person or for the whole van?",
        answer:
          "The fare is for the whole vehicle, not per passenger, which is part of why the van works out efficiently for a full family group compared with splitting across two sedans.",
      },
    ],
    related: [
      "taxi-bahrain-to-al-ahsa-hofuf",
      "wheelchair-accessible-transfer",
      "taxi-bahrain-to-dammam",
    ],
  },
  {
    slug: "vip-luxury-transfer",
    name: "VIP Luxury Transfer",
    primaryKeyword: "VIP luxury transfer Bahrain Saudi Arabia",
    metaTitle: "VIP Luxury Transfer | Mercedes S-Class, Bahrain & Saudi Arabia",
    metaDescription:
      "Executive Mercedes S-Class transfers between Bahrain and Saudi Arabia via the King Fahd Causeway. VIP meet-and-greet, fixed fare. Book on WhatsApp.",
    intro: [
      "Our VIP luxury transfer uses a Mercedes S-Class chauffeur vehicle for executive travel, VIP airport arrivals, and any trip where the standard of the vehicle itself matters as much as getting from one address to another.",
      "It's available on every corridor route, from the standard Bahrain–Dammam run through to the Riyadh long-haul, with the same fixed-fare, tolls-included pricing as our other vehicle classes.",
    ],
    sections: [
      {
        heading: "Who This Is For",
        paragraphs: [
          "Executives travelling for client meetings, VIP guests being collected from either airport, and anyone who wants a higher standard of vehicle and driver presentation for a specific occasion all use this service. It combines with any of our routes or with hourly chauffeur hire for a multi-stop day.",
        ],
      },
      {
        heading: "What Comes With a VIP Transfer",
        paragraphs: [
          "The Mercedes S-Class seats one to three passengers with two large suitcases, and the driver assigned to VIP transfers is briefed for a higher standard of presentation and punctuality than a standard corridor run. For airport pickups, this includes name-board meet-and-greet and flight tracking as standard.",
          "Beyond the vehicle itself, the process is the same as any other route: fixed fare confirmed on WhatsApp before travel, causeway toll included, and the same driver from pickup to final drop-off with no changeover at the border.",
        ],
      },
      {
        heading: "Booking a VIP Transfer",
        paragraphs: [
          "Tell us your route, whether it's a single transfer or a multi-stop day, and any specific requirements — a particular pickup time, a client meeting to time around, or an airport arrival to track — and we'll confirm the vehicle and fare accordingly.",
        ],
      },
    ],
    vehicles: ["luxury"],
    minPriceBhd: 55,
    faqs: [
      {
        question: "Is the Mercedes S-Class available on every route?",
        answer:
          "Yes, it's available as a vehicle option on every corridor route we run, from the standard Bahrain–Dammam trip to the longer routes further along the coast or inland.",
      },
      {
        question: "Can I book VIP transfer for an airport meet-and-greet?",
        answer:
          "Yes, VIP airport pickups include name-board meet-and-greet and flight tracking as standard, the same as our regular airport transfer service but with the luxury vehicle.",
      },
      {
        question: "Can I combine this with hourly chauffeur hire for a full day?",
        answer:
          "Yes, the Mercedes S-Class is available for hourly hire as well as point-to-point transfers — tell us your plan on WhatsApp and we'll quote accordingly.",
      },
      {
        question: "How many passengers can travel in the S-Class?",
        answer:
          "Up to three passengers with two large suitcases — for larger groups wanting a higher standard of vehicle, ask about combining multiple luxury vehicles for the same trip.",
      },
    ],
    related: ["hourly-chauffeur-hire", "airport-transfers", "corporate-accounts"],
  },
  {
    slug: "wheelchair-accessible-transfer",
    name: "Wheelchair Accessible Transfer",
    primaryKeyword: "wheelchair accessible taxi Bahrain Saudi Arabia",
    metaTitle: "Wheelchair Accessible Transfer | Bahrain–Saudi Arabia Causeway",
    metaDescription:
      "Wheelchair accessible cross-border transfer between Bahrain and Saudi Arabia via the King Fahd Causeway. Fixed fare, advance booking required. Contact us on WhatsApp.",
    intro: [
      "We offer wheelchair accessible transfers across the King Fahd Causeway for passengers who need a vehicle equipped for wheelchair access rather than a standard sedan, SUV, or van.",
      "Because this vehicle type is more limited in availability than our standard fleet, we ask for advance notice wherever possible so the right vehicle can be confirmed for your specific date and route.",
    ],
    sections: [
      {
        heading: "How to Book",
        paragraphs: [
          "Message us on WhatsApp with your route, travel date, and the type of wheelchair or mobility equipment involved (manual or powered, folding or fixed), so we can confirm the right vehicle and any assistance needed at pickup, drop-off, and the immigration posts.",
          "Advance booking is strongly recommended — ideally at least a day ahead — since accessible vehicles are a smaller part of our fleet than standard sedans and SUVs.",
        ],
      },
      {
        heading: "What to Expect at the Border",
        paragraphs: [
          "The immigration process itself is the same as any other crossing — each passenger presents their own documents at both posts — but let us know in advance if you'll need extra time or assistance getting through the checkpoints so we can plan the schedule with a realistic buffer rather than the standard timing estimate.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the accessible vehicle and driver for the full trip, fuel, the causeway toll, and driver assistance loading and unloading mobility equipment.",
          "Not included: any Saudi or Bahrain entry visa or permit your nationality requires, and specialised medical equipment or personnel beyond standard driver assistance — for passengers with more complex medical needs, tell us in advance so we can advise what's realistic for us to accommodate.",
        ],
      },
    ],
    vehicles: ["van"],
    minPriceBhd: 45,
    faqs: [
      {
        question: "How far in advance should I book a wheelchair accessible vehicle?",
        answer:
          "At least a day ahead where possible — accessible vehicles are a smaller part of our fleet than standard cars, so advance notice helps us confirm the right vehicle for your date and route.",
      },
      {
        question: "Can the driver help at the immigration posts?",
        answer:
          "Yes, drivers assist with mobility equipment and luggage at each stop, though each passenger still presents their own documents at the counter, as with any crossing.",
      },
      {
        question: "Do you accommodate both manual and powered wheelchairs?",
        answer:
          "Tell us which type you use when you book, since vehicle suitability can differ — we'll confirm what's available for your specific equipment.",
      },
      {
        question: "Is this available on every route?",
        answer:
          "It can be arranged for any of our routes with sufficient advance notice — message us your route and date on WhatsApp to confirm availability.",
      },
      {
        question: "Can family members travel in the same vehicle?",
        answer:
          "Yes, the accessible vehicle has room for accompanying family members alongside the wheelchair user — tell us the total passenger count when you book.",
      },
    ],
    related: ["family-van-transfer", "taxi-bahrain-to-dammam", "corporate-accounts"],
  },
];

export function getService(slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
