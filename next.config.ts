import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: { ignoreDuringBuilds: true },
  // optional if TS type errors ever block you:
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
