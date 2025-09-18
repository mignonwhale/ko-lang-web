import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Calendar, Clock, Target, Trophy, BookOpen, Zap } from "lucide-react";

interface LearningStats {
  totalStories: number;
  completedStories: number;
  totalSentences: number;
  learnedSentences: number;
  studyDays: number;
  currentStreak: number;
  todayMinutes: number;
  weeklyGoal: number;
}

interface LearningDashboardProps {
  stats: LearningStats;
}

export default function LearningDashboard({ stats }: LearningDashboardProps) {
  const completionRate = Math.round((stats.completedStories / stats.totalStories) * 100);
  const sentenceProgress = Math.round((stats.learnedSentences / stats.totalSentences) * 100);
  const weeklyProgress = Math.round((stats.todayMinutes / stats.weeklyGoal) * 100);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="text-center space-y-2">
        <h1>학습 대시보드</h1>
        <p className="text-muted-foreground">오늘도 한국어 학습을 시작해보세요!</p>
      </div>

      {/* 주요 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="size-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl">{stats.currentStreak}</div>
            <p className="text-sm text-muted-foreground">연속 학습 일수</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="size-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl">{stats.completedStories}</div>
            <p className="text-sm text-muted-foreground">완료한 스토리</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="size-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl">{stats.learnedSentences}</div>
            <p className="text-sm text-muted-foreground">학습한 문장</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="size-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl">{stats.todayMinutes}분</div>
            <p className="text-sm text-muted-foreground">오늘 학습 시간</p>
          </CardContent>
        </Card>
      </div>

      {/* 진행률 카드들 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="size-5" />
              전체 학습 진도
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>스토리 완료율</span>
                <span>{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {stats.completedStories} / {stats.totalStories} 스토리 완료
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>문장 학습률</span>
                <span>{sentenceProgress}%</span>
              </div>
              <Progress value={sentenceProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {stats.learnedSentences} / {stats.totalSentences} 문장 학습
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5" />
              주간 목표
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>이번 주 학습 시간</span>
                <span>{stats.todayMinutes} / {stats.weeklyGoal}분</span>
              </div>
              <Progress value={Math.min(weeklyProgress, 100)} className="h-2" />
              <p className="text-xs text-muted-foreground">
                목표까지 {Math.max(0, stats.weeklyGoal - stats.todayMinutes)}분 남음
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={stats.currentStreak >= 7 ? "default" : "secondary"}>
                {stats.currentStreak >= 7 ? "목표 달성!" : `${7 - stats.currentStreak}일 더`}
              </Badge>
              <span className="text-sm text-muted-foreground">
                주 7일 연속 학습 목표
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 최근 활동 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="size-8 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="size-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">스토리 "카페에서의 대화" 완료</p>
                <p className="text-xs text-muted-foreground">2시간 전</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="size-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="size-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">퀴즈 5문제 연속 정답</p>
                <p className="text-xs text-muted-foreground">어제</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="size-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="size-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">일일 학습 목표 달성</p>
                <p className="text-xs text-muted-foreground">어제</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}