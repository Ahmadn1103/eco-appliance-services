import {
  Flame,
  WashingMachine,
  Refrigerator,
  CookingPot,
  Utensils,
  Wind,
  Wine,
  Wrench,
  Search,
  type LucideIcon,
} from "lucide-react";

/** A single thing a customer can book. Feeds the booking popup and the quick contact form. */
export interface BookableService {
  name: string;
  /** Shorter label for the tap-to-pick tiles. */
  short: string;
  icon: LucideIcon;
  desc: string;
}

export const bookableServices: BookableService[] = [
  {
    name: "Refrigerator & Freezer Repair",
    short: "Refrigerator / Freezer",
    icon: Refrigerator,
    desc: "Not cooling, freezing over, noisy or leaking",
  },
  {
    name: "Washer & Dryer Repair",
    short: "Washer / Dryer",
    icon: WashingMachine,
    desc: "Won't spin, drain or heat, leaks & error codes",
  },
  {
    name: "Oven, Range & Cooktop Repair",
    short: "Oven / Range / Cooktop",
    icon: CookingPot,
    desc: "Igniters, heating elements & temperature faults",
  },
  {
    name: "Dishwasher Repair",
    short: "Dishwasher",
    icon: Utensils,
    desc: "Drainage, leaks, cloudy dishes & error codes",
  },
  {
    name: "Appliance Installation",
    short: "Installation",
    icon: Wrench,
    desc: "Safe, code-compliant installation of any appliance",
  },
  {
    name: "Appliance Diagnosis & Troubleshooting",
    short: "Diagnosis",
    icon: Search,
    desc: "Not sure what's wrong? We'll find it and quote it",
  },
  {
    name: "Garbage Disposal, Ice Maker, Wine Cooler & Range Hood Repair",
    short: "Disposal / Ice Maker / Cooler / Hood",
    icon: Wine,
    desc: "Garbage disposals, ice makers, coolers & range hoods",
  },
  {
    name: "Dryer Vent Cleaning",
    short: "Dryer Vent Cleaning",
    icon: Flame,
    desc: "Clears lint to the outside, stops dryer fire hazards",
  },
  {
    name: "House Duct Cleaning",
    short: "House Duct Cleaning",
    icon: Wind,
    desc: "Whole-home dust, dander & allergen removal",
  },
];

export interface ServiceGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  /** Small label above the title. */
  badge: string;
  blurb: string;
  items: string[];
  /** Service preloaded in the booking popup. Omitted when the customer picks one inside it. */
  bookAs?: string;
}

// The three service lines, in display order: appliances first (the core business), then
// dryer vent, then duct cleaning. Drives the services section, hero picker and footer links.
export const serviceGroups: ServiceGroup[] = [
  {
    id: "appliance-repair",
    title: "Home Appliance Repair & Installation",
    icon: Refrigerator,
    badge: "Our Specialty",
    blurb:
      "Factory-certified repairs on the appliances your home depends on, with honest upfront diagnosis and a 30-day parts & labor warranty.",
    items: [
      "Refrigerator & Freezer Repair",
      "Washer & Dryer Repair",
      "Oven, Range & Cooktop Repair",
      "Dishwasher Repair",
      "Appliance Installation",
      "Appliance Diagnosis & Troubleshooting",
    ],
  },
  {
    id: "dryer-vent",
    title: "Dryer Vent Cleaning",
    icon: Flame,
    badge: "Fire Safety",
    blurb:
      "Lint buildup is a leading cause of dryer fires. We clear the vent so your clothes dry faster and your home stays safe.",
    items: ["Dryer Vent Cleaning", "Lint & Blockage Removal", "Dryer Vent Inspection"],
    bookAs: "Dryer Vent Cleaning",
  },
  {
    id: "house-duct",
    title: "House Duct Cleaning",
    icon: Wind,
    badge: "Cleaner Air",
    blurb:
      "We remove dust, pet dander and allergens from your ductwork for fresher air and better airflow in every room.",
    items: ["Residential Air Duct Cleaning", "HVAC Duct Cleaning", "Vent & Register Cleaning"],
    bookAs: "House Duct Cleaning",
  },
];

export interface ApplianceCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  items: string[];
}

// "Appliances We Service" listing shown under the repair card.
export const applianceCategories: ApplianceCategory[] = [
  {
    id: "kitchen",
    title: "Kitchen Appliances",
    icon: CookingPot,
    items: [
      "Refrigerators",
      "Freezers",
      "Ice Makers",
      "Dishwashers",
      "Ovens",
      "Wall Ovens",
      "Ranges",
      "Cooktops",
      "Gas Ranges",
      "Electric Ranges",
      "Induction Cooktops & Ranges",
      "Microwaves",
      "Over-the-Range Microwaves",
      "Range Hoods",
      "Garbage Disposals",
      "Trash Compactors",
    ],
  },
  {
    id: "laundry",
    title: "Laundry Appliances",
    icon: WashingMachine,
    items: [
      "Washing Machines",
      "Top-Load Washers",
      "Front-Load Washers",
      "Dryers",
      "Electric Dryers",
      "Gas Dryers",
      "Washer & Dryer Combos",
      "Stackable Washer & Dryer Units",
    ],
  },
  {
    id: "specialty",
    title: "Specialty & Other Home Appliances",
    icon: Wine,
    items: [
      "Wine Coolers",
      "Beverage Refrigerators",
      "Built-In Refrigerators",
      "Built-In Ice Makers",
      "Compact Refrigerators",
      "Under-Counter Refrigerators",
      "Under-Counter Freezers",
      "Dehumidifiers",
      "Portable Air Conditioners",
      "Garbage Disposals",
    ],
  },
];

/** Case-insensitive lookup used to preload a service into the booking popup or contact form. */
export function findBookableService(name?: string) {
  if (!name) return undefined;
  const lower = name.toLowerCase();
  return bookableServices.find((s) => s.name.toLowerCase() === lower);
}
