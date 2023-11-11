const nextConfig = {
    reactStrictMode: true,
    compress: true,
    images: {
        remotePatterns: [
            {
                protocol: process.env.BACKEND_PROTOCOL,
                hostname: process.env.BACKEND_HOSTNAME,
                port: process.env.BACKEND_PORT,
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
