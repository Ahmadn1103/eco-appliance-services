"use client";

import { useState } from "react";
import {
  BadgeDollarSign,
  ChevronDown,
  Clock,
  HelpCircle,
  Phone,
  Scale,
  ShieldCheck,
  Tags,
  type LucideIcon,
} from "lucide-react";
import { faqs } from "@/lib/faqs";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { useSite } from "@/components/SiteShell";

// One icon per question, in the same order as lib/faqs.ts.
const faqIcons: LucideIcon[] = [BadgeDollarSign, ShieldCheck, Clock, Tags, ShieldCheck, Scale];

export default function FAQSection() {
  const { openBooking } = useSite();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-surface border-b border-line">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-line-tint text-primary-strong text-xs font-bold uppercase tracking-wider shadow-xs mb-3">
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">Common Questions About Our Services</h2>
          <p className="mt-3 text-sm sm:text-lg text-ink-soft">
            Have questions before scheduling? Here is everything you need to know about our service process, pricing, and warranties.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const Icon = faqIcons[idx % faqIcons.length];
            return (
              <div
                key={faq.q}
                className={`card-lift rounded-3xl border bg-surface-alt/60 overflow-hidden ${
                  isOpen ? "border-primary shadow-md" : "border-line hover:border-primary"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${idx}`}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base hover:text-primary"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : "text-muted"}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-a-${idx}`}
                    className="px-6 pb-5 pt-3 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-line/60 bg-surface"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-3xl bg-surface-tint border border-line-tint flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black">Have a specific question about your HVAC or appliance?</h3>
            <p className="text-xs sm:text-sm text-ink-soft mt-0.5">
              Speak directly with an experienced technician or our DMV dispatch team today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={PHONE_HREF}
              className="pressable inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface border border-line hover:border-primary text-xs sm:text-sm font-bold"
            >
              <Phone className="pressable-icon w-4 h-4 text-primary" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <button
              type="button"
              onClick={() => openBooking()}
              className="pressable px-5 py-2.5 rounded-full bg-primary hover:bg-primary-strong text-on-primary text-xs sm:text-sm font-bold"
            >
              Schedule Online
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
