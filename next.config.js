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
                hostname: 'system.kanow.vn',
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Kích thước thiết bị hỗ trợ
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Kích thước hình ảnh
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
