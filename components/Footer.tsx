"use client";

import Image from "next/image";
import { BadgeDollarSign, Clock, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { coreServices } from "@/lib/services";
import { SELECT_SERVICE_EVENT, serviceHref } from "@/lib/service-link";
import QrPanel from "@/components/QrPanel";
import { QrCode } from "lucide-react";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
      {children}
    </h4>
  );
}

// Same-page clicks on a deep link do nothing with a plain #hash, so scroll and select the tile ourselves.
function goToService(e: React.MouseEvent, id: string) {
  e.preventDefault();
  window.history.pushState(null, "", serviceHref(id));
  document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: id }));
}

export default function Footer() {

  return (
    <footer className="relative bg-surface-alt text-ink-soft border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10 sm:pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
        {/* Brand */}
        <div className="lg:col-span-3 space-y-4 md:col-span-2">
          <a href="#home" className="flex items-center gap-3 group w-fit">
            <Image src="/logo-emblem.png" alt="" width={711} height={503} className="h-12 w-auto object-contain" />
            <span className="text-xl font-black tracking-tight text-ink group-hover:text-primary-strong transition-colors">
              Eco <span className="text-primary">Appliance</span> Services
            </span>
          </a>
          <p className="text-sm italic text-ink">HVAC &amp; Precision Appliance Services</p>
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

        {/* Services */}
        <nav aria-label="Services" className="md:col-span-2 lg:col-span-4">
          <ColumnHeading>Services</ColumnHeading>
          <ul className="text-sm grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-4">
            {coreServices.filter((s) => !s.extra).map((s) => (
              <li key={s.id}>
                <a
                  href={serviceHref(s.id)}
                  onClick={(e) => goToService(e, s.id)}
                  className="group flex items-center gap-2.5 py-1.5 sm:py-1 font-semibold leading-tight text-ink-soft hover:text-primary transition-transform hover:translate-x-0.5"
                >
                  <span
                    className="w-1 h-1 rounded-full bg-muted transition-all group-hover:bg-primary group-hover:scale-150"
                    aria-hidden="true"
                  />
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-3 mt-1 border-t border-line">
            <a
              href="#services"
              className="pressable inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary-strong text-on-primary text-xs font-bold"
            >
              All Services
            </a>
          </div>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <ColumnHeading>Direct Dispatch</ColumnHeading>
          <div className="p-4 rounded-2xl bg-surface border border-line shadow-sm space-y-2.5 text-xs sm:text-sm">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Phone</p>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-base font-black text-ink hover:text-primary whitespace-nowrap">
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

        {/* Follow us (QR) */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
            <QrCode className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            Follow Us
          </h4>
          <QrPanel />
        </div>
      </div>

      <div className="border-t border-line py-6 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© 2026 Eco Appliance Services. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <span>Same-Day Dispatch</span>
            <span aria-hidden="true">•</span>
            <span>Home Warranty Claims Welcome</span>
            <span aria-hidden="true">•</span>
            <span>Serving DC, MD &amp; VA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
