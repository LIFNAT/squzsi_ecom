import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.candypop.lt',
        port: '',
        pathname: '/**', // แก้ไขตรงนี้ครับ
      },
    ],
  },
};

export default nextConfig;