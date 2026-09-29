"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone, Calendar, Menu, QrCode, X } from "lucide-react";
import { navLinks, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { useSite } from "@/components/SiteShell";

export default function Navbar() {
  const { openBooking, openSocial } = useSite();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const closeMenu = useCallback(() => {
    setLeaving(true);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      setMenuOpen(false);
      setLeaving(false);
    }, 100);
  }, []);

  const toggleMenu = () => {
    if (menuOpen && !leaving) closeMenu();
    else {
      clearTimeout(leaveTimer.current);
      setLeaving(false);
      setMenuOpen(true);
    }
  };

  // Active link follows the section that is in view.
  useEffect(() => {
    const targets = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // Scroll-progress hairline (written straight to the DOM to avoid re-rendering on every scroll).
  useEffect(() => {
    const onScroll = () => {
      const el = progressRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  return (
    <>
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary via-primary to-accent"
      />

      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className={`menu-veil fixed inset-0 z-40 bg-ink/25 lg:hidden ${leaving ? "is-leaving" : ""}`}
        />
      )}

      <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 w-full px-3 sm:px-6 pointer-events-none">
        <div
          className={`max-w-6xl mx-auto pointer-events-auto border border-line/90 bg-surface lg:bg-surface/95 lg:backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] ${
            menuOpen ? "rounded-3xl" : "rounded-full"
          }`}
        >
          <div className="px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo lockup */}
            <a href="#home" className="flex items-center gap-2.5 group shrink-0" aria-label="Eco Appliance Services, home">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl border border-line bg-surface p-0.5 transition-transform group-hover:scale-105 group-active:scale-95">
                <Image src="/logo-mark.png" alt="" fill sizes="40px" className="object-contain" priority />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs sm:text-sm font-black tracking-tight text-ink group-hover:text-primary-strong transition-colors">
                  Eco <span className="text-primary">Appliance</span>
                </span>
                <span className="mt-1 text-[8px] sm:text-[9px] font-black tracking-[0.2em] uppercase text-muted">
                  Services
                </span>
              </div>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            </a>

            {/* Desktop segmented chip nav */}
            <nav aria-label="Primary" className="hidden lg:flex bg-surface-alt border border-line p-1 rounded-full">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`nav-chip px-4 py-1.5 rounded-full text-xs font-bold ${
                    active === link.id
                      ? "bg-primary text-on-primary shadow-xs"
                      : "text-ink-soft hover:text-ink hover:bg-surface"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href={PHONE_HREF}
                className="pressable hidden xl:inline-flex items-center gap-1.5 rounded-full bg-surface-alt border border-line px-3 py-1.5 text-xs font-bold hover:border-primary"
              >
                <Phone className="pressable-icon w-3.5 h-3.5 text-primary" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={PHONE_HREF}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="icon-btn xl:hidden p-1.5 sm:p-2 rounded-full bg-surface-alt border border-line text-primary hover:border-primary"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => openBooking()}
                className="btn-cta inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm"
              >
                <Calendar className="relative z-10 w-3.5 h-3.5" aria-hidden="true" />
                <span className="relative z-10 sm:hidden">Book</span>
                <span className="relative z-10 hidden sm:inline">Book Service</span>
              </button>
              <button
                type="button"
                onClick={openSocial}
                aria-label="Scan QR code to call or follow us"
                className="icon-btn hidden lg:inline-flex p-2 rounded-full bg-surface-alt border border-line text-ink-soft hover:border-primary hover:text-primary"
              >
                <QrCode className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen && !leaving}
                className={`icon-btn lg:hidden p-1.5 sm:p-2 rounded-full border ${
                  menuOpen && !leaving
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-surface-alt text-ink border-line"
                }`}
              >
                {menuOpen && !leaving ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile menu drops down inside the pill */}
          {menuOpen && (
            <div className={`header-dropdown lg:hidden px-3 pb-3 ${leaving ? "is-leaving" : ""}`}>
              <div className="rounded-2xl bg-surface-alt border border-line p-1.5">
                <div className="grid grid-cols-3 gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={closeMenu}
                      className={`menu-item pressable px-2 py-2.5 rounded-xl text-xs font-bold text-center ${
                        active === link.id
                          ? "bg-primary text-on-primary"
                          : "text-ink-soft hover:bg-surface hover:text-ink"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
