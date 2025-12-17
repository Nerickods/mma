import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Next.js 16 Features
  // Next.js 16 Features
  reactCompiler: true,

  experimental: {
    turbopackFileSystemCacheForDev: true,  // Faster dev restarts
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Web Vitals monitoring
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;



