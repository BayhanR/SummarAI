/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [];
  }
};

module.exports = nextConfig;
