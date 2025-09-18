import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Play, Pause, SkipForward, Volume2 } from "lucide-react";

interface Sentence {
  id: number;
  korean: string;
  english: string;
  pronunciation: string;
}

interface SentenceReaderProps {
  sentences: Sentence[];
  currentIndex: number;
  onNext: () => void;
  onSentenceComplete: () => void;
}

export default function SentenceReader({ sentences, currentIndex, onNext, onSentenceComplete }: SentenceReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const currentSentence = sentences[currentIndex];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        onSentenceComplete();
      };

      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      speak(currentSentence.korean);
    }
  };

  useEffect(() => {
    setShowTranslation(false);
  }, [currentIndex]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} / {sentences.length}
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / sentences.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl">{currentSentence.korean}</h2>
            <p className="text-lg text-muted-foreground">{currentSentence.pronunciation}</p>

            {showTranslation && (
              <p className="text-lg text-primary animate-in fade-in duration-300">
                {currentSentence.english}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePlayPause}
              className="gap-2"
            >
              {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
              {isPlaying ? "정지" : "듣기"}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowTranslation(!showTranslation)}
              className="gap-2"
            >
              <Volume2 className="size-5" />
              번역
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={onNext}
          size="lg"
          disabled={currentIndex >= sentences.length - 1}
          className="gap-2"
        >
          다음 문장
          <SkipForward className="size-4" />
        </Button>
      </div>
    </div>
  );
}