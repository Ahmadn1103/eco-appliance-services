"use client";

import { Award, BadgeDollarSign, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

const pillars = [
  {
    title: "Skilled, Dependable Technicians",
    desc: "Our technicians are trained to diagnose and repair refrigerators, washers, dryers, ovens, ranges, dishwashers, and more, and to get it right the first time.",
  },
  {
    title: "Honest Diagnosis & Integrity",
    desc: "No aggressive sales tactics or unneeded part swaps. We inspect thoroughly and advise you honestly whether repair or replacement makes the best financial sense.",
  },
  {
    title: "Home Warranty Claims Welcome",
    desc: "We work with major home warranty providers, including American Home Shield, Choice, and First American, so your claim is handled smoothly.",
  },
  {
    title: "Upfront & Transparent Pricing",
    desc: "You will always receive a clear, itemized quote before any work starts. If you proceed with our repair, our initial diagnostic fee is applied 100% directly toward your service!",
  },
  {
    title: "Stocked Mobile Warehouses",
    desc: "Our service vehicles carry high-failure OEM parts, high-grade diagnostic tools, and testing meters, allowing us to complete most repairs in a single visit.",
  },
  {
    title: "30-Day Parts & Labor Guarantee",
    desc: "We stand behind the quality of our work. Every repair is backed by a 30-day comprehensive parts and labor warranty for complete peace of mind.",
  },
];

const metrics = [
  { icon: BadgeDollarSign, label: "Diagnostic, Credited", value: "$89", note: "Applied 100% to your approved repair" },
  { icon: ShieldCheck, label: "Parts & Labor", value: "30-Day", note: "Comprehensive warranty on every repair" },
  { icon: Clock, label: "Dispatch", value: "Same-Day", note: "Priority slots across DC, MD & VA" },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-line-tint text-primary-strong text-xs font-bold uppercase tracking-wider shadow-xs mb-3">
            <Award className="w-3.5 h-3.5" aria-hidden="true" />
            The Eco Appliance Standard
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-primary-strong mb-3">
            Honest Service. Upfront Pricing. Work You Can Trust.
          </h2>
          <p className="text-sm sm:text-base text-ink-soft mb-5 max-w-2xl">
            When a refrigerator warms up, a dryer stops heating, or a washer fails mid-cycle, you don’t need guesswork. You need a
            professional who knows these systems inside and out.
          </p>
          <ul className="space-y-3">
            {pillars.map((p) => (
              <li key={p.title} className="flex items-start gap-3 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="font-bold text-ink">{p.title}.</strong>{" "}
                  <span className="text-ink-soft text-sm">{p.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-5 rounded-3xl bg-surface-tint/70 border border-line-tint p-6 space-y-5">
          <blockquote className="text-sm italic text-ink-soft leading-relaxed">
            “Our goal is simple: provide honest diagnosis, quality workmanship, dependable service, and solutions our customers can
            trust every single day.”
          </blockquote>
          {metrics.map(({ icon: Icon, label, value, note }) => (
            <div key={label} className="border-t border-line-tint pt-5 flex items-start gap-4">
              <Icon className="w-9 h-9 text-primary-strong shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">{label}</p>
                <p className="text-2xl font-black leading-tight">{value}</p>
                <p className="text-xs text-ink-soft mt-0.5">{note}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-line-tint pt-5 text-sm">
            Questions before you book?{" "}
            <a href={PHONE_HREF} className="font-bold whitespace-nowrap underline underline-offset-2 hover:text-primary">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
