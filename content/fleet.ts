import type { VehicleClass } from "@/content/fares";

export type FleetSection = {
  heading: string;
  paragraphs: string[];
};

export type FleetFaq = {
  question: string;
  answer: string;
};

export type FleetVehicle = {
  slug: string;
  vehicle: VehicleClass;
  name: string;
  tagline: string;
  passengers: string;
  luggage: string;
  bestFor: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  sections: FleetSection[];
  faqs: FleetFaq[];
  commonRoutes: string[];
};

export const FLEET: FleetVehicle[] = [
  {
    slug: "sedan-camry-sonata",
    vehicle: "sedan",
    name: "Sedan — Toyota Camry",
    tagline: "The standard corridor car: quiet, air-conditioned, built for the causeway run.",
    passengers: "1–3 passengers",
    luggage: "2 large suitcases + hand luggage",
    bestFor: "Solo travellers, couples, and standard business trips",
    metaTitle: "Sedan Taxi (Toyota Camry) | Bahrain–Saudi Arabia",
    metaDescription:
      "Toyota Camry sedan for cross-border trips between Bahrain and Saudi Arabia. 1–3 passengers, fixed fare. Book on WhatsApp.",
    intro: [
      "Our sedan class is the Toyota Camry — a comfortable, air-conditioned four-door car that covers the large majority of our corridor bookings. It's the default choice for one to three passengers with normal luggage, on every route from the standard Bahrain–Dammam run through to the Riyadh long-haul.",
      "Every sedan on our fleet is maintained to a standard suited for several hours on the road, not just short city trips, since a number of our routes run well beyond an hour each way.",
    ],
    sections: [
      {
        heading: "Who the Sedan Suits",
        paragraphs: [
          "One to three passengers with two large suitcases and hand luggage is the sweet spot for this vehicle class. It's the most common booking for solo business travellers, couples, and small groups who don't need the extra space of an SUV or van.",
          "For families, larger groups, or anyone with more than two large bags, the SUV or van are usually a better fit — see our fleet hub for a full comparison.",
        ],
      },
      {
        heading: "Where the Sedan Is Used",
        paragraphs: [
          "The sedan is available on every route we run, and is the default vehicle shown first on each route's fare table given how frequently it's booked. It suits the standard Bahrain–Dammam and Bahrain–Khobar corridor runs particularly well, where trip length and luggage needs are moderate.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the sedan comfortable for the longer routes like Riyadh?",
        answer:
          "Yes, though for a five-hour-plus drive many passengers prefer the SUV or Mercedes S-Class for the extra legroom and comfort — the sedan remains a perfectly workable option for one to three passengers on any route.",
      },
      {
        question: "How much luggage fits in the sedan?",
        answer:
          "Two large suitcases plus hand luggage. If you're carrying more than that, consider the SUV instead, which has the same passenger capacity with more boot space.",
      },
      {
        question: "Can I request a specific sedan model?",
        answer:
          "Our sedan class runs on the Toyota Camry specifically, so what you book is what you get for this vehicle class.",
      },
    ],
    commonRoutes: ["taxi-bahrain-to-dammam", "taxi-bahrain-to-khobar", "taxi-bahrain-to-qatif"],
  },
  {
    slug: "suv-gmc-tahoe",
    vehicle: "suv",
    name: "SUV — GMC Yukon / Hyundai Staria VIP",
    tagline: "Extra space and ground clearance for families or extra luggage.",
    passengers: "1–4 passengers",
    luggage: "3 large suitcases + hand luggage",
    bestFor: "Families, golf bags, and airport runs with extra bags",
    metaTitle: "SUV Taxi (GMC Yukon / Hyundai Staria) | Bahrain–Saudi Arabia",
    metaDescription:
      "GMC Yukon XL or Hyundai Staria VIP SUV for cross-border family and business trips between Bahrain and Saudi Arabia. 1–4 passengers, extra luggage space. Book on WhatsApp.",
    intro: [
      "Our SUV class runs on a GMC Yukon XL or Hyundai Staria VIP standard, offering the same one-to-four passenger capacity as a sedan with meaningfully more boot space — a third large suitcase's worth of room, plus better ground clearance and a higher driving position that some passengers simply prefer for a longer trip.",
      "It's the vehicle most families choose for the standard corridor routes and airport transfers when a couple of extra bags push past what a sedan comfortably carries.",
    ],
    sections: [
      {
        heading: "Who the SUV Suits",
        paragraphs: [
          "Families travelling with children's luggage, golf clubs, or simply more bags than a sedan comfortably fits are the most common SUV bookings. It's also popular for airport transfers where check-in luggage runs heavier than a typical short trip.",
        ],
      },
      {
        heading: "Where the SUV Is Used",
        paragraphs: [
          "The SUV is available on every route, and is particularly common on airport transfer bookings and family visits to Al Ahsa or Qatif, where extra luggage for a longer stay is the norm rather than the exception.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many suitcases fit in the SUV compared to the sedan?",
        answer:
          "Three large suitcases plus hand luggage, versus two in the sedan — the same one-to-four passenger capacity but with meaningfully more boot space.",
      },
      {
        question: "Is the SUV worth the extra cost over a sedan?",
        answer:
          "If you're carrying more than two large bags or simply prefer the higher ride height and extra space, yes. For lighter luggage, the sedan covers the same passenger count for less.",
      },
      {
        question: "Can the SUV handle the longer routes like Al Ahsa or Riyadh?",
        answer:
          "Yes, it's a common choice for both given the extra comfort over a longer drive and the additional luggage space for extended family visits.",
      },
    ],
    commonRoutes: ["bahrain-to-dammam-airport-taxi", "taxi-bahrain-to-al-ahsa-hofuf", "family-van-transfer"],
  },
  {
    slug: "van-hiace-hyundai-h1",
    vehicle: "van",
    name: "Van — Hiace / Starex / Sprinter class",
    tagline: "Group transfers without splitting the party across two cars.",
    passengers: "Up to 7 passengers",
    luggage: "6 large suitcases",
    bestFor: "Groups, extended families, and crew transfers",
    metaTitle: "Van Taxi (Hiace / Starex / Sprinter) | Bahrain–Saudi Arabia",
    metaDescription:
      "Toyota Hiace, Hyundai Starex, or Mercedes Sprinter van for group and family transfers between Bahrain and Saudi Arabia. Up to 7 passengers, 6 suitcases. Book on WhatsApp.",
    intro: [
      "Our van class runs on a Toyota Hiace, Hyundai Starex, or Mercedes Sprinter standard, seating up to seven passengers with room for six large suitcases — enough for a full family or small group to travel together in one vehicle rather than splitting across two sedans.",
      "It's the vehicle of choice for larger family visits, colleague groups travelling together, and any booking where keeping everyone in one car through both immigration posts matters as much as the seating itself.",
    ],
    sections: [
      {
        heading: "Who the Van Suits",
        paragraphs: [
          "Extended families visiting relatives in Al Ahsa or Qatif, groups of colleagues travelling to the same meeting, and any party of four to seven passengers are the most common van bookings. It's also the standard choice for our family van transfer service.",
        ],
      },
      {
        heading: "Where the Van Is Used",
        paragraphs: [
          "Available on every route, the van is especially common on longer family trips and on corporate bookings where a small team needs to travel together rather than split across multiple vehicles.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the fare for the van per passenger or for the whole vehicle?",
        answer:
          "The fare covers the whole vehicle, not per passenger, which is part of why it works out efficiently for a full group compared with splitting into two sedans.",
      },
      {
        question: "Can the van fit car seats for young children?",
        answer:
          "Yes, mention your requirement on WhatsApp when you book so a car seat can be arranged and confirmed ahead of pickup.",
      },
      {
        question: "Is the van available for the longer routes like Riyadh?",
        answer:
          "Yes, it's a common choice for groups and families travelling the long-haul routes together rather than splitting across multiple sedans.",
      },
    ],
    commonRoutes: ["family-van-transfer", "taxi-bahrain-to-al-ahsa-hofuf", "corporate-accounts"],
  },
  {
    slug: "luxury-mercedes-s-class",
    vehicle: "luxury",
    name: "Luxury — Mercedes S-Class / BMW 7 Series",
    tagline: "A chauffeur-grade cabin for executive travel and VIP arrivals.",
    passengers: "1–3 passengers",
    luggage: "2 large suitcases",
    bestFor: "Executives, VIP airport meet-and-greet, and special occasions",
    metaTitle: "Luxury Mercedes S-Class / BMW 7 Series Taxi | Bahrain–Saudi Arabia",
    metaDescription:
      "Mercedes S-Class or BMW 7 Series chauffeur vehicle for executive and VIP cross-border transfers between Bahrain and Saudi Arabia. Fixed fare. Book on WhatsApp.",
    intro: [
      "Our luxury class is a Mercedes S-Class or BMW 7 Series chauffeur vehicle, used for executive travel, VIP airport meet-and-greet, and any trip where the standard of the vehicle and driver presentation matters as much as the route itself.",
      "It's available on every corridor route at the same fixed-fare, tolls-included structure as our other vehicle classes, simply at the higher price point that reflects the vehicle standard.",
    ],
    sections: [
      {
        heading: "Who Chooses the S-Class",
        paragraphs: [
          "Executives travelling for client meetings, VIP guests being collected from either airport, and passengers who specifically want a higher standard of vehicle for a particular occasion are the typical bookings for this class.",
        ],
      },
      {
        heading: "What Comes With It",
        paragraphs: [
          "Drivers assigned to S-Class bookings are briefed for a higher standard of presentation and punctuality, and airport pickups in this class include name-board meet-and-greet and flight tracking as standard, matching our VIP luxury transfer service.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the S-Class available on every route?",
        answer:
          "Yes, it's offered as a vehicle option on every route we run, from the standard corridor trip to the longer routes further along the coast or inland.",
      },
      {
        question: "How many passengers fit in the S-Class?",
        answer:
          "Up to three passengers with two large suitcases — for a larger group wanting the same standard of vehicle, ask about booking more than one.",
      },
      {
        question: "Can I book this for an airport pickup specifically?",
        answer:
          "Yes, see our VIP luxury transfer and airport transfers services, both of which use the S-Class with meet-and-greet and flight tracking included.",
      },
    ],
    commonRoutes: ["vip-luxury-transfer", "airport-transfers", "hourly-chauffeur-hire"],
  },
  {
    slug: "bus-coaster-30-seater",
    vehicle: "bus",
    name: "30-Seat Coaster Bus",
    tagline: "One vehicle, one driver, one fare for the whole delegation.",
    passengers: "Up to 30 passengers",
    luggage: "Underfloor luggage hold",
    bestFor: "Corporate delegations, school and sports groups, event transfers",
    metaTitle: "30-Seat Coaster Bus | Bahrain–Saudi Arabia Group Transfers",
    metaDescription:
      "30-seat coaster bus for large group transfers between Bahrain and Saudi Arabia via the King Fahd Causeway. Underfloor luggage hold, fixed fare. Contact us on WhatsApp.",
    intro: [
      "Our 30-seat coaster bus covers large group transfers across the King Fahd Causeway — corporate delegations, school and sports teams, and event groups who need one vehicle and one fare rather than coordinating several smaller cars.",
      "It includes an underfloor luggage hold separate from the passenger cabin, and runs the same fixed-fare, tolls-included structure as our other vehicle classes, scaled for the larger vehicle. A premium Luxurious Bus is also available in this class for groups wanting a higher standard of coach.",
    ],
    sections: [
      {
        heading: "Who Books the Coaster",
        paragraphs: [
          "Companies moving a full team or delegation across the border, schools and sports clubs on a group trip, and event organisers transferring a group of guests are the typical bookings for this vehicle.",
        ],
      },
      {
        heading: "Booking a Coaster Transfer",
        paragraphs: [
          "Because this is a larger vehicle with more limited availability than our standard fleet, we recommend booking as far in advance as possible, particularly for a specific date tied to an event or travel schedule. Tell us your group size, route, and date on WhatsApp and we'll confirm availability and fare.",
        ],
      },
    ],
    faqs: [
      {
        question: "How far in advance should I book the coaster bus?",
        answer:
          "As early as possible — it's a more limited part of our fleet than sedans or SUVs, so advance booking matters more for group and event travel with a fixed date.",
      },
      {
        question: "Is this suitable for a corporate account?",
        answer:
          "Yes, the coaster is available under our corporate accounts service for companies with recurring large-group transport needs.",
      },
      {
        question: "Does the bus have separate luggage storage?",
        answer:
          "Yes, an underfloor luggage hold keeps bags separate from the passenger cabin, which suits a full 30-passenger group with standard luggage.",
      },
    ],
    commonRoutes: ["corporate-accounts", "taxi-bahrain-to-dammam", "taxi-bahrain-to-jubail"],
  },
];

export function getFleetVehicle(slug: string): FleetVehicle | undefined {
  return FLEET.find((v) => v.slug === slug);
}
