"use client";

import { CalendarCheck, Search, Wrench, ShieldCheck, ArrowRight } from "lucide-react";

export default function ProcessSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const steps = [
    {
      num: "01",
      icon: CalendarCheck,
      title: "Easy Scheduling",
      desc: "Call our friendly DMV dispatch team or book your appointment online in under 60 seconds with your convenient time window.",
    },
    {
      num: "02",
      icon: Search,
      title: "Honest Diagnosis",
      desc: "Our master technician arrives on schedule, runs pinpoint diagnostic tests, and provides a clear, itemized upfront quote.",
    },
    {
      num: "03",
      icon: Wrench,
      title: "Precision OEM Repair",
      desc: "Using factory-certified OEM parts stocked in our vehicles, we repair your appliance or clean your ducts cleanly and correctly.",
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "90-Day Guaranteed Peace",
      desc: "We perform full cycle testing to guarantee performance and protect you with our 90-day comprehensive parts and labor warranty.",
    },
  ];

  return (
    <section className="py-10 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Hassle-Free Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3">
            How Eco Appliance Services Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            From your first call to the final cycle test, we make HVAC and appliance services straightforward, transparent, and completely stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-emerald-700 tracking-wider">
                      STEP {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-950 hover:bg-emerald-600 text-white font-black rounded-full shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer text-sm"
          >
            <span>Book Your Service Call Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
