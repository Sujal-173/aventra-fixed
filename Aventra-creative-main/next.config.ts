import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from Sanity CDN and Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // Serve modern formats: AVIF first, WebP fallback
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 24 hours at the CDN edge
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
