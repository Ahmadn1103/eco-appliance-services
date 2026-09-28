"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import WhyUs from "@/components/WhyUs";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { faqs } from "@/lib/faqs";
import { Phone, Calendar, ArrowRight, ShieldCheck, Sparkles, Wind } from "lucide-react";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedAppliance, setPreselectedAppliance] = useState("");

  const handleOpenBooking = (appliance?: string) => {
    if (appliance) {
      setPreselectedAppliance(appliance);
    } else {
      setPreselectedAppliance("");
    }
    setBookingOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative">
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
      {/* Floating Glass Pill Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Section */}
      <Hero onOpenBooking={(app) => handleOpenBooking(app)} />


      {/* Contract Core Service Lines Section */}
      <Reveal><ServicesSection onOpenBooking={(app) => handleOpenBooking(app)} /></Reveal>


      {/* Why Choose Eco Appliance Services */}
      <Reveal><WhyUs /></Reveal>


      {/* 4-Step Transparent Repair Process */}
      <Reveal><ProcessSection onOpenBooking={() => handleOpenBooking()} /></Reveal>


      {/* Frequently Asked Questions */}
      <Reveal><FAQSection onOpenBooking={() => handleOpenBooking()} /></Reveal>

      {/* High-Impact Classy Conversion Call-to-Action Banner */}
      <Reveal>
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Same-Day Dispatch Across the DMV
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            HVAC & Appliance Repairs? Leave It To Us.
          </h2>

          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg">
            Eco Appliance Services: honest diagnosis, upfront pricing, and lasting craftsmanship across Washington DC, Maryland & Northern Virginia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button
              onClick={() => handleOpenBooking()}
              className="pulse-ring w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base rounded-full shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule Service Online</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <a
              href="tel:5714621813"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-full border border-white/20 backdrop-blur-md transition-all"
            >
              <Phone className="w-5 h-5 text-emerald-400" />
              <span>Call Dispatch: (571) 462-1813</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              90-Day Parts & Labor Warranty
            </span>
            <span>•</span>
            <span>Home Warranty Claims Welcome</span>
          </div>
        </div>
      </section>
      </Reveal>

      {/* Classy Footer */}
      <Footer onOpenBooking={(app) => handleOpenBooking(app)} />


      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialAppliance={preselectedAppliance}
      />
    </main>
  );
}
