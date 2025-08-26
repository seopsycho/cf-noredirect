import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip TypeScript type checking during production builds.
  // NOTE: This allows builds to succeed even with type errors. Use with caution.
  typescript: {
    ignoreBuildErrors: true,
  },
  // (Optional) Prevent ESLint errors from failing the build.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
