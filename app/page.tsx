import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import WhyUs from "@/components/WhyUs";
import ProcessSection from "@/components/ProcessSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import CtaBar from "@/components/CtaBar";
import { faqs } from "@/lib/faqs";

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
      <SiteShell>
        <Hero />
        <ServicesSection />
        <WhyUs />
        <ProcessSection />
        <ServiceAreaSection />
        <FAQSection />
        <ContactSection />
        <CtaBar />
      </SiteShell>
    </>
  );
}
