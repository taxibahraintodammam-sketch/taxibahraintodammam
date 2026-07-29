import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, withSlash } from "@/lib/url";
import { BUSINESS } from "@/content/business";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import type { Locale } from "@/lib/locale";

// Template legal content. Have this reviewed by a qualified lawyer licensed
// in Bahrain before launch — it is not a substitute for legal advice.

export const dynamic = "force-static";

const COPY: Record<Locale, { title: string; description: string; lastUpdated: string }> = {
  en: {
    title: "Terms and Conditions",
    description: "Terms and conditions for booking and travelling with our Bahrain–Saudi Arabia taxi and chauffeur service.",
    lastUpdated: "28 July 2026",
  },
  ar: {
    title: "الشروط والأحكام",
    description: "الشروط والأحكام الخاصة بحجز والسفر مع خدمة التاكسي والشوفير بين البحرين والسعودية.",
    lastUpdated: "28 يوليو 2026",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const path = locale === "ar" ? "/ar/terms-and-conditions" : "/terms-and-conditions";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/terms-and-conditions"),
        "ar-BH": absoluteUrl("/ar/terms-and-conditions"),
        "x-default": absoluteUrl("/terms-and-conditions"),
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];

  if (locale === "ar") {
    return (
      <LegalPageLayout title={copy.title} lastUpdated={copy.lastUpdated} path="/terms-and-conditions" locale="ar">
        <LegalSection heading="1. من يشمله هذا الاتفاق">
          <p>
            تنطبق هذه الشروط على أي شخص يحجز أو يسافر باستخدام خدمات التاكسي والشوفير التابعة لشركة{" "}
            {BUSINESS.brandName} بين البحرين والسعودية، سواء عبر الهاتف أو واتساب أو من خلال هذا
            الموقع. بحجزك رحلة معنا، فإنك توافق على هذه الشروط.
          </p>
        </LegalSection>
        <LegalSection heading="2. الحجوزات والأسعار">
          <p>
            تُؤكَّد الأسعار عبر واتساب أو الهاتف قبل السفر وتكون ثابتة بمجرد الاتفاق عليها، بناءً
            على نقطة الاستلام والوجهة وفئة المركبة وأي تفاصيل تشاركها وقت الحجز. رسوم الجسر ووقت
            الانتظار الاعتيادي عند الحدود مشمولان في كل سعر يُعرض. لا يُطلب دفع مسبق أو عربون
            لتأكيد الحجز ما لم نخبرك بخلاف ذلك لرحلة محددة.
          </p>
          <p>
            إذا اختلفت نقطة الاستلام الفعلية أو الوجهة أو عدد الركاب اختلافًا جوهريًا عمّا حُجز،
            قد نُعدّل السعر وفقًا لذلك ونؤكد أي تغيير معك قبل مواصلة الرحلة.
          </p>
        </LegalSection>
        <LegalSection heading="3. الإلغاء">
          <p>
            راجع{" "}
            <Link href={withSlash("/ar/cancellation-and-refund-policy/")} className="font-medium text-sea underline hover:text-ink">
              سياسة الإلغاء والاسترداد
            </Link>{" "}
            لدينا لمعرفة التفاصيل الكاملة حول تغيير أو إلغاء حجز.
          </p>
        </LegalSection>
        <LegalSection heading="4. مستنداتك والهجرة">
          <p>
            أنت وحدك المسؤول عن حمل جواز سفر ساري (أو بطاقة هوية وطنية مقبولة) وأي تأشيرة أو
            تصريح أو مستند آخر يتطلبه جنسيتك لعبور الحدود في أي اتجاه. نحن لا نعالج التأشيرات، ولا
            نقدّم استشارات هجرة، ولا نضمن قرارات الدخول أو العودة عند أي نقطة تفتيش.
          </p>
          <p>
            إذا رُفض دخولك أو تأخرت أو تعذّر عليك إتمام العبور بسبب مشكلة في المستندات أو الهجرة،
            فهذا لا يُعد إخفاقًا في خدمتنا، وتستمر شروط السعر والإلغاء المعتادة في الانطباق.
          </p>
        </LegalSection>
        <LegalSection heading="5. التأخير والظروف الخارجة عن إرادتنا">
          <p>
            أوقات طوابير الحدود، وظروف المرور، والطقس، وإغلاقات الجسر العرضية، كلها خارجة عن
            سيطرتنا. نُدرج هوامش زمنية معقولة في جداول الاستلام، لكننا غير مسؤولين عن التأخيرات
            الناجمة عن هذه العوامل، بما في ذلك فوات رحلات الطيران أو المواعيد.
          </p>
        </LegalSection>
        <LegalSection heading="6. سلوك الركاب والسلامة">
          <p>
            يجب على الركاب التصرف بأمان وبما يتوافق مع القانون. نحتفظ بالحق في رفض أو إنهاء رحلة
            إذا كان سلوك أحد الركاب يعرّض السائق أو الركاب الآخرين للخطر.
          </p>
        </LegalSection>
        <LegalSection heading="7. المسؤولية">
          <p>
            تقتصر مسؤوليتنا على قيمة الأجرة المدفوعة عن الرحلة المحددة، إلا حيث لا يجوز تحديد
            المسؤولية بموجب القانون المعمول به. نحن غير مسؤولين عن الخسائر غير المباشرة أو التبعية.
          </p>
        </LegalSection>
        <LegalSection heading="8. القانون المعمول به">
          <p>تخضع هذه الشروط لقوانين مملكة البحرين، وأي نزاع يخضع لاختصاص المحاكم البحرينية المختصة.</p>
        </LegalSection>
        <LegalSection heading="9. التواصل">
          <p>
            يمكن إرسال أي استفسار حول هذه الشروط إلى {BUSINESS.email} أو عبر واتساب على{" "}
            {BUSINESS.phoneDisplay}.
          </p>
        </LegalSection>
      </LegalPageLayout>
    );
  }

  return (
    <LegalPageLayout title={copy.title} lastUpdated={copy.lastUpdated} path="/terms-and-conditions" locale="en">
      <LegalSection heading="1. Who These Terms Cover">
        <p>
          These terms apply to anyone who books or travels using {BUSINESS.brandName}&apos;s taxi
          and chauffeur services between Bahrain and Saudi Arabia, whether booked by phone,
          WhatsApp, or through this website. By booking a trip with us, you agree to these terms.
        </p>
      </LegalSection>
      <LegalSection heading="2. Bookings and Fares">
        <p>
          Fares are confirmed on WhatsApp or by phone before travel and are fixed once agreed,
          based on the pickup point, destination, vehicle class, and any details you provide at
          the time of booking. The causeway toll and standard border waiting time are included in
          every quoted fare. No advance payment or deposit is required to confirm a booking unless
          we tell you otherwise for a specific trip.
        </p>
        <p>
          If the actual pickup point, destination, or passenger count differs materially from
          what was booked, we may adjust the fare accordingly and will confirm any change with you
          before the trip proceeds.
        </p>
      </LegalSection>
      <LegalSection heading="3. Cancellations">
        <p>
          See our{" "}
          <Link href={withSlash("/cancellation-and-refund-policy/")} className="font-medium text-sea underline hover:text-ink">
            Cancellation and Refund Policy
          </Link>{" "}
          for full details on changing or cancelling a booking.
        </p>
      </LegalSection>
      <LegalSection heading="4. Your Documents and Immigration">
        <p>
          You are solely responsible for holding a valid passport (or accepted national ID) and
          any visa, permit, or other document required for your nationality to cross the border in
          either direction. We do not process visas, provide immigration advice, or guarantee entry
          or re-entry decisions at any checkpoint.
        </p>
        <p>
          If you are refused entry, delayed, or otherwise unable to complete a crossing due to a
          documentation or immigration issue, this is not a failure of our service, and standard
          fare and cancellation terms continue to apply.
        </p>
      </LegalSection>
      <LegalSection heading="5. Delays and Circumstances Beyond Our Control">
        <p>
          Border queue times, traffic conditions, weather, and occasional causeway closures are
          outside our control. We build reasonable timing buffers into pickup schedules, but we
          are not liable for delays caused by these factors, including missed flights or
          appointments.
        </p>
      </LegalSection>
      <LegalSection heading="6. Passenger Conduct and Safety">
        <p>
          Passengers must behave safely and lawfully. We reserve the right to refuse or end a trip
          if a passenger&apos;s conduct endangers the driver or other passengers.
        </p>
      </LegalSection>
      <LegalSection heading="7. Liability">
        <p>
          Our liability is limited to the fare paid for the specific trip in question, except
          where liability cannot be limited under applicable law. We are not liable for indirect
          or consequential losses.
        </p>
      </LegalSection>
      <LegalSection heading="8. Governing Law">
        <p>
          These terms are governed by the laws of the Kingdom of Bahrain, and any dispute is
          subject to the jurisdiction of the competent courts of Bahrain.
        </p>
      </LegalSection>
      <LegalSection heading="9. Contact">
        <p>
          Questions about these terms can be sent to {BUSINESS.email} or via WhatsApp at{" "}
          {BUSINESS.phoneDisplay}.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
