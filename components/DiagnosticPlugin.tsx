"use client";

import { useState } from "react";
import {
  Calculator,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Zap,
  MapPin,
  Flame,
  Wind,
  Phone,
  Calendar,
} from "lucide-react";

interface DiagnosticPluginProps {
  onOpenBooking?: (serviceName?: string) => void;
}

export default function DiagnosticPlugin({ onOpenBooking }: DiagnosticPluginProps) {
  const [selectedService, setSelectedService] = useState("laundry");
  const [urgency, setUrgency] = useState<"standard" | "same-day">("same-day");
  const [zipCode, setZipCode] = useState("");
  const [zipValid, setZipValid] = useState<boolean | null>(null);

  const servicesConfig = {
    laundry: {
      title: "Laundry (Washer) Repair",
      icon: "🧺",
      category: "Appliance",
      avgRepairTime: "45 - 90 mins",
      firstVisitRate: "88%",
      commonIssue: "Drum not spinning, leak, or drainage error",
      ecoBenefit: "Saves up to 4,000 gal water/yr vs premature replacement",
    },
    cooktop: {
      title: "Cooktop / Dishwasher Repair",
      icon: "🍽️",
      category: "Kitchen",
      avgRepairTime: "60 mins",
      firstVisitRate: "90%",
      commonIssue: "Burner failing to ignite or dishwasher drainage fault",
      ecoBenefit: "Restores peak thermal efficiency and prevents water waste",
    },
    refrigeration: {
      title: "Refrigeration Repair",
      icon: "❄️",
      category: "Cooling",
      avgRepairTime: "60 - 120 mins",
      firstVisitRate: "86%",
      commonIssue: "Freezer freezing over, compressor humming, temperature spike",
      ecoBenefit: "Prevents refrigerant leaks & stops high electrical draw",
    },
    dryervent: {
      title: "Dryer Vent Cleaning",
      icon: "🔥",
      category: "Fire Safety",
      avgRepairTime: "45 mins",
      firstVisitRate: "99%",
      commonIssue: "Clothes taking multiple cycles, hot cabinet, lint accumulation",
      ecoBenefit: "Reduces drying electricity by 30% and prevents lint fires",
    },
    duct: {
      title: "House Duct Cleaning",
      icon: "💨",
      category: "Air Quality",
      avgRepairTime: "2 - 3 hrs",
      firstVisitRate: "95%",
      commonIssue: "Restricted airflow, excessive dust, musty vents, allergy flare-ups",
      ecoBenefit: "Improves airflow efficiency by up to 25%",
    },
  };

  const handleZipCheck = (value: string) => {
    setZipCode(value);
    const clean = value.trim();
    if (clean.length === 5) {
      // DMV area zip codes check (DC 200xx-205xx, MD 206xx-219xx, VA 201xx, 220xx-223xx)
      const isDMV =
        clean.startsWith("200") ||
        clean.startsWith("201") ||
        clean.startsWith("202") ||
        clean.startsWith("203") ||
        clean.startsWith("204") ||
        clean.startsWith("205") ||
        clean.startsWith("206") ||
        clean.startsWith("207") ||
        clean.startsWith("208") ||
        clean.startsWith("209") ||
        clean.startsWith("210") ||
        clean.startsWith("211") ||
        clean.startsWith("212") ||
        clean.startsWith("217") ||
        clean.startsWith("220") ||
        clean.startsWith("221") ||
        clean.startsWith("222") ||
        clean.startsWith("223");
      setZipValid(isDMV);
    } else {
      setZipValid(null);
    }
  };

  const current = servicesConfig[selectedService as keyof typeof servicesConfig];

  const handleDispatchBooking = () => {
    if (onOpenBooking) {
      onOpenBooking(current.title);
    } else {
      window.location.href = `/contact?service=${encodeURIComponent(current.title)}`;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            Interactive Tool (Plugin)
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Eco Service Estimator & Instant Dispatch Plugin
          </h2>

          <p className="mt-3 text-base text-slate-600">
            Select your service line and enter your DMV ZIP code to calculate arrival windows, first-visit fix rates, and 100% diagnostic fee credits.
          </p>
        </div>

        {/* Plugin Interactive Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Service Selector Tabs */}
          <div className="p-4 sm:p-6 bg-slate-100/70 border-b border-slate-200">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
              Step 1: Choose Your Core Service Line
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {Object.entries(servicesConfig).map(([key, data]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedService(key)}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedService === key
                      ? "bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400/40"
                      : "bg-white text-slate-800 hover:bg-emerald-50 hover:border-emerald-300 active:scale-[0.98] border border-slate-200"
                  }`}
                >
                  <span className="text-2xl mb-1">{data.icon}</span>
                  <div>
                    <span className="block text-xs font-extrabold leading-snug">
                      {data.title}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider ${
                        selectedService === key ? "text-emerald-100" : "text-slate-400"
                      }`}
                    >
                      {data.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Plugin Body: Controls & Real-Time Calculation */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                  Step 2: Enter DMV ZIP Code
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    maxLength={5}
                    value={zipCode}
                    onChange={(e) => handleZipCheck(e.target.value)}
                    placeholder="e.g. 20001, 20814, 22102"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm font-semibold bg-white text-slate-900 outline-none"
                  />
                </div>

                {zipValid === true && (
                  <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Priority DMV Mobile Van Available for Immediate Dispatch!
                  </p>
                )}
                {zipValid === false && (
                  <p className="mt-2 text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    Outside primary DMV core. Call (571) 462-1813 for special routing.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                  Step 3: Scheduling Urgency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgency("same-day")}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      urgency === "same-day"
                        ? "border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-500"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <span className="block text-slate-900 font-extrabold">Same-Day Priority</span>
                    <span className="text-[11px] text-emerald-700 font-medium">Within 2–4 hours</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency("standard")}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      urgency === "standard"
                        ? "border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-500"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <span className="block text-slate-900 font-extrabold">Next-Day / Flexible</span>
                    <span className="text-[11px] text-slate-500 font-medium">Standard slot</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Instant Real-time Output Card */}
            <div className="md:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Live Plugin Calculation
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-1">
                    {current.title}
                  </h4>
                </div>
                <span className="text-2xl">{current.icon}</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="font-medium text-slate-500">Diagnostic Fee Credit:</span>
                  <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    100% Credited Toward Repair
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="font-medium text-slate-500">Average On-Site Duration:</span>
                  <span className="font-bold text-slate-900">{current.avgRepairTime}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="font-medium text-slate-500">First-Visit Resolution Rate:</span>
                  <span className="font-bold text-slate-900">{current.firstVisitRate}</span>
                </div>

                <div className="py-1">
                  <span className="block font-semibold text-slate-700 mb-0.5">Eco Efficiency Impact:</span>
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {current.ecoBenefit}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleDispatchBooking}
                className="w-full mt-2 py-3 px-4 bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Confirm Service Slot</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
