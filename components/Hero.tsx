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
          src="/hero.jpg"
          alt="Certified appliance repair technician servicing luxury equipment"
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/90 lg:bg-gradient-to-r lg:from-ink/95 lg:via-ink/80 lg:to-ink/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6 min-h-[34rem] flex flex-col justify-end sm:min-h-0 sm:block sm:pt-32 sm:pb-10 lg:pt-32 lg:pb-8 lg:grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-2 sm:space-y-4 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] sm:[text-shadow:none]">
          <p className="w-fit rounded-full bg-ink/80 px-3 py-1 text-[11px] font-extrabold tracking-[0.12em] uppercase text-white shadow-md backdrop-blur-sm [text-shadow:none] sm:bg-transparent sm:p-0 sm:text-sm sm:font-bold sm:tracking-[0.18em] sm:text-primary-light sm:shadow-none sm:backdrop-blur-none">
            <span>Fast • Reliable • Professional</span>
          </p>

          <h1 className="text-xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black tracking-tight leading-[1.1]">
            Your Trusted Appliance Repair Team Across the
            <span className="ml-1.5 sm:ml-0 inline sm:block bg-gradient-to-r from-primary-light via-primary-light to-accent-light bg-clip-text text-transparent">
              DMV
            </span>
          </h1>

          <p className="sm:hidden text-xs leading-snug text-white/85">
            Duct cleaning, dryer vent &amp; appliance repair across DC, MD &amp; VA. Honest upfront pricing.
          </p>
          <p className="hidden sm:block text-base max-w-2xl leading-relaxed text-white/80">
            <strong className="text-white font-bold">Eco Appliance Services</strong> is your trusted specialist for residential
            duct cleaning, dryer vent restoration, refrigeration, laundry, and kitchen appliance repairs. We deliver honest
            upfront diagnosis and lasting energy-efficient solutions.
          </p>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 pt-0.5">
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn-cta col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-5 py-2.5 rounded-full font-black text-[13px] sm:text-sm shadow-md shadow-primary/30"
            >
              <Calendar className="relative z-10 w-4 h-4" aria-hidden="true" />
              <span className="relative z-10">Schedule Service Online</span>
              <ArrowRight className="relative z-10 w-4 h-4" aria-hidden="true" />
            </button>
            <a
              href={PHONE_HREF}
              className="pressable col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-2 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm backdrop-blur-sm whitespace-nowrap"
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
