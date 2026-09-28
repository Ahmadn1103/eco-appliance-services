import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Book a Technician",
  description:
    "Book an HVAC or appliance repair technician in Washington DC, Maryland or Northern Virginia. Call (571) 462-1813 or send an inquiry for a fast, itemized quote.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", images: ["/opengraph-image"] },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
