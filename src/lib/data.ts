// 샘플 데이터
export const sampleStories = [
  {
    id: 1,
    title: "카페에서의 대화",
    level: "초급",
    duration: "5분",
    progress: 75,
    description: "일상적인 카페 상황에서 사용하는 기본 표현들을 배워보세요.",
    image: "https://images.unsplash.com/photo-1552990608-cfe5eb330b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBsYW5ndWFnZSUyMGxlYXJuaW5nJTIwYm9va3N8ZW58MXx8fHwxNzU4MTc0MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "교통수단 이용하기",
    level: "중급",
    duration: "8분",
    progress: 30,
    description: "버스, 지하철, 택시를 이용할 때 필요한 표현들을 익혀보세요.",
    image: "https://images.unsplash.com/photo-1660479123634-2c700dfbbbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZWFkaW5nJTIwc3RvcnklMjBib29rfGVufDF8fHx8MTc1ODE3NDMyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "쇼핑몰에서 쇼핑하기",
    level: "초급",
    duration: "6분",
    progress: 0,
    description: "옷을 사거나 가격을 묻는 등 쇼핑할 때 유용한 표현들을 배워보세요.",
    image: "https://images.unsplash.com/photo-1552990608-cfe5eb330b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBsYW5ndWFnZSUyMGxlYXJuaW5nJTIwYm9va3N8ZW58MXx8fHwxNzU4MTc0MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export const sampleSentences = [
  {
    id: 1,
    korean: "안녕하세요, 아메리카노 한 잔 주세요.",
    english: "Hello, one americano please.",
    pronunciation: "안녕하세요, 아메리카노 한 잔 주세요"
  },
  {
    id: 2,
    korean: "얼마예요?",
    english: "How much is it?",
    pronunciation: "얼마예요?"
  },
  {
    id: 3,
    korean: "카드로 계산할게요.",
    english: "I'll pay by card.",
    pronunciation: "카드로 계산할게요"
  }
];

export const sampleQuiz = {
  id: 1,
  korean: "커피 한 잔 주세요",
  words: ["커피", "한", "잔", "주세요"],
  correctOrder: [0, 1, 2, 3]
};

export const sampleStats = {
  totalStories: 15,
  completedStories: 8,
  totalSentences: 120,
  learnedSentences: 78,
  studyDays: 12,
  currentStreak: 5,
  todayMinutes: 25,
  weeklyGoal: 180
};

export interface Story {
  id: number;
  title: string;
  level: string;
  duration: string;
  progress: number;
  description: string;
  image: string;
}

export interface Sentence {
  id: number;
  korean: string;
  english: string;
  pronunciation: string;
}

export interface QuizQuestion {
  id: number;
  korean: string;
  words: string[];
  correctOrder: number[];
}

export interface LearningStats {
  totalStories: number;
  completedStories: number;
  totalSentences: number;
  learnedSentences: number;
  studyDays: number;
  currentStreak: number;
  todayMinutes: number;
  weeklyGoal: number;
}