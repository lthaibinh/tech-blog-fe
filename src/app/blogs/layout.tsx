import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Viewport } from "next";

import { MainLayout } from "@/components/layouts/MainLayout";
// import "../../index.css";
import { ConfigProvider } from "antd";
import { themeConfig } from "@/components/ThemeConfig";
import { getServerSession } from "next-auth";
import NextAuthProvider from "@/components/NextAuthProvider";
import Script from "next/script";
import { DetailsLayout } from "@/components/layouts/DetailsLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Practice and improve English listening skills effectively",
  description:
    "Online dictation exercises for learners to improve English listening skills. TOEIC Test Preparation Materials. 100% Free.",
  icons: {
    icon: "/image/cat.png",
  },

  openGraph: {
    title:
      "Practice English listening with dictation exercises - dailyenglishdictation.com",
    description:
      "Online dictation exercises for learners to improve English listening skills quickly. TOEIC Test Preparation Materials.. 100% Free.",
    url: "https://dailyenglishdictation.com/",
    siteName: "DailyEngishDictation",
    type: "website",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <div className="!bg-white">{children}</div>;
}
