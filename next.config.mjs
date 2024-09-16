/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL
  },
  async rewrites() {
    return [
      {
        source: '/api/users/:path*',
        destination: 'https://talent-backend-wfqd.onrender.com/api/users/:path*'
      },
    ];
  },
};

export default nextConfig;