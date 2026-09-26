import type { Locale } from "@/lib/locale";

/**
 * "How this service works" for each service page — the sequence differs per
 * service because the services genuinely work differently (a flight drives an
 * airport transfer; a rotation schedule drives a corporate account). Each
 * step restates what the service page in content/services.ts already says.
 */

export type ServiceFlow = { eyebrow: string; heading: string; steps: { title: string; body: string }[]; note?: string };

export const SERVICE_FLOWS: Record<Locale, Record<string, ServiceFlow>> = {
  en: {
    "airport-transfers": {
      eyebrow: "How it works",
      heading: "Flight first, then everything else",
      steps: [
        { title: "Flight", body: "Send your flight number, or your departure time if you're flying out." },
        { title: "Arrival", body: "We track landings, so an early or late flight moves the pickup with it." },
        { title: "Driver", body: "Waiting in arrivals with a name board, or at your door with a buffer for the border." },
        { title: "Crossing", body: "The same car goes through both immigration posts. The toll is in the fare." },
        { title: "Destination", body: "Your address, or the departures curb for your airline." },
      ],
      note: "We build in timing buffers but can't guarantee flight connections. Border and traffic conditions are outside our control.",
    },
    "corporate-accounts": {
      eyebrow: "How an account runs",
      heading: "From one request to a monthly statement",
      steps: [
        { title: "Your company", body: "Share typical staff numbers, routes and rotation or travel patterns." },
        { title: "Standing setup", body: "We agree a recurring schedule and rates for your common routes and vehicles." },
        { title: "Requests", body: "A nominated coordinator books trips instead of each employee." },
        { title: "Trips", body: "Same fixed-fare structure on every booking, sedan to 30-seat coaster." },
        { title: "Billing", body: "Consolidated, usually monthly, broken down by employee, route and date." },
      ],
    },
    "hourly-chauffeur-hire": {
      eyebrow: "How hourly hire works",
      heading: "Book the time, not the trip",
      steps: [
        { title: "Hours", body: "Tell us the date, the block of hours and your first pickup." },
        { title: "Vehicle", body: "Sedan or luxury for meetings; SUV or van for groups or materials." },
        { title: "Stops", body: "The driver waits between stops, on either side of the causeway." },
        { title: "Overruns", body: "If the day runs long, extra time is charged at the same hourly rate." },
      ],
    },
    "family-van-transfer": {
      eyebrow: "Why one van",
      heading: "Keep the family together from door to door",
      steps: [
        { title: "Headcount", body: "Up to seven passengers in one vehicle, not split across two cars." },
        { title: "Luggage", body: "Room for six large suitcases, plus car seats and strollers." },
        { title: "Border", body: "Everyone arrives at both immigration posts together." },
        { title: "Fare", body: "One fixed fare for the whole group, confirmed before you travel." },
      ],
      note: "Need a child car seat? Mention it when you book.",
    },
    "vip-luxury-transfer": {
      eyebrow: "What changes with VIP",
      heading: "Same route, a different standard",
      steps: [
        { title: "Vehicle", body: "A Mercedes S-Class chauffeur car, 1–3 passengers and two large cases." },
        { title: "Driver", body: "Briefed for a higher standard of presentation and punctuality." },
        { title: "Airports", body: "Name-board meet-and-greet and flight tracking as standard." },
        { title: "Multi-stop days", body: "Combine with hourly hire for a day of meetings." },
      ],
    },
    "wheelchair-accessible-transfer": {
      eyebrow: "Before you book",
      heading: "What we need to plan an accessible trip",
      steps: [
        { title: "Advance notice", body: "Ideally a day ahead. Accessible vehicles are a smaller part of our fleet." },
        { title: "Your equipment", body: "Manual or powered, folding or fixed, so we send the right vehicle." },
        { title: "Assistance", body: "The driver helps load and unload mobility equipment. Tell us about any extra help needed." },
        { title: "Border time", body: "Let us know if you'll need extra time at the checkpoints so we plan a realistic buffer." },
      ],
      note: "For more complex medical needs, tell us in advance so we can say honestly what we can accommodate.",
    },
    "visa-u-turn-service": {
      eyebrow: "The round trip",
      heading: "Four checkpoints, one driver",
      steps: [
        { title: "Bahrain exit", body: "Your driver collects you and takes you to the Bahrain-side post." },
        { title: "Saudi entry", body: "Across the 25 km bridge to clear Saudi immigration." },
        { title: "Saudi exit", body: "Turn around and exit Saudi Arabia at its post." },
        { title: "Bahrain entry", body: "Back across the causeway to re-enter Bahrain. Typically 3–5 hours in all." },
      ],
      note: "We provide transport only. We don't advise on visa strategy or guarantee entry or re-entry decisions.",
    },
  },
  ar: {
    "airport-transfers": {
      eyebrow: "كيف تعمل الخدمة",
      heading: "رحلتك الجوية أولًا، ثم كل ما سواها",
      steps: [
        { title: "الرحلة الجوية", body: "أرسل رقم رحلتك، أو موعد الإقلاع إن كنت مسافرًا." },
        { title: "الوصول", body: "نتابع أوقات الهبوط، فيتغير موعد الاستقبال مع أي تقديم أو تأخير." },
        { title: "السائق", body: "ينتظرك في صالة الوصول بلوحة باسمك، أو عند بابك مع هامش لوقت الحدود." },
        { title: "العبور", body: "السيارة نفسها تعبر نقطتي الجوازات، ورسوم الجسر مشمولة في السعر." },
        { title: "الوجهة", body: "عنوانك، أو رصيف المغادرة الخاص بشركة طيرانك." },
      ],
      note: "نضع هوامش زمنية لكننا لا نضمن اللحاق بالرحلات، فظروف الحدود والمرور خارجة عن سيطرتنا.",
    },
    "corporate-accounts": {
      eyebrow: "كيف يعمل الحساب",
      heading: "من طلب واحد إلى كشف حساب شهري",
      steps: [
        { title: "شركتك", body: "شاركنا أعداد الموظفين المعتادة والخطوط وأنماط المناوبات أو السفر." },
        { title: "إعداد دائم", body: "نتفق على جدول متكرر وأسعار لخطوطك وسياراتك الأكثر استخدامًا." },
        { title: "الطلبات", body: "منسق تعيّنه يحجز الرحلات بدل أن يحجز كل موظف بنفسه." },
        { title: "الرحلات", body: "نفس هيكل الأسعار الثابتة لكل حجز، من السيدان إلى حافلة 30 مقعدًا." },
        { title: "الفوترة", body: "فاتورة موحدة، شهرية عادةً، مفصلة حسب الموظف والخط والتاريخ." },
      ],
    },
    "hourly-chauffeur-hire": {
      eyebrow: "كيف يعمل الاستئجار بالساعة",
      heading: "احجز الوقت لا الرحلة",
      steps: [
        { title: "الساعات", body: "أخبرنا بالتاريخ وعدد الساعات ونقطة الاستلام الأولى." },
        { title: "السيارة", body: "سيدان أو فاخرة للاجتماعات، ودفع رباعي أو فان للمجموعات أو المواد." },
        { title: "المحطات", body: "ينتظرك السائق بين المحطات، على جانبي الجسر." },
        { title: "الوقت الإضافي", body: "إذا طال اليوم، يُحسب الوقت الإضافي بالسعر نفسه للساعة." },
      ],
    },
    "family-van-transfer": {
      eyebrow: "لماذا فان واحد",
      heading: "العائلة معًا من الباب إلى الباب",
      steps: [
        { title: "عدد الركاب", body: "حتى سبعة ركاب في سيارة واحدة بدل التوزع على سيارتين." },
        { title: "الأمتعة", body: "مساحة لست حقائب كبيرة، إضافة إلى مقاعد الأطفال وعربات الأطفال." },
        { title: "الحدود", body: "يصل الجميع معًا إلى نقطتي الجوازات." },
        { title: "السعر", body: "سعر ثابت واحد للمجموعة كلها، يُؤكَّد قبل السفر." },
      ],
      note: "تحتاج مقعد أطفال؟ اذكر ذلك عند الحجز.",
    },
    "vip-luxury-transfer": {
      eyebrow: "ما الذي يختلف في خدمة كبار الشخصيات",
      heading: "الخط نفسه بمستوى مختلف",
      steps: [
        { title: "السيارة", body: "مرسيدس الفئة S مع سائق، من راكب إلى 3 ركاب وحقيبتين كبيرتين." },
        { title: "السائق", body: "مُهيّأ لمستوى أعلى من المظهر والالتزام بالمواعيد." },
        { title: "المطارات", body: "استقبال بلوحة الاسم ومتابعة الرحلة الجوية بشكل أساسي." },
        { title: "يوم بعدة محطات", body: "يمكن دمجها مع الاستئجار بالساعة ليوم من الاجتماعات." },
      ],
    },
    "wheelchair-accessible-transfer": {
      eyebrow: "قبل الحجز",
      heading: "ما نحتاجه لتخطيط رحلة مهيأة",
      steps: [
        { title: "إشعار مسبق", body: "يُفضّل قبل يوم، فالسيارات المهيأة جزء أصغر من أسطولنا." },
        { title: "معداتك", body: "يدوية أو كهربائية، قابلة للطي أو ثابتة، لنرسل السيارة المناسبة." },
        { title: "المساعدة", body: "يساعد السائق في تحميل معدات التنقل وإنزالها. أخبرنا بأي مساعدة إضافية." },
        { title: "وقت الحدود", body: "أخبرنا إن كنت ستحتاج وقتًا إضافيًا عند نقاط التفتيش لنخطط بهامش واقعي." },
      ],
      note: "للاحتياجات الطبية الأكثر تعقيدًا، أخبرنا مسبقًا لنوضح لك بصدق ما يمكننا توفيره.",
    },
    "visa-u-turn-service": {
      eyebrow: "رحلة الذهاب والعودة",
      heading: "أربع نقاط تفتيش وسائق واحد",
      steps: [
        { title: "الخروج من البحرين", body: "يستلمك السائق ويوصلك إلى نقطة الجوازات البحرينية." },
        { title: "الدخول إلى السعودية", body: "عبر الجسر بطول 25 كم لإنهاء إجراءات الجوازات السعودية." },
        { title: "الخروج من السعودية", body: "العودة والخروج من نقطة الجوازات السعودية." },
        { title: "الدخول إلى البحرين", body: "العودة عبر الجسر لدخول البحرين مجددًا. تستغرق الرحلة عادةً 3 إلى 5 ساعات." },
      ],
      note: "نحن نقدم النقل فقط، ولا نقدم استشارات بشأن التأشيرات ولا نضمن قرارات الدخول أو العودة.",
    },
  },
};
