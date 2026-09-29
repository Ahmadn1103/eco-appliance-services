"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeDollarSign,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Phone,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { coreServices } from "@/lib/services";
import { useSite } from "@/components/SiteShell";
import ZipChecker from "@/components/ZipChecker";

const highlights: { label: string; icon: LucideIcon }[] = [
  { label: "Same-Day Dispatch", icon: Zap },
  { label: "$89 Diagnostic, Credited to Repair", icon: BadgeDollarSign },
  { label: "Home Warranty Claims Welcome", icon: ShieldCheck },
  { label: "90-Day Parts & Labor Warranty", icon: CheckCircle2 },
];

export default function Hero() {
  const { openBooking } = useSite();

  return (
    <section id="home" className="relative overflow-hidden bg-ink text-on-primary">
      <Image
        src="/hero-technician.jpg"
        alt="Certified HVAC and appliance repair technician servicing luxury equipment"
        fill
        priority
        sizes="100vw"
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 grid lg:grid-cols-12 gap-8 items-center">
        {/* Left: headline, proof, CTAs */}
        <div className="lg:col-span-7 space-y-5">
          <p className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-emerald-300">
            <span className="sm:hidden">Same-Day Service • DC, MD &amp; VA</span>
            <span className="hidden sm:inline">Same-Day Service • Serving DC, Maryland &amp; Northern Virginia</span>
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
            Precision HVAC, Air Duct &amp; Appliance Services Throughout the
            <span className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              DMV
            </span>
          </h1>

          <p className="text-sm sm:text-lg max-w-xl leading-relaxed text-white/80">
            <strong className="text-white font-bold">Eco Appliance Services</strong> is your trusted specialist for residential
            HVAC duct cleaning, dryer vent restoration, refrigeration, laundry, and kitchen appliance repairs. We deliver honest
            upfront diagnosis and lasting energy-efficient solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn-cta inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-7 py-3.5 rounded-full font-black text-sm sm:text-base shadow-md shadow-primary/30"
            >
              <Calendar className="relative z-10 w-5 h-5" aria-hidden="true" />
              <span className="relative z-10">Schedule Service Online</span>
              <ArrowRight className="relative z-10 w-4 h-4" aria-hidden="true" />
            </button>
            <a
              href={PHONE_HREF}
              className="pressable inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 px-6 py-3.5 rounded-full font-bold backdrop-blur-sm text-sm sm:text-base"
            >
              <Phone className="pressable-icon w-5 h-5 text-emerald-300" aria-hidden="true" />
              <span>Call {PHONE_DISPLAY}</span>
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-2 sm:gap-2.5 max-w-xl pt-2">
            {highlights.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm text-[11px] sm:text-xs font-bold leading-tight"
              >
                <Icon className="w-4 h-4 text-emerald-300 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: service picker card */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-surface/95 text-ink p-5 sm:p-6 shadow-2xl border border-white/40 backdrop-blur">
            <h2 className="text-base sm:text-lg font-black">Do we serve your area?</h2>
            <p className="text-xs sm:text-sm text-ink-soft mt-1 mb-3.5">
              Enter your ZIP code to check same-day coverage.
            </p>
            <ZipChecker className="mb-4" />
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted mb-2">
              Or pick a service to book online
            </p>
            <ul className="space-y-2">
              {coreServices.map(({ id, title, icon: Icon, badge }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => openBooking(title)}
                    className="pressable group w-full flex items-center gap-3 rounded-2xl bg-surface-alt border border-line hover:border-primary hover:bg-surface-tint/60 px-3 py-2.5 text-left"
                  >
                    <span className="w-9 h-9 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <Icon className="w-4.5 h-4.5" aria-hidden="true" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-bold leading-tight">{title}</span>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted mt-0.5">{badge}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary shrink-0" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3.5 text-center text-[11px] text-muted">
              $89 diagnostic, credited toward your repair.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
