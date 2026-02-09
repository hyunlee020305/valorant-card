import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@resvg/resvg-js', 'sharp'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.valorant-api.com' },
      { protocol: 'https', hostname: 'api.henrikdev.xyz' },
    ],
  },
};

export default nextConfig;
