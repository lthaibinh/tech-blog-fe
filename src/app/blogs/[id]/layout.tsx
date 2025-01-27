import { getBlogPostDetails } from "@/services/blogServies";
import type { Metadata } from "next";
import type { Viewport } from "next";
import { getServerSession } from "next-auth";
import { cloneElement } from "react";
import { lastValueFrom } from "rxjs";

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

export default async function RootLayout({
  children,
  params 
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const session = getServerSession();
  

  return (
    <div className="">
      {children}
    </div>
  );
}
