// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // [보안 추가] 모든 상대 경로의 기준이 되는 도메인 주소를 설정합니다.
  metadataBase: new URL("https://nneoum.com"), 

  title: "nneoum | I shape the essential",
  description: "nneoum Venture Studio visualizes what truly matters.",
  
  openGraph: {
    title: "nneoum | Venture Studio",
    description: "I shape the essential.",
    url: "https://nneoum.com",
    siteName: "nneoum",
    images: [
      {
        url: "/og-image.png", // 이제 앞에 https://nneoum.com이 자동으로 붙습니다.
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}