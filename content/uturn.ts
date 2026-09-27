/**
 * /visa-u-turn-service/ — "One journey. Four checkpoints. One driver."
 *
 * Facts are limited to what content/services.ts already states for this
 * service: round trip Bahrain → Saudi → Bahrain over the ~25 km causeway,
 * same driver and vehicle both ways, 24/7, fuel, toll both directions,
 * standard waiting at all four checkpoints, typically 3–5 hours in total
 * depending on queues and Saudi-side time, extended waiting quoted by plan,
 * sedan/SUV/van. {sedan} {suv} {van} are filled from content/fares.ts.
 * No visa rules, no timing promises, no outcome guarantees.
 */
export const UTURN = {
  meta: {
    title: "Bahrain Visa U-Turn Service | Saudi Exit & Re-Entry Transport",
    description:
      "Private vehicle and driver for a Bahrain → Saudi Arabia → Bahrain round trip over the King Fahd Causeway. Same driver both ways, 24/7, fare confirmed on WhatsApp before you travel.",
    ogLocale: "en_BH",
  },
  crumb: "Visa U-Turn Service",
  schemaName: "Visa U-turn round-trip transport, Bahrain to Saudi Arabia and back",
  hours: "3–5 hours",

  hero: {
    eyebrow: "Visa U-turn · exit and re-entry",
    heading: "One driver. One vehicle. One complete U-turn.",
    sub: "Cross into Saudi Arabia over the King Fahd Causeway, complete your border formalities, and come back to Bahrain in the same car with the same driver.",
    facts: ["Bahrain → Saudi Arabia → Bahrain", "Private vehicle and driver", "Round trip", "24/7"],
    loopLabel: "The loop",
    loop: {
      out: ["Bahrain", "Bahrain exit", "Causeway", "Saudi entry"],
      turn: "Saudi side",
      back: ["Saudi exit", "Causeway", "Bahrain entry", "Bahrain"],
    },
    illustration: "Diagram of the route, not live tracking.",
    secondary: "WhatsApp Us",
    secondaryMessage: "Hi, I'd like a fare for a visa U-turn from Bahrain to Saudi Arabia and back.",
  },

  plan: {
    heading: "Plan my U-turn",
    fields: {
      pickup: "Pickup location",
      pickupPlaceholder: "Area, hotel or address in Bahrain",
      date: "Date",
      time: "Preferred departure",
      passengers: "Passengers",
      vehicle: "Vehicle",
      stay: "Expected time in Saudi Arabia",
    },
    vehicles: ["Sedan", "SUV", "Van", "Not sure"],
    stays: ["Return after clearing Saudi entry", "A short stay", "Several hours", "Not sure yet"],
    submit: "Get My U-Turn Fare",
    note: "Opens WhatsApp with your details. The fare is confirmed by the team, not calculated here.",
    messageIntro: "Hi, I need a visa U-turn from Bahrain to Saudi and back.",
    notSet: "not set",
  },

  what: {
    eyebrow: "First things first",
    heading: "What exactly is a visa U-turn?",
    body: [
      "It's a round trip. You leave Bahrain, cross the King Fahd Causeway into Saudi Arabia, complete the border formalities on the Saudi side, and then come back into Bahrain. People also call it an exit and re-entry, or a border run.",
      "Our part is the journey: the car, the driver, the crossing in both directions and the waiting at the checkpoints. Your part is everything to do with your own documents and your eligibility to leave and come back. Keeping those two things separate makes the whole trip easier to plan.",
    ],
    ours: "We handle the journey",
    yours: "You handle your documents and eligibility",
  },

  journey: {
    eyebrow: "The whole loop",
    heading: "Your journey, step by step",
    intro: "Select a stage to see what happens there. Immigration stages are marked; decisions and processing there belong to the authorities.",
    checkpoint: "Immigration",
    whoLabel: "Who",
    stages: [
      { n: "01", name: "Pickup in Bahrain", body: "The driver collects you from the agreed Bahrain address.", who: "Driver", kind: "road" },
      { n: "02", name: "Bahrain exit", body: "You complete the Bahrain exit formalities at the start of the causeway. The driver stays with the vehicle.", who: "You and the authorities", kind: "check" },
      { n: "03", name: "King Fahd Causeway", body: "The car crosses the roughly 25 km causeway to the Saudi side.", who: "Driver", kind: "road" },
      { n: "04", name: "Saudi entry", body: "You complete the Saudi entry formalities. Processing time depends on the checkpoint, not the driver.", who: "You and the authorities", kind: "check" },
      { n: "05", name: "Saudi side", body: "Depending on the plan you agreed, the car turns around once you're through, or waits, or comes back at an agreed time.", who: "As agreed when you book", kind: "turn" },
      { n: "06", name: "Saudi exit", body: "You complete the Saudi exit formalities for the return.", who: "You and the authorities", kind: "check" },
      { n: "07", name: "Causeway return", body: "The same car crosses back toward Bahrain.", who: "Driver", kind: "road" },
      { n: "08", name: "Bahrain entry", body: "You complete the Bahrain entry formalities. The decision to admit you is made by the officers there.", who: "You and the authorities", kind: "check" },
      { n: "09", name: "Back to your address", body: "The driver takes you to your pickup point or the destination you agreed. Journey complete.", who: "Driver", kind: "road" },
    ],
  },

  checkpoints: {
    eyebrow: "The part people underestimate",
    heading: "Four immigration points, not one",
    intro: "A U-turn isn't just a drive to Saudi Arabia and back. You pass through four immigration stages, two in each direction.",
    items: [
      { n: "01", name: "Bahrain exit", note: "Leaving Bahrain" },
      { n: "02", name: "Saudi entry", note: "Arriving in Saudi Arabia" },
      { n: "03", name: "Saudi exit", note: "Leaving Saudi Arabia" },
      { n: "04", name: "Bahrain entry", note: "Coming back into Bahrain" },
    ],
    causeway: "Causeway",
    turn: "Turn",
    note: "Each passenger presents their own documents at each point. Standard waiting at all four is included in the fare.",
  },

  roles: {
    eyebrow: "Who handles what",
    heading: "Two sides of the same trip",
    oursHeading: "Handled by us",
    ours: ["Licensed vehicle", "Driver", "Fuel", "Causeway toll, both directions", "Transport there and back", "Standard waiting at the checkpoints", "The same vehicle and driver for the whole trip", "Booking coordination"],
    yoursHeading: "Handled by you",
    yours: ["Your passport", "Any visa or permit you need", "Your personal immigration eligibility", "Immigration declarations and procedures", "Any passenger-side fees or requirements"],
    authorities: "Decisions at each checkpoint are made by the immigration officers.",
  },

  outcome: {
    heading: "Your booking is for transport, not an immigration outcome.",
    body: "We can provide the vehicle and driver for the complete round trip. We can't guarantee what happens at the checkpoints, and nobody honest can. That includes:",
    items: ["Entry into Saudi Arabia", "Exit from Saudi Arabia", "Re-entry into Bahrain", "Visa approval", "Any residency outcome", "How long immigration processing takes"],
    close: "Final decisions are made by the immigration authorities. If you're unsure how a U-turn affects your own situation, check with the official authorities or a qualified adviser before you travel.",
  },

  time: {
    eyebrow: "Timing",
    heading: "How long will I be out?",
    lead: "Typically around {hours} for the complete journey.",
    body: "That's a planning reference, not a promise. Border queues at any of the four checkpoints and how long you spend on the Saudi side both change the total. Think in terms of a journey window, not a fixed clock time.",
    segments: ["Pickup", "Bahrain exit", "Causeway", "Saudi entry", "Saudi side", "Saudi exit", "Causeway", "Bahrain entry", "Return"],
    variable: "Varies with your plan",
    queues: "Can vary with queues",
    dayHeading: "Can I go early in the morning, or late at night?",
    day: ["Late night", "Early morning", "Morning", "Afternoon", "Evening", "Late night"],
    dayBody: "Yes. The service runs 24/7, so you can go at whatever hour suits your plans. Some people choose quieter hours, but border traffic changes, and we won't promise that any particular time is faster.",
  },

  stay: {
    eyebrow: "The Saudi side",
    heading: "How long are you staying on the Saudi side?",
    intro: "This is the question that changes the arrangement most, so it's worth answering before we quote.",
    options: [
      { key: "a", label: "Turn around after entry", body: "The simplest version. Once you're through Saudi entry, the car heads straight for the Saudi exit. Standard checkpoint waiting is already in the fare." },
      { key: "b", label: "Stay briefly", body: "A short stop on the Saudi side before coming back. Tell us roughly how long, because the waiting arrangement may differ from a straight turnaround." },
      { key: "c", label: "Stay several hours", body: "The driver either waits or collects you later. This is quoted differently from a straight U-turn, so give us your expected time." },
      { key: "d", label: "Return later at an agreed time", body: "If you're staying longer, we agree the return pickup time and place in advance. If what you really need is a car with you for several hours, hourly chauffeur hire may suit better." },
    ],
    cta: "Tell us your plan before we quote",
    hourly: "Hourly chauffeur hire",
  },

  vehicle: {
    eyebrow: "The vehicle",
    heading: "Choose the vehicle around your journey",
    intro: "Passengers and luggage decide it. For most U-turns it's one or two people with very little luggage, and the sedan is enough.",
    classes: [
      { key: "sedan", name: "Sedan", model: "Toyota Camry class", people: 3, bags: 2, best: ["1–3 passengers", "Normal luggage", "A simple U-turn"] },
      { key: "suv", name: "SUV", model: "GMC Yukon / Hyundai Staria VIP class", people: 4, bags: 3, best: ["1–4 passengers", "Families", "More space or extra luggage"] },
      { key: "van", name: "Van", model: "Hiace / Starex / Sprinter class", people: 7, bags: 6, best: ["Up to 7 passengers", "Larger groups", "Keeping the group together"] },
    ],
    from: "From",
    notSure: "Not sure? Count people and bags",
    passengers: "Passengers",
    bags: "Large bags",
    recommend: "Suggested",
    tooMany: "More than one vehicle may be needed. Send the details on WhatsApp.",
    luggageNote: "Sedan: about 2 large suitcases plus hand luggage. SUV: about 3. Van: about 6. These are planning references, not guarantees. If you're unsure, send your passenger and luggage count on WhatsApp.",
  },

  scenarios: {
    eyebrow: "Real situations",
    heading: "Which one sounds like you?",
    items: [
      { quote: "I'm travelling alone and just need the crossing.", body: "The sedan is the simple answer. Tell us your pickup, date and time and that you'll turn around after Saudi entry, and that's enough to quote." },
      { quote: "I'm going with my family, and we have bags.", body: "Count the people and the large bags. Four people with a few cases usually fits the SUV; more than that, the van keeps everyone together through all four checkpoints." },
      { quote: "I need to spend some time in Saudi before coming back.", body: "Say so when you ask for the fare. A few hours on the Saudi side isn't the same arrangement as a straight turnaround, and it's better to agree the plan than to sort it out at the border." },
      { quote: "My timing is uncertain.", body: "Tell us what you do know: the earliest you can leave, and whether the return time is fixed. We'll work out a realistic pickup and return arrangement with you on WhatsApp." },
    ],
  },

  which: {
    eyebrow: "Check before booking",
    heading: "Which journey are you actually booking?",
    options: [
      { key: "uturn", label: "Visa U-turn", route: ["Bahrain", "Saudi side", "Bahrain"], body: "You cross, complete the Saudi-side formalities and come straight back in the same car. Waiting at all four checkpoints is part of it.", href: "" },
      { key: "oneway", label: "One-way transfer", route: ["Bahrain", "Saudi destination"], body: "You're going to a Saudi address and staying. There's no return leg, so it's priced as a single journey.", href: "/taxi-bahrain-to-khobar" },
      { key: "round", label: "Round trip to a city", route: ["Bahrain", "Khobar or Dammam", "Bahrain"], body: "You're going to a specific city for a reason, then coming back later. The two legs are quoted together.", href: "/taxi-bahrain-to-dammam" },
      { key: "hourly", label: "Hourly chauffeur", route: ["Bahrain", "Stop", "Stop", "Stop", "Bahrain"], body: "You need the car with you for several hours and several stops on the Saudi side.", href: "/hourly-chauffeur-hire" },
    ],
    linkLabel: "See this service",
  },

  pickup: {
    eyebrow: "Pickup",
    heading: "Where should the driver pick you up?",
    body: "The fare is based on your actual Bahrain pickup point, so the exact location matters more than the area name.",
    types: ["Home address", "Hotel", "Apartment", "Office", "Bahrain International Airport", "Residential area"],
    placeholder: "Your Bahrain pickup location",
    label: "Pickup location",
    submit: "Send Pickup Location on WhatsApp",
    message: "Hi, I'd like a visa U-turn fare. My pickup location in Bahrain is:",
    airport: "Starting from the airport?",
    airportLink: "Airport transfers",
  },

  included: {
    eyebrow: "In the fare",
    heading: "What the fare covers",
    yes: ["Vehicle", "Driver", "Fuel", "Causeway toll, both directions", "Standard border waiting", "Round-trip transport"],
    dependsHeading: "Depends on your plan",
    depends: ["Extended waiting", "A longer Saudi-side stay", "Special pickup requirements", "A different vehicle class", "A non-standard route"],
    confirmed: "Confirmed before departure",
  },

  pricing: {
    eyebrow: "Fares",
    heading: "Starting fares",
    from: "From",
    names: { sedan: "Sedan", suv: "SUV", van: "Van" },
    startNote: "Starting fares for a standard U-turn.",
    factorsHeading: "The final fare can depend on",
    factors: ["Pickup location", "Date and time", "Vehicle class", "Passenger count", "Luggage", "Time on the Saudi side", "Special requirements"],
    cta: "Get My Exact Fare on WhatsApp",
    ctaMessage: "Hi, I'd like the exact fare for a visa U-turn. My details:",
    allFares: "All fares",
    whyHeading: "Why it costs more than a normal taxi",
    why: "It isn't a drive there and a drive back. For the whole trip, one vehicle and one driver are committed to you:",
    whyItems: ["Two border crossings", "The causeway in both directions", "Waiting at four immigration points", "The return journey", "Fuel", "Tolls both ways", "The driver's time throughout"],
  },

  booking: {
    eyebrow: "Booking",
    heading: "Three steps, then you travel",
    steps: [
      { n: "1", title: "Send your details", items: ["Pickup", "Date", "Time", "Passengers", "Vehicle", "Saudi-side plan"] },
      { n: "2", title: "We confirm the journey", items: ["Vehicle", "Driver arrangement", "Fare", "Any special waiting arrangement"] },
      { n: "3", title: "You travel", items: ["The driver collects you", "The journey begins", "The same vehicle handles the round trip"] },
    ],
    cta: "Plan My U-Turn",
    previewTag: "Example booking message",
    customer: [
      "Hi, I need a visa U-turn from Bahrain to Saudi and back.",
      "Pickup: Juffair",
      "Date: 29 September",
      "Time: 6:00 AM",
      "Passengers: 1",
      "Vehicle: Sedan",
      "Saudi-side stay: Return after completing entry formalities.",
    ],
    reply: "Thanks. We'll confirm the fare and vehicle for your complete round trip.",
    send: "Send My Details on WhatsApp",
  },

  documents: {
    eyebrow: "Documents",
    heading: "Before you leave Bahrain",
    items: [
      "Bring a valid passport.",
      "Check your own Saudi entry requirements.",
      "Check any Bahrain re-entry requirements that apply to your situation.",
      "Make sure your documents are valid before you set off.",
    ],
    note: "Requirements vary by nationality and immigration status, and they change. We don't provide immigration advice.",
    equation: ["Transport booking", "Immigration approval"],
    link: "Documents for the road crossing",
  },

  checklist: {
    eyebrow: "Before you book",
    heading: "Your checklist",
    intro: "Tick these off. When they're all done, you have everything we need to quote.",
    items: ["Pickup location", "Date", "Preferred departure time", "Number of passengers", "Vehicle requirement", "Luggage", "Approximate Saudi-side stay", "Passport and required documents", "Your immigration eligibility confirmed"],
    done: "Ready to request your fare",
    progress: "done",
  },

  faq: {
    eyebrow: "Questions",
    heading: "Visa U-turn questions",
    items: [
      { question: "What is a Bahrain visa U-turn service?", answer: "It's transport for a round trip from Bahrain into Saudi Arabia over the King Fahd Causeway and back again. We provide the private vehicle and driver for both directions; you handle your own documents and immigration formalities at each checkpoint." },
      { question: "How does the U-turn journey work?", answer: "The driver collects you in Bahrain and drives to the Bahrain exit post. After the causeway you clear Saudi entry, then, depending on your plan, the car turns around or waits. You clear Saudi exit, cross back, clear Bahrain entry, and the driver takes you back to your address." },
      { question: "How long does the complete journey usually take?", answer: "Typically around {hours} in total. Queues at the four checkpoints and how long you spend on the Saudi side both change that, so plan a window rather than an exact return time." },
      { question: "Is the King Fahd Causeway toll included?", answer: "Yes, in both directions. So are the vehicle, driver, fuel and standard waiting at all four immigration points." },
      { question: "Does the same driver stay with me?", answer: "Yes. The same driver and vehicle handle the whole round trip, so you don't need separate transport on the Saudi side." },
      { question: "Can I stay in Saudi Arabia for a few hours?", answer: "Yes, but tell us before we quote. A few hours on the Saudi side means extra waiting or a later pickup, which is priced differently from a straight turnaround. If you need the car with you for several stops, hourly chauffeur hire may fit better." },
      { question: "What if I need to return later than planned?", answer: "Message the booking team as soon as you know. A later return may change the waiting arrangement and the fare, and it depends on the driver's availability, so the earlier you tell us, the easier it is to adjust." },
      { question: "Do you provide the Saudi visa?", answer: "No. We don't process visas or permits of any kind. We're a transport operator; any visa or permit you need is yours to arrange and check." },
      { question: "Can you guarantee re-entry into Bahrain?", answer: "No. Nobody can guarantee entry or re-entry at any checkpoint. Those decisions are made by the immigration officers. Your booking covers the transport for the round trip." },
      { question: "What documents do I need?", answer: "A valid passport, plus whatever your nationality and status require for Saudi entry and for coming back into Bahrain. Requirements vary and change, so check them with official sources before booking. We can't advise on them." },
      { question: "Can I book early morning or late night?", answer: "Yes, the service runs 24/7. Pick the hour that suits you. Some people prefer quieter hours, but border traffic varies and we don't promise that any time will be faster." },
      { question: "Which vehicle should I choose?", answer: "A sedan for one to three people with normal luggage, an SUV for up to four or for more room and bags, and a van for up to seven. Starting fares are BHD {sedan} for the sedan, BHD {suv} for the SUV and BHD {van} for the van." },
      { question: "Can a family or group book one vehicle?", answer: "Yes. Up to four people can take the SUV and up to seven the van, so everyone goes through all four checkpoints together and comes back in the same car." },
      { question: "Is waiting time included?", answer: "Standard waiting at the four immigration checkpoints is included. Extended waiting, for example if you spend several hours on the Saudi side, depends on your plan and is quoted in advance." },
      { question: "Can I book on the same day?", answer: "It depends on driver availability on the day. Send your pickup point and preferred time on WhatsApp and the team will tell you what's possible." },
      { question: "What information do you need for a quote?", answer: "Pickup location, date, preferred departure time, number of passengers, vehicle, luggage, and how long you expect to be on the Saudi side. The form at the top of this page writes that message for you." },
      { question: "Can I start from Bahrain Airport?", answer: "Yes. Give us your flight number and arrival time along with the other details, and the driver can collect you at Bahrain International Airport before heading to the causeway." },
      { question: "What if immigration takes longer than expected?", answer: "It happens, and it isn't something the driver can speed up. Standard waiting at the checkpoints is part of the fare; if your plans change significantly because of it, the team will talk you through the options." },
    ],
  },

  final: {
    heading: "Tell us your U-turn plan.",
    body: "Send your pickup point, date, time, passengers and how long you expect to stay in Saudi Arabia. We'll confirm the appropriate vehicle and fare before you travel.",
    primary: "Get My U-Turn Fare",
    secondary: "WhatsApp Us",
  },

  sticky: { primary: "Get My U-Turn Fare", whatsapp: "WhatsApp" },
};

export type UturnCopy = typeof UTURN;
