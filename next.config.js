/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig 

module.exports.env = {
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
} 