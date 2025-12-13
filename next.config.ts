import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com', // 👈 여기를 허용해줍니다.
      },
      // 나중에 실제 S3나 Supabase Storage 쓸 때 여기에 도메인 추가하면 됩니다.
    ],
  },
};

export default nextConfig;
