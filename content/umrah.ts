/**
 * Copy for /bahrain-to-makkah-umrah-taxi/ (components/umrah/). Arabic in
 * umrah.ar.ts with the same shape.
 *
 * Deliberately NOT stated, because nothing in the business data verifies
 * it: a Makkah fare, an exact journey time, flight booking, a guaranteed
 * Jeddah service, child-seat availability, driver religious credentials,
 * or drop-off at the Haram. The page quotes every trip individually and
 * points religious questions (Ihram, Meeqat) to a qualified authority.
 */

export type UmrahMode = "road" | "fly";
export type Item = { title: string; body: string };

export type UmrahCopy = {
  meta: { title: string; description: string; ogLocale: string };
  crumb: string;
  hero: {
    eyebrow: string;
    heading: string;
    sub: string;
    honesty: string;
    primary: string;
    secondary: string;
    secondaryMessage: string;
    facts: string[];
    map: { bahrain: string; riyadh: string; jeddah: string; makkah: string; road: string; flight: string; caption: string };
  };
  modes: {
    eyebrow: string;
    heading: string;
    intro: string;
    bestFor: string;
    plan: string;
    options: Record<UmrahMode, { label: string; title: string; route: string[]; body: string; best: string[]; note: string }>;
  };
  journey: { eyebrow: string; heading: string; steps: Item[]; meeqatNote: string };
  family: {
    eyebrow: string;
    heading: string;
    intro: string;
    rows: { who: string; vehicle: string; note: string; slug?: string }[];
    notes: Item[];
    groupsHeading: string;
    groupsBody: string;
    links: { familyVan: string; vip: string; fleet: string; wheelchair: string };
  };
  planning: { eyebrow: string; heading: string; body: string; tellUsHeading: string; tellUs: string[]; prepareHeading: string; prepare: Item[] };
  border: { eyebrow: string; heading: string; driverHeading: string; driver: string[]; youHeading: string; you: string[]; note: string; causewayLink: string; documentsLink: string };
  dropoff: { eyebrow: string; heading: string; body: string; steps: string[]; ask: string };
  returnTrip: { eyebrow: string; heading: string; options: Item[]; note: string; cta: string; ctaMessage: string };
  price: { eyebrow: string; heading: string; body: string; dependsHeading: string; depends: string[]; included: string; cta: string };
  planner: {
    eyebrow: string;
    heading: string;
    intro: string;
    mode: string;
    pickup: string;
    pickupPlaceholder: string;
    pickupFly: string;
    pickupFlyPlaceholder: string;
    date: string;
    dateFly: string;
    time: string;
    timeFly: string;
    adults: string;
    children: string;
    bags: string;
    hotel: string;
    hotelPlaceholder: string;
    trip: string;
    oneWay: string;
    returnTrip: string;
    returnDate: string;
    vehicle: string;
    vehicleOptions: string[];
    meeqat: string;
    meeqatOptions: string[];
    submit: string;
    confirmHeading: string;
    confirm: string[];
    note: string;
    messageIntro: string;
    notSet: string;
    altLead: string;
    altBooking: string;
    altContact: string;
  };
  faq: { eyebrow: string; heading: string; allFaqs: string; items: { question: string; answer: string }[] };
};

