"use client";

import { CheckCircle2, Calendar, Phone, ShieldCheck, ArrowRight, Zap } from "lucide-react";

interface ServiceCardsProps {
  onOpenBooking: (appliance?: string) => void;
}

// 5 core service lines, shared by the home page and the Services page.
export const coreServices = [
  {
    id: "dryer-vent",
    title: "Dryer Vent Cleaning",
    icon: "🔥",
    badge: "FIRE SAFETY",
    quickSummary:
      "We remove dangerous lint buildup from inside your wall ducts out to the roof. Your clothes dry in a single cycle, your power bill drops, and your home stays safe from dryer fires.",
    keyFixes: [
      "Cuts drying time down to 1 quick cycle",
      "Eliminates #1 cause of home appliance fires",
      "Clears deep lint from wall & roof vents",
    ],
    turnaround: "Full Rotary Clean in 45 mins",
  },
  {
    id: "laundry",
    title: "Laundry (Washer) Repair",
    icon: "🧺",
    badge: "SAME-DAY WASHER",
    quickSummary:
      "We fix washers that won't spin, won't drain, or leak water onto your floor. Fast repairs with factory OEM parts so your laundry routine gets right back on track.",
    keyFixes: [
      "Drain pump & standing water clogs",
      "Violent shaking & unbalanced spin cycles",
      "Door latch locks & digital error codes",
    ],
    turnaround: "Same-Day Dispatch • 45–90 min fix",
  },
  {
    id: "refrigeration",
    title: "Refrigeration Repair",
    icon: "❄️",
    badge: "PRIORITY COOLING",
    quickSummary:
      "When your fridge stops cooling or the freezer freezes over, we arrive fast to protect your groceries. Certified service on all luxury and standard refrigerator brands.",
    keyFixes: [
      "Warm fridge / freezing back wall",
      "Noisy compressor & defrost board faults",
      "Ice maker jams & water leaks",
    ],
    turnaround: "Priority 2–4 Hr Emergency Response",
  },
  {
    id: "cooktop-dishwasher",
    title: "Cooktop / Dishwasher Repair",
    icon: "🍽️",
    badge: "KITCHEN PROS",
    quickSummary:
      "We repair clicking gas igniters, cold burners, and dishwashers leaving dirty standing water. Safe gas-tight connections and spotless clean dishes guaranteed.",
    keyFixes: [
      "Clicking or non-igniting gas burners",
      "Dishwasher drainage & water leaks",
      "Dishes coming out cloudy or greasy",
    ],
    turnaround: "Same-Day Dispatch • 60 min fix",
  },
  {
    id: "house-duct",
    title: "House Duct Cleaning",
    icon: "💨",
    badge: "HVAC AIR QUALITY",
    quickSummary:
      "We vacuum dust, pet dander, and allergens out of your whole HVAC duct system using medical-grade HEPA negative air machines. Fresh, odor-free air in every room.",
    keyFixes: [
      "Removes trapped dust, pollen & pet dander",
      "Improves HVAC airflow & reduces energy bills",
      "Sanitizes supply & return air vents",
    ],
    turnaround: "Whole-Home Clean in 2–3 hrs",
  },
];

export default function ServiceCards({ onOpenBooking }: ServiceCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {coreServices.map((service) => (
        <div
          key={service.id}
          className="bg-slate-50 hover:bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
        >
          <div className="space-y-3 sm:space-y-4">
            {/* Icon & Badge Header */}
            <div className="flex items-center justify-between">
              <span className="text-2xl sm:text-3xl p-2.5 sm:p-3 bg-white rounded-2xl border border-slate-200/80 group-hover:scale-105 transition-transform shadow-2xs">
                {service.icon}
              </span>
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {service.badge}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-950 group-hover:text-emerald-700 transition-colors">
              {service.title}
            </h3>

            <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed font-medium">
              {service.quickSummary}
            </p>

            <div className="pt-2 border-t border-slate-200/70 space-y-1.5 sm:space-y-2">
              {service.keyFixes.map((fix, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{fix}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card Footer */}
          <div className="pt-4 sm:pt-5 mt-4 border-t border-slate-200/70 space-y-3">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>{service.turnaround}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenBooking(service.title)}
                className="flex-1 py-2.5 px-3 bg-slate-950 hover:bg-emerald-600 active:bg-emerald-700 active:scale-[0.98] text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Service</span>
                <ArrowRight className="w-3 h-3 ml-0.5" />
              </button>

              <a
                href="tel:5714621813"
                className="w-10 h-10 shrink-0 inline-flex items-center justify-center text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-md active:bg-emerald-700 active:scale-95 rounded-full border border-emerald-200 transition-all duration-200"
                title="Call for urgent repair"
                aria-label="Call (571) 462-1813"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Home Warranty Card */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-md flex flex-col justify-between">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono uppercase bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full font-bold">
              All Major Providers
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white">Have a Home Warranty Claim?</h3>

          <p className="text-[13px] sm:text-sm text-slate-300 leading-relaxed">
            We work with American Home Shield, Choice, First American, and other top providers. We file documentation and bill parts directly through your warranty.
          </p>

          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Zero paperwork hassle for you
            </p>
            <p className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Factory-certified replacement parts
            </p>
          </div>
        </div>

        <div className="pt-5 sm:pt-6">
          <a
            href="tel:5714621813"
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call (571) 462-1813</span>
          </a>
        </div>
      </div>
    </div>
  );
}
