"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  Phone,
  Sparkles,
  ArrowRight,
  Wind,
  Flame,
  Wrench,
  Leaf,
  WashingMachine,
  Refrigerator,
  CookingPot,
  Zap,
  BadgeDollarSign,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface HeroProps {
  onOpenBooking: (appliance?: string) => void;
}

interface ServiceScrollerProps {
  items: { name: string; icon: LucideIcon }[];
}

/** Decorative service pills: wrap on desktop; on phones an auto-scrolling, swipeable row with an arrow hint. */
function ServiceScroller({ items }: ServiceScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let resume: ReturnType<typeof setTimeout> | undefined;
    let pos = el.scrollLeft;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const half = el.scrollWidth / 2;
      if (!pausedRef.current && half > el.clientWidth && window.innerWidth < 640) {
        pos += dt * 0.035;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };

    const pause = () => {
      pausedRef.current = true;
      if (resume) clearTimeout(resume);
    };
    const resumeSoon = () => {
      if (resume) clearTimeout(resume);
      resume = setTimeout(() => {
        pausedRef.current = false;
      }, 2000);
    };

    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resumeSoon, { passive: true });
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resumeSoon);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      if (resume) clearTimeout(resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resumeSoon);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resumeSoon);
    };
  }, []);

  // Duplicate the list so the row can loop seamlessly on phones.
  const loop = [...items, ...items];

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-2 overflow-x-auto sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 pr-12 sm:pr-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loop.map(({ name, icon: Icon }, i) => (
          <span
            key={`${name}-${i}`}
            aria-hidden={i >= items.length ? true : undefined}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white text-slate-700 border border-slate-200 rounded-full shadow-2xs select-none ${
              i >= items.length ? "sm:hidden" : ""
            }`}
          >
            <Icon className="w-4 h-4 text-emerald-600" />
            <span>{name}</span>
          </span>
        ))}
      </div>

      {/* Right-edge fade + arrow hint (phones only) */}
      <div className="sm:hidden pointer-events-none absolute right-0 top-0 bottom-1 w-14 -mr-4 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent flex items-center justify-end pr-4">
        <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md animate-pulse">
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const quickServices: { name: string; icon: LucideIcon }[] = [
    { name: "Dryer Vent Cleaning", icon: Flame },
    { name: "Laundry (Washer)", icon: WashingMachine },
    { name: "Refrigeration", icon: Refrigerator },
    { name: "Cooktop & Dishwasher", icon: CookingPot },
    { name: "House Duct Cleaning", icon: Wind },
  ];

  const highlights: { label: string; icon: LucideIcon }[] = [
    { label: "Same-Day Dispatch", icon: Zap },
    { label: "$89 Diagnostic, Credited to Repair", icon: BadgeDollarSign },
    { label: "Home Warranty Claims Welcome", icon: ShieldCheck },
    { label: "90-Day Parts & Labor Warranty", icon: CheckCircle2 },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-slate-50 to-white pt-24 sm:pt-36 pb-12 lg:pb-24 border-b border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-12 right-0 -z-10 w-[550px] h-[550px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-[450px] h-[450px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
          {/* Left Column: Headline, Proof & CTAs */}
          <div className="stagger lg:col-span-7 order-2 lg:order-1 flex flex-col space-y-4 sm:space-y-6 text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-emerald-200/80 text-emerald-950 text-xs sm:text-sm font-extrabold w-fit shadow-xs backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="sm:hidden">Same-Day Service • DC, MD & VA</span>
              <span className="hidden sm:inline">Same-Day Service • Serving DC, Maryland & Northern Virginia</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[1.75rem] sm:text-5xl lg:text-5.5xl font-black text-slate-950 tracking-tight leading-[1.12]">
              <span className="sm:hidden">HVAC & Appliance Repair Across the{" "}</span>
              <span className="hidden sm:inline">Precision HVAC, Air Duct & Appliance Services Throughout the{" "}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 underline decoration-emerald-400/50 decoration-wavy">
                DMV
              </span>
            </h1>

            {/* Subtitle */}
            <p className="sm:hidden text-[15px] text-slate-600 leading-relaxed">
              Honest diagnosis, upfront pricing, and fast same-day service across Washington DC, Maryland &amp; Northern Virginia.
            </p>
            <p className="hidden sm:block text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              <strong className="text-slate-950 font-bold">Eco Appliance Services</strong> is your trusted specialist for residential HVAC duct cleaning, dryer vent restoration, refrigeration, laundry, and kitchen appliance repairs across{" "}
              <span className="text-slate-900 font-semibold">Washington DC, Maryland, and Northern Virginia</span>. We deliver honest upfront diagnosis, factory-certified parts, and lasting energy-efficient solutions.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {highlights.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-2.5 py-2 sm:px-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-[11px] sm:text-sm font-bold text-slate-800 leading-tight"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={() => onOpenBooking()}
                className="pulse-ring group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm sm:text-base font-black text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Service Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="tel:5714621813"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm sm:text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 hover:border-emerald-500 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <Phone className="w-5 h-5 text-emerald-600" />
                <span>Call (571) 462-1813</span>
              </a>
            </div>

            {/* Services strip (decorative) */}
            <div className="pt-1">
              <ServiceScroller items={quickServices} />
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[16/10] sm:aspect-[4/3.6] lg:aspect-[4/4]">
                <Image
                  src="/hero-technician.jpg"
                  alt="Certified HVAC and appliance repair technician servicing luxury equipment"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="hero-image-in object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/10" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                  <div className="flex items-center justify-between gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10">
                    <div>
                      <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                        <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                        Master Certified Field Pros
                      </p>
                      <p className="text-sm font-bold text-white">HVAC & 5 Core Service Lines</p>
                    </div>
                    <span className="text-[11px] font-bold bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-full shadow">
                      DMV Priority
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge Top Left */}
              <div className="hidden sm:flex animate-float absolute -top-4 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-950">Most Repairs in One Visit</p>
                  <p className="text-[11px] text-slate-500">Fully Stocked Mobile Fleet</p>
                </div>
              </div>

              {/* Floating Warranty Badge Bottom Right */}
              <div className="hidden sm:flex animate-float-delay absolute -bottom-4 -right-3 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-950">90-Day Warranty</p>
                  <p className="text-[11px] font-medium text-slate-500">
                    Parts &amp; Labor Guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
