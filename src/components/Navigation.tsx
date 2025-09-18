"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export function DesktopNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "🏠 홈", page: "/" },
    { href: "/stories", label: "📚 스토리", page: "/stories" },
    { href: "/quiz", label: "🧩 퀴즈", page: "/quiz" },
    { href: "/dashboard", label: "📊 대시보드", page: "/dashboard" }
  ];

  return (
    <nav className="hidden md:block border-b border-white/10 bg-gray-900/80 backdrop-blur-sm">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4 py-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.page ? 'default' : 'ghost'}
                className={`rounded-full px-4 sm:px-6 py-2 font-medium transition-all duration-200 whitespace-nowrap ${
                  pathname === item.page
                    ? item.href === '/'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                      : item.href === '/stories'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                        : item.href === '/quiz'
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg transform scale-105'
                          : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105'
                    : 'hover:bg-gray-800 hover:scale-105 text-gray-300'
                }`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: "🏠", label: "홈" },
    { href: "/stories", icon: "📚", label: "스토리" },
    { href: "/quiz", icon: "🧩", label: "퀴즈" },
    { href: "/dashboard", icon: "📊", label: "대시보드" }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50 z-50">
      <div className="flex items-center justify-around px-4 py-2 safe-area-inset-bottom">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
              pathname === item.href
                ? item.href === '/'
                  ? 'bg-blue-500/20 transform scale-110'
                  : item.href === '/stories'
                    ? 'bg-green-500/20 transform scale-110'
                    : item.href === '/quiz'
                      ? 'bg-orange-500/20 transform scale-110'
                      : 'bg-purple-500/20 transform scale-110'
                : 'hover:bg-gray-800/50'
            }`}
          >
            <div className={`text-2xl mb-1 transition-all duration-200 ${
              pathname === item.href ? 'transform scale-110' : ''
            }`}>
              {item.icon}
            </div>
            <div className={`text-xs font-medium transition-all duration-200 ${
              pathname === item.href
                ? item.href === '/'
                  ? 'text-blue-400'
                  : item.href === '/stories'
                    ? 'text-green-400'
                    : item.href === '/quiz'
                      ? 'text-orange-400'
                      : 'text-purple-400'
                : 'text-gray-400'
            }`}>
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}