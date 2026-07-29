import { VehicleClass } from "@/content/fares";

export type RouteSection = {
  heading: string;
  paragraphs: string[];
};

export type RouteFaq = {
  question: string;
  answer: string;
};

/**
 * Single typed source of truth per cross-border route. Tier-2 route pages
 * render entirely from this file — change a fare, distance, or FAQ here
 * and every page that references it updates together.
 */
export type RouteContent = {
  slug: string;
  primaryKeyword: string;
  from: string;
  to: string;
  fromCountry: "Bahrain" | "Saudi Arabia";
  toCountry: "Bahrain" | "Saudi Arabia";
  distanceKm: number;
  durationLabel: string; // e.g. "70-90 min"
  borderLabel: string; // e.g. "15-20 min"
  vehicles: VehicleClass[];
  shortBlurb: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  sections: RouteSection[];
  pickupAreas: string[];
  faqs: RouteFaq[];
  related: string[]; // sibling route slugs
};

export const ROUTES: RouteContent[] = [
  {
    slug: "taxi-bahrain-to-dammam",
    primaryKeyword: "Bahrain to Dammam taxi fare",
    from: "Bahrain",
    to: "Dammam",
    fromCountry: "Bahrain",
    toCountry: "Saudi Arabia",
    distanceKm: 130,
    durationLabel: "70–90 min",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "The core corridor run: door-to-door from anywhere in Bahrain to Dammam via the King Fahd Causeway, fixed fare, tolls included.",
    metaTitle: "Taxi Bahrain to Dammam | Fixed Fare Causeway Transfer 24/7",
    metaDescription:
      "Book a licensed taxi from Bahrain to Dammam via King Fahd Causeway. Fixed all-inclusive fares, tolls covered, door-to-door in about 1.5 hours. WhatsApp for an instant quote.",
    intro: [
      "A taxi from Bahrain to Dammam covers around 130 km door-to-door, and on a normal day the whole trip — pickup, the King Fahd Causeway itself, both immigration stops, and the final run into Dammam — takes about 70 to 90 minutes. It is the busiest corridor we run, and the one most passengers mean when they ask for \"the Bahrain to Dammam taxi.\"",
      "We quote one fixed, all-inclusive fare per vehicle class before you travel, with the causeway toll already built in. You confirm the pickup point, time, and vehicle on WhatsApp, and that is the number you pay — no meter, no surprise add-on at the border.",
      "This is a one-driver, one-vehicle service the whole way: the same car and driver that pick you up in Bahrain are the ones that drop you at your Dammam address, with no changeover at the border.",
    ],
    sections: [
      {
        heading: "Journey Breakdown: Bahrain to Dammam Step by Step",
        paragraphs: [
          "Your driver collects you from your Bahrain address and drives to the Bahrain-side immigration and customs post at the start of the King Fahd Causeway. Processing here usually takes 15 to 20 minutes outside of peak periods, longer on Thursday evenings, Friday mornings, and public holidays when GCC road traffic is heaviest.",
          "From there it's the causeway itself: 25 km of bridge and reclaimed island crossing the Gulf, normally a 20 to 30 minute drive at the posted speed limits. Midway across sits the man-made island that splits the two countries' checkpoints — this is also where the halfway marker and the joint facilities are located.",
          "On the Saudi side, a second immigration and customs post processes your entry, typically another 15 to 20 minutes. After that it's a straight run up the King Fahd Road / Dammam–Khobar corridor into central Dammam, with your driver taking you directly to your final address rather than a taxi stand or city-centre drop-off point.",
        ],
      },
      {
        heading: "Pickup Areas We Cover in Bahrain",
        paragraphs: [
          "We collect passengers from anywhere on the island, not just central Manama. The most common pickups are Manama itself, Juffair, Seef, Adliya, and Muharraq, along with Riffa, Amwaj Islands, Budaiya, Isa Town, Hamad Town, Sitra, and Bahrain International Airport for passengers landing before continuing straight on to Dammam.",
          "If your address is outside these areas, message us the exact location on WhatsApp — we cover the whole island, the fare is simply confirmed against the actual pickup point rather than a flat island-wide rate.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included in the fare: the vehicle and driver for the full door-to-door trip, fuel, the causeway toll, and standard waiting time at both immigration posts. The price you're quoted on WhatsApp is the price you pay, regardless of how long the border queue happens to run that day.",
          "Not included: any Saudi entry visa or permit fee you personally require, food and drink purchases en route, and anything outside the standard pickup-to-drop-off scope, such as a detour to a second address. Vehicle insurance and the car's own border paperwork are handled entirely by us and never your concern.",
        ],
      },
      {
        heading: "Documents and Border Process for Bahrain to Saudi Arabia",
        paragraphs: [
          "You'll need a valid passport (GCC nationals may use a national ID where accepted) and whatever visa or entry permit your nationality requires for Saudi Arabia. At each immigration post, passengers hand over their own documents at the counter or window; your driver handles the vehicle's paperwork alongside you but does not process your passport on your behalf.",
          "We do not guarantee entry decisions, visa outcomes, or how long any individual officer takes with your documents — passengers are responsible for their own travel documents and complete their own immigration formalities at each post. If your nationality requires a pre-approved e-visa or permit for Saudi Arabia, arrange that before travel; we can share what we generally see other passengers carry, but we are not a visa authority.",
        ],
      },
      {
        heading: "Choosing Your Vehicle",
        paragraphs: [
          "A sedan covers one to three passengers with normal luggage comfortably. Families or anyone travelling with extra bags, a stroller, or golf clubs tend to prefer the SUV, which carries the same one to four passengers with more boot space. Groups of up to seven travelling together take the van rather than splitting across two cars, and the Mercedes S-Class luxury option is popular for executive travel and airport meet-and-greet arrivals where the vehicle itself matters.",
        ],
      },
    ],
    pickupAreas: [
      "manama",
      "juffair",
      "seef",
      "muharraq",
      "riffa",
      "adliya",
      "amwaj-islands",
      "budaiya",
      "isa-town",
      "hamad-town",
      "sitra",
      "bahrain-airport",
    ],
    faqs: [
      {
        question: "How long does the Bahrain to Dammam taxi actually take?",
        answer:
          "Door-to-door it's usually 70 to 90 minutes: the drive to the Bahrain immigration post, the 25 km causeway (20–30 minutes), the Saudi immigration post, then the final leg into Dammam. Thursday evenings, Friday mornings, and public holidays run longer at the border.",
      },
      {
        question: "Is the fare fixed, or does it change if the border queue is long?",
        answer:
          "It's fixed once confirmed on WhatsApp for your pickup point, date, and vehicle. Standard waiting time at both immigration posts is already built into that fare — a longer-than-usual queue doesn't change what you pay.",
      },
      {
        question: "Can I book a one-way trip, or does it have to be round trip?",
        answer:
          "One-way is the default and the most common booking. Round trips are available too and quoted as two legs, confirmed together on WhatsApp.",
      },
      {
        question: "Do I need a visa to cross from Bahrain into Saudi Arabia?",
        answer:
          "It depends on your nationality. GCC nationals typically cross with a national ID; most other nationalities need a valid Saudi visa or entry permit arranged in advance. You are responsible for your own documents — we don't process visas or guarantee entry decisions.",
      },
      {
        question: "Where exactly will I be dropped off in Dammam?",
        answer:
          "At the exact address you give us — a home, hotel, office, or the airport — not a taxi stand or city-centre point. Confirm the address when you book so the fare quote matches the real drop-off point.",
      },
      {
        question: "What's the difference between this route and the Bahrain to Khobar taxi?",
        answer:
          "Khobar sits closer to the Saudi end of the causeway than Dammam does, so that run is shorter and slightly cheaper. If your destination is genuinely Dammam city, this route is the direct one; if it's Khobar, use the Bahrain to Khobar route instead.",
      },
      {
        question: "Can the driver help with luggage at the immigration posts?",
        answer:
          "Yes, your driver assists with loading and unloading bags at each stop. What they can't do is carry or process your passport for you — immigration formalities are handled by each passenger individually at the counter.",
      },
      {
        question: "Is this available for a very early morning or late night crossing?",
        answer:
          "Yes, we run this route 24 hours a day, seven days a week, including overnight and early-morning pickups for flight connections.",
      },
    ],
    related: [
      "taxi-dammam-to-bahrain",
      "bahrain-to-dammam-airport-taxi",
      "king-fahd-causeway-taxi",
    ],
  },
  {
    slug: "taxi-dammam-to-bahrain",
    primaryKeyword: "Dammam to Bahrain taxi",
    from: "Dammam",
    to: "Bahrain",
    fromCountry: "Saudi Arabia",
    toCountry: "Bahrain",
    distanceKm: 130,
    durationLabel: "70–90 min",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "The return leg: Dammam pickup to any Bahrain address, same fixed fare structure and causeway crossing.",
    metaTitle: "Dammam to Bahrain Taxi | Fixed Fare Causeway Transfer 24/7",
    metaDescription:
      "Licensed taxi from Dammam to Bahrain via King Fahd Causeway. Fixed fares in SAR and BHD, tolls included, door-to-door in about 1.5 hours. Get a quote on WhatsApp.",
    intro: [
      "A taxi from Dammam to Bahrain runs the same 130 km corridor in reverse: pickup anywhere in Dammam, the King Fahd Causeway crossing, and drop-off at your exact Bahrain address, in a typical 70 to 90 minutes including both immigration stops.",
      "Most bookings on this direction are residents and business travellers heading into Bahrain for the weekend, a meeting, or a flight out of Bahrain International Airport. The fare is fixed and quoted in both SAR and BHD before you travel, with the causeway toll already included.",
      "Same driver, same vehicle, from your Dammam pickup point to your Bahrain drop-off — no changeover at the border and no need to arrange a second taxi on the other side.",
    ],
    sections: [
      {
        heading: "Journey Breakdown: Dammam to Bahrain Step by Step",
        paragraphs: [
          "Pickup is at your Dammam address — home, hotel, office, or King Fahd International Airport arrivals. Your driver takes the King Fahd Road corridor down to the Saudi-side immigration and customs post at the start of the causeway, typically a 15 to 20 minute process.",
          "The causeway crossing itself covers 25 km and normally takes 20 to 30 minutes, ending at the Bahrain-side immigration and customs post for a second, similarly timed check.",
          "From the Bahrain post, it's a short run across the island to your final address. Traffic through Thursday evening and Friday morning tends to be heavier in the Saudi-to-Bahrain direction as weekend travel peaks, so we build extra buffer into pickup timing around those windows.",
        ],
      },
      {
        heading: "Where We Pick Up in Dammam",
        paragraphs: [
          "We collect passengers from anywhere in greater Dammam, including the corniche and downtown areas, residential compounds, hotels near King Fahd International Airport, and business districts closer to the Khobar–Dammam boundary. Message your exact pickup location on WhatsApp when you book so the fare is confirmed against the real address rather than a general city rate.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the full door-to-door vehicle and driver, fuel, the causeway toll, and standard waiting time at both immigration posts, all covered by the fixed fare confirmed on WhatsApp before you travel.",
          "Not included: any Bahrain entry visa or permit fee your nationality requires, personal purchases en route, and detours beyond the agreed pickup and drop-off points. The vehicle's own insurance and border documentation are handled by us.",
        ],
      },
      {
        heading: "Documents and Border Process for Saudi Arabia to Bahrain",
        paragraphs: [
          "You'll need a valid passport (GCC nationals may use a national ID where accepted) and any Bahrain entry visa or permit your nationality requires — most GCC and a number of other nationalities receive a visa on arrival, but requirements vary and change, so confirm your own eligibility before travelling.",
          "Each passenger presents their own documents at the Saudi exit post and again at the Bahrain entry post; your driver is present throughout but does not handle your passport for you. We do not guarantee entry decisions or immigration outcomes — that responsibility sits with each passenger.",
        ],
      },
      {
        heading: "Choosing Your Vehicle",
        paragraphs: [
          "Sedans suit one to three passengers with standard luggage. The SUV gives the same passenger range extra boot space, useful for families or anyone carrying more than the usual two suitcases. Groups of up to seven take the van as a single vehicle, and the Mercedes S-Class is available where a higher standard of vehicle is wanted for the trip.",
        ],
      },
      {
        heading: "Good to Know Before You Travel",
        paragraphs: [
          "Book at least a few hours ahead where possible, especially for Thursday evening and Friday morning departures, so we can allocate a driver and confirm the fare against your exact Dammam pickup point without a last-minute rush.",
          "If your plans change, message us on WhatsApp as early as you can — moving a pickup time by an hour or two is normally straightforward, but a same-minute cancellation close to departure makes it harder for us to reassign the driver to another passenger.",
        ],
      },
    ],
    pickupAreas: [],
    faqs: [
      {
        question: "How long does the Dammam to Bahrain taxi take?",
        answer:
          "Typically 70 to 90 minutes door-to-door: the drive to the Saudi immigration post, the causeway crossing itself (20–30 minutes), the Bahrain immigration post, then the final leg to your Bahrain address.",
      },
      {
        question: "Can you pick me up directly from Dammam Airport?",
        answer:
          "Yes — for arrivals at King Fahd International Airport (DMM) heading into Bahrain, use this route or the dedicated Dammam Airport to Bahrain taxi page, which includes flight-aware pickup timing.",
      },
      {
        question: "Do I need a Bahrain visa on this direction?",
        answer:
          "It depends on your nationality — many GCC and a range of other nationalities can obtain a Bahrain visa on arrival, but rules vary and change. Confirm your own eligibility before travelling; we don't process visas or guarantee entry.",
      },
      {
        question: "Is the fare quoted in SAR or BHD?",
        answer:
          "Both — every fare is shown in BHD and SAR so you can confirm it however is easiest, and it's fixed once agreed on WhatsApp regardless of which currency you pay in.",
      },
      {
        question: "What if I'm travelling with family and extra luggage?",
        answer:
          "Choose the SUV or van rather than a sedan — both carry more luggage and, in the van's case, up to seven passengers without splitting the group across two cars.",
      },
      {
        question: "Is Thursday evening a bad time to cross from Dammam to Bahrain?",
        answer:
          "It's the busiest window on this direction, as GCC weekend travel peaks. We still run it, just with extra time built into the pickup schedule for a longer border queue.",
      },
      {
        question: "Can I book this for a late-night or very early pickup?",
        answer:
          "Yes, this route runs 24 hours a day, seven days a week, including overnight crossings for early flight connections out of Bahrain.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "A few hours' notice is usually enough, though booking the evening before is safer around Thursday and Friday peak travel or public holidays, when vehicles are in higher demand.",
      },
      {
        question: "Can I pay in Bahraini Dinar even though I'm picked up in Saudi Arabia?",
        answer:
          "Yes, every fare is quoted in both BHD and SAR, and you can settle in whichever currency is easiest once the trip is confirmed on WhatsApp.",
      },
    ],
    related: [
      "taxi-bahrain-to-dammam",
      "dammam-airport-to-bahrain-taxi",
      "king-fahd-causeway-taxi",
    ],
  },
  {
    slug: "bahrain-to-dammam-airport-taxi",
    primaryKeyword: "Bahrain to Dammam airport taxi",
    from: "Bahrain",
    to: "Dammam Airport (DMM)",
    fromCountry: "Bahrain",
    toCountry: "Saudi Arabia",
    distanceKm: 145,
    durationLabel: "80–100 min",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "Direct transfer from any Bahrain address to King Fahd International Airport (DMM), timed around your flight.",
    metaTitle: "Bahrain to Dammam Airport Taxi | DMM Transfer 24/7",
    metaDescription:
      "Book a taxi from Bahrain to Dammam Airport (DMM) via the King Fahd Causeway. Fixed fare, flight-friendly timing, door-to-door. Get an instant WhatsApp quote.",
    intro: [
      "A taxi from Bahrain to Dammam Airport takes you from your Bahrain address straight through the King Fahd Causeway to King Fahd International Airport (DMM) departures, around 145 km and typically 80 to 100 minutes including both immigration stops.",
      "Because the destination is a flight, not a city address, timing is built backwards from your departure time rather than a fixed pickup slot — tell us your flight and we work out a pickup time with enough buffer for border traffic.",
      "Fixed fare, tolls included, one driver the whole way to the terminal drop-off.",
    ],
    sections: [
      {
        heading: "Journey Breakdown: Bahrain to Dammam Airport",
        paragraphs: [
          "Pickup is at your Bahrain address, followed by the drive to the Bahrain-side immigration post at the start of the causeway (15–20 minutes typically), the 25 km crossing itself (20–30 minutes), and the Saudi-side immigration post (15–20 minutes).",
          "From the Saudi post it's a run up to King Fahd International Airport's terminal road and directly to the departures curb for your specific terminal — we ask which airline you're flying so the driver takes you to the right entrance rather than a general drop-off point.",
        ],
      },
      {
        heading: "Flight-Friendly Pickup Timing",
        paragraphs: [
          "For an international departure from DMM, we generally recommend arriving at the terminal at least 2.5 to 3 hours before your flight, working backward from the 80–100 minute drive time plus a buffer for border queues, which can run longer on Thursday evenings, Friday mornings, and public holidays.",
          "We track typical border conditions for the day and time you specify and build the buffer into your suggested pickup time — if your flight is very early morning or overnight, say so on WhatsApp and we'll schedule the pickup accordingly.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the vehicle and driver for the full trip, fuel, the causeway toll, and standard waiting time at both immigration posts, all within the fixed fare.",
          "Not included: your flight ticket and any airport-side fees, and any Saudi entry visa or permit your nationality requires. We do not guarantee flight connections — border and traffic conditions are outside our control, which is why we build in a timing buffer rather than promising an exact arrival time.",
        ],
      },
      {
        heading: "Documents and Border Process",
        paragraphs: [
          "A valid passport (or GCC national ID where accepted) and any Saudi entry visa or permit your nationality requires are needed to cross. Each passenger handles their own documents at both immigration posts; the driver manages the vehicle's own paperwork.",
          "Passengers are responsible for their own travel documents and immigration formalities, and for meeting their airline's check-in and document requirements at DMM. We do not guarantee entry decisions or specific arrival times at the terminal.",
        ],
      },
      {
        heading: "Choosing Your Vehicle for an Airport Run",
        paragraphs: [
          "A sedan suits one to three passengers with standard check-in luggage. Families or anyone with extra bags typically take the SUV, groups of up to seven take the van rather than two separate airport taxis, and the Mercedes S-Class is a common choice for executive travellers who want a higher standard of vehicle for the airport leg.",
        ],
      },
      {
        heading: "Booking Ahead for a Flight",
        paragraphs: [
          "Because this route is timed against a specific departure, we recommend booking as soon as your flight is confirmed rather than the day before, particularly for early-morning departures or travel around Thursday, Friday, and public holidays when both border traffic and vehicle demand are higher.",
          "Share your flight number, terminal, and departure time on WhatsApp when you book — if your airline later changes the schedule, message us the update and we'll adjust the pickup time to match.",
        ],
      },
    ],
    pickupAreas: [
      "manama",
      "juffair",
      "seef",
      "muharraq",
      "riffa",
      "adliya",
      "amwaj-islands",
      "budaiya",
      "isa-town",
      "hamad-town",
      "sitra",
      "bahrain-airport",
    ],
    faqs: [
      {
        question: "How early should I leave Bahrain for a Dammam Airport flight?",
        answer:
          "As a rule of thumb, allow 80–100 minutes of drive time plus at least 2.5–3 hours before an international flight in total, more around Thursday evening, Friday morning, or public holidays when the border is busier.",
      },
      {
        question: "Do you track my flight?",
        answer:
          "For this direction, timing is built around your stated departure time rather than live tracking, since you're heading to the airport rather than arriving from it. Tell us your flight number and departure time and we calculate the pickup time from there.",
      },
      {
        question: "What happens if there's a long queue at the border?",
        answer:
          "The fare doesn't change, but your travel time might. We build a border-traffic buffer into the suggested pickup time specifically to absorb this, especially around weekend peak periods.",
      },
      {
        question: "Which terminal do you drop off at?",
        answer:
          "We ask your airline when you book and take you to the correct departures entrance at King Fahd International Airport rather than a general terminal drop-off point.",
      },
      {
        question: "Can I book a group airport transfer?",
        answer:
          "Yes — the van covers up to seven passengers in one vehicle, useful for families or colleagues flying out together rather than splitting into two cars.",
      },
      {
        question: "Do you offer a corporate account for regular staff travel to DMM?",
        answer:
          "Yes, if your company sends staff to Dammam Airport regularly, our corporate accounts service consolidates billing and booking for multiple employees under one arrangement.",
      },
      {
        question: "Do I need a Saudi visa just to reach the airport from Bahrain?",
        answer:
          "Yes, reaching DMM by road still means entering Saudi Arabia via the causeway, so the same visa or entry permit rules apply as any other Bahrain to Saudi Arabia crossing. Confirm your own nationality's requirements before travel.",
      },
      {
        question: "Is it cheaper to fly out of Bahrain instead of driving to DMM?",
        answer:
          "That depends on your specific flight prices and schedule — some passengers choose DMM because of better fares or timing on a particular route. We simply handle the transfer either way; comparing ticket prices is between you and the airlines.",
      },
      {
        question: "Can the driver wait if my flight is delayed before I've even left Bahrain?",
        answer:
          "Yes — since you haven't departed yet, we simply adjust your pickup time to match the new departure, provided you let us know as soon as the airline confirms the change.",
      },
      {
        question: "Can I book a return leg for when I land back at DMM?",
        answer:
          "Yes — book both legs together and we'll confirm your outbound pickup from Bahrain now and your arrival pickup at DMM once you have a return flight number to track.",
      },
    ],
    related: [
      "dammam-airport-to-bahrain-taxi",
      "taxi-bahrain-to-dammam",
      "airport-transfers",
    ],
  },
  {
    slug: "dammam-airport-to-bahrain-taxi",
    primaryKeyword: "DMM airport to Bahrain taxi",
    from: "Dammam Airport (DMM)",
    to: "Bahrain",
    fromCountry: "Saudi Arabia",
    toCountry: "Bahrain",
    distanceKm: 145,
    durationLabel: "80–100 min",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "Meet-and-greet pickup at King Fahd International Airport (DMM) for the transfer back into Bahrain.",
    metaTitle: "Dammam Airport to Bahrain Taxi | DMM Arrivals Transfer 24/7",
    metaDescription:
      "Pre-book a taxi from Dammam Airport (DMM) to Bahrain. Flight tracking, fixed fare, causeway crossing included. Confirm your ride on WhatsApp.",
    intro: [
      "A taxi from Dammam Airport to Bahrain meets you at King Fahd International Airport (DMM) arrivals and drives you through the King Fahd Causeway to your Bahrain address — around 145 km, typically 80 to 100 minutes once you're through the terminal and in the car.",
      "Because this leg starts with a flight landing, we track your flight number so the pickup adjusts automatically to early or delayed arrivals rather than a fixed clock time.",
      "One driver meets you at arrivals with a name board, loads your luggage, and takes you the whole way to your Bahrain address — no second taxi needed after the border.",
    ],
    sections: [
      {
        heading: "Meeting You at Arrivals",
        paragraphs: [
          "Your driver waits in the arrivals hall with a name board and monitors your flight status, adjusting the pickup time for early or delayed landings so you're not left waiting and we're not sitting idle for hours either. Once you're through immigration and baggage claim on the Saudi side, we head straight for the car.",
          "From King Fahd International Airport it's a drive of roughly 30–40 minutes to the Saudi-side causeway immigration post, the 25 km crossing itself (20–30 minutes), a second immigration post on the Bahrain side, and then on to your final Bahrain address.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: arrivals meet-and-greet, flight monitoring, the vehicle and driver for the full trip, fuel, the causeway toll, and standard waiting time at both immigration posts.",
          "Not included: any Bahrain entry visa or permit your nationality requires, and time spent in Saudi airport immigration and baggage claim itself, which is outside the taxi service and can vary by flight and time of day.",
        ],
      },
      {
        heading: "Documents and Border Process",
        paragraphs: [
          "You'll need your passport (already used for Saudi arrival immigration) and any Bahrain entry visa or permit your nationality requires for the causeway crossing. Passengers handle their own documents at each post; the driver manages the vehicle paperwork.",
          "We do not guarantee entry decisions, visa outcomes, or exact arrival times at your Bahrain address — border conditions vary, particularly around weekend travel peaks.",
        ],
      },
      {
        heading: "Choosing Your Vehicle",
        paragraphs: [
          "A sedan is enough for one to three passengers with standard airport luggage. The SUV suits families or extra bags, the van covers groups of up to seven in a single vehicle, and the Mercedes S-Class is available for executive arrivals where a higher standard of vehicle is wanted from the terminal onward.",
        ],
      },
      {
        heading: "After a Long Flight",
        paragraphs: [
          "Landing after an international flight usually means you'd rather not deal with negotiating a taxi rank or working out currency on the spot. Because the fare and vehicle are already confirmed before you land, there's nothing to arrange at the airport beyond finding your driver at the name board.",
          "If you're travelling with young children, medical equipment, or anything else that needs particular care in the vehicle, mention it on WhatsApp when you book so the right vehicle and any extra time is planned in from the start.",
          "Connecting passengers who landed at DMM from a domestic or regional flight and are continuing straight to Bahrain follow the same process — the pickup point is simply the arrivals hall rather than a city address, and the rest of the trip runs exactly as it would for any Dammam departure.",
        ],
      },
    ],
    pickupAreas: [],
    faqs: [
      {
        question: "Do you track my flight for delays?",
        answer:
          "Yes, we monitor your flight number and adjust the pickup timing for early or delayed arrivals, so the driver is there when you actually land rather than at a fixed clock time.",
      },
      {
        question: "Where do I meet the driver?",
        answer:
          "In the arrivals hall at King Fahd International Airport, with a name board, after you've cleared Saudi immigration and baggage claim.",
      },
      {
        question: "How long from landing to my Bahrain address?",
        answer:
          "Budget roughly 80–100 minutes of drive time once you're in the car, on top of however long immigration and baggage claim take inside the airport itself.",
      },
      {
        question: "What if my flight is delayed by a few hours?",
        answer:
          "Tell us the flight number when you book — we track it and adjust the driver's arrival accordingly, so a delay doesn't leave you without a ride.",
      },
      {
        question: "Do I need a Bahrain visa arriving this way?",
        answer:
          "It depends on your nationality — confirm your own eligibility for a Bahrain visa on arrival before you fly, since rules vary and we don't process visas or guarantee entry.",
      },
      {
        question: "Can the whole family travel together from the airport?",
        answer:
          "Yes, the van covers up to seven passengers in one vehicle, which keeps a family or group together rather than splitting across two taxis after a long flight.",
      },
      {
        question: "What if I can't find the driver in arrivals?",
        answer:
          "We share the driver's name and number on WhatsApp ahead of your landing, so if the name board is hard to spot in a crowded arrivals hall, you can call or message directly.",
      },
      {
        question: "Do you charge extra for night arrivals?",
        answer:
          "No, the fare is the same whether your flight lands at midday or 3 a.m. — we run this route 24 hours a day, seven days a week.",
      },
    ],
    related: [
      "bahrain-to-dammam-airport-taxi",
      "taxi-dammam-to-bahrain",
      "airport-transfers",
    ],
  },
  {
    slug: "bahrain-airport-to-dammam-taxi",
    primaryKeyword: "Bahrain airport to Dammam taxi",
    from: "Bahrain International Airport (BAH)",
    to: "Dammam",
    fromCountry: "Bahrain",
    toCountry: "Saudi Arabia",
    distanceKm: 150,
    durationLabel: "80–100 min",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "Land at Bahrain International Airport (BAH) and continue straight on to Dammam without a city stop.",
    metaTitle: "Bahrain Airport to Dammam Taxi | BAH Arrivals Transfer 24/7",
    metaDescription:
      "Taxi from Bahrain International Airport (BAH) straight through to Dammam via the King Fahd Causeway. Fixed fare, meet-and-greet, door-to-door.",
    intro: [
      "A taxi from Bahrain International Airport to Dammam is for passengers who land in Bahrain and continue straight across the King Fahd Causeway rather than stopping in Bahrain itself — about 150 km and typically 80 to 100 minutes from the terminal to a Dammam address.",
      "Your driver meets you at BAH arrivals, tracks your flight for early or delayed landings, and takes you directly across the causeway rather than into Manama first.",
      "Fixed fare, one vehicle the whole way, no separate onward taxi needed once you land.",
    ],
    sections: [
      {
        heading: "Meeting You at Bahrain International Airport",
        paragraphs: [
          "Your driver waits at BAH arrivals with a name board and follows your flight status so the pickup lines up with when you actually land, not a fixed clock time. Once you're through Bahrain immigration and baggage claim, we load up and head straight for the causeway rather than routing through Manama.",
          "From the airport it's roughly 20–30 minutes to the Bahrain-side causeway immigration post, the 25 km crossing (20–30 minutes), the Saudi-side immigration post, and then the final run into Dammam.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: arrivals meet-and-greet, flight monitoring, the vehicle and driver for the whole trip, fuel, the causeway toll, and standard waiting time at both immigration posts.",
          "Not included: any Saudi entry visa or permit your nationality requires, and time spent inside Bahrain airport immigration and baggage claim before you reach the vehicle.",
        ],
      },
      {
        heading: "Documents and Border Process",
        paragraphs: [
          "You'll need your passport and any Saudi entry visa or permit your nationality requires to cross the causeway into Saudi Arabia. Each passenger handles their own documents at both immigration posts; the driver manages the vehicle paperwork throughout.",
          "We do not guarantee entry decisions or exact arrival times in Dammam — border conditions vary by time of day and day of week, and passengers are responsible for their own travel documents.",
        ],
      },
      {
        heading: "Choosing Your Vehicle",
        paragraphs: [
          "A sedan is enough for one to three passengers with normal luggage. Families or anyone with extra bags tend to prefer the SUV, groups of up to seven take the van as one vehicle, and the Mercedes S-Class suits executive arrivals continuing straight on to a Dammam meeting or hotel.",
        ],
      },
      {
        heading: "Connecting Straight Through",
        paragraphs: [
          "This route exists specifically for passengers whose real destination is Saudi Arabia, not Bahrain — a connecting arrival rather than a stop. Because you're not clearing a hotel check-in or a city stop first, the driver takes you directly from the BAH arrivals curb toward the causeway with no detour into Manama.",
          "If your itinerary has you landing in Bahrain and later flying onward from Dammam or Khobar rather than driving back, tell us on WhatsApp — we can plan the full connection, including a later return leg if needed.",
          "This works equally well the other direction: some passengers land at BAH specifically because it suited their outbound flight better, with Dammam always the intended final stop rather than a spontaneous decision made after arrival.",
        ],
      },
    ],
    pickupAreas: [],
    faqs: [
      {
        question: "Do you meet me inside the terminal at BAH?",
        answer:
          "Your driver waits in the arrivals hall with a name board, after Bahrain immigration and baggage claim, and tracks your flight so the timing lines up with your actual landing.",
      },
      {
        question: "Can I go straight to Dammam without stopping in Manama?",
        answer:
          "Yes, that's exactly this route — pickup at BAH arrivals and a direct run across the causeway to your Dammam address, no city stop in between.",
      },
      {
        question: "How long from landing to arriving in Dammam?",
        answer:
          "Around 80–100 minutes of drive time once you're in the vehicle, on top of however long immigration and baggage claim take at BAH.",
      },
      {
        question: "What if my flight into Bahrain is delayed?",
        answer:
          "We track your flight number and adjust the driver's arrival time accordingly, so a delayed landing doesn't leave you without transport.",
      },
      {
        question: "Do I need a Saudi visa for this route even though I'm flying into Bahrain?",
        answer:
          "Yes — since the destination is Dammam, you're crossing into Saudi Arabia via the causeway, so the same visa or entry permit requirements apply as any other Bahrain-to-Saudi crossing.",
      },
      {
        question: "Can I stop briefly in Bahrain before continuing to Dammam?",
        answer:
          "This route is priced as a direct connection. If you want a stop in Bahrain along the way, tell us in advance so it can be quoted properly rather than assumed as a quick detour.",
      },
      {
        question: "Is luggage handling different for a connecting passenger?",
        answer:
          "No — your driver loads and unloads your bags at BAH the same way as any arrival, then carries them through both immigration posts with you to your final Dammam address.",
      },
      {
        question: "What if my BAH arrival and my Dammam meeting are only a few hours apart?",
        answer:
          "Tell us your meeting time on WhatsApp when you book and we'll plan the pickup and drive time to get you there with a reasonable buffer, factoring in typical border conditions for that day and time.",
      },
    ],
    related: [
      "taxi-bahrain-to-dammam",
      "bahrain-to-dammam-airport-taxi",
      "airport-transfers",
    ],
  },
  {
    slug: "taxi-bahrain-to-khobar",
    primaryKeyword: "taxi Bahrain to Khobar",
    from: "Bahrain",
    to: "Khobar",
    fromCountry: "Bahrain",
    toCountry: "Saudi Arabia",
    distanceKm: 115,
    durationLabel: "60–80 min",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "Khobar is the closest Saudi city to the causeway — the shortest and quickest of the standard corridor runs.",
    metaTitle: "Taxi Bahrain to Khobar | Fixed Fare Causeway Transfer 24/7",
    metaDescription:
      "Book a taxi from Bahrain to Khobar via King Fahd Causeway. Fixed fare, shortest crossing on the corridor, door-to-door in about an hour. Quote on WhatsApp.",
    intro: [
      "Khobar sits closest to the Saudi end of the King Fahd Causeway of any city on this corridor, which makes taxi Bahrain to Khobar the shortest and usually quickest of our standard routes — around 115 km and typically 60 to 80 minutes door-to-door.",
      "It's a popular run for shopping trips, weekend visits, and business meetings in Khobar's commercial districts, and for residents who live in Khobar but work or socialise in Bahrain regularly.",
      "Fixed fare, tolls included, and because the distance beyond the causeway itself is short, this is often the fastest way to reach the Eastern Province from Bahrain by road.",
    ],
    sections: [
      {
        heading: "Journey Breakdown: Bahrain to Khobar",
        paragraphs: [
          "Pickup anywhere in Bahrain, then the drive to the Bahrain-side immigration post (15–20 minutes typically), the 25 km causeway crossing (20–30 minutes), and the Saudi-side immigration post (another 15–20 minutes).",
          "From the Saudi post, Khobar itself is only a short additional drive — this is the shortest \"beyond the border\" leg of any route we run, which is why total journey times land toward the lower end of the corridor's range.",
        ],
      },
      {
        heading: "Pickup Areas We Cover in Bahrain",
        paragraphs: [
          "We collect from anywhere on the island — Manama, Juffair, Seef, Adliya, Muharraq, Riffa, Amwaj Islands, Budaiya, Isa Town, Hamad Town, Sitra, and Bahrain International Airport for passengers continuing straight on to Khobar after landing.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the vehicle and driver for the full door-to-door trip, fuel, the causeway toll, and standard waiting time at both immigration posts, all within the fixed fare confirmed before travel.",
          "Not included: any Saudi entry visa or permit fee your nationality requires, and personal purchases made once you're in Khobar. Vehicle insurance and border paperwork for the car are handled by us.",
        ],
      },
      {
        heading: "Documents and Border Process",
        paragraphs: [
          "A valid passport (or GCC national ID where accepted) and any Saudi entry visa or permit your nationality requires are needed to cross. Each passenger presents their own documents at both immigration posts.",
          "We do not guarantee entry decisions or immigration outcomes — passengers are responsible for their own travel documents and formalities at each post.",
        ],
      },
      {
        heading: "Choosing Your Vehicle",
        paragraphs: [
          "For a short shopping trip or business meeting, a sedan usually covers it for one to three passengers. Families heading to Khobar for the weekend often prefer the SUV for the extra luggage space, and groups of up to seven take the van as a single vehicle.",
        ],
      },
      {
        heading: "A Popular Weekend and Business Run",
        paragraphs: [
          "Khobar draws a steady stream of Bahrain residents for its corniche, malls, and restaurant scene, and just as many business travellers visiting the commercial offices and company headquarters based in the city. Because the crossing itself is short, it's realistic to go for a single meeting and be back in Bahrain the same evening.",
          "If you're combining a Khobar trip with a longer stay further along the coast, the Bahrain to Dammam or Bahrain to Qatif pages cover the neighbouring cities — check those if your plans might extend beyond Khobar itself.",
          "Because Khobar and Dammam are effectively neighbouring cities, some passengers aren't sure which route page applies to their destination. If you're unsure, tell us the exact address on WhatsApp and we'll confirm the correct route and fare rather than you having to work it out yourself.",
        ],
      },
    ],
    pickupAreas: [
      "manama",
      "juffair",
      "seef",
      "muharraq",
      "riffa",
      "adliya",
      "amwaj-islands",
      "budaiya",
      "isa-town",
      "hamad-town",
      "sitra",
      "bahrain-airport",
    ],
    faqs: [
      {
        question: "Why is Bahrain to Khobar faster than Bahrain to Dammam?",
        answer:
          "Khobar is the closest Saudi city to the causeway's Saudi-side terminal, so once you clear immigration there's only a short additional drive, unlike Dammam which is further along the coast.",
      },
      {
        question: "Is the fare cheaper than Bahrain to Dammam?",
        answer:
          "Yes, it's typically a little lower, reflecting the shorter overall distance and drive time. See the fare table above for the current starting price by vehicle.",
      },
      {
        question: "Can I do a same-day return trip to Khobar?",
        answer:
          "Yes, round trips are available and quoted as two legs — tell us your planned return time when you book and we'll confirm both directions together.",
      },
      {
        question: "Do I need a different visa for Khobar versus Dammam?",
        answer:
          "No — both are inside Saudi Arabia, so the same entry visa or permit rules for your nationality apply regardless of which Eastern Province city you're heading to.",
      },
      {
        question: "What's in Khobar that people usually visit?",
        answer:
          "Khobar is known for its corniche, shopping malls, and restaurant scene, and is a common weekend destination for residents of Bahrain looking for a short cross-border trip.",
      },
      {
        question: "Can I book a single meeting trip and return the same day?",
        answer:
          "Yes, this is one of the more common uses of this route — book the outbound and return together and we'll hold the driver or arrange a second pickup for your return time.",
      },
      {
        question: "Is a luxury vehicle available for a client pickup in Khobar?",
        answer:
          "Yes, the Mercedes S-Class is available on this route for business travellers who want a higher standard of vehicle for a client meeting or corporate visit.",
      },
    ],
    related: ["taxi-khobar-to-bahrain", "taxi-bahrain-to-dammam", "king-fahd-causeway-taxi"],
  },
  {
    slug: "taxi-khobar-to-bahrain",
    primaryKeyword: "Khobar to Bahrain taxi",
    from: "Khobar",
    to: "Bahrain",
    fromCountry: "Saudi Arabia",
    toCountry: "Bahrain",
    distanceKm: 115,
    durationLabel: "60–80 min",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "Return run from Khobar back into Bahrain — the fastest crossing on the whole corridor.",
    metaTitle: "Khobar to Bahrain Taxi | Fixed Fare Causeway Transfer 24/7",
    metaDescription:
      "Licensed taxi from Khobar to Bahrain via the King Fahd Causeway. Fixed fare in SAR and BHD, door-to-door in about an hour. Get a WhatsApp quote now.",
    intro: [
      "A taxi from Khobar to Bahrain is the fastest standard crossing on the corridor: pickup anywhere in Khobar, a short drive to the causeway, the crossing itself, and on to your Bahrain address — around 115 km and typically 60 to 80 minutes total.",
      "It's the route residents of Khobar use most for weekends in Bahrain, and the one business travellers take for a same-day meeting and return.",
      "Fixed fare in both SAR and BHD, tolls included, one driver the whole way.",
    ],
    sections: [
      {
        heading: "Journey Breakdown: Khobar to Bahrain",
        paragraphs: [
          "Pickup at your Khobar address, then a short drive to the Saudi-side causeway immigration post — the shortest approach leg of any route on this corridor, since Khobar sits right at the edge of the crossing.",
          "The causeway itself covers 25 km, typically 20–30 minutes, followed by the Bahrain-side immigration post and then a short run to your final Bahrain address.",
        ],
      },
      {
        heading: "Where We Pick Up in Khobar",
        paragraphs: [
          "We collect from anywhere in Khobar, including the corniche area, the main commercial districts, and residential compounds closer to the Dammam boundary. Send your exact pickup address on WhatsApp when you book so the fare is confirmed correctly.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the vehicle and driver for the full trip, fuel, the causeway toll, and standard waiting time at both immigration posts.",
          "Not included: any Bahrain entry visa or permit your nationality requires, and personal purchases en route. The vehicle's insurance and border paperwork are handled entirely by us.",
        ],
      },
      {
        heading: "Documents and Border Process",
        paragraphs: [
          "A valid passport (or GCC national ID where accepted) and any Bahrain entry visa or permit your nationality requires are needed. Each passenger presents their own documents at both immigration posts; the driver is present but does not process passports on your behalf.",
          "We do not guarantee entry decisions or immigration outcomes — this responsibility sits with each individual passenger.",
        ],
      },
      {
        heading: "Choosing Your Vehicle",
        paragraphs: [
          "A sedan covers most one-to-three-passenger weekend trips comfortably. Families or anyone with more luggage typically prefer the SUV, and groups of up to seven take the van as a single vehicle rather than splitting across two cars.",
        ],
      },
      {
        heading: "Booking Your Return to Bahrain",
        paragraphs: [
          "Many passengers on this route book it as the return half of a Bahrain–Khobar round trip, either same-day or after a longer stay. Tell us your outbound date and a rough idea of your return timing when you first book, and we'll hold the return leg rather than treating it as a brand-new booking later.",
          "If your schedule is uncertain — an open-ended business trip, for instance — you can also book the return leg separately closer to the date; there's no requirement to fix both directions at once.",
          "Weekend visitors heading back to Bahrain on a Friday or Saturday evening should expect the busier end of our timing estimates, since that's when the largest volume of GCC cross-border weekend traffic returns home.",
        ],
      },
    ],
    pickupAreas: [],
    faqs: [
      {
        question: "Is this the quickest way from the Eastern Province into Bahrain?",
        answer:
          "Yes — because Khobar sits closest to the causeway's Saudi terminal, this is typically the shortest total journey time of any route on the corridor.",
      },
      {
        question: "Can I book a same-day return to Khobar?",
        answer:
          "Yes, tell us your planned return time when you book the outbound leg and we'll confirm both directions together as a round trip.",
      },
      {
        question: "Do I need a Bahrain visa arriving from Khobar?",
        answer:
          "It depends on your nationality — many GCC and other nationalities can obtain a Bahrain visa on arrival, but confirm your own eligibility before travelling, since we don't process visas or guarantee entry.",
      },
      {
        question: "What areas of Khobar can I be picked up from?",
        answer:
          "Anywhere in the city — the corniche, commercial districts, and residential compounds. Share your exact address on WhatsApp so the fare matches the real pickup point.",
      },
      {
        question: "Is this route available late at night?",
        answer:
          "Yes, we run it 24 hours a day, seven days a week, including late-night and early-morning crossings.",
      },
      {
        question: "Do I need to fix my return date in advance?",
        answer:
          "No — you can give us a rough plan when you book the outbound leg and confirm the exact return closer to the date, or book it fresh whenever you're ready to head back.",
      },
      {
        question: "What if I'm not sure whether I'll be dropped in Khobar or Dammam?",
        answer:
          "Tell us both possibilities on WhatsApp — the fare differs slightly by distance, so we'll confirm the exact price once your Saudi-side pickup point is finalised.",
      },
      {
        question: "Do you serve pickups from Khobar's business districts as well as residential areas?",
        answer:
          "Yes — commercial offices, residential compounds, and hotels are all standard pickup points on this route. Share the exact address on WhatsApp and we'll confirm the fare against it.",
      },
    ],
    related: ["taxi-bahrain-to-khobar", "taxi-dammam-to-bahrain", "king-fahd-causeway-taxi"],
  },
  {
    slug: "taxi-bahrain-to-riyadh",
    primaryKeyword: "taxi Bahrain to Riyadh",
    from: "Bahrain",
    to: "Riyadh",
    fromCountry: "Bahrain",
    toCountry: "Saudi Arabia",
    distanceKm: 480,
    durationLabel: "5–5.5 hrs",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "The long-haul run across to the Saudi capital — one licensed driver, one fixed fare, no changeovers.",
    metaTitle: "Taxi Bahrain to Riyadh | Long-Distance Causeway Transfer",
    metaDescription:
      "Book a long-distance taxi from Bahrain to Riyadh via King Fahd Causeway. Fixed all-inclusive fare, one driver door-to-door. Get a quote on WhatsApp.",
    intro: [
      "A taxi from Bahrain to Riyadh is the longest route we run: around 480 km and typically five to five and a half hours behind the wheel once you're past the causeway, connecting the island directly to the Saudi capital by road.",
      "Most passengers on this route are business travellers who prefer a single private vehicle over a domestic flight connection, or families relocating between the two cities with luggage that doesn't suit air travel.",
      "This is a genuine long-distance charter, not a shared-taxi service: one fixed fare covers the entire one-way trip, with the same driver from your Bahrain pickup to your Riyadh drop-off.",
    ],
    sections: [
      {
        heading: "Journey Breakdown: Bahrain to Riyadh",
        paragraphs: [
          "The first stretch mirrors the standard corridor: pickup in Bahrain, the Bahrain-side immigration post, the 25 km causeway crossing, and the Saudi-side immigration post, typically 60–90 minutes combined.",
          "From the Eastern Province, it's a long inland drive west across the Saudi highway network to Riyadh — several hours of open highway, generally covered in one continuous drive with rest breaks at fuel and prayer stops along the way, rather than a scheduled stopover.",
          "Given the distance, we recommend confirming your preferred departure time well in advance, particularly for overnight departures aimed at arriving in Riyadh the following morning.",
        ],
      },
      {
        heading: "What a Long-Distance Charter Includes",
        paragraphs: [
          "Included: the vehicle and driver for the entire one-way trip, fuel, the causeway toll, and standard waiting time at both immigration posts, all within the quoted fixed fare.",
          "Not included: any Saudi entry visa or permit your nationality requires, and meals or purchases made at rest stops along the way. If you need the driver to wait in Riyadh for a return leg, tell us in advance so it can be quoted as part of the same booking.",
        ],
      },
      {
        heading: "Documents and Border Process",
        paragraphs: [
          "A valid passport (or GCC national ID where accepted) and any Saudi entry visa or permit your nationality requires are needed at the causeway crossing — the same requirements as any other Bahrain to Saudi Arabia route, since Riyadh is simply further inland on the same side of the border.",
          "We do not guarantee entry decisions, immigration outcomes, or exact arrival times given the distance involved — passengers are responsible for their own travel documents.",
        ],
      },
      {
        heading: "Choosing Your Vehicle for a Long Drive",
        paragraphs: [
          "For a trip of this length, most passengers choose the SUV or the Mercedes S-Class for the extra comfort over several hours on the highway. The van suits families or groups travelling together, and the sedan remains an option for one to three passengers who prefer a lighter vehicle for the same distance.",
        ],
      },
      {
        heading: "Planning a Long-Distance Trip",
        paragraphs: [
          "Because this is by far our longest route, we recommend booking a day or two ahead rather than same-day, particularly for a specific arrival time in Riyadh tied to a meeting or event. Let us know your priority — earliest possible arrival, or a more relaxed pace with extra rest breaks — and we'll plan the driver's schedule accordingly.",
          "If you regularly travel this route for work, our corporate accounts service can also set up recurring long-distance bookings rather than arranging each trip individually.",
          "Drivers on this route are specifically briefed for the distance involved, including planned rest breaks, rather than treated the same as a short corridor run — the aim is a safe, steady pace across the whole drive rather than rushing to save a few minutes.",
        ],
      },
    ],
    pickupAreas: [],
    faqs: [
      {
        question: "Is Bahrain to Riyadh really doable in one taxi ride?",
        answer:
          "Yes — it's a long drive at around five to five and a half hours plus the causeway crossing, but it's a single continuous charter with one driver, not a multi-leg journey.",
      },
      {
        question: "Do you stop along the way?",
        answer:
          "Short stops for fuel, prayer, and rest are normal on a drive this long. It's not a scheduled multi-hour stopover — just practical breaks during the highway stretch.",
      },
      {
        question: "Can the driver wait in Riyadh for a return trip?",
        answer:
          "Yes, if you tell us in advance. Waiting time and the return leg are quoted together as part of the same booking rather than arranged on the day.",
      },
      {
        question: "Is this cheaper than flying?",
        answer:
          "It depends on the flight fare and how many passengers are travelling together — for three or more people or a lot of luggage, a single shared vehicle fare often compares well against multiple flight tickets. Compare the fare table above against current flight prices for your dates.",
      },
      {
        question: "What if I need an overnight departure?",
        answer:
          "That's common on this route, aimed at arriving in Riyadh the next morning. Tell us your preferred departure window on WhatsApp and we'll confirm the driver and timing.",
      },
      {
        question: "Do I need a different visa for Riyadh than for Dammam?",
        answer:
          "No — Riyadh and Dammam are both inside Saudi Arabia, so the same entry visa or permit rules for your nationality apply on both routes.",
      },
      {
        question: "Can I book a multi-day trip with the driver waiting in Riyadh?",
        answer:
          "Yes — tell us your plans on WhatsApp and we can quote a waiting arrangement or a separate return leg for whenever you're ready to head back to Bahrain.",
      },
    ],
    related: ["taxi-bahrain-to-dammam", "taxi-bahrain-to-al-ahsa-hofuf", "hourly-chauffeur-hire"],
  },
  {
    slug: "taxi-bahrain-to-jubail",
    primaryKeyword: "taxi Bahrain to Jubail",
    from: "Bahrain",
    to: "Jubail",
    fromCountry: "Bahrain",
    toCountry: "Saudi Arabia",
    distanceKm: 210,
    durationLabel: "2–2.5 hrs",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "North past Dammam to the Jubail industrial and residential compounds — popular with rotating shift workers.",
    metaTitle: "Taxi Bahrain to Jubail | Fixed Fare Causeway Transfer",
    metaDescription:
      "Licensed taxi from Bahrain to Jubail via the King Fahd Causeway. Fixed fare, compound drop-offs, door-to-door in around 2–2.5 hours.",
    intro: [
      "A taxi from Bahrain to Jubail continues north past Dammam to the industrial city and its residential compounds, covering around 210 km and typically two to two and a half hours including the causeway crossing.",
      "Jubail's oil, gas, and petrochemical sector brings a steady flow of rotating-shift workers and their families between Bahrain and the compounds around Jubail Industrial City and Jubail proper, and this route is built around that pattern.",
      "Fixed fare, direct compound or address drop-off, one driver the whole way.",
    ],
    sections: [
      {
        heading: "Journey Breakdown: Bahrain to Jubail",
        paragraphs: [
          "Pickup in Bahrain, the Bahrain-side immigration post, the causeway crossing itself, and the Saudi-side immigration post follow the same pattern as the standard corridor, typically 60–90 minutes combined.",
          "From there it's a longer drive north past Dammam and Qatif along the coastal highway into Jubail, adding roughly an hour to an hour and a half beyond the standard Bahrain–Dammam leg, depending on your exact compound or address.",
        ],
      },
      {
        heading: "Compound and Shift-Timing Pickups",
        paragraphs: [
          "Many passengers on this route are travelling on a fixed shift rotation — a specific day off, a set changeover date, or a flight connection timed around work rosters. Tell us your rotation schedule when you book and we can plan pickup times around it in advance rather than confirming trip by trip.",
          "We drop off directly at named compounds and residential gates around Jubail as well as standard city addresses — tell us the compound name and we'll confirm the exact drop-off point with the fare.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the vehicle and driver for the full trip, fuel, the causeway toll, and standard waiting time at both immigration posts.",
          "Not included: any Saudi entry visa or work/residency permit your nationality or employment status requires, and any compound-specific access arrangements you need to make with your employer or housing provider — we handle transport, not compound access clearance.",
        ],
      },
      {
        heading: "Documents and Border Process",
        paragraphs: [
          "A valid passport (or GCC national ID where accepted) and any Saudi entry visa, work permit, or Iqama-linked re-entry documents your situation requires are needed at the causeway. Each passenger presents their own documents; we do not process visas, work permits, or guarantee entry decisions.",
        ],
      },
      {
        heading: "Choosing Your Vehicle",
        paragraphs: [
          "For a solo rotation trip, a sedan is usually enough. Families relocating between rotations, or anyone with extra kit and luggage, tend to prefer the SUV or van depending on group size.",
        ],
      },
      {
        heading: "Booking Around a Rotation Schedule",
        paragraphs: [
          "If you're on a fixed rotation — say, four weeks on and one week off — send us the pattern once and we can set up recurring pickups on both ends without you having to re-book from scratch each cycle. This works the same whether you're commuting solo or coordinating transport for a small group of colleagues on the same schedule.",
          "For larger teams moving together, our corporate accounts service covers multi-passenger, multi-trip billing so a company can manage rotational transport for several staff under one account rather than individual bookings.",
          "Jubail Industrial City and the older Jubail residential area are treated as the same destination for pricing purposes, since both sit close together off the same coastal highway — tell us which part you need and the driver will take you directly there.",
        ],
      },
    ],
    pickupAreas: [],
    faqs: [
      {
        question: "Can you drop off directly at my compound gate in Jubail?",
        answer:
          "Yes, tell us the compound name and gate when you book and we'll confirm the exact drop-off point along with the fare.",
      },
      {
        question: "Do you handle rotating shift schedules?",
        answer:
          "Yes, if you give us your rotation dates in advance we can plan recurring pickups around them rather than booking each trip individually.",
      },
      {
        question: "How much longer is this than the standard Bahrain to Dammam route?",
        answer:
          "Roughly an hour to an hour and a half longer, since Jubail sits further north up the coast past Dammam and Qatif.",
      },
      {
        question: "Do I need a work permit or just a visa?",
        answer:
          "That depends on your employment and residency status in Saudi Arabia — we transport passengers but don't process visas, work permits, or Iqama-linked paperwork, so confirm your own requirements before travel.",
      },
      {
        question: "Is this route suitable for corporate group transport?",
        answer:
          "Yes — see our corporate accounts service if you need recurring bookings for multiple staff on a shift rotation between Bahrain and Jubail.",
      },
      {
        question: "Can you pick up multiple staff from different Bahrain addresses on the same trip?",
        answer:
          "Yes, tell us the addresses and we'll plan a single-vehicle or multi-vehicle pickup depending on group size and how spread out the addresses are.",
      },
      {
        question: "Is there a difference in fare between Jubail Industrial City and residential Jubail?",
        answer:
          "The fare is the same for both, since they sit close together off the same highway exit — tell us the exact gate or address so the driver goes straight there.",
      },
    ],
    related: ["taxi-bahrain-to-dammam", "taxi-bahrain-to-ras-tanura", "corporate-accounts"],
  },
  {
    slug: "taxi-bahrain-to-al-ahsa-hofuf",
    primaryKeyword: "taxi Bahrain to Al Ahsa Hofuf",
    from: "Bahrain",
    to: "Al Ahsa / Hofuf",
    fromCountry: "Bahrain",
    toCountry: "Saudi Arabia",
    distanceKm: 260,
    durationLabel: "2.5–3 hrs",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "Inland to Al Ahsa and Hofuf — family visits and the date-palm oasis, past Dammam on the Riyadh road.",
    metaTitle: "Taxi Bahrain to Al Ahsa / Hofuf | Fixed Fare Transfer",
    metaDescription:
      "Book a taxi from Bahrain to Al Ahsa / Hofuf via King Fahd Causeway. Fixed fare, door-to-door in around 2.5–3 hours. Get a WhatsApp quote.",
    intro: [
      "A taxi from Bahrain to Al Ahsa or Hofuf heads inland from the coast, covering around 260 km and typically two and a half to three hours including the causeway crossing, out toward one of the largest oasis regions in the world.",
      "This route is popular for family visits, since many Eastern Province families with roots in Al Ahsa split their time between the coast and the oasis towns, and for day trips to see the palm groves and old town areas of Hofuf.",
      "Fixed fare, direct door-to-door drop-off at a home, hotel, or address in Al Ahsa or Hofuf, one driver the whole way.",
    ],
    sections: [
      {
        heading: "Journey Breakdown: Bahrain to Al Ahsa / Hofuf",
        paragraphs: [
          "The route starts the same way as the standard corridor — pickup in Bahrain, the Bahrain-side immigration post, the causeway crossing, and the Saudi-side immigration post, typically 60–90 minutes combined.",
          "From the Eastern Province coast, it's an inland drive on the road toward Riyadh before branching off to Al Ahsa and Hofuf, adding roughly an hour and a half to two hours beyond the standard Bahrain–Dammam leg.",
        ],
      },
      {
        heading: "Visiting Family in Al Ahsa",
        paragraphs: [
          "Many passengers on this route are visiting relatives for a weekend, a holiday, or a family occasion, often with extra luggage for a longer stay. We drop off directly at the family address rather than a central point in Hofuf, so tell us the exact destination when you book.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the vehicle and driver for the full trip, fuel, the causeway toll, and standard waiting time at both immigration posts.",
          "Not included: any Saudi entry visa or permit your nationality requires, and any detours to sightseeing spots around the oasis beyond your confirmed drop-off address — those can be arranged separately through our hourly chauffeur hire service if wanted.",
        ],
      },
      {
        heading: "Documents and Border Process",
        paragraphs: [
          "A valid passport (or GCC national ID where accepted) and any Saudi entry visa or permit your nationality requires are needed at the causeway crossing. Passengers handle their own documents at both immigration posts; we do not process visas or guarantee entry decisions.",
        ],
      },
      {
        heading: "Choosing Your Vehicle",
        paragraphs: [
          "Families visiting for an extended stay often prefer the SUV or van for the extra luggage space, while a sedan suits shorter visits with one to three passengers and standard bags.",
        ],
      },
      {
        heading: "The Al Ahsa Oasis",
        paragraphs: [
          "Al Ahsa is home to one of the largest oasis regions in the world, with extensive date palm groves, natural springs, and the older quarters of Hofuf including its historic souq and fort areas. It's a common weekend and holiday destination for people based on the coast who want a change of scenery inland.",
          "If sightseeing around the oasis is part of your trip rather than a direct family visit, our hourly chauffeur hire service can keep the same driver and vehicle with you for the day instead of a single point-to-point transfer.",
          "\"Al Ahsa\" and \"Hofuf\" are often used interchangeably — Hofuf is the largest city within the wider Al Ahsa governorate — so whichever term you use when booking, we confirm the exact address rather than relying on the city name alone.",
        ],
      },
    ],
    pickupAreas: [],
    faqs: [
      {
        question: "Can you drop us at a specific family address in Hofuf?",
        answer:
          "Yes, tell us the exact address when you book and the driver takes you directly there rather than to a general drop-off point.",
      },
      {
        question: "How much longer is this than going to Dammam?",
        answer:
          "Roughly an hour and a half to two hours longer, since Al Ahsa and Hofuf sit further inland toward Riyadh rather than on the coast.",
      },
      {
        question: "Can we stop to see the oasis or old town along the way?",
        answer:
          "This route is priced as a direct transfer to your address. If you want sightseeing stops built into the trip, ask about our hourly chauffeur hire service instead.",
      },
      {
        question: "Is this a good option for a family with a lot of luggage?",
        answer:
          "Yes — the SUV and van both carry more luggage than a sedan, which suits longer family visits with extra bags.",
      },
      {
        question: "Do I need a different visa for Al Ahsa than for Dammam?",
        answer:
          "No, the entry requirements are the same as any other Bahrain to Saudi Arabia crossing — Al Ahsa is simply further inland on the same side of the border.",
      },
      {
        question: "Is Al Ahsa worth visiting as a day trip from Bahrain?",
        answer:
          "It's a long day given the extra inland drive time each way, so most visitors treat it as an overnight or weekend trip rather than a same-day round trip, though a long day trip is possible if your schedule allows it.",
      },
      {
        question: "Can you recommend how much time to allow for the oasis and old town?",
        answer:
          "We handle the transfer rather than a guided tour, but most visitors spend at least half a day around the oasis and Hofuf's old quarters — plan your return pickup time accordingly.",
      },
    ],
    related: ["taxi-bahrain-to-riyadh", "taxi-bahrain-to-dammam", "family-van-transfer"],
  },
  {
    slug: "taxi-bahrain-to-ras-tanura",
    primaryKeyword: "taxi Bahrain to Ras Tanura",
    from: "Bahrain",
    to: "Ras Tanura",
    fromCountry: "Bahrain",
    toCountry: "Saudi Arabia",
    distanceKm: 220,
    durationLabel: "2–2.5 hrs",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "Along the Gulf coast road past Dammam and Qatif to the Ras Tanura refinery communities.",
    metaTitle: "Taxi Bahrain to Ras Tanura | Fixed Fare Causeway Transfer",
    metaDescription:
      "Licensed taxi from Bahrain to Ras Tanura via the King Fahd Causeway. Fixed fare, door-to-door in around 2–2.5 hours. WhatsApp for an instant quote.",
    intro: [
      "A taxi from Bahrain to Ras Tanura follows the Gulf coast road north past Dammam and Qatif to the refinery town and its residential communities, covering around 220 km and typically two to two and a half hours including the causeway crossing.",
      "This route sees a steady flow of refinery and terminal staff and their families moving between Bahrain and the Ras Tanura area, along with contractors on fixed rotation schedules.",
      "Fixed fare, direct address or compound drop-off, one driver the whole way.",
    ],
    sections: [
      {
        heading: "Journey Breakdown: Bahrain to Ras Tanura",
        paragraphs: [
          "The route begins as the standard corridor does — Bahrain pickup, the Bahrain-side immigration post, the causeway crossing, and the Saudi-side immigration post, typically 60–90 minutes combined.",
          "From the Eastern Province coast, it's a further drive north along the Gulf coast road through the Dammam and Qatif area into Ras Tanura, adding roughly an hour to an hour and a half beyond the standard Bahrain–Dammam leg.",
        ],
      },
      {
        heading: "Compound and Shift-Timing Pickups",
        paragraphs: [
          "Like Jubail, many passengers on this route travel on a fixed rotation tied to refinery or terminal shift patterns. Share your rotation dates in advance and we can plan pickups around them rather than booking trip by trip, and we drop off directly at named residential compounds around Ras Tanura as well as standard addresses.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the vehicle and driver for the full trip, fuel, the causeway toll, and standard waiting time at both immigration posts.",
          "Not included: any Saudi entry visa, work permit, or Iqama-linked re-entry documents your situation requires, and any compound access clearance, which remains between you and your employer or housing provider.",
        ],
      },
      {
        heading: "Documents and Border Process",
        paragraphs: [
          "A valid passport (or GCC national ID where accepted) and any Saudi entry visa or work-related permit your nationality and employment status require are needed at the causeway. We do not process visas or work permits, and do not guarantee entry decisions.",
        ],
      },
      {
        heading: "Choosing Your Vehicle",
        paragraphs: [
          "A sedan is typically enough for a solo rotation trip. Families relocating between rotations, or anyone with extra kit, tend to prefer the SUV or van depending on group size.",
        ],
      },
      {
        heading: "Booking Around a Rotation Schedule",
        paragraphs: [
          "As with our other refinery-town routes, many passengers travel on a fixed rotation rather than an ad-hoc schedule. Share your pattern once and we can plan recurring pickups on both ends rather than booking each crossing individually, which is particularly useful if your days off shift slightly from cycle to cycle.",
          "If you're coordinating transport for a small team on the same rotation, our corporate accounts service can manage multiple staff and trips under a single account.",
          "Ras Tanura's residential areas sit a short distance from the refinery and terminal itself, so pickups and drop-offs are almost always at a named compound gate rather than a general city address — tell us the compound when you book so the driver knows exactly where to go.",
        ],
      },
    ],
    pickupAreas: [],
    faqs: [
      {
        question: "Can you drop off at my residential compound in Ras Tanura?",
        answer:
          "Yes, tell us the compound name and gate when you book and we'll confirm the exact drop-off point along with the fare.",
      },
      {
        question: "Do you support recurring shift-rotation bookings?",
        answer:
          "Yes, share your rotation schedule in advance and we can plan pickups around it rather than booking each trip separately.",
      },
      {
        question: "How does this compare to the Bahrain to Jubail route?",
        answer:
          "Ras Tanura and Jubail are both north of Dammam along the coast and take a similar amount of extra time beyond the standard Bahrain–Dammam leg — check both route pages if you're unsure which is closer to your exact destination.",
      },
      {
        question: "Do I need special documents for the refinery area?",
        answer:
          "Any site-specific access passes are between you and your employer or the facility itself — we handle the road transport and standard Saudi entry requirements, not facility access clearance.",
      },
      {
        question: "Is this suitable for corporate or contractor group bookings?",
        answer:
          "Yes, see our corporate accounts service for recurring multi-staff bookings between Bahrain and Ras Tanura.",
      },
      {
        question: "What if my days off change slightly each rotation?",
        answer:
          "That's normal — just message the updated dates on WhatsApp each cycle, or give us a general pattern in advance and confirm the exact dates closer to each trip.",
      },
      {
        question: "Can I be picked up from Bahrain airport directly if I'm flying in first?",
        answer:
          "Yes, tell us your arriving flight details and we can plan the pickup from Bahrain International Airport straight through to Ras Tanura instead of a separate Bahrain city pickup.",
      },
      {
        question: "Is Ras Tanura further than Jubail from the causeway?",
        answer:
          "They're broadly similar in extra drive time beyond the standard Bahrain–Dammam leg — check both route pages for the exact distance and duration figures if you're comparing the two.",
      },
    ],
    related: ["taxi-bahrain-to-jubail", "taxi-bahrain-to-qatif", "corporate-accounts"],
  },
  {
    slug: "taxi-bahrain-to-abqaiq",
    primaryKeyword: "taxi Bahrain to Abqaiq",
    from: "Bahrain",
    to: "Abqaiq",
    fromCountry: "Bahrain",
    toCountry: "Saudi Arabia",
    distanceKm: 190,
    durationLabel: "2–2.25 hrs",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "Inland southwest of Dammam to the Abqaiq compounds and processing facilities.",
    metaTitle: "Taxi Bahrain to Abqaiq | Fixed Fare Causeway Transfer",
    metaDescription:
      "Book a taxi from Bahrain to Abqaiq via the King Fahd Causeway. Fixed fare, compound drop-offs, door-to-door in around 2 hours. Quote on WhatsApp.",
    intro: [
      "A taxi from Bahrain to Abqaiq heads inland southwest of Dammam to the town and its processing facility compounds, covering around 190 km and typically two to two and a quarter hours including the causeway crossing.",
      "This route is used mainly by residents and contractors connected to Abqaiq's facilities and the compounds around the town, often travelling on a set schedule between shifts or leave periods.",
      "Fixed fare, direct compound or address drop-off, one driver the whole way.",
    ],
    sections: [
      {
        heading: "Journey Breakdown: Bahrain to Abqaiq",
        paragraphs: [
          "As with the other corridor routes, the trip starts with Bahrain pickup, the Bahrain-side immigration post, the causeway crossing, and the Saudi-side immigration post, typically 60–90 minutes combined.",
          "From there it's an inland drive southwest of Dammam into Abqaiq, adding roughly 45 minutes to an hour beyond the standard Bahrain–Dammam leg, depending on the exact compound or address.",
        ],
      },
      {
        heading: "Compound Pickups and Scheduled Travel",
        paragraphs: [
          "Many passengers on this route travel on a fixed schedule tied to work rotations or leave periods. Share your dates in advance and we can plan around them, and we drop off directly at named compounds in and around Abqaiq as well as standard addresses — tell us the compound name when you book.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the vehicle and driver for the full trip, fuel, the causeway toll, and standard waiting time at both immigration posts.",
          "Not included: any Saudi entry visa, work permit, or Iqama-linked re-entry documents your situation requires, and compound access clearance, which remains between you and your employer.",
        ],
      },
      {
        heading: "Documents and Border Process",
        paragraphs: [
          "A valid passport (or GCC national ID where accepted) and any Saudi entry visa or work-related permit your nationality and employment status require are needed at the causeway. We do not process visas or work permits, and do not guarantee entry decisions.",
        ],
      },
      {
        heading: "Choosing Your Vehicle",
        paragraphs: [
          "A sedan usually covers a solo scheduled trip comfortably. Families or anyone with extra luggage for a longer stay tend to prefer the SUV or van depending on group size.",
        ],
      },
      {
        heading: "Booking Around Leave and Rotation Dates",
        paragraphs: [
          "Most passengers on this route travel around fixed leave or rotation periods rather than booking last-minute. If you know your dates well in advance, share them with us so we can plan the pickup rather than confirming everything close to departure.",
          "For teams or families relocating together for a longer posting, the van or SUV is usually the more practical choice given the extra luggage a longer stay tends to involve.",
          "Abqaiq sits inland from the coast rather than directly on the main Dammam–Khobar corridor, so the drive in involves a turn off the primary highway — a detail worth knowing if you're comparing timings against a neighbouring coastal route rather than assuming the same road the whole way.",
        ],
      },
    ],
    pickupAreas: [],
    faqs: [
      {
        question: "Can you drop off directly at my compound in Abqaiq?",
        answer:
          "Yes, tell us the compound name and gate when you book and we'll confirm the exact drop-off point along with the fare.",
      },
      {
        question: "Do you support scheduled or recurring trips?",
        answer:
          "Yes, share your travel dates in advance and we can plan pickups around a work or leave schedule rather than booking trip by trip.",
      },
      {
        question: "How does the fare compare to Bahrain to Dammam?",
        answer:
          "It's slightly higher, reflecting the additional inland drive time southwest of Dammam. See the fare table above for the current starting price by vehicle.",
      },
      {
        question: "Do I need a work permit or just a Saudi visa?",
        answer:
          "That depends on your employment and residency status — we transport passengers but don't process visas, work permits, or Iqama-linked paperwork, so confirm your own requirements before travel.",
      },
      {
        question: "Is this suitable for corporate group transport?",
        answer:
          "Yes, see our corporate accounts service for recurring bookings covering multiple staff between Bahrain and Abqaiq.",
      },
      {
        question: "Can I book a long-stay trip with extra luggage in mind?",
        answer:
          "Yes, mention it on WhatsApp when you book — the SUV and van both handle more luggage than a sedan, which suits a longer posting or relocation rather than a short visit.",
      },
      {
        question: "Is Abqaiq on the same road as the Dammam route for most of the trip?",
        answer:
          "For most of the drive, yes — you follow the same corridor out of the causeway before turning inland toward Abqaiq rather than continuing along the coast, which is why the extra time beyond the standard Bahrain–Dammam leg is relatively modest.",
      },
      {
        question: "Do you serve both the town of Abqaiq and nearby processing facilities?",
        answer:
          "Yes, tell us the specific address or compound and the driver will take you directly there rather than to a general point in town.",
      },
    ],
    related: ["taxi-bahrain-to-al-ahsa-hofuf", "taxi-bahrain-to-dammam", "corporate-accounts"],
  },
  {
    slug: "taxi-bahrain-to-qatif",
    primaryKeyword: "taxi Bahrain to Qatif",
    from: "Bahrain",
    to: "Qatif",
    fromCountry: "Bahrain",
    toCountry: "Saudi Arabia",
    distanceKm: 140,
    durationLabel: "75–95 min",
    borderLabel: "15–20 min",
    vehicles: ["sedan", "suv", "van", "luxury"],
    shortBlurb:
      "Just past Dammam on the coast road — a short extension of the standard corridor run.",
    metaTitle: "Taxi Bahrain to Qatif | Fixed Fare Causeway Transfer",
    metaDescription:
      "Licensed taxi from Bahrain to Qatif via the King Fahd Causeway. Fixed fare, door-to-door in around 75–95 minutes. Get a WhatsApp quote now.",
    intro: [
      "A taxi from Bahrain to Qatif is a short extension of the standard Bahrain–Dammam corridor, continuing a little further up the coast to Qatif's older town and surrounding residential areas — around 140 km and typically 75 to 95 minutes including the causeway crossing.",
      "It's a common route for family visits and for residents with ties to both Bahrain and Qatif's historic districts and agricultural areas.",
      "Fixed fare, direct address drop-off, one driver the whole way.",
    ],
    sections: [
      {
        heading: "Journey Breakdown: Bahrain to Qatif",
        paragraphs: [
          "The trip begins the same way as the standard corridor route: Bahrain pickup, the Bahrain-side immigration post, the 25 km causeway crossing, and the Saudi-side immigration post, typically 60–90 minutes combined.",
          "From there it's a short additional drive up the coast past Dammam into Qatif, adding roughly 10 to 20 minutes beyond the standard Bahrain–Dammam leg depending on your exact destination within Qatif.",
        ],
      },
      {
        heading: "Pickup Areas We Cover in Bahrain",
        paragraphs: [
          "As with our other Bahrain-origin routes, we collect from anywhere on the island — Manama, Juffair, Seef, Adliya, Muharraq, Riffa, Amwaj Islands, Budaiya, Isa Town, Hamad Town, Sitra, and Bahrain International Airport.",
        ],
      },
      {
        heading: "What's Included and What Isn't",
        paragraphs: [
          "Included: the vehicle and driver for the full door-to-door trip, fuel, the causeway toll, and standard waiting time at both immigration posts.",
          "Not included: any Saudi entry visa or permit your nationality requires, and personal purchases made once you're in Qatif.",
        ],
      },
      {
        heading: "Documents and Border Process",
        paragraphs: [
          "A valid passport (or GCC national ID where accepted) and any Saudi entry visa or permit your nationality requires are needed at the causeway crossing. Each passenger handles their own documents; we do not process visas or guarantee entry decisions.",
        ],
      },
      {
        heading: "Choosing Your Vehicle",
        paragraphs: [
          "A sedan is usually enough for one to three passengers on a family visit. Anyone carrying more luggage, or a larger family group, tends to prefer the SUV or van instead.",
        ],
      },
      {
        heading: "Qatif's Old Town and Agricultural Areas",
        paragraphs: [
          "Qatif is one of the older settled areas on the Eastern Province coast, known for its historic town centre, palm and fruit orchards, and long-established local communities. Many trips on this route are family visits rather than tourism, so we drop off at the specific home or address you give us instead of a general point in town.",
          "If your trip includes visiting relatives across more than one address in Qatif, mention it when you book — a short additional stop between two nearby addresses can usually be accommodated as part of the same fare rather than booked as a separate trip.",
          "Qatif sits just north of Dammam along the same coastal highway, close enough that some passengers ask whether it's really a separate trip at all — it is, in the sense that the fare and drop-off point differ, but the causeway crossing and border process are identical to the standard corridor route.",
        ],
      },
    ],
    pickupAreas: [
      "manama",
      "juffair",
      "seef",
      "muharraq",
      "riffa",
      "adliya",
      "amwaj-islands",
      "budaiya",
      "isa-town",
      "hamad-town",
      "sitra",
      "bahrain-airport",
    ],
    faqs: [
      {
        question: "How much longer is Qatif than Dammam?",
        answer:
          "Only around 10 to 20 minutes longer, since Qatif sits just up the coast from Dammam past the standard corridor drop-off area.",
      },
      {
        question: "Can you drop off at a specific address in Qatif's old town?",
        answer:
          "Yes, tell us the exact address when you book and the driver takes you directly there.",
      },
      {
        question: "Is the fare much different from Bahrain to Dammam?",
        answer:
          "It's slightly higher, reflecting the small additional distance. See the fare table above for the current starting price by vehicle.",
      },
      {
        question: "Do I need a different visa for Qatif than for Dammam?",
        answer:
          "No, the same Saudi entry requirements apply as any other route on this corridor.",
      },
      {
        question: "Can I book a same-day round trip to Qatif?",
        answer:
          "Yes, tell us your planned return time when you book the outbound leg and we'll confirm both directions together.",
      },
      {
        question: "Can we stop at two different addresses in Qatif?",
        answer:
          "A short stop between two nearby addresses can usually be built into the same trip — mention both addresses on WhatsApp when you book so it's reflected in the fare.",
      },
      {
        question: "Is this route busy around religious occasions or local events?",
        answer:
          "Like the rest of the corridor, expect longer border queues around major public holidays. If your visit is tied to a specific date, book ahead and we'll factor extra time into the pickup schedule.",
      },
      {
        question: "Can you collect passengers from Qatif for a return trip to Bahrain?",
        answer:
          "This page covers the Bahrain-to-Qatif direction; for pickup in Qatif heading back into Bahrain, message us the address on WhatsApp and we'll confirm the return fare the same way.",
      },
    ],
    related: ["taxi-bahrain-to-dammam", "taxi-bahrain-to-ras-tanura", "king-fahd-causeway-taxi"],
  },
];

export function getRoute(slug: string): RouteContent | undefined {
  return ROUTES.find((route) => route.slug === slug);
}

export const CAUSEWAY_HUB_SLUG = "king-fahd-causeway-taxi";
