import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: `${process.env.PROJECT_ID}.supabase.co`,
      },
    ].filter(Boolean) as RemotePattern[],
  },
};

export default nextConfig;
