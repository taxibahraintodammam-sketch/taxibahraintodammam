import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/url";
import { BUSINESS } from "@/content/business";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import type { Locale } from "@/lib/locale";

// Template legal content. Have this reviewed by a qualified lawyer licensed
// in Bahrain (and against Saudi data protection rules, given cross-border
// operations) before launch — it is not a substitute for legal advice.

export const dynamic = "force-static";

const COPY: Record<Locale, { title: string; description: string; lastUpdated: string }> = {
  en: {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information when you book or travel with our Bahrain–Saudi Arabia taxi service.",
    lastUpdated: "28 July 2026",
  },
  ar: {
    title: "سياسة الخصوصية",
    description: "كيف نجمع ونستخدم ونحمي معلوماتك الشخصية عند حجزك أو سفرك مع خدمة التاكسي بين البحرين والسعودية.",
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
  const path = locale === "ar" ? "/ar/privacy-policy" : "/privacy-policy";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/privacy-policy"),
        "ar-BH": absoluteUrl("/ar/privacy-policy"),
        "x-default": absoluteUrl("/privacy-policy"),
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];

  if (locale === "ar") {
    return (
      <LegalPageLayout title={copy.title} lastUpdated={copy.lastUpdated} path="/privacy-policy" locale="ar">
        <LegalSection heading="1. ما الذي نجمعه">
          <p>
            عند حجز رحلة، نجمع المعلومات التي تشاركها معنا مباشرة: اسمك، ورقم هاتفك، وعناوين
            الاستلام والتوصيل، وتاريخ ووقت السفر، وعدد الركاب، وأي تفاصيل أخرى تشاركها عبر واتساب
            أو الهاتف أو من خلال هذا الموقع.
          </p>
          <p>
            عند تصفحك هذا الموقع، قد نجمع أيضًا بيانات تحليلية قياسية مثل الصفحات التي زرتها
            ومعلومات عامة عن جهازك، تُستخدم لفهم كيفية استخدام الموقع وتحسينه.
          </p>
        </LegalSection>
        <LegalSection heading="2. كيف نستخدمها">
          <p>
            نستخدم معلوماتك لتأكيد حجزك وتنفيذه، والتواصل معك بشأن رحلتك، والرد على استفساراتك.
            لا نبيع معلوماتك الشخصية لأطراف ثالثة، ولا نستخدم تفاصيل حجزك للتسويق دون موافقتك.
          </p>
        </LegalSection>
        <LegalSection heading="3. مع من نشاركها">
          <p>
            تُشارَك تفاصيل حجزك مع السائق المخصص لرحلتك. قد نستخدم مزودي خدمات خارجيين لاستضافة
            الموقع والتحليلات، يعالجون البيانات نيابة عنا وفق شروط الخصوصية الخاصة بهم.
          </p>
          <p>
            لا نشارك معلوماتك الشخصية مع جهات الهجرة أو الحكومية إلا حيث يقتضي القانون ذلك.
          </p>
        </LegalSection>
        <LegalSection heading="4. الاحتفاظ بالبيانات">
          <p>
            نحتفظ بمعلومات الحجز للمدة اللازمة بشكل معقول لتقديم خدماتنا وحل أي نزاعات، وبعدها
            تُحذف أو تُجهّل.
          </p>
        </LegalSection>
        <LegalSection heading="5. حقوقك">
          <p>
            يمكنك أن تسألنا عن المعلومات الشخصية التي نحتفظ بها عنك، أو تطلب تصحيحها أو حذفها،
            من خلال التواصل معنا عبر التفاصيل أدناه.
          </p>
        </LegalSection>
        <LegalSection heading="6. ملفات تعريف الارتباط والتحليلات">
          <p>
            قد يستخدم هذا الموقع ملفات تعريف ارتباط لوظائف الموقع الأساسية والتحليلات، وفق
            موافقتك حيث يقتضي الأمر ذلك.
          </p>
        </LegalSection>
        <LegalSection heading="7. تواصل معنا">
          <p>
            لأي سؤال أو طلب متعلق بالخصوصية، تواصل معنا على {BUSINESS.email} أو عبر واتساب على{" "}
            {BUSINESS.phoneDisplay}.
          </p>
        </LegalSection>
      </LegalPageLayout>
    );
  }

  return (
    <LegalPageLayout title={copy.title} lastUpdated={copy.lastUpdated} path="/privacy-policy" locale="en">
      <LegalSection heading="1. What We Collect">
        <p>
          When you book a trip, we collect the information you give us directly: your name,
          phone number, pickup and drop-off addresses, travel date and time, passenger count, and
          any other details you share with us on WhatsApp, by phone, or through this website.
        </p>
        <p>
          When you browse this website, we may also collect standard analytics data such as pages
          visited and general device information, used to understand how the site is used and to
          improve it.
        </p>
      </LegalSection>
      <LegalSection heading="2. How We Use It">
        <p>
          We use your information to confirm and deliver your booking, communicate with you about
          your trip, and respond to enquiries. We do not sell your personal information to third
          parties, and we do not use your booking details for marketing without your consent.
        </p>
      </LegalSection>
      <LegalSection heading="3. Who We Share It With">
        <p>
          Your booking details are shared with the driver assigned to your trip. We may use
          third-party service providers for website hosting and analytics, who process data on
          our behalf under their own privacy terms.
        </p>
        <p>
          We do not share your personal information with immigration or government authorities
          except where required by law.
        </p>
      </LegalSection>
      <LegalSection heading="4. Data Retention">
        <p>
          We retain booking information for as long as reasonably necessary to deliver our
          services and resolve any disputes, after which it is deleted or anonymised.
        </p>
      </LegalSection>
      <LegalSection heading="5. Your Rights">
        <p>
          You can ask us what personal information we hold about you, request a correction, or
          ask us to delete information we no longer need, by contacting us using the details
          below.
        </p>
      </LegalSection>
      <LegalSection heading="6. Cookies and Analytics">
        <p>
          This website may use cookies or similar technologies for essential site functionality
          and analytics, subject to your consent where required.
        </p>
      </LegalSection>
      <LegalSection heading="7. Contact Us">
        <p>
          For any privacy-related question or request, contact us at {BUSINESS.email} or via
          WhatsApp at {BUSINESS.phoneDisplay}.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
