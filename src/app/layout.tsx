import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ENS 患者平台",
  description:
    "Empty Nose Syndrome Patient Platform - 地图、论坛、纪念园、健康日志",
  keywords: "ENS, Empty Nose Syndrome, 空鼻症, 患者平台, 诊所地图, 健康日志",
  authors: [{ name: "ENS Patient Platform" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
