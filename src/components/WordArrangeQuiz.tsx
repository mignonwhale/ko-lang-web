"use client"

import {useRef, useState} from "react";
import {Button} from "./ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import {CheckCircle, RotateCcw, Sparkles, XCircle} from "lucide-react";
import {sampleQuiz} from "@/lib/data";
import Link from "next/link";

export default function WordArrangeQuiz() {
  const question = sampleQuiz

  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [availableWords, setAvailableWords] = useState<number[]>(
    question.words.map((_, index) => index)
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);

  const handleWordClick = (wordIndex: number) => {
    if (selectedWords.includes(wordIndex)) return;

    const newSelected = [...selectedWords, wordIndex];
    const newAvailable = availableWords.filter(i => i !== wordIndex);

    setSelectedWords(newSelected);
    setAvailableWords(newAvailable);
  };

  const handleSelectedWordClick = (wordIndex: number) => {
    const newSelected = selectedWords.filter(i => i !== wordIndex);
    const newAvailable = [...availableWords, wordIndex].sort((a, b) => a - b);

    setSelectedWords(newSelected);
    setAvailableWords(newAvailable);
  };

  // 드래그 앤 드롭 핸들러들
  const handleDragStart = (e: React.DragEvent, wordIndex: number) => {
    setDraggedItem(wordIndex);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (targetIndex !== undefined) {
      dragOverIndex.current = targetIndex;
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // 드롭 영역을 완전히 벗어났을 때만 초기화
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      dragOverIndex.current = null;
    }
  };

  const handleDropToSelected = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    if (availableWords.includes(draggedItem)) {
      // 사용 가능한 단어에서 선택된 단어로 이동
      const newAvailable = availableWords.filter(i => i !== draggedItem);
      let newSelected = [...selectedWords];

      if (targetIndex !== undefined && targetIndex < newSelected.length) {
        newSelected.splice(targetIndex, 0, draggedItem);
      } else {
        newSelected.push(draggedItem);
      }

      setAvailableWords(newAvailable);
      setSelectedWords(newSelected);
    } else if (selectedWords.includes(draggedItem)) {
      // 선택된 단어들 간의 재배열
      const currentIndex = selectedWords.indexOf(draggedItem);
      let newSelected = [...selectedWords];
      newSelected.splice(currentIndex, 1);

      if (targetIndex !== undefined && targetIndex <= newSelected.length) {
        newSelected.splice(targetIndex, 0, draggedItem);
      } else {
        newSelected.push(draggedItem);
      }

      setSelectedWords(newSelected);
    }

    setDraggedItem(null);
    dragOverIndex.current = null;
  };

  const handleDropToAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem === null || !selectedWords.includes(draggedItem)) return;

    const newSelected = selectedWords.filter(i => i !== draggedItem);
    const newAvailable = [...availableWords, draggedItem].sort((a, b) => a - b);

    setSelectedWords(newSelected);
    setAvailableWords(newAvailable);
    setDraggedItem(null);
    dragOverIndex.current = null;
  };

  const checkAnswer = () => {
    const correct = JSON.stringify(selectedWords) === JSON.stringify(question.correctOrder);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      () => {
      }
    }
  };

  const resetQuiz = () => {
    setSelectedWords([]);
    setAvailableWords(question.words.map((_, index) => index));
    setIsCorrect(null);
    setShowFeedback(false);
  };

  const canCheck = selectedWords.length === question.words.length;

  return (
    <div className="max-w-3xl mx-auto space-y-8 px-4 sm:px-6">
      <Card
        className="overflow-hidden border-2 border-gray-700 shadow-2xl bg-gradient-to-br from-gray-800 to-blue-950/50">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center pb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="size-6"/>
            <CardTitle className="text-2xl font-bold">단어 배열 퀴즈</CardTitle>
            <Sparkles className="size-6"/>
          </div>
          <p className="text-blue-100 text-lg">단어를 올바른 순서로 배열해보세요!</p>
          <div className="mt-4 text-center">
            <div className="inline-block bg-white/20 rounded-full px-6 py-3">
              <p className="text-2xl font-bold text-white">{question.korean}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {/* 선택된 단어들 - 드롭 영역 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="size-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <p className="text-lg font-medium text-gray-200">배열된 문장</p>
            </div>
            <div
              className={`min-h-20 border-3 border-dashed rounded-2xl p-6 flex flex-wrap gap-3 items-center justify-center transition-all duration-200 ${
                draggedItem !== null && availableWords.includes(draggedItem)
                  ? 'border-blue-400 bg-blue-950/30 scale-[1.02]'
                  : 'border-gray-600 bg-gray-800/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDropToSelected}
            >
              {selectedWords.length === 0 ? (
                <div className="text-center">
                  <p className="text-gray-300 text-lg">🎯 여기에 단어를 드래그하거나 클릭하세요!</p>
                </div>
              ) : (
                selectedWords.map((wordIndex, position) => (
                  <div
                    key={`selected-${wordIndex}`}
                    className="relative"
                    onDragOver={(e) => handleDragOver(e, position)}
                    onDrop={(e) => handleDropToSelected(e, position)}
                  >
                    <Button
                      draggable
                      onDragStart={(e) => handleDragStart(e, wordIndex)}
                      onClick={() => handleSelectedWordClick(wordIndex)}
                      className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-move border-2 border-green-300 text-lg"
                    >
                      {question.words[wordIndex]}
                    </Button>
                    {dragOverIndex.current === position && draggedItem !== null && (
                      <div className="absolute -left-1 top-0 bottom-0 w-1 bg-blue-500 rounded-full animate-pulse"/>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 사용 가능한 단어들 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="size-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <p className="text-lg font-medium text-gray-200">사용 가능한 단어</p>
            </div>
            <div
              className={`min-h-16 border-2 rounded-2xl p-4 flex flex-wrap gap-3 justify-center transition-all duration-200 ${
                draggedItem !== null && selectedWords.includes(draggedItem)
                  ? 'border-orange-400 bg-orange-950/30'
                  : 'border-orange-600/50 bg-orange-950/20'
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDropToAvailable}
            >
              {availableWords.length === 0 ? (
                <p className="text-gray-300 text-center">모든 단어를 사용했습니다! 🎉</p>
              ) : (
                availableWords.map(wordIndex => (
                  <Button
                    key={`available-${wordIndex}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, wordIndex)}
                    onClick={() => handleWordClick(wordIndex)}
                    className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-move border-2 border-orange-300 text-lg"
                  >
                    {question.words[wordIndex]}
                  </Button>
                ))
              )}
            </div>
          </div>

          {/* 피드백 */}
          {showFeedback && (
            <div className={`p-6 rounded-2xl border-2 transition-all duration-300 animate-in slide-in-from-bottom-4 ${
              isCorrect
                ? 'bg-gradient-to-r from-green-950/50 to-emerald-950/50 border-green-500/50'
                : 'bg-gradient-to-r from-red-950/50 to-pink-950/50 border-red-500/50'
            }`}>
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <div className="size-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="size-7 text-white"/>
                  </div>
                ) : (
                  <div className="size-12 bg-red-500 rounded-full flex items-center justify-center">
                    <XCircle className="size-7 text-white"/>
                  </div>
                )}
                <div>
                  <p className="text-xl font-bold text-gray-100">
                    {isCorrect ? '🎉 정답입니다!' : '😅 틀렸습니다!'}
                  </p>
                  {isCorrect ? (
                    <p className="text-green-300">훌륭해요! 다음 문제로 넘어가세요.</p>
                  ) : (
                    <p className="text-red-300">다시 한 번 시도해보세요.</p>
                  )}
                </div>
              </div>
              {!isCorrect && (
                <div className="mt-4 p-4 bg-gray-800/70 rounded-xl">
                  <p className="text-sm font-medium text-gray-300">정답:</p>
                  <p className="text-lg font-bold text-gray-100">
                    {question.correctOrder.map(i => question.words[i]).join(' ')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!showFeedback ? (
              <>
                <Button
                  onClick={checkAnswer}
                  disabled={!canCheck}
                  className={`flex-1 py-4 text-lg font-bold rounded-xl transition-all duration-200 transform hover:scale-105 ${
                    canCheck
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  ✨ 정답 확인하기
                </Button>
                <Button
                  variant="outline"
                  onClick={resetQuiz}
                  className="gap-2 py-4 px-6 rounded-xl border-2 border-gray-600 hover:bg-gray-800 font-medium text-gray-300"
                >
                  <RotateCcw className="size-5"/>
                  초기화
                </Button>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                {!isCorrect && (
                  <Button
                    variant="outline"
                    onClick={() => setShowFeedback(false)}
                    className="flex-1 py-4 text-lg font-medium rounded-xl border-2 border-gray-600 hover:bg-gray-800 text-gray-300"
                  >
                    🔄 다시 시도
                  </Button>
                )}
                <Link href="/dashboard" className="w-full">
                  <Button
                    disabled={!isCorrect}
                    className="w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    🚀 다음 문제로
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}