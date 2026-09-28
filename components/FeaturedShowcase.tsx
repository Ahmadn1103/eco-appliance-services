"use client";

import Image from "next/image";
import {
  Wind,
  ShieldCheck,
  Flame,
  Sparkles,
  Zap,
  CheckCircle2,
  Calendar,
  Phone,
  ArrowRight,
  TrendingDown,
  Activity,
} from "lucide-react";

interface FeaturedShowcaseProps {
  onOpenBooking?: (serviceName?: string) => void;
}

export default function FeaturedShowcase({ onOpenBooking }: FeaturedShowcaseProps) {
  const handleBooking = () => {
    if (onOpenBooking) {
      onOpenBooking("Dryer Vent & House Duct Cleaning Suite");
    } else {
      window.location.href = "/contact#schedule";
    }
  };

  const benefits = [
    {
      title: "Eliminates #1 Cause of Home Dryer Fires",
      desc: "Removes hazardous lint buildup in hidden wall cavities and exterior vents, ensuring safe exhaust.",
    },
    {
      title: "Cuts Monthly HVAC & Energy Bills up to 25%",
      desc: "Unrestricted duct airflow enables your air handler, furnace, and dryer to operate with maximum thermal efficiency.",
    },
    {
      title: "Medical-Grade HEPA Negative Air Vacuuming",
      desc: "Extracts micro-dust, pet dander, mold spores, and airborne allergens from every supply and return register.",
    },
    {
      title: "EPA-Registered Botanical Sanitizing Fog",
      desc: "Neutralizes lingering odors and bacterial growth inside ductwork using eco-safe, non-toxic formulations.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Featured Service Showcase
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Whole-House Air Duct Sanitization & Dryer Vent Fire-Safety System
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            As an HVAC & appliance specialist, Eco Appliance Services combines deep duct vacuuming with precision dryer exhaust clearance to keep your DMV home safe, fresh, and energy-efficient.
          </p>
        </div>

        {/* 2-Column Showcase Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Metrics & Visual Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-800/60 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
              {/* Top Banner on Card */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Wind className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">
                      Eco Air Quality & Safety Duo
                    </h3>
                    <p className="text-xs text-slate-400">
                      Residential HVAC & Appliance Protection
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-mono uppercase">
                  DMV Special
                </span>
              </div>

              {/* Live Metric Stats */}
              <div className="grid grid-cols-2 gap-4 py-6 border-b border-slate-700/60">
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                    <TrendingDown className="w-4 h-4" />
                    Fire Risk
                  </div>
                  <p className="text-3xl font-black text-white mt-1">98%</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Lint accumulation safely cleared
                  </p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase">
                    <Activity className="w-4 h-4" />
                    Air Purity
                  </div>
                  <p className="text-3xl font-black text-white mt-1">99.7%</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Dander & dust mite reduction
                  </p>
                </div>
              </div>

              {/* What Is Included */}
              <div className="pt-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Full Service Protocol Includes:
                </p>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Complete rotary brush scrubbing of all duct trunks</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dryer transition tube inspection & bird-nest guard check</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Digital airflow CFM velocity measurement before & after</span>
                  </div>
                </div>
              </div>

              {/* Callout Footer */}
              <div className="mt-6 pt-5 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400">Available across</span>
                  <p className="text-sm font-bold text-white">DC, Maryland & Northern Virginia</p>
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  Schedule Showcase Package
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Key Benefits & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {b.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={handleBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/25"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Duct & Vent Cleaning</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href="tel:5714621813"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700 text-white font-bold rounded-xl text-sm border border-slate-700 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call (571) 462-1813</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
