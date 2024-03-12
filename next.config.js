/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.178',
            },
            {
                protocol: 'https',
                hostname: 'quanly.mony.com.vn',
            },
        ]
    },
    // fastRefresh: true,
    // concurrentFeatures: true,
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/home',
            },
        ]
    },
};

module.exports = nextConfig
