/**
 * Copy for /corporate-accounts/ (components/corporate/). Arabic in
 * corporate.ar.ts.
 *
 * Capabilities are limited to what the existing corporate-accounts content
 * in content/services.ts states: no fixed minimum, a nominated coordinator
 * (employees may still book themselves), standing rates for common routes
 * and vehicles, consolidated billing on the company's cycle (monthly most
 * common) broken down by employee, route and date and splittable by
 * department/project, routes added or removed later, sedan to 30-seat
 * coaster. There is no online portal. No clients, volumes or prices are
 * claimed; every schedule/record shown is labelled as an example.
 */

export type Item = { title: string; body: string };

export type CorporateCopy = {
  meta: { title: string; description: string; ogLocale: string };
  crumb: string;
  hero: {
    eyebrow: string;
    heading: string;
    sub: string;
    primary: string;
    secondary: string;
    secondaryMessage: string;
    ledgerTitle: string;
    ledger: { day: string; route: string; people: string }[];
    ledgerSummaryLabel: string;
    ledgerSummary: string;
    illustration: string;
  };
  problem: { eyebrow: string; heading: string; story: string; items: string[]; turn: string };
  beforeAfter: {
    eyebrow: string;
    heading: string;
    before: { title: string; rows: { who: string; what: string }[] };
    after: { title: string; steps: string[] };
  };
  meaning: { eyebrow: string; heading: string; body: string; parts: string[]; notHeading: string; not: string[]; note: string };
  situations: { eyebrow: string; heading: string; intro: string; items: (Item & { icon: "rotation" | "project" | "airport" | "executive" | "site" | "contractor" })[] };
  setup: { eyebrow: string; heading: string; intro: string; steps: { key: string; title: string; items: string[] }[]; outro: string };
  coordinator: { eyebrow: string; heading: string; body: string; chaos: string[]; calm: string; roles: string[]; note: string };
  request: {
    eyebrow: string;
    heading: string;
    tag: string;
    fields: { label: string; value: string }[];
    stages: string[];
    explain: string;
  };
  schedule: { eyebrow: string; heading: string; days: { day: string; route: string }[]; tag: string; body: string; patterns: string[]; caveat: string };
  changes: { eyebrow: string; heading: string; body: string; cases: string[]; how: string; impact: string };
  records: {
    eyebrow: string;
    heading: string;
    body: string;
    tableTitle: string;
    columns: string[];
    rows: string[][];
    tag: string;
    note: string;
  };
  projects: { heading: string; body: string; groups: { name: string; trips: string[] }[]; note: string };
  vehicles: {
    eyebrow: string;
    heading: string;
    formula: string[];
    rows: { name: string; people: string; use: string; slug: string }[];
    links: { vip: string; hourly: string; fleet: string };
  };
  border: { eyebrow: string; heading: string; body: string; points: string[]; links: { causeway: string; documents: string } };
  prepare: { eyebrow: string; heading: string; items: string[]; unsureHeading: string; unsure: string };
  scope: { eyebrow: string; heading: string; yesHeading: string; yes: string[]; noHeading: string; no: string[] };
  pricing: { eyebrow: string; heading: string; body: string; factors: string[]; note: string };
  scale: { eyebrow: string; heading: string; tiers: Item[]; note: string };
  enquiry: {
    eyebrow: string;
    heading: string;
    body: string;
    fields: {
      company: string;
      contact: string;
      contactPlaceholder: string;
      routes: string;
      routesPlaceholder: string;
      people: string;
      frequency: string;
      frequencies: string[];
      vehicles: string;
      vehiclesPlaceholder: string;
      billing: string;
      billingOptions: string[];
    };
    submit: string;
    secondary: string;
    secondaryMessage: string;
    noPortal: string;
    messageIntro: string;
    notSet: string;
  };
  faq: { eyebrow: string; heading: string; items: { question: string; answer: string }[] };
  sticky: { primary: string; whatsapp: string };
};

