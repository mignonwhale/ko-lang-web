import Link from "next/link";
import { ArrowRight, Play, BookOpen, BarChart3 } from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import StoryCard from "@/components/StoryCard";
import {sampleStories} from "@/lib/data";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* 히어로 섹션 */}
      <section className="text-center space-y-8 py-8 sm:py-16">
        <div className="space-y-6">
          <div className="inline-block animate-bounce">
            <div className="size-20 sm:size-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6">
              <span className="text-white text-3xl sm:text-4xl font-bold">한</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
            <span className="block text-white">🎈 스토리로 배우는</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              한국어 학습 ✨
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            재미있는 스토리와 게임 같은 학습으로<br className="hidden sm:block" />
            <span className="font-semibold text-gray-200">자연스럽게 한국어를 마스터하세요! 🚀</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <Link href="/stories">
            <Button
              size="lg"
              className="gap-3 py-4 px-8 text-lg font-bold rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            >
              <Play className="size-6" />
              🎯 학습 시작하기
            </Button>
          </Link>
          <Link href="/quiz">
            <Button
              variant="outline"
              size="lg"
              className="gap-3 py-4 px-8 text-lg font-bold rounded-2xl border-2 border-orange-400 hover:bg-orange-500/20 transform hover:scale-105 transition-all duration-200 text-orange-300 hover:text-orange-200 w-full sm:w-auto"
            >
              <BarChart3 className="size-6" />
              🧩 퀴즈 체험하기
            </Button>
          </Link>
        </div>
      </section>

      {/* 특징 소개 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center border-2 border-blue-600/30 hover:border-blue-400 transition-all duration-200 transform hover:scale-105 bg-gradient-to-br from-gray-800 to-blue-950/50">
          <CardContent className="p-8 space-y-6">
            <div className="size-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <BookOpen className="size-8 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-100">📚 스토리 기반 학습</h3>
              <p className="text-gray-300 leading-relaxed">
                실제 상황을 바탕으로 한 재미있는 스토리로 자연스럽게 한국어를 익혀보세요
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center border-2 border-green-600/30 hover:border-green-400 transition-all duration-200 transform hover:scale-105 bg-gradient-to-br from-gray-800 to-emerald-950/50">
          <CardContent className="p-8 space-y-6">
            <div className="size-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Play className="size-8 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-100">🎵 음성 지원</h3>
              <p className="text-gray-300 leading-relaxed">
                네이티브 발음으로 듣고 따라하며 정확한 발음을 연습하세요
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center border-2 border-purple-600/30 hover:border-purple-400 transition-all duration-200 transform hover:scale-105 bg-gradient-to-br from-gray-800 to-pink-950/50">
          <CardContent className="p-8 space-y-6">
            <div className="size-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <BarChart3 className="size-8 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-100">📊 진도 관리</h3>
              <p className="text-gray-300 leading-relaxed">
                개인별 학습 진도를 체계적으로 관리하고 성취감을 느껴보세요
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 인기 스토리 미리보기 */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-100">🏆 인기 스토리</h2>
          <p className="text-xl text-gray-300">가장 많이 학습하는 스토리들을 만나보세요!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleStories.slice(0, 3).map(story => (
            <Link key={story.id} href="/stories">
              <StoryCard
                {...story}
              />
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/stories">
            <Button
              variant="outline"
              className="gap-3 py-3 px-6 text-lg font-medium rounded-xl border-2 border-blue-400 hover:bg-blue-500/20 transform hover:scale-105 transition-all duration-200 text-blue-300 hover:text-blue-200"
            >
              📖 모든 스토리 보기
              <ArrowRight className="size-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}