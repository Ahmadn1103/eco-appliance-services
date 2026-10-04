// Set NEXT_PUBLIC_SITE_URL in Vercel (production is https://www.eco-applianceservices.com, which is also the fallback).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.eco-applianceservices.com"
).replace(/\/$/, "");

export const SITE_NAME = "Eco Appliance Services";
export const SITE_PHONE = "+1-571-462-1813";
export const PHONE_DISPLAY = "(571) 462-1813";
export const PHONE_HREF = "tel:5714621813";

// One array feeds the header, the mobile menu and the footer. `id` is the section anchor.
export const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About Us" },
  { id: "process", label: "Process" },
  { id: "service-area", label: "Service Area" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export const serviceRegions = [
  {
    region: "Virginia",
    areas: [
      "Aldie", "Alexandria", "Annandale", "Arlington", "Ashburn", "Brambleton", "Bristow", "Broadlands", "Burke", "Catlett", "Centreville", "Chantilly", "Clifton",
      "Dulles", "Dumfries", "Dunn Loring", "Fairfax", "Fairfax Station", "Falls Church", "Fort Belvoir", "Fredericksburg",
      "Front Royal", "Gainesville", "Great Falls", "Haymarket", "Herndon", "Leesburg", "Lorton", "Manassas", "Marshall", "McLean",
      "Merrifield", "Midland", "Mount Vernon", "New Baltimore", "Nokesville", "Oakton", "Occoquan", "Reston", "South Riding", "Spotsylvania", "Springfield", "Stafford", "Sterling",
      "Strasburg", "Triangle", "Vienna", "Warrenton", "Washington", "Waterford", "West McLean", "Winchester", "Woodbridge",
    ],
  },
  {
    region: "Washington, DC",
    areas: ["Naval Anacost Annex", "Washington", "Washington Navy Yard"],
  },
  {
    region: "Maryland",
    areas: [
      "Bethesda", "Bowie", "Chevy Chase", "Clinton", "College Park", "Gaithersburg", "Greenbelt", "Hyattsville", "Oxon Hill",
      "Rockville", "Silver Spring", "Suitland", "Takoma Park", "Upper Marlboro",
    ],
  },
];

// Logo strip: keep an even count (12 = two rows of 6) so the last row is not left short. Files live in public/brands (viewBox cropped to the real bounds).
export const brands = [
  { name: "Kenmore", logo: "/brands/kenmore.png" },
  { name: "Carrier", logo: "/brands/carrier.svg" },
  { name: "Sub-Zero", logo: "/brands/sub-zero.svg" },
  { name: "Samsung", logo: "/brands/samsung.svg" },
  { name: "LG", logo: "/brands/lg.svg" },
  { name: "Bosch", logo: "/brands/bosch.png" },
  { name: "Whirlpool", logo: "/brands/whirlpool.svg" },
  { name: "GE Monogram", logo: "/brands/ge-monogram.svg" },
  { name: "Maytag", logo: "/brands/maytag.png", large: true },
  { name: "KitchenAid", logo: "/brands/kitchenaid.svg" },
  { name: "Electrolux", logo: "/brands/electrolux.png" },
  { name: "JennAir", logo: "/brands/jennair.png" },
];

// Social profile links, used for the QR codes in the footer and the header popup.
// An empty entry shows a "link coming soon" state instead of a fake code.
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/people/Eco-Appliance-Services-DMV/61594763108201/",
  instagram: "https://www.instagram.com/ecoapplianceservicesdmv/",
} as const;
