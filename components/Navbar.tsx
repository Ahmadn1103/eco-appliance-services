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
  // While a nav click is scrolling the page, ignore the section observer so the chip does not step through every section on the way.
  const scrollLock = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const goTo = useCallback((id: string) => {
    setActive(id);
    scrollLock.current = true;
    clearTimeout(lockTimer.current);
    // `scrollend` releases the lock; the timeout is a fallback for browsers without it.
    lockTimer.current = setTimeout(() => {
      scrollLock.current = false;
    }, 1500);
  }, []);

  const closeMenu = useCallback(() => {
    setLeaving(true);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      setMenuOpen(false);
      setLeaving(false);
    }, 90);
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
          if (entry.isIntersecting && !scrollLock.current) setActive(entry.target.id);
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

  useEffect(() => {
    const release = () => {
      scrollLock.current = false;
      clearTimeout(lockTimer.current);
    };
    window.addEventListener("scrollend", release);
    return () => {
      window.removeEventListener("scrollend", release);
      clearTimeout(lockTimer.current);
    };
  }, []);

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
          className="max-w-7xl mx-auto pointer-events-auto border border-line/90 bg-surface sm:bg-surface/95 sm:backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.08),0_2px_10px_rgba(32,147,120,0.08)] rounded-[1.75rem]"
        >
          <div className="px-3 min-[400px]:px-3.5 sm:px-5 py-1.5 sm:py-1 flex items-center justify-between gap-1.5 min-[400px]:gap-2 sm:gap-4">
            {/* Logo: transparent PNGs, no box. Phones get the emblem plus live text; sm+ gets the full lockup. */}
            <a href="#home" className="flex items-center gap-1.5 min-[400px]:gap-2 group min-w-0 shrink sm:shrink-0" aria-label="Eco Appliance Services, home">
              <Image
                src="/logo-emblem.png"
                alt=""
                width={711}
                height={503}
                priority
                className="sm:hidden h-9 min-[400px]:h-11 w-auto shrink-0 object-contain transition-transform group-active:scale-95"
              />
              <div className="sm:hidden flex flex-col leading-none min-w-0">
                <span className="text-[11px] min-[400px]:text-xs font-black tracking-tight text-primary whitespace-nowrap">
                  Eco Appliance
                </span>
                <span className="mt-1 text-[8px] font-black tracking-[0.2em] uppercase text-muted">Services</span>
              </div>
              <Image
                src="/logo-full.png"
                alt=""
                width={711}
                height={673}
                priority
                className="hidden sm:block h-20 w-auto object-contain transition-transform group-hover:scale-105 group-active:scale-95"
              />
            </a>

            {/* Desktop segmented chip nav */}
            <nav aria-label="Primary" className="hidden lg:flex bg-surface-alt/90 border border-line p-1 rounded-full">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => goTo(link.id)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`nav-chip px-2.5 xl:px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
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
            <div className="flex items-center gap-1 min-[400px]:gap-1.5 sm:gap-2 shrink-0">
              {/* Call: full-number pill at 2xl+, stacked icon badge on lg and below 2xl, plain button on phones */}
              <a
                href={PHONE_HREF}
                className="pressable hidden 2xl:inline-flex items-center gap-1.5 rounded-full bg-surface-alt border border-line px-3 py-1.5 text-xs font-bold whitespace-nowrap hover:border-primary"
              >
                <Phone className="pressable-icon w-3.5 h-3.5 text-primary" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={PHONE_HREF}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="pressable hidden lg:flex 2xl:hidden flex-col items-center justify-center gap-0.5 min-w-[3rem] rounded-2xl bg-primary px-1.5 py-1.5 text-on-primary hover:bg-primary-strong"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-[9px] font-bold uppercase leading-none">Call</span>
              </a>
              <a
                href={PHONE_HREF}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="pressable sm:hidden inline-flex items-center gap-1 rounded-full bg-primary hover:bg-primary-strong text-on-primary px-2.5 min-[400px]:px-3 py-2.5 text-xs font-bold whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                Call
              </a>
              <button
                type="button"
                onClick={() => openBooking()}
                className="btn-cta inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-2.5 min-[400px]:px-3 sm:px-4 py-2.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-md shadow-primary/30"
              >
                <Calendar className="relative z-10 w-3.5 h-3.5" aria-hidden="true" />
                <span className="relative z-10 sm:hidden">Book</span>
                <span className="relative z-10 hidden sm:inline">Book Service</span>
              </button>
              <button
                type="button"
                onClick={openSocial}
                aria-label="Scan QR code to follow us"
                className="icon-btn hidden lg:inline-flex p-2 rounded-full bg-surface-alt border border-line text-ink-soft hover:border-primary hover:text-primary"
              >
                <QrCode className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen && !leaving}
                className={`icon-btn lg:hidden shrink-0 p-1.5 sm:p-2 rounded-full border ${
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
          {/* Always mounted so the height can animate; `inert` keeps the hidden links out of the tab order. */}
          <div className={`header-dropdown lg:hidden ${menuOpen && !leaving ? "is-open" : ""}`} inert={!(menuOpen && !leaving)}>
            <div className="overflow-hidden">
              <div className="px-3 pb-3">
              <div className="rounded-2xl bg-surface-alt border border-line p-1.5 space-y-1.5">
                <a
                  href={PHONE_HREF}
                  onClick={closeMenu}
                  className="pressable flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-strong text-on-primary px-3 py-3 whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
                  <span className="text-base font-black">{PHONE_DISPLAY}</span>
                </a>
                <div className="grid grid-cols-3 gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={() => {
                        goTo(link.id);
                        closeMenu();
                      }}
                      className={`pressable px-2 py-2.5 rounded-xl text-xs font-bold text-center ${
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
