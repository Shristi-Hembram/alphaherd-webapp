/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.BASE_PATH,
    env: {
       NEXTAUTH_URL: process.env.NEXTAUTH_URL
    },
    reactStrictMode: false,
}

module.exports = nextConfig;
