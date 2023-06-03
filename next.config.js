/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    staticPageGenerationTimeout: 10000,
    images: {
        domains: [
            "imgv3.fotor.com",
            "imgv3.fotor.com",
            "assets.stickpng.com",
            "www.w3schools.com",
            "farzanehnorouzi.ir",
            "www.citypng.com",
            "drive.google.com",
            "localhost",
        ],
    },
};

module.exports = nextConfig;
