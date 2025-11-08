import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      // allow this exact Google-hostname
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          pathname: '/**',
        },
      ],
      // alternatively you can use `domains: ['lh3.googleusercontent.com']`
    },
  };

  export default nextConfig;
