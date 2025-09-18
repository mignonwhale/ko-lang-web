import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import {Clock, Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Progress} from "@/components/ui/progress";

interface StoryCardProps {
  title: string;
  level: string;
  duration: string;
  progress: number;
  description: string;
  image: string;
  onClick?: () => void;
}

export default function StoryCard({
                            title,
                            level,
                            duration,
                            progress,
                            description,
                            image,
                            onClick
                          }: StoryCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case '초급':
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
      case '중급':
        return 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white';
      case '고급':
        return 'bg-gradient-to-r from-red-400 to-pink-500 text-white';
      default:
        return 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white';
    }
  };

  const getLevelEmoji = (level: string) => {
    switch (level) {
      case '초급':
        return '🌱';
      case '중급':
        return '🌿';
      case '고급':
        return '🌳';
      default:
        return '⭐';
    }
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-700 hover:border-blue-500 bg-gray-800/50 backdrop-blur-sm overflow-hidden"
      onClick={onClick}
    >
      <div className="aspect-video w-full bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-lg overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${getLevelColor(level)} px-3 py-1 text-sm font-bold shadow-lg border-0`}>
            {getLevelEmoji(level)} {level}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium text-gray-200 shadow-lg">
          <Clock className="size-3" />
          {duration}
        </div>
        {progress > 0 && (
          <div className="absolute bottom-3 right-3 bg-yellow-400 rounded-full p-2 shadow-lg">
            <Star className="size-4 text-yellow-800 fill-current" />
          </div>
        )}
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-100 leading-tight">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-300 leading-relaxed">{description}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-300 flex items-center gap-1">
              📊 학습 진도
            </span>
            <span className="font-bold text-blue-400">{progress}%</span>
          </div>
          <div className="relative">
            <Progress
              value={progress}
              className="h-3 bg-gray-200"
            />
            <div
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 0 && (
            <p className="text-sm text-gray-400 text-center">🚀 새로운 모험을 시작해보세요!</p>
          )}
          {progress > 0 && progress < 100 && (
            <p className="text-sm text-blue-400 text-center font-medium">💪 계속 학습해보세요!</p>
          )}
          {progress === 100 && (
            <p className="text-sm text-green-400 text-center font-medium">🎉 완료했습니다!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}