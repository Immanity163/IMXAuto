import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 60,
    },
  },
    reactStrictMode: true,
  images: {
    domains: ['imxauto.ru'], // <- сюда добавляем домен внешних изображений
  },
};

export default nextConfig;
