import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Viewport } from "next";

import { MainLayout } from "@/components/layouts/MainLayout";
import "./index.css";
import "./layout.scss";
import { ConfigProvider } from "antd";
import { themeConfig } from "@/components/ThemeConfig";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextAuthProvider from "@/components/NextAuthProvider";
import Script from "next/script";
import Head from "next/head";
import Link from "next/link";
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
  const session = getServerSession();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css"
        />
      </head>
      <body className={inter.className}>
        <Script src="https://d3js.org/d3.v4.min.js"></Script>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"
          strategy="beforeInteractive"
        ></Script>
        <AntdRegistry>
          <ConfigProvider theme={themeConfig}>
            <NextAuthProvider>
              <MainLayout>{children}</MainLayout>
            </NextAuthProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
