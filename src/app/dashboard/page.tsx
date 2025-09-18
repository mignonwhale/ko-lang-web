import LearningDashboard from "@/components/LearningDashboard";
import {sampleStats} from "@/lib/data";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: '진도관리 - KoLang',
  description: '재미있는 스토리와 인터랙티브한 학습으로 자연스럽게 한국어를 마스터하세요',
};

export default function DashboardPage() {
  return <LearningDashboard stats={sampleStats} />;
}