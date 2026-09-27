/**
 * /taxi-bahrain-to-riyadh/ — "This is a long cross-border journey. Plan it like one."
 *
 * {tokens} are filled from content/routes.ts and content/fares.ts (see
 * fillRiyadh in components/riyadh/RiyadhPage.tsx). {time} is the site's
 * published highway driving time, which the existing copy describes as
 * "plus the causeway crossing", so it's never presented as door-to-door.
 * Other facts come from the existing Riyadh route copy: short stops for
 * fuel, prayer and rest are normal; the driver can wait in Riyadh if agreed
 * in advance (quoted with the return); overnight departures are common;
 * booking a day or two ahead is recommended.
 */
export const RIYADH = {
  meta: {
    title: "Taxi Bahrain to Riyadh | Private Long-Distance Transfer",
    description:
      "Private taxi from Bahrain to Riyadh via the King Fahd Causeway. Door-to-door cross-border transfers with sedan, SUV, van and luxury vehicle options, planned around a long journey.",
    ogLocale: "en_BH",
  },
  crumb: "Bahrain to Riyadh",
  schemaName: "Private long-distance taxi from Bahrain to Riyadh",

  hero: {
    eyebrow: "Bahrain → Riyadh · long distance",
    heading: "Bahrain to Riyadh. Plan the long journey properly.",
    sub: "Private door-to-door transport from Bahrain to Riyadh via the King Fahd Causeway, with the vehicle, route and fare arranged around your journey.",
    primary: "Get My Riyadh Fare",
    secondary: "WhatsApp the Booking Team",
    secondaryMessage: "Hi, I'd like a fare for a private car from Bahrain to Riyadh.",
    stops: ["Bahrain", "Causeway", "Saudi Arabia", "Riyadh"],
    tags: ["Cross border", "Long distance", "Private vehicle", "Final destination"],
    figures: [
      { value: "~{km} km", label: "by road" },
      { value: "{time}", label: "typical driving, plus the crossing" },
    ],
    illustration: "Illustration. Not live tracking.",
  },

  difference: {
    eyebrow: "The big difference",
    heading: "Riyadh isn't a causeway trip. It's a long-distance journey after the causeway.",
    lead: "Riyadh is not Khobar with a longer price tag. Once you've crossed the causeway, there's still a substantial road journey ahead.",
    body: [
      "Going to Khobar, the drive after Saudi immigration is short: you're in the city almost as soon as you're through. Going to Riyadh, the border is where the journey properly starts. The car keeps going, through the Eastern Province and inland across the country, for hours.",
      "That changes what matters. On a short run you can get away with the wrong car, a vague pickup time or no plan for coming back. On this one, those small decisions follow you all the way to Riyadh.",
    ],
    khobarLink: "Bahrain to Khobar",
    mattersLabel: "On this route, these matter more",
    matters: ["Timing", "Vehicle choice", "Luggage planning", "Room to be comfortable", "The return plan", "A realistic schedule"],
  },

  scale: {
    eyebrow: "Scale",
    heading: "The causeway is only the beginning",
    intro: "Roughly to scale: the stretch over the water is a small part of the whole trip.",
    segments: ["Bahrain", "Causeway", "Eastern Province", "Central Saudi Arabia", "Riyadh"],
    causewayNote: "~25 km over the sea",
    restNote: "The rest is Saudi highway",
    routeNote: "The exact road can vary with traffic and your pickup and destination. Towns along the way aren't scheduled stops.",
  },

  time: {
    eyebrow: "Distance and time",
    heading: "The road distance doesn't tell you the whole time",
    roadLabel: "Road distance",
    road: "~{km} km",
    driveLabel: "Typical highway driving",
    drive: "{time}",
    plus: "plus the causeway crossing",
    body: "Total journey time isn't the distance divided by highway speed. Before the highway even starts, there's the Bahrain pickup, two immigration posts and whatever the causeway traffic looks like that day. After it, there's Riyadh traffic and your final address.",
    partsLabel: "What goes into the day",
    parts: ["Bahrain pickup", "Bahrain immigration", "Causeway traffic", "Saudi immigration", "Highway driving", "Short stops", "Your Riyadh address"],
    buffer: "Plan with a buffer.",
    bufferNote: "We don't promise a fixed arrival time on this route. If something in Riyadh can't move, work back from it with room to spare.",
  },

  vehicle: {
    eyebrow: "The vehicle",
    heading: "On a long drive, the vehicle becomes part of the trip.",
    body: "For half an hour, almost any car will do. For several hours, the space you have is the space you live in. None of these is better than the others; they fit different trips.",
    classes: [
      { key: "sedan", name: "Sedan", cap: "1–3 passengers · 2 large bags", fit: "A smaller party with normal luggage." },
      { key: "suv", name: "SUV", cap: "1–4 passengers · 3 large bags", fit: "Families, extra luggage, or when you want more room for the hours." },
      { key: "van", name: "Van", cap: "Up to 7 passengers · 6 large bags", fit: "Larger groups, lots of luggage, everyone staying together." },
      { key: "luxury", name: "Luxury sedan", cap: "1–3 passengers · 2 large bags", fit: "Executive travel and occasions where presentation matters." },
    ],
    fleetLink: "Compare the fleet",
    tool: {
      heading: "Tell us about your journey",
      note: "A visual guide based on published capacities. Availability and the final vehicle are confirmed with your fare.",
      q1: "Passengers",
      q1Options: ["1–3", "4", "5–7"],
      q2: "Luggage",
      q2Options: ["Light", "Normal", "Heavy"],
      q3: "Trip type",
      q3Options: ["Family", "Business", "Executive", "Group"],
      likely: "Likely fit",
      from: "From",
    },
  },

  luggage: {
    eyebrow: "Luggage",
    heading: "Count the bags before you count the seats",
    body: "People moving to Riyadh, visiting for a while or travelling as a family rarely travel light. On a short trip, an extra bag on someone's lap is an annoyance. For five hours it's a real problem.",
    items: ["Large suitcases", "Cabin bags", "Children's bags", "Stroller", "Shopping", "Business equipment", "Golf bags"],
    compare: [
      { people: 2, bags: 6, verdict: "May need a van" },
      { people: 4, bags: 2, verdict: "An SUV may be enough" },
    ],
    compareLabel: "Same trip, different answer",
    peopleUnit: "people",
    bagsUnit: "large bags",
    note: "Tell us the actual luggage before the fare is confirmed. Unusual items can't be promised to fit until we know what they are.",
  },

  twoParts: {
    eyebrow: "Two journeys in one",
    heading: "First the border, then the long road",
    first: {
      label: "Part one",
      title: "The cross-border crossing",
      body: "Bahrain immigration, the King Fahd Causeway and Saudi immigration. This is the international part, and border processing can move everything that comes after it.",
    },
    second: {
      label: "Part two",
      title: "The long Saudi highway",
      body: "Once you're through Saudi immigration, the car heads inland toward Riyadh. Highway traffic, road conditions and Riyadh's own traffic at the end all affect when you arrive.",
    },
    note: "No one can promise an exact arrival time across both parts, and we won't pretend to.",
  },

  planning: {
    eyebrow: "Planning the day",
    heading: "How should I plan the day?",
    intro: "There's no departure time that's always best. Work from what's fixed at the Riyadh end, and build back.",
    windows: [
      { key: "early", label: "Early departure", body: "Usually the right call when you have an important same-day commitment in Riyadh." },
      { key: "midday", label: "Midday departure", body: "Workable, but may mean a later arrival depending on border and road conditions." },
      { key: "evening", label: "Evening or overnight", body: "Common on this route when the plan is a late arrival or being in Riyadh by the next morning." },
    ],
    basisLabel: "Base the departure on",
    basis: ["Your appointment time", "Any flight time", "Hotel check-in", "The return schedule", "Border conditions", "Planned stops"],
    advance: "Because this is our longest route, booking a day or two ahead is better than same-day, especially when an arrival time matters.",
    example: {
      tag: "Example only",
      steps: ["06:00 · Pickup in Bahrain", "Bahrain immigration", "King Fahd Causeway", "Saudi immigration", "Long-distance highway journey", "Riyadh"],
      note: "This is an example of how to think about the journey, not a guaranteed schedule.",
    },
  },

  stops: {
    eyebrow: "On the way",
    heading: "Need a stop on the way?",
    body: "On a drive this long, short stops for fuel, prayer and rest are normal. They're practical breaks, not a scheduled stopover.",
    points: [
      "Tell us about any planned stop before booking.",
      "Extra stops can change the route and the fare.",
      "Time spent stopped adds to the total journey.",
      "The driver follows road and safety requirements throughout.",
    ],
    note: "Prefer a relaxed pace with more breaks, or the earliest reasonable arrival? Say which when you book and the driver's plan is made around it.",
  },

  shape: {
    eyebrow: "Trip shape",
    heading: "One way, return, or a day in Riyadh?",
    options: [
      {
        key: "oneway",
        label: "One way",
        route: ["Bahrain", "Riyadh"],
        best: ["You're staying in Riyadh", "Onward travel is already arranged", "You only need to arrive"],
        note: "The simplest structure: pickup in Bahrain, drop-off at your Riyadh address.",
      },
      {
        key: "return",
        label: "Return",
        route: ["Bahrain", "Riyadh", "Bahrain"],
        best: ["Your return date and time are known", "You want both legs arranged up front", "The round trip is requested in advance"],
        note: "If the driver needs to wait in Riyadh for the return, tell us in advance: the waiting and the return leg are quoted together. The same driver and vehicle aren't guaranteed unless confirmed.",
      },
      {
        key: "day",
        label: "A day in Riyadh",
        route: ["Bahrain", "Meeting", "Office", "Lunch", "Meeting", "Airport or return"],
        best: ["Several Riyadh addresses", "A schedule that may change", "The car needs to stay with you"],
        note: "A one-way transfer is A to B. Keeping a vehicle and driver around your Riyadh schedule is a different service: hourly chauffeur hire.",
      },
    ],
    bestLabel: "Best when",
    link: "Hourly chauffeur hire",
  },

  sameDay: {
    eyebrow: "Same day",
    heading: "Going to Riyadh and coming back the same day?",
    body: "It's possible, but it's a very different plan from a one-way transfer. The road time alone takes up most of the day before you've done anything in Riyadh.",
    consider: ["How long the appointment really is", "When the return has to leave", "Driver and vehicle availability", "Total road time both ways", "Border conditions, twice", "Whether it's practical for you", "How many stops you need"],
    note: "If you need the vehicle available between appointments, hourly chauffeur hire may fit better than two transfers.",
  },

  airport: {
    eyebrow: "From the airport",
    heading: "Landing in Bahrain and continuing to Riyadh?",
    body: "You can go straight from Bahrain International Airport to Riyadh without stopping in Manama. The driver meets you at the airport and the long journey starts from there.",
    flow: ["Bahrain International Airport", "Private pickup", "Causeway", "Saudi immigration", "Riyadh"],
    sendLabel: "Send",
    send: ["Flight number", "Arrival time", "Passenger count", "Luggage", "Riyadh destination"],
    link: "Airport transfers",
    destHeading: "Where in Riyadh?",
    dest: ["Hotel", "Residence", "Office", "Business district", "Airport", "Event venue", "Private address"],
    destNote: "The fare depends on the actual Riyadh address, so send the exact destination rather than just \"Riyadh\".",
  },

  who: {
    eyebrow: "Who books this",
    heading: "Who takes this trip by road",
    items: [
      { title: "A family journey", body: "Everyone and all the luggage in one vehicle, with no airport queues and no baggage limits beyond what the car holds." },
      { title: "A business trip", body: "A scheduled meeting in Riyadh, with the departure planned back from the meeting time rather than guessed." },
      { title: "An airport connection", body: "Landing in Bahrain and continuing straight to Riyadh without a second flight." },
      { title: "A private visit", body: "Family or personal travel where a door-to-door car is simpler than piecing together flights and taxis." },
      { title: "A group", body: "Up to seven people who want to stay together in the van rather than split across cars." },
      { title: "Executive travel", body: "When a luxury sedan is requested for the whole distance." },
    ],
    corporate: "Travelling this route regularly for work? A corporate account can set up recurring bookings.",
    corporateLink: "Corporate accounts",
  },

  compare: {
    eyebrow: "In context",
    heading: "Riyadh is a different commitment from Khobar",
    body: "This isn't a ranking. It's about matching the service to the length of the journey. The bars follow the published road distances.",
    km: "km",
    note: "Closer destinations are mostly the border plus a short drive. Riyadh is the border plus hours of highway.",
  },

  pricing: {
    eyebrow: "Fares",
    heading: "Starting fares for Riyadh",
    from: "From",
    names: { sedan: "Sedan", van: "Van", suv: "SUV", luxury: "Luxury sedan" },
    note: "The final fare depends on the exact pickup, Riyadh destination, vehicle, date, time and whether the journey is one way or return.",
    formula: ["Pickup", "Riyadh destination", "Vehicle", "Date and time", "One way or return", "Special requirements"],
    equals: "Your fare",
    allFares: "All route fares",
  },

  included: {
    eyebrow: "In the fare",
    heading: "What's included",
    yes: ["Private vehicle", "Driver", "Fuel", "Causeway toll", "Door-to-door transport"],
    passengerHeading: "The passenger's responsibility",
    passenger: ["Visa or entry permission", "Passport or travel document", "Immigration formalities", "Personal belongings", "Meals and purchases on the way"],
  },

  documents: {
    eyebrow: "Before you go",
    heading: "Before you leave Bahrain",
    items: ["Valid travel document", "Any Saudi entry permission you need", "Your booking details", "The Riyadh destination address", "Flight details, if relevant"],
    note: "Passengers are responsible for their own immigration eligibility and documents. The driver handles the vehicle side of the crossing. This isn't legal advice.",
    link: "Documents for the road crossing",
  },

  booking: {
    eyebrow: "Request",
    heading: "Tell us what the Riyadh trip looks like",
    body: "It opens WhatsApp with your details written out. We reply with the vehicle, the fare and how we'd plan the journey.",
    fields: {
      pickup: "Pickup address",
      pickupPlaceholder: "Area, hotel or airport in Bahrain",
      destination: "Riyadh destination",
      destinationPlaceholder: "Hotel, office or address in Riyadh",
      date: "Date",
      time: "Pickup time",
      passengers: "Passengers",
      luggage: "Large luggage",
      vehicle: "Vehicle",
      trip: "One way or return",
      stops: "Stops",
      stopsPlaceholder: "Any planned stop, or none",
    },
    vehicles: ["Not sure", "Sedan", "SUV", "Van", "Luxury sedan"],
    trips: ["One way", "Return"],
    submit: "Get My Riyadh Fare",
    secondary: "WhatsApp the Team",
    messageIntro: "Hi, I need a private car from Bahrain to Riyadh.",
    messageOutro: "Please confirm the fare and the journey planning.",
    notSet: "not set",
    exampleTag: "Example request",
    example: [
      "Hi, I need a private car from Bahrain to Riyadh.",
      "Date:",
      "Passengers:",
      "Luggage:",
      "Pickup:",
      "Riyadh destination:",
      "Vehicle:",
      "One-way / return:",
      "Please confirm the fare and estimated journey planning.",
    ],
    fullBooking: "Prefer the full booking form?",
  },

  faq: {
    eyebrow: "Questions",
    heading: "Bahrain to Riyadh, answered",
    items: [
      {
        question: "How far is Bahrain from Riyadh by road?",
        answer:
          "About {km} km from a typical Bahrain pickup, including roughly 25 km across the King Fahd Causeway. The exact distance depends on your pickup point and your Riyadh address.",
      },
      {
        question: "How long does Bahrain to Riyadh usually take?",
        answer:
          "The highway driving is typically {time}, plus the causeway crossing with both immigration posts, plus any short stops and Riyadh traffic at the end. Border and road conditions change it, so plan with a buffer rather than to the minute.",
      },
      {
        question: "Does the route cross the King Fahd Causeway?",
        answer:
          "Yes. Every road trip from Bahrain to Saudi Arabia goes through Bahrain immigration, over the causeway and through Saudi immigration. After that the car continues inland to Riyadh. The causeway toll is included in the fare.",
      },
      {
        question: "What documents do I need?",
        answer:
          "Each passenger needs a valid travel document and any Saudi entry permission their situation requires. Riyadh has the same entry rules as Dammam or Khobar, since it's all inside Saudi Arabia. We can't give visa advice, so check official sources if you're unsure.",
      },
      {
        question: "Can I travel from Bahrain Airport directly to Riyadh?",
        answer:
          "Yes. The driver collects you at Bahrain International Airport and continues straight to Riyadh. Send your flight number, arrival time, passenger count, luggage and Riyadh address when you book.",
      },
      {
        question: "Which vehicle should I choose?",
        answer:
          "A sedan for one to three people with normal luggage, an SUV for up to four or for more room and luggage, a van for up to seven or a lot of luggage, and a luxury sedan for executive travel. On a long drive, many people size up rather than down.",
      },
      {
        question: "Can I bring several large suitcases?",
        answer:
          "Yes, if the vehicle suits them. The sedan and luxury sedan take two large suitcases, the SUV three, and the van six. Two people with six large bags may need a van; tell us the real luggage before the fare is confirmed.",
      },
      {
        question: "Can I request a stop on the way?",
        answer:
          "Short stops for fuel, prayer and rest are normal on this drive. If you want a specific stop, mention it before booking: extra stops can change the route, the fare and the total time.",
      },
      {
        question: "Can I book a return journey?",
        answer:
          "Yes. Give us the return date and time when you book and both legs are arranged together. If the driver needs to wait in Riyadh for the return, tell us in advance so the waiting and the return are quoted as one booking.",
      },
      {
        question: "Can I travel to Riyadh and return the same day?",
        answer:
          "It's possible, but the road time takes most of the day. Think about how long you actually need in Riyadh, when the return must leave and whether you need the car between appointments. If you do, hourly chauffeur hire may fit better.",
      },
      {
        question: "Is an SUV better for the long journey?",
        answer:
          "Not automatically. It's better when you have more luggage, four passengers or simply want more room for several hours. For one or two people with light bags, a sedan is perfectly workable. SUV fares on this route start from BHD {suv}.",
      },
      {
        question: "Can I book a luxury vehicle?",
        answer:
          "Yes. The luxury class (Mercedes S-Class or BMW 7 Series) is available on this route for one to three passengers, starting from BHD {luxury}.",
      },
      {
        question: "Can the driver wait for me in Riyadh?",
        answer:
          "Yes, if it's arranged in advance. The waiting time and the return leg are quoted together as part of the same booking rather than arranged on the day.",
      },
      {
        question: "When should I use hourly chauffeur hire instead?",
        answer:
          "When your Riyadh day has several addresses (meetings, an office, lunch, another meeting, the airport) and you need the car to stay with you. A transfer gets you from A to B; hourly hire keeps a vehicle and driver around your schedule.",
      },
      {
        question: "How do I get the exact fare?",
        answer:
          "Send the pickup address, Riyadh destination, date, time, passengers, luggage, vehicle, one way or return, and any stops. The form on this page writes that WhatsApp message for you. The fare is confirmed before you travel.",
      },
    ],
  },

  final: {
    heading: "Planning the long way to Riyadh?",
    body: "Send us your Bahrain pickup point, Riyadh destination, passenger count, luggage and preferred travel time. We'll confirm the appropriate vehicle and fare before you travel.",
    primary: "Get My Riyadh Fare",
    secondary: "WhatsApp the Booking Team",
    small: "Private vehicle · Door-to-door · Bahrain ↔ Saudi",
  },

  sticky: { primary: "Get Riyadh Fare", whatsapp: "WhatsApp" },
};

export type RiyadhCopy = typeof RIYADH;
