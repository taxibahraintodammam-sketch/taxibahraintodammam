/**
 * /fleet/suv-gmc-tahoe/ — the SUV class page.
 *
 * Facts are limited to what the site already publishes for this class:
 * GMC Yukon or Hyundai Staria VIP depending on availability, 1–4 passengers,
 * 3 large suitcases + hand luggage, available on every corridor route, and
 * the SUV fares in content/fares.ts. No trims, engines, equipment or model
 * years: those aren't confirmed, so they aren't claimed.
 */
export const SUV = {
  meta: {
    title: "GMC Yukon & SUV Taxi Bahrain ↔ Saudi Arabia | Up to 4 Passengers",
    description:
      "Book the SUV class (GMC Yukon or Hyundai Staria VIP) between Bahrain and Saudi Arabia: 1–4 passengers, 3 large suitcases plus hand luggage. Compare SUV vs sedan and get your exact fare.",
    ogLocale: "en_BH",
  },
  crumb: "SUV",
  schemaName: "SUV taxi between Bahrain and Saudi Arabia",

  hero: {
    eyebrow: "Fleet · SUV class",
    heading: "SUV Comfort for the Bahrain–Saudi Journey",
    sub: "Choose the SUV when your trip needs more luggage space, a roomier cabin and a little more breathing room than a standard sedan.",
    primary: "Get My SUV Fare",
    secondary: "WhatsApp the Transport Team",
    secondaryMessage: "Hi, I'd like a fare for the SUV between Bahrain and Saudi Arabia.",
    specs: [
      { value: "1–4", label: "Passengers" },
      { value: "3", label: "Large suitcases" },
      { value: "+", label: "Hand luggage" },
      { value: "BH ↔ SA", label: "Cross-border" },
    ],
    route: ["Bahrain", "King Fahd Causeway", "Saudi Arabia"],
    imageAlt: "A chauffeur loads a suitcase into the boot of a black GMC Yukon outside a hotel entrance",
    imageNote: "GMC Yukon shown. The SUV class is a GMC Yukon or Hyundai Staria VIP, depending on availability.",
  },

  need: {
    eyebrow: "The first question",
    heading: "Not every trip needs an SUV. Some trips clearly do.",
    lead: "If it's one or two of you with a suitcase each, the sedan will do the job and cost less. We'd rather tell you that now than sell you a bigger car you didn't need.",
    body: "The SUV starts to make sense when the luggage, the people or the length of the drive tip the balance. Usually you'll know which side you're on as soon as you look at the pile of bags by the door.",
    triggersHeading: "The SUV earns its place when…",
    triggers: [
      "you have a third large suitcase",
      "the passengers want more room to spread out",
      "you're travelling with children",
      "there's a stroller to fit in",
      "you're carrying golf clubs",
      "you're coming back with shopping bags",
      "the route is a longer one, like Al Ahsa or Riyadh",
      "you simply prefer sitting higher up",
    ],
    sedanHeading: "The sedan is usually enough when…",
    sedan: ["it's 1–3 passengers", "there are two large suitcases or fewer", "it's a straightforward Bahrain–Dammam or Khobar run"],
  },

  compare: {
    eyebrow: "Sedan or SUV?",
    heading: "Tell us who's travelling and what you're carrying",
    intro: "Move the numbers and see which class the published capacities point to. It's a guide, not a booking: the team confirms the vehicle before your trip.",
    passengers: "Passengers",
    bags: "Large suitcases",
    less: "Fewer",
    more: "More",
    presets: [
      { label: "2 passengers + 1 bag", passengers: 2, bags: 1 },
      { label: "2 passengers + 3 bags", passengers: 2, bags: 3 },
      { label: "Family of 4 + 3 bags", passengers: 4, bags: 3 },
      { label: "5 passengers", passengers: 5, bags: 4 },
    ],
    presetsLabel: "Common trips",
    classes: {
      sedan: { name: "Sedan", model: "Toyota Camry", passengers: "1–3 passengers", bags: "2 large suitcases", cabin: "Standard cabin", best: "Best for lighter luggage" },
      suv: { name: "SUV", model: "GMC Yukon / Hyundai Staria VIP", passengers: "1–4 passengers", bags: "3 large suitcases + hand luggage", cabin: "More cabin and boot flexibility", best: "Best for families and extra luggage" },
      van: { name: "Van", model: "Hiace / Starex / Sprinter class", passengers: "Up to 7 passengers", bags: "6 large suitcases", cabin: "Whole group in one vehicle", best: "Best for 5–7 people" },
    },
    verdicts: {
      fits: "Usually sufficient",
      better: "More suitable",
      over: "Over published capacity",
      talk: "Message us: this may need two vehicles or a larger one",
    },
    rules: [
      "Choose the SUV when the luggage is the deciding factor.",
      "Choose the sedan when your party is smaller and the luggage is light.",
    ],
    disclaimer: "Based on the published capacities only. Bag sizes vary, so unusual luggage should be mentioned before confirmation.",
  },

  fits: {
    eyebrow: "What fits inside",
    heading: "Three large suitcases. Plus the smaller stuff.",
    body: "The published capacity for the SUV class is three large suitcases plus hand luggage: one more large case than the sedan takes, with the same room for the backpack, handbag and duty-free bag that always seem to appear at the last minute.",
    items: ["Large suitcase", "Large suitcase", "Large suitcase"],
    plus: "Cabin bags & personal items",
    caveat: "Real luggage varies in size and shape. If you're carrying something unusual, a stroller, golf clubs or a lot of shopping, tell the booking team before the trip is confirmed. We'd rather check than promise something that doesn't close.",
    bootLabel: "Boot, illustrated",
  },

  scenarios: {
    eyebrow: "Real trips",
    heading: "Where the SUV earns its place",
    items: [
      {
        key: "01",
        title: "Family airport arrival",
        manifest: ["2 adults", "2 children", "3 suitcases", "Hand luggage"],
        body: "Four people is the sedan's limit plus one, and three checked cases is one more than its boot is published for. After a long flight the last thing anyone wants is a driver rearranging bags on the kerb. The SUV takes the whole family and the luggage in one go.",
      },
      {
        key: "02",
        title: "Weekend in Saudi Arabia",
        manifest: ["Couple or small family", "Weekend bags", "Shopping on the way back"],
        body: "You leave light and come back heavy. It's the return leg that decides it: two small bags on Thursday can become two small bags, a new suitcase and several shopping bags on Saturday. Mention the return when you book so the right car is waiting.",
      },
      {
        key: "03",
        title: "The longer cross-border drive",
        manifest: ["Bahrain → Al Ahsa / Hofuf", "Longer time in the car"],
        body: "On a short hop, legroom is a detail. On a drive that continues well past Dammam after the border, many passengers find the extra space and higher seating worth it: somewhere to put your feet, and bags that aren't sitting on someone's lap.",
      },
      {
        key: "04",
        title: "Golf clubs and special equipment",
        manifest: ["Golf bags", "Sports kit", "Bulky items"],
        body: "Golf bags are one of the most common reasons people pick the SUV. Long or oddly shaped items still need a mention in advance, though: tell us what they are and how many, and we'll confirm whether they fit with everyone's other luggage.",
      },
      {
        key: "05",
        title: "Executive travel",
        manifest: ["1–3 passengers", "Meeting at the other end"],
        body: "Some executives prefer the SUV for the space and the higher ride. If the priority is chauffeur-style presentation for a client or a special occasion, the luxury sedan (Mercedes S-Class or BMW 7 Series) is the alternative. It isn't that one is better; they're built for different trips.",
      },
    ],
  },

  journey: {
    eyebrow: "The causeway run",
    heading: "Built for more than the first 20 minutes",
    body: "This isn't a shuttle to the end of the road. The same car and driver take you from your door, through both immigration posts and across the causeway, to wherever you're going in Saudi Arabia. Whatever space you have at the start is the space you have for the whole journey.",
    stops: [
      { name: "Your Bahrain address", note: "Bags loaded once" },
      { name: "Bahrain immigration", note: "You stay in the vehicle for most of it" },
      { name: "King Fahd Causeway", note: "Across the water" },
      { name: "Saudi immigration", note: "Checks on the Saudi side" },
      { name: "Dammam · Khobar · Jubail · beyond", note: "Unloaded at your door" },
    ],
    note: "Crossing times depend on the day, the queue and the checks, so we don't promise a time for the border itself.",
    links: { causeway: "About the causeway crossing" },
  },

  feel: {
    eyebrow: "On a longer trip",
    heading: "What the SUV feels like once you're moving",
    quote: "After the bags are loaded and the causeway is behind you, the extra room matters more than it did when you first left the hotel.",
    points: [
      { title: "Bags go in the back, not at your feet", body: "With three large cases fitting in the boot, the cabin stays for people, not overflow luggage." },
      { title: "More room to breathe", body: "Four passengers aren't squeezed shoulder to shoulder for the length of the drive." },
      { title: "A higher seat", body: "Some people simply prefer the view and the feeling of sitting up rather than down. That's a perfectly good reason." },
      { title: "Easier loading", body: "A wide rear opening makes getting heavy cases in and out less of a wrestle at the airport kerb and at your door." },
      { title: "Family-friendly", body: "Children, their bags and the stroller can all come along without a negotiation over who holds what." },
    ],
  },

  identity: {
    eyebrow: "The SUV class",
    heading: "One class, two possible vehicles",
    body: "Depending on availability, the SUV category may be a GMC Yukon or a Hyundai Staria VIP. Both are booked on the same published capacity of 1–4 passengers with 3 large suitcases plus hand luggage, so your plan works either way.",
    vehicles: [
      { name: "GMC Yukon", note: "Full-size SUV" },
      { name: "Hyundai Staria VIP", note: "Spacious people-carrier" },
    ],
    tahoe: "You may have found this page by searching for a GMC Tahoe. We don't list a Tahoe in the fleet. If you need a specific vehicle, ask the booking team to confirm exactly which one is assigned before you travel.",
  },

  alternatives: {
    eyebrow: "Other options",
    heading: "When the SUV isn't the right answer",
    van: {
      title: "SUV or van?",
      suv: ["1–4 passengers", "3 large suitcases", "Families and smaller groups"],
      other: ["Up to 7 passengers", "6 large suitcases", "The whole group stays together"],
      otherName: "Van",
      verdict: "If you're 5–7 people, the van is usually the practical choice rather than squeezing a group into two SUVs.",
      slug: "van-hiace-hyundai-h1",
      link: "See the van",
    },
    luxury: {
      title: "SUV or luxury sedan?",
      suv: ["More luggage flexibility", "Higher seating position", "Family-friendly", "Practical on longer drives"],
      other: ["1–3 passengers", "Executive chauffeur experience", "A polished arrival", "Special occasions"],
      otherName: "Luxury sedan",
      verdict: "It comes down to the trip: space and luggage point to the SUV; presentation points to the luxury sedan.",
      slug: "luxury-mercedes-s-class",
      link: "See the luxury sedan",
    },
  },

  airport: {
    eyebrow: "Airport transfers",
    heading: "Why families often choose the SUV at the airport",
    body: "Airport luggage is heavier than everyday travel. Checked suitcases, cabin bags, the children's backpacks and a stroller add up quickly, and you only find out whether they fit when you're standing at the car.",
    items: ["Large suitcases", "Cabin bags", "Children's bags", "Strollers", "Shopping bags"],
    airports: "We collect from Bahrain International Airport and drop off at King Fahd International Airport in Dammam, and the other way round.",
    links: {
      hub: "Airport transfers",
      bahToDmm: "Bahrain Airport → Dammam",
      dmmToBah: "Dammam Airport → Bahrain",
    },
  },

  routes: {
    eyebrow: "Where it goes",
    heading: "Available across the corridor",
    body: "The SUV can be requested on every route we run between Bahrain and Saudi Arabia. The fare depends on how far you're going.",
    stops: [
      { name: "Dammam", slug: "taxi-bahrain-to-dammam" },
      { name: "Khobar", slug: "taxi-bahrain-to-khobar" },
      { name: "Jubail", slug: "taxi-bahrain-to-jubail" },
      { name: "Al Ahsa / Hofuf", slug: "taxi-bahrain-to-al-ahsa-hofuf" },
      { name: "Riyadh", slug: "taxi-bahrain-to-riyadh" },
    ],
    origin: "Bahrain",
    back: "Heading the other way?",
    backLink: "Dammam → Bahrain",
  },

  pricing: {
    eyebrow: "SUV fares",
    heading: "Starting fares for the SUV",
    from: "From",
    rows: [
      { label: "Bahrain → Dammam", slug: "taxi-bahrain-to-dammam" },
      { label: "Bahrain → Khobar", slug: "taxi-bahrain-to-khobar" },
      { label: "Bahrain → Dammam Airport", slug: "bahrain-to-dammam-airport-taxi" },
    ],
    note: "Your exact fare is confirmed against your pickup point, date, destination and vehicle.",
    allFares: "See the full fare table",
    factorsHeading: "What affects the final SUV fare",
    factors: ["Pickup location", "Destination", "Date", "Time", "One-way or return", "Vehicle availability", "Special requirements"],
  },

  prepare: {
    eyebrow: "Before you book",
    heading: "Have these ready and the quote is quick",
    items: [
      "Passenger count",
      "Large suitcases",
      "Cabin bags",
      "Children (and ages)",
      "Stroller, if you have one",
      "Golf or special equipment",
      "Pickup location",
      "Destination",
      "Travel date",
      "Pickup time",
    ],
    note: "Anything out of the ordinary should be mentioned before the booking is confirmed, not at the kerb.",
  },

  booking: {
    eyebrow: "Request",
    heading: "Tell us what you're carrying",
    body: "Fill in what you know and it opens WhatsApp with the message written for you. We'll reply with the available SUV and your exact fare.",
    fields: {
      pickup: "Pickup",
      pickupPlaceholder: "Hotel, area or airport",
      destination: "Destination",
      destinationPlaceholder: "e.g. Khobar, Dammam Airport",
      date: "Date",
      time: "Time",
      passengers: "Passengers",
      bags: "Large suitcases",
      hand: "Hand luggage",
      special: "Special items",
      specialPlaceholder: "Stroller, golf bags, child seat request…",
      vehicle: "Vehicle",
    },
    vehicleValue: "SUV",
    submit: "Get My SUV Fare",
    messageIntro: "Hi, I'd like a fare for the SUV.",
    notSet: "not set",
    orWhatsapp: "Or just message us",
    fullBooking: "Prefer the full booking form?",
  },

  documents: {
    eyebrow: "Crossing the border",
    heading: "Your vehicle can cross the causeway. Your documents still matter.",
    points: [
      "Every passenger needs valid travel documents for the crossing.",
      "Passengers are responsible for their own immigration formalities.",
      "Visa and entry eligibility is the passenger's responsibility.",
      "The driver handles the vehicle side of the crossing where applicable.",
    ],
    note: "We don't give immigration advice. If you're unsure about a visa, check with the official authorities before you book.",
    link: "Documents for the road crossing",
  },

  faq: {
    eyebrow: "Questions",
    heading: "SUV questions, answered",
    items: [
      {
        question: "What SUV do you provide?",
        answer:
          "The SUV class is fulfilled by a GMC Yukon or a Hyundai Staria VIP, depending on availability. Both are booked on the same capacity: 1–4 passengers and 3 large suitcases plus hand luggage.",
      },
      {
        question: "Is it a GMC Yukon, a GMC Tahoe or a Hyundai Staria?",
        answer:
          "It's a GMC Yukon or a Hyundai Staria VIP. We don't list a GMC Tahoe in the fleet. If the exact vehicle matters to you, ask the booking team to confirm which one is assigned before you travel.",
      },
      {
        question: "How many passengers can the SUV take?",
        answer: "Up to four passengers. For five to seven people, the van keeps everyone in one vehicle.",
      },
      {
        question: "How many suitcases fit?",
        answer:
          "Three large suitcases plus hand luggage, which is one more large suitcase than the sedan. Bag sizes vary, so tell us about anything oversized when you book.",
      },
      {
        question: "Is an SUV better than a sedan for airport transfers?",
        answer:
          "Not always. For one or two people with light bags the sedan is fine and cheaper. The SUV makes more sense once there's a third large suitcase, children's bags or a stroller, which is common on airport trips.",
      },
      {
        question: "Is the SUV suitable for families with children?",
        answer:
          "Yes, it's the most common reason people book it: a family of four plus luggage fits in one vehicle. If you need a child seat, ask when booking rather than assuming one is in the car.",
      },
      {
        question: "Can I bring a stroller?",
        answer:
          "Usually, yes. Mention it when booking alongside your suitcases so we can confirm everything fits together.",
      },
      {
        question: "Can I bring golf clubs?",
        answer:
          "Golf bags are a common reason to choose the SUV. Tell us how many bags you have and what other luggage is coming so we can confirm the space.",
      },
      {
        question: "Can the SUV travel across the King Fahd Causeway?",
        answer:
          "Yes. The same vehicle takes you from your pickup in Bahrain across the causeway to your destination in Saudi Arabia, or the reverse. Passengers handle their own immigration formalities.",
      },
      {
        question: "Is the SUV available for Dammam and Khobar?",
        answer:
          "Yes, and on every other route we run, including Jubail, Al Ahsa and Riyadh. The fare depends on the route.",
      },
      {
        question: "Can I request a specific GMC vehicle?",
        answer:
          "You can ask. The SUV class is assigned by availability, so the team will tell you before you travel whether a specific vehicle can be confirmed.",
      },
      {
        question: "How do I get the SUV fare?",
        answer:
          "Send your pickup, destination, date, time, passenger count and luggage on WhatsApp, or use the request form on this page. We confirm the exact fare before the trip.",
      },
    ],
  },

  final: {
    heading: "Think the SUV fits your trip?",
    body: "Send us your passenger count, luggage and route. We'll confirm the available SUV and your exact fare before the journey.",
    primary: "Get My SUV Fare",
    secondary: "WhatsApp Us",
    reassurance: "1–4 passengers · 3 large suitcases + hand luggage",
  },

  sticky: { primary: "Get SUV Fare", whatsapp: "WhatsApp" },
};

export type SuvCopy = typeof SUV;
