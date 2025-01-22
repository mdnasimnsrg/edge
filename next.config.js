const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: { fetches: { fullUrl: true } },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "169.63.176.109",
        port: "9092",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
