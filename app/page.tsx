import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import WhyUs from "@/components/WhyUs";
import ProcessSection from "@/components/ProcessSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import BrandsStrip from "@/components/BrandsStrip";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import CtaBar from "@/components/CtaBar";
import { faqs } from "@/lib/faqs";
import { services } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Eco Appliance Services offerings",
            itemListElement: services
              .filter((s) => !s.isWarranty)
              .map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Service",
                  name: s.title,
                  description: s.quickSummary,
                  provider: { "@id": `${SITE_URL}/#business` },
                  areaServed: ["Washington, DC", "Maryland", "Northern Virginia"],
                },
              })),
          }),
        }}
      />
      <SiteShell>
        <Hero />
        <ServicesSection />
        <AboutSection />
        <WhyUs />
        <ProcessSection />
        <ServiceAreaSection />
        <BrandsStrip />
        <FAQSection />
        <ContactSection />
        <CtaBar />
      </SiteShell>
    </>
  );
}
