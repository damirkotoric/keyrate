import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }, // optional; only if TS errors block you
};

export default nextConfig;