export const UMRAH: UmrahCopy = {
  meta: {
    title: "Bahrain to Makkah Taxi for Umrah | Private Road Transfer",
    description:
      "Private Bahrain to Makkah transfer for Umrah: one vehicle for your family and luggage, planned around the border, rest stops and your Meeqat. Get a quote on WhatsApp.",
    ogLocale: "en_BH",
  },
  crumb: "Bahrain to Makkah Umrah Transfer",
  hero: {
    eyebrow: "Umrah travel · Bahrain → Makkah",
    heading: "Private Bahrain to Makkah Transport for Umrah",
    sub: "Travel privately from Bahrain to Makkah with a vehicle arranged around your family, luggage and journey schedule.",
    honesty:
      "This is a long-distance road journey: well over 1,000 km, and a full day of travel once border time and rest stops are added. We plan it with you before we quote.",
    primary: "Plan my Umrah transfer",
    secondary: "WhatsApp us about Umrah",
    secondaryMessage: "Hi, I'm planning Umrah and would like to travel from Bahrain to Makkah by private car.",
    facts: ["One private vehicle", "Quoted for your trip", "Sedan to 30-seat coaster", "One-way or return"],
    map: {
      bahrain: "Bahrain",
      riyadh: "Riyadh",
      jeddah: "Jeddah",
      makkah: "Makkah",
      road: "By road",
      flight: "Fly + transfer",
      caption: "Simplified map, not to scale.",
    },
  },
  modes: {
    eyebrow: "Two ways to do it",
    heading: "How do you want to travel?",
    intro: "Driving all the way suits some families. Flying and continuing by car suits others. Both are worth considering.",
    bestFor: "Best for",
    plan: "Plan this way",
    options: {
      road: {
        label: "Option A",
        title: "Drive all the way",
        route: ["Bahrain", "Saudi border", "Long road journey", "Makkah"],
        body: "One private vehicle from your door in Bahrain to your accommodation in Makkah. Your bags stay in the car the whole way, and nobody changes vehicles.",
        best: ["Families and groups travelling together", "Plenty of luggage", "Travellers who prefer the road", "Anyone who wants one vehicle, start to finish"],
        note: "The trade-off is time: expect a full day of travel.",
      },
      fly: {
        label: "Option B",
        title: "Fly + private transfer",
        route: ["Bahrain", "Flight to Jeddah", "Private pickup", "Makkah"],
        body: "Fly from Bahrain to Jeddah, then continue to Makkah by private car. Far less time on the road.",
        best: ["Tighter schedules", "Passengers who'd rather not spend a day in a car", "Lighter luggage"],
        note: "We don't book flights. Book yours separately, send us your arrival details, and we'll confirm whether we can arrange the Jeddah → Makkah transfer for your dates.",
      },
    },
  },
  journey: {
    eyebrow: "Your Umrah journey",
    heading: "What the drive looks like, step by step",
    steps: [
      { title: "Bahrain pickup", body: "Your driver collects you from your Bahrain address at the time we agreed." },
      { title: "Bahrain exit", body: "Each passenger completes Bahrain exit formalities at the King Fahd Causeway." },
      { title: "Saudi entry", body: "Saudi immigration and customs, again for each passenger. Timing varies with the queue." },
      { title: "Long-distance journey", body: "Westward across Saudi Arabia, with breaks for prayer, food and fuel along the way." },
      { title: "Meeqat stop", body: "If you need to enter Ihram before Makkah, we plan a stop at the Meeqat you tell us you'll use." },
      { title: "Makkah arrival", body: "Drop-off at the permitted vehicle point closest to your accommodation." },
    ],
    meeqatNote:
      "Please confirm your Ihram and Meeqat requirements with a qualified religious authority. We plan the stop you ask for; our drivers look after the road, not religious guidance.",
  },
  family: {
    eyebrow: "Travelling with family?",
    heading: "Pick the vehicle by passengers and bags",
    intro: "On a trip this long, luggage matters as much as seats. Here's how families usually choose.",
    rows: [
      { who: "2–3 passengers, light luggage", vehicle: "Sedan", note: "Two large suitcases plus hand luggage.", slug: "sedan-camry-sonata" },
      { who: "Up to 4 passengers, more bags", vehicle: "SUV", note: "Room for a third large suitcase and more legroom.", slug: "suv-gmc-tahoe" },
      { who: "5–7 passengers", vehicle: "Family van", note: "Up to seven people and six large suitcases in one vehicle.", slug: "van-hiace-hyundai-h1" },
      { who: "Larger groups", vehicle: "Several vehicles or a coaster", note: "We'll recommend an arrangement for your group size.", slug: "bus-coaster-30-seater" },
    ],
    notes: [
      { title: "Children", body: "Tell us their ages. If you need a child car seat, ask when you book and we'll confirm whether we can provide one." },
      { title: "Elderly passengers", body: "Let us know, and we'll plan the day with more frequent breaks. For wheelchair users we use a different, accessible vehicle." },
    ],
    groupsHeading: "Group Umrah travel",
    groupsBody:
      "Extended families, friends and small groups can travel together: up to seven in one van, or across several vehicles, or in our 30-seat coaster. Send us the group size and luggage, and we'll review it and recommend the vehicle arrangement.",
    links: { familyVan: "Family van transfer", vip: "VIP luxury transfer", fleet: "See the fleet", wheelchair: "Wheelchair accessible transfer" },
  },
  planning: {
    eyebrow: "Before you book",
    heading: "A long journey needs a little more planning",
    body: "Because this is a long road journey, tell us how many bags you're carrying before we quote. A family of six with several suitcases may need a different vehicle than two people travelling light. The same goes for timing: we'll suggest a departure time that gets you to Makkah at a sensible hour.",
    tellUsHeading: "Tell us",
    tellUs: [
      "How many passengers, and how many are children",
      "How many suitcases and bags",
      "Your preferred vehicle, if you have one",
      "Departure date and preferred time",
      "Return date, if you need one",
      "Your Makkah hotel or address",
      "Whether you need a Meeqat stop",
      "Anyone who needs extra breaks",
    ],
    prepareHeading: "What to have ready",
    prepare: [
      { title: "Travel documents", body: "Passports and any Saudi entry documents, for every passenger." },
      { title: "Luggage count", body: "So we assign a vehicle that actually fits everything." },
      { title: "Ihram", body: "Please arrange your own Ihram requirements before you travel." },
      { title: "Medication", body: "Carry any personal medication in your hand luggage." },
      { title: "Phone", body: "Keep it charged for the border and for reaching your driver." },
      { title: "Hotel details", body: "Your Makkah accommodation name and location, ready to share." },
    ],
  },
  border: {
    eyebrow: "At the border",
    heading: "Who handles what at the Saudi border",
    driverHeading: "Your driver",
    driver: ["Drives the vehicle through both border posts", "Handles the vehicle's own paperwork and the causeway toll", "Waits with you while you're processed"],
    youHeading: "You and your passengers",
    you: [
      "Carry a valid passport and the Saudi entry documents each passenger needs",
      "Complete immigration yourselves: officers deal with each passenger",
      "Keep documents where you can reach them, not packed in a suitcase",
    ],
    note: "Entry decisions are made by the authorities, and processing time varies, especially on weekends and public holidays.",
    causewayLink: "How the King Fahd Causeway crossing works",
    documentsLink: "Documents for crossing into Saudi Arabia by road",
  },
  dropoff: {
    eyebrow: "Arriving in Makkah",
    heading: "Where can we drop you in Makkah?",
    body: "Vehicle access around the Grand Mosque is restricted and can change with local traffic controls and regulations, so we can't promise drop-off at the Haram itself.",
    steps: ["Your hotel or accommodation", "Nearest permitted vehicle access point", "A short walk to your destination, if needed"],
    ask: "Send us your hotel name and exact location when you book so we can confirm the right drop-off point.",
  },
  returnTrip: {
    eyebrow: "Coming home",
    heading: "Your return journey",
    options: [
      { title: "Book both legs together", body: "Bahrain → Makkah and Makkah → Bahrain in one booking. Tell us your return date and where to collect you in Makkah." },
      { title: "Arrange the return later", body: "Message us once your dates are settled. Availability and the fare are confirmed for the date you request." },
    ],
    note: "The return may be with a different driver and vehicle. We confirm the details for each leg.",
    cta: "Request a return quote",
    ctaMessage: "Hi, I'd like a quote for a return Umrah trip: Bahrain → Makkah → Bahrain.\nOutbound date: \nReturn date: \nPassengers: \nBags: ",
  },
  price: {
    eyebrow: "Price",
    heading: "Every Umrah journey is quoted individually",
    body: "We don't publish a fixed Makkah fare, because these trips vary too much for one number to be honest.",
    dependsHeading: "Your quote depends on",
    depends: [
      "Your pickup location in Bahrain",
      "Number of passengers",
      "Luggage",
      "The vehicle",
      "Travel date",
      "One-way or return",
      "Road transfer or Jeddah → Makkah transfer",
      "Any agreed stops",
    ],
    included: "Your quote states exactly what's included before you confirm anything.",
    cta: "Request my Umrah quote",
  },
  planner: {
    eyebrow: "Plan your transfer",
    heading: "Send us your Umrah details",
    intro: "Fill in what you know. Anything you leave blank, we'll ask about in the chat.",
    mode: "How are you travelling?",
    pickup: "Bahrain pickup location",
    pickupPlaceholder: "Area, building or hotel",
    pickupFly: "Your flight into Jeddah",
    pickupFlyPlaceholder: "Airline and flight number",
    date: "Travel date",
    dateFly: "Arrival date in Jeddah",
    time: "Preferred departure time",
    timeFly: "Landing time",
    adults: "Adults",
    children: "Children",
    bags: "Luggage pieces",
    hotel: "Makkah hotel or accommodation",
    hotelPlaceholder: "Hotel name or address",
    trip: "Journey",
    oneWay: "One-way",
    returnTrip: "Return",
    returnDate: "Return date",
    vehicle: "Preferred vehicle",
    vehicleOptions: ["Not sure, please recommend", "Sedan", "SUV", "Family van", "Several vehicles / coaster"],
    meeqat: "Meeqat stop needed?",
    meeqatOptions: ["Yes", "No", "Not sure yet"],
    submit: "WhatsApp my Umrah details",
    confirmHeading: "We'll confirm",
    confirm: ["Vehicle", "Route", "Fare", "Pickup time", "Drop-off arrangement"],
    note: "Opens WhatsApp with your details filled in. Nothing is booked until you confirm.",
    messageIntro: "Hi, I'd like a quote for an Umrah transfer from Bahrain to Makkah.",
    notSet: "to confirm",
    altLead: "Prefer another way?",
    altBooking: "Booking form",
    altContact: "Contact us",
  },
  faq: {
    eyebrow: "Questions",
    heading: "Umrah transfer questions",
    allFaqs: "All FAQs",
    items: [
      {
        question: "Can I travel from Bahrain to Makkah by private car?",
        answer: "Yes. We arrange a private vehicle from your Bahrain address to your accommodation in Makkah, crossing into Saudi Arabia at the King Fahd Causeway.",
      },
      {
        question: "How long does the road journey take?",
        answer: "Expect a full day of travel. It's well over 1,000 km by road, plus time at both border posts and rest stops. We'll give you a realistic estimate for your date and departure time when we quote.",
      },
      {
        question: "Can you arrange a private vehicle for my family?",
        answer: "Yes. A family van carries up to seven people with six large suitcases. Tell us how many adults, children and bags you have and we'll recommend the right vehicle.",
      },
      {
        question: "What vehicle should I choose for a lot of luggage?",
        answer: "It depends on passengers and bags together. A sedan takes two large suitcases, an SUV three and a van six. Send us your luggage count before we quote.",
      },
      {
        question: "Can I request a Meeqat stop?",
        answer: "Yes. Tell us which Meeqat you'll use and we'll plan the stop into the journey. Please confirm your Ihram and Meeqat requirements with a qualified religious authority.",
      },
      {
        question: "Can you take me directly to my Makkah hotel?",
        answer: "We take you to the permitted vehicle point closest to your accommodation. Send us your hotel name and location so we can confirm where that is.",
      },
      {
        question: "Can the vehicle go right up to Masjid al-Haram?",
        answer: "No promises there. Vehicle access around the Grand Mosque is restricted and can change with local traffic controls, so drop-off is at the nearest permitted point.",
      },
      {
        question: "Can I book the return journey at the same time?",
        answer: "Yes, you can book both legs together, or arrange the return later. The return fare and availability are confirmed for the date you request.",
      },
      {
        question: "What documents do I need to cross from Bahrain into Saudi Arabia?",
        answer: "A valid passport and any Saudi entry visa or permit your nationality requires, for every passenger. Each passenger completes immigration themselves. We don't arrange visas or guarantee entry decisions.",
      },
      {
        question: "Can I fly to Jeddah and arrange the transfer to Makkah instead?",
        answer: "You can. We don't book flights, so book yours separately, then send us your arrival details and we'll confirm whether we can arrange the Jeddah → Makkah transfer for your dates.",
      },
      {
        question: "Can larger groups travel together?",
        answer: "Yes. Up to seven fit in one van. For bigger groups we can use several vehicles or our 30-seat coaster. Send the group size and luggage and we'll recommend the arrangement.",
      },
    ],
  },
};
