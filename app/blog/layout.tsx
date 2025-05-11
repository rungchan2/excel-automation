import type React from "react"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "StudyFlow 활용 사례 | 엑셀 기반 학원 관리 자동화",
  description: "다양한 학원들이 StudyFlow와 함께 업무 효율을 높이고 시간을 절약한 사례를 확인하세요.",
  openGraph: {
    title: "StudyFlow 활용 사례 | 엑셀 기반 학원 관리 자동화",
    description: "다양한 학원들이 StudyFlow와 함께 업무 효율을 높이고 시간을 절약한 사례를 확인하세요.",
    type: "website",
    url: "https://studyflow.com/blog",
    siteName: "StudyFlow",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
