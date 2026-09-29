// Set NEXT_PUBLIC_SITE_URL in Vercel once a custom domain is connected.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://eco-appliance-services.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Eco Appliance Services";
export const SITE_PHONE = "+1-571-462-1813";
export const PHONE_DISPLAY = "(571) 462-1813";
export const PHONE_HREF = "tel:5714621813";

// One array feeds the header, the mobile menu and the footer. `id` is the section anchor.
export const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "service-area", label: "Service Area" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export const serviceRegions = [
  {
    region: "Washington, DC",
    areas: ["NW", "NE", "Georgetown", "Capitol Hill", "Dupont", "Adams Morgan", "Tenleytown"],
  },
  {
    region: "Maryland",
    areas: ["Bethesda", "Rockville", "Silver Spring", "Chevy Chase", "Potomac", "Gaithersburg"],
  },
  {
    region: "Northern Virginia",
    areas: ["Arlington", "Alexandria", "McLean", "Fairfax", "Vienna", "Tysons", "Reston", "Ashburn"],
  },
];

export const brands = [
  "TRANE",
  "CARRIER",
  "SUB-ZERO",
  "SAMSUNG",
  "LG",
  "BOSCH",
  "WHIRLPOOL",
  "GE MONOGRAM",
  "LENNOX",
];

// Social profile links, used for the QR codes in the footer and the header popup.
// An empty entry shows a "link coming soon" state instead of a fake code.
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/people/Eco-Appliance-Services-DMV/61594763108201/",
  instagram: "https://www.instagram.com/ecoapplianceservicesdmv/",
} as const;
