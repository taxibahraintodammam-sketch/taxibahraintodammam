import type { Locale } from "@/lib/locale";

/**
 * Route pages share a design system but not a fixed page shape: each route
 * has an intent (lib/route-intent.ts) that decides its section order and
 * which of the modules below it gets. Every statement here restates a fact
 * already published on the relevant route page in content/routes.ts — no
 * new claims.
 */

export type ModuleStep = { title: string; body: string };

type Copy = {
  arrival: { eyebrow: string; heading: string; steps: ModuleStep[]; link: string };
  departure: {
    eyebrow: string;
    heading: string;
    intro: string;
    flightLabel: string;
    dayBefore: string;
    resultLead: string;
    resultEmpty: string;
    caveat: string;
    cta: string;
    message: string;
    link: string;
  };
  longHaul: Record<string, { eyebrow: string; heading: string; rows: { label: string; body: string }[] }>;
  industrial: {
    eyebrow: string;
    heading: string;
    rows: { label: string; body: string }[];
    link: string;
  };
};

export const ROUTE_MODULES: Record<Locale, Copy> = {
  en: {
    arrival: {
      eyebrow: "Landing and going straight across",
      heading: "How your airport pickup works",
      steps: [
        { title: "Send your flight number", body: "That's all we need to time the pickup. No fixed clock time to guess." },
        { title: "We track the landing", body: "Early or delayed, the driver's arrival moves with your flight." },
        { title: "Met in arrivals", body: "Your driver waits with a name board while you clear immigration and collect bags." },
        { title: "Straight to the causeway", body: "No stop in the city first. The same car takes you through both border posts." },
        { title: "Your address", body: "Dropped at the door, not a taxi rank on the other side." },
      ],
      link: "More about airport transfers",
    },
    departure: {
      eyebrow: "Flying out of DMM",
      heading: "When should you leave Bahrain?",
      intro:
        "We work your pickup backwards from your flight. For an international departure we suggest reaching the terminal 2.5–3 hours early, and the drive itself is typically 80–100 minutes.",
      flightLabel: "Your flight departs at",
      dayBefore: "the day before",
      resultLead: "Plan to leave Bahrain by about",
      resultEmpty: "Enter your departure time to see a suggested pickup time.",
      caveat:
        "Leave earlier on Thursday evenings, Friday mornings and public holidays, when border queues run longer. We confirm the exact pickup time with your booking.",
      cta: "Book this pickup on WhatsApp",
      message: "Hi, I need a taxi from Bahrain to Dammam Airport (DMM).\nFlight time: {time}\nAirline: \nPickup address in Bahrain: ",
      link: "More about airport transfers",
    },
    longHaul: {
      "taxi-bahrain-to-riyadh": {
        eyebrow: "Planning a long drive",
        heading: "What to plan for a 5-hour trip to Riyadh",
        rows: [
          { label: "When to leave", body: "Many passengers leave overnight to arrive in Riyadh the next morning. Confirm your departure time well in advance." },
          { label: "On the road", body: "One continuous drive, with rest breaks at fuel and prayer stops along the highway." },
          { label: "Vehicle", body: "For five-plus hours, many choose the SUV or luxury sedan for the extra legroom. The sedan still works for one to three passengers." },
          { label: "Coming back", body: "Need the driver to wait in Riyadh, or a separate return leg? Tell us when you book and it's quoted together." },
        ],
      },
      "taxi-bahrain-to-al-ahsa-hofuf": {
        eyebrow: "Visiting family in Al Ahsa",
        heading: "What to plan for the trip inland",
        rows: [
          { label: "Who travels", body: "Mostly families visiting relatives for a weekend, a holiday or a family occasion." },
          { label: "Drop-off", body: "Straight to the family address, not a central point in Hofuf. Send the exact location when you book." },
          { label: "Luggage", body: "Longer stays mean more bags. The SUV or van usually suits; a sedan covers shorter visits." },
          { label: "Several stops?", body: "Visiting more than one address in a day is easier with hourly chauffeur hire." },
        ],
      },
    },
    industrial: {
      eyebrow: "Rotations and site travel",
      heading: "Built around work schedules",
      rows: [
        { label: "Rotation dates", body: "Most people on this route travel on leave or rotation dates. Send the pattern once and we'll plan pickups ahead." },
        { label: "Compound drop-off", body: "We drop at named compounds and residential gates as well as standard addresses. Give us the compound name." },
        { label: "Site access", body: "We handle transport, not access. Passes or clearance for compounds and sites are arranged by you or your employer." },
        { label: "Moving a team", body: "Several staff on the same schedule can be managed under one corporate account." },
      ],
      link: "Corporate accounts",
    },
  },
  ar: {
    arrival: {
      eyebrow: "من الطائرة مباشرة عبر الجسر",
      heading: "كيف يتم استقبالك في المطار",
      steps: [
        { title: "أرسل رقم رحلتك", body: "هذا كل ما نحتاجه لتوقيت الاستقبال، دون تخمين وقت ثابت." },
        { title: "نتابع وقت الهبوط", body: "سواء وصلت مبكرًا أو تأخرت، يتغير موعد السائق مع رحلتك." },
        { title: "استقبال في صالة الوصول", body: "ينتظرك السائق حاملًا لوحة باسمك أثناء إنهاء الجوازات واستلام الحقائب." },
        { title: "مباشرة إلى الجسر", body: "دون التوقف في المدينة أولًا. السيارة نفسها تعبر بك نقطتي الحدود." },
        { title: "إلى عنوانك", body: "نوصلك إلى الباب، لا إلى موقف سيارات أجرة على الجانب الآخر." },
      ],
      link: "المزيد عن النقل من وإلى المطار",
    },
    departure: {
      eyebrow: "السفر من مطار الدمام",
      heading: "متى يجب أن تغادر البحرين؟",
      intro:
        "نحسب وقت الاستلام بالرجوع من موعد رحلتك. للرحلات الدولية ننصح بالوصول إلى المطار قبل 2.5 إلى 3 ساعات، والمسافة نفسها تستغرق عادةً 80 إلى 100 دقيقة.",
      flightLabel: "موعد إقلاع رحلتك",
      dayBefore: "في اليوم السابق",
      resultLead: "خطط للمغادرة من البحرين في حدود",
      resultEmpty: "أدخل وقت الإقلاع لمعرفة وقت الاستلام المقترح.",
      caveat: "غادر مبكرًا مساء الخميس وصباح الجمعة والعطلات الرسمية حيث تطول طوابير الحدود. نؤكد لك وقت الاستلام الدقيق مع الحجز.",
      cta: "احجز هذا الاستلام عبر واتساب",
      message: "مرحبًا، أحتاج تاكسي من البحرين إلى مطار الدمام.\nموعد الرحلة: {time}\nشركة الطيران: \nعنوان الاستلام في البحرين: ",
      link: "المزيد عن النقل من وإلى المطار",
    },
    longHaul: {
      "taxi-bahrain-to-riyadh": {
        eyebrow: "التخطيط لرحلة طويلة",
        heading: "ما الذي تخطط له في رحلة الخمس ساعات إلى الرياض",
        rows: [
          { label: "وقت الانطلاق", body: "يسافر كثيرون ليلًا للوصول إلى الرياض صباحًا. أكّد وقت انطلاقك مسبقًا بوقت كافٍ." },
          { label: "على الطريق", body: "رحلة متواصلة مع استراحات عند محطات الوقود وأوقات الصلاة على الطريق." },
          { label: "السيارة", body: "لأكثر من خمس ساعات، يفضّل كثيرون الدفع الرباعي أو السيدان الفاخرة لمساحة أرجل أكبر، وتبقى السيدان خيارًا عمليًا من راكب إلى 3 ركاب." },
          { label: "العودة", body: "تحتاج انتظار السائق في الرياض أو رحلة عودة منفصلة؟ أخبرنا عند الحجز ونسعّرها معًا." },
        ],
      },
      "taxi-bahrain-to-al-ahsa-hofuf": {
        eyebrow: "زيارة العائلة في الأحساء",
        heading: "ما الذي تخطط له في الرحلة إلى الداخل",
        rows: [
          { label: "من يسافر", body: "في الغالب عائلات تزور أقاربها في عطلة نهاية الأسبوع أو الإجازات أو المناسبات العائلية." },
          { label: "نقطة التوصيل", body: "مباشرة إلى عنوان العائلة، لا إلى نقطة مركزية في الهفوف. أرسل الموقع الدقيق عند الحجز." },
          { label: "الأمتعة", body: "الإقامة الأطول تعني حقائب أكثر، والدفع الرباعي أو الفان هو الأنسب عادةً، والسيدان تكفي للزيارات القصيرة." },
          { label: "أكثر من عنوان؟", body: "زيارة أكثر من عنوان في يوم واحد أسهل مع استئجار الشوفير بالساعة." },
        ],
      },
    },
    industrial: {
      eyebrow: "المناوبات ورحلات المواقع",
      heading: "مصممة حول جداول العمل",
      rows: [
        { label: "مواعيد المناوبة", body: "يسافر معظم الركاب على هذا الخط في مواعيد الإجازات أو المناوبات. أرسل الجدول مرة واحدة ونخطط الاستلام مسبقًا." },
        { label: "التوصيل إلى المجمعات", body: "نوصل إلى المجمعات السكنية وبواباتها بالاسم وكذلك العناوين العادية. أرسل اسم المجمع." },
        { label: "دخول المواقع", body: "نحن نتولى النقل لا تصاريح الدخول. تصاريح المجمعات والمواقع يرتبها الراكب أو جهة العمل." },
        { label: "نقل فريق", body: "يمكن إدارة عدة موظفين على الجدول نفسه ضمن حساب مؤسسي واحد." },
      ],
      link: "الحسابات المؤسسية",
    },
  },
};
