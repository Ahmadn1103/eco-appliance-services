"use client";

import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Phone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Sunrise,
  Sun,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";
import { bookableServices, findBookableService } from "@/lib/services";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAppliance?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialAppliance = "",
}: BookingModalProps) {
  const timeOptions: { label: string; icon: LucideIcon }[] = [
    { label: "ASAP / Same-Day Dispatch", icon: Zap },
    { label: "Morning (8 AM - 12 PM)", icon: Sunrise },
    { label: "Afternoon (12 PM - 5 PM)", icon: Sun },
    { label: "Next Available Day", icon: CalendarDays },
  ];

  const getInitialService = (init: string) => (findBookableService(init) ?? bookableServices[0]).name;

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(bookableServices[0].name);
  const [timePreference, setTimePreference] = useState("ASAP / Same-Day Dispatch");
  const [customDate, setCustomDate] = useState("");
  
  // Warranty Claim Option
  const [isWarranty, setIsWarranty] = useState(false);
  const [warrantyCompany, setWarrantyCompany] = useState("American Home Shield");
  const [warrantyClaimNumber, setWarrantyClaimNumber] = useState("");

  // Customer Contact & Address
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    zip: "",
    notes: "",
  });

  const [confirmationCode, setConfirmationCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Lock the page behind the modal so touch drags never move the background (or scroll sideways).
  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (initialAppliance) {
      setSelectedService(getInitialService(initialAppliance));
      // If user specifically clicked a service button, take them straight to contact/address step!
      setStep(2);
    } else {
      setStep(1);
    }
  }, [initialAppliance, isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitError("Please enter your name and phone number so dispatch can confirm.");
      return;
    }
    if (!formData.address.trim() || !formData.zip.trim()) {
      setSubmitError("Please enter your address and DMV ZIP code for technician dispatch.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const chosenServiceObj = bookableServices.find((s) => s.name === selectedService) || bookableServices[0];
    const finalBilling = isWarranty
      ? `Home Warranty: ${warrantyCompany}${warrantyClaimNumber ? ` (Claim #${warrantyClaimNumber})` : ""}`
      : "Direct Homeowner (Diagnostic credited to repair)";

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Instant Booking Modal",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: chosenServiceObj.name,
          issue: chosenServiceObj.desc,
          billing: finalBilling,
          address: formData.address,
          zip: formData.zip,
          preferredDate: customDate || "Earliest Available",
          preferredTime: timePreference,
          notes: formData.notes,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Booking request failed");
      setConfirmationCode(json.ticketId || `ECO-DMV-${Math.floor(1000 + Math.random() * 9000)}`);
      setStep(3);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please call (571) 462-1813 to schedule immediately.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setConfirmationCode("");
    setSubmitError("");
    onClose();
  };

  const currentServiceObj = bookableServices.find((s) => s.name === selectedService) || bookableServices[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 sm:backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-hidden touch-pan-y overscroll-none">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative sm:animate-in sm:zoom-in-95 sm:duration-200">

        {/* Top Header */}
        <div className="shrink-0 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 px-4 sm:px-6 py-3 sm:py-5 text-white flex items-center justify-between gap-2 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                Schedule Service Dispatch
              </h3>
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Same-Day Available Across DC, MD & VA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Step Visual Bar */}
        {step < 3 && (
          <div className="shrink-0 px-4 sm:px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`flex items-center gap-1.5 cursor-pointer ${
                step === 1 ? "text-emerald-700 font-extrabold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                step === 1 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"
              }`}>1</span>
              <span>Select Service</span>
            </button>

            <span className="text-slate-300">→</span>

            <div
              className={`flex items-center gap-1.5 ${
                step === 2 ? "text-emerald-700 font-extrabold" : "text-slate-400"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                step === 2 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"
              }`}>2</span>
              <span>Address & Confirm</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div key={step} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y scroll-smooth p-4 sm:p-6 [-webkit-overflow-scrolling:touch]">

          {/* STEP 1: CHOOSE SERVICE & TIME */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-extrabold text-slate-900 mb-1">
                  What service do you need?
                </p>
                <p className="text-xs text-slate-500 mb-3">
                  Tap the service you need below:
                </p>

                <div className="space-y-2">
                  {bookableServices.map((svc) => {
                    const isSelected = selectedService === svc.name;
                    const SvcIcon = svc.icon;
                    return (
                      <button
                        key={svc.name}
                        type="button"
                        onClick={() => setSelectedService(svc.name)}
                        className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-xs"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "bg-emerald-50 border-emerald-100 text-emerald-600"
                          }`}>
                            <SvcIcon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-[13px] font-extrabold text-slate-950 leading-snug">
                              {svc.name}
                            </span>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              {svc.desc}
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2 self-center" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Time Selector */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                  Preferred Arrival Window:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {timeOptions.map(({ label, icon: TimeIcon }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setTimePreference(label)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 ${
                        timePreference === label
                          ? "border-emerald-600 bg-emerald-600 text-white shadow-xs"
                          : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <TimeIcon className={`w-4 h-4 shrink-0 ${timePreference === label ? "text-white" : "text-emerald-600"}`} />
                      <span className="leading-snug">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Diagnostic Fee */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>$89 diagnostic fee</strong>, credited 100% toward your repair when you approve the service.
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <span>Continue to Address & Contact</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-500 mt-2 font-medium">
                  Takes less than 15 seconds • No payment required upfront
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: ADDRESS & CONTACT (FAST 15-SECOND FORM) */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Selected Service Summary Pill */}
              <div className="p-2.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <currentServiceObj.icon className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs font-black text-slate-900">
                      {currentServiceObj.name}
                    </p>
                    <p className="text-[11px] text-emerald-800 font-semibold">
                      {timePreference}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-900 underline cursor-pointer px-2 py-1"
                >
                  Change
                </button>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(703) 555-0123"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Address & DMV ZIP */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Street Address (DC, MD, VA) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="123 Main St, Apt 4B"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    DMV ZIP *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    placeholder="20001"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full p-2.5 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Optional Email & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email <span className="font-normal text-slate-400">(for receipt)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Specific Date <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full p-2.5 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium bg-white"
                  />
                </div>
              </div>

              {/* Optional Home Warranty Accordion */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isWarranty}
                    onChange={(e) => setIsWarranty(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    I have a Home Warranty (AHS, Choice, First American, etc.)
                  </span>
                </label>

                {isWarranty && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <select
                      value={warrantyCompany}
                      onChange={(e) => setWarrantyCompany(e.target.value)}
                      className="p-2 text-base rounded-xl border border-slate-300 bg-white font-medium outline-none"
                    >
                      <option value="American Home Shield">American Home Shield</option>
                      <option value="Choice Home Warranty">Choice Home Warranty</option>
                      <option value="First American Home Warranty">First American Home Warranty</option>
                      <option value="2-10 Home Buyers Warranty">2-10 Home Buyers Warranty</option>
                      <option value="Select Home Warranty">Select Home Warranty</option>
                      <option value="Cinch Home Services">Cinch Home Services</option>
                      <option value="Liberty Home Guard">Liberty Home Guard</option>
                      <option value="Other Warranty Company">Other Warranty Provider</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Claim # (if filed)"
                      value={warrantyClaimNumber}
                      onChange={(e) => setWarrantyClaimNumber(e.target.value)}
                      className="p-2 text-xs rounded-xl border border-slate-300 bg-white font-medium outline-none"
                    />
                  </div>
                )}
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {submitError}
                </div>
              )}

              {/* Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Dispatching to Coordinator...
                    </span>
                  ) : (
                    <>
                      <span>Confirm & Dispatch Appointment</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    100% Diagnostic Credit on Repair
                  </span>
                  <span>30-Day Parts & Labor Warranty</span>
                </div>

                <div className="pt-2 text-center border-t border-slate-100">
                  <a
                    href="tel:5714621813"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Prefer to book over the phone? Call (571) 462-1813</span>
                  </a>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: CONFIRMATION SUCCESS */}
          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Technician Dispatched
                </span>
                <h3 className="text-2xl font-black text-slate-950 mt-2">
                  Appointment Confirmed!
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto mt-1">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our DMV dispatch coordinator is reviewing your request and will call or text you shortly.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500">Service Ticket ID:</span>
                  <span className="font-mono font-bold text-emerald-700">{confirmationCode}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-900">{currentServiceObj.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500">Window:</span>
                  <span className="font-bold text-slate-900">{timePreference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[160px]">
                    {formData.address}, {formData.zip}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <a
                  href="tel:5714621813"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Dispatch (571) 462-1813</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
