"use client";

import { Calendar, Clock, FileText, MapPin, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { useSite } from "@/components/SiteShell";
import PanelBookingForm from "@/components/PanelBookingForm";

export default function ContactSection() {
  const { openBooking } = useSite();

  return (
    <section id="contact" className="bg-surface-alt py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">Get in Touch with Eco Appliance Services</h2>
          <p className="mt-3 text-sm sm:text-base text-ink-soft">
            Need urgent diagnosis, air duct sanitization, or warranty repair dispatch? Submit our quick customer inquiry form or call
            our DMV dispatch team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4">
            {/* Phone card */}
            <div className="p-4 rounded-2xl bg-surface border border-line shadow-sm">
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <Phone className="w-4 h-4" aria-hidden="true" />
                Live Dispatch Phone
              </div>
              <a
                href={PHONE_HREF}
                className="pressable block px-4 py-2.5 rounded-xl border bg-surface-tint/80 border-line-tint hover:border-primary"
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">Call for Same-Day Slot</span>
                <span className="block text-xl font-black">{PHONE_DISPLAY}</span>
              </a>
              <button
                type="button"
                onClick={() => openBooking()}
                className="pressable mt-2 w-full text-left px-4 py-2.5 rounded-xl border bg-surface-alt border-line hover:border-primary"
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">Prefer online?</span>
                <span className="flex items-center gap-2 text-base font-black">
                  <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
                  Schedule Service Online
                </span>
              </button>
            </div>

            {/* Details card */}
            <div className="p-4 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
              <div>
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  Operating Hours
                </div>
                <dl className="text-sm space-y-1">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Monday – Saturday</dt>
                    <dd className="font-bold">8:00 AM – 7:00 PM</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Sunday</dt>
                    <dd className="font-bold">Emergency Dispatch</dd>
                  </div>
                </dl>
              </div>

              <div className="pt-3 border-t border-line">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  Service Area
                </div>
                <p className="text-sm text-ink-soft">Washington DC • Maryland • Northern Virginia</p>
              </div>

              <div className="pt-3 border-t border-line">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  Have a Home Warranty Claim?
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                  We work with American Home Shield, Choice Home Warranty, First American, and other major providers. Ask your
                  provider to assign <strong className="text-ink">Eco Appliance Services</strong> as your authorized service
                  contractor.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <PanelBookingForm
              title="Request an Appliance Technician"
              subtitle="Tell us what needs repair and when you are free."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
