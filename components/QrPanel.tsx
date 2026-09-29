"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Phone, QrCode } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF, SOCIAL_LINKS } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "@/components/BrandIcons";

type Tab = "call" | "facebook" | "instagram";

const tabs: { id: Tab; label: string }[] = [
  { id: "call", label: "Call" },
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
];

const targets: Record<Tab, { value: string; title: string; caption: string }> = {
  call: { value: PHONE_HREF, title: "Scan to Call", caption: PHONE_DISPLAY },
  facebook: { value: SOCIAL_LINKS.facebook, title: "Scan for Facebook", caption: "Follow Eco Appliance Services" },
  instagram: { value: SOCIAL_LINKS.instagram, title: "Scan for Instagram", caption: "Follow Eco Appliance Services" },
};

/** 3-way toggle plus a client-side generated QR code. Empty social links show a placeholder, never a fake code. */
export default function QrPanel({ className = "" }: { className?: string }) {
  const [tab, setTab] = useState<Tab>("call");
  const [images, setImages] = useState<Partial<Record<Tab, string>>>({});
  const target = targets[tab];

  useEffect(() => {
    let cancelled = false;
    (Object.keys(targets) as Tab[]).forEach((id) => {
      const value = targets[id].value;
      if (!value) return;
      QRCode.toDataURL(value, { width: 220, margin: 1, errorCorrectionLevel: "M" })
        .then((url) => {
          if (!cancelled) setImages((prev) => ({ ...prev, [id]: url }));
        })
        .catch(() => {});
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const image = images[tab];

  return (
    <div className={`p-4 rounded-2xl bg-surface border border-line shadow-sm flex flex-col items-center text-center space-y-3 ${className}`}>
      <div role="tablist" aria-label="QR code type" className="flex items-center gap-1 p-1 bg-surface-alt rounded-full w-full">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`flex-1 py-1 text-[10px] font-bold rounded-full transition-colors ${
              tab === id ? "bg-primary text-on-primary shadow-xs" : "text-ink-soft hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-32 h-32 p-2 rounded-xl border border-line bg-surface shadow-inner flex items-center justify-center">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- generated data URL, nothing for next/image to optimize
          <img src={image} alt={`QR code: ${target.title}`} className="w-full h-full" />
        ) : target.value ? (
          <QrCode className="w-8 h-8 text-muted animate-pulse" aria-hidden="true" />
        ) : (
          <span className="text-[11px] font-bold text-muted leading-tight">Link coming soon</span>
        )}
      </div>

      <div className="space-y-0.5">
        <p className="text-xs font-black text-ink flex items-center justify-center gap-1.5">
          {tab === "call" && <Phone className="w-3.5 h-3.5 text-primary" aria-hidden="true" />}
          {tab === "facebook" && <FacebookIcon className="w-3.5 h-3.5 text-primary" />}
          {tab === "instagram" && <InstagramIcon className="w-3.5 h-3.5 text-primary" />}
          {target.title}
        </p>
        <p className="text-[11px] text-muted">{target.caption}</p>
      </div>
    </div>
  );
}
