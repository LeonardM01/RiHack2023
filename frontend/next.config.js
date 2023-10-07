/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    reactStrictMode: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
