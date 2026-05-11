/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'online.gov.vn',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.178',
            },
            {
                protocol: 'https',
                hostname: 'system.kanow.vn',
            },
            {
                protocol: 'https',
                hostname: 'd31uais4sg1i3h.cloudfront.net',
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Kích thước thiết bị hỗ trợ
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Kích thước hình ảnh
    },
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/home',
            },
            {
                source: '/api/:path*',
                destination: 'https://alepay-v3-sandbox.nganluong.vn/api/:path*',
            },
        ]
    },
};

module.exports = nextConfig
