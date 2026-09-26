import type { VehicleClass } from "@/content/fares";

/**
 * Copy for the hand-built English Bahrain → Jubail page
 * (app/[locale]/taxi-bahrain-to-jubail). Unlike the other route pages this
 * one is not rendered by RoutePageTemplate — it has its own section order and
 * components under components/jubail/. Distance, duration, border time and
 * fares are NOT repeated here: the page reads them from content/routes.ts and
 * content/fares.ts so they can never drift from the rest of the site.
 *
 * The Arabic page (/ar/taxi-bahrain-to-jubail/) still renders from
 * routes.ar.ts through the shared template.
 */

export type JubailPoint = { title: string; body: string };

export type JubailStage = { title: string; meta: string; body: string };

export type JubailZone = { name: string; tag: string; body: string };

export type JubailTraveller = { who: string; use: string; body: string };

export type JubailFaq = { question: string; answer: string };

export const JUBAIL_META = {
  title: "Bahrain to Jubail Taxi | Private Door-to-Door Transfer",
  description:
    "Private taxi from Bahrain to Jubail via the King Fahd Causeway. One car and driver door-to-door, about 2–2.5 hours, from BHD 70 with the toll included. Get your fare on WhatsApp.",
};

export const JUBAIL_HERO = {
  eyebrow: "Bahrain → Jubail · Private transfer",
  heading: "Private taxi from Bahrain to Jubail",
  lede: "Door-to-door transport from anywhere in Bahrain to Jubail for site visits, shift changes, hotel check-ins and family trips. One car and one driver across the King Fahd Causeway, at a fixed fare agreed before you leave.",
};

export const JUBAIL_LONG_TRIP = {
  eyebrow: "Why go private",
  heading: "Built for the long trip across two countries",
  intro:
    "Jubail is well beyond Dammam, at the top of the Eastern Province coast. Once you add both border posts, it's a proper journey, and the easiest way to make it is in one car that doesn't stop until you arrive.",
  points: [
    {
      title: "One booking",
      body: "Your Bahrain pickup, both border posts, the causeway and the drive north are one trip at one fare. There's nothing to rebook on the Saudi side.",
    },
    {
      title: "One vehicle",
      body: "You don't need a taxi at the border or a second car from Dammam. Your bags stay in the boot from your door to your Jubail destination.",
    },
    {
      title: "Your schedule",
      body: "Leave when your meeting, shift or check-in needs you to, including before dawn. We run 24 hours a day at the same fares.",
    },
  ] satisfies JubailPoint[],
};

export const JUBAIL_JOURNEY = {
  eyebrow: "The journey",
  heading: "What the drive to Jubail looks like",
  stages: [
    {
      title: "Pickup in Bahrain",
      meta: "Hotel, home, office or BAH arrivals",
      body: "Your driver collects you from the exact address you sent. That can be anywhere on the island: Manama, Juffair, Seef, Amwaj, Riffa and beyond.",
    },
    {
      title: "King Fahd Causeway",
      meta: "~25 km bridge · 20–30 min",
      body: "Bahrain exit formalities, then the drive across the Gulf. The causeway toll is already in your fare.",
    },
    {
      title: "Saudi border formalities",
      meta: "{border} normally, longer at peak times",
      body: "Each passenger completes their own entry formalities. Standard waiting time here is included, so a slow queue doesn't change your fare.",
    },
    {
      title: "North on the coastal highway",
      meta: "Roughly 1–1.5 hrs beyond the Dammam run",
      body: "Past Dammam and Qatif on the highway north. This leg is what makes Jubail a longer trip than the standard corridor.",
    },
    {
      title: "Your Jubail destination",
      meta: "Gate, hotel entrance or front door",
      body: "The driver takes you straight to the point you gave us, not a city-centre drop-off.",
    },
  ] satisfies JubailStage[],
  note: "Border times vary, especially on Thursday evenings, Friday mornings and public holidays. Passengers are responsible for their own passports, visas and entry requirements.",
};

export const JUBAIL_ZONES = {
  eyebrow: "Drop-off points",
  heading: "Where in Jubail are you going?",
  intro:
    "Jubail isn't one address. It's an old town, a large industrial city run by the Royal Commission, and the residential districts built around it. Here's how we handle each.",
  zones: [
    {
      name: "Jubail Industrial City",
      tag: "Royal Commission area",
      body: "Plants, contractor offices and business parks. We drop you at the gate or reception you name. You or your host company arrange site passes and security clearance.",
    },
    {
      name: "Royal Commission residential districts",
      tag: "Al Fanateer · Al Deffi · Jalmudah and others",
      body: "Housing districts where many industrial staff and their families live. Send the district plus the street or compound name.",
    },
    {
      name: "Jubail city (Al Balad)",
      tag: "The older town, to the south",
      body: "Homes, shops and the waterfront in the original town. It's the same fare as the industrial city. Just give us the address.",
    },
    {
      name: "Jubail II and newer industrial zones",
      tag: "Further north",
      body: "The expansion areas sit further out. Send the exact gate, plot or pin so the driver goes straight there.",
    },
    {
      name: "Hotels",
      tag: "For site visits and project stints",
      body: "Give us the hotel name and we'll drop you at the entrance, ready for check-in.",
    },
    {
      name: "Port areas",
      tag: "Restricted zones",
      body: "We can take you to the public gate or office you name. Going further in needs your own authorisation.",
    },
  ] satisfies JubailZone[],
  footnote:
    "Not sure where your destination falls? Send us a location pin or the company address and we'll confirm the drop-off point and fare.",
};

export const JUBAIL_TRAVELLERS = {
  eyebrow: "Who books this trip",
  heading: "Who travels from Bahrain to Jubail with us",
  items: [
    {
      who: "Business travellers",
      use: "Meetings, audits and site visits",
      body: "Leave Bahrain early, reach the gate in time for a morning start and ride back the same evening. Book the luxury sedan if you want to work or take calls on the way.",
    },
    {
      who: "Industrial workers & contractors",
      use: "Shift changes and rotations",
      body: "If you cross on the same days every rotation, send us the pattern once. We'll line up pickups at both ends so you aren't rebooking every cycle.",
    },
    {
      who: "Families",
      use: "Visits, moves and weekends",
      body: "Everyone travels together in one private vehicle, with room for the luggage a visit or a move actually needs. The van takes seven people and six large bags.",
    },
    {
      who: "Airport arrivals",
      use: "Landing at Bahrain International",
      body: "Your driver meets you in BAH arrivals, tracks your flight and drives you straight to Jubail. For other airport connections, send your flight details and we'll confirm what works.",
    },
    {
      who: "Crews and project teams",
      use: "Moving a group at once",
      body: "Up to seven people fit in one van. Larger teams can go in several vehicles, or in our 30-seat coaster through a corporate account.",
    },
  ] satisfies JubailTraveller[],
};

/** Why each class suits a 2+ hour Jubail run. Names/capacity/fares come from fleet.ts + fares.ts. */
export const JUBAIL_VEHICLE_FIT: Record<Exclude<VehicleClass, "bus">, string> = {
  sedan: "Enough for one to three people with normal luggage. This is the usual choice for a solo site visit or a couple.",
  suv: "It seats the same number as a sedan, but a third large bag fits and there's more legroom for two hours. It's worth it for longer stays or rotation kit.",
  van: "Seven seats and six large bags keep a family or a small crew in one vehicle through both border posts.",
  luxury: "An executive cabin for senior staff and visiting clients who need to arrive fresh for a meeting.",
};

export const JUBAIL_VEHICLES = {
  eyebrow: "Vehicles",
  heading: "Choose your vehicle for the journey",
  intro:
    "Over two hours, space matters more than it does on a short hop. Pick by how many people and bags are travelling.",
};

export const JUBAIL_PRICING = {
  eyebrow: "Pricing",
  lead: "That's the starting one-way fare in a sedan. We confirm your exact fixed fare on WhatsApp before you travel, and that's what you pay. There's no meter and no night or weekend surcharge.",
  included: [
    "Vehicle, driver and fuel for the whole trip",
    "King Fahd Causeway toll",
    "Standard waiting time at both border posts",
  ],
  dependsOn: [
    "Your exact pickup point in Bahrain",
    "Your exact destination in Jubail",
    "The vehicle you choose",
    "One-way or return, and any waiting time in Jubail",
  ],
};

