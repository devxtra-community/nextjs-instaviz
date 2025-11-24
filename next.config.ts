/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ymhpjbqatqaqarydzijp.supabase.co",
        pathname: "/**",
      },
      // ✅ FIX: allow ANY external HTTPS image
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      // (optional) allow HTTP images too
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
module.exports = nextConfig;