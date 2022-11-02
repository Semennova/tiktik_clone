/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'lh3.googleusercontent.com', 'expertphotography.b-cdn.net'],
  }
}

module.exports = nextConfig
