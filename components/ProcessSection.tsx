"use client";

import { ArrowRight, CalendarCheck, Search, ShieldCheck, Wrench } from "lucide-react";
import { useSite } from "@/components/SiteShell";

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
    desc: "Using factory-certified OEM parts stocked in our vehicles, we repair your appliance, or clean your vents and ducts, cleanly and correctly.",
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: "30-Day Guaranteed Peace",
    desc: "We perform full cycle testing to guarantee performance and protect you with our 30-day comprehensive parts and labor warranty.",
  },
];

export default function ProcessSection() {
  const { openBooking } = useSite();

  return (
    <section id="process" className="bg-surface-alt border-y border-line py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-line-tint text-primary-strong text-xs font-bold uppercase tracking-wider shadow-xs mb-3">
            <CalendarCheck className="w-3.5 h-3.5" aria-hidden="true" />
            Hassle-Free Process
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">How Eco Appliance Services Works</h2>
          <p className="mt-3 text-sm sm:text-lg text-ink-soft">
            From your first call to the final cycle test, we make appliance repair straightforward, transparent, and
            completely stress-free.
          </p>
        </div>

        {/* Connected step timeline */}
        <ol className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          <span
            aria-hidden="true"
            className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-primary to-accent opacity-30"
          />
          {steps.map(({ num, icon: Icon, title, desc }) => (
            <li key={num} className="card-lift group relative flex lg:flex-col items-start lg:items-center gap-4 lg:text-center">
              <span className="relative z-10 w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent text-on-primary ring-4 ring-surface-alt shadow-md shadow-primary/25 flex items-center justify-center">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <div className="lg:px-2">
                <p className="text-xs font-black tracking-wider text-primary-strong">STEP {num}</p>
                <h3 className="text-lg font-black tracking-tight mt-0.5">{title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-ink-soft leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => openBooking()}
            className="btn-cta inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-7 py-3.5 rounded-full font-black text-sm sm:text-base shadow-md shadow-primary/30"
          >
            <span className="relative z-10">Book Your Service Call Now</span>
            <ArrowRight className="relative z-10 w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
