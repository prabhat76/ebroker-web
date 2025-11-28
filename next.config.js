/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-ebroker.thewrteam.in",
        pathname: "**",
      }
    ],
    unoptimized: true,
  },
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;
