"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Phone, Calendar, Menu, X, Sparkles, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Strict 3-page navigation matching contract scope
  const navPages = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.location.href = "/contact#schedule";
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto">
        {/* Floating Glass Pill */}
        <div
          className={`pointer-events-auto transition-all duration-300 rounded-full px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border ${
            isScrolled
              ? "bg-white/90 backdrop-blur-2xl border-white/80 shadow-[0_16px_40px_-8px_rgba(15,23,42,0.15)] ring-1 ring-slate-900/5"
              : "bg-white/80 backdrop-blur-xl border-white/60 shadow-[0_12px_32px_-6px_rgba(15,23,42,0.1)]"
          }`}
        >
          {/* Brand Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white border border-slate-200/90 shadow-xs p-0.5 group-hover:scale-105 transition-transform flex items-center justify-center">
              <Image
                src="/logo.jpeg"
                alt="Eco Appliance Services"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-950 group-hover:text-emerald-700 transition-colors">
                  Eco <span className="text-emerald-600">Appliance</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  HVAC & Repair
                </span>
              </div>
              <span className="hidden md:inline text-[11px] text-slate-500 font-medium -mt-0.5">
                Appliance repairs? Leave it to us.
              </span>
            </div>
          </Link>

          {/* Desktop 3-Page Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-full border border-slate-200/60 backdrop-blur-md">
            {navPages.map((page) => {
              const isActive =
                page.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(page.href);

              return (
                <Link
                  key={page.name}
                  href={page.href}
                  className={`px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-slate-950 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/80"
                  }`}
                >
                  {page.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="tel:5714621813"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-md active:scale-95 rounded-full transition-all border border-emerald-200"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>(571) 462-1813</span>
            </a>

            <button
              onClick={handleBookingClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 rounded-full shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Service</span>
            </button>
          </div>

          {/* Mobile Actions: Call & Menu Toggle */}
          <div className="flex sm:hidden items-center gap-1.5">
            <a
              href="tel:5714621813"
              className="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-full transition-colors border border-emerald-200"
              aria-label="Call (571) 462-1813"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={handleBookingClick}
              className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 active:scale-95 rounded-full shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-slate-950 rounded-full bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Glass Menu */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto mt-2 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 p-4 shadow-[0_20px_45px_-10px_rgba(15,23,42,0.18)] animate-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Menu Navigation (3 Pages)
                </span>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Same-Day Dispatch
                </span>
              </div>

              {navPages.map((page) => {
                const isActive =
                  page.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(page.href);

                return (
                  <Link
                    key={page.name}
                    href={page.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 text-sm font-bold rounded-2xl flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-slate-950 text-white"
                        : "text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <span>{page.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <a
                  href="tel:5714621813"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-2xl border border-slate-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  Call Urgent Dispatch: (571) 462-1813
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleBookingClick();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Repair Online
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
