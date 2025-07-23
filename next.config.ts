import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['res.cloudinary.com'], // ✅ autorise les images Cloudinary
      },
};

export default nextConfig;
