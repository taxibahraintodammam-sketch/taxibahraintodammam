/**
 * /taxi-bahrain-to-khobar/ — "Khobar is close. But you're still crossing a border."
 *
 * Distances, journey times and fares are NOT typed here: {tokens} are filled
 * from content/routes.ts and content/fares.ts at build time (see
 * fillKhobar in components/khobar/KhobarPage.tsx), so the page can't drift
 * from the published figures. Everything else is limited to what the
 * existing route copy states: 24/7, door-to-door, toll included, standard
 * waiting at both posts, any Bahrain pickup, return trips quoted as two legs.
 */
export const KHOBAR = {
  meta: {
    title: "Taxi Bahrain to Khobar | Private Causeway Transfer 24/7",
    description:
      "Private taxi from Bahrain to Khobar via the King Fahd Causeway. Door-to-door transfers, fixed starting fares, private vehicles and 24/7 service. Confirm your fare on WhatsApp.",
    ogLocale: "en_BH",
  },
  crumb: "Bahrain to Khobar",
  schemaName: "Private taxi from Bahrain to Khobar",

  hero: {
    eyebrow: "Bahrain → Khobar",
    heading: "Bahrain to Khobar, without the cross-border guesswork",
    sub: "Private door-to-door transfers from Bahrain to Khobar via the King Fahd Causeway, with the vehicle, driver and fare confirmed before you travel.",
    primary: "Get My Khobar Fare",
    secondary: "WhatsApp the Booking Team",
    secondaryMessage: "Hi, I'd like a fare from Bahrain to Khobar.",
    from: "Bahrain",
    via: "King Fahd Causeway",
    to: "Khobar",
    stats: [
      { value: "~{km} km", label: "road distance" },
      { value: "{time}", label: "typical door to door" },
      { value: "BHD {sedan}", label: "sedan, starting fare" },
    ],
    caveat: "Typical journey in normal conditions. Allow extra time for border traffic.",
    imageAlt: "A black saloon car crossing a long causeway over the sea at sunset",
  },

  close: {
    eyebrow: "The short run",
    heading: "Khobar is close. But you're still crossing a border.",
    lead: "Khobar is close enough to make the trip feel simple, until you remember you're still crossing an international border.",
    body: [
      "Khobar sits right by the Saudi end of the King Fahd Causeway. Once you're through Saudi immigration, the city is only a short drive further, which makes this one of the shortest standard road trips from Bahrain into Saudi Arabia. It's a big part of why people do it for a single meeting, a shopping afternoon or dinner.",
      "But short isn't the same as simple. You still leave one country and enter another. You still stop at two immigration posts, and you still cross a causeway that everyone else heading for the Eastern Province is using too. The distance is the easy part. The border is what decides your day.",
    ],
    stepsLabel: "Every Khobar trip still involves",
    steps: ["Leaving Bahrain", "Bahrain-side immigration", "Crossing the causeway", "Saudi-side immigration", "The short drive into Khobar"],
  },

  distance: {
    eyebrow: "Planning time",
    heading: "Distance isn't the same as journey time",
    roadLabel: "Road distance",
    road: "~{km} km",
    roadNote: "What a map tells you.",
    doorLabel: "Door to door",
    door: "{time}",
    doorNote: "Typical, in normal conditions.",
    partsLabel: "What's inside that time",
    parts: ["Bahrain pickup", "Bahrain immigration", "Causeway crossing", "Saudi immigration", "Drive to Khobar"],
    body: "The road itself is short. What stretches a Khobar trip is the two immigration posts, and those depend on the day, the hour and how many other people had the same idea. A quiet mid-morning crossing and a Thursday evening one are different trips on the same road.",
    caution: "Treat {time} as a planning reference, not an arrival time. We don't promise a fixed time at the border.",
  },

  map: {
    eyebrow: "The route",
    heading: "One continuous journey, five stages",
    intro: "Tap a stage to see what happens there and who does what.",
    you: "You",
    driver: "Driver",
    stages: [
      {
        key: "pickup",
        name: "Your pickup",
        where: "Any confirmed Bahrain address",
        you: "Be ready with your passport or accepted travel document, and your luggage.",
        driver: "Arrives at the confirmed address and loads the bags.",
      },
      {
        key: "bh",
        name: "Bahrain immigration",
        where: "Bahrain side of the causeway",
        you: "Complete the Bahrain exit formalities with your own documents.",
        driver: "Stays with the vehicle and handles the vehicle side of the crossing.",
      },
      {
        key: "causeway",
        name: "King Fahd Causeway",
        where: "About 25 km over the sea",
        you: "Sit back. This stretch is simply the drive across.",
        driver: "Drives the crossing. The causeway toll is already in your fare.",
      },
      {
        key: "sa",
        name: "Saudi immigration",
        where: "Saudi side of the causeway",
        you: "Complete Saudi entry formalities and follow the officers' instructions.",
        driver: "Waits for you and continues once you're cleared.",
      },
      {
        key: "khobar",
        name: "Khobar",
        where: "Your exact confirmed destination",
        you: "Arrive at the hotel, office, home or shop you booked to.",
        driver: "Drops you and your luggage at the door.",
      },
    ],
  },

  border: {
    eyebrow: "At the border",
    heading: "What actually happens at the border?",
    youHeading: "You, the passenger",
    you: [
      "Present your own passport or accepted travel document",
      "Complete the immigration procedure at each post",
      "Follow the instructions of the border authorities",
    ],
    driverHeading: "The driver",
    driver: [
      "Stays with the vehicle",
      "Handles the vehicle-side requirements where applicable",
      "Continues the journey once your formalities are done",
    ],
    note: "The driver can't guarantee immigration approval, and neither can we: that decision belongs to the authorities. We don't give visa or legal advice. If you're unsure what you need, check with the official sources before you book.",
  },

  sameDay: {
    eyebrow: "Same-day trips",
    heading: "Go to Khobar. Do what you came for. Come back.",
    body: "Because the crossing is short, a lot of Khobar trips are there-and-back in a day. Return trips are quoted as two legs, and it helps to give us your planned return time when you book.",
    uses: ["Business meeting", "Shopping day", "Family visit", "Dinner or an evening out", "A short appointment"],
    loop: ["Bahrain", "Khobar", "Bahrain"],
    example: {
      tag: "Example itinerary",
      heading: "A same-day business meeting",
      stops: [
        { time: "08:00", text: "Pickup in Bahrain" },
        { time: "09:00+", text: "Cross-border journey" },
        { time: "Late morning", text: "Meeting in Khobar" },
        { time: "Afternoon", text: "Return toward Bahrain" },
      ],
      note: "Use the {time} typical journey only as a planning reference, then allow extra buffer for border conditions. If the meeting time is fixed, leave earlier rather than later.",
    },
  },

  day: {
    eyebrow: "More than a drop-off",
    heading: "Khobar for the day, not just a drop-off",
    body: "People cross for shopping, restaurants, family visits, appointments, business meetings and short weekends. If all you need is to get there, a transfer is the straightforward answer. If your day in Khobar has several parts, look at it differently.",
    transfer: {
      label: "A transfer fits",
      plan: ["Bahrain", "Khobar"],
      note: "One pickup, one destination, one fixed fare.",
    },
    hourly: {
      label: "Hourly hire may fit better",
      plan: ["Bahrain", "Khobar", "3 hours of meetings", "Shopping", "Another address", "Return"],
      note: "When the car needs to stay with you between stops.",
    },
    link: "Hourly chauffeur hire",
  },

  ends: {
    eyebrow: "Both ends of the trip",
    heading: "From your door in Bahrain to your door in Khobar",
    pickupHeading: "Picked up anywhere in Bahrain",
    pickups: ["Manama", "Juffair", "Seef", "Muharraq", "Adliya", "Riffa", "Amwaj Islands", "Budaiya", "Isa Town", "Hamad Town", "Sitra", "Bahrain International Airport"],
    pickupNote: "If your pickup point isn't listed, send the exact location and the fare is confirmed against the actual address.",
    dropHeading: "Dropped where you're actually going",
    drops: ["Hotels", "Homes", "Offices", "Commercial districts", "Shopping areas", "The Corniche and waterfront"],
    dropNote: "We don't drop you at a generic taxi stand. The fare is based on the actual pickup and destination address.",
  },

  airport: {
    eyebrow: "From the airport",
    heading: "Landing in Bahrain and heading straight to Khobar?",
    body: "You don't need to stop in Manama first. The driver collects you at Bahrain International Airport and the trip carries on over the causeway to your Khobar address.",
    flow: ["Bahrain International Airport", "Pickup", "King Fahd Causeway", "Saudi immigration", "Khobar"],
    sendLabel: "Send us",
    send: ["Flight number", "Arrival time", "Luggage", "Passenger count", "Khobar address"],
    link: "Airport transfers",
  },

  vehicles: {
    eyebrow: "The vehicle",
    heading: "What's coming with you?",
    intro: "Pick the option that sounds like your trip.",
    options: [
      { key: "sedan", question: "1–3 people, normal luggage", vehicle: "Sedan", capacity: "1–3 passengers · 2 large bags", note: "The usual choice for a meeting, a shopping trip or a couple travelling light." },
      { key: "suv", question: "A family, or extra luggage", vehicle: "SUV", capacity: "1–4 passengers · 3 large bags", note: "Room for a third large suitcase and a little more space." },
      { key: "van", question: "A bigger group", vehicle: "Van", capacity: "Up to 7 passengers · 6 large bags", note: "Everyone in one vehicle through both immigration posts." },
      { key: "luxury", question: "An executive arrival", vehicle: "Luxury sedan", capacity: "1–3 passengers · 2 large bags", note: "Mercedes S-Class or BMW 7 Series for a client meeting or a special occasion." },
    ],
    from: "From",
    modelNote: "The class is confirmed at booking; a specific model isn't guaranteed unless the team confirms it.",
    fleet: "Compare the fleet",
  },

  fare: {
    eyebrow: "The fare",
    heading: "What changes the fare?",
    startLabel: "Sedan, starting fare",
    body: "The starting fare is where a normal Bahrain pickup to a normal Khobar address begins. Your exact fixed fare is confirmed against the details of your trip.",
    factors: ["Pickup address", "Destination address", "Travel date", "Pickup time", "Passenger count", "Vehicle", "Return requirements", "Special stops"],
    confirm: "Confirm your exact fare on WhatsApp before departure.",
    allFares: "All route fares",
  },

  included: {
    eyebrow: "In the fare",
    heading: "What's included",
    yes: ["Private vehicle", "Driver", "Fuel", "Causeway toll", "Standard waiting at both immigration posts", "Door-to-door journey"],
    noHeading: "Not included",
    no: ["Personal purchases", "Visa or permit fees", "Immigration decisions", "Additional stops that weren't confirmed", "Unplanned route changes"],
  },

  documents: {
    eyebrow: "Before you go",
    heading: "Before you leave Bahrain",
    items: [
      "Passport or accepted travel document",
      "Any Saudi entry permission you need",
      "Your booking details",
      "The Khobar destination address",
      "Flight details, if you're coming from the airport",
    ],
    note: "Each passenger is responsible for their own immigration documents. This isn't legal or visa advice.",
    link: "Documents for the road crossing",
  },

  returnTrip: {
    eyebrow: "The way back",
    heading: "Coming back to Bahrain?",
    options: [
      { key: "1", title: "Book the return together", body: "Give us your planned return time when you book and both legs are confirmed in one go." },
      { key: "2", title: "Book the return later", body: "If you don't know yet when you'll be finished, book the way back separately when you do." },
    ],
    note: "If your return time changes, message the booking team with the new plan. A later vehicle depends on availability, so the earlier you tell us the better.",
    link: "Khobar → Bahrain",
  },

  versus: {
    eyebrow: "Khobar or Dammam?",
    heading: "Book the city you're actually going to",
    khobar: { name: "Khobar", note: "Right by the Saudi side of the causeway." },
    dammam: { name: "Dammam", note: "Further along the Saudi side." },
    km: "km",
    typical: "typical",
    sedanFrom: "sedan from",
    body: "If your destination is in Khobar, don't book a Dammam transfer just because Dammam is the more familiar name. If the address is near the Khobar–Dammam boundary and you're not sure which it counts as, send the exact address and the team confirms the right route and fare.",
    link: "Bahrain → Dammam",
  },

  booking: {
    eyebrow: "Book",
    heading: "Give us the address. We'll handle the route.",
    body: "The exact addresses are what let us confirm the right fare. Fill in what you know and it opens WhatsApp with your message ready.",
    exampleTag: "Example booking",
    example: [
      { label: "Pickup", value: "Seef, Bahrain" },
      { label: "Destination", value: "Khobar hotel" },
      { label: "Passengers", value: "2" },
      { label: "Large luggage", value: "2" },
      { label: "Vehicle", value: "Sedan" },
      { label: "Date · Time", value: "Example only" },
    ],
    exampleFlow: ["Pickup", "Bahrain immigration", "Causeway", "Saudi immigration", "Khobar hotel"],
    fields: {
      pickup: "Pickup location",
      pickupPlaceholder: "Area, hotel or airport in Bahrain",
      destination: "Khobar destination",
      destinationPlaceholder: "Hotel, office or address in Khobar",
      date: "Date",
      time: "Time",
      passengers: "Passengers",
      luggage: "Luggage",
      luggagePlaceholder: "e.g. 2 large",
      vehicle: "Vehicle",
    },
    vehicles: ["Sedan", "SUV", "Van", "Luxury sedan", "Not sure"],
    submit: "Get My Khobar Fare",
    secondary: "WhatsApp Us",
    messageIntro: "Hi, I'd like a fare from Bahrain to Khobar.",
    notSet: "not set",
    fullBooking: "Prefer the full booking form?",
  },

  faq: {
    eyebrow: "Questions",
    heading: "Bahrain to Khobar, answered",
    items: [
      {
        question: "Why is Bahrain to Khobar one of the shortest Saudi routes?",
        answer:
          "Khobar sits right by the Saudi end of the King Fahd Causeway. Once you've cleared Saudi immigration there's only a short drive into the city, unlike Dammam, Jubail or Al Ahsa, which are further along. The border crossing itself is the same for every Saudi destination.",
      },
      {
        question: "How long does Bahrain to Khobar usually take?",
        answer:
          "Typically {time} door to door in normal conditions. That includes the pickup, both immigration posts, the causeway and the drive into Khobar. Border queues can make it longer, so allow extra time if you have a fixed appointment.",
      },
      {
        question: "How far is Khobar from Bahrain?",
        answer:
          "About {km} km by road from a typical Bahrain pickup, including roughly 25 km across the causeway. Distance is the smaller part of the story: the immigration posts usually decide how long the trip takes.",
      },
      {
        question: "Does the journey cross the King Fahd Causeway?",
        answer:
          "Yes. It's the only road link between Bahrain and Saudi Arabia, so every Bahrain to Khobar trip goes through Bahrain immigration, over the causeway and through Saudi immigration.",
      },
      {
        question: "Is the causeway toll included?",
        answer: "Yes. The toll is included in the fare, along with fuel, the driver and standard waiting at both immigration posts.",
      },
      {
        question: "Can I book a same-day return?",
        answer:
          "Yes. Returns are quoted as two legs. Give us your planned return time when you book and both directions are confirmed together. If you don't know when you'll finish, you can book the way back separately later, subject to availability.",
      },
      {
        question: "Can I go from Bahrain Airport directly to Khobar?",
        answer:
          "Yes. The driver collects you at Bahrain International Airport and continues straight over the causeway to your Khobar address. Send your flight number, arrival time, passenger count, luggage and destination address when you book.",
      },
      {
        question: "Can I book a private taxi for a business meeting in Khobar?",
        answer:
          "Yes, it's one of the most common reasons for this trip. Work back from your meeting time using the {time} typical journey, add a buffer for the border, and book the return at the same time if you know when you'll be done.",
      },
      {
        question: "What vehicle should I choose for 4 passengers with luggage?",
        answer:
          "The SUV takes up to four passengers with three large suitcases plus hand luggage. If you have more bags than that, or more people, the van takes up to seven passengers and six large suitcases. SUV fares on this route start from BHD {suv}, vans from BHD {van}.",
      },
      {
        question: "Can I book a luxury sedan?",
        answer:
          "Yes. The luxury class (Mercedes S-Class or BMW 7 Series) is available on this route for one to three passengers, starting from BHD {luxury}. It's often booked for client meetings and executive arrivals.",
      },
      {
        question: "What documents do I need to cross?",
        answer:
          "Each passenger needs a valid passport or accepted travel document and any Saudi entry permission their situation requires. Everyone presents their own documents at both posts. We can't advise on visas, so check the official sources if you're unsure.",
      },
      {
        question: "Can the driver help with luggage at the border?",
        answer:
          "Your luggage travels in the same vehicle the whole way, so there's no changing cars at the border. The driver loads the bags at pickup and unloads them at your Khobar door. If the authorities want to inspect luggage at either post, follow their instructions; the driver stays with the vehicle.",
      },
      {
        question: "What if my destination is between Khobar and Dammam?",
        answer:
          "Send the exact address. The two cities run into each other and some addresses aren't obviously one or the other. The team confirms the correct route and fare against the actual address, so you don't have to guess.",
      },
      {
        question: "Can I use hourly chauffeur hire if I have multiple stops?",
        answer:
          "Yes. If your Khobar day includes several meetings, shopping or more than one address before you come back, hourly hire keeps the same vehicle and driver with you between stops. For a straight there-and-back, a transfer is simpler.",
      },
      {
        question: "Is the service available at night?",
        answer: "Yes, we run 24/7. Late evening and early morning trips are booked the same way: send the pickup, destination and time and we confirm the fare.",
      },
    ],
  },

  final: {
    heading: "Your Khobar trip starts with the address",
    body: "Send us your Bahrain pickup point, Khobar destination, travel time and passenger details. We'll confirm the vehicle and fixed fare before you travel.",
    primary: "Get My Khobar Fare",
    secondary: "WhatsApp the Team",
    trust: "Private vehicle · Door-to-door · 24/7",
  },

  sticky: { primary: "Get Khobar Fare", whatsapp: "WhatsApp" },
};

export type KhobarCopy = typeof KHOBAR;
