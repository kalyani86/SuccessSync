/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['randomuser.me'], // ✅ allow external image domain
  },
};

export default nextConfig;
