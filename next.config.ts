import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 60,
    },
  },
  reactStrictMode: false, // отключаем строгий режим для дев-билда
  devIndicators: {
    buildActivity: false, // отключаем overlay ошибок и индикатор сборки
  },
  eslint: {
    ignoreDuringBuilds: true, // игнорируем ESLint ошибки при сборке
  },
    typescript: {
    ignoreBuildErrors: true, // игнорировать TS ошибки в dev
  },
  images: {
    domains: ['imxauto.ru'], // домен внешних изображений
  },
};

export default nextConfig;
