import type { NextConfig } from "next";

const strapiHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_STRAPI_URL
      ? new URL(process.env.NEXT_PUBLIC_STRAPI_URL).hostname
      : 'localhost';
  } catch {
    return 'localhost';
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: strapiHost },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
    ],
  },
};

export default nextConfig;
