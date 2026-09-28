"use client";

import { ShieldCheck, CheckCircle2, FileText, PhoneCall, Check } from "lucide-react";

export default function WarrantyPartners({ onOpenBooking }: { onOpenBooking: () => void }) {
  const warrantyPartners = [
    { name: "American Home Shield", tag: "Authorized Network" },
    { name: "Choice Home Warranty", tag: "Preferred Provider" },
    { name: "First American Home Warranty", tag: "Approved Vendor" },
    { name: "2-10 Home Buyers Warranty", tag: "Certified Partner" },
    { name: "Select Home Warranty", tag: "Direct Dispatch" },
    { name: "Cinch Home Services", tag: "Network Contractor" },
    { name: "Liberty Home Guard", tag: "Authorized Repair" },
    { name: "ARW Home (American Residential)", tag: "Preferred Tech" },
    { name: "America's Preferred Home Warranty", tag: "Independent Dispatch" },
    { name: "Landmark Home Warranty", tag: "Approved Network" },
  ];

  return (
    <section id="warranty" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Home Warranty Specialists
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            We Proudly Work With <span className="text-emerald-700">10+ Home Warranty</span> Companies
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Have an active home warranty? We streamline your claim, handle direct documentation with your provider, and complete the repair with factory-certified OEM parts.
          </p>
        </div>

        {/* Warranty Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-12">
          {warrantyPartners.map((partner, index) => (
            <div
              key={index}
              className="group p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition-all duration-200 flex flex-col items-center text-center shadow-2xs hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-slate-100 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform text-emerald-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-emerald-800">
                {partner.name}
              </h3>
              <span className="mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                {partner.tag}
              </span>
            </div>
          ))}
        </div>

        {/* 3 Step Warranty Guide Box */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                  Quick Guide
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  How to Request Eco Appliance Services for Your Warranty Claim
                </h3>
              </div>
              <button
                onClick={onOpenBooking}
                className="shrink-0 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-full text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                File Claim Info With Us
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-sm">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Submit Claim to Warranty</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Contact your home warranty company online or by phone to open an appliance repair work order.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-sm">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Request Eco Appliance Services</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Ask your warranty representative to dispatch Eco Appliance Services as your preferred DMV contractor.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-sm">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">We Fix It & Bill Direct</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    We arrive promptly, diagnose the issue, and coordinate approved parts & labor directly with your insurer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
