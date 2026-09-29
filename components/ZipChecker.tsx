"use client";

import { useState } from "react";
import { CheckCircle2, MapPin, Search, TriangleAlert } from "lucide-react";
import { checkZip, type ZipResult } from "@/lib/service-area";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { useSite } from "@/components/SiteShell";

interface ZipCheckerProps {
  /** Service name passed to the booking popup when the ZIP is in area. */
  service?: string;
  className?: string;
}

/** ZIP availability checker: input + button + live feedback. */
export default function ZipChecker({ service, className = "" }: ZipCheckerProps) {
  const { openBooking } = useSite();
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<ZipResult | "idle">("idle");
  const [checked, setChecked] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setChecked(zip.trim());
    setResult(checkZip(zip));
  };

  return (
    <div className={className}>
      <form onSubmit={submit} className="flex gap-2" noValidate>
        <div className="relative flex-1">
          <MapPin className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={10}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/[^\d-]/g, ""));
              setResult("idle");
            }}
            aria-label="Your ZIP code"
            placeholder="Enter your ZIP code"
            className="w-full pl-10 pr-3 py-3 text-sm bg-surface border border-line rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-ink placeholder:text-muted"
          />
        </div>
        <button
          type="submit"
          className="pressable inline-flex items-center gap-1.5 px-5 py-3 bg-primary hover:bg-primary-strong text-on-primary rounded-full text-sm font-black shrink-0 shadow-xs"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
          Check
        </button>
      </form>

      <div aria-live="polite" className="mt-2.5">
        {result === "in" && (
          <div className="p-3 rounded-2xl border border-success/30 bg-success/10 text-xs sm:text-sm flex items-start gap-2.5 text-primary-strong">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <p>
              Good news, we serve {checked.slice(0, 5)}.{" "}
              <button type="button" onClick={() => openBooking(service)} className="font-bold underline underline-offset-2">
                Schedule your repair
              </button>
            </p>
          </div>
        )}
        {result === "out" && (
          <div className="p-3 rounded-2xl border border-warning/30 bg-warning/10 text-xs sm:text-sm flex items-start gap-2.5 text-ink">
            <TriangleAlert className="w-4 h-4 mt-0.5 shrink-0 text-warning" aria-hidden="true" />
            <p>
              {checked.slice(0, 5)} is outside our usual service area. Call us and we&apos;ll see what we can do:{" "}
              <a href={PHONE_HREF} className="font-bold underline underline-offset-2">
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        )}
        {result === "invalid" && (
          <div role="alert" className="p-3 rounded-2xl border border-danger/30 bg-danger/10 text-xs sm:text-sm flex items-start gap-2.5 text-danger">
            <TriangleAlert className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <p>Please enter a valid 5-digit ZIP code.</p>
          </div>
        )}
      </div>
    </div>
  );
}
