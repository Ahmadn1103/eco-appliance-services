"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle2,
  Phone,
  ShieldCheck,
  AlertCircle,
  Flame,
  WashingMachine,
  Refrigerator,
  CookingPot,
  Wind,
  Zap,
  Sunrise,
  Sun,
  Sunset,
  ChevronDown,
  Loader2,
  type LucideIcon,
} from "lucide-react";

interface ContactFormProps {
  initialService?: string;
}

const coreServices: { name: string; short: string; icon: LucideIcon }[] = [
  { name: "Dryer Vent Cleaning", short: "Dryer Vent", icon: Flame },
  { name: "Laundry (Washer) Repair", short: "Washer", icon: WashingMachine },
  { name: "Refrigeration Repair", short: "Refrigerator", icon: Refrigerator },
  { name: "Cooktop / Dishwasher Repair", short: "Cooktop / Dishwasher", icon: CookingPot },
  { name: "House Duct Cleaning", short: "Duct Cleaning", icon: Wind },
];

const timeWindows: { label: string; short: string; icon: LucideIcon }[] = [
  { label: "First Available / Urgent Dispatch", short: "ASAP", icon: Zap },
  { label: "Morning (8:00 AM - 12:00 PM)", short: "Morning", icon: Sunrise },
  { label: "Afternoon (12:00 PM - 4:00 PM)", short: "Afternoon", icon: Sun },
  { label: "Evening (4:00 PM - 7:30 PM)", short: "Evening", icon: Sunset },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white hover:border-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 text-base font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all";

const emptyForm = (service: string) => ({
  name: "",
  phone: "",
  email: "",
  service,
  address: "",
  zip: "",
  preferredDate: "",
  preferredTime: timeWindows[0].label,
  notes: "",
});

export default function ContactForm({ initialService = "" }: ContactFormProps) {
  const defaultService =
    coreServices.find((s) => s.name.toLowerCase() === initialService.toLowerCase())?.name ??
    coreServices[1].name;

  const [formData, setFormData] = useState(emptyForm(defaultService));
  const [showMore, setShowMore] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "Contact Form", ...formData }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Request failed");
      setTicketId(json.ticketId);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please call us to book.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl text-center space-y-5 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Request Received
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            Thank You, {formData.name.split(" ")[0]}!
          </h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
            We received your request for{" "}
            <strong className="text-slate-900">{formData.service}</strong>. Our dispatch coordinator will contact you at{" "}
            <strong className="text-slate-900">{formData.phone}</strong> shortly to confirm your appointment. A confirmation was sent to{" "}
            <strong className="text-slate-900">{formData.email}</strong>.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto text-left text-xs space-y-2">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Ticket ID:</span>
            <span className="font-mono font-bold text-emerald-700">{ticketId}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2 gap-3">
            <span className="text-slate-500 font-medium">Service:</span>
            <span className="font-bold text-slate-900 text-right">{formData.service}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-medium">Diagnostic Fee:</span>
            <span className="font-bold text-emerald-700 text-right">$89, credited toward repair</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:5714621813"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-full shadow-md transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Need Urgent Help? Call (571) 462-1813</span>
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setShowMore(false);
              setFormData(emptyForm(defaultService));
            }}
            className="px-5 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 bg-slate-100 rounded-full transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 px-6 sm:px-10 py-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">Book a Service</h3>
            <p className="text-xs sm:text-sm text-emerald-200/90 mt-1">
              Takes under a minute. We&apos;ll call to confirm your arrival window.
            </p>
          </div>
          <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            $89 credited to repair
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
        {/* 1. Service */}
        <fieldset>
          <legend className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">1</span>
            What do you need?
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {coreServices.map(({ name, short, icon: Icon }) => {
              const active = formData.service === name;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFormData({ ...formData, service: name })}
                  className={`min-w-0 flex items-center gap-2 p-2.5 sm:p-3 rounded-2xl border text-left transition-all active:scale-[0.97] ${
                    active
                      ? "border-emerald-600 bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/25"
                      : "border-slate-200 bg-white text-slate-800 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                >
                  <span
                    className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center ${
                      active ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                  <span className="min-w-0 break-words text-[13px] font-bold leading-tight">{short}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* 2. When */}
        <fieldset>
          <legend className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">2</span>
            When works best?
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {timeWindows.map(({ label, short, icon: Icon }) => {
              const active = formData.preferredTime === label;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFormData({ ...formData, preferredTime: label })}
                  className={`min-w-0 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl border text-[13px] font-bold transition-all active:scale-[0.97] ${
                    active
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-emerald-600"}`} />
                  {short}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* 3. Contact */}
        <fieldset>
          <legend className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">3</span>
            How do we reach you?
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              autoComplete="name"
              aria-label="Full name"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              aria-label="Phone number"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClass}
            />
            <input
              type="email"
              required
              autoComplete="email"
              aria-label="Email address"
              placeholder="Email (for your confirmation)"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              required
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={5}
              aria-label="ZIP code"
              placeholder="ZIP code"
              value={formData.zip}
              onChange={(e) => setFormData({ ...formData, zip: e.target.value.replace(/\D/g, "") })}
              className={inputClass}
            />
            <input
              type="text"
              required
              autoComplete="street-address"
              aria-label="Street address"
              placeholder="Street address (where we're coming)"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`${inputClass} sm:col-span-2`}
            />
          </div>
        </fieldset>

        {/* Optional details */}
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60">
          <button
            type="button"
            aria-expanded={showMore}
            onClick={() => setShowMore(!showMore)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-[13px] font-bold text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <span>
              Add a date &amp; notes{" "}
              <span className="font-medium text-slate-400">(optional, helps us prepare)</span>
            </span>
            <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${showMore ? "rotate-180" : ""}`} />
          </button>
          <div
            className={`grid transition-all duration-300 ease-out ${
              showMore ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-4 pb-4 space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <input
                    type="date"
                    aria-label="Preferred date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className={inputClass}
                    tabIndex={showMore ? 0 : -1}
                  />
                </div>
                <textarea
                  rows={3}
                  aria-label="Describe the issue"
                  placeholder="Brand, error code, leaking, strange sounds..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={`${inputClass} resize-none`}
                  tabIndex={showMore ? 0 : -1}
                />
              </div>
            </div>
          </div>
        </div>

        {submitError && (
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Submit */}
        <div className="space-y-3">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-70 text-white font-black text-base rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Book My Service</span>
              </>
            )}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            $89 diagnostic fee, credited 100% toward any approved repair. No obligation.
          </p>
        </div>
      </form>
    </div>
  );
}
