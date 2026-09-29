import {
  Flame,
  WashingMachine,
  Refrigerator,
  CookingPot,
  Wind,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  /** Shorter label for the tile when the panel title is long. */
  tileName?: string;
  icon: LucideIcon;
  badge: string;
  quickSummary: string;
  keyFixes: string[];
  turnaround: string;
  /** Home warranty is informational: it has a call/claim panel instead of the booking form. */
  isWarranty?: boolean;
}

// Core service lines that drive the tiles, the detail panel and the footer links.
export const services: Service[] = [
  {
    id: "dryer-vent",
    title: "Dryer Vent Cleaning",
    icon: Flame,
    badge: "FIRE SAFETY",
    quickSummary:
      "We remove dangerous lint buildup from inside your wall ducts out to the roof. Your clothes dry in a single cycle, your power bill drops, and your home stays safe from dryer fires.",
    keyFixes: [
      "Cuts drying time down to 1 quick cycle",
      "Eliminates #1 cause of home appliance fires",
      "Clears deep lint from wall & roof vents",
    ],
    turnaround: "Full Rotary Clean in 45 mins",
  },
  {
    id: "laundry",
    title: "Laundry (Washer) Repair",
    icon: WashingMachine,
    badge: "SAME-DAY WASHER",
    quickSummary:
      "We fix washers that won't spin, won't drain, or leak water onto your floor. Fast repairs with factory OEM parts so your laundry routine gets right back on track.",
    keyFixes: [
      "Drain pump & standing water clogs",
      "Violent shaking & unbalanced spin cycles",
      "Door latch locks & digital error codes",
    ],
    turnaround: "Same-Day Dispatch • 45–90 min fix",
  },
  {
    id: "refrigeration",
    title: "Refrigeration Repair",
    icon: Refrigerator,
    badge: "PRIORITY COOLING",
    quickSummary:
      "When your fridge stops cooling or the freezer freezes over, we arrive fast to protect your groceries. Certified service on all luxury and standard refrigerator brands.",
    keyFixes: [
      "Warm fridge / freezing back wall",
      "Noisy compressor & defrost board faults",
      "Ice maker jams & water leaks",
    ],
    turnaround: "Priority 2–4 Hr Emergency Response",
  },
  {
    id: "cooktop-dishwasher",
    title: "Cooktop / Dishwasher Repair",
    icon: CookingPot,
    badge: "KITCHEN PROS",
    quickSummary:
      "We repair clicking gas igniters, cold burners, and dishwashers leaving dirty standing water. Safe gas-tight connections and spotless clean dishes guaranteed.",
    keyFixes: [
      "Clicking or non-igniting gas burners",
      "Dishwasher drainage & water leaks",
      "Dishes coming out cloudy or greasy",
    ],
    turnaround: "Same-Day Dispatch • 60 min fix",
  },
  {
    id: "house-duct",
    title: "House Duct Cleaning",
    icon: Wind,
    badge: "HVAC AIR QUALITY",
    quickSummary:
      "We vacuum dust, pet dander, and allergens out of your whole HVAC duct system using medical-grade HEPA negative air machines. Fresh, odor-free air in every room.",
    keyFixes: [
      "Removes trapped dust, pollen & pet dander",
      "Improves HVAC airflow & reduces energy bills",
      "Sanitizes supply & return air vents",
    ],
    turnaround: "Whole-Home Clean in 2–3 hrs",
  },
  {
    id: "home-warranty",
    title: "Have a Home Warranty Claim?",
    tileName: "Home Warranty",
    icon: ShieldCheck,
    badge: "ALL MAJOR PROVIDERS",
    isWarranty: true,
    quickSummary:
      "We work with American Home Shield, Choice, First American, and other top providers. We file documentation and bill parts directly through your warranty.",
    keyFixes: ["Zero paperwork hassle for you", "Factory-certified replacement parts"],
    turnaround: "Have a Home Warranty Claim? Call us",
  },
];

export const coreServices = services.filter((s) => !s.isWarranty);
