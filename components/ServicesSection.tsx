"use client";

import { ArrowRight, Calendar, Check, Phone, ShieldCheck, Wrench } from "lucide-react";
import { applianceCategories, serviceGroups, type ServiceGroup } from "@/lib/services";
import { brands, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { useSite } from "@/components/SiteShell";

const bookButton =
  "btn-cta inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-6 py-3 rounded-full font-black text-sm shadow-md shadow-primary/25";
const callButton =
  "pressable inline-flex items-center justify-center gap-2 bg-surface border border-line hover:border-primary hover:text-primary px-6 py-3 rounded-full font-bold text-sm";

function ServiceCard({ group, featured = false }: { group: ServiceGroup; featured?: boolean }) {
  const { openBooking } = useSite();
  const Icon = group.icon;

  return (
    <article
      className={`rounded-3xl bg-surface border border-line shadow-sm p-5 sm:p-7 flex flex-col ${
        featured ? "ring-1 ring-primary/25 shadow-md" : ""
      }`}
    >
      <div className="flex items-start gap-3.5">
        <span className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="w-6 h-6" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-primary-strong">{group.badge}</p>
          <h3 className={`font-black tracking-tight leading-tight ${featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
            {group.title}
          </h3>
        </div>
      </div>

      <p className="mt-3 text-sm text-ink-soft leading-relaxed">{group.blurb}</p>

      <ul className={`mt-4 grid gap-x-6 gap-y-2.5 ${featured ? "sm:grid-cols-2" : ""}`}>
        {group.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm font-medium">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={3} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <div className="pt-5 border-t border-line flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={() => openBooking(group.bookAs)} className={bookButton}>
            <Calendar className="relative z-10 w-4 h-4" aria-hidden="true" />
            <span className="relative z-10">Book Online</span>
            <ArrowRight className="relative z-10 w-4 h-4" aria-hidden="true" />
          </button>
          <a href={PHONE_HREF} className={callButton}>
            <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
            <span>Call {PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const { openBooking } = useSite();
  const [appliances, ...otherGroups] = serviceGroups;

  return (
    <section id="services" className="bg-surface-tint border-y border-line-tint py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-line-tint text-primary-strong text-xs font-bold uppercase tracking-wider shadow-xs mb-3">
            <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
            Our Services
          </div>
          <h2 className="text-xl sm:text-3xl font-black mb-1.5">Appliance Repair, Installation &amp; Cleaning</h2>
          <p className="text-sm sm:text-base text-ink-soft">
            Quick, reliable service with upfront pricing and our 30-day parts &amp; labor guarantee.
          </p>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {/* 1. Appliances: the core of the business */}
          <ServiceCard group={appliances} featured />

          <div className="rounded-3xl bg-surface border border-line shadow-sm p-5 sm:p-7">
            <h3 className="text-base sm:text-lg font-black tracking-tight">Appliances We Service</h3>
            <div className="mt-4 grid gap-5 lg:grid-cols-3 lg:gap-6">
              {applianceCategories.map(({ id, title, icon: Icon, items }) => (
                <div key={id} className="rounded-2xl bg-surface-alt border border-line p-4">
                  <h4 className="flex items-center gap-2 text-sm font-extrabold text-primary-strong">
                    <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {title}
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="px-2.5 py-1 rounded-full bg-surface border border-line text-xs font-semibold text-ink-soft"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-line">
              <p className="text-sm font-black tracking-tight">We Service Most Major Appliance Brands</p>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                {brands.join(", ")}, and More.
              </p>
            </div>
          </div>

          {/* Home warranty */}
          <div className="rounded-3xl bg-ink text-on-primary p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
            <span className="w-12 h-12 shrink-0 rounded-2xl bg-primary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Have a Home Warranty Claim?</h3>
              <p className="mt-1.5 text-sm text-white/75 leading-relaxed max-w-2xl">
                We work with American Home Shield, Choice, First American, and other top providers. File your claim, ask for
                Eco Appliance Services, and we handle the rest.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={PHONE_HREF}
                className="pressable inline-flex items-center justify-center gap-2 bg-white text-ink px-6 py-3 rounded-full font-black text-sm"
              >
                <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Call {PHONE_DISPLAY}</span>
              </a>
              <button
                type="button"
                onClick={() => openBooking()}
                className="pressable inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 px-6 py-3 rounded-full font-bold text-sm"
              >
                <Calendar className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                <span>Book Online</span>
              </button>
            </div>
          </div>

          {/* 2 & 3. Dryer vent, then duct cleaning, after the appliance section */}
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            {otherGroups.map((group) => (
              <ServiceCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
