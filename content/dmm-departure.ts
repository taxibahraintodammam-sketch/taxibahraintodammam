/**
 * Content for the bespoke "Bahrain -> Dammam Airport" departure planner page
 * (app/[locale]/bahrain-to-dammam-airport-taxi/page.tsx, English only).
 *
 * Numbers that already live elsewhere (distance, drive time, border
 * estimate, fares, pickup areas) are read from content/routes.ts and
 * content/fares.ts at render time rather than repeated here, so this file
 * never drifts from the single source of truth for those figures.
 */

export type DmmFaq = { question: string; answer: string };

export const DMM_ROUTE_SLUG = "bahrain-to-dammam-airport-taxi";

export const DMM_META = {
  title: "Bahrain to Dammam Airport Taxi | DMM Transfer",
  description:
    "Private taxi from Bahrain to King Fahd International Airport (DMM) via the causeway, planned backwards from your flight time. Fixed fare, causeway toll included. Confirm on WhatsApp.",
};

export const DMM_HERO = {
  eyebrow: "Bahrain → King Fahd International Airport",
  heading: "Your Flight Sets the Clock. We Plan the Road to DMM.",
  sub: "Private door-to-terminal transport from your Bahrain address through the King Fahd Causeway to DMM. Share your flight time and we work backwards to a sensible pickup window, with room in it for the border.",
  boardCaption: "DEPARTURE",
  boardAirport: "KING FAHD INTL · DMM",
  boardHint: "Set your flight time below — the board updates to match.",
  chainLabels: ["Pickup", "Bahrain exit", "Causeway", "Saudi entry", "DMM"],
  formHeading: "Build My Airport Transfer",
  steps: {
    flight: { label: "When is your flight?", date: "Flight date", time: "Departure time", airline: "Airline", flightNo: "Flight number" },
    pickup: { label: "Where are you leaving from?", address: "Bahrain pickup address" },
    who: { label: "Who is travelling?", passengers: "Passengers", luggage: "Large suitcases" },
    vehicle: { label: "Vehicle" },
  },
  primaryCta: "Plan My Pickup",
  secondaryCta: "Send Flight Details on WhatsApp",
  messageIntro: "Hi, I need a taxi from Bahrain to Dammam Airport (DMM).",
} as const;

export const DMM_NARRATIVE = {
  eyebrow: "Why This Trip Plans Differently",
  heading: "Don’t Start With the Drive. Start With the Flight.",
  body: [
    "Most journeys on this site start from an address and end at another address. This one ends at a departure gate with a time printed on your boarding pass, which changes the order you plan in.",
    "A normal transfer answers “when do you want picking up?” An airport transfer has to answer a different question first: “when does the plane leave, and what has to happen before that?”",
  ],
  compareNormalLabel: "A NORMAL TAXI",
  compareNormal: "“Pick me up at 5 PM.”",
  compareAirportLabel: "AN AIRPORT TRANSFER",
  compareAirport: "“My flight leaves at 10:30 PM.”",
  conclusion: "Now work backwards.",
} as const;

export const DMM_TIMELINE = {
  eyebrow: "Journey Planning",
  heading: "The Trip, Worked Backwards From Your Gate",
  intro:
    "Read it from the top down: the flight is fixed, everything under it is what has to happen first for you to be standing at that gate on time.",
  stages: [
    { time: "T−0:00", title: "Flight departure", body: "The one fixed point in the whole plan. Everything above this line exists to protect it." },
    { time: "↑", title: "Airport arrival buffer", body: "Time at the terminal for check-in, bags and security before your airline closes the gate." },
    { time: "↑", title: "DMM departures", body: "Driver takes you toward the departures entrance that matches your airline." },
    { time: "↑", title: "Saudi immigration", body: "Passport check on the Saudi side of the causeway. Queue length varies by day and hour." },
    { time: "↑", title: "King Fahd Causeway", body: "The 25 km crossing itself, between the two immigration posts." },
    { time: "↑", title: "Bahrain immigration", body: "Exit check on the Bahrain side before the causeway starts." },
    { time: "↑", title: "Pickup", body: "Driver collects you from your Bahrain address." },
  ],
  note: "This is a planning sequence, not a live tracker — we don’t claim to see the border queue before you’re in it.",
} as const;