export const JUBAIL_CORPORATE = {
  eyebrow: "For companies",
  heading: "Moving staff between Bahrain and Jubail regularly?",
  body: "A lot of Bahrain–Jubail travel is work travel: engineers on rotation, contractors starting a project, visitors heading to site. A corporate account puts all of it under one arrangement.",
  points: [
    "Recurring pickups planned around your rotation dates",
    "One nominated coordinator books for the whole team",
    "Sedans and vans up to a 30-seat coaster for group moves",
    "Consolidated billing broken down by employee, route and date",
  ],
};

export const JUBAIL_CHECKLIST = {
  eyebrow: "Before you book",
  heading: "Everything we need to quote your Jubail trip",
  send: [
    "Pickup in Bahrain: hotel, address or pin",
    "Destination in Jubail: gate, hotel or address",
    "Travel date and pickup time",
    "Number of passengers",
    "Number of large bags",
    "Preferred vehicle, if you have one",
    "Return trip? Include the return date and time",
  ],
  confirm: [
    "The right vehicle for your group",
    "Your exact, fixed fare",
    "Pickup time and meeting point",
    "Your booking confirmation, in writing, in the chat",
  ],
  template: [
    "Hi, I'd like a fare for a taxi from Bahrain to Jubail.",
    "Pickup in Bahrain: ",
    "Jubail destination: ",
    "Date: ",
    "Pickup time: ",
    "Passengers: ",
    "Large bags: ",
    "Vehicle: ",
    "Return trip (date/time): ",
  ].join("\n"),
  returnTemplate: [
    "Hi, I'd like a return taxi between Bahrain and Jubail.",
    "Pickup in Bahrain: ",
    "Jubail destination: ",
    "Outbound date & time: ",
    "Return date & time: ",
    "Passengers: ",
    "Vehicle: ",
  ].join("\n"),
  corporateTemplate:
    "Hi, we'd like to discuss recurring staff transport between Bahrain and Jubail.\nCompany: \nTypical number of staff: \nHow often: ",
};

export const JUBAIL_FAQS: JubailFaq[] = [
  {
    question: "How long does a taxi from Bahrain to Jubail take?",
    answer:
      "Usually 2 to 2.5 hours door to door. That includes both border posts, which normally take 15–20 minutes each but can run longer on Thursday evenings, Friday mornings and public holidays. Contact us for a time estimate based on your exact pickup and destination.",
  },
  {
    question: "How much is a private taxi from Bahrain to Jubail?",
    answer: "{fareAnswer}",
  },
  {
    question: "Do I need to change vehicles at the causeway?",
    answer:
      "No. The same car and driver take you from your Bahrain pickup all the way to your Jubail destination, through both border posts.",
  },
  {
    question: "Can you pick me up from my hotel in Bahrain?",
    answer:
      "Yes. We collect from hotels, homes and offices anywhere in Bahrain, and from Bahrain International Airport arrivals.",
  },
  {
    question: "Can you take me directly to Jubail Industrial City?",
    answer:
      "Yes, to the gate, reception or office you name. We provide the transport only. You or your host company need to arrange site passes and security clearance.",
  },
  {
    question: "Can I book an early-morning trip for a site visit?",
    answer:
      "Yes, we run 24 hours a day with no night surcharge. Tell us what time you need to arrive in Jubail and we'll suggest a pickup time that allows for the border.",
  },
  {
    question: "Can I book a return trip?",
    answer:
      "Yes. Send us both legs when you book and we'll confirm the fare for each. If you're coming back the same day, ask us to quote for the driver waiting in Jubail.",
  },
  {
    question: "Can our whole family travel in one vehicle?",
    answer:
      "Usually, yes. The van seats up to seven with six large bags. Tell us how many adults, children and bags you have and we'll suggest the right vehicle.",
  },
  {
    question: "What documents do I need to cross into Saudi Arabia?",
    answer:
      "A valid passport (or GCC national ID where accepted), plus any Saudi visa, work permit or residency documents your situation requires. Each passenger clears immigration themselves. We don't arrange visas or guarantee entry decisions.",
  },
  {
    question: "Can I book recurring trips for employees?",
    answer:
      "Yes. Send us your rotation pattern once and we'll schedule pickups in advance, or set up a corporate account with one coordinator and consolidated billing.",
  },
];
