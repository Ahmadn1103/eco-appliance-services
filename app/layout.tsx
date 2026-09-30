import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_PHONE } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Eco Appliance Services | Appliance Repair & Installation DC, MD, VA",
    template: "%s | Eco Appliance Services",
  },
  description:
    "Eco Appliance Services provides professional appliance repair and installation for refrigerators, washers, dryers, ovens, ranges, and dishwashers, plus dryer vent and duct cleaning, across Washington DC, Maryland, and Northern Virginia. Home warranty claims welcome.",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Eco Appliance Services | Appliance Repair & Installation DMV",
    description:
      "Reliable appliance repair, installation, dryer vent and duct cleaning across Washington DC, Maryland, and Northern Virginia. Honest diagnosis and upfront pricing.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpeg`,
    image: `${SITE_URL}/logo.jpeg`,
    description:
      "Professional appliance repair and installation (refrigerator, washer, dryer, oven, range, cooktop, dishwasher), dryer vent cleaning, and house duct cleaning across the DMV.",
    priceRange: "$$",
    telephone: SITE_PHONE,
    areaServed: [
      "Washington, DC",
      "Bethesda, MD",
      "Rockville, MD",
      "Silver Spring, MD",
      "Gaithersburg, MD",
      "Bowie, MD",
      "Laurel, MD",
      "Frederick, MD",
      "Fairfax, VA",
      "Arlington, VA",
      "Alexandria, VA",
      "McLean, VA",
      "Reston, VA",
      "Ashburn, VA",
      "Manassas, VA",
    ].map((name) => ({ "@type": "City", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Appliance repair and cleaning services",
      itemListElement: [
        "Dryer vent cleaning",
        "Air duct cleaning",
        "Refrigerator repair",
        "Washer and dryer repair",
        "Dishwasher repair",
        "Cooktop and range repair",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "07:30",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "08:30",
        closes: "17:00",
      },
    ],
  };

  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-ink font-sans antialiased selection:bg-primary selection:text-on-primary">
        {children}
      </body>
    </html>
  );
}
