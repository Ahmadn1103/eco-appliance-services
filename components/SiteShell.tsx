"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import BackToTop from "@/components/BackToTop";
import SocialModal from "@/components/SocialModal";

interface SiteContextValue {
  /** Opens the booking popup, optionally preloaded with a service name and a note (e.g. the chosen bundle). */
  openBooking: (service?: string, notes?: string) => void;
  /** Opens the scan-to-call / social QR popup. */
  openSocial: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteShell>");
  return ctx;
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [socialOpen, setSocialOpen] = useState(false);

  const openBooking = useCallback((next?: string, note?: string) => {
    setService(next ?? "");
    setNotes(note ?? "");
    setBookingOpen(true);
  }, []);

  const openSocial = useCallback(() => setSocialOpen(true), []);
  const closeSocial = useCallback(() => setSocialOpen(false), []);

  const value = useMemo(() => ({ openBooking, openSocial }), [openBooking, openSocial]);

  return (
    <SiteContext.Provider value={value}>
      <Navbar />
      {/* No top padding: the hero runs under the floating header so no bare page shows behind it. */}
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialAppliance={service}
        initialNotes={notes}
      />
      <SocialModal isOpen={socialOpen} onClose={closeSocial} />
    </SiteContext.Provider>
  );
}
