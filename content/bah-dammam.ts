/**
 * /bahrain-airport-to-dammam-taxi/ — "Land in Bahrain. Continue straight to Dammam."
 *
 * {km} {time} and fare tokens are filled from content/routes.ts and
 * content/fares.ts. {time} is the site's published drive time *once you're
 * in the vehicle*; airport immigration and baggage claim come first and are
 * never folded into it. Other facts are from the existing route copy: driver
 * waits in the BAH arrivals hall with a name board, flight tracked for early
 * or late landings, toll and standard border waiting included, a Bahrain stop
 * is quoted in advance, English & Arabic speaking drivers, 24/7.
 */
export const BAHDMM = {
  meta: {
    title: "Bahrain Airport to Dammam Taxi | BAH → Dammam Transfer",
    description:
      "Land at Bahrain International Airport and continue straight to Dammam over the King Fahd Causeway. Flight tracking, arrivals pickup, private vehicle. Confirm your fare on WhatsApp.",
    ogLocale: "en_BH",
  },
  crumb: "Bahrain Airport to Dammam",
  schemaName: "Private transfer from Bahrain International Airport (BAH) to Dammam",

  hero: {
    eyebrow: "BAH → Dammam",
    heading: "You've landed in Bahrain. Dammam is still the destination.",
    sub: "Land at Bahrain International Airport, collect your bags, meet your driver and continue directly across the King Fahd Causeway to your Dammam address.",
    board: {
      title: "Arrivals · BAH",
      cols: ["From", "Status", "Continuing to"],
      rows: [
        { from: "Your flight", status: "Landed", next: "Dammam" },
        { from: "Baggage", status: "Collected", next: "Arrivals hall" },
        { from: "Driver", status: "Waiting", next: "Causeway" },
      ],
      note: "Example board. Not live flight data.",
    },
    route: ["BAH", "Causeway", "Dammam"],
    planned: "Planned journey",
    secondary: "WhatsApp My Flight Details",
    secondaryMessage: "Hi, I'm landing at Bahrain Airport and need a transfer to Dammam. My flight details:",
  },

  planner: {
    heading: "Plan my BAH → Dammam transfer",
    fields: {
      flight: "Flight number",
      flightPlaceholder: "e.g. GF 123",
      date: "Arrival date",
      time: "Arrival time",
      passengers: "Passengers",
      luggage: "Large luggage",
      destination: "Dammam destination",
      destinationPlaceholder: "Hotel, office or address",
      type: "Destination type",
      vehicle: "Vehicle",
    },
    types: ["Hotel", "Home", "Office", "Airport", "Meeting", "Other"],
    vehicles: ["Not sure", "Sedan", "SUV", "Van", "Luxury sedan"],
    submit: "Get My Fare on WhatsApp",
    note: "Opens WhatsApp with your details. The fare is confirmed by the team, not calculated here.",
    messageIntro: "Hello, I need a transfer from Bahrain Airport to Dammam.",
    notSet: "not set",
  },

  halfway: {
    eyebrow: "The first half",
    heading: "Your arrival doesn't end at baggage claim",
    body: [
      "For a lot of passengers, Bahrain isn't the destination. They land at BAH because it suits their itinerary and carry on to Saudi Arabia by road. That changes what they need from a car.",
      "Not airport to a Bahrain hotel. Airport, then the border, then Saudi Arabia, then a door in Dammam.",
    ],
    left: { label: "Landing in Bahrain", items: ["Flight arrives at BAH", "Airport immigration", "Baggage claim", "Arrivals hall"] },
    right: { label: "Continuing to Saudi Arabia", items: ["Bahrain exit", "King Fahd Causeway", "Saudi entry", "Your Dammam address"] },
    why: {
      heading: "Why land in Bahrain if you're going to Saudi?",
      body: "Some travellers simply use Bahrain as their arrival airport and continue overland. Whatever the reason in your case, this route exists for exactly that: arriving at BAH with Dammam as the real destination.",
    },
  },

  stages: {
    eyebrow: "The arrival journey",
    heading: "From the aircraft door to your Dammam address",
    intro: "Scroll through the stages. The first two happen inside the airport, before you meet the car.",
    before: "Inside the airport",
    after: "In the vehicle",
    items: [
      { n: "01", title: "Flight lands", body: "Your flight arrives at Bahrain International Airport.", phase: "airport" },
      { n: "02", title: "Clear arrivals", body: "You complete Bahrain airport immigration and collect your luggage.", phase: "airport" },
      { n: "03", title: "Meet your driver", body: "The driver waits in the arrivals hall with a name board.", phase: "meet" },
      { n: "04", title: "Load and leave", body: "Bags go in the car and the road part of the journey starts.", phase: "road" },
      { n: "05", title: "Bahrain exit", body: "The car heads to the Bahrain-side border post, where you complete the exit formalities.", phase: "road" },
      { n: "06", title: "King Fahd Causeway", body: "About 25 km over the sea between the two countries.", phase: "road" },
      { n: "07", title: "Saudi entry", body: "You complete your Saudi immigration formalities. Processing is up to the authorities, not the driver.", phase: "road" },
      { n: "08", title: "Dammam", body: "The driver continues directly to the address you gave us.", phase: "road" },
    ],
  },

  landing: {
    eyebrow: "After touchdown",
    heading: "Do I go straight to the car when the plane lands?",
    answer: "No.",
    body: "You don't meet the driver the moment the aircraft touches down. First you clear Bahrain airport immigration and collect your bags. Once you reach arrivals, the driver is there for the agreed pickup. We monitor the flight so the car can be timed around an early or a delayed landing.",
    youLabel: "You, inside the airport",
    you: ["Flight lands", "Airport immigration", "Baggage claim", "Arrivals hall"],
    carLabel: "Then, with the driver",
    car: ["Meet driver", "Load luggage", "Drive to the causeway", "Bahrain exit", "Causeway", "Saudi entry", "Dammam"],
  },

  meet: {
    eyebrow: "Meet and greet",
    heading: "Finding your driver after landing",
    points: [
      { title: "In the arrivals hall", body: "The driver waits at the agreed arrivals meeting point, after immigration and baggage claim." },
      { title: "With a name board", body: "Look for your name at the agreed meeting point in arrivals." },
      { title: "Flight monitored", body: "The pickup is timed around your actual landing, not a fixed clock time." },
      { title: "Help with the bags", body: "The driver helps load the luggage and you head straight for the causeway." },
      { title: "No second taxi", body: "The same car takes you all the way. Nothing else to arrange after you land." },
      { title: "English and Arabic", body: "Our drivers on this corridor speak both." },
    ],
    imageAlt: "A chauffeur by an open car door while a colleague loads a suitcase into the boot",
  },

  status: {
    eyebrow: "Flight changes",
    heading: "Your flight is late, or early. What happens?",
    intro: "Pick a case to see how the pickup is handled.",
    tabs: ["On time", "Delayed", "Early"],
    cases: [
      { scheduled: "14:15", actual: "14:15", flag: "Landed", driver: "Pickup as planned", body: "The driver is there for the agreed pickup once you've cleared immigration and reached arrivals." },
      { scheduled: "14:15", actual: "14:47", flag: "Landed late", driver: "Pickup timing adjusted", body: "We track the flight, so the driver's arrival moves with your actual landing time rather than sticking to the original schedule. Delays aren't unlimited, though: a very long delay or a missed flight is something to message us about." },
      { scheduled: "14:15", actual: "13:55", flag: "Landed early", driver: "Coordinated around the arrival", body: "The pickup is coordinated around the flight status and the time it takes you to clear the airport. If you're out much faster than expected, message us on WhatsApp and the team will tell you where the driver is." },
    ],
    labels: { scheduled: "Scheduled", actual: "Landed", driver: "Driver" },
    note: "Example times. Flight tracking uses the flight number you give us, so make sure it's the right one.",
  },

  distance: {
    eyebrow: "Planning time",
    heading: "{km} km is not the whole story",
    km: "~{km} km",
    kmLabel: "Airport to Dammam",
    time: "{time}",
    timeLabel: "Typical drive, once you're in the vehicle",
    parts: ["Airport departure", "Bahrain-side border", "Causeway", "Saudi-side border", "Road into Dammam"],
    body: "That drive time starts when you get into the car. Airport immigration and baggage claim come before it, and border conditions on the day can stretch it. If something in Dammam is fixed, allow a buffer.",
  },

  causeway: {
    eyebrow: "The crossing",
    heading: "The road between two countries",
    body: "This isn't a city taxi ride. Between the airport and Dammam there's an international border with immigration on both sides, joined by roughly 25 km of causeway over the sea. The driver handles the car; the immigration decisions and the time they take belong to the authorities.",
    flow: ["Bahrain", "King Fahd Causeway", "Saudi Arabia"],
    imageAlt: "A black car on a long causeway over the sea at sunset",
  },

  space: {
    eyebrow: "Luggage and space",
    heading: "Your bags are part of the booking",
    intro: "Airport luggage is the thing people underestimate. Answer three questions and see which class fits.",
    q1: "Passengers",
    q2: "Large suitcases",
    q3: "Travel type",
    types: ["Solo", "Couple", "Family", "Business", "Group"],
    classes: [
      { key: "sedan", name: "Sedan", cap: "1–3 passengers · 2 large bags + hand luggage", people: 3, bags: 2 },
      { key: "suv", name: "SUV", cap: "1–4 passengers · 3 large bags + hand luggage", people: 4, bags: 3 },
      { key: "van", name: "Van", cap: "Up to 7 passengers · 6 large bags", people: 7, bags: 6 },
      { key: "luxury", name: "Luxury sedan", cap: "1–3 passengers · 2 large bags", people: 3, bags: 2 },
    ],
    suggested: "Suggested",
    fleetLink: "Compare the fleet",
    from: "From",
    over: "More than one vehicle may be needed. Send the details on WhatsApp.",
    note: "Based on the published capacities. Bag sizes vary, so tell us about anything bulky before the fare is confirmed.",
  },

  oneCar: {
    eyebrow: "Why one vehicle",
    heading: "One vehicle, airport to Dammam",
    without: {
      label: "Arranged in pieces",
      steps: ["Land", "Find a Bahrain taxi", "Get to a hotel", "Arrange a Saudi taxi", "Work out the border yourself"],
    },
    with: {
      label: "One planned transfer",
      steps: ["BAH arrivals", "Saudi border", "Dammam"],
    },
    compareHeading: "Is Dammam actually your destination?",
    normal: { label: "Staying in Bahrain", route: ["BAH", "Bahrain address"], body: "If Bahrain is your final stop, you want a Bahrain airport transfer." },
    thisRoute: { label: "Going on to Dammam", route: ["BAH", "Causeway", "Saudi Arabia", "Dammam"], body: "If Dammam is where you're going, this route is built for the cross-border journey." },
    airportLink: "All airport transfers",
    khobar: "Heading to Khobar instead?",
    khobarLink: "Bahrain → Khobar",
  },

  destination: {
    eyebrow: "The other end",
    heading: "Where are you going after the causeway?",
    intro: "Tell us the exact Dammam destination so the quote matches the actual journey.",
    options: ["Dammam hotel", "Residence", "Business office", "Meeting", "Hospital", "Residential compound", "Other address"],
    placeholder: "Name or address",
    label: "Destination",
    send: "Send my Dammam destination",
    message: "Hi, I'm landing at Bahrain Airport. My Dammam destination is",
  },

  who: {
    business: {
      eyebrow: "Business arrival",
      heading: "Landing for a meeting?",
      body: "A business arrival usually means a fixed meeting time, luggage, no time for a stop and a direct run to a hotel or an office. Share the meeting time when you ask for the fare, so the pickup can be planned with a reasonable buffer. The luxury sedan is available if you want it.",
      note: "We can't guarantee an arrival time before a meeting: the border sets its own pace.",
      link: "Corporate accounts for regular travel",
    },
    family: {
      eyebrow: "Family arrival",
      heading: "Landing with children and luggage?",
      body: "The SUV gives four people more room and a third large case; the van keeps up to seven people together with six. Declare the luggage when you book. If you need a child seat, ask and we'll confirm whether we can provide one.",
      link: "Family and group transfers",
    },
  },

  timing: {
    eyebrow: "When to book",
    heading: "Your flight is fixed. Plan the road around it.",
    body: "Book once your flight is confirmed. Advance booking is especially useful for:",
    cases: ["Early morning arrivals", "Late night arrivals", "Weekends", "Holidays", "Larger groups"],
    note: "Availability isn't guaranteed at short notice, so the earlier we know your flight, the better.",
  },

  roles: {
    eyebrow: "Who handles what",
    heading: "Your driver handles the road. You handle your travel documents.",
    youLabel: "You",
    you: ["Passport", "Visa or permit where required", "Your personal immigration requirements", "Airline requirements", "Your Saudi entry eligibility"],
    usLabel: "Driver and us",
    us: ["Vehicle", "Driver", "Vehicle documentation", "The transport arrangement"],
    note: "We can't guarantee Saudi entry, visa approval, border processing time or an exact arrival time. Flying into Bahrain doesn't change Saudi entry requirements: crossing into Saudi Arabia by road has the same rules as any other Bahrain–Saudi crossing.",
    link: "Documents for the road crossing",
  },

  included: {
    eyebrow: "In the fare",
    heading: "What's included",
    yes: ["Private vehicle", "Driver", "Fuel", "Causeway toll", "Standard border waiting", "Airport pickup", "Flight monitoring", "Meet-and-greet", "Direct transfer to Dammam"],
    noHeading: "Not included",
    no: ["Your Saudi visa or permit", "Your immigration requirements", "Airline tickets", "Time inside the airport before pickup", "Extra waiting beyond what was agreed", "Stops that weren't quoted"],
  },

  pricing: {
    eyebrow: "Fares",
    heading: "Starting fares, BAH to Dammam",
    from: "From",
    names: { sedan: "Sedan", van: "Van", suv: "SUV", luxury: "Luxury sedan" },
    note: "The final fare depends on your flight and arrival details, destination, vehicle, passengers, luggage, timing and any special requirements.",
    cta: "Confirm My Fare on WhatsApp",
    ctaMessage: "Hi, please confirm the fare from Bahrain Airport to Dammam. My details:",
    allFares: "All route fares",
    whyHeading: "Why it costs more than a Bahrain city taxi",
    why: ["Airport coordination", "Flight monitoring", "Arrivals pickup", "Help with luggage", "The causeway crossing", "Two border posts", "Door-to-door in Dammam"],
  },

  flow: {
    eyebrow: "Booking",
    heading: "From flight number to Dammam",
    steps: [
      { n: "01", title: "Send your flight", body: "Flight number, arrival date and time." },
      { n: "02", title: "Send your destination", body: "The Dammam hotel, office or address." },
      { n: "03", title: "Passengers and luggage", body: "How many people, how many large bags." },
      { n: "04", title: "Choose the vehicle", body: "Or let us suggest one." },
      { n: "05", title: "Get the confirmed fare", body: "Before you travel, on WhatsApp." },
      { n: "06", title: "Meet the driver", body: "In BAH arrivals, after baggage claim." },
      { n: "07", title: "Cross to Dammam", body: "Same car, all the way." },
    ],
    previewTag: "Example booking message",
    customer: [
      "Hello, I need a transfer from Bahrain Airport to Dammam.",
      "Flight: GF xxx",
      "Arrival: 14 October, 6:20 PM",
      "Passengers: 2",
      "Large luggage: 3",
      "Destination: Dammam Corniche",
      "Vehicle: SUV",
    ],
    reply: "Thanks. We'll confirm the vehicle and final fare based on your arrival and destination details.",
    send: "Send My Flight Details",
    returnNote: "Flying back out of Bahrain later?",
    returnLink: "Dammam → Bahrain",
  },

  faq: {
    eyebrow: "Questions",
    heading: "BAH to Dammam, answered",
    items: [
      { question: "Do you pick passengers up directly from Bahrain Airport?", answer: "Yes. The driver meets you in the BAH arrivals hall with a name board, after you've cleared immigration and collected your bags, and drives you straight to Dammam." },
      { question: "Does the driver track my flight?", answer: "Yes. We monitor the flight using the flight number you send, so the pickup is timed around your actual landing rather than the scheduled time. Double-check the number when you book." },
      { question: "What happens if my flight is delayed?", answer: "The driver's arrival is adjusted to the actual landing. Waiting isn't unlimited, so for a very long delay, a diversion or a missed connection, message us on WhatsApp and we'll rearrange." },
      { question: "What happens if my flight arrives early?", answer: "The pickup is coordinated around the flight status and the time it takes to clear the airport. If you're through much quicker than expected, message us and the team will tell you where the driver is." },
      { question: "Do I meet the driver immediately after landing?", answer: "No. First you go through Bahrain airport immigration and baggage claim. The driver meets you once you reach the arrivals hall." },
      { question: "Do I need to clear Bahrain immigration before meeting the driver?", answer: "Yes. Airport immigration and baggage claim happen inside the terminal before the pickup. Later, on the road, you'll also pass the Bahrain exit and Saudi entry posts at the causeway." },
      { question: "Can I go directly from BAH to Dammam without stopping in Manama?", answer: "Yes, that's exactly what this route is: arrivals pickup, then straight to the causeway and on to your Dammam address, with no city stop." },
      { question: "How long does BAH to Dammam take?", answer: "Typically {time} of driving once you're in the vehicle, over about {km} km. Border conditions can make it longer, and the time inside the airport comes before that." },
      { question: "Is the {time} estimate from landing, or from when the car leaves?", answer: "From when you're in the car. Airport immigration and baggage claim at BAH aren't included in it, so add however long those take on the day." },
      { question: "Is the King Fahd Causeway toll included?", answer: "Yes, along with the vehicle, driver, fuel, flight monitoring, meet-and-greet and standard waiting at both border posts." },
      { question: "Do I need a Saudi visa if I fly into Bahrain?", answer: "Flying into Bahrain doesn't change the requirements for entering Saudi Arabia. Crossing the causeway has the same entry rules as any other Bahrain–Saudi crossing, so check what applies to you before you travel. We can't advise on visas." },
      { question: "Which vehicle is best for luggage?", answer: "It depends on the count. The sedan takes two large bags, the SUV three, the van six. Two people with four large cases already need more than a sedan. Starting fares: sedan from BHD {sedan}, SUV from BHD {suv}, van from BHD {van}." },
      { question: "Can families book a van?", answer: "Yes. The van takes up to seven passengers and six large suitcases, so a family arriving together stays in one vehicle through both border posts." },
      { question: "Can I book a luxury sedan?", answer: "Yes. The luxury class (Mercedes S-Class or BMW 7 Series) is available for one to three passengers, from BHD {luxury}." },
      { question: "What happens if immigration takes longer than expected?", answer: "At the airport, the pickup is coordinated around when you reach arrivals. At the causeway, standard waiting is included. If a long delay affects your plans in Dammam, the team will talk you through the options." },
      { question: "Can I book the return from Dammam to Bahrain?", answer: "Yes. Give us the date and time and where you need to be dropped in Bahrain, including the airport if you're flying out, and it can be arranged together with this booking." },
      { question: "Can I stop somewhere in Bahrain before crossing?", answer: "This route is priced as a direct connection. If you want a stop in Bahrain, tell us in advance so it's quoted properly rather than treated as a quick detour." },
      { question: "How early should I book?", answer: "As soon as your flight is confirmed. It matters most for early morning or late night arrivals, weekends, holidays and larger groups." },
      { question: "What information do you need for the fare?", answer: "Flight number, arrival date and time, passengers, large luggage, your Dammam destination and any vehicle preference. The form on this page writes that message for you." },
      { question: "Can you take me to a hotel, home or office in Dammam?", answer: "Yes. It's door to door: send the exact destination and the driver takes you there." },
    ],
  },

  final: {
    heading: "Land at BAH. Continue to Dammam.",
    body: "Send us your flight number, arrival time, Dammam destination, passengers and luggage. We'll confirm the vehicle and fare before your journey.",
    primary: "Get My BAH → Dammam Fare",
    secondary: "WhatsApp My Flight Details",
  },

  sticky: { primary: "Get My Fare", whatsapp: "WhatsApp" },
};

export type BahDmmCopy = typeof BAHDMM;
