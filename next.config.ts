import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TypeScript type-safety is validated separately via tsc --noEmit
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
