// Set NEXT_PUBLIC_SITE_URL in Vercel once a custom domain is connected.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://eco-appliance-services.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Eco Appliance Services";
export const SITE_PHONE = "+1-571-462-1813";
