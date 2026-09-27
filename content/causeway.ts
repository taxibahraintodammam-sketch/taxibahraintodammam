/**
 * /king-fahd-causeway-taxi/ — "One bridge. Two countries. Two border checkpoints."
 *
 * Facts are limited to what content/causeway-hub.ts already states: ~25 km
 * from Al Jasra (Bahrain) to the Saudi coast near Khobar, opened 1986; both
 * immigration/customs posts sit on a man-made island roughly midway; the
 * bridge drive is about 20–30 min; outside peak periods the two stops
 * typically add 30–40 min; Thursday evenings, Friday mornings and public
 * holidays are busier; the causeway generally runs 24 hours but can be
 * affected by maintenance, weather or security; vehicles only, no pedestrian
 * lane; toll built into every fare; driver handles vehicle paperwork.
 * Route distances and times come from content/routes.ts via the page.
 */
export const CAUSEWAY = {
  meta: {
    title: "King Fahd Causeway Taxi | Bahrain–Saudi Private Transfer",
    description:
      "Private transport across the King Fahd Causeway between Bahrain and Saudi Arabia. One vehicle and driver for the whole crossing, toll included, 24/7. Plan the trip and confirm the fare on WhatsApp.",
    ogLocale: "en_BH",
  },
  crumb: "King Fahd Causeway Taxi",
  schemaName: "Private transport across the King Fahd Causeway",

  hero: {
    eyebrow: "King Fahd Causeway · Bahrain ↔ Saudi Arabia",
    heading: "One bridge. Two countries. One private journey.",
    sub: "Private Bahrain–Saudi transport across the King Fahd Causeway, with the driver, vehicle, toll and route arranged as one complete journey.",
    primary: "Plan My Crossing",
    secondary: "WhatsApp Us",
    secondaryMessage: "Hi, I'd like a fare for a private car across the King Fahd Causeway.",
    shoreA: "Bahrain",
    shoreB: "Saudi Arabia",
    island: "Border island",
    causewayName: "King Fahd Causeway",
    postA: "Bahrain post",
    postB: "Saudi post",
    label: "Crossing route",
    illustration: "Diagram, not to scale. Not live tracking.",
    imageAlt: "A car on the long causeway over the sea at sunset",
  },

  plan: {
    eyebrow: "Plan your crossing",
    heading: "Six answers, then we quote",
    steps: {
      direction: "Direction",
      pickup: "Pickup",
      destination: "Destination",
      when: "Date and time",
      passengers: "Passengers",
      vehicle: "Vehicle",
    },
    directions: ["Bahrain → Saudi Arabia", "Saudi Arabia → Bahrain"],
    pickupPlaceholder: "Area, hotel or address",
    destinationPlaceholder: "City and address",
    vehicles: ["Not sure", "Sedan", "SUV", "Van", "Luxury sedan"],
    submit: "Get My Causeway Fare",
    note: "Opens WhatsApp with your answers. The fare is confirmed by the team, not calculated here.",
    messageIntro: "Hi, I'd like a private car across the King Fahd Causeway.",
    notSet: "not set",
  },

  journey: {
    eyebrow: "The crossing",
    heading: "What actually happens on the causeway?",
    intro: "Pick your direction. The order of the checkpoints flips; everything else stays the same.",
    toggle: ["Bahrain → Saudi", "Saudi → Bahrain"],
    stagesBhSa: [
      { n: "01", title: "Your pickup", body: "The driver collects you from your Bahrain address." },
      { n: "02", title: "Bahrain exit", body: "On the border island, you complete Bahrain departure immigration." },
      { n: "03", title: "The causeway", body: "About 25 km of bridge and reclaimed land between the two coasts." },
      { n: "04", title: "Saudi entry", body: "You complete Saudi entry immigration and customs." },
      { n: "05", title: "Final road", body: "The driver continues to your Saudi destination." },
    ],
    stagesSaBh: [
      { n: "01", title: "Your pickup", body: "The driver collects you from your Saudi address." },
      { n: "02", title: "Saudi exit", body: "On the border island, you complete Saudi departure immigration." },
      { n: "03", title: "The causeway", body: "About 25 km of bridge and reclaimed land between the two coasts." },
      { n: "04", title: "Bahrain entry", body: "You complete Bahrain entry immigration and customs." },
      { n: "05", title: "Final road", body: "The driver continues to your Bahrain destination." },
    ],
    driverNote: "The vehicle has its own paperwork at each post, which the driver handles separately from your passport check.",
  },

  bridge: {
    eyebrow: "The part people underestimate",
    heading: "The 25 km bridge is only one part of the crossing",
    km: "25",
    kmUnit: "km",
    kmLabel: "of causeway",
    plus: "Plus the two immigration stages around it.",
    body: [
      "People often picture the trip as a drive across a bridge. The causeway itself is only 25 km. The part to plan around is everything around it: the checkpoint where you leave one country, the checkpoint where you enter the other, and the road from the border to your final address.",
      "The bridge drive is about 20 to 30 minutes on its own. The border stops come on top of that, and so does whatever road lies beyond them.",
    ],
    layersLabel: "A crossing, in layers",
    layers: ["Road to the border", "First border stop", "The causeway", "Second border stop", "Road to your destination"],
    notSame: "Causeway crossing time is not the same as total journey time.",
    facts: [
      { label: "Opened", value: "1986" },
      { label: "Length", value: "~25 km" },
      { label: "Joins", value: "Al Jasra, Bahrain · Saudi coast near Khobar" },
    ],
  },

  checkpoints: {
    eyebrow: "Border stages",
    heading: "Four border stages. One continuous vehicle.",
    items: [
      { n: "01", name: "Bahrain exit" },
      { n: "02", name: "Saudi entry" },
      { n: "03", name: "Saudi exit" },
      { n: "04", name: "Bahrain entry" },
    ],
    trips: [
      { label: "One way, Bahrain → Saudi", uses: [0, 1], body: "Bahrain departure, then Saudi entry." },
      { label: "One way, Saudi → Bahrain", uses: [2, 3], body: "The same idea in reverse: Saudi departure, then Bahrain entry." },
      { label: "Return trip", uses: [0, 1, 2, 3], body: "All four, usually with time spent in Saudi Arabia in between. The two legs are quoted together." },
      { label: "Visa U-turn", uses: [0, 1, 2, 3], body: "All four in one trip: cross, complete the Saudi-side formalities, come straight back." },
    ],
    uturnLink: "Visa U-turn service",
    note: "This is about the transport. What each checkpoint requires of you is a matter for the authorities, not for us.",
  },

  roles: {
    eyebrow: "Responsibilities",
    heading: "Who handles what at the border",
    youLabel: "You",
    you: ["Your passport or accepted ID", "Any visa or entry permission you need", "Your immigration eligibility", "Presenting your documents", "Answering immigration questions", "Entry and exit decisions are made about you, not the car"],
    driverLabel: "Your driver",
    driver: ["The vehicle", "Driving", "Vehicle documentation", "The causeway journey", "The vehicle-side border process", "The route to your destination"],
    body: "We provide the vehicle and driver for the crossing. Immigration officers decide whether a passenger may exit or enter, and the driver can't change or guarantee that.",
    visa: {
      heading: "Your transport booking is not your visa.",
      body: "What you need depends on your nationality, which way you're travelling, your residency or status, and the current government rules. GCC nationals often cross with a national ID where accepted; most others need a visa or entry permit for the country they're entering. Check your own situation before you travel. We don't process visas and can't guarantee entry.",
    },
    reality: {
      heading: "A reality check",
      dontLabel: "Don't expect",
      dont: ["A guaranteed border time", "Guaranteed immigration approval", "Guaranteed entry", "An exact arrival time", "The driver to speed up immigration"],
      doLabel: "Do expect",
      do: ["A planned private vehicle", "A known driver", "A fare confirmed before travel", "One continuous journey", "Clear lines of responsibility"],
    },
    link: "Documents for the road crossing",
  },

  timing: {
    eyebrow: "Timing",
    heading: "Don't plan around the fastest possible crossing",
    reference: "Outside peak periods, the two border stops typically add around 30 to 40 minutes.",
    referenceNote: "That's a planning reference, not a guaranteed queue time.",
    scale: [
      { label: "Shorter", body: "Lighter traffic, steady processing." },
      { label: "Normal", body: "Moderate queues at one or both posts." },
      { label: "Longer", body: "Peak traffic, holidays, maintenance, weather or security checks." },
    ],
    causes: "Queues change with traffic, weather, maintenance, security measures and weekend or holiday demand.",
    busyHeading: "When it can get busier",
    busy: [
      { when: "Thursday evening", note: "Can be busier" },
      { when: "Friday morning", note: "Can be busier" },
      { when: "Public holidays", note: "Can be busier" },
      { when: "Other times", note: "Conditions vary" },
    ],
    busyNote: "These aren't rules, and no day is guaranteed to be quick. If your timing is flexible, talk the trip through with us before choosing a departure.",
    clockHeading: "Open around the clock, not equally busy around the clock",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    clockBody: "We run 24/7, and the causeway generally operates around the clock. That doesn't mean the border is equally busy at every hour, or that it's never affected at short notice.",
    night: {
      heading: "Crossing after dark?",
      body: "Overnight journeys are available. Confirm your documents, pickup time, destination and vehicle the same way as for a daytime trip. A night crossing isn't automatically faster.",
    },
  },

  oneVehicle: {
    eyebrow: "One vehicle",
    heading: "One booking. One vehicle. Both sides.",
    body: "The practical difference of a private cross-border car is simple: the same vehicle stays with you from one side to the other. There's no changeover at the border and no second taxi to find once you're through.",
    who: ["Families", "Airport passengers", "Business travellers", "People with luggage", "Longer Saudi destinations", "Groups"],
    withoutLabel: "In separate pieces",
    without: ["Taxi", "Border", "Find another ride", "New driver", "Destination"],
    withLabel: "One cross-border journey",
    with: ["Your address", "Immigration", "Causeway", "Immigration", "Final address"],
  },

  vehicle: {
    eyebrow: "The vehicle",
    heading: "What are you taking across the causeway?",
    classes: [
      { key: "sedan", name: "Sedan", cap: "1–3 passengers · 2 large suitcases + hand luggage", best: "Solo travellers, couples, standard business trips", people: 3, bags: 2 },
      { key: "suv", name: "SUV", cap: "1–4 passengers · 3 large suitcases + hand luggage", best: "Families, extra luggage, longer journeys", people: 4, bags: 3 },
      { key: "van", name: "Van", cap: "Up to 7 passengers · 6 large suitcases", best: "Groups, bigger families, crew travel", people: 7, bags: 6 },
      { key: "luxury", name: "Luxury sedan", cap: "1–3 passengers · 2 large suitcases", best: "Executives and VIP journeys", people: 3, bags: 2 },
    ],
    tool: {
      heading: "Tell us about your group",
      q1: "Passengers",
      q2: "Large bags",
      q3: "Trip type",
      types: ["Personal", "Family", "Business", "Airport", "Group"],
      likely: "Likely fit",
      over: "More than one vehicle may be needed. Send the details on WhatsApp.",
      note: "A planning guide from the published capacities, not a guarantee of luggage fit.",
    },
    family: {
      heading: "Crossing with children and luggage?",
      body: "Choose on passengers, bags and room to be comfortable. For larger families the SUV or van is usually more practical than trying to fit into a sedan. If you need a child seat, ask when booking and we'll confirm whether we can provide one.",
    },
    business: {
      heading: "Crossing for work?",
      body: "Business passengers tend to care about a direct door-to-door run, clear booking messages, room for luggage and laptop bags, and early or late departures. We'll plan the pickup around your schedule, though the border sets its own pace.",
      link: "Corporate accounts",
    },
    fleet: "Compare the fleet",
  },

  routes: {
    eyebrow: "Where are you going?",
    heading: "Every route shares this. Then the routes split.",
    trunk: ["Bahrain", "Immigration", "Causeway", "Saudi immigration"],
    intro: "Your trip starts with the same causeway crossing. What changes is the road after Saudi immigration.",
    select: "Choose a destination",
    other: "Somewhere else",
    otherBody: "Send the address on WhatsApp and we'll confirm the route and fare.",
    km: "km",
    typical: "typical",
    open: "Open route",
    near: "Relatively close after the crossing.",
    far: "The causeway is roughly the midpoint, or less, of this trip.",
    reverse: "Coming the other way?",
    reverseLinks: { dammam: "Dammam → Bahrain", khobar: "Khobar → Bahrain" },
    airport: {
      heading: "Flying? The flight sets the deadline.",
      body: "Airport routes are planned differently because a flight time doesn't move for the border.",
      toDmm: { label: "Bahrain → Dammam Airport", body: "Work backwards from your departure time, with a buffer for the crossing." },
      fromBah: { label: "Bahrain Airport → Dammam", body: "Coordinated around your landing, then straight across the causeway." },
    },
  },

  fare: {
    eyebrow: "The fare",
    heading: "One crossing. One confirmed fare.",
    parts: ["Vehicle", "Driver", "Fuel", "Causeway toll", "Standard border waiting", "To your final destination"],
    confirmed: "Confirmed before travel",
    dependsLabel: "The final fare depends on",
    depends: ["Pickup", "Destination", "Date", "Time", "Vehicle", "Passengers", "Special requirements"],
    toll: {
      heading: "No surprise toll at the bridge",
      body: "The causeway toll is already built into the fare we quote, so there's nothing to work out or pay at the barrier.",
    },
    cta: "Get My Causeway Fare",
    allFares: "All route fares",
  },

  book: {
    eyebrow: "Booking",
    heading: "The booking follows the crossing",
    steps: [
      { n: "01", title: "Tell us the trip", body: "Direction, pickup, destination, date, time, passengers." },
      { n: "02", title: "Choose the vehicle", body: "Sedan, SUV, van or luxury." },
      { n: "03", title: "We confirm", body: "Vehicle, fare and pickup details." },
      { n: "04", title: "Pickup", body: "The driver collects you." },
      { n: "05", title: "The crossing", body: "Both posts and the causeway." },
      { n: "06", title: "Destination", body: "Straight on to your address." },
    ],
    checklist: {
      heading: "Before you cross",
      items: ["Valid passport or accepted ID", "Any visa or entry permit you need", "Other travel documents", "Destination-country entry requirements checked", "Pickup address confirmed", "Destination confirmed", "Passenger count confirmed", "Vehicle confirmed", "Driver contact saved"],
      progress: "done",
    },
    previewTag: "Example causeway booking",
    customer: [
      "Hello, I need a private taxi from Bahrain to Dammam.",
      "Pickup: Juffair, Bahrain",
      "Date: 15 October",
      "Time: 8:00 AM",
      "Passengers: 3",
      "Luggage: 3 large bags",
      "Vehicle: SUV",
    ],
    reply: "Thanks. We'll confirm the vehicle and fixed fare for the complete cross-border journey.",
    exampleOnly: "Example only.",
    send: "WhatsApp My Trip",
  },

  walk: {
    heading: "Can I walk across?",
    body: "No. The causeway is a vehicle crossing with no pedestrian lane for passenger traffic.",
    cta: "Need a vehicle across the causeway?",
  },

  faq: {
    eyebrow: "Questions",
    heading: "King Fahd Causeway questions",
    items: [
      { question: "How long is the King Fahd Causeway?", answer: "About 25 km, from Al Jasra in Bahrain to the Saudi coast near Khobar. It opened in 1986." },
      { question: "How long does it take to cross?", answer: "The bridge drive itself is about 20 to 30 minutes. The two border stops come on top of that: outside peak periods they typically add around 30 to 40 minutes together, and more when it's busy. Your total journey also includes the road before and after." },
      { question: "Is the causeway open 24 hours?", answer: "It generally operates around the clock, and so do we. Queue times vary by the hour, and maintenance, weather or security measures can affect it at short notice." },
      { question: "Is the toll included?", answer: "Yes. Every fare we quote has the causeway toll built in, so there's nothing extra to pay at the barrier." },
      { question: "Do I clear immigration once or twice?", answer: "Twice on a one-way trip: at the post of the country you're leaving and at the post of the country you're entering. Both are on the border island roughly midway across." },
      { question: "Do passengers stay in the same vehicle?", answer: "Yes. The same car and driver take you from your pickup, through both posts, to your destination. There's no changeover at the border." },
      { question: "Can I travel from Bahrain to Khobar?", answer: "Yes. Khobar is the closest Saudi city to the causeway, so the road after Saudi immigration is short. See the Bahrain to Khobar page for fares and timing." },
      { question: "Can I travel from Bahrain to Dammam?", answer: "Yes, it's our most common route. Dammam is a little further along the coast than Khobar." },
      { question: "Can I go to Dammam Airport?", answer: "Yes. Airport runs are planned back from your flight time with a buffer for the border. Use the Bahrain to Dammam Airport page." },
      { question: "Can I travel from Saudi Arabia back to Bahrain?", answer: "Yes. The crossing works the same in reverse: Saudi exit first, then Bahrain entry, then on to your Bahrain address." },
      { question: "Can I book a private vehicle?", answer: "Every booking is private: one vehicle and driver for your party, not a shared ride." },
      { question: "What documents do I need?", answer: "A valid passport, or a GCC national ID where accepted, plus any visa or entry permit your nationality requires for the country you're entering. Requirements change, so check yours before travelling." },
      { question: "Do I need a Saudi visa?", answer: "It depends on your nationality, residency and the current rules. GCC nationals often cross with a national ID; most others need a visa or permit. We don't process visas, so confirm your own requirements with official sources." },
      { question: "Can the driver guarantee entry?", answer: "No. Entry and exit decisions are made by the immigration officers. The driver handles the vehicle and the vehicle-side process only." },
      { question: "What happens if the border is busy?", answer: "You wait in the queue like everyone else; standard border waiting is included in the fare. If a long delay affects your plans at the other end, tell the team." },
      { question: "Are Thursday evenings busy?", answer: "They can be. Thursday evenings see weekend traffic, as do Friday mornings and public holidays. It's not a rule, but if your timing is flexible it's worth considering." },
      { question: "What about Friday mornings?", answer: "Also a time that can be busier, for the same weekend reasons. Conditions vary, so we can't promise a quick crossing at any particular hour." },
      { question: "Can I cross late at night?", answer: "Yes, we run 24/7. Night trips are booked the same way. Don't assume a night crossing will be faster; it may or may not be." },
      { question: "Can families travel together?", answer: "Yes. The SUV takes up to four passengers and the van up to seven, so a family stays in one vehicle through both posts." },
      { question: "What vehicle should I choose?", answer: "A sedan for one to three people with normal luggage, an SUV for up to four or extra bags, a van for up to seven or a lot of luggage, and a luxury sedan for executive trips." },
      { question: "Can I book a van?", answer: "Yes. The van (Hiace, Starex or Sprinter class) takes up to seven passengers and six large suitcases." },
      { question: "Is waiting time included?", answer: "Standard waiting at the border posts is included. Extended waiting, for example if you want the driver to wait for hours at your destination, is quoted separately." },
      { question: "Can I book a visa U-turn?", answer: "Yes. That's a round trip through all four checkpoints in one go, with the same driver. See the visa U-turn page for how it works." },
      { question: "Can I book a round trip?", answer: "Yes. Give us both dates and times and the two legs are quoted together." },
      { question: "How do I get the exact fare?", answer: "Send the direction, pickup, destination, date, time, passengers and vehicle. The planner on this page writes that WhatsApp message for you." },
    ],
  },

  final: {
    heading: "Cross the causeway with the journey already planned.",
    body: "Send your pickup point, destination, date, passengers and vehicle preference. We'll confirm the vehicle and all-inclusive fare before you travel.",
    primary: "Get My Causeway Fare",
    secondary: "WhatsApp My Trip",
  },

  sticky: { primary: "Get My Causeway Fare", whatsapp: "WhatsApp" },
};

export type CausewayCopy = typeof CAUSEWAY;
