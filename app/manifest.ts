import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Eco Appliance Services",
    short_name: "Eco Appliance",
    description: "Premier Air Duct & Appliance Repairs across Washington DC, Maryland & Virginia",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#209378",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
