import type {Metadata} from 'next';
import './globals.css';
import Header from "@/components/Header";
import {DesktopNavigation, MobileNavigation} from "@/components/Navigation";

export const metadata: Metadata = {
  title: 'KoLang - 스토리로 배우는 한국어',
  description: '재미있는 스토리와 인터랙티브한 학습으로 자연스럽게 한국어를 마스터하세요',
};

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="ko" className="dark">
    <body className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950">
    <Header/>
    <DesktopNavigation/>

    <main className="container max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 pb-20 md:pb-12">
      {children}
    </main>

    <MobileNavigation/>
    </body>
    </html>
  );
}