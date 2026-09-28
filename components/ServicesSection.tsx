"use client";

import { Wrench } from "lucide-react";
import ServiceCards from "@/components/ServiceCards";

interface ServicesSectionProps {
  onOpenBooking: (appliance?: string) => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  return (
    <section id="services" className="pt-10 pb-8 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider mb-3 border border-emerald-200">
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            Core Service Lines
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            What We Fix & Clean For You
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Quick, reliable service with upfront pricing and our 90-day parts & labor guarantee.
          </p>
        </div>

        <ServiceCards onOpenBooking={onOpenBooking} />

        {/* Brands Ticker Strip: continuously scrolling */}
        <div className="mt-8 py-4 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <p className="px-4 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Brands We Service
          </p>
          <div className="marquee-mask">
            <div className="marquee-track text-slate-500 font-extrabold text-xs sm:text-sm tracking-wider">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1 ? true : undefined}>
                  {["TRANE", "CARRIER", "SUB-ZERO", "SAMSUNG", "LG", "BOSCH", "WHIRLPOOL", "GE MONOGRAM", "LENNOX"].map((brand) => (
                    <span key={brand} className="px-5 sm:px-8 whitespace-nowrap hover:text-emerald-700 transition-colors">
                      {brand}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
