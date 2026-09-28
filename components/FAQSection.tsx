"use client";

import { useState } from "react";
import { faqs } from "@/lib/faqs";
import { ChevronDown, HelpCircle, Phone } from "lucide-react";

export default function FAQSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-10 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Common Questions About Our Services
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Have questions before scheduling? Here is everything you need to know about our service process, pricing, and warranties.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-emerald-300 bg-emerald-50/20 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-900">
              Have a specific question about your HVAC or appliance?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Speak directly with an experienced technician or our DMV dispatch team today.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:5714621813"
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              (571) 462-1813
            </a>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-slate-950 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              Schedule Online
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
