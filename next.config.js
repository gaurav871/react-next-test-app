/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLOUDINARY_CLOUD_NAME: "socialmediatest",
    CLOUDINARY_API_KEY: "878422332151259",
    CLOUDINARY_API_SECRET: "bNE_L0R3idq-oeYskBNlO11OZPk" ,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
}

module.exports = nextConfig
