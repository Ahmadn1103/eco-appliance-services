import { ShieldCheck } from "lucide-react";
import { brands } from "@/lib/site";

export default function BrandsStrip() {
  return (
    <section className="py-6 sm:py-9 bg-surface-alt/70 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-line-tint text-primary-strong text-xs font-black uppercase tracking-widest shadow-xs">
              Brands We Service
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-2">Every Major HVAC &amp; Appliance Brand</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-surface border border-line px-4 py-2 text-xs shadow-xs self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="font-bold">Genuine OEM parts</span>
          </div>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {brands.map(({ name, logo }) => (
            <li
              key={name}
              className="h-12 sm:h-16 rounded-xl p-2 sm:p-3 bg-surface border border-line flex items-center justify-center hover:border-primary hover:shadow-md transition-all duration-200"
            >
              {/* Plain <img>: these are small static SVGs, so next/image optimisation adds nothing. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt={name} loading="lazy" className="h-5 sm:h-8 w-full max-w-[7rem] object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
