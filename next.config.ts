import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  // The site is a single page now; old routes land on the matching section.
  async redirects() {
    return [
      // One canonical host: the bare domain goes to www. Other hosts (previews, *.vercel.app) are untouched.
      {
        source: "/:path*",
        has: [{ type: "host", value: "eco-applianceservices.com" }],
        destination: "https://www.eco-applianceservices.com/:path*",
        permanent: true,
      },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