export const DMM_CALCULATOR = {
  eyebrow: "How Early Should I Leave?",
  heading: "Build a Planning Window, Not a Single Number",
  intro:
    "Tell us roughly what you’re working with and we’ll show you what the plan needs to include. This is a planning aid, not a booking — we confirm your actual pickup time on WhatsApp once we have your real flight and pickup point.",
  labels: {
    flightTime: "Flight departure time",
    flightType: "Flight type",
    pickup: "Pickup area",
    passengers: "Passengers",
  },
  flightTypes: [
    { value: "international", label: "International" },
    { value: "regional", label: "Regional / domestic" },
  ] as const,
  breakdown: [
    { key: "airport", label: "Airport check-in / security buffer" },
    { key: "road", label: "Road journey, Bahrain to DMM" },
    { key: "bahrain", label: "Bahrain immigration" },
    { key: "causeway", label: "King Fahd Causeway" },
    { key: "saudi", label: "Saudi immigration" },
    { key: "buffer", label: "Traffic / border uncertainty" },
  ],
  resultLabel: "Recommended planning window",
  resultCaveat:
    "We confirm the actual pickup time with you based on your flight, pickup location and travel date — this window is a starting point for that conversation, not a booked time.",
  cta: "Send This to WhatsApp",
} as const;

export const DMM_FLIGHT_TYPE = {
  eyebrow: "What Kind of Flight Are You Catching?",
  heading: "International and Regional Departures Plan Differently",
  international: {
    title: "International departure",
    body: "Allow the airport time your airline and DMM recommend for check-in, baggage and security on an international departure. Many international travellers plan to reach the terminal around 2.5–3 hours before departure — follow your airline’s own recommended check-in time rather than a number from a taxi website.",
  },
  regional: {
    title: "Regional / domestic departure",
    body: "A shorter regional or domestic flight still means a cross-border road journey first. Allow sufficient time for the causeway and both immigration posts even though the airport-side procedures may be quicker.",
  },
} as const;

export const DMM_DRIVE_VS_PLAN = {
  eyebrow: "Read This Before You Set a Pickup Time",
  heading: "Your 80–100 Minute Drive Is Not Your Entire Departure Plan",
  body: "The 80–100 minute figure describes the vehicle journey — pickup to terminal, moving. It does not mean “leave exactly 100 minutes before your flight.” An 80–100 minute drive does not mean you should leave Bahrain 100 minutes before your flight; that figure describes the vehicle journey, and your actual plan also needs airport check-in time and a buffer for the causeway and immigration.",
  equationIntro: "The {duration} drive is one part of five:",
  equation: ["Pickup", "Border processing", "Road travel", "Airport arrival buffer", "Airline check-in / security"],
  equationNote: "Your total plan is the sum of all five. The drive time is only one term in it.",
} as const;

export const DMM_JOURNEY = {
  eyebrow: "The Four-Part Journey",
  heading: "Bahrain Pickup to DMM Terminal, Step by Step",
  steps: [
    { step: "01", title: "Bahrain pickup", body: "Driver collects you from the agreed Bahrain address." },
    { step: "02", title: "Bahrain exit", body: "Passenger completes Bahrain-side immigration formalities." },
    { step: "03", title: "Causeway + Saudi entry", body: "Vehicle crosses the King Fahd Causeway and reaches Saudi immigration." },
    { step: "04", title: "DMM terminal", body: "Driver continues to King Fahd International Airport and drops you at the departures entrance that matches your airline." },
  ],
} as const;

export const DMM_TERMINAL = {
  eyebrow: "Which Terminal?",
  heading: "Tell Us Your Airline. We’ll Plan the Drop-Off Properly.",
  body: "Because this trip ends at an airport rather than a street address, your flight details matter to the plan itself. Give us your airline, flight number and departure time and your driver takes you toward the departures entrance that matches your airline, rather than treating DMM as just another address.",
  fields: ["Airline", "Flight number", "Departure time"],
  fieldsLabel: "Tell us before you travel:",
  formCta: "Add these to your transfer",
  note: "We don’t invent terminal numbers we haven’t confirmed — tell us the airline and we route you to the right entrance on the day.",
} as const;

export const DMM_BORDER_BUFFER = {
  eyebrow: "Build a Buffer, Not a Promise",
  heading: "We Can’t Control the Immigration Queue. We Can Plan Around It.",
  conditions: [
    { label: "Normal", body: "A typical crossing, moderate wait at both immigration posts." },
    { label: "Busier", body: "Longer queues at one or both posts — more common at certain times." },
    { label: "Unexpected", body: "Additional delay from something outside anyone’s control that day." },
  ],
  body: "The driver cannot control immigration queues. The correct response is to plan with a buffer rather than promise an exact travel time — we build a buffer based on typical border conditions for your day and time, not a guess.",
  calendarNote:
    "Thursday evenings, Friday mornings and public holidays are times worth planning with extra margin — border traffic varies, and the goal is to avoid planning around the shortest possible crossing.",
} as const;

