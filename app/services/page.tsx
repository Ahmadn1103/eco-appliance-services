"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedShowcase from "@/components/FeaturedShowcase";
import DiagnosticPlugin from "@/components/DiagnosticPlugin";
import ServiceCards from "@/components/ServiceCards";
import BookingModal from "@/components/BookingModal";
import {
  Wrench,
  CheckCircle2,
  Calendar,
  Phone,
  Flame,
  Wind,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

export default function ServicesPage() {
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
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Floating Glass Pill Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Services Hero Section - Clean & To The Point */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white pt-24 sm:pt-36 pb-6 sm:pb-16 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            Simple, Fast & Reliable
          </div>

          <h1 className="text-2xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Our Core Services, Explained Simply
          </h1>

          <p className="hidden sm:block max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            No confusing technical jargon. Here is exactly what we fix, how quickly we get it done, and how it protects your home.
          </p>

          <div className="pt-1 sm:pt-2 flex flex-wrap justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-slate-700">
            <span className="bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-200 shadow-2xs">
              ✓ 100% Diagnostic Credit on Repair
            </span>
            <span className="bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-200 shadow-2xs">
              ✓ 90-Day Parts & Labor Warranty
            </span>
            <span className="bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-200 shadow-2xs">
              ✓ Same-Day Dispatch Across DMV
            </span>
          </div>
        </div>
      </section>

      {/* 5 Core Services (shared with the home page) */}
      <section className="py-8 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceCards onOpenBooking={(svc) => handleOpenBooking(svc)} />
        </div>
      </section>

      {/* Featured Service Showcase Section (Contract Deliverable) */}
      <FeaturedShowcase onOpenBooking={(svc) => handleOpenBooking(svc)} />

      {/* Interactive Plugin / Estimator Section */}
      <DiagnosticPlugin onOpenBooking={(svc) => handleOpenBooking(svc)} />

      {/* Footer */}
      <Footer onOpenBooking={(app) => handleOpenBooking(app)} />


      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialAppliance={preselectedAppliance}
      />
    </main>
  );
}
