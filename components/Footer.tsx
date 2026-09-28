"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  ArrowUp,
  Calendar,
  Flame,
  WashingMachine,
  Refrigerator,
  CookingPot,
  Wind,
  BadgeDollarSign,
  type LucideIcon,
} from "lucide-react";

export default function Footer({ onOpenBooking }: { onOpenBooking?: (appliance?: string) => void }) {
  const handleBooking = (service?: string) => {
    if (onOpenBooking) {
      onOpenBooking(service);
    } else {
      window.location.href = `/contact${service ? `?service=${encodeURIComponent(service)}` : ""}`;
    }
  };

  const coreLines: { name: string; icon: LucideIcon }[] = [
    { name: "Laundry (Washer) Repair", icon: WashingMachine },
    { name: "Cooktop / Dishwasher Repair", icon: CookingPot },
    { name: "Refrigeration Repair", icon: Refrigerator },
    { name: "Dryer Vent Cleaning", icon: Flame },
    { name: "House Duct Cleaning", icon: Wind },
  ];

  const pages = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  const perks = [
    { label: "90-Day Warranty", icon: ShieldCheck },
    { label: "$89 Diagnostic, Credited", icon: BadgeDollarSign },
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
      {/* Accent line + ambient glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        {/* CTA band */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-emerald-900/30">
          <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 w-56 h-56 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Appliance acting up? We&apos;ll be there today.
              </h3>
              <p className="mt-2 text-sm sm:text-base text-emerald-50/90">
                Same-day dispatch across DC, Maryland &amp; Northern Virginia. $89 diagnostic, credited toward your repair.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => handleBooking()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 font-black text-sm shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book Service
              </button>
              <a
                href="tel:5714621813"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-800/40 hover:bg-emerald-800/70 border border-white/30 text-white font-black text-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                <Phone className="w-4 h-4" />
                (571) 462-1813
              </a>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-12 sm:py-14">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 ring-2 ring-emerald-500/40">
                <Image src="/logo-mark.png" alt="Eco Appliance Services" fill sizes="48px" className="object-contain" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  Eco <span className="text-emerald-400">Appliance</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">HVAC & Precision Appliance Services</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Honest diagnosis, upfront pricing, and workmanship backed by a 90-day parts and labor guarantee, serving Washington DC, Maryland, and Northern Virginia.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {perks.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                Home Warranty Claims Welcome
              </span>
            </div>
          </div>

          {/* Pages */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 rounded-full bg-emerald-400" />
              Pages
            </h4>
            <ul className="space-y-1">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="group flex items-center justify-between rounded-lg px-3 py-2 -mx-3 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <span>{page.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 rounded-full bg-emerald-400" />
              Services
            </h4>
            <ul className="space-y-1">
              {coreLines.map(({ name, icon: Icon }) => (
                <li key={name}>
                  <button
                    onClick={() => handleBooking(name)}
                    className="group w-full flex items-center gap-2.5 rounded-lg px-3 py-2 -mx-3 text-sm text-left text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-emerald-500/70 group-hover:text-emerald-400 transition-colors shrink-0" />
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 rounded-full bg-emerald-400" />
              Direct Dispatch
            </h4>

            <a
              href="tel:5714621813"
              className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              Call (571) 462-1813
            </a>

            <div className="flex items-start gap-3">
              <span className="w-9 h-9 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-emerald-400" />
              </span>
              <div>
                <p className="text-sm text-white font-semibold">Mon - Sat: 7:30 AM - 8:00 PM</p>
                <p className="text-xs text-slate-400">Sunday: Emergency Dispatch</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-9 h-9 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-emerald-400" />
              </span>
              <div>
                <p className="text-sm text-white font-semibold">Service Area</p>
                <p className="text-xs text-slate-400">Washington DC • Maryland • Northern Virginia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Eco Appliance Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="font-medium text-slate-400 text-center">
              Serving Washington DC, Maryland &amp; Northern Virginia
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="w-9 h-9 shrink-0 rounded-full bg-white/5 hover:bg-emerald-500 border border-white/10 hover:border-emerald-400 text-slate-300 hover:text-slate-950 flex items-center justify-center hover:-translate-y-0.5 active:scale-90 transition-all cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
