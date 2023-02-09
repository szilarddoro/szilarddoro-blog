/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: [`page.tsx`],
  i18n: {
    locales: [`hu-HU`],
    defaultLocale: `hu-HU`,
  },
  images: {
    deviceSizes: [576, 640, 750, 828, 1080, 1200, 1280, 1440, 1920],
    remotePatterns: [
      {
        protocol: `https`,
        hostname: `res.cloudinary.com`,
        pathname: `/dtfzsgeku/**`,
      },
      {
        protocol: `https`,
        hostname: `images.ctfassets.net`,
        pathname: `/fbxa3p3iv97z/**`,
      },
    ],
  },
}
