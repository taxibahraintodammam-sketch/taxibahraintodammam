export type PickupSection = {
  heading: string;
  paragraphs: string[];
};

export type PickupFaq = {
  question: string;
  answer: string;
};

export type PickupArea = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  sections: PickupSection[];
  faqs: PickupFaq[];
  causewayTimeLabel: string;
};

export const PICKUP_AREAS: PickupArea[] = [
  {
    slug: "manama",
    name: "Manama",
    metaTitle: "Taxi Pickup in Manama | Bahrain to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup in Manama for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Fixed fare, causeway crossing included.",
    causewayTimeLabel: "20–30 min to the causeway",
    intro: [
      "Manama is Bahrain's capital and our single busiest pickup area, covering everywhere from the Bahrain Financial Harbour and the diplomatic area through to Bab Al Bahrain and the older downtown souq streets. A taxi pickup in Manama to Dammam, Khobar, or anywhere else on the corridor typically adds 20 to 30 minutes of driving before you even reach the causeway itself, depending on exactly where in the city you're starting from.",
    ],
    sections: [
      {
        heading: "Getting to the Causeway from Manama",
        paragraphs: [
          "From central Manama, the route to the King Fahd Causeway runs south past Bahrain Financial Harbour and onto the main highway network toward Al Jasra, where the causeway begins. Traffic through central Manama during the morning and evening commute can add extra time, so we build a buffer into pickup timing for peak hours.",
        ],
      },
      {
        heading: "Landmarks We Collect From",
        paragraphs: [
          "Common pickup points include the Bahrain Financial Harbour towers, the Bahrain World Trade Center, the government and diplomatic district, and hotels around the city centre and the old Bab Al Bahrain gateway near the traditional souq. If your address is elsewhere in Manama, share the exact location on WhatsApp and we'll confirm the pickup point and fare.",
        ],
      },
      {
        heading: "Who Books From Manama",
        paragraphs: [
          "Business travellers heading to meetings in Khobar or Dammam make up a large share of Manama bookings, alongside residents visiting family across the causeway and passengers connecting through Bahrain International Airport after a Manama hotel stay.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long from Manama to the causeway itself?",
        answer:
          "Around 20 to 30 minutes depending on your exact pickup point in the city and time of day, before the causeway crossing and border process add further time.",
      },
      {
        question: "Do you collect from hotels in central Manama?",
        answer:
          "Yes, hotel pickups across central Manama are a standard part of our service — just share the hotel name and we'll confirm the pickup point.",
      },
      {
        question: "Which routes are most commonly booked from Manama?",
        answer:
          "Bahrain to Dammam and Bahrain to Khobar are the most common, alongside airport transfers for passengers connecting through Bahrain International Airport.",
      },
      {
        question: "Can you collect from a specific office tower in the financial harbour?",
        answer:
          "Yes, share the tower name and floor on WhatsApp when you book and the driver will confirm the exact pickup point at the building entrance.",
      },
    ],
  },
  {
    slug: "juffair",
    name: "Juffair",
    metaTitle: "Taxi Pickup in Juffair | Bahrain to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup in Juffair for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Fixed fare, causeway crossing included.",
    causewayTimeLabel: "20–30 min to the causeway",
    intro: [
      "Juffair is one of Bahrain's busiest expat and hospitality districts, known for its concentration of hotels, restaurants, and serviced apartments close to the US Naval Support Activity base. A taxi pickup in Juffair to Dammam or Khobar typically adds 20 to 30 minutes to reach the causeway, similar to central Manama given the area's location just south of the capital.",
    ],
    sections: [
      {
        heading: "Getting to the Causeway from Juffair",
        paragraphs: [
          "From Juffair, the route joins the same main highway corridor used from central Manama, heading toward Al Jasra and the start of the King Fahd Causeway. Weekend evenings in Juffair can see heavier local traffic given the area's restaurant and nightlife density, which we factor into pickup timing.",
        ],
      },
      {
        heading: "Landmarks We Collect From",
        paragraphs: [
          "Juffair's hotel and apartment towers along the main strip, the area around the American Mission Hospital, and the restaurant and cafe clusters throughout the district are all standard pickup points. Share your exact building or hotel name on WhatsApp when you book.",
        ],
      },
      {
        heading: "Who Books From Juffair",
        paragraphs: [
          "Given the area's expat and military-adjacent population, Juffair bookings often come from residents with regular reasons to cross into the Eastern Province, along with visitors staying in the area's many hotels for a short Bahrain trip before continuing on to Saudi Arabia.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long from Juffair to the causeway?",
        answer:
          "Around 20 to 30 minutes under normal traffic, similar to pickups from central Manama given the area's proximity to the capital.",
      },
      {
        question: "Do you collect from serviced apartments, not just hotels?",
        answer:
          "Yes, serviced apartments and residential towers throughout Juffair are standard pickup points — just share the building name and unit details.",
      },
      {
        question: "Is weekend evening traffic a problem for pickups?",
        answer:
          "Juffair can be busy on weekend evenings given its restaurant scene, so we build extra time into pickups scheduled around those hours.",
      },
      {
        question: "Do you cover pickups near the naval base area?",
        answer:
          "Yes, the residential and hotel areas around that part of Juffair are standard pickups — share your exact building on WhatsApp when you book.",
      },
    ],
  },
  {
    slug: "seef",
    name: "Seef",
    metaTitle: "Taxi Pickup in Seef | Bahrain to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup in Seef for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Fixed fare, causeway crossing included.",
    causewayTimeLabel: "20–25 min to the causeway",
    intro: [
      "Seef is Bahrain's main shopping and business district, home to City Centre Bahrain and Seef Mall along with a cluster of office towers and hotels. A taxi pickup in Seef to Dammam or Khobar typically adds around 20 to 25 minutes to reach the causeway, among the shorter approach times on the island given the district's position toward the north-west.",
    ],
    sections: [
      {
        heading: "Getting to the Causeway from Seef",
        paragraphs: [
          "From Seef, the drive toward the King Fahd Causeway runs through the surrounding highway network rather than back through central Manama, which keeps the approach relatively direct outside of peak shopping-mall traffic hours, particularly on weekend afternoons and evenings.",
        ],
      },
      {
        heading: "Landmarks We Collect From",
        paragraphs: [
          "City Centre Bahrain, Seef Mall, and the office towers and hotels surrounding both malls are the most common pickup points in the district, along with the residential areas immediately behind the main commercial strip.",
        ],
      },
      {
        heading: "Who Books From Seef",
        paragraphs: [
          "Shoppers and families visiting from the Eastern Province who are heading home after a Seef shopping trip make up a notable share of bookings from this area, alongside office workers and business travellers based in the district's towers.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long from Seef to the causeway?",
        answer:
          "Around 20 to 25 minutes under normal traffic, among the shorter approach times from Bahrain's main districts.",
      },
      {
        question: "Can you collect from City Centre Bahrain or Seef Mall directly?",
        answer:
          "Yes, both malls and their surrounding hotels and office towers are standard pickup points — tell us the specific entrance or nearby address when you book.",
      },
      {
        question: "Is this a good pickup point for a shopping trip return to Khobar?",
        answer:
          "Yes, many Eastern Province visitors doing a Seef shopping day book their return trip from this area specifically for that reason.",
      },
      {
        question: "Can you handle a lot of shopping bags in addition to normal luggage?",
        answer:
          "Yes, mention it on WhatsApp when you book — the SUV or van are good choices if you'll have extra shopping alongside standard luggage.",
      },
    ],
  },
  {
    slug: "muharraq",
    name: "Muharraq",
    metaTitle: "Taxi Pickup in Muharraq | Bahrain to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup in Muharraq for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Fixed fare, causeway crossing included.",
    causewayTimeLabel: "30–40 min to the causeway",
    intro: [
      "Muharraq is Bahrain's historic former capital and the location of Bahrain International Airport, known for its old town, traditional souq, and restored heritage houses. A taxi pickup in Muharraq to Dammam or Khobar typically adds 30 to 40 minutes to reach the causeway, being on the opposite side of the main island from the crossing itself.",
    ],
    sections: [
      {
        heading: "Getting to the Causeway from Muharraq",
        paragraphs: [
          "From Muharraq, the drive crosses over to the main island via one of the connecting causeways before joining the highway network toward Al Jasra and the King Fahd Causeway — the longest standard approach time of any Bahrain pickup area we cover, given the distance involved.",
        ],
      },
      {
        heading: "Landmarks We Collect From",
        paragraphs: [
          "Bahrain International Airport itself, the restored heritage houses and traditional souq of the old town, and the residential areas throughout Muharraq are all standard pickup points. For passengers landing at the airport and continuing straight to Saudi Arabia, see our dedicated Bahrain Airport routes instead of a general Muharraq pickup.",
        ],
      },
      {
        heading: "Who Books From Muharraq",
        paragraphs: [
          "Residents of Muharraq's older neighbourhoods and families living near the airport make up most bookings from this area, alongside visitors staying near the old town who are combining a Bahrain heritage visit with an onward trip to Saudi Arabia.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long from Muharraq to the causeway?",
        answer:
          "Around 30 to 40 minutes, the longest standard approach time among our Bahrain pickup areas, since Muharraq sits on the opposite side of the island from the crossing.",
      },
      {
        question: "Should I use this page or the airport route pages if I'm flying?",
        answer:
          "If you're landing at or departing from Bahrain International Airport specifically, use our dedicated Bahrain Airport route pages instead — they build flight timing into the trip.",
      },
      {
        question: "Do you collect from the old town and heritage areas?",
        answer:
          "Yes, the restored heritage houses and surrounding old town streets are standard pickup points — share the exact address on WhatsApp.",
      },
      {
        question: "Is Muharraq the same fare as a Manama pickup?",
        answer:
          "Fares are confirmed against your exact pickup point rather than a flat island-wide rate, so Muharraq may differ slightly from central Manama given the extra distance to the causeway.",
      },
    ],
  },
  {
    slug: "riffa",
    name: "Riffa",
    metaTitle: "Taxi Pickup in Riffa | Bahrain to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup in Riffa for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Fixed fare, causeway crossing included.",
    causewayTimeLabel: "25–35 min to the causeway",
    intro: [
      "Riffa is one of Bahrain's largest residential areas, spread across East and West Riffa with a mix of established neighbourhoods, newer villa compounds, and the Riffa Golf Club. A taxi pickup in Riffa to Dammam or Khobar typically adds 25 to 35 minutes to reach the causeway, depending on which part of the sprawling district you're starting from.",
    ],
    sections: [
      {
        heading: "Getting to the Causeway from Riffa",
        paragraphs: [
          "From Riffa, the drive joins the southern highway network toward Al Jasra and the King Fahd Causeway. Because Riffa covers a large area, pickup time varies meaningfully between its northern neighbourhoods closer to the highway and its southern residential compounds further out.",
        ],
      },
      {
        heading: "Landmarks We Collect From",
        paragraphs: [
          "The Riffa Golf Club and surrounding villa compounds, the older East Riffa neighbourhoods near the Sheikh Salman bin Ahmed Al Fateh Fort, and the residential areas throughout West Riffa are all standard pickup points.",
        ],
      },
      {
        heading: "Who Books From Riffa",
        paragraphs: [
          "Families in Riffa's villa compounds visiting relatives in the Eastern Province, and residents commuting for business across the causeway, make up the bulk of bookings from this area.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long from Riffa to the causeway?",
        answer:
          "Around 25 to 35 minutes, varying by whether you're in the northern neighbourhoods closer to the highway or further into the southern compounds.",
      },
      {
        question: "Do you cover both East and West Riffa?",
        answer:
          "Yes, both sides of Riffa are covered — share your exact compound or neighbourhood when you book so we can confirm the pickup point and fare.",
      },
      {
        question: "Is the SUV or van a common choice from Riffa?",
        answer:
          "Yes, given the area's family villa compounds, the SUV and van are frequently booked for family trips with extra luggage.",
      },
      {
        question: "Can you collect from Riffa Views or other newer compounds?",
        answer:
          "Yes, newer villa compounds throughout Riffa are covered — share the compound name and gate on WhatsApp so the driver can confirm the exact pickup point.",
      },
    ],
  },
  {
    slug: "adliya",
    name: "Adliya",
    metaTitle: "Taxi Pickup in Adliya | Bahrain to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup in Adliya for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Fixed fare, causeway crossing included.",
    causewayTimeLabel: "20–30 min to the causeway",
    intro: [
      "Adliya is Bahrain's best-known restaurant and cafe district, centred on Block 338 and the surrounding streets, with a mix of dining venues, art galleries, and residential buildings tucked behind the main strip. A taxi pickup in Adliya to Dammam or Khobar typically adds 20 to 30 minutes to reach the causeway.",
    ],
    sections: [
      {
        heading: "Getting to the Causeway from Adliya",
        paragraphs: [
          "From Adliya, the route joins the main highway network in broadly the same way as pickups from central Manama, given the district's central location. Evenings around Block 338's restaurant strip can see heavier local traffic, which we account for in pickup timing.",
        ],
      },
      {
        heading: "Landmarks We Collect From",
        paragraphs: [
          "Block 338 and its surrounding restaurant streets, the residential buildings behind the main strip, and the nearby Gulf Hotel area are all standard pickup points in Adliya.",
        ],
      },
      {
        heading: "Who Books From Adliya",
        paragraphs: [
          "A mix of expat residents living in the district's apartment buildings and visitors staying near the Gulf Hotel area book from Adliya, often combining a dinner or evening out with an early departure the next morning.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long from Adliya to the causeway?",
        answer:
          "Around 20 to 30 minutes under normal traffic, similar to pickups from central Manama given the district's central location.",
      },
      {
        question: "Can you collect from near the Gulf Hotel area?",
        answer:
          "Yes, the Gulf Hotel area and the surrounding Adliya streets are standard pickup points — share the exact address on WhatsApp.",
      },
      {
        question: "Is evening traffic around Block 338 an issue for pickups?",
        answer:
          "It can add some time on busy evenings, which is why we build a buffer into pickup timing for bookings scheduled around peak restaurant hours.",
      },
      {
        question: "Can I book a same-morning pickup after a late dinner in Adliya?",
        answer:
          "Yes, we run 24 hours a day, so an early-morning pickup following a late evening in Adliya's restaurant district is a standard booking.",
      },
    ],
  },
  {
    slug: "amwaj-islands",
    name: "Amwaj Islands",
    metaTitle: "Taxi Pickup in Amwaj Islands | Bahrain to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup in Amwaj Islands for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Fixed fare, causeway crossing included.",
    causewayTimeLabel: "35–45 min to the causeway",
    intro: [
      "Amwaj Islands is a man-made residential and marina community on Bahrain's north-eastern coast, popular with expat families for its waterfront villas, apartments, and canal-front living. A taxi pickup in Amwaj to Dammam or Khobar typically adds 35 to 45 minutes to reach the causeway, reflecting its distance from the main crossing point.",
    ],
    sections: [
      {
        heading: "Getting to the Causeway from Amwaj Islands",
        paragraphs: [
          "From Amwaj, the drive heads back across to the main island before joining the highway network toward Al Jasra and the King Fahd Causeway — one of the longer standard approach times we quote, given the island's position on the far north-east coast.",
        ],
      },
      {
        heading: "Landmarks We Collect From",
        paragraphs: [
          "The marina and canal-front residential blocks, the retail and dining strip along the waterfront, and the villa compounds throughout Amwaj are all standard pickup points.",
        ],
      },
      {
        heading: "Who Books From Amwaj Islands",
        paragraphs: [
          "Expat families living in Amwaj's villa and apartment communities make up most bookings from this area, often for family visits across the causeway or airport connections requiring an early pickup given the extra distance involved.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long from Amwaj Islands to the causeway?",
        answer:
          "Around 35 to 45 minutes, one of the longer approach times we quote given the island's distance from the main crossing point.",
      },
      {
        question: "Should I book extra buffer time for an early flight from Amwaj?",
        answer:
          "Yes, given the extra distance involved, we recommend building in additional buffer time for early morning departures or tight flight connections.",
      },
      {
        question: "Do you collect from the marina and villa communities directly?",
        answer:
          "Yes, both the marina-front blocks and the inland villa compounds are standard pickup points — share your building or villa number when you book.",
      },
      {
        question: "Is a van a common choice for Amwaj family bookings?",
        answer:
          "Yes, given the number of families in Amwaj's villa communities, the van and SUV are frequently booked alongside the standard sedan.",
      },
    ],
  },
  {
    slug: "budaiya",
    name: "Budaiya",
    metaTitle: "Taxi Pickup in Budaiya | Bahrain to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup in Budaiya for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Fixed fare, causeway crossing included.",
    causewayTimeLabel: "30–40 min to the causeway",
    intro: [
      "Budaiya is a coastal district on Bahrain's north-western shore, known for its farms, fish markets, and the long Budaiya Highway that runs through several villages along the coast. A taxi pickup in Budaiya to Dammam or Khobar typically adds 30 to 40 minutes to reach the causeway.",
    ],
    sections: [
      {
        heading: "Getting to the Causeway from Budaiya",
        paragraphs: [
          "From Budaiya, the route runs along the Budaiya Highway before turning south toward Al Jasra and the start of the King Fahd Causeway. Because Budaiya stretches across several coastal villages, pickup time varies by exactly which part of the district you're in.",
        ],
      },
      {
        heading: "Landmarks We Collect From",
        paragraphs: [
          "The farms and fish markets along the coast road, the villages strung along the Budaiya Highway, and the residential compounds set back from the shoreline are all standard pickup points.",
        ],
      },
      {
        heading: "Who Books From Budaiya",
        paragraphs: [
          "Residents of Budaiya's coastal villages and farm areas, along with families in the district's residential compounds, make up most bookings, often for family visits across the causeway.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long from Budaiya to the causeway?",
        answer:
          "Around 30 to 40 minutes, varying by exactly which village or compound along the Budaiya coast road you're starting from.",
      },
      {
        question: "Do you cover the whole Budaiya Highway area?",
        answer:
          "Yes, the villages and residential areas along the highway are all covered — share your exact location on WhatsApp when you book.",
      },
      {
        question: "Is this area far from Bahrain International Airport?",
        answer:
          "Yes, Budaiya sits on the opposite coast from the airport in Muharraq, so allow extra time if you're connecting to a flight from this area.",
      },
      {
        question: "Do you collect from the farm areas as well as residential streets?",
        answer:
          "Yes, both the farm and market areas along the coast road and the residential streets set back from it are covered — share your exact location on WhatsApp.",
      },
    ],
  },
  {
    slug: "isa-town",
    name: "Isa Town",
    metaTitle: "Taxi Pickup in Isa Town | Bahrain to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup in Isa Town for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Fixed fare, causeway crossing included.",
    causewayTimeLabel: "20–30 min to the causeway",
    intro: [
      "Isa Town is one of Bahrain's planned residential towns, built around a central grid of housing blocks, schools, and local markets south of the capital. A taxi pickup in Isa Town to Dammam or Khobar typically adds 20 to 30 minutes to reach the causeway, given its relatively central position on the island.",
    ],
    sections: [
      {
        heading: "Getting to the Causeway from Isa Town",
        paragraphs: [
          "From Isa Town, the drive joins the southern highway network toward Al Jasra and the King Fahd Causeway relatively directly, given the town's position south of Manama and reasonably close to the main crossing road.",
        ],
      },
      {
        heading: "Landmarks We Collect From",
        paragraphs: [
          "Isa Town's residential housing blocks, the central market area, and the schools and community facilities throughout the town are standard pickup points.",
        ],
      },
      {
        heading: "Who Books From Isa Town",
        paragraphs: [
          "Long-established Bahraini families in Isa Town's residential blocks make up most bookings, often for family visits to relatives in the Eastern Province or business trips across the causeway.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long from Isa Town to the causeway?",
        answer:
          "Around 20 to 30 minutes, one of the more direct approach times given the town's position south of Manama.",
      },
      {
        question: "Do you collect from specific housing blocks in Isa Town?",
        answer:
          "Yes, share your block and road number on WhatsApp when you book and we'll confirm the exact pickup point.",
      },
      {
        question: "What's the most common route booked from Isa Town?",
        answer:
          "Bahrain to Dammam is the most common, reflecting the town's family and business ties across the causeway.",
      },
      {
        question: "Can you collect from a specific block and road number?",
        answer:
          "Yes, share your block and road on WhatsApp when you book and we'll confirm the exact pickup point rather than a general town-wide meeting spot.",
      },
    ],
  },
  {
    slug: "hamad-town",
    name: "Hamad Town",
    metaTitle: "Taxi Pickup in Hamad Town | Bahrain to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup in Hamad Town for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Fixed fare, causeway crossing included.",
    causewayTimeLabel: "25–35 min to the causeway",
    intro: [
      "Hamad Town is one of Bahrain's larger planned residential towns, west of Isa Town, with an extensive grid of housing blocks and local amenities. A taxi pickup in Hamad Town to Dammam or Khobar typically adds 25 to 35 minutes to reach the causeway.",
    ],
    sections: [
      {
        heading: "Getting to the Causeway from Hamad Town",
        paragraphs: [
          "From Hamad Town, the drive joins the southern highway network in a similar way to Isa Town, heading toward Al Jasra and the King Fahd Causeway, with slightly more distance to cover given the town's position further west.",
        ],
      },
      {
        heading: "Landmarks We Collect From",
        paragraphs: [
          "The residential housing blocks throughout Hamad Town, local markets, and community facilities across the town are standard pickup points.",
        ],
      },
      {
        heading: "Who Books From Hamad Town",
        paragraphs: [
          "As with neighbouring Isa Town, established Bahraini families in Hamad Town's residential blocks make up most bookings, typically for family visits or business trips across the causeway.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long from Hamad Town to the causeway?",
        answer:
          "Around 25 to 35 minutes, slightly longer than neighbouring Isa Town given the town's position a little further west.",
      },
      {
        question: "Is Hamad Town covered the same as Isa Town?",
        answer:
          "Yes, both towns are standard pickup areas with the same fare structure — share your exact block and road when you book.",
      },
      {
        question: "Can a group booking collect passengers from both Isa Town and Hamad Town on the same trip?",
        answer:
          "Yes, tell us both pickup points on WhatsApp and we'll plan a route collecting from each before heading to the causeway.",
      },
      {
        question: "Do you serve the local markets area in Hamad Town directly?",
        answer:
          "Yes, the market and surrounding residential blocks are standard pickup points — share your exact address so the driver can find you easily.",
      },
    ],
  },
  {
    slug: "sitra",
    name: "Sitra",
    metaTitle: "Taxi Pickup in Sitra | Bahrain to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup in Sitra for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Fixed fare, causeway crossing included.",
    causewayTimeLabel: "30–40 min to the causeway",
    intro: [
      "Sitra is an island connected to Bahrain's main island by causeway, known for its residential neighbourhoods alongside industrial and petrochemical facilities on its southern side. A taxi pickup in Sitra to Dammam or Khobar typically adds 30 to 40 minutes to reach the King Fahd Causeway.",
    ],
    sections: [
      {
        heading: "Getting to the Causeway from Sitra",
        paragraphs: [
          "From Sitra, the drive crosses back onto the main island before joining the highway network toward Al Jasra and the King Fahd Causeway — a longer approach than the central districts, given Sitra's position on its own connected island south-east of Manama.",
        ],
      },
      {
        heading: "Landmarks We Collect From",
        paragraphs: [
          "Sitra's residential neighbourhoods, local markets, and the areas near the island's industrial zone are standard pickup points, away from the restricted facility areas themselves.",
        ],
      },
      {
        heading: "Who Books From Sitra",
        paragraphs: [
          "Residents of Sitra's neighbourhoods and staff connected to the island's industrial facilities make up most bookings, often for family visits or work-related travel across the causeway.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long from Sitra to the causeway?",
        answer:
          "Around 30 to 40 minutes, reflecting Sitra's position on its own connected island south-east of central Manama.",
      },
      {
        question: "Do you collect near the industrial areas of Sitra?",
        answer:
          "We collect from residential and accessible commercial areas near the industrial zone, not from within restricted facility areas themselves — share your exact address on WhatsApp.",
      },
      {
        question: "Is this a common route for company staff transport?",
        answer:
          "Yes, given the industrial facilities on the island, corporate account bookings for staff transport are common from this area.",
      },
      {
        question: "Do you collect from residential streets away from the industrial zone?",
        answer:
          "Yes, Sitra's residential neighbourhoods away from the facility gates are standard pickup points — share your exact address on WhatsApp.",
      },
    ],
  },
  {
    slug: "bahrain-airport",
    name: "Bahrain Airport",
    metaTitle: "Taxi Pickup at Bahrain Airport | BAH to Dammam & Beyond",
    metaDescription:
      "Book a taxi pickup at Bahrain International Airport (BAH) for Dammam, Khobar, and the rest of the Bahrain–Saudi Arabia corridor. Flight tracking included.",
    causewayTimeLabel: "30–40 min to the causeway",
    intro: [
      "Bahrain International Airport (BAH) sits in Muharraq, and is a common starting point for passengers continuing straight on to Saudi Arabia rather than stopping in Bahrain first. A taxi pickup at BAH to Dammam or Khobar typically adds 30 to 40 minutes to reach the King Fahd Causeway once you're through arrivals.",
    ],
    sections: [
      {
        heading: "Meeting You at Arrivals",
        paragraphs: [
          "For this specific pickup point, we recommend using our dedicated Bahrain Airport to Dammam route page rather than a general Bahrain pickup, since it builds flight tracking and a name-board meet-and-greet directly into the booking — your driver adjusts to early or delayed landings automatically.",
        ],
      },
      {
        heading: "Getting to the Causeway from BAH",
        paragraphs: [
          "From the airport in Muharraq, the drive crosses to the main island before joining the highway network toward Al Jasra and the King Fahd Causeway, similar in distance to a pickup from central Muharraq given the airport's location within that district.",
        ],
      },
      {
        heading: "Who Books From Bahrain Airport",
        paragraphs: [
          "Passengers connecting from an international flight straight through to Dammam, Khobar, or beyond make up the large majority of bookings from this pickup point, rather than travellers stopping in Bahrain itself first.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I book this page or the dedicated airport route page?",
        answer:
          "Use the dedicated Bahrain Airport to Dammam (or equivalent) route page for a flight-tracked, meet-and-greet pickup — it's built specifically for arriving passengers.",
      },
      {
        question: "How long from BAH to the causeway?",
        answer:
          "Around 30 to 40 minutes once you're in the vehicle, similar to a pickup from central Muharraq given the airport's location.",
      },
      {
        question: "Do you track my flight if I book from this page?",
        answer:
          "Flight tracking is built into our dedicated airport route pages — for the most reliable arrivals experience, book through those rather than a general pickup request.",
      },
      {
        question: "Where at the airport does the driver wait?",
        answer:
          "In the arrivals hall with a name board, once you've cleared Bahrain immigration and baggage claim — the exact meeting point is confirmed on WhatsApp ahead of your landing.",
      },
    ],
  },
];

export function getPickupArea(slug: string): PickupArea | undefined {
  return PICKUP_AREAS.find((a) => a.slug === slug);
}
