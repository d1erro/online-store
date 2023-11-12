const nextConfig = {
    reactStrictMode: true,
    compress: true,
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_BACKEND_PROTOCOL_FOR_IMAGES,
                hostname: process.env.NEXT_PUBLIC_BACKEND_HOSTNAME_FOR_IMAGES,
                port: process.env.NEXT_PUBLIC_BACKEND_PORT_FOR_IMAGES,
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
