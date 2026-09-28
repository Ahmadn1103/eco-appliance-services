"use client";

import { useState } from "react";
import { MapPin, Search, CheckCircle2, Phone, Calendar, AlertCircle } from "lucide-react";

export default function DMVCoverage({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [zipInput, setZipInput] = useState("");
  const [zipStatus, setZipStatus] = useState<"idle" | "covered" | "contact">("idle");

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    // DMV zip prefixes: 200-205 (DC), 206-219 (MD), 220-223, 201 (VA)
    const isDMV =
      cleanZip.startsWith("200") ||
      cleanZip.startsWith("201") ||
      cleanZip.startsWith("202") ||
      cleanZip.startsWith("203") ||
      cleanZip.startsWith("204") ||
      cleanZip.startsWith("205") ||
      cleanZip.startsWith("206") ||
      cleanZip.startsWith("207") ||
      cleanZip.startsWith("208") ||
      cleanZip.startsWith("209") ||
      cleanZip.startsWith("210") ||
      cleanZip.startsWith("211") ||
      cleanZip.startsWith("212") ||
      cleanZip.startsWith("217") ||
      cleanZip.startsWith("220") ||
      cleanZip.startsWith("221") ||
      cleanZip.startsWith("222") ||
      cleanZip.startsWith("223");

    if (isDMV) {
      setZipStatus("covered");
    } else {
      setZipStatus("contact");
    }
  };

  const coverageAreas = [
    {
      region: "Washington, DC",
      badge: "District Wide",
      description: "Full service throughout all four quadrants of the nation's capital.",
      cities: [
        "Northwest (NW)",
        "Northeast (NE)",
        "Georgetown",
        "Capitol Hill",
        "Dupont Circle",
        "Adams Morgan",
        "Tenleytown",
        "Navy Yard",
        "Petworth",
        "Foggy Bottom",
      ],
    },
    {
      region: "Maryland (MD)",
      badge: "Montgomery & PG Counties",
      description: "Fast dispatch across Montgomery, Prince George's, and surrounding counties.",
      cities: [
        "Bethesda & Chevy Chase",
        "Rockville & Potomac",
        "Silver Spring & Takoma Park",
        "Gaithersburg & Germantown",
        "Bowie & College Park",
        "Laurel & Hyattsville",
        "Olney & Clarksburg",
        "Frederick & Howard Co.",
      ],
    },
    {
      region: "Northern Virginia (VA)",
      badge: "NoVA Core",
      description: "Same-day coverage for Northern Virginia homeowners and communities.",
      cities: [
        "Fairfax & Vienna",
        "Arlington & Crystal City",
        "City of Alexandria",
        "McLean & Great Falls",
        "Tysons & Falls Church",
        "Reston & Herndon",
        "Ashburn & Sterling (Loudoun)",
        "Woodbridge & Manassas",
      ],
    },
  ];

  return (
    <section id="coverage" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            DMV Tri-State Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Reliable Appliance Repair Across Washington DC, Maryland & Virginia
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            From the heart of the District to Montgomery County, Fairfax County, and beyond, our mobile service fleet is strategically stationed to arrive fast.
          </p>

          {/* Interactive ZIP Code Checker Form */}
          <form
            onSubmit={handleZipCheck}
            className="mt-8 max-w-xl mx-auto p-2 sm:p-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-inner focus-within:border-sky-500 transition-colors"
          >
            <div className="flex-1 flex items-center px-3 gap-2">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={zipInput}
                onChange={(e) => {
                  setZipInput(e.target.value);
                  if (zipStatus !== "idle") setZipStatus("idle");
                }}
                placeholder="Enter your 5-digit ZIP code (e.g. 20001, 20814, 22102)"
                maxLength={5}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
            >
              Check Availability
            </button>
          </form>

          {/* ZIP Code Status Alert */}
          {zipStatus === "covered" && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 max-w-xl mx-auto flex items-center justify-between gap-3 text-left animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold">
                    Great news! ZIP {zipInput} is in our primary DMV service area.
                  </p>
                  <p className="text-xs text-emerald-700">
                    Same-day and next-day appointment windows are currently open.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenBooking}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow shrink-0"
              >
                Book Now
              </button>
            </div>
          )}

          {zipStatus === "contact" && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 max-w-xl mx-auto flex items-center justify-between gap-3 text-left animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold">
                    ZIP {zipInput} is on our extended border service zone.
                  </p>
                  <p className="text-xs text-amber-700">
                    Call our dispatch center directly to check route schedules today.
                  </p>
                </div>
              </div>
              <a
                href="tel:5714621813"
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow shrink-0"
              >
                Call (571) 462-1813
              </a>
            </div>
          )}
        </div>

        {/* 3 Regional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {coverageAreas.map((area, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-2.5 py-1 rounded-md">
                  {area.badge}
                </span>
                <MapPin className="w-5 h-5 text-sky-600" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">{area.region}</h3>
              <p className="text-xs text-slate-600 mt-1 mb-5">{area.description}</p>

              <div className="border-t border-slate-200/80 pt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Neighborhoods & Suburbs:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {area.cities.map((city, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-xs font-medium bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded-md"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DMV Fleet Guarantee Banner */}
        <div className="mt-12 bg-sky-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-800 border border-sky-700 flex items-center justify-center shrink-0 text-white font-extrabold text-xl">
              $89
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                Honest Diagnosis, Upfront Pricing
              </h4>
              <p className="text-xs sm:text-sm text-sky-200 mt-0.5">
                A flat $89 diagnostic, credited 100% toward your repair when you approve the work.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Book Service
            </button>
            <a
              href="tel:5714621813"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all"
            >
              Call Dispatch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
