/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // REMOVE this line
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

export default nextConfig;
