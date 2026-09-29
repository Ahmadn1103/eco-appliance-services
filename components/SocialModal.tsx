"use client";

import { useEffect, useState } from "react";
import { QrCode, X } from "lucide-react";
import QrPanel from "@/components/QrPanel";

export default function SocialModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const close = () => {
    setLeaving(true);
    setTimeout(() => {
      setLeaving(false);
      onClose();
    }, 180);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLeaving(true);
        setTimeout(() => {
          setLeaving(false);
          onClose();
        }, 180);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Scan to call or follow us"
      className={`menu-veil ${leaving ? "is-leaving" : ""} fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className={`menu-panel ${leaving ? "is-leaving" : ""} relative w-full max-w-sm bg-surface rounded-3xl shadow-2xl border border-line overflow-hidden p-6`}>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="icon-btn absolute top-4 right-4 p-2 rounded-full bg-surface-alt border border-line"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-line-tint text-primary-strong text-xs font-bold uppercase tracking-wider shadow-xs mb-2">
            <QrCode className="w-3.5 h-3.5" aria-hidden="true" />
            Scan
          </div>
          <h3 className="text-lg font-black tracking-tight">Call or follow us</h3>
          <p className="text-xs text-ink-soft mt-1">Point your phone camera at the code.</p>
        </div>
        <QrPanel className="border-0 shadow-none p-0" />
      </div>
    </div>
  );
}