export const CORPORATE: CorporateCopy = {
  meta: {
    title: "Corporate Transport Accounts Bahrain ↔ Saudi Arabia | Staff Travel",
    description:
      "Set up recurring corporate transport between Bahrain and Saudi Arabia with organised bookings, nominated coordinators, vehicle options and consolidated trip records.",
    ogLocale: "en_BH",
  },
  crumb: "Corporate Accounts",
  hero: {
    eyebrow: "Corporate accounts · Bahrain ↔ Saudi Arabia",
    heading: "One corporate account for the trips your team takes again and again",
    sub: "Organise recurring employee and business travel between Bahrain and Saudi Arabia through one transport arrangement, with a nominated coordinator, agreed routes and clearer trip records.",
    primary: "Discuss a corporate account",
    secondary: "WhatsApp the transport team",
    secondaryMessage: "Hi, we'd like to discuss a corporate transport account between Bahrain and Saudi Arabia.",
    ledgerTitle: "Corporate account · example week",
    ledger: [
      { day: "Mon", route: "Bahrain → Jubail", people: "6 passengers" },
      { day: "Tue", route: "Bahrain → Dammam", people: "3 passengers" },
      { day: "Wed", route: "Dammam → Bahrain", people: "5 passengers" },
      { day: "Thu", route: "Bahrain → Ras Tanura", people: "4 passengers" },
    ],
    ledgerSummaryLabel: "This month",
    ledgerSummary: "Every trip on one record",
    illustration: "Illustration of how an account can organise recurring trips. Not real company data.",
  },
  problem: {
    eyebrow: "The problem",
    heading: "Five employees. Five WhatsApp chats. Five receipts.",
    story:
      "If three employees need to cross the causeway every Monday, asking each person to arrange a taxi separately works for a while. Then the first schedule changes, someone forgets to send the booking details, and finance ends up with a handful of WhatsApp screenshots at the end of the month.",
    items: [
      "Every trip starts a new booking conversation",
      "Trip details arrive in different formats, or not at all",
      "The same route gets its fare confirmed again and again",
      "Receipts are spread across personal chats",
      "Managers chase employees to find out who travelled",
      "Nobody can see the recurring pattern in the travel",
      "Several people contact the transport provider about the same team",
      "Month-end reconciliation takes longer than the trips did",
    ],
    turn: "A corporate account changes the workflow, not just the car.",
  },
  beforeAfter: {
    eyebrow: "Before and after",
    heading: "What changes when trips run through one account",
    before: {
      title: "Without an account",
      rows: [
        { who: "Employee 1", what: "books on WhatsApp" },
        { who: "Employee 2", what: "books on WhatsApp" },
        { who: "Employee 3", what: "books on WhatsApp" },
        { who: "Manager", what: "chases the details" },
        { who: "Finance", what: "collects receipts" },
      ],
    },
    after: { title: "With a corporate account", steps: ["Company", "Nominated coordinator", "Transport team", "Scheduled trips", "Consolidated records"] },
  },
  meaning: {
    eyebrow: "In plain English",
    heading: "What a corporate account actually is",
    body: "A corporate account is an organised arrangement where your company works with us around its recurring travel pattern, instead of every employee journey being treated as a separate booking. Most of the value is in the administration around the trips.",
    parts: [
      "Recurring routes you use often, agreed up front",
      "A nominated contact who requests trips",
      "Agreed vehicle preferences for your usual groups",
      "Recurring schedules where your travel is predictable",
      "Records for every trip",
      "Consolidated billing, if that's what you agree",
      "One transport relationship instead of many",
    ],
    notHeading: "What it isn't",
    not: [
      "It isn't unlimited travel.",
      "It doesn't mean every trip has the same fare.",
      "It doesn't replace immigration or employment documents.",
    ],
    note: "Fares and arrangements depend on the confirmed route, vehicle, timing and your account terms.",
  },
  situations: {
    eyebrow: "Who it's for",
    heading: "Suitable for companies that…",
    intro: "These are the patterns where an account usually saves more time than it takes to set up.",
    items: [
      { icon: "rotation", title: "…run shift rotations", body: "Employees cross between Bahrain and Saudi facilities on the same days each rotation. Send the pattern once instead of rebooking every cycle." },
      { icon: "project", title: "…have a project team in Saudi Arabia", body: "A team needs transport to a site for several weeks or months, then the arrangement ends when the project does." },
      { icon: "airport", title: "…fly staff in and out", body: "Employees land at Bahrain or Dammam airport regularly and need collecting, often across the border." },
      { icon: "executive", title: "…move managers and visitors", body: "Executives and client visitors need a pre-arranged car, sometimes a luxury sedan, without anyone booking it last minute." },
      { icon: "site", title: "…make occasional site visits", body: "Not weekly, but frequent enough that re-explaining the route and company every time is wasted effort." },
      { icon: "contractor", title: "…bring in contractors", body: "Temporary teams need moving for the length of a job, often with tools and bags." },
    ],
  },
  setup: {
    eyebrow: "Setting up",
    heading: "Build your account in five parts",
    intro: "This is what we'd talk through with you. None of it needs to be perfect on day one.",
    steps: [
      { key: "A", title: "Your people", items: ["Approximate staff numbers", "Typical group sizes per trip", "Who coordinates bookings"] },
      { key: "B", title: "Your routes", items: ["Common pickup locations in Bahrain", "Saudi destinations you use", "Airport requirements"] },
      { key: "C", title: "Your pattern", items: ["Daily, weekly or monthly", "Shift-based or project-based", "Ad-hoc trips on top"] },
      { key: "D", title: "Your vehicles", items: ["Sedan", "SUV", "Van", "30-seat coaster for larger groups"] },
      { key: "E", title: "Your admin", items: ["Who is allowed to book", "Billing preference", "What each trip record should show", "Department or project references"] },
    ],
    outro: "From there we agree a recurring schedule where there is one, and standing rates for your common routes and vehicles.",
  },
  coordinator: {
    eyebrow: "The coordinator",
    heading: "Give one person the transport conversation",
    body: "Instead of everyone arranging their own trips, one nominated person requests them. They know the schedule, they have one chat with our team, and they can answer the question \"who travelled on the 12th?\" without asking around.",
    chaos: ["Ahmed books.", "Ali books.", "Fatima books.", "Manager asks who travelled."],
    calm: "One coordinator requests the trips.",
    roles: ["HR", "Office manager", "Travel coordinator", "Project administrator", "Operations manager", "Executive assistant"],
    note: "Your company decides who is authorised to request trips. If you'd rather some employees still book directly, that works too.",
  },
  request: {
    eyebrow: "A trip request",
    heading: "What a real request looks like",
    tag: "Example corporate trip request",
    fields: [
      { label: "Company", value: "Example Company" },
      { label: "Date", value: "Monday" },
      { label: "Pickup", value: "Bahrain office / accommodation" },
      { label: "Destination", value: "Jubail" },
      { label: "Passengers", value: "5" },
      { label: "Vehicle", value: "Van" },
      { label: "Pickup time", value: "06:00" },
      { label: "Return", value: "As required" },
      { label: "Requested by", value: "Company transport contact" },
    ],
    stages: ["Request", "Confirmation", "Driver & vehicle", "Trip", "Record"],
    explain: "The coordinator sends the request, we confirm it, the driver and vehicle are assigned, the trip runs, and it's added to the account's records.",
  },
  schedule: {
    eyebrow: "Recurring trips",
    heading: "Some trips aren't one-off trips",
    days: [
      { day: "MON", route: "Bahrain → Dammam" },
      { day: "TUE", route: "Bahrain → Jubail" },
      { day: "WED", route: "Dammam → Bahrain" },
      { day: "THU", route: "Bahrain → Ras Tanura" },
      { day: "FRI", route: "Return / project travel" },
    ],
    tag: "Example week",
    body: "When your travel follows a pattern, we can plan around it instead of starting from scratch each time. Recurring schedules can be discussed around:",
    patterns: ["Weekly patterns", "Shift rotations", "Monthly schedules", "Project periods", "Airport travel", "Regular executive travel"],
    caveat: "A recurring schedule isn't an automatic guarantee. Trips are still confirmed according to your account arrangement.",
  },
  changes: {
    eyebrow: "Changes",
    heading: "Because work schedules change",
    body: "They always do. The point of having one coordinator and one conversation is that changes don't get lost.",
    cases: ["A shift moves", "A meeting is rescheduled", "A project date slips", "Fewer or more passengers", "A flight changes", "Someone is added last minute", "The route changes"],
    how: "The coordinator messages our team with the change, as early as possible.",
    impact: "Changes can affect which vehicle is available and the fare, so we confirm the new arrangement before the trip.",
  },
  records: {
    eyebrow: "Billing and records",
    heading: "Fewer receipts to chase",
    body: "Billing can be consolidated on whatever cycle suits your company, most commonly monthly, with each trip broken down by employee, route and date, instead of one lump sum or a folder of screenshots.",
    tableTitle: "Monthly transport summary",
    columns: ["Employee", "Route", "Date", "Vehicle"],
    rows: [
      ["Employee A", "Bahrain → Dammam", "04 Oct", "Sedan"],
      ["Employee B", "Bahrain → Jubail", "05 Oct", "Van"],
      ["Employee C", "Dammam → Bahrain", "06 Oct", "SUV"],
    ],
    tag: "Example layout, no real data",
    note: "The exact billing structure is agreed when the account is set up.",
  },
  projects: {
    heading: "Need trips separated by project?",
    body: "Tell us how you want the records organised when we set up the account, and the statement can be broken down that way.",
    groups: [
      { name: "Project Alpha", trips: ["Bahrain → Jubail", "Bahrain → Jubail"] },
      { name: "Operations", trips: ["Bahrain → Dammam"] },
      { name: "Management", trips: ["Bahrain Airport → Khobar"] },
      { name: "Site team", trips: ["Bahrain → Ras Tanura", "Ras Tanura → Bahrain"] },
    ],
    note: "This is about how records are organised, not software: there's no online dashboard.",
  },
  vehicles: {
    eyebrow: "Vehicles",
    heading: "Choose the vehicle by the trip, not the job title",
    formula: ["Number of people", "Luggage", "Type of trip", "Vehicle"],
    rows: [
      { name: "Sedan", people: "1–3 passengers", use: "Individual business trips and small meetings.", slug: "sedan-camry-sonata" },
      { name: "SUV", people: "1–4 passengers", use: "Executive travel, extra luggage, or a small team.", slug: "suv-gmc-tahoe" },
      { name: "Van", people: "Up to 7 passengers", use: "A team travelling together, without splitting across cars.", slug: "van-hiace-hyundai-h1" },
      { name: "30-seat coaster", people: "Up to 30 passengers", use: "Larger group moves.", slug: "bus-coaster-30-seater" },
    ],
    links: { vip: "VIP luxury transfer", hourly: "Hourly chauffeur hire", fleet: "Full fleet" },
  },
  border: {
    eyebrow: "The border",
    heading: "Corporate travel still means crossing an international border",
    body: "A trip from Bahrain to a Saudi site isn't a city taxi ride. It crosses the King Fahd Causeway and two immigration posts, and that shapes how you plan it.",
    points: [
      "Each passenger needs their own valid travel documents.",
      "Immigration requirements remain the responsibility of the traveller and the company.",
      "Border processing can change the journey time, especially at weekends and holidays.",
      "Plans should allow a reasonable buffer, particularly before meetings, shifts and flights.",
      "The vehicle's side of the crossing, including the toll, is handled as part of the transport.",
    ],
    links: { causeway: "How the causeway crossing works", documents: "Documents for crossing by road" },
  },
  prepare: {
    eyebrow: "Before you start",
    heading: "What your company needs to provide",
    items: [
      "Typical passenger numbers",
      "Common pickup locations",
      "Common Saudi destinations",
      "How often you travel",
      "Shift patterns, if you have them",
      "Vehicle preferences",
      "The coordinator or contact person",
      "Billing preference",
      "Department or project references, if needed",
    ],
    unsureHeading: "Don't have everything finalised yet?",
    unsure: "That's normal. Send us what you know, even rough numbers, and we'll talk through whether a standing account or simple recurring bookings suits you better.",
  },
  scope: {
    eyebrow: "Scope",
    heading: "What the account covers",
    yesHeading: "Included or can be arranged",
    yes: [
      "Recurring transport coordination",
      "A nominated booking contact",
      "An agreed route and vehicle structure",
      "Trip confirmations",
      "Consolidated records and billing, where agreed",
      "Cross-border transport, including the causeway toll",
    ],
    noHeading: "Not automatically included",
    no: ["Visas", "Work permits", "Iqama or residency matters", "Immigration eligibility", "Employee documentation", "Extra stops that weren't confirmed", "Unplanned route changes"],
  },
  pricing: {
    eyebrow: "Pricing",
    heading: "Discuss your transport requirement",
    body: "Corporate accounts are quoted, not listed. The same fixed-fare structure as our standard routes applies across your account, and the rates depend on:",
    factors: ["Routes", "Frequency", "Passenger numbers", "Vehicle class", "Timing", "Recurring pattern", "One-way or return", "Special requirements"],
    note: "Each company's transport pattern is different, so the arrangement is confirmed around your actual routes and requirements.",
  },
  scale: {
    eyebrow: "Scale",
    heading: "It works for a few people or a larger workforce",
    tiers: [
      { title: "Small team", body: "Two or three employees who cross regularly. Even at this size, one coordinator and one record help." },
      { title: "Project team", body: "Several people moving around a temporary project, often to the same site on the same days." },
      { title: "Larger workforce", body: "Several routes and recurring movements, sometimes with group vehicles." },
    ],
    note: "There's no fixed minimum. Tell us your approximate requirement and we'll discuss a practical arrangement.",
  },
  enquiry: {
    eyebrow: "Get started",
    heading: "Tell us how your team travels",
    body: "Send us your typical routes, passenger numbers, travel frequency and the person who will coordinate bookings. We'll discuss the most practical account arrangement for your company.",
    fields: {
      company: "Company",
      contact: "Coordinator / contact",
      contactPlaceholder: "Name and role",
      routes: "Typical routes",
      routesPlaceholder: "e.g. Bahrain → Jubail, Bahrain → Dammam",
      people: "Passengers per trip (approx.)",
      frequency: "How often",
      frequencies: ["Weekly", "Several times a week", "Monthly", "Shift rotation", "Project period", "Occasional"],
      vehicles: "Vehicle preferences",
      vehiclesPlaceholder: "e.g. van for teams, sedan for managers",
      billing: "Billing preference",
      billingOptions: ["Monthly consolidated", "Per trip", "Split by department / project", "Not sure yet"],
    },
    submit: "Discuss a corporate account",
    secondary: "WhatsApp the transport team",
    secondaryMessage: "Hi, we'd like to discuss a corporate transport account between Bahrain and Saudi Arabia.",
    noPortal: "No complicated portal required to get started. It all runs through one conversation.",
    messageIntro: "Hi, we'd like to discuss a corporate transport account.",
    notSet: "to discuss",
  },
  faq: {
    eyebrow: "Questions",
    heading: "Corporate account questions",
    items: [
      { question: "What is a corporate transport account?", answer: "An organised arrangement for your company's recurring travel between Bahrain and Saudi Arabia: agreed routes and vehicles, a nominated contact who requests trips, records for every trip and, if you want it, consolidated billing. It replaces a stream of separate bookings with one relationship." },
      { question: "Is there a minimum number of employees?", answer: "No fixed minimum. Send us your typical numbers and routes on WhatsApp, and we'll tell you honestly whether a standing account or simple recurring bookings suits you better." },
      { question: "Can a small company open an account?", answer: "Yes. Even two or three employees crossing regularly benefit from one coordinator, agreed routes and one set of records." },
      { question: "Can we have one nominated booking coordinator?", answer: "Yes, that's the usual setup. Trips are requested by the person you nominate, such as HR, an office manager or a project administrator, rather than by each employee." },
      { question: "Can employees still request trips themselves?", answer: "Yes, if that's how you prefer to run it. Your company decides who is authorised to request trips on the account." },
      { question: "Can routes be added later?", answer: "Yes. Accounts are set up around your current needs, and routes can be added or removed as your transport pattern changes." },
      { question: "Can recurring schedules be changed?", answer: "Yes. The coordinator tells us about the change as early as possible. Changes can affect vehicle availability and the fare, so we confirm the new arrangement before the trip." },
      { question: "Can trips be separated by department or project?", answer: "Yes. Tell us how you want the billing broken down when the account is set up, and the statement is structured that way." },
      { question: "Can billing be consolidated monthly?", answer: "Yes. Billing can be consolidated on whatever cycle suits you, most commonly monthly, with a breakdown by employee, route and date rather than a single lump sum." },
      { question: "Can we use different vehicle types?", answer: "Yes. The same account can use a sedan for a manager's meeting, a van for a team and an SUV for an airport run with luggage. Vehicle preferences are agreed at setup." },
      { question: "Can you transport a full team?", answer: "A van takes up to seven people, and our 30-seat coaster is available for larger corporate group moves. Tell us the group size and we'll plan the vehicles." },
      { question: "Can corporate accounts be used for airport transfers?", answer: "Yes. Employees arriving at or leaving from Bahrain or Dammam airport can be booked through the account like any other trip, including across the border." },
      { question: "Do employees need their own travel documents?", answer: "Yes. Each passenger needs a valid travel document and any visa, work permit or residency documents their situation requires. We handle transport, not immigration or employment paperwork." },
      { question: "How are corporate fares calculated?", answer: "By route, frequency, passenger numbers, vehicle class, timing, your recurring pattern and one-way or return needs. We agree standing rates for your common routes and vehicles when the account is set up." },
      { question: "How do we start a corporate account?", answer: "Send us your typical routes, passenger numbers, travel frequency and who will coordinate bookings, using the form on this page or WhatsApp. We'll discuss the arrangement and confirm the details before any trips run." },
    ],
  },
  sticky: { primary: "Discuss corporate account", whatsapp: "WhatsApp" },
};
