import { ShieldCheck } from "lucide-react";
import { brands } from "@/lib/site";

export default function BrandsStrip() {
  return (
    <section className="py-8 sm:py-14 bg-surface-alt/70 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-line-tint text-primary-strong text-xs font-bold uppercase tracking-wider shadow-xs">
              Brands We Service
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">Every Major HVAC &amp; Appliance Brand</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-surface border border-line px-4 py-2 text-xs shadow-xs self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="font-bold">Genuine OEM parts</span>
          </div>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4">
          {brands.map((brand) => (
            <li
              key={brand}
              className="group p-3 rounded-2xl border border-line bg-surface h-20 flex items-center justify-center text-center hover:border-primary hover:shadow-md hover:bg-surface-tint/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="text-xs sm:text-sm font-black tracking-tight group-hover:text-primary transition-colors">{brand}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
