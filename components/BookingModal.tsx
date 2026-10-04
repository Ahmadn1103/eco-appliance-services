"use client";

import { useEffect, useState } from "react";
import { Calendar, CheckCircle2, Loader2, Phone, ShieldCheck, Tag, X } from "lucide-react";
import { bookingOptions, coreServices } from "@/lib/services";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Service name (panel title or tile name) to preselect. */
  initialAppliance?: string;
  /** Prefilled into the issue box (e.g. the chosen maintenance bundle). */
  initialNotes?: string;
}

const fieldClass =
  "w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-line text-[15px] text-ink placeholder:text-muted outline-none transition-colors hover:border-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15";
const labelClass = "block text-[13px] font-semibold uppercase tracking-wide text-ink mb-1.5";

/** Red asterisk after a label; every field in this form is required. */
const Req = () => (
  <span className="text-danger" aria-hidden="true">
    {" "}*
  </span>
);

function matchService(init: string) {
  const lower = init.trim().toLowerCase();
  if (!lower) return "";
  // An exact dropdown option (a service title or a full bundle option) wins.
  const exact = bookingOptions.find((o) => o.toLowerCase() === lower);
  if (exact) return exact;
  const found = coreServices.find(
    (s) => s.id === lower || s.title.toLowerCase() === lower || s.tileName?.toLowerCase() === lower,
  );
  // A plain maintenance service has no single option (the customer picks a bundle), so leave the placeholder.
  return found && !found.bundles ? found.title : "";
}

/** Opens fresh each time (the parent unmounts it when closed), so the form state needs no reset logic. */
function BookingForm({
  onClose,
  initialAppliance = "",
  initialNotes = "",
}: Omit<BookingModalProps, "isOpen">) {
  const [form, setForm] = useState({
    service: matchService(initialAppliance),
    name: "",
    email: "",
    phone: "",
    zip: "",
    notes: initialNotes,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ticketId, setTicketId] = useState("");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // Lock page scroll behind the modal and close on Escape.
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.service) return setError("Please choose a service.");
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!form.email.trim()) return setError("Please enter your email address.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError("Please enter a valid email address.");
    if (!form.phone.trim()) return setError("Please enter your phone number.");
    if (!/^\d{5}$/.test(form.zip.trim())) return setError("Please enter a valid 5-digit ZIP code.");
    if (!form.notes.trim()) return setError("Please enter your appliance brand, model and the issue.");

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Instant Booking Modal",
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          zip: form.zip,
          notes: form.notes,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Booking request failed");
      setTicketId(json.ticketId ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : `Something went wrong. Please call ${PHONE_DISPLAY}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/70 sm:backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 touch-pan-y overscroll-none"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Schedule dispatch"
        className="w-full max-w-lg max-h-[calc(100dvh-1.5rem)] overflow-y-auto overflow-x-hidden rounded-3xl bg-surface shadow-2xl border border-line"
      >
        <div className="flex items-center justify-between gap-3 px-6 py-4 bg-surface-alt border-b border-line">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Calendar className="w-5 h-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold leading-tight">Schedule Dispatch</h3>
              <p className="text-xs font-medium text-primary-strong leading-snug">
                $89 Diagnostic (100% Credited With Repair)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="icon-btn p-2 rounded-full text-muted hover:text-ink hover:bg-surface"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {ticketId ? (
          <div className="p-8 text-center space-y-4">
            <span className="w-14 h-14 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-xl font-black">Request received, {form.name.trim().split(" ")[0]}!</h4>
              <p className="text-sm text-ink-soft mt-1.5">
                Dispatch will call or text <strong className="text-ink whitespace-nowrap">{form.phone}</strong> shortly to confirm
                your arrival window.
              </p>
            </div>
            <p className="inline-flex items-center gap-2 rounded-xl bg-surface-alt border border-line px-3 py-2 text-xs">
              <span className="text-muted font-medium">Ticket</span>
              <span className="font-mono font-bold text-primary-strong">{ticketId}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href={PHONE_HREF}
                className="pressable inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-strong text-on-primary text-sm font-bold whitespace-nowrap"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Urgent? Call {PHONE_DISPLAY}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="pressable px-5 py-2.5 rounded-full bg-surface-alt border border-line text-sm font-bold"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4" noValidate>
            <div>
              <label htmlFor="bk-service" className={labelClass}>
                Appliance Service Needed<Req />
              </label>
              <select
                id="bk-service"
                required
                value={form.service}
                onChange={set("service")}
                className={`${fieldClass} ${form.service ? "" : "text-muted"}`}
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
            </div>

            <div>
              <label htmlFor="bk-name" className={labelClass}>
                Your Name<Req />
              </label>
              <input
                id="bk-name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={set("name")}
                placeholder="Full Name"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="bk-email" className={labelClass}>
                Email Address<Req />
              </label>
              <input
                id="bk-email"
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                placeholder="name@email.com"
                className={fieldClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="bk-phone" className={labelClass}>
                  Phone Number<Req />
                </label>
                <input
                  id="bk-phone"
                  required
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="(555) 123-4567"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="bk-zip" className={labelClass}>
                  DMV ZIP Code<Req />
                </label>
                <input
                  id="bk-zip"
                  required
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={form.zip}
                  onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value.replace(/\D/g, "") }))}
                  placeholder="e.g. 22102, 20001"
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="bk-notes" className={labelClass}>
                Appliance Brand, Model &amp; Issue Description<Req />
              </label>
              <textarea
                id="bk-notes"
                required
                rows={2}
                maxLength={1000}
                value={form.notes}
                onChange={set("notes")}
                placeholder="e.g. Samsung, model RF28R7551SR, refrigerator not cooling"
                className={`${fieldClass} resize-none`}
              />
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-tint border border-line-tint px-3.5 py-2.5 text-sm">
              <span className="inline-flex items-center gap-1.5 font-bold text-primary-strong">
                <Tag className="w-4 h-4" aria-hidden="true" />
                $89 Diagnostic
              </span>
              <span className="inline-flex items-center gap-1.5 text-ink-soft">
                <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
                30-Day Warranty
              </span>
            </div>

            {error && (
              <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-cta w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-5 py-3 rounded-xl font-bold text-base shadow-md shadow-primary/25 disabled:opacity-70"
            >
              {submitting && <Loader2 className="relative z-10 w-4 h-4 animate-spin" aria-hidden="true" />}
              <span className="relative z-10">{submitting ? "Sending..." : "Confirm Dispatch Request"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function BookingModal({ isOpen, ...rest }: BookingModalProps) {
  if (!isOpen) return null;
  return <BookingForm {...rest} />;
}
