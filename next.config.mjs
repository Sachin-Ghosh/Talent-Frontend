/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL
  },
  async rewrites() {
    return [
      {
        source: '/api/users/',
        destination: process.env.API_URL + '/api/users/', // Replace with the URL of your backend server
      },
    ];
  },
};

export default nextConfig;