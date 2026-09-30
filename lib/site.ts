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

// Counties first, then towns, alphabetical. Coverage is decided by ZIP (lib/service-area.ts);
// these lists are the human-readable version shown in the Service Area section.
export const serviceRegions = [
  {
    region: "Washington, DC",
    areas: ["All DC neighborhoods"],
  },
  {
    region: "Maryland",
    areas: [
      "Montgomery County",
      "Prince George's County",
      "Bethesda",
      "Rockville",
      "Silver Spring",
      "Gaithersburg",
    ],
  },
  {
    region: "Northern Virginia",
    areas: [
      "Fairfax County",
      "Arlington County",
      "Loudoun County",
      "Prince William County",
      "Aldie",
      "Alexandria",
      "Annandale",
      "Arlington",
      "Ashburn",
      "Bristow",
      "Broad Run",
      "Burke",
      "Catharpin",
      "Catlett",
      "Centreville",
      "Chantilly",
      "Clifton",
      "Dahlgren",
      "Delaplane",
      "Dumfries",
      "Dunn Loring",
      "Fairfax",
      "Fairfax Station",
      "Falls Church",
      "Gainesville",
      "Great Falls",
      "Hamilton",
      "Haymarket",
      "Herndon",
      "Leesburg",
      "Lorton",
      "Manassas",
      "McLean",
      "Middleburg",
      "Nokesville",
      "Oakton",
      "Occoquan",
      "Paeonian Springs",
      "Reston",
      "Springfield",
      "Stafford",
      "Sterling",
      "The Plains",
      "Triangle",
      "Vienna",
      "Warrenton",
      "Waterford",
      "Woodbridge",
    ],
  },
];

export const brands = [
  "Samsung",
  "LG",
  "Whirlpool",
  "Maytag",
  "GE",
  "Frigidaire",
  "Bosch",
  "KitchenAid",
  "Kenmore",
  "Electrolux",
  "Amana",
];

// Social profile links, used for the QR codes in the footer and the header popup.
// An empty entry shows a "link coming soon" state instead of a fake code.
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/people/Eco-Appliance-Services-DMV/61594763108201/",
  instagram: "https://www.instagram.com/ecoapplianceservicesdmv/",
} as const;
