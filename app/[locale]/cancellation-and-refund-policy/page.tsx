import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/url";
import { BUSINESS } from "@/content/business";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import type { Locale } from "@/lib/locale";

// Template legal content. Have this reviewed by a qualified lawyer licensed
// in Bahrain before launch — it is not a substitute for legal advice.

export const dynamic = "force-static";

const COPY: Record<Locale, { title: string; description: string; lastUpdated: string }> = {
  en: {
    title: "Cancellation and Refund Policy",
    description: "Our policy on cancelling, changing, or not showing up for a booked taxi trip between Bahrain and Saudi Arabia.",
    lastUpdated: "28 July 2026",
  },
  ar: {
    title: "سياسة الإلغاء والاسترداد",
    description: "سياستنا بخصوص إلغاء أو تغيير أو عدم الحضور لرحلة محجوزة بين البحرين والسعودية.",
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
  const path = locale === "ar" ? "/ar/cancellation-and-refund-policy" : "/cancellation-and-refund-policy";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/cancellation-and-refund-policy"),
        "ar-BH": absoluteUrl("/ar/cancellation-and-refund-policy"),
        "x-default": absoluteUrl("/cancellation-and-refund-policy"),
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function CancellationPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];

  if (locale === "ar") {
    return (
      <LegalPageLayout title={copy.title} lastUpdated={copy.lastUpdated} path="/cancellation-and-refund-policy" locale="ar">
        <LegalSection heading="لا دفع مسبق، إلغاء بسيط">
          <p>
            بما أننا لا نأخذ دفعًا مسبقًا أو عربونًا لتأكيد معظم الحجوزات، فلا يوجد عادةً ما
            يُسترد — إذا تغيّرت خططك، فقط راسلنا عبر واتساب لإلغاء أو إعادة جدولة الرحلة قبل
            انطلاق السائق، دون أي رسوم.
          </p>
        </LegalSection>
        <LegalSection heading="تغيير حجز">
          <p>
            راسلنا عبر واتساب بأسرع ما يمكن بتاريخك أو وقتك أو نقطة استلامك الجديدة. التغييرات
            الصغيرة التي تُطلب بإشعار معقول عادةً ما تُستوعب دون تكلفة إضافية.
          </p>
        </LegalSection>
        <LegalSection heading="الإلغاء المتأخر وعدم الحضور">
          <p>
            إذا كان السائق قد انطلق بالفعل أو ينتظر عند نقطة الاستلام وألغيت بإشعار قصير جدًا أو
            لم تحضر، فقد نطلب مساهمة معقولة مقابل وقت السائق وأي وقود استُهلك بالفعل. سنخبرك
            دائمًا إذا كان هذا ينطبق قبل تأكيد الإلغاء.
          </p>
        </LegalSection>
        <LegalSection heading="الرحلات المتأثرة بمشاكل الهجرة أو الحدود">
          <p>
            إذا تعذّر إتمام رحلة لأن أحد الركاب رُفض دخوله أو عودته، فهذا أمر خارج عن سيطرتنا. قد
            تظل أجرة الجزء المُنجَز من الرحلة مستحقة، ولسنا مسؤولين عن استرداد تكاليف متعلقة
            بقرار الهجرة نفسه.
          </p>
        </LegalSection>
        <LegalSection heading="الاسترداد حيث دُفع مبلغ مسبق">
          <p>
            لأي حجز اتُّفق فيه تحديدًا على عربون أو دفع مسبق، ستُؤكَّد شروط الاسترداد معك كتابيًا
            وقت ذلك الحجز. حيث لم تُتفق شروط محددة، نقيّم طلبات الاسترداد على أساس معقول وحالة
            بحالة.
          </p>
        </LegalSection>
        <LegalSection heading="تواصل معنا">
          <p>
            لأي سؤال حول الإلغاء أو التغيير أو الاسترداد، راسلنا عبر واتساب أو تواصل معنا على{" "}
            {BUSINESS.email}.
          </p>
        </LegalSection>
      </LegalPageLayout>
    );
  }

  return (
    <LegalPageLayout title={copy.title} lastUpdated={copy.lastUpdated} path="/cancellation-and-refund-policy" locale="en">
      <LegalSection heading="No Advance Payment, Simple Cancellations">
        <p>
          Because we don&apos;t take advance payment or a deposit to confirm most bookings,
          there&apos;s nothing to refund in the ordinary case — if your plans change, you simply
          message us on WhatsApp to cancel or reschedule before the driver is dispatched, and no
          charge applies.
        </p>
      </LegalSection>
      <LegalSection heading="Changing a Booking">
        <p>
          Message us on WhatsApp as early as possible with your new date, time, or pickup point.
          Small changes made with reasonable notice are usually accommodated at no extra cost.
        </p>
      </LegalSection>
      <LegalSection heading="Late Cancellations and No-Shows">
        <p>
          If a driver has already been dispatched or is waiting at the agreed pickup point and you
          cancel with very little notice or do not show up, we may ask for a reasonable
          contribution toward the driver&apos;s time and any fuel already used. We will always
          tell you if this applies before confirming the cancellation.
        </p>
      </LegalSection>
      <LegalSection heading="Trips Affected by Immigration or Border Issues">
        <p>
          If a trip cannot be completed because a passenger is refused entry or re-entry, this is
          outside our control. The fare for the completed portion of the trip may still apply, and
          we are not responsible for refunding costs relating to the immigration decision itself.
        </p>
      </LegalSection>
      <LegalSection heading="Refunds Where Payment Was Taken in Advance">
        <p>
          For any booking where a deposit was specifically agreed, refund terms will be confirmed
          with you in writing at the time of that booking. Where no specific terms were agreed, we
          assess refund requests on a reasonable, case-by-case basis.
        </p>
      </LegalSection>
      <LegalSection heading="Contact Us">
        <p>
          For any cancellation, change, or refund question, message us on WhatsApp or contact us
          at {BUSINESS.email}.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