export const DMM_SCENARIOS = {
  eyebrow: "Two Kinds of Delay, Two Different Answers",
  heading: "Flight Delay and Road Delay Are Not the Same Problem",
  flightDelay: {
    title: "Flight delay",
    body: "Your airline changes the departure time.",
    steps: ["Message us with the new departure time.", "Pickup timing can be adjusted where practical."],
  },
  roadDelay: {
    title: "Road / border delay",
    body: "Traffic or immigration takes longer than usual.",
    steps: ["This is exactly why the original schedule includes a buffer."],
  },
  changeExample: {
    title: "What If My Flight Changes?",
    original: "Original: 22:30 departure",
    changed: "Airline changes to: 23:15 departure",
    action: "Send us the updated flight information as soon as you have it — the earlier we know, the easier it is to adjust the pickup.",
  },
  missedFlight: {
    title: "What If I Miss the Flight?",
    body: "We can’t guarantee a flight connection. If your airline changes your schedule or you’re running late, contact us as soon as possible — any change to pickup timing depends on driver availability and the agreed booking terms.",
  },
} as const;

export const DMM_VEHICLE_SELECTOR = {
  eyebrow: "Choose Your Vehicle Based on Bags, Not Just Seats",
  heading: "Luggage-First Vehicle Selector",
  passengerOptions: [1, 2, 3, 4, 5, 6, 7],
  bagOptions: [0, 1, 2, 3, 4, 5, 6],
  tripStyles: [
    { value: "solo", label: "Solo" },
    { value: "family", label: "Family" },
    { value: "business", label: "Business" },
    { value: "group", label: "Group" },
    { value: "executive", label: "Executive" },
  ] as const,
  recommendLabel: "Vehicle that fits",
} as const;

export const DMM_SUV_HONESTY = {
  eyebrow: "Why Take an SUV?",
  heading: "Is the Extra Cost Actually Useful to You?",
  body: [
    "The SUV makes sense when luggage runs past what a sedan comfortably carries, when a family has more personal items than seats would suggest, or when passengers simply want more space for a longer cross-border trip.",
    "If your luggage is light and it’s one or two passengers, a sedan is usually enough — there’s no need to pay for room you won’t use.",
  ],
} as const;

export const DMM_GROUP_TRAVEL = {
  eyebrow: "Group Travel",
  heading: "Seven People? Don’t Split the Airport Run.",
  body: "The van covers up to seven passengers with around six large suitcases, based on our current fleet guidance. One vehicle through both immigration posts is simpler than coordinating two cars — how much actually fits still depends on your group’s own bags, so check the count against what you’re carrying.",
} as const;

export const DMM_EXECUTIVE = {
  eyebrow: "Executive Travel",
  heading: "Flying From DMM for Business?",
  body: "The luxury sedan class gives executives a higher standard of cabin for the Bahrain-to-airport leg. It’s the same fixed-fare, causeway-toll-included structure as our other vehicle classes, at the higher price point that reflects the vehicle standard — not a package of extras we haven’t confirmed.",
  cta: "See the luxury sedan",
} as const;

export const DMM_PICKUP = {
  eyebrow: "Pickup Location",
  heading: "Your Pickup Address Determines the First Part of the Plan",
  body: "The distance from your Bahrain address to the causeway is the first variable in the whole schedule — a Manama pickup and an Amwaj pickup don’t take the same time to reach the border. Confirm your exact address on WhatsApp before the fare and pickup time are finalised.",
} as const;

export const DMM_DISTANCE = {
  eyebrow: "The Number Everyone Asks First",
  heading: "Distance Is the Easy Part to Measure",
  body: "The real planning variables aren’t on a map: the border on the day, traffic, airport procedures, your flight departure and where in Bahrain you’re starting from. The kilometre figure barely moves any of them.",
} as const;

export const DMM_CAUSEWAY = {
  eyebrow: "One Road. Two Countries.",
  heading: "The Vehicle Doesn’t Simply Drive Into Saudi Arabia",
  body: "Passengers complete immigration procedures on the relevant sides of the causeway; the driver manages the vehicle journey between them. Standard waiting time at both posts is built into the fare.",
} as const;

