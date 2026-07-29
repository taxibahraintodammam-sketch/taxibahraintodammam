import type { Locale } from "@/lib/locale";

export type Dictionary = {
  skipToContent: string;
  eyebrow: string;
  navRoutes: string;
  navFares: string;
  navFleet: string;
  navServices: string;
  navAbout: string;
  navBlog: string;
  navContact: string;
  callNow: string;
  whatsappCta: string;
  getFareCta: string;
  bookNowCta: string;
  menuOpen: string;
  menuClose: string;
  footerCompanyHeading: string;
  footerRoutesHeading: string;
  footerServicesHeading: string;
  footerPickupHeading: string;
  footerLegalHeading: string;
  footerTagline: string;
  footerLicensedLine: string;
  footerAvailable: string;
  footerRightsReserved: string;
  fareDisclaimerLabel: string;
  immigrationDisclaimerLabel: string;
  fareDisclaimer: string;
  immigrationDisclaimer: string;

  // Generic section chrome, reused across route/service/fleet/pickup templates
  faresEyebrow: string;
  startingFrom: string;
  vehicleHeader: string;
  capacityHeader: string;
  startingFareHeader: string;
  vehicleOptionsEyebrow: string;
  chooseYourVehicle: string;
  coverageEyebrow: string;
  pickupAreasWeCoverIn: string;
  youMightAlsoNeed: string;
  readAllFaqs: string;
  frequentlyAskedQuestions: string;
  serviceEyebrow: string;
  licensed247: string;
  distanceLabel: string;
  doorToDoorLabel: string;
  borderLabel: string;
  taxiFromTo: string;
  fleetEyebrow: string;
  passengersLabel: string;
  luggageLabel: string;
  commonlyBookedFor: string;
  pickupAreaEyebrow: string;
  taxiPickupIn: string;
  typicalTimeToCauseway: string;
  popularRoutesFrom: string;
  toLabel: string;
  seeAllRoutes: string;
  ctaHeading: string;
  ctaWhatsappButton: string;
  callButtonPrefix: string;
  homeCrumb: string;
  causewayHubName: string;
  fleetCrumb: string;
  faqsForHeading: string;
  pickupPrefix: string;
  dropoffPrefix: string;
  routeDurationHeading: string;
  guideEyebrow: string;
  byAuthorPrefix: string;
  publishedPrefix: string;
  updatedPrefix: string;
  minReadSuffix: string;
  writtenByLabel: string;
  editorialTeamBlurb: string;
  relatedRoutesServicesHeading: string;
  relatedGuidesHeading: string;
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    skipToContent: "Skip to content",
    eyebrow: "Licensed cross-border operator",
    navRoutes: "Routes",
    navFares: "Fares",
    navFleet: "Fleet",
    navServices: "Services",
    navAbout: "About",
    navBlog: "Blog",
    navContact: "Contact",
    callNow: "Call",
    whatsappCta: "WhatsApp",
    getFareCta: "Get my fare",
    bookNowCta: "Book on WhatsApp",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    footerCompanyHeading: "Company",
    footerRoutesHeading: "Routes",
    footerServicesHeading: "Services",
    footerPickupHeading: "Pickup Areas",
    footerLegalHeading: "Legal",
    footerTagline:
      "Licensed cross-border taxi and chauffeur service on the Bahrain–Saudi corridor via the King Fahd Causeway.",
    footerLicensedLine: "Licensed operator · Fixed fares · English & Arabic speaking drivers",
    footerAvailable: "Available 24 hours a day, 7 days a week",
    footerRightsReserved: "All rights reserved.",
    fareDisclaimerLabel: "Fare notice",
    immigrationDisclaimerLabel: "Immigration notice",
    fareDisclaimer:
      "Final fare depends on pickup point, timing and vehicle. Confirm on WhatsApp before departure.",
    immigrationDisclaimer:
      "Passengers are responsible for their own travel documents and complete their own immigration formalities at each border post. We do not guarantee entry decisions, visa outcomes, or flight connections.",

    faresEyebrow: "Fares",
    startingFrom: "starting from",
    vehicleHeader: "Vehicle",
    capacityHeader: "Capacity",
    startingFareHeader: "Starting fare",
    vehicleOptionsEyebrow: "Vehicle options",
    chooseYourVehicle: "Choose your vehicle",
    coverageEyebrow: "Coverage",
    pickupAreasWeCoverIn: "Pickup areas we cover in",
    youMightAlsoNeed: "You might also need",
    readAllFaqs: "Read all FAQs",
    frequentlyAskedQuestions: "Frequently asked questions",
    serviceEyebrow: "Service · Licensed 24/7",
    licensed247: "Licensed 24/7",
    distanceLabel: "Distance",
    doorToDoorLabel: "Door-to-door",
    borderLabel: "Border",
    taxiFromTo: "Taxi from {from} to {to}",
    fleetEyebrow: "Fleet",
    passengersLabel: "Passengers",
    luggageLabel: "Luggage",
    commonlyBookedFor: "Commonly booked for",
    pickupAreaEyebrow: "Pickup Area",
    taxiPickupIn: "Taxi Pickup in {name}",
    typicalTimeToCauseway: "Typical time to the causeway",
    popularRoutesFrom: "Popular routes from {name}",
    toLabel: "To",
    seeAllRoutes: "See all routes",
    ctaHeading: "Ready to cross? Get a fixed fare in one WhatsApp message.",
    ctaWhatsappButton: "Get my fare on WhatsApp",
    callButtonPrefix: "Call",
    homeCrumb: "Home",
    causewayHubName: "King Fahd Causeway Taxi",
    fleetCrumb: "Fleet",
    faqsForHeading: "FAQs — {name}",
    pickupPrefix: "Pickup,",
    dropoffPrefix: "Drop-off,",
    routeDurationHeading: "{from} to {to} in {duration}",
    guideEyebrow: "Guide",
    byAuthorPrefix: "By",
    publishedPrefix: "Published",
    updatedPrefix: "Updated",
    minReadSuffix: "min read",
    writtenByLabel: "Written by",
    editorialTeamBlurb:
      "Part of the {brand} editorial team, covering the King Fahd Causeway crossing and the Bahrain–Saudi Arabia corridor day to day.",
    relatedRoutesServicesHeading: "Related routes and services",
    relatedGuidesHeading: "Related guides",
  },
  ar: {
    skipToContent: "تخطَّ إلى المحتوى",
    eyebrow: "شركة نقل مرخّصة عابرة للحدود",
    navRoutes: "الخطوط",
    navFares: "الأسعار",
    navFleet: "الأسطول",
    navServices: "الخدمات",
    navAbout: "من نحن",
    navBlog: "المدونة",
    navContact: "تواصل معنا",
    callNow: "اتصال",
    whatsappCta: "واتساب",
    getFareCta: "احصل على السعر",
    bookNowCta: "احجز عبر واتساب",
    menuOpen: "فتح القائمة",
    menuClose: "إغلاق القائمة",
    footerCompanyHeading: "الشركة",
    footerRoutesHeading: "الخطوط",
    footerServicesHeading: "الخدمات",
    footerPickupHeading: "مناطق الاستلام",
    footerLegalHeading: "قانوني",
    footerTagline:
      "خدمة تاكسي وشوفير مرخّصة عابرة للحدود بين البحرين والسعودية عبر جسر الملك فهد.",
    footerLicensedLine: "شركة مرخّصة · أسعار ثابتة · سائقون يتحدثون العربية والإنجليزية",
    footerAvailable: "متاحون على مدار 24 ساعة، طوال أيام الأسبوع",
    footerRightsReserved: "جميع الحقوق محفوظة.",
    fareDisclaimerLabel: "ملاحظة حول السعر",
    immigrationDisclaimerLabel: "ملاحظة حول الإجراءات",
    fareDisclaimer:
      "يعتمد السعر النهائي على نقطة الانطلاق والتوقيت ونوع المركبة. يُرجى التأكيد عبر واتساب قبل الانطلاق.",
    immigrationDisclaimer:
      "يتحمّل المسافر مسؤولية أوراقه الثبوتية وإتمام إجراءات الهجرة الخاصة به في كل نقطة حدودية. نحن لا نضمن قرارات الدخول أو نتائج التأشيرة أو مواعيد الرحلات الجوية.",

    faresEyebrow: "الأسعار",
    startingFrom: "ابتداءً من",
    vehicleHeader: "المركبة",
    capacityHeader: "السعة",
    startingFareHeader: "السعر ابتداءً من",
    vehicleOptionsEyebrow: "خيارات المركبات",
    chooseYourVehicle: "اختر مركبتك",
    coverageEyebrow: "التغطية",
    pickupAreasWeCoverIn: "مناطق الاستلام التي نغطّيها في",
    youMightAlsoNeed: "قد تحتاج أيضًا",
    readAllFaqs: "اقرأ جميع الأسئلة الشائعة",
    frequentlyAskedQuestions: "الأسئلة الشائعة",
    serviceEyebrow: "خدمة · مرخّصة على مدار الساعة",
    licensed247: "مرخّصة على مدار الساعة",
    distanceLabel: "المسافة",
    doorToDoorLabel: "من الباب إلى الباب",
    borderLabel: "الحدود",
    taxiFromTo: "تاكسي من {from} إلى {to}",
    fleetEyebrow: "الأسطول",
    passengersLabel: "الركاب",
    luggageLabel: "الأمتعة",
    commonlyBookedFor: "يُحجز عادةً من أجل",
    pickupAreaEyebrow: "منطقة الاستلام",
    taxiPickupIn: "استلام تاكسي في {name}",
    typicalTimeToCauseway: "الوقت المعتاد للوصول إلى الجسر",
    popularRoutesFrom: "الخطوط الأكثر حجزًا من {name}",
    toLabel: "إلى",
    seeAllRoutes: "عرض جميع الخطوط",
    ctaHeading: "جاهز للعبور؟ احصل على سعر ثابت برسالة واتساب واحدة.",
    ctaWhatsappButton: "احصل على سعري عبر واتساب",
    callButtonPrefix: "اتصال",
    homeCrumb: "الرئيسية",
    causewayHubName: "تاكسي جسر الملك فهد",
    fleetCrumb: "الأسطول",
    faqsForHeading: "الأسئلة الشائعة — {name}",
    pickupPrefix: "استلام،",
    dropoffPrefix: "توصيل،",
    routeDurationHeading: "{from} إلى {to} في {duration}",
    guideEyebrow: "دليل",
    byAuthorPrefix: "بقلم",
    publishedPrefix: "نُشر في",
    updatedPrefix: "آخر تحديث",
    minReadSuffix: "دقيقة قراءة",
    writtenByLabel: "بقلم",
    editorialTeamBlurb:
      "جزء من فريق تحرير {brand}، الذي يغطي عبور جسر الملك فهد وممر البحرين–السعودية يوميًا.",
    relatedRoutesServicesHeading: "خطوط وخدمات ذات صلة",
    relatedGuidesHeading: "مقالات ذات صلة",
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}
