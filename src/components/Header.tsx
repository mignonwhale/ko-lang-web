import {Heart, Settings, User} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b border-gray-700/50 bg-gray-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-gray-900/80 shadow-sm">
      <div className="container max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-200">
              <span className="text-white text-lg font-bold">한</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                KoLang
              </span>
              <div className="text-xs text-gray-400">스토리로 배우는 한국어</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Heart className="size-4 text-red-500" />
              <span>연속 학습 5일</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="size-4 bg-yellow-400 rounded-full"></div>
              <span>780 XP</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-800 transition-colors text-gray-300 hover:text-white">
              <Settings className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-800 transition-colors text-gray-300 hover:text-white">
              <User className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}