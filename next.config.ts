import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ワークスペースルートを明示的に指定して警告を解決
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;
