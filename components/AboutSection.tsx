"use client";

import Image from "next/image";
import { ArrowRight, BadgeDollarSign, Calendar, ClipboardCheck, Clock, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { useSite } from "@/components/SiteShell";

const features = [
  {
    icon: Clock,
    tag: "Same-Day Dispatch",
    title: "Dependable Service",
    desc: "We show up when we say we will, treat your home with respect, and keep you updated from booking to repair.",
  },
  {
    icon: ClipboardCheck,
    tag: "No Hard Sell",
    title: "Honest Diagnosis",
    desc: "We explain exactly what is wrong and tell you honestly whether repair or replacement makes the most sense.",
  },
  {
    icon: BadgeDollarSign,
    tag: "$89 Credited With Repair",
    title: "Fair & Transparent Pricing",
    desc: "The $89 diagnostic fee is credited 100% toward an approved repair, and you get a clear quote before any work begins.",
  },
  {
    icon: Wrench,
    tag: "30-Day Warranty",
    title: "Quality Workmanship",
    desc: "Every repair is backed by our 30-day parts and labor warranty, so you can count on the fix to last.",
  },
];

const stats = [
  { value: "$89", label: "Diagnostic Fee", sub: "100% Credited With Repair" },
  { value: "30-Day", label: "Parts & Labor Warranty", sub: "Guaranteed Workmanship" },
  { value: "Same-Day", label: "Dispatch Available", sub: "Across the DMV" },
  { value: "VA · DC · MD", label: "Service Area", sub: "Within 40 Miles" },
];

export default function AboutSection() {
  const { openBooking } = useSite();

  return (
    <section id="about" className="bg-surface-alt border-b border-line py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header stack */}
        <div className="pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-line">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-line-tint text-primary-strong text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Who We Are
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Eco Appliance Services
            </span>
          </h2>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-2xl sm:text-3xl text-primary-strong" style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}>
              Honest repairs. Upfront pricing.
            </p>
            <span className="px-3 py-1 rounded-full bg-surface border border-line text-xs font-bold uppercase tracking-wider">
              Diagnose <span aria-hidden="true">•</span> Repair <span aria-hidden="true">•</span> Maintain
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Story + feature cards */}
          <div className="lg:col-span-7 space-y-5">
            <p className="text-sm sm:text-lg text-ink-soft leading-relaxed">
              <strong className="text-ink font-bold">Eco Appliance Services</strong> is a local appliance repair service
              for homes in Virginia, Washington, DC, and Maryland. Our promise is simple: we explain the problem clearly,
              tell you the truth about what it needs, and fix it right. No pushy sales and no surprise charges.
            </p>
            <p className="text-sm sm:text-lg text-ink-soft leading-relaxed">
              We repair refrigerators, washers, dryers, ovens, dishwashers and more appliances. We clean dryer vents and air ducts. Our
              technicians arrive ready to find the problem and fix it fast, usually in a single visit.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
              {features.map(({ icon: Icon, tag, title, desc }) => (
                <div key={title} className="rounded-2xl bg-surface border border-line p-4 shadow-xs flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-line-tint text-[10px] font-bold uppercase tracking-wider text-primary-strong text-right leading-tight">
                      {tag}
                    </span>
                  </div>
                  <h3 className="text-base font-black tracking-tight">{title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Framed photo */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-surface border border-line p-3 shadow-lg">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/tech-new.jpg"
                  alt="Eco Appliance Services technician repairing a dryer"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[50%_center]"
                />
                <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl bg-surface/95 backdrop-blur p-3.5 shadow-lg">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-black leading-tight">Accurate Diagnosis &amp; Repair</p>
                    <p className="text-xs text-ink-soft leading-snug">Serving Virginia, DC &amp; Maryland</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-line grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {stats.map(({ value, label, sub }) => (
            <div key={label} className="p-3 rounded-2xl bg-surface border border-line text-center">
              <p className="text-xl sm:text-2xl font-black text-primary whitespace-nowrap">{value}</p>
              <p className="text-xs font-bold mt-0.5">{label}</p>
              <p className="text-[11px] text-muted">{sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => openBooking()}
            className="btn-cta w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary font-extrabold text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 rounded-full shadow-md shadow-primary/25 active:scale-95"
          >
            <Calendar className="relative z-10 w-4 h-4" aria-hidden="true" />
            <span className="relative z-10">Schedule Service Online</span>
            <ArrowRight className="relative z-10 w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
