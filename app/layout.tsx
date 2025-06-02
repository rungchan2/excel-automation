import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogProvider } from "@/app/providers";
import 'react-notion-x/src/styles.css'
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "[클래스플로우] ClassFlow - 엑셀 기반 학원 자동화 서비스",
  description: "학원 운영에 필요한 반복적인 업무들로 부터 해방! 효율적인 자동화로 시간을 되찾으세요. 출결관리, 문자발송, 수납관리를 엑셀에서 바로 자동화하세요.",
  keywords: "학원 자동화, 엑셀 자동화, 출결관리, 문자발송, 수납관리, 학원 관리 시스템, Make.com, 노코드 자동화",
  authors: [{ name: "ClassFlow Team" }],
  creator: "ClassFlow",
  publisher: "ClassFlow",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://classflow.monstercoop.co.kr"),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://classflow.monstercoop.co.kr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  openGraph: {
    title: "[클래스플로우] ClassFlow - 엑셀 기반 학원 자동화 서비스",
    description: "학원 운영에 필요한 반복적인 업무들로 부터 해방! 효율적인 자동화로 시간을 되찾으세요",
    type: "website",
    locale: "ko_KR",
    url: "https://classflow.monstercoop.co.kr",
    siteName: "클래스플로우",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "클래스플로우 서비스 이미지"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[클래스플로우] ClassFlow - 엑셀 기반 학원 자동화 서비스",
    description: "학원 운영에 필요한 반복적인 업무들로 부터 해방! 효율적인 자동화로 시간을 되찾으세요",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <GoogleAnalytics gaId={process.env.GA_ID || ""} />
      </body>
    </html>
  );
}
