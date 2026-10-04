import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_PHONE, SOCIAL_LINKS } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#209378",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Eco Appliance Services | Appliance Repair VA, DC, MD",
    template: "%s | Eco Appliance Services",
  },
  description:
    "Eco Appliance Services provides professional duct cleaning, dryer vent restoration, refrigeration, laundry, and kitchen appliance repairs across Northern Virginia, Washington DC, and Maryland.",
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
    title: "Eco Appliance Services | Precision Appliance Repair DMV",
    description:
      "Reliable duct cleaning and appliance repair across Northern Virginia, Washington DC, and Maryland. Honest diagnosis and upfront pricing.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  twitter: {
    card: "summary_large_image",
    title: "Eco Appliance Services | Precision Appliance Repair DMV",
    description:
      "Reliable duct cleaning and appliance repair across Northern Virginia, Washington DC, and Maryland. Honest diagnosis and upfront pricing.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpeg`,
    image: `${SITE_URL}/logo.jpeg`,
    description:
      "Professional duct cleaning, dryer vent restoration, refrigeration, cooktop, dishwasher, and washing machine repair across the DMV.",
    priceRange: "$$",
    sameAs: Object.values(SOCIAL_LINKS).filter(Boolean),
    knowsAbout: [
      "Refrigerator repair",
      "Washer and dryer repair",
      "Dishwasher repair",
      "Cooktop and range repair",
      "Dryer vent cleaning",
      "Air duct cleaning",
      "Home warranty appliance service",
    ],
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
      name: "Appliance and duct services",
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
        opens: "08:00",
        closes: "19:00",
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Caveat:wght@600&display=swap"
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
