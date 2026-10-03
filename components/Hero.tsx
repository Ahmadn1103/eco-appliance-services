"use client";

import Image from "next/image";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { useSite } from "@/components/SiteShell";

export default function Hero() {
  const { openBooking } = useSite();

  return (
    <section id="home" className="relative overflow-hidden bg-ink text-on-primary">
      {/* The photo sits in its own box below the header so the technician's face is never hidden behind it. */}
      <div className="absolute top-20 bottom-0 right-0 w-full lg:w-[60%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]">
        <Image
          src="/hero-technician.jpg"
          alt="Certified HVAC and appliance repair technician servicing luxury equipment"
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/75 to-ink/60 lg:bg-gradient-to-r lg:from-ink/95 lg:via-ink/80 lg:to-ink/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <p className="text-[10px] sm:text-sm font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-primary-light">
            <span className="sm:hidden">Same-Day Service • DC, MD &amp; VA</span>
            <span className="hidden sm:inline">Same-Day Service • Serving DC, Maryland &amp; Northern Virginia</span>
          </p>

          <h1 className="text-2xl sm:text-[46px] lg:text-[58px] font-black tracking-tight leading-[1.08]">
            Precision HVAC, Air Duct &amp; Appliance Services Throughout the
            <span className="block bg-gradient-to-r from-primary-light via-primary-light to-accent-light bg-clip-text text-transparent">
              DMV
            </span>
          </h1>

          <p className="text-[13px] sm:text-lg max-w-xl leading-relaxed text-white/80">
            <strong className="text-white font-bold">Eco Appliance Services</strong> is your trusted specialist for residential
            HVAC duct cleaning, dryer vent restoration, refrigeration, laundry, and kitchen appliance repairs. We deliver honest
            upfront diagnosis and lasting energy-efficient solutions.
          </p>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn-cta col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-5 py-3 sm:py-2.5 rounded-full font-black text-sm shadow-md shadow-primary/30"
            >
              <Calendar className="relative z-10 w-4 h-4" aria-hidden="true" />
              <span className="relative z-10">Schedule Service Online</span>
              <ArrowRight className="relative z-10 w-4 h-4" aria-hidden="true" />
            </button>
            <a
              href={PHONE_HREF}
              className="pressable col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-2 sm:px-4 py-3 sm:py-2.5 rounded-full font-bold text-sm backdrop-blur-sm whitespace-nowrap"
            >
              <Phone className="pressable-icon w-3.5 h-3.5 text-primary-light" aria-hidden="true" />
              <span>Call {PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
