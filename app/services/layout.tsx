import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appliance & HVAC Repair Services in DC, MD & VA",
  description:
    "Dryer vent cleaning, air duct cleaning, refrigerator, washer, dishwasher and cooktop repair across Washington DC, Maryland and Northern Virginia. $89 diagnostic credited to your repair.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", images: ["/opengraph-image"] },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
