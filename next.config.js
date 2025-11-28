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
        // port: '',
        pathname: "**",
        // search: '',
      }
    ],
    unoptimized: true,
  },
  trailingSlash: true,
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;
