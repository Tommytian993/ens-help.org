/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 配置静态资源
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  // 配置输出
  output: "export",
  trailingSlash: true,
  // 禁用图片优化（用于静态导出）
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
