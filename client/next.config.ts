import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { routing } from "@/i18n/routing";

const localeRegex = `/:locale(${routing.locales.join("|")})`;
const nextConfig: NextConfig = {
  // Your existing configuration properties
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  devIndicators: {
    position: "bottom-right",
  },
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: '/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: `${localeRegex}/server-api/:path*`,
        destination: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/:path*`,
      },
      {
        source: "/server-api/:path*",
        destination: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/:path*`,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
