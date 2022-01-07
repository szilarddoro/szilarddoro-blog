/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: [`page.tsx`],
  images: {
    domains: [`images.ctfassets.net`],
    deviceSizes: [576, 640, 750, 828, 1080, 1200, 1280, 1440, 1920],
  },
}