export const DMM_DOCUMENTS = {
  eyebrow: "Document Responsibility",
  heading: "Who Handles What",
  you: {
    label: "You",
    items: ["Passport", "Visa / permit where required", "Airline requirements", "Personal immigration eligibility", "Check-in documents"],
  },
  driver: {
    label: "Driver",
    items: ["Vehicle", "Driver", "Transport paperwork", "Cross-border vehicle arrangement"],
  },
  note: "We do not guarantee Saudi entry or an airline connection. We can’t give nationality-specific visa advice — confirm your own requirements before travel.",
} as const;

export const DMM_INCLUDED = {
  eyebrow: "What Is Included?",
  heading: "Know What’s Covered Before You Travel",
  yes: ["Private vehicle", "Driver", "Fuel", "King Fahd Causeway toll", "Standard immigration waiting", "Bahrain pickup", "DMM terminal drop-off"],
  noHeading: "Not included",
  no: ["Flight ticket", "Passenger visa / permit", "Passenger immigration requirements", "Airport-side airline fees", "Unusual extra waiting outside agreed terms", "Optional stops unless agreed"],
} as const;

export const DMM_FARE = {
  eyebrow: "Know the Fare Before You Leave",
  heading: "Starting Fares, Bahrain → DMM",
  vehicleHeader: "Vehicle",
  capacityHeader: "Capacity",
  fareHeader: "Starting fare",
  disclaimer: "Final fare depends on pickup point, timing and vehicle. Confirm on WhatsApp before departure.",
} as const;

export const DMM_FAQ_HEADING = "Frequently Asked Questions";

export const DMM_COST_EXPLAINER = {
  eyebrow: "Why This Costs More Than a City Taxi",
  heading: "You’re Not Only Paying for Distance",
  parts: ["Bahrain pickup", "Cross-border vehicle", "Causeway toll", "Two immigration stages", "Driver time", "Airport terminal coordination", "Flight-based planning"],
} as const;

export const DMM_BOOKING_TIMING = {
  eyebrow: "What Time Should I Book?",
  heading: "Book Around the Flight, Not Around the Taxi",
  body: "Once your flight is confirmed, send: flight number, airline, departure time, date, Bahrain pickup, passengers, luggage and vehicle preference. For early-morning or overnight flights, plan earlier rather than the evening before — we don’t promise guaranteed last-minute availability at short notice.",
} as const;

export const DMM_WHATSAPP_PREVIEW = {
  eyebrow: "Example Booking Message",
  heading: "What to Send on WhatsApp",
  customer: [
    "Hi, I need a taxi from Manama to Dammam Airport.",
    "Flight: XY123",
    "Departure: 10:30 PM",
    "Date: 14 October",
    "Passengers: 2",
    "Large bags: 3",
    "Vehicle: SUV",
    "Airline: [airline]",
  ],
  reply: "Thanks. We’ll confirm the pickup time, vehicle and final fare based on your flight and pickup location.",
  note: "This is an example message to show you what to send, not a real conversation.",
} as const;

export const DMM_RETURN = {
  eyebrow: "Coming Back to Bahrain After Your Flight?",
  heading: "The Return Leg Is a Different Planning Problem",
  body: "This page starts with a departure and a fixed clock time. The trip back starts with an arrival instead — your flight lands, then the journey begins, which is timed against your landing rather than a departure deadline.",
  link: "See the DMM → Bahrain arrival transfer",
  href: "/dammam-airport-to-bahrain-taxi/",
} as const;

export const DMM_FINAL_CTA = {
  heading: "Give Us the Flight Time. We’ll Plan the Road.",
  body: "Send your flight number, departure time, Bahrain pickup point, passengers and luggage. We’ll confirm the vehicle, pickup arrangement and fare before you travel.",
  primary: "Plan My DMM Transfer",
  secondary: "Get My Fare on WhatsApp",
} as const;

export const DMM_FAQS: DmmFaq[] = [
  {
    question: "How far is Bahrain from Dammam Airport?",
    answer: "Around 145 km by road, running from your Bahrain pickup point across the King Fahd Causeway to King Fahd International Airport (DMM).",
  },
  {
    question: "How long does Bahrain to DMM usually take?",
    answer: "Typically 80–100 minutes of vehicle journey, including both immigration stops. That figure is the drive itself, not your total departure plan — see the section above on why those aren’t the same thing.",
  },
  {
    question: "Does the 80–100 minute estimate include immigration?",
    answer: "Yes, it includes standard waiting at both Bahrain and Saudi immigration posts under normal conditions. It does not include your airport check-in and security time at DMM, which sits on top of it.",
  },
  {
    question: "How early should I leave Bahrain for an international flight?",
    answer: "There’s no single number that’s right for everyone. Your plan needs to add your airline’s recommended airport-arrival time, the road journey, border processing and a traffic buffer — follow your airline’s own check-in guidance first, then work backwards using the 80–100 minute drive as one part of the total.",
  },
  {
    question: "What if the border takes longer than expected?",
    answer: "The fare doesn’t change, but your travel time might. This is exactly why we build a buffer into the suggested pickup time rather than quoting the shortest possible crossing.",
  },
  {
    question: "Do you work 24/7?",
    answer: "Yes, bookings run around the clock, which matters for early-morning and overnight DMM departures in particular.",
  },
  {
    question: "Can I book for an early-morning flight?",
    answer: "Yes — tell us the departure time when you book and we plan the pickup around it. Early-morning departures are worth booking a little further ahead so the pickup time is confirmed before you sleep.",
  },
  {
    question: "Can I book for an overnight flight?",
    answer: "Yes, overnight and red-eye departures are common on this route. Share the exact departure time and we’ll plan the pickup the same way as any other flight.",
  },
  {
    question: "Do you need my flight number?",
    answer: "It helps. Your flight number and departure time let us plan the pickup properly and adjust quickly if your airline changes the schedule.",
  },
  {
    question: "Do you need my airline?",
    answer: "Yes — it's how the driver knows which departures entrance to head for at DMM instead of a generic terminal drop-off.",
  },
  {
    question: "Which DMM terminal or entrance will the driver use?",
    answer: "The one that matches the airline you give us. We don’t invent terminal numbers we haven’t confirmed, so tell us your airline and we route you to the correct entrance on the day.",
  },
  {
    question: "Is the causeway toll included?",
    answer: "Yes, the King Fahd Causeway toll is included in the fixed fare, along with fuel and standard waiting time at both immigration posts.",
  },
  {
    question: "Is border waiting included?",
    answer: "Standard waiting time at both Bahrain and Saudi immigration is included. Unusual extra waiting outside agreed terms is not.",
  },
  {
    question: "What vehicle should I choose for luggage?",
    answer: "A sedan covers 1–3 passengers with 2 large bags. Choose the SUV for a third bag or extra space, the van for up to 7 passengers with around 6 large bags, or the luxury sedan for a higher-standard cabin at sedan-level luggage capacity.",
  },
  {
    question: "Can seven passengers travel together?",
    answer: "Yes, the van seats up to seven passengers with around six large suitcases in one vehicle rather than splitting into two cars.",
  },
  {
    question: "Can I book a luxury sedan?",
    answer: "Yes, the luxury sedan class is available on this route for executives or anyone who wants a higher standard of vehicle for the airport leg.",
  },
  {
    question: "What if my airline changes my departure time?",
    answer: "Send us the updated flight information as soon as you have it. The earlier we know, the easier it is to adjust your pickup time to match.",
  },
  {
    question: "What if I am running late leaving Bahrain?",
    answer: "Contact us as soon as you know. We can’t guarantee your flight connection, and any change to pickup timing depends on driver availability and the agreed booking terms.",
  },
  {
    question: "Do I need a Saudi visa to reach DMM from Bahrain?",
    answer: "Reaching DMM by road still means entering Saudi Arabia via the causeway, so the same entry-permit rules apply as any other Bahrain-to-Saudi crossing. Confirm your own nationality’s requirements before travel — we can’t provide nationality-specific visa advice.",
  },
  {
    question: "Can you guarantee I will reach the airport before my flight?",
    answer: "No. We build a timing buffer into the suggested pickup because border and traffic conditions are outside our control, but we can’t guarantee an exact arrival time or a flight connection.",
  },
  {
    question: "Can I book a return DMM → Bahrain transfer?",
    answer: "Yes — the return leg is a separate planning problem since it starts with your flight landing rather than a departure deadline. See the DMM to Bahrain arrival transfer page for that direction.",
  },
  {
    question: "Can I book the same day?",
    answer: "Often yes, depending on vehicle availability at that hour — message us your flight and pickup details as soon as you can, particularly around Thursday evening, Friday morning or public holidays when both border traffic and vehicle demand are higher.",
  },
  {
    question: "How do I get the final fare?",
    answer: "We confirm it on WhatsApp before you travel, based on your pickup point, date, timing, vehicle, passenger count and luggage. The starting fares above are a reference point, not the final number.",
  },
  {
    question: "What details should I send on WhatsApp?",
    answer: "Flight number, airline, departure time, date, Bahrain pickup point, passengers, luggage and vehicle preference — see the example message above for the format that’s quickest for us to confirm.",
  },
];
