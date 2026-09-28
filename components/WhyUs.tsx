"use client";

import {
  Award,
  ShieldCheck,
  Wrench,
  Clock,
  Sparkles,
  CheckCircle2,
  HeartHandshake,
  DollarSign,
  Truck,
  Wind,
} from "lucide-react";

export default function WhyUs() {
  const pillars = [
    {
      icon: Award,
      title: "Skilled, Dependable Technicians",
      desc: "Our technicians are trained to diagnose and repair HVAC, air duct, refrigeration, laundry, and kitchen appliance failures, and to get it right the first time.",
    },
    {
      icon: HeartHandshake,
      title: "Honest Diagnosis & Integrity",
      desc: "No aggressive sales tactics or unneeded part swaps. We inspect thoroughly and advise you honestly whether repair or replacement makes the best financial sense.",
    },
    {
      icon: ShieldCheck,
      title: "Home Warranty Claims Welcome",
      desc: "We work with major home warranty providers, including American Home Shield, Choice, and First American, so your claim is handled smoothly.",
    },
    {
      icon: DollarSign,
      title: "Upfront & Transparent Pricing",
      desc: "You will always receive a clear, itemized quote before any work starts. If you proceed with our repair, our initial diagnostic fee is applied 100% directly toward your service!",
    },
    {
      icon: Truck,
      title: "Stocked Mobile Warehouses",
      desc: "Our service vehicles carry high-failure OEM parts, high-grade diagnostic tools, and testing meters, allowing us to complete most repairs in a single visit.",
    },
    {
      icon: Sparkles,
      title: "90-Day Parts & Labor Guarantee",
      desc: "We stand behind the quality of our work. Every repair is backed by a 90-day comprehensive parts and labor warranty for complete peace of mind.",
    },
  ];

  return (
    <section id="why-us" className="pt-8 pb-10 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story & Values */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              The Eco Appliance Standard
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Honest Service. Upfront Pricing. <span className="text-emerald-700">Work You Can Trust.</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              When a refrigerator warms up, air ducts spread dust, or a washer fails mid-cycle, you don’t need guesswork. You need a professional who knows these systems inside and out.
            </p>

            <blockquote className="p-4 border-l-4 border-emerald-600 bg-white rounded-r-2xl shadow-2xs text-sm italic text-slate-700">
              “Our goal is simple: provide honest diagnosis, quality workmanship, dependable service, and solutions our customers can trust every single day.”
            </blockquote>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
              {[
                { value: "$89", label: "Diagnostic, Credited", color: "text-emerald-700" },
                { value: "90-Day", label: "Parts & Labor", color: "text-slate-900" },
                { value: "Same-Day", label: "Dispatch", color: "text-amber-500" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-white px-2 py-3.5 rounded-2xl border border-slate-200 text-center shadow-2xs flex flex-col items-center justify-center"
                >
                  <p className={`text-lg sm:text-2xl font-black leading-none whitespace-nowrap ${m.color}`}>
                    {m.value}
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-1.5 leading-tight">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 6 Value Pillar Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {pillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-3.5 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
