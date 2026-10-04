"use client";

import { ChevronDown, MapPin, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF, serviceRegions } from "@/lib/site";
import { SERVICE_RADIUS_MILES } from "@/lib/service-area";
import ZipChecker from "@/components/ZipChecker";

export default function ServiceAreaSection() {
  return (
    <section id="service-area" className="bg-surface py-8 sm:py-16 border-b border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Serving{" "}
            <span className="bg-gradient-to-r from-primary via-primary-strong to-accent bg-clip-text text-transparent">
              Northern Virginia, DC &amp; Maryland
            </span>
          </h2>

          <ZipChecker className="max-w-md mx-auto mt-5 text-left" />
        </div>

        <div className="grid md:grid-cols-3 gap-3 sm:gap-4 items-start">
          {serviceRegions.map(({ region, areas }) => (
            <details
              key={region}
              className="group rounded-2xl bg-surface-alt border border-line open:bg-surface open:shadow-sm"
            >
              <summary className="flex items-center gap-2 px-4 py-3.5 list-none cursor-pointer [&::-webkit-details-marker]:hidden">
                <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span className="font-black">{region}</span>
                <span className="ml-auto text-xs font-bold text-muted">{areas.length} cities</span>
                <ChevronDown
                  className="w-4 h-4 text-muted shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <ul className="flex flex-wrap gap-1.5 px-4 pb-4">
                {areas.map((a) => (
                  <li key={a} className="text-xs px-2.5 py-1 rounded-full bg-surface border border-line text-ink-soft">
                    {a}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-surface-tint border border-line-tint p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-sm space-y-1">
            <p>
              <strong className="font-black">Open 24 Hours.</strong>{" "}
              <span className="text-ink-soft">7 days a week.</span>
            </p>
            <p className="text-xs text-ink-soft">
              ZIP codes within about {SERVICE_RADIUS_MILES} miles of our service hubs. Not sure about your area? Call and we will confirm.
            </p>
          </div>
          <a
            href={PHONE_HREF}
            className="pressable inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-strong text-on-primary text-sm font-bold whitespace-nowrap shrink-0"
          >
            <Phone className="pressable-icon w-4 h-4" aria-hidden="true" />
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
