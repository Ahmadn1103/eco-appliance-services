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
      "Aldie", "Alexandria", "Annandale", "Arlington", "Ashburn", "Bristow", "Burke", "Centreville", "Chantilly", "Clifton",
      "Dulles", "Dumfries", "Dunn Loring", "Fairfax", "Fairfax Station", "Falls Church", "Fort Belvoir", "Fredericksburg",
      "Front Royal", "Gainesville", "Great Falls", "Haymarket", "Herndon", "Leesburg", "Lorton", "Manassas", "McLean",
      "Merrifield", "Mount Vernon", "Oakton", "Occoquan", "Reston", "Spotsylvania", "Springfield", "Stafford", "Sterling",
      "Strasburg", "Triangle", "Vienna", "Warrenton", "Washington", "Waterford", "West McLean", "Winchester", "Woodbridge",
    ],
  },
  {
    region: "Maryland",
    areas: [
      "Bethesda", "Bowie", "Chevy Chase", "Clinton", "College Park", "Gaithersburg", "Greenbelt", "Hyattsville", "Oxon Hill",
      "Rockville", "Silver Spring", "Suitland", "Takoma Park", "Upper Marlboro",
    ],
  },
  {
    region: "Washington, DC",
    areas: ["Naval Anacost Annex", "Washington", "Washington Navy Yard"],
  },
];

// Logo strip: 10 logos = two even rows of 5. Files live in public/brands (viewBox cropped to the real bounds).
export const brands = [
  { name: "Trane", logo: "/brands/trane.svg" },
  { name: "Carrier", logo: "/brands/carrier.svg" },
  { name: "Sub-Zero", logo: "/brands/sub-zero.svg" },
  { name: "Samsung", logo: "/brands/samsung.svg" },
  { name: "LG", logo: "/brands/lg.svg" },
  { name: "Bosch", logo: "/brands/bosch.svg" },
  { name: "Whirlpool", logo: "/brands/whirlpool.svg" },
  { name: "GE Monogram", logo: "/brands/ge-monogram.svg" },
  { name: "Lennox", logo: "/brands/lennox.svg" },
  { name: "KitchenAid", logo: "/brands/kitchenaid.svg" },
];

// Social profile links, used for the QR codes in the footer and the header popup.
// An empty entry shows a "link coming soon" state instead of a fake code.
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/people/Eco-Appliance-Services-DMV/61594763108201/",
  instagram: "https://www.instagram.com/ecoapplianceservicesdmv/",
} as const;
