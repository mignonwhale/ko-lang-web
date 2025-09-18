import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import {sampleStories} from "@/lib/data";

export default function StoriesPage() {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-100">📚 스토리 선택</h1>
        <p className="text-xl text-gray-300">학습하고 싶은 스토리를 선택해주세요! ✨</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleStories.map(story => (
          <Link key={story.id} href={`/stories/${story.id}`}>
            <StoryCard
              {...story}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}