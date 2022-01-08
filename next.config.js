/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: [`page.tsx`],
  i18n: {
    locales: [`hu-HU`],
    defaultLocale: `hu-HU`,
  },
  images: {
    loader: `cloudinary`,
    path: `https://res.cloudinary.com/dtfzsgeku`,
    deviceSizes: [576, 640, 750, 828, 1080, 1200, 1280, 1440, 1920],
  },
}
