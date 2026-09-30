"use client";

import Image from "next/image";
import { ArrowRight, BadgeDollarSign, Clock, MapPin, Phone, ShieldCheck } from "lucide-react";
import { navLinks, PHONE_DISPLAY, PHONE_HREF, SOCIAL_LINKS } from "@/lib/site";
import { serviceGroups } from "@/lib/services";
import { useSite } from "@/components/SiteShell";
import QrPanel from "@/components/QrPanel";
import { QrCode } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/BrandIcons";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
      {children}
    </h4>
  );
}

export default function Footer() {
  const { openBooking } = useSite();

  return (
    <footer className="relative bg-surface-alt text-ink-soft border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
        {/* Brand */}
        <div className="lg:col-span-3 space-y-4">
          <a href="#home" className="flex items-center gap-3 group w-fit">
            <span className="relative w-11 h-11 rounded-2xl border border-line bg-surface p-0.5">
              <Image src="/logo-mark.png" alt="" fill sizes="44px" className="object-contain" />
            </span>
            <span className="text-xl font-black tracking-tight text-ink group-hover:text-primary-strong transition-colors">
              Eco <span className="text-primary">Appliance</span> Services
            </span>
          </a>
          <p className="text-sm italic text-ink">Appliance Repair &amp; Installation</p>
          <p className="text-xs sm:text-sm leading-relaxed max-w-md">
            Honest diagnosis, upfront pricing, and workmanship backed by a 30-day parts and labor guarantee, serving Washington DC,
            Maryland, and Northern Virginia.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-strong bg-primary/10 border border-line-tint px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              30-Day Warranty
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-strong bg-primary/10 border border-line-tint px-3 py-1.5 rounded-full">
              <BadgeDollarSign className="w-3.5 h-3.5" aria-hidden="true" />
              $89 Diagnostic, Credited
            </span>
          </div>
        </div>

        {/* Links + services */}
        <nav aria-label="Footer" className="lg:col-span-2 space-y-6">
          <div>
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ColumnHeading>Services</ColumnHeading>
            <ul className="space-y-2 text-xs sm:text-sm">
              {serviceGroups.map((s) => (
                <li key={s.id}>
                  <button type="button" onClick={() => openBooking(s.bookAs)} className="text-left hover:text-primary">
                    {s.title}
                  </button>
                </li>
              ))}
              <li>
                <a href="#services" className="inline-flex items-center gap-1 font-bold text-ink hover:text-primary">
                  All services <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <ColumnHeading>Direct Dispatch</ColumnHeading>
          <div className="p-4 rounded-2xl bg-surface border border-line shadow-sm space-y-2.5 text-xs sm:text-sm">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Phone</p>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 font-black text-ink hover:text-primary">
                <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Hours</p>
              <p className="flex items-start gap-2 text-ink">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Mon – Sat: 7:30 AM – 8:00 PM
                  <span className="block text-ink-soft text-xs">Sunday: Emergency Dispatch</span>
                </span>
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Coverage</p>
              <p className="flex items-start gap-2 text-ink">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                Washington DC • Maryland • Northern Virginia
              </p>
            </div>
          </div>
        </div>

        {/* Scan to call / follow */}
        <div className="lg:col-span-3">
          <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
            <QrCode className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            Scan to Call
          </h4>
          <QrPanel />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex items-center justify-center gap-2 rounded-full bg-surface border border-line px-4 py-2.5 text-sm font-bold text-ink hover:border-primary hover:text-primary"
            >
              <FacebookIcon className="w-4 h-4" />
              Facebook
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex items-center justify-center gap-2 rounded-full bg-surface border border-line px-4 py-2.5 text-sm font-bold text-ink hover:border-primary hover:text-primary"
            >
              <InstagramIcon className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line py-6 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© 2026 Eco Appliance Services. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-5 text-center">
            <span>Same-Day Dispatch</span>
            <span aria-hidden="true" className="hidden sm:inline">•</span>
            <span>Home Warranty Claims Welcome</span>
            <span aria-hidden="true" className="hidden sm:inline">•</span>
            <span>Serving DC, MD &amp; VA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
