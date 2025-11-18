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
    ],
  },
};




export default nextConfig;

module.exports = nextConfig;

