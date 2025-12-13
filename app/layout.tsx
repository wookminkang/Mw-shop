import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/Provider";
import Header from "@/components/layout/Header"; // 추가
import Footer from "@/components/layout/Footer"; // 추가
import SearchOverlay from "@/features/search/components/SearchOverlay"; // 추가

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mw-Shop",
  description: "29CM Clone Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          {/* 1. 헤더 고정 */}
          <Header />
          
          {/* 2. 페이지 내용 (min-h-screen으로 푸터 바닥에 밀기) */}
          <div className="min-h-screen">
            {children}
          </div>

          {/* 3. 푸터 고정 */}
          <Footer />
          <SearchOverlay />
        </Providers>
      </body>
    </html>
  );
}