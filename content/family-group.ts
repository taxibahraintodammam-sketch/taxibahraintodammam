/**
 * Copy for the Family & Group page at /family-van-transfer/ (the page kept
 * its original URL; /family-group-transfer-bahrain-saudi/ redirects here).
 * Rendered by components/family-group/. Arabic in family-group.ar.ts.
 *
 * Capacities come from content/fleet.ts (sedan 1–3 / 2 large bags, SUV 1–4 /
 * 3, van up to 7 / 6, 30-seat coaster). Inclusions match the site's fare
 * policy (vehicle, driver, fuel, causeway toll, standard border waiting).
 * No group "starting from" price, no child-seat guarantee.
 */

export type Pair = { title: string; body: string };
export type Link = { label: string; href: string };

export type FamilyGroupCopy = {
  meta: { title: string; description: string; ogLocale: string };
  crumb: string;
  hero: {
    eyebrow: string;
    heading: string;
    sub: string;
    primary: string;
    secondary: string;
    secondaryMessage: string;
    snapshotTitle: string;
    snapshot: { label: string; value: string }[];
  };
  problem: { eyebrow: string; heading: string; intro: string; items: string[]; twoCars: { title: string; lines: string[] }; oneVan: { title: string; lines: string[] } };
  sizes: {
    eyebrow: string;
    heading: string;
    intro: string;
    seatsLabel: string;
    bagsLabel: string;
    bestLabel: string;
    rows: { people: string; seats: number; vehicle: string; bags: string; best: string; slug: string }[];
    note: string;
  };
  luggage: {
    eyebrow: string;
    heading: string;
    body: string;
    kinds: string[];
    calc: {
      title: string;
      passengers: string;
      large: string;
      cabin: string;
      extras: string;
      extrasHint: string;
      resultLead: string;
      results: { sedan: string; suv: string; van: string; several: string };
      disclaimer: string;
      cta: string;
      message: string;
    };
  };
  trips: { eyebrow: string; heading: string; items: (Pair & { link?: Link })[] };
  journey: { eyebrow: string; heading: string; stops: string[]; notes: string[]; causewayLink: string };
  pickups: { eyebrow: string; heading: string; body: string; examples: string[]; rules: string[] };
  routes: { eyebrow: string; heading: string; items: { route: string; body: string; href?: string }[]; ask: string; askMessage: string };
  airport: { eyebrow: string; heading: string; body: string; directions: Link[]; sendHeading: string; send: string[] };
  children: { heading: string; body: string; points: string[] };
  shopping: { heading: string; body: string; points: string[] };
  included: { eyebrow: string; heading: string; yesHeading: string; yes: string[]; noHeading: string; no: string[] };
  pricing: { heading: string; body: string; factors: string[] };
  scenarios: { eyebrow: string; heading: string; tag: string; items: { title: string; route: string; body: string; vehicle: string }[] };
  checklist: {
    eyebrow: string;
    heading: string;
    intro: string;
    fields: {
      pickup: string;
      destination: string;
      date: string;
      time: string;
      adults: string;
      children: string;
      large: string;
      cabin: string;
      trip: string;
      oneWay: string;
      returnTrip: string;
      extraPickups: string;
      extraPlaceholder: string;
    };
    submit: string;
    note: string;
    messageIntro: string;
    notSet: string;
  };
  faq: { eyebrow: string; heading: string; items: { question: string; answer: string }[] };
  final: { heading: string; body: string; primary: string; secondary: string; reassurance: string };
};

export const FAMILY_GROUP: FamilyGroupCopy = {
  meta: {
    title: "Family & Group Taxi Bahrain to Saudi Arabia | Private Transfers",
    description:
      "Private family and group transfers between Bahrain and Saudi Arabia via the King Fahd Causeway. Choose the right vehicle for passengers, luggage and door-to-door travel.",
    ogLocale: "en_BH",
  },
  crumb: "Family & Group Transfers",
  hero: {
    eyebrow: "Private group transfers · Bahrain ↔ Saudi",
    heading: "Keep the whole group together across the causeway",
    sub: "Private cross-border transport for families and small groups travelling between Bahrain and Saudi Arabia, with vehicle options sized around your passengers and luggage.",
    primary: "Get a group fare",
    secondary: "WhatsApp our team",
    secondaryMessage: "Hi, we're a group travelling between Bahrain and Saudi Arabia and need one vehicle for everyone.",
    snapshotTitle: "Your group, at a glance",
    snapshot: [
      { label: "Passengers", value: "1–7 in one vehicle, more across several" },
      { label: "Luggage", value: "Tell us how many bags" },
      { label: "Vehicle", value: "Sedan · SUV · Van · Luxury" },
      { label: "Route", value: "Bahrain ↔ Saudi Arabia" },
    ],
  },
  problem: {
    eyebrow: "Why groups book us",
    heading: "Travelling as a group shouldn't mean travelling separately",
    intro: "If you've ever tried to move a family across the causeway in two taxis, you'll know how it goes.",
    items: [
      "The family ends up split between two cars.",
      "The suitcases don't all fit, so someone holds one on their lap.",
      "The children need more room than a back seat gives them.",
      "People are waiting at different addresses.",
      "The shopping comes back bigger than it went.",
      "Airport passengers turn up with more bags than expected.",
      "Nobody wants to coordinate two drivers on two phones.",
      "At the border, two cars means two queues and two arrival times.",
    ],
    twoCars: { title: "Two taxis", lines: ["Two drivers", "Two border queues", "Arrive at different times"] },
    oneVan: { title: "One private vehicle", lines: ["One driver", "Everyone crosses together", "Arrive together, with every bag"] },
  },
  sizes: {
    eyebrow: "Choose around your group",
    heading: "Start with how many of you there are",
    intro: "Then check the bags. A vehicle that seats everyone isn't enough if the luggage doesn't fit.",
    seatsLabel: "Seats",
    bagsLabel: "Luggage",
    bestLabel: "Suits",
    rows: [
      { people: "1–3 passengers", seats: 3, vehicle: "Private sedan", bags: "2 large suitcases + hand luggage", best: "Couples and small families with normal luggage", slug: "sedan-camry-sonata" },
      { people: "Up to 4 passengers", seats: 4, vehicle: "SUV", bags: "3 large suitcases + hand luggage", best: "Families of four, or three with extra bags", slug: "suv-gmc-tahoe" },
      { people: "Up to 7 passengers", seats: 7, vehicle: "Private van", bags: "6 large suitcases", best: "Larger families and friends travelling together", slug: "van-hiace-hyundai-h1" },
      { people: "8 or more", seats: 8, vehicle: "Several vehicles, or a 30-seat coaster", bags: "Planned around the group", best: "Extended families, events and bigger groups", slug: "bus-coaster-30-seater" },
    ],
    note: "These are the fleet's stated capacities. We won't put more people or bags in a vehicle than it's meant to carry.",
  },
  luggage: {
    eyebrow: "Luggage first",
    heading: "Count the bags before you choose the car",
    body: "Passenger count is only half the answer. A family of four with cabin bags fits an SUV easily. The same family with four large suitcases and a stroller probably needs the van.",
    kinds: ["Large suitcases", "Cabin bags", "Strollers", "Shopping bags", "Baby equipment", "Sports equipment"],
    calc: {
      title: "Passengers + luggage = vehicle",
      passengers: "Passengers",
      large: "Large suitcases",
      cabin: "Cabin bags",
      extras: "Strollers & bulky items",
      extrasHint: "Prams, baby gear, golf bags",
      resultLead: "Likely fit",
      results: {
        sedan: "Sedan",
        suv: "SUV",
        van: "Van",
        several: "More than one vehicle, or a coaster",
      },
      disclaimer: "A guide only. Send us the details and we'll confirm the vehicle before you travel.",
      cta: "Check this on WhatsApp",
      message: "Hi, can you confirm the right vehicle for our group?\nPassengers: {p}\nLarge suitcases: {l}\nCabin bags: {c}\nStrollers / bulky items: {x}",
    },
  },
  trips: {
    eyebrow: "Real family trips",
    heading: "Made for the trips families actually take",
    items: [
      { title: "Visiting relatives", body: "Bahrain to a family home in Dammam or Khobar, and back again, with everyone in one car.", link: { label: "Bahrain to Dammam", href: "/taxi-bahrain-to-dammam/" } },
      { title: "Landing at Bahrain Airport", body: "The whole family collected at arrivals and driven straight on into Saudi Arabia.", link: { label: "Bahrain Airport to Dammam", href: "/bahrain-airport-to-dammam-taxi/" } },
      { title: "A weekend shopping trip", body: "Out with a few bags, home with a lot more. Book the bigger vehicle for the return." },
      { title: "Hotel to hotel", body: "From your hotel in Saudi Arabia to your hotel in Bahrain, lobby to lobby." },
      { title: "A family occasion", body: "Weddings, gatherings and private events, when everyone needs to arrive together." },
      { title: "Holiday travel", body: "Busy periods at the border are easier when the whole family is in one vehicle." },
    ],
  },
  journey: {
    eyebrow: "The journey",
    heading: "One vehicle, from the first door to the last",
    stops: ["Home or hotel", "Private pickup", "Bahrain checkpoint", "King Fahd Causeway", "Saudi checkpoint", "Final address"],
    notes: [
      "Each passenger handles their own immigration documents.",
      "The driver handles the vehicle's paperwork and the toll.",
      "Border processing time varies, especially at weekends and holidays.",
      "The driver helps load and unload your luggage.",
      "Drop-off is at the address you confirmed when booking.",
    ],
    causewayLink: "How the causeway crossing works",
  },
  pickups: {
    eyebrow: "Several pickups",
    heading: "Picking up everyone from different places?",
    body: "You can ask for more than one pickup on the same trip when the route makes sense. We'll plan the order so nobody waits longer than they need to.",
    examples: ["A hotel and an apartment", "Two family homes nearby", "The airport, then a hotel", "Different Bahrain neighbourhoods"],
    rules: [
      "Extra pickup points can change the fare and the timing.",
      "Send every exact address before we confirm.",
      "We plan the pickup order around the most practical route.",
    ],
  },
  routes: {
    eyebrow: "Where groups go",
    heading: "Popular group routes",
    items: [
      { route: "Bahrain → Dammam", body: "The most common family run. One van usually costs less than splitting the family across two sedans.", href: "/taxi-bahrain-to-dammam/" },
      { route: "Bahrain → Khobar", body: "Shopping, family visits and hotels, just over the causeway.", href: "/taxi-bahrain-to-khobar/" },
      { route: "Bahrain → Jubail", body: "A longer drive north, where comfort and luggage space matter more.", href: "/taxi-bahrain-to-jubail/" },
      { route: "Bahrain → Al Ahsa / Hofuf", body: "Mostly family visits, often with extra bags for a longer stay.", href: "/taxi-bahrain-to-al-ahsa-hofuf/" },
      { route: "Bahrain → Dammam Airport", body: "Flying out as a family? We time the pickup to your flight.", href: "/bahrain-to-dammam-airport-taxi/" },
      { route: "Saudi Arabia → Bahrain", body: "The same service in the other direction, from any Eastern Province address.", href: "/taxi-dammam-to-bahrain/" },
    ],
    ask: "Don't see your destination? Send us the address.",
    askMessage: "Hi, we're a group and need a vehicle to this address: ",
  },
  airport: {
    eyebrow: "Airport groups",
    heading: "Landing or flying out as a group",
    body: "Airport trips are where groups most often underestimate luggage. Tell us everything up front and we'll send a vehicle that fits. On arrivals we track your flight, so a delay moves the pickup rather than leaving you waiting.",
    directions: [
      { label: "Bahrain Airport → Saudi Arabia", href: "/bahrain-airport-to-dammam-taxi/" },
      { label: "Saudi Arabia → Dammam Airport", href: "/bahrain-to-dammam-airport-taxi/" },
      { label: "Dammam Airport → Bahrain", href: "/dammam-airport-to-bahrain-taxi/" },
    ],
    sendHeading: "Send us",
    send: ["Flight number", "Arrival or departure time", "Passenger count", "Luggage count", "Whether you need a child seat (ask, and we'll confirm)", "For departures: we add a buffer for the border"],
  },
  children: {
    heading: "Travelling with children?",
    body: "Tell us how many children are travelling and their ages when you book. It changes the vehicle more often than people expect.",
    points: [
      "More space, so nobody is squeezed for the whole trip",
      "Room for strollers and baby bags counted in from the start",
      "The whole family stays in one vehicle, including through both border posts",
      "Need a short stop on the way? Ask when you book",
      "Child seats: ask when booking and we'll confirm whether we can provide one",
    ],
  },
  shopping: {
    heading: "Coming back with more bags than you left with?",
    body: "It happens on almost every shopping trip, in both directions: a day in Bahrain's malls, or a trip to Khobar or Dammam. The car that brought you may not fit what you're bringing back.",
    points: [
      "Tell us it's a shopping trip when you book",
      "An SUV or van often makes more sense for the return leg",
      "If you book a return, mention the shopping so we size the vehicle for it",
    ],
  },
  included: {
    eyebrow: "What's included",
    heading: "What your fare covers",
    yesHeading: "Included",
    yes: ["Private vehicle for your group", "Driver", "Door-to-door pickup and drop-off", "Fuel", "King Fahd Causeway toll", "Standard waiting time at both border posts"],
    noHeading: "Not automatically included",
    no: ["Visa or permit fees", "Immigration fees", "Extra stops that weren't agreed", "Additional destinations", "Special requirements, unless confirmed"],
  },
  pricing: {
    heading: "How a group fare is worked out",
    body: "We don't publish one group price, because a group of three with hand luggage and a group of seven with suitcases need different vehicles. The fare depends on:",
    factors: ["Pickup location", "Destination", "Number of passengers", "Vehicle type", "Luggage", "Date and time", "Extra pickup points", "One-way or return", "Special stops"],
  },
  scenarios: {
    eyebrow: "Examples",
    heading: "How we'd plan three different groups",
    tag: "Example",
    items: [
      { title: "Family of 5 with luggage", route: "Bahrain hotel → Dammam hotel", body: "Five people and four large suitcases is too much for a sedan or SUV. A van fits everyone and every bag in one vehicle.", vehicle: "Van" },
      { title: "Family landing at Bahrain Airport", route: "Bahrain Airport → Khobar", body: "Four passengers with three suitcases and a stroller. We'd track the flight, meet them at arrivals and suggest the van for the stroller.", vehicle: "SUV or van" },
      { title: "Group of 7, there and back", route: "Bahrain → Jubail → Bahrain", body: "Seven friends with overnight bags. One van for both legs, with the return date and pickup point confirmed when booking.", vehicle: "Van" },
    ],
  },
  checklist: {
    eyebrow: "Before you ask for a quote",
    heading: "Tell us about your group",
    intro: "Send the passenger count, luggage details, pickup location and destination. We'll help you choose the right vehicle and confirm the fare before the journey.",
    fields: {
      pickup: "Pickup address",
      destination: "Destination",
      date: "Travel date",
      time: "Pickup time",
      adults: "Adults",
      children: "Children",
      large: "Large bags",
      cabin: "Cabin bags",
      trip: "Journey",
      oneWay: "One-way",
      returnTrip: "Return",
      extraPickups: "Additional pickup points",
      extraPlaceholder: "Other addresses, if any",
    },
    submit: "Get my group fare",
    note: "Opens WhatsApp with your details filled in. No app required. No need to coordinate multiple taxis yourself.",
    messageIntro: "Hi, we'd like a group fare.",
    notSet: "to confirm",
  },
  faq: {
    eyebrow: "Questions",
    heading: "Family and group questions",
    items: [
      { question: "Can my whole family travel in one vehicle?", answer: "Up to seven people can travel in one van, with room for six large suitcases. For bigger families we'll suggest two vehicles or our 30-seat coaster." },
      { question: "What vehicle should I choose for 5 passengers with luggage?", answer: "The van. An SUV takes up to four passengers, so five people need the van, which also takes up to six large suitcases." },
      { question: "Can you collect us from more than one address?", answer: "Yes, when the route makes sense. Send every address before we confirm; extra pickups can change the fare and timing." },
      { question: "Can we travel with children?", answer: "Of course. Tell us how many children and their ages when you book. If you need a child seat, ask and we'll confirm whether we can provide one." },
      { question: "Can you take a group from Bahrain Airport directly to Saudi Arabia?", answer: "Yes. The driver meets you at arrivals, tracks your flight and drives the whole group across the causeway to your address." },
      { question: "Can we book a return trip?", answer: "Yes. Send the return date, time and pickup point when you book, and mention any shopping so we size the vehicle for the way back." },
      { question: "Can we bring extra shopping bags?", answer: "Yes, as long as the vehicle has room. Tell us it's a shopping trip so we can suggest an SUV or van for the return." },
      { question: "Can we travel from Saudi Arabia back to Bahrain?", answer: "Yes. We collect from any Eastern Province address, including Dammam, Khobar and Dammam Airport, and drive you into Bahrain." },
      { question: "How is the group fare calculated?", answer: "By pickup, destination, passenger count, vehicle, luggage, date and time, extra pickups, one-way or return, and any special stops. The fare includes the causeway toll and standard border waiting." },
      { question: "What information should I send on WhatsApp?", answer: "Pickup address, destination, date, pickup time, number of adults and children, large and cabin bags, one-way or return, and any extra pickup points." },
    ],
  },
  final: {
    heading: "Tell us about your group",
    body: "Send the passenger count, luggage details, pickup location and destination. We'll help you choose the right vehicle and confirm the fare before the journey.",
    primary: "Get my group fare",
    secondary: "WhatsApp us",
    reassurance: "No app required. No need to coordinate multiple taxis yourself.",
  },
};
