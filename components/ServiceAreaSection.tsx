"use client";

import { MapPin, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF, serviceRegions } from "@/lib/site";
import { SERVICE_RADIUS_MILES } from "@/lib/service-area";
import ZipChecker from "@/components/ZipChecker";

export default function ServiceAreaSection() {
  return (
    <section id="service-area" className="bg-surface py-10 sm:py-16 border-b border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Serving{" "}
            <span className="bg-gradient-to-r from-primary via-primary-strong to-accent bg-clip-text text-transparent">
              DC, Maryland &amp; Northern Virginia
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-soft">
            Fast local response vans dispatched across the DMV, within about {SERVICE_RADIUS_MILES} miles of Washington, DC. Enter your ZIP code to check coverage.
          </p>

          <ZipChecker className="max-w-md mx-auto mt-5 text-left" />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {serviceRegions.map(({ region, areas }) => (
            <div key={region} className="card-lift rounded-2xl bg-surface-alt border border-line hover:border-primary p-5">
              <h3 className="flex items-center gap-2 font-black mb-3">
                <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                {region}
              </h3>
              <ul className="space-y-1.5 text-sm text-ink-soft">
                {areas.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted mt-3">Not sure about your area? Call us and we will confirm coverage.</p>

        <div className="mt-6 rounded-2xl bg-surface-tint border border-line-tint p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm">
            <strong className="font-black">Mon – Sat: 7:30 AM – 8:00 PM.</strong>{" "}
            <span className="text-ink-soft">Sunday: Emergency Dispatch.</span>
          </p>
          <a
            href={PHONE_HREF}
            className="pressable inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-strong text-on-primary text-sm font-bold shrink-0"
          >
            <Phone className="pressable-icon w-4 h-4" aria-hidden="true" />
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
