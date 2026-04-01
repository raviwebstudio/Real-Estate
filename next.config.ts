import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  allowedDevOrigins: ["192.168.1.60"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
