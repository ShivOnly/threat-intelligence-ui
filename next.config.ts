/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // if you’re using the app router
    turbo: true,  // optional if using turbopack
    removeDevTools: true, // remove Next.js dev badge (Next.js 15+)
  },
}

module.exports = nextConfig;
