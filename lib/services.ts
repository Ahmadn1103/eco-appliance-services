import {
  AirVent,
  CalendarCheck,
  ChefHat,
  CircleDot,
  Fan,
  House,
  Microwave,
  Refrigerator,
  Rows2,
  ShieldCheck,
  Shirt,
  Snowflake,
  Sparkles,
  ThermometerSnowflake,
  Trash2,
  UtensilsCrossed,
  WashingMachine,
  Wind,
  Wine,
  Flame,
  type LucideIcon,
} from "lucide-react";

export interface Bundle {
  id: string;
  name: string;
  price: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  /** Shorter label for the tile and the booking forms when the panel title is long. */
  tileName?: string;
  icon: LucideIcon;
  /** Short uppercase tag shown in the panel header. */
  badge: string;
  /** One-line "common problems" note shown under the tile name from the sm breakpoint up. */
  note: string;
  quickSummary: string;
  keyFixes: string[];
  turnaround: string;
  /** Yearly maintenance bundles: when present the panel shows these instead of the contact form. */
  bundles?: Bundle[];
  /** Heading above keyFixes (defaults to "Key Fixes"). */
  highlightsLabel?: string;
  /** Not a grid tile: shown as a pill under the grid so the tiles fill whole rows. */
  extra?: boolean;
  /** Home warranty is informational: it has a call/claim panel instead of the booking form. */
  isWarranty?: boolean;
}

// Service lines that drive the tiles, the detail panel, the booking forms and the footer links.
export const services: Service[] = [
  {
    id: "refrigerator",
    title: "Refrigerator Repair",
    tileName: "Refrigerator",
    icon: Refrigerator,
    badge: "PRIORITY COOLING",
    note: "Cooling issues, leaks, not running",
    quickSummary:
      "When your fridge stops cooling or starts leaking, we arrive fast to protect your groceries. We service luxury and standard refrigerator brands.",
    keyFixes: [
      "Warm fridge / freezing back wall",
      "Noisy compressor & defrost board faults",
      "Water leaks & fridge that won't run",
    ],
    turnaround: "Priority 2–4 Hr Emergency Response",
  },
  {
    id: "freezer",
    title: "Freezer Repair",
    tileName: "Freezer",
    icon: ThermometerSnowflake,
    badge: "KEEP IT FROZEN",
    note: "Not freezing, frost, warm inside",
    quickSummary:
      "A freezer that is warming up or frosting over puts your food at risk. We find the fault and get it holding temperature again.",
    keyFixes: [
      "Freezer not getting cold enough",
      "Heavy frost or ice buildup",
      "Warm inside, fan or defrost faults",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "ice-maker",
    title: "Ice Maker Repair",
    tileName: "Ice Maker",
    icon: Snowflake,
    badge: "ICE & WATER",
    note: "No ice, leaks, small or cloudy cubes",
    quickSummary:
      "We repair built-in and refrigerator ice makers that stopped making ice, leak water, or drop small, cloudy cubes.",
    keyFixes: [
      "No ice or very slow ice production",
      "Water leaks from the ice maker or line",
      "Small, hollow or cloudy cubes",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "wine-cooler",
    title: "Wine Cooler Repair",
    tileName: "Wine Cooler",
    icon: Wine,
    badge: "COLLECTION CARE",
    note: "Not cooling, warm, noisy",
    quickSummary:
      "Wine needs steady temperatures. We repair wine coolers and beverage centers that run warm, run constantly, or make noise.",
    keyFixes: [
      "Not cooling or running warm",
      "Loud fan or compressor noise",
      "Temperature control and display faults",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "washer",
    title: "Washer Repair",
    tileName: "Washer",
    icon: WashingMachine,
    badge: "SAME-DAY WASHER",
    note: "Not spinning, not draining, leaks",
    quickSummary:
      "We fix washers that won't spin, won't drain, or leak water onto your floor, so your laundry routine gets right back on track.",
    keyFixes: [
      "Drain pump & standing water clogs",
      "Violent shaking & unbalanced spin cycles",
      "Door latch locks & digital error codes",
    ],
    turnaround: "Same-Day Dispatch • 45–90 min fix",
  },
  {
    id: "dryer",
    title: "Dryer Repair",
    tileName: "Dryer",
    icon: Wind,
    badge: "DRYER FIXES",
    note: "No heat, not starting, noisy",
    quickSummary:
      "We repair gas and electric dryers that won't heat, won't start, or squeal and thump while running.",
    keyFixes: [
      "No heat or clothes taking multiple cycles",
      "Dryer won't start or stops mid-cycle",
      "Squealing, thumping or rattling noises",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "washer-dryer-combo",
    title: "Washer & Dryer Combo Repair",
    tileName: "Washer & Dryer Combo",
    icon: Shirt,
    badge: "ALL-IN-ONE UNITS",
    note: "Not drying, leaks, error codes",
    quickSummary:
      "Combo units wash and dry in one drum, so one fault can stop both jobs. We diagnose which side has failed and repair it.",
    keyFixes: [
      "Clothes coming out damp after drying",
      "Water leaks and drain problems",
      "Error codes and cycles that won't finish",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "microwave",
    title: "Microwave Repair",
    tileName: "Microwave",
    icon: Microwave,
    badge: "QUICK KITCHEN FIX",
    note: "Not heating, turns off",
    quickSummary:
      "We repair countertop, over-the-range and built-in microwaves that spin but don't heat, shut off mid-cycle, or won't start.",
    keyFixes: [
      "Runs but doesn't heat food",
      "Shuts off or sparks during use",
      "Door latch, keypad and turntable faults",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "double-oven",
    title: "Double Oven Repair",
    tileName: "Double Oven",
    icon: Rows2,
    badge: "TWO CAVITIES",
    note: "One oven out, uneven heat",
    quickSummary:
      "When one cavity of a double oven stops working or cooks unevenly, we trace it to the element, igniter, sensor or control board.",
    keyFixes: [
      "One oven not heating while the other works",
      "Uneven baking or wrong temperature",
      "Igniter, element and control board faults",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "wall-oven",
    title: "Wall Oven Repair",
    tileName: "Wall Oven",
    icon: Flame,
    badge: "BUILT-IN OVENS",
    note: "Not heating, door issues, error codes",
    quickSummary:
      "We repair built-in single and combination wall ovens with heating faults, door problems and display error codes.",
    keyFixes: [
      "Oven not heating or not reaching temperature",
      "Door lock, hinge and latch problems",
      "Error codes and self-clean faults",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "cooktop",
    title: "Cooktop Repair",
    tileName: "Cooktop",
    icon: CircleDot,
    badge: "KITCHEN PROS",
    note: "Burners not lighting or heating",
    quickSummary:
      "We repair gas and electric cooktops with clicking igniters or cold burners, using safe, gas-tight connections.",
    keyFixes: [
      "Clicking or non-igniting gas burners",
      "Electric elements and radiant burners not heating",
      "Control knob and switch faults",
    ],
    turnaround: "Same-Day Dispatch • 60 min fix",
  },
  {
    id: "range",
    title: "Range Repair",
    tileName: "Range",
    icon: ChefHat,
    badge: "STOVE & OVEN",
    note: "Burners, oven & error codes",
    quickSummary:
      "Gas and electric ranges combine a cooktop and an oven, so we check both sides and fix burners, oven heat and error codes.",
    keyFixes: [
      "Burners that won't light or heat",
      "Oven not heating or heating unevenly",
      "Error codes and control faults",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "range-hood",
    title: "Range Hood Repair",
    tileName: "Range Hood",
    icon: AirVent,
    badge: "VENTILATION",
    note: "Weak suction, noisy fan, no light",
    quickSummary:
      "We repair range hoods and over-the-range vents that pull weakly, rattle, or have dead lights and controls.",
    keyFixes: [
      "Weak suction or fan not running",
      "Noisy, rattling or wobbling blower",
      "Light and control faults",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "dishwasher",
    title: "Dishwasher Repair",
    tileName: "Dishwasher",
    icon: Sparkles,
    badge: "SPOTLESS DISHES",
    note: "Not cleaning, leaks, not draining",
    quickSummary:
      "We repair dishwashers that leave dirty standing water, leak, or send dishes out cloudy and greasy.",
    keyFixes: [
      "Drainage problems & standing water",
      "Leaks from the door or base",
      "Dishes coming out cloudy or greasy",
    ],
    turnaround: "Same-Day Dispatch • 60 min fix",
  },
  {
    id: "garbage-disposal",
    title: "Garbage Disposal Repair",
    tileName: "Garbage Disposal",
    icon: UtensilsCrossed,
    badge: "UNDER THE SINK",
    note: "Not working, jammed",
    quickSummary:
      "We clear and repair garbage disposals that hum without spinning, jam, leak, or won't turn on.",
    keyFixes: [
      "Humming but not spinning (jammed)",
      "Leaks from the unit or connections",
      "Won't turn on or keeps tripping",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "trash-compactor",
    title: "Trash Compactor Repair",
    tileName: "Trash Compactor",
    icon: Trash2,
    badge: "KITCHEN APPLIANCE",
    note: "Won't compact, jammed, odors",
    quickSummary:
      "We repair built-in trash compactors that stopped compacting, jammed, or have drawer and odor problems.",
    keyFixes: [
      "Ram won't move or compact",
      "Jammed drawer or tracks",
      "Motor, switch and control faults",
    ],
    turnaround: "Same-Day Dispatch",
  },
  {
    id: "dryer-vent",
    title: "Dryer Vent Cleaning",
    icon: Fan,
    badge: "FIRE SAFETY",
    note: "Long dry times, lint buildup",
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
    id: "yearly-pm",
    title: "Yearly PM Check",
    icon: CalendarCheck,
    badge: "ANNUAL MAINTENANCE",
    note: "Maintenance bundles for laundry & kitchen",
    quickSummary:
      "A yearly preventive maintenance visit helps catch small problems before they turn into breakdowns. Pick the bundle that matches the appliances you want checked.",
    highlightsLabel: "Why Book a Yearly Check",
    keyFixes: [
      "Catch small problems before they become repairs",
      "Choose laundry, kitchen, or both",
      "One scheduled visit, one bundle price",
    ],
    turnaround: "Schedule your yearly visit online or by phone",
    bundles: [
      {
        id: "pm-laundry",
        name: "Laundry Appliances",
        price: "$139.99",
        description: "Yearly maintenance for your washer and dryer.",
      },
      {
        id: "pm-kitchen",
        name: "Kitchen Appliances",
        price: "$169.99",
        description: "Yearly maintenance for your refrigerator, dishwasher and range.",
      },
      {
        id: "pm-kitchen-laundry",
        name: "Kitchen & Laundry Appliances",
        price: "$239.99",
        description: "Five appliances, one price: three kitchen appliances and two laundry appliances.",
      },
    ],
  },
  {
    id: "house-duct",
    title: "House Duct Cleaning",
    icon: House,
    badge: "HVAC AIR QUALITY",
    note: "Dust, allergens, weak airflow",
    quickSummary:
      "We vacuum dust, pet dander, and allergens out of your whole HVAC duct system using medical-grade HEPA negative air machines. Fresh, odor-free air in every room.",
    keyFixes: [
      "Removes trapped dust, pollen & pet dander",
      "Improves HVAC airflow & reduces energy bills",
      "Sanitizes supply & return air vents",
    ],
    turnaround: "Whole-Home Clean in 2–3 hrs",
    extra: true,
  },
  {
    id: "home-warranty",
    title: "Have a Home Warranty Claim?",
    tileName: "Home Warranty",
    icon: ShieldCheck,
    badge: "ALL MAJOR PROVIDERS",
    note: "All major providers",
    isWarranty: true,
    extra: true,
    quickSummary:
      "We work with American Home Shield, Choice, First American, and other top providers. We file documentation and bill parts directly through your warranty.",
    keyFixes: ["Zero paperwork hassle for you", "Factory-certified replacement parts"],
    turnaround: "Have a Home Warranty Claim? Call us",
  },
];

/** Bookable services (everything except the informational warranty tile). */
export const coreServices = services.filter((s) => !s.isWarranty);

/** Booking dropdown text for one maintenance bundle, e.g. "Yearly PM Check – Laundry Appliances – $139.99". */
export const bundleOption = (s: Service, b: Bundle) => `${s.title} – ${b.name} – ${b.price}`;

/** Options for the booking dropdown: every bookable service, with maintenance services expanded to one option per bundle. */
export const bookingOptions: string[] = coreServices.flatMap((s) =>
  s.bundles ? s.bundles.map((b) => bundleOption(s, b)) : [s.title],
);

/** Short names used by the booking forms. */
export const serviceName = (s: Service) => s.tileName ?? s.title;
