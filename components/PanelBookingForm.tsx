"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { bookingOptions } from "@/lib/services";

const timeWindows = [
  "First Available / Urgent Dispatch",
  "Morning (8:00 AM - 12:00 PM)",
  "Afternoon (12:00 PM - 4:00 PM)",
  "Evening (4:00 PM - 7:00 PM)",
];

const baseField =
  "w-full py-3 rounded-xl border border-line bg-surface text-sm text-ink placeholder:text-muted outline-none transition-colors hover:border-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15";
const fieldClass = `${baseField} pl-10 pr-3`;
const plainField = `${baseField} px-4`;
const iconClass = "w-4 h-4 text-muted absolute left-3.5 top-3.5 pointer-events-none";

interface PanelBookingFormProps {
  /** Service already chosen by a tile. Omit it to show a "Choose your service" dropdown instead (Contact section). */
  service?: string;
  title?: string;
  subtitle?: string;
}

/** Compact booking form used by the services panel and the Contact section. */
export default function PanelBookingForm({
  service: fixedService,
  title,
  subtitle = "Book online in seconds. Our dispatch desk will confirm your arrival window.",
}: PanelBookingFormProps) {
  const [form, setForm] = useState({
    service: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    time: timeWindows[0],
    brand: "",
    issue: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ticketId, setTicketId] = useState("");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const service = fixedService ?? form.service;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return setError("Please choose a service.");
    if (!form.name.trim() || !form.phone.trim()) return setError("Please enter your name and mobile phone.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError("Please enter a valid email address for your confirmation.");
    const zip = form.address.match(/\b\d{5}\b/)?.[0] ?? "";
    if (!form.address.trim() || !zip) return setError("Please enter your street address with a 5-digit ZIP code.");

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: fixedService ? "Services Panel Form" : "Contact Form",
          name: form.name,
          phone: form.phone,
          email: form.email,
          service,
          issue: form.issue,
          address: form.address,
          zip,
          preferredDate: form.date,
          preferredTime: form.time,
          notes: [form.brand && `Brand & model: ${form.brand}`, form.issue && `Issue: ${form.issue}`].filter(Boolean).join("\n"),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Request failed");
      setTicketId(json.ticketId ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : `Something went wrong. Please call ${PHONE_DISPLAY}.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (ticketId) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 text-center space-y-4">
        <span className="w-14 h-14 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-xl font-black">Request received, {form.name.trim().split(" ")[0]}!</h3>
          <p className="text-sm text-ink-soft mt-1.5">
            Dispatch will contact <strong className="text-ink whitespace-nowrap">{form.phone}</strong> shortly to confirm your
            arrival window for {service}.
          </p>
        </div>
        <p className="inline-flex items-center gap-2 rounded-xl bg-surface-alt border border-line px-3 py-2 text-xs">
          <span className="text-muted font-medium">Ticket</span>
          <span className="font-mono font-bold text-primary-strong">{ticketId}</span>
        </p>
        <div>
          <a
            href={PHONE_HREF}
            className="pressable inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-strong text-on-primary text-sm font-bold whitespace-nowrap"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Urgent? Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-line bg-surface p-5 sm:p-7 shadow-xs">
      <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">{title ?? `Book Your ${fixedService}`}</h3>
      <p className="text-sm sm:text-base text-ink-soft mt-1.5 mb-4">{subtitle}</p>

      {!fixedService && (
        <select
          required
          value={form.service}
          onChange={set("service")}
          aria-label="Service needed"
          className={`${plainField} mb-3 ${form.service ? "" : "text-muted"}`}
        >
          <option value="" disabled>
            Choose your service
          </option>
          {bookingOptions.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="relative">
          <User className={iconClass} aria-hidden="true" />
          <input
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            placeholder="Full name *"
            aria-label="Full name"
            className={fieldClass}
          />
        </div>
        <div className="relative">
          <Phone className={iconClass} aria-hidden="true" />
          <input
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="Mobile phone *"
            aria-label="Mobile phone"
            className={fieldClass}
          />
        </div>
        <div className="relative">
          <Mail className={iconClass} aria-hidden="true" />
          <input
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            placeholder="Email (for confirmation) *"
            aria-label="Email"
            required
            className={fieldClass}
          />
        </div>
        <div className="relative">
          <MapPin className={iconClass} aria-hidden="true" />
          <input
            type="text"
            autoComplete="street-address"
            value={form.address}
            onChange={set("address")}
            placeholder="Address & 5-digit ZIP *"
            aria-label="Street address and 5-digit ZIP"
            className={fieldClass}
          />
        </div>
        <div className="relative">
          <Calendar className={iconClass} aria-hidden="true" />
          <input
            type="date"
            value={form.date}
            onChange={set("date")}
            aria-label="Preferred date"
            className={`${fieldClass} ${form.date ? "" : "text-muted"}`}
          />
        </div>
        <div className="relative">
          <Clock className={iconClass} aria-hidden="true" />
          <select value={form.time} onChange={set("time")} aria-label="Preferred arrival window" className={fieldClass}>
            {timeWindows.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      </div>

      <input
        type="text"
        value={form.brand}
        onChange={set("brand")}
        placeholder="Brand & model (optional, e.g. Samsung, LG, GE)"
        aria-label="Brand and model"
        className={`${plainField} mt-3`}
      />
      <textarea
        rows={2}
        maxLength={1000}
        value={form.issue}
        onChange={set("issue")}
        placeholder="What is it doing? (e.g. not cooling, error code, leaking)"
        aria-label="What is it doing?"
        className={`${plainField} mt-3 resize-none`}
      />

      {error && (
        <p role="alert" className="mt-3 rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-cta mt-4 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-5 py-3 rounded-full font-extrabold text-sm sm:text-base shadow-md shadow-primary/25 disabled:opacity-70"
      >
        {submitting && <Loader2 className="relative z-10 w-4 h-4 animate-spin" aria-hidden="true" />}
        <span className="relative z-10">{submitting ? "Sending..." : "Confirm & Dispatch Technician"}</span>
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-soft text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
        $89 diagnostic fee, credited 100% toward an approved repair. No payment online.
      </p>
    </form>
  );
}
