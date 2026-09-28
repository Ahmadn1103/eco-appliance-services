"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import BookingModal from "@/components/BookingModal";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileText,
  Landmark,
  Building2,
  TreePine,
} from "lucide-react";

export default function ContactPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Floating Glass Pill Header */}
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            Direct Contact & Dispatch
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5.5xl font-black text-slate-950 tracking-tight leading-tight">
            Get in Touch with Eco Appliance Services
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
            Need urgent diagnosis, air duct sanitization, or warranty repair dispatch? Submit our quick customer inquiry form below or call our DMV dispatch team directly.
          </p>
        </div>
      </section>

      {/* Main Content: Form & Direct Information */}
      <section className="py-12 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
            {/* Left Column: Basic Contact Form (Contract Deliverable) */}
            <div id="schedule" className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right Column: Direct Dispatch & Hours */}
            <div className="lg:col-span-5 space-y-6">
              {/* Urgent Phone Dispatch Box */}
              <div className="rounded-3xl bg-slate-950 p-6 sm:p-8 text-white shadow-xl space-y-5 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                      Live Dispatch Phone
                    </span>
                    <h3 className="text-xl font-black text-white">Call for Same-Day Slot</h3>
                  </div>
                </div>

                <a
                  href="tel:5714621813"
                  className="block text-2xl sm:text-3xl font-black text-emerald-400 hover:text-emerald-300 transition-colors tracking-tight"
                >
                  (571) 462-1813
                </a>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Our service dispatchers monitor phone lines throughout Washington DC, Maryland, and Northern Virginia for priority emergency repairs and scheduled appointments.
                </p>

                <div className="pt-2 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      <strong className="text-white">Monday – Saturday:</strong> 7:30 AM – 8:00 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      <strong className="text-white">Sunday:</strong> Emergency Dispatch (Cooling / Flooding)
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Areas Card */}
              <div className="relative overflow-hidden rounded-3xl bg-white border border-emerald-100 shadow-lg shadow-emerald-900/5">
                <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700" />
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />

                <div className="relative p-6 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-600/25">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                          Primary DMV Service Coverage
                        </h4>
                        <p className="text-xs text-slate-500">Fast local response vans</p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      Same-day
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        icon: Landmark,
                        region: "Washington, DC",
                        areas: ["NW", "NE", "Georgetown", "Capitol Hill", "Dupont", "Adams Morgan", "Tenleytown"],
                      },
                      {
                        icon: Building2,
                        region: "Maryland",
                        areas: ["Bethesda", "Rockville", "Silver Spring", "Chevy Chase", "Potomac", "Gaithersburg"],
                      },
                      {
                        icon: TreePine,
                        region: "Northern Virginia",
                        areas: ["Arlington", "Alexandria", "McLean", "Fairfax", "Vienna", "Tysons", "Reston", "Ashburn"],
                      },
                    ].map(({ icon: RegionIcon, region, areas }) => (
                      <div
                        key={region}
                        className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-4 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <span className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors">
                            <RegionIcon className="w-4 h-4" />
                          </span>
                          <p className="font-extrabold text-sm text-slate-900">{region}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {areas.map((area) => (
                            <span
                              key={area}
                              className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 group-hover:border-emerald-200 group-hover:text-emerald-800 px-2.5 py-1 rounded-full transition-colors"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Home Warranty Claim Help */}
              <div className="rounded-3xl bg-emerald-50/70 p-6 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-black text-sm text-emerald-900">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>Have a Home Warranty Claim?</span>
                </div>
                <p className="leading-relaxed">
                  We work with American Home Shield, Choice Home Warranty, First American, and other major providers. File your claim and tell your provider to assign <strong>Eco Appliance Services</strong> as your authorized service contractor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQs */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Frequently Asked Questions About Service Calls
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Everything you need to know before our technician arrives at your door.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                How soon can someone arrive?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Same-day emergency response is available for active water leaks, refrigerator cooling failures, or dangerous dryer vent blockages. Standard slots are available next-day.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                What is your diagnostic guarantee?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our licensed technician thoroughly tests your appliance or ductwork and provides an upfront quote. When you approve the repair, the diagnostic fee is credited 100% to your bill.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                What warranty do I receive?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every repair completed by Eco Appliance Services is backed by a 90-day comprehensive parts and labor warranty using genuine manufacturer OEM parts.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                Do you clean multi-unit vents?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes! We service residential single-family homes, townhouses, condos, and multi-family residential dryer vents and house duct systems throughout DC, MD, and VA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onOpenBooking={() => setBookingOpen(true)} />


      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </main>
  );
}
