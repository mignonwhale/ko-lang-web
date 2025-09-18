"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {sampleSentences, sampleStories} from "@/lib/data";
import SentenceReader from "@/components/SentenceReader";

interface StoryReadingPageProps {
  params: {
    id: string;
  };
}

export default function StoryReadingPage({ params }: StoryReadingPageProps) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const router = useRouter();

  const storyId = parseInt(params.id);
  const story = sampleStories.find(s => s.id === storyId);

  if (!story) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-100">😅 스토리를 찾을 수 없습니다</h1>
        <p className="text-xl text-gray-300">다른 스토리를 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-100">📖 {story.title}</h1>
        <p className="text-xl text-gray-300">🏪 {story.description}</p>
      </div>

      <SentenceReader
        sentences={sampleSentences}
        currentIndex={currentSentenceIndex}
        onNext={() => {
          if (currentSentenceIndex < sampleSentences.length - 1) {
            setCurrentSentenceIndex(prev => prev + 1);
          } else {
            router.push('/quiz');
          }
        }}
        onSentenceComplete={() => {}}
      />
    </div>
  );
}