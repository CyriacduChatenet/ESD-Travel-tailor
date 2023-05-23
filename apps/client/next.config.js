/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@travel-tailor/functions',
    '@travel-tailor/types',
    '@travel-tailor/hooks',
    '@travel-tailor/contexts',
    '@travel-tailor/services',
    '@travel-tailor/constants',
    '@travel-tailor/utils',
  ],
  images: {
    domains: ['images.unsplash.com', 'travel-manager-images.s3.eu-west-3.amazonaws.com'],
},
}

module.exports = nextConfig
