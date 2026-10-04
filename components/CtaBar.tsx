"use client";

import { Calendar, MapPin, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { useSite } from "@/components/SiteShell";

export default function CtaBar() {
  const { openBooking } = useSite();

  return (
    <section className="bg-ink text-on-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-white/15">
        <a href={PHONE_HREF} className="pressable flex items-center gap-3 lg:pr-6">
          <span className="w-11 h-11 shrink-0 rounded-full bg-primary flex items-center justify-center">
            <Phone className="w-5 h-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-xs text-white/70">Call Dispatch</span>
            <span className="block text-xl font-black">{PHONE_DISPLAY}</span>
          </span>
        </a>

        <button type="button" onClick={() => openBooking()} className="pressable flex items-center gap-3 lg:px-6 text-left">
          <span className="w-11 h-11 shrink-0 rounded-full bg-primary flex items-center justify-center">
            <Calendar className="w-5 h-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-xs text-white/70">Same-Day Dispatch</span>
            <span className="block text-base font-black">Schedule Service Online</span>
          </span>
        </button>

        <a href="#service-area" className="pressable flex items-center gap-3 lg:px-6">
          <span className="w-11 h-11 shrink-0 rounded-full bg-primary flex items-center justify-center">
            <MapPin className="w-5 h-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-xs text-white/70">Service Area</span>
            <span className="block text-base font-black">Northern VA, DC &amp; MD</span>
          </span>
        </a>

        <div className="lg:pl-6 flex items-center">
          <button
            type="button"
            onClick={() => openBooking()}
            className="btn-cta w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-6 py-3 rounded-full font-black text-sm"
          >
            <span className="relative z-10">Book Your Repair</span>
          </button>
        </div>
      </div>
    </section>
  );
}
