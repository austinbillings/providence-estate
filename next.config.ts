import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos uploaded through the Studio are served from Sanity's CDN.
    // Object form so the size/format query string is allowed.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
    qualities: [75, 85],
  },
};

export default nextConfig;
