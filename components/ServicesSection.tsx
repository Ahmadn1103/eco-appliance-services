"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { bundleOption, services } from "@/lib/services";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { SELECT_SERVICE_EVENT } from "@/lib/service-link";
import { useSite } from "@/components/SiteShell";
import PanelBookingForm from "@/components/PanelBookingForm";
import ZipChecker from "@/components/ZipChecker";

export default function ServicesSection() {
  const { openBooking } = useSite();
  const [selectedId, setSelectedId] = useState(services[0].id);
  const panelRef = useRef<HTMLDivElement>(null);
  const selected = services.find((s) => s.id === selectedId) ?? services[0];
  const SelectedIcon = selected.icon;

  const select = (id: string) => {
    setSelectedId(id);
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Footer links deep-link to a tile with ?service=<slug>#services. A plain #hash link does nothing when the
  // URL already has that hash, so same-page clicks arrive as a window event instead.
  useEffect(() => {
    const pick = (id: string | null) => {
      if (id && services.some((s) => s.id === id)) {
        setSelectedId(id);
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    const onEvent = (e: Event) => pick((e as CustomEvent<string>).detail);
    window.addEventListener(SELECT_SERVICE_EVENT, onEvent);
    const frame = requestAnimationFrame(() => {
      if (window.location.hash === "#services") pick(new URLSearchParams(window.location.search).get("service"));
    });
    return () => {
      window.removeEventListener(SELECT_SERVICE_EVENT, onEvent);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="services" className="bg-surface-tint border-y border-line-tint pt-8 pb-8 sm:pt-10 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-line-tint text-primary-strong text-xs font-black uppercase tracking-widest shadow-xs mb-3">
            <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
            Core Service Lines
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-1">What We Fix &amp; Clean For You</h2>
          <p className="text-sm sm:text-base text-ink-soft">
            Quick, reliable service with upfront pricing and our 30-day parts &amp; labor guarantee.
          </p>
        </div>

        {/* Tile selector */}
        <div role="tablist" aria-label="Services" className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {services.filter((s) => !s.extra).map((service) => {
            const Icon = service.icon;
            const isSelected = service.id === selectedId;
            return (
              <button
                key={service.id}
                type="button"
                role="tab"
                id={`tab-${service.id}`}
                aria-selected={isSelected}
                aria-controls="service-panel"
                onClick={() => select(service.id)}
                className={`card-lift group h-full w-full flex flex-col items-center text-center gap-1.5 sm:gap-2 p-2.5 sm:p-4 rounded-2xl border shadow-xs bg-surface ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/30 shadow-lg"
                    : "border-line hover:border-primary hover:shadow-lg"
                }`}
              >
                <span
                  className={`w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? "bg-primary" : "bg-primary-strong group-hover:bg-primary"
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-on-primary" aria-hidden="true" />
                </span>
                <span className="text-[11px] sm:text-sm font-extrabold leading-tight">{service.tileName ?? service.title}</span>
                <span className="hidden sm:block text-[11px] text-muted leading-snug">{service.note}</span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div
          ref={panelRef}
          role="tabpanel"
          id="service-panel"
          aria-labelledby={`tab-${selected.id}`}
          className="mt-6 rounded-3xl bg-surface border border-line shadow-lg overflow-hidden scroll-mt-32"
        >
          <div className="bg-gradient-to-r from-primary-strong via-primary to-accent text-on-primary px-5 sm:px-7 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <span className="w-12 h-12 shrink-0 rounded-2xl bg-white/15 ring-1 ring-white/30 flex items-center justify-center">
                <SelectedIcon className="w-6 h-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">{selected.title}</h3>
                <p className="text-xs sm:text-sm text-white/80 mt-0.5">{selected.turnaround}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25 text-[11px] sm:text-xs font-bold">
                <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                {selected.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25 text-[11px] sm:text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                30-Day Warranty
              </span>
            </div>
          </div>

          <div key={selected.id} className="panel-swap p-4 sm:p-7 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">{selected.quickSummary}</p>

              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted mb-2.5">{selected.highlightsLabel ?? "Key Fixes"}</h4>
                <ul className="space-y-2">
                  {selected.keyFixes.map((fix) => (
                    <li key={fix} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{fix}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-surface-tint/70 border border-line-tint p-4 space-y-2.5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted">Check your ZIP</p>
                <ZipChecker service={selected.isWarranty ? undefined : selected.title} />
                <button
                  type="button"
                  onClick={() => openBooking(selected.isWarranty ? undefined : selected.title)}
                  className="btn-cta w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-5 py-3 rounded-full font-extrabold text-sm shadow-md shadow-primary/25 active:scale-95"
                >
                  <Calendar className="relative z-10 w-4 h-4" aria-hidden="true" />
                  <span className="relative z-10">Book Service</span>
                  <ArrowRight className="relative z-10 w-4 h-4" aria-hidden="true" />
                </button>
                <div className="space-y-1.5">
                  <p className="text-center text-xs font-bold text-ink-soft">Prefer to call?</p>
                  <a
                    href={PHONE_HREF}
                    className="pressable flex items-center justify-center gap-1.5 rounded-full bg-surface border border-line-tint hover:border-primary px-2 py-2.5 text-[13px] font-bold whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {selected.bundles ? (
                <div className="space-y-3">
                  <h4 className="text-lg font-black tracking-tight">Choose your maintenance bundle</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {selected.bundles.map((bundle) => (
                      <li
                        key={bundle.id}
                        className="rounded-2xl bg-surface-alt border border-line p-4 flex flex-col gap-2.5"
                      >
                        <p className="text-xs font-black uppercase tracking-wider text-primary-strong">{bundle.name}</p>
                        <p className="text-3xl font-black leading-none">{bundle.price}</p>
                        <p className="flex-1 text-sm text-ink-soft leading-relaxed">{bundle.description}</p>
                        <button
                          type="button"
                          onClick={() => openBooking(bundleOption(selected, bundle))}
                          className="btn-cta w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-4 py-2.5 rounded-full font-extrabold text-sm shadow-md shadow-primary/25 active:scale-95"
                        >
                          <Calendar className="relative z-10 w-4 h-4" aria-hidden="true" />
                          <span className="relative z-10">Book This Bundle</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : selected.isWarranty ? (
                <div className="rounded-2xl bg-surface-alt border border-line p-5 sm:p-6 space-y-3">
                  <span className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h4 className="text-lg font-black tracking-tight">File your claim, then call us</h4>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    File your claim with your provider and ask for <strong className="text-ink">Eco Appliance Services</strong> as
                    your authorized service contractor. Call and we will take it from there.
                  </p>
                  <a
                    href={PHONE_HREF}
                    className="btn-cta inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-6 py-3 rounded-full font-black text-sm shadow-md shadow-primary/25"
                  >
                    <Phone className="relative z-10 w-4 h-4" aria-hidden="true" />
                    <span className="relative z-10">Call {PHONE_DISPLAY}</span>
                  </a>
                </div>
              ) : (
                <PanelBookingForm service={selected.title} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
