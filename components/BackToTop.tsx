"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating back-to-top button that appears once the visitor has scrolled past the hero. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`icon-btn fixed bottom-5 right-4 sm:right-6 z-40 w-11 h-11 rounded-full bg-surface/95 backdrop-blur border border-line shadow-lg text-primary-strong hover:border-primary flex items-center justify-center transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
