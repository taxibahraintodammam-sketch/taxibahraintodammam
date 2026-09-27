/**
 * /hourly-chauffeur-hire/ — "book the time, not the trip".
 *
 * Facts are limited to what the existing service copy states: vehicle +
 * driver + fuel for an agreed block of hours, waiting between stops
 * included, same driver and vehicle, Bahrain / Eastern Province / cross-
 * causeway, causeway toll included when the day crosses, extra time at the
 * same hourly rate, minimum block confirmed per day, sedan/SUV/van/luxury,
 * starting reference from services.ts. No packages, no hour-based prices,
 * no unused-hours policy: those aren't published, so they aren't claimed.
 */
export const HOURLY = {
  meta: {
    title: "Hourly Chauffeur Hire Bahrain & Saudi Arabia | Private Driver",
    description:
      "Book a private vehicle and driver by the hour for meetings, family days, sightseeing and multi-stop journeys across Bahrain and Saudi Arabia. Waiting between stops included.",
    ogLocale: "en_BH",
  },
  crumb: "Hourly Chauffeur Hire",
  schemaName: "Hourly chauffeur hire in Bahrain and Saudi Arabia",

  hero: {
    eyebrow: "Hourly chauffeur hire",
    heading: "Book the day. Keep the driver.",
    sub: "When your day has meetings, errands, family visits or several destinations, hourly chauffeur hire keeps the same private vehicle and driver with you for the agreed time.",
    promise: "Book the time. Keep the vehicle. Move around without starting a new booking every time.",
    primary: "Plan My Chauffeur Day",
    secondary: "WhatsApp the Chauffeur Team",
    secondaryMessage: "Hi, I'd like to book a chauffeur by the hour. Here's roughly what my day looks like:",
    cardTitle: "A day, illustrated",
    schedule: [
      { time: "09:00", place: "Bahrain office" },
      { time: "11:30", place: "Client meeting" },
      { time: "14:00", place: "Lunch" },
      { time: "16:00", place: "Dammam" },
      { time: "19:00", place: "Hotel" },
    ],
    marker: "Same vehicle · same driver",
    illustration: "Illustration of how the service works, not a real booking.",
    imageAlt: "A chauffeur stands by the open rear door of a black SUV outside a hotel entrance in the evening",
  },

  decide: {
    eyebrow: "The first question",
    heading: "Do you need a taxi, or a vehicle for the day?",
    story: [
      "Some days are simple. Hotel to airport. Airport to hotel. Done.",
      "Other days aren't. You might have a meeting in Dammam at 10, another in Khobar after lunch, and a flight from Bahrain that evening. Booking a new taxi every time you leave a building quickly becomes more work than the journey itself.",
    ],
    transfer: {
      label: "Transfer",
      line: "You book the journey.",
      examples: ["Hotel → Airport", "Airport → Hotel", "Bahrain → Dammam"],
      note: "One pickup, one destination, one fixed fare. The right choice when you know exactly where you're going.",
    },
    hourly: {
      label: "Hourly chauffeur",
      line: "You book the time.",
      examples: ["Office → Meeting → Restaurant → Hotel", "Hotel → Family home → Shopping → Airport", "Bahrain → Dammam → Khobar → Bahrain"],
      note: "One vehicle and one driver for an agreed block of hours, going wherever the day needs to go.",
    },
  },

  selector: {
    eyebrow: "Your day",
    heading: "What does your day look like?",
    intro: "Pick the kind of day closest to yours. These are examples of how a day can be shaped, not fixed itineraries or packages.",
    waits: "Driver waits",
    vehicleLabel: "Usually suits",
    crossesLabel: "Crosses the causeway",
    tag: "Example schedule",
    days: [
      {
        key: "business",
        label: "Business",
        stops: [
          { time: "09:00", place: "Office" },
          { time: "11:00", place: "Client" },
          { time: "14:00", place: "Meeting" },
          { time: "17:00", place: "Hotel" },
        ],
        vehicle: "Sedan",
        crosses: false,
        note: "Three addresses, gaps you can't predict exactly, and no time to wait for a car between them.",
      },
      {
        key: "family",
        label: "Family",
        stops: [
          { time: "10:00", place: "Hotel" },
          { time: "12:00", place: "Family visit" },
          { time: "15:00", place: "Shopping" },
          { time: "18:00", place: "Dinner" },
        ],
        vehicle: "SUV or van",
        crosses: false,
        note: "Shopping bags stay in the car while you eat. Nobody has to hail anything with children in tow.",
      },
      {
        key: "sightseeing",
        label: "Sightseeing",
        stops: [
          { time: "09:00", place: "Bahrain" },
          { time: "11:00", place: "Causeway" },
          { time: "13:00", place: "Dammam" },
          { time: "16:00", place: "Khobar" },
          { time: "20:00", place: "Bahrain" },
        ],
        vehicle: "Sedan or SUV",
        crosses: true,
        note: "A day with no single destination: the car goes where the day goes, and brings you back.",
      },
      {
        key: "executive",
        label: "Executive",
        stops: [
          { time: "08:30", place: "Airport arrival" },
          { time: "10:00", place: "Head office" },
          { time: "13:00", place: "Lunch meeting" },
          { time: "15:30", place: "Second office" },
          { time: "18:00", place: "Hotel" },
        ],
        vehicle: "Luxury sedan",
        crosses: false,
        note: "Meeting times move. The vehicle stays put until you're ready for the next one.",
      },
      {
        key: "project",
        label: "Project",
        stops: [
          { time: "07:30", place: "Accommodation" },
          { time: "09:00", place: "Site" },
          { time: "12:00", place: "Supplier" },
          { time: "15:00", place: "Office" },
          { time: "17:30", place: "Accommodation" },
        ],
        vehicle: "Van",
        crosses: false,
        note: "A small team and some materials, moving together around a temporary schedule.",
      },
    ],
  },

  waits: {
    eyebrow: "The driver waits",
    heading: "You don't start a new booking every time you get out of the car.",
    body: "With hourly hire, the vehicle and driver stay with your booking for the agreed time. Waiting between stops is built into the hourly arrangement rather than charged on top, so whether you're inside for twenty minutes or two hours, the car is there when you come out.",
    situations: ["In a meeting", "Visiting family", "Shopping", "Having lunch", "At an appointment", "Moving between several addresses"],
    limit: "Waiting is part of the arrangement during the booked period. It isn't unlimited: if the day goes past the agreed hours, the extra time is charged at the same hourly rate.",
    toggle: { transfer: "Normal transfer", hourly: "Hourly chauffeur" },
    transferFlow: [
      { kind: "stop", text: "Pickup" },
      { kind: "stop", text: "Destination" },
      { kind: "end", text: "Trip ends" },
      { kind: "rebook", text: "Need another stop? New booking" },
    ],
    hourlyFlow: [
      { kind: "stop", text: "Pickup" },
      { kind: "stop", text: "Stop" },
      { kind: "wait", text: "Driver waits" },
      { kind: "stop", text: "Next stop" },
      { kind: "wait", text: "Driver waits" },
      { kind: "stop", text: "Next stop" },
      { kind: "stop", text: "Final destination" },
    ],
    compareLabel: "Compare the two",
  },

  kinds: {
    eyebrow: "Who it's for",
    heading: "What kind of day is this for?",
    compact: [
      {
        title: "Business day",
        body: "Several meetings in Dammam, Khobar or around Manama. Keeping one vehicle means you walk out of one meeting and into the car for the next, instead of standing on a pavement refreshing an app. If a meeting finishes early, you just leave early.",
      },
      {
        title: "Airport day",
        body: "Landing and going straight into a day of appointments before the hotel. An airport pickup followed by more movement can be arranged as an hourly booking where that suits the day better than separate transfers. Tell us the flight and what comes after it.",
      },
      {
        title: "Project day",
        body: "A small team needs a vehicle around a temporary schedule: accommodation, site, supplier, office. For a one-off or a few days, hourly hire keeps it simple. For something recurring across weeks, a corporate account is usually the better conversation.",
        link: { label: "Corporate accounts", href: "/corporate-accounts" },
      },
    ],
    executive: {
      eyebrow: "Executive day",
      heading: "When the schedule is the priority",
      body: "For a visiting executive, the problem is rarely the drive. It's the uncertainty: the meeting that runs over, the lunch that moves, the second office that suddenly wants to see you at four. A vehicle and driver on standby for the agreed hours absorbs that without a phone call to rebook every leg.",
      uses: ["Client meetings", "Executive visits", "Airport arrivals", "Several business locations", "Meeting times that change"],
      luxury: "If you want the Mercedes S-Class or BMW 7 Series for the day, it's available for hourly hire as well as point-to-point transfers.",
      link: "VIP luxury transfer",
    },
    family: {
      eyebrow: "Family day",
      heading: "One vehicle for the whole family day",
      route: ["Hotel", "Family home", "Shopping", "Restaurant", "Second family address", "Hotel"],
      body: "A family visit rarely means one address. There's the grandparents, then the cousins across town, a stop for shopping, dinner somewhere in between. Booked as separate trips, that's five fares and five waits for a car with tired children. Booked by the hour, the bags stay in the boot and the car is outside when you're ready.",
      practical: "Tell us how many people, how many children and roughly what you'll be carrying. If you need a child seat, ask when booking rather than assuming one will be there.",
      link: "Family & group transfers",
    },
    sightseeing: {
      eyebrow: "Exploring",
      heading: "Some days don't have one destination.",
      places: ["Bahrain", "Dammam", "Khobar", "Al Ahsa / Hofuf"],
      body: "If the point of the day is to see a few places rather than get to one, hourly hire usually makes more sense than buying separate transfers and waiting for a car at each. Al Ahsa is a good example: it's a longer drive, and once you're there the day has several stops, not one.",
      note: "We're a transport service, not a tour guide: you choose where to go, and we drive.",
      links: { alahsa: "Bahrain → Al Ahsa / Hofuf", guide: "A weekend in Bahrain from Dammam" },
    },
  },

  causeway: {
    eyebrow: "Across the border",
    heading: "Yes, your day can cross the causeway.",
    body: "Hourly hire works entirely within Bahrain, entirely within the Eastern Province, or across the King Fahd Causeway and back. The vehicle and driver stay with the booking on both sides of the border.",
    flow: ["Bahrain", "Saudi Arabia", "Several stops", "Bahrain"],
    reverse: "Or the other way round: start in Saudi Arabia, spend the day in Bahrain, go back.",
    conditions: [
      "The normal immigration process applies at both posts.",
      "Every passenger needs their own valid travel documents.",
      "The causeway toll is included when the booking crosses the border.",
      "Border processing can move the rest of the schedule.",
      "The booked time should leave room for the crossing.",
    ],
    link: "About the King Fahd Causeway crossing",
    timing: "We don't quote a fixed time for the border. It depends on the day, the queue and the checks.",
    example: {
      tag: "Example itinerary, not a standard package",
      heading: "An 8-hour business day",
      stops: [
        { time: "08:00", place: "Pickup in Manama" },
        { time: "09:30", place: "Dammam meeting" },
        { time: "11:30", place: "Second meeting" },
        { time: "13:00", place: "Lunch" },
        { time: "15:00", place: "Khobar client visit" },
        { time: "17:00", place: "Return toward Bahrain" },
        { time: "19:00", place: "Drop-off" },
      ],
      point: "The exact times don't matter. What matters is that the same vehicle is there while the day unfolds, including when the 11:30 becomes a 12:15.",
    },
  },

  hours: {
    eyebrow: "Planning",
    heading: "How many hours should I book?",
    intro: "Start from when you want to be collected and when you expect to be finished, then think about the driving between stops. That window is what you're booking.",
    formula: ["Start time", "Expected finish", "Travel between stops", "Booking window"],
    start: "Start",
    finish: "Finish",
    window: "Your window",
    hoursUnit: "hours",
    clockLabel: "Booking window on a 24-hour clock",
    crossing: "Crossing the causeway?",
    crossingNote: "Leave extra room in the window for the border.",
    tiers: [
      { title: "A short block", body: "A couple of meetings or errands, close together." },
      { title: "A longer day", body: "Several appointments with gaps between them." },
      { title: "A full day", body: "Many stops, sightseeing, an executive schedule or a border crossing." },
    ],
    note: "There's no fixed package. Tell us what your day looks like and we'll confirm the appropriate minimum block and the fare.",
  },

  overrun: {
    eyebrow: "When plans change",
    heading: "Meetings run late. Plans change.",
    body: "If the day runs past the booked period, the extra time is charged at the same hourly rate. No surprise fee for the overrun, and no pretending it's free either.",
    example: { tag: "Example", booked: "Booked", actual: "Actual", extra: "Additional", bookedValue: "6 hours", actualValue: "7 hours", extraValue: "1 hour at the same hourly rate" },
    earlyHeading: "What if my day finishes early?",
    early: "If your plans finish earlier than expected, the final fare depends on the confirmed booking terms. Ask the team about your booking before assuming anything about unused hours.",
    earlyLink: "Cancellation and refund policy",
  },

  vehicles: {
    eyebrow: "The vehicle",
    heading: "Choose the vehicle around your day",
    formula: ["People", "Luggage", "Purpose", "Day length"],
    rows: [
      { name: "Sedan", people: "1–3 passengers", use: "Meetings and personal travel", slug: "sedan-camry-sonata" },
      { name: "SUV", people: "1–4 passengers", use: "Extra luggage, family days", slug: "suv-gmc-tahoe" },
      { name: "Van", people: "Up to 7 passengers", use: "Groups, or a team with materials", slug: "van-hiace-hyundai-h1" },
      { name: "Luxury", people: "1–3 passengers", use: "Executive and VIP days", slug: "luxury-mercedes-s-class" },
    ],
    fleet: "Compare the whole fleet",
  },

  pricing: {
    eyebrow: "The fare",
    heading: "Tell us your day. We'll price the actual schedule.",
    body: "There are no off-the-shelf hourly packages. The fare is worked out from the day you describe and confirmed before you travel.",
    fromLabel: "Starting reference",
    factors: ["Number of hours", "Pickup point", "Vehicle", "Stops", "Timing", "Cross-border travel", "The final schedule"],
    cta: "Get My Hourly Fare",
  },

  included: {
    eyebrow: "What you get",
    heading: "Your booking covers",
    yes: ["Vehicle", "Driver", "Fuel", "Waiting between stops", "Causeway toll, if the booking crosses the border"],
    no: ["Entry visas or permits", "Attraction tickets", "Shopping and purchases", "Third-party fees", "Extra requirements that weren't confirmed"],
    noHeading: "Not included",
    note: "Waiting between stops is part of the hourly arrangement during the agreed booking period.",
  },

  build: {
    eyebrow: "Plan it",
    heading: "Build your day",
    body: "Fill in what you know. It opens WhatsApp with your schedule written out, and we reply with the vehicle and fare.",
    fields: {
      date: "Date",
      start: "Start time",
      hours: "Expected hours",
      hoursPlaceholder: "e.g. 8",
      pickup: "First pickup",
      pickupPlaceholder: "Hotel, office or area",
      destinations: "Main destinations",
      destinationsPlaceholder: "e.g. Dammam, Khobar, back to Bahrain",
      stops: "Approximate stops",
      passengers: "Passengers",
      luggage: "Luggage",
      luggagePlaceholder: "e.g. 2 suitcases",
      vehicle: "Vehicle",
      crossing: "Cross the causeway?",
    },
    vehicles: ["Not sure yet", "Sedan", "SUV", "Van", "Luxury"],
    crossingOptions: ["Not sure", "Yes", "No, one country only"],
    submit: "Send My Schedule on WhatsApp",
    messageIntro: "Hi, I'd like an hourly chauffeur.",
    messageOutro: "Please confirm the hourly fare.",
    notSet: "not set",
    exampleHeading: "An example request",
    exampleTag: "Example message",
    example: [
      "Hi, I need a chauffeur for 8 hours on 12 October.",
      "Pickup: Manama",
      "First stop: Dammam",
      "Stops: 3 meetings",
      "Passengers: 2",
      "Vehicle: Sedan",
      "Return: Bahrain",
      "Please confirm the hourly fare.",
    ],
    exampleNote: "That's enough for the team to quote: the date, how long, where it starts, where it goes, who's coming and in what. You don't need exact times for every stop.",
    fullBooking: "Prefer the full booking form?",
  },

  documents: {
    eyebrow: "Border documents",
    heading: "Crossing the causeway? Check your documents.",
    points: [
      "Every passenger needs valid travel documents.",
      "Any Saudi or Bahrain entry permission you need is your own responsibility.",
      "Immigration decisions are made by the relevant authorities, not by us or the driver.",
      "We handle the vehicle journey.",
      "The crossing takes time out of the day, so plan the booking window around it.",
    ],
    note: "This isn't visa or legal advice. Check with the official authorities if you're unsure.",
    link: "Documents for the road crossing",
  },

  faq: {
    eyebrow: "Questions",
    heading: "Hourly hire, explained",
    items: [
      {
        question: "What is hourly chauffeur hire?",
        answer:
          "You book a vehicle and driver for an agreed block of hours instead of a single trip. During that time the car goes where your day needs it to go, and the driver waits between stops. Fuel is included, and so is the causeway toll if the day crosses the border.",
      },
      {
        question: "What's the difference between hourly hire and a normal taxi?",
        answer:
          "A normal transfer is priced for one journey: pickup, destination, done. If you then need to go somewhere else, that's a new booking. With hourly hire you book the time, so the same vehicle and driver stay with you for the agreed hours, however many stops that involves.",
      },
      {
        question: "Can the driver wait while I attend a meeting?",
        answer:
          "Yes. Waiting between stops is part of the hourly arrangement, not an extra charge on top, whether you're in a meeting, visiting family or having lunch. It applies within the booked hours.",
      },
      {
        question: "Can I make multiple stops?",
        answer:
          "Yes, that's what hourly hire is for. Give us the main destinations and roughly how many stops you expect when you ask for a fare, so we can plan the right block of time.",
      },
      {
        question: "Can I use hourly hire across the King Fahd Causeway?",
        answer:
          "Yes. The day can stay in Bahrain, stay in the Eastern Province, or cross between them, and the vehicle and driver stay with you either way. The normal immigration process applies, every passenger needs their own documents, and the toll is included when the booking crosses.",
      },
      {
        question: "Can I start in Bahrain and finish in Saudi Arabia?",
        answer:
          "Yes, or the other way round. Tell us where the day starts and where it ends when you ask for the fare, since that affects both the time needed and the price.",
      },
      {
        question: "Is waiting included?",
        answer:
          "Waiting between stops during the agreed booking period is included. Time beyond the booked period is charged at the same hourly rate.",
      },
      {
        question: "What happens if I need more time?",
        answer:
          "Tell the driver or the team as soon as you know. If the day runs past the booked hours, the extra time is charged at the same hourly rate. For example, a six-hour booking that becomes seven hours adds one hour at that rate.",
      },
      {
        question: "What is the minimum number of hours?",
        answer:
          "There isn't a single fixed minimum. It depends on the day you're planning: the hours, the stops and whether you're crossing the border. Describe your day and we'll confirm the minimum block and the fare.",
      },
      {
        question: "What if my day finishes early?",
        answer:
          "The final fare depends on the confirmed booking terms. Ask the team about your specific booking rather than assuming unused hours are refunded or carried over, and see the cancellation and refund policy.",
      },
      {
        question: "Which vehicle should I choose?",
        answer:
          "For one to three people and meetings, the sedan. For up to four people or extra luggage, the SUV. For up to seven people, or a team carrying materials, the van. For an executive or VIP day, the luxury sedan. Tell us who's travelling and we'll suggest one.",
      },
      {
        question: "Can I use hourly hire for sightseeing?",
        answer:
          "Yes, when the day has several stops rather than one destination. You decide where to go; we provide the vehicle and driver. We're not a tour guide, so entry tickets and bookings at the places you visit are up to you.",
      },
      {
        question: "Can families use hourly chauffeur hire?",
        answer:
          "Yes, and it's often easier than separate trips when a family visit covers several addresses, shopping and a meal. Tell us the number of people, the children's ages and the luggage. Ask about a child seat when booking rather than assuming one is provided.",
      },
      {
        question: "Can I book a luxury vehicle by the hour?",
        answer:
          "Yes. The Mercedes S-Class or BMW 7 Series luxury class is available for hourly hire as well as point-to-point transfers.",
      },
      {
        question: "How do I get the exact fare?",
        answer:
          "Send the date, start time, expected hours, first pickup, main destinations, number of passengers, luggage, vehicle and whether you're crossing the causeway. The form on this page writes that message for you on WhatsApp. We confirm the fare before you travel.",
      },
    ],
  },

  final: {
    heading: "Tell us what your day looks like",
    body: "Give us your start point, hours, main stops and passenger count. We'll work out the appropriate vehicle and confirm the fare before you travel.",
    primary: "Plan My Chauffeur Day",
    secondary: "WhatsApp the Team",
    small: "Vehicle + driver + fuel + waiting between stops",
  },

  sticky: { primary: "Plan My Chauffeur Day", whatsapp: "WhatsApp" },
};

export type HourlyCopy = typeof HOURLY;
