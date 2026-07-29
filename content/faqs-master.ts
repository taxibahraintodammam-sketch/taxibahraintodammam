export type FaqCategory = {
  heading: string;
  faqs: { question: string; answer: string }[];
};

export const MASTER_FAQ_CATEGORIES: FaqCategory[] = [
  {
    heading: "Booking and Fares",
    faqs: [
      {
        question: "How do I book a taxi?",
        answer:
          "Message us on WhatsApp with your pickup point, destination, date and time, and number of passengers. We confirm the vehicle and fixed fare in the same conversation — no account or app required.",
      },
      {
        question: "Is the fare really fixed?",
        answer:
          "Yes. Every fare is quoted as an all-inclusive, fixed price before you travel, with the causeway toll and standard border waiting time already built in. It does not change on the day.",
      },
      {
        question: "Do I need to pay a deposit to confirm a booking?",
        answer:
          "No advance payment is required. The fare is agreed on WhatsApp and settled with the driver as arranged in that conversation.",
      },
      {
        question: "Can I book a one-way trip?",
        answer:
          "Yes, one-way is the default and most common booking. Round trips are also available and quoted as two legs.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "Same-day and short-notice bookings are often possible depending on vehicle availability, but booking a few hours ahead — or the evening before for Thursday/Friday travel — is safer.",
      },
      {
        question: "Do you charge more for night, weekend, or holiday travel?",
        answer:
          "No, our fare structure doesn't add a time-of-day or day-of-week surcharge. We run 24 hours a day, seven days a week at the same fixed-fare structure.",
      },
    ],
  },
  {
    heading: "Crossing the King Fahd Causeway",
    faqs: [
      {
        question: "How long does the causeway crossing take?",
        answer:
          "The 25 km bridge itself takes roughly 20 to 30 minutes. Including both immigration posts, most crossings add 30 to 40 minutes on top of that under normal conditions.",
      },
      {
        question: "What's the busiest time to cross?",
        answer:
          "Thursday evenings and Friday mornings see the heaviest GCC weekend traffic, along with public holidays on either side of the border.",
      },
      {
        question: "Is the causeway open 24 hours?",
        answer:
          "Yes, though queue times vary by time of day and can occasionally be affected by maintenance, weather, or security measures on short notice.",
      },
      {
        question: "Can I walk across the causeway?",
        answer:
          "No, it's a vehicle crossing only. There is no pedestrian lane for general passenger traffic.",
      },
      {
        question: "Is the causeway toll included in the fare?",
        answer:
          "Yes, every fare we quote already includes the bridge toll — there's nothing extra to pay at the barrier.",
      },
    ],
  },
  {
    heading: "Documents and Immigration",
    faqs: [
      {
        question: "What documents do I need to cross?",
        answer:
          "A valid passport (or GCC national ID where accepted), plus any visa or entry permit your nationality requires for the country you're entering. Requirements vary by nationality and change over time.",
      },
      {
        question: "Do you handle visas or immigration paperwork for me?",
        answer:
          "No. We handle the vehicle's own documentation and border paperwork; each passenger is responsible for their own passport, visa, and immigration formalities at each post.",
      },
      {
        question: "Can you guarantee I'll be allowed to enter or re-enter?",
        answer:
          "No. Entry and re-entry decisions are made entirely by immigration officers at each checkpoint. We provide licensed transport; we do not guarantee, influence, or advise on immigration outcomes.",
      },
      {
        question: "What is a visa U-turn or exit-re-entry trip?",
        answer:
          "A round trip across the causeway and back, done specifically for immigration purposes. See our visa U-turn service page and our blog guide on the topic for more detail — we don't advise on immigration strategy, only provide the transport.",
      },
      {
        question: "My passport is close to expiry — is that a problem?",
        answer:
          "Most immigration authorities require a minimum period of remaining validity, often at least six months, though the exact rule depends on the destination and can change. Check this before travelling.",
      },
    ],
  },
  {
    heading: "Vehicles and Comfort",
    faqs: [
      {
        question: "What vehicle should I choose?",
        answer:
          "A sedan suits one to three passengers with standard luggage. An SUV gives the same capacity with more boot space. A van covers up to seven passengers in one vehicle. A Mercedes S-Class is available for executive or VIP travel, and a 30-seat coaster for large groups.",
      },
      {
        question: "Can you provide a wheelchair accessible vehicle?",
        answer:
          "Yes, with advance notice — see our wheelchair accessible transfer service. Accessible vehicles are a smaller part of our fleet than standard cars, so advance booking helps.",
      },
      {
        question: "Can you provide a child car seat?",
        answer:
          "Yes, mention your requirement on WhatsApp when you book so it can be arranged and confirmed ahead of pickup.",
      },
      {
        question: "How much luggage can each vehicle carry?",
        answer:
          "A sedan carries two large suitcases, an SUV three, and a van up to six. See our fleet pages for full specifications on each vehicle class.",
      },
      {
        question: "Are your drivers English and Arabic speaking?",
        answer:
          "Yes, drivers on this corridor operate in both languages, covering the large majority of passengers crossing between Bahrain and the Eastern Province.",
      },
    ],
  },
  {
    heading: "Routes and Coverage",
    faqs: [
      {
        question: "Which routes do you cover?",
        answer:
          "Bahrain to Dammam and Khobar, both airports (BAH and DMM), Jubail, Al Ahsa/Hofuf, Ras Tanura, Abqaiq, Qatif, and the long-haul route to Riyadh — see our full route list for details on each.",
      },
      {
        question: "Do you collect from anywhere in Bahrain, or only certain areas?",
        answer:
          "We collect from anywhere on the island. See our pickup area pages for details on specific districts, or simply share your address on WhatsApp.",
      },
      {
        question: "Can you collect me from either Bahrain or Dammam airport?",
        answer:
          "Yes, our airport transfer service includes flight tracking and meet-and-greet for arrivals at both Bahrain International Airport (BAH) and King Fahd International Airport (DMM).",
      },
      {
        question: "Do you offer corporate or recurring bookings?",
        answer:
          "Yes, see our corporate accounts service for companies with staff on regular rotation or recurring travel between Bahrain and the Eastern Province.",
      },
    ],
  },
  {
    heading: "Safety and Reliability",
    faqs: [
      {
        question: "Are you a licensed operator?",
        answer:
          "Yes, we operate as a licensed cross-border transport provider, with vehicles insured and documented for travel between Bahrain and Saudi Arabia.",
      },
      {
        question: "What happens if the border queue runs long?",
        answer:
          "Your fare doesn't change — standard waiting time at both immigration posts is already included. Your driver stays with you throughout.",
      },
      {
        question: "Is there a record of my booking and agreed fare?",
        answer:
          "Yes, every fare is confirmed in writing on WhatsApp before you travel, giving a clear record of the vehicle, price, and pickup details agreed for your trip.",
      },
      {
        question: "What if I need to change my pickup time?",
        answer:
          "Message us on WhatsApp with the new time as early as possible — small adjustments are usually easy to accommodate, particularly with reasonable notice.",
      },
    ],
  },
];

export const ALL_MASTER_FAQS = MASTER_FAQ_CATEGORIES.flatMap((category) => category.faqs);
