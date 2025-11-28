/** @type {import('next').NextConfig} */
const path = require("path");
const fs = require("fs");

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
      },
    ],
    unoptimized: true,
  },
  trailingSlash: true,
  buildActivity: false,
};

if (process.env.NEXT_PUBLIC_SEO === "false") {
  nextConfig.exportPathMap = async (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId },
  ) => {
    if (dir && outDir && fs.existsSync(path.join(dir, ".htaccess"))) {
      fs.copyFileSync(
        path.join(dir, ".htaccess"),
        path.join(outDir, ".htaccess"),
      );
    }
    return defaultPathMap;
  };
}

module.exports = nextConfig;
