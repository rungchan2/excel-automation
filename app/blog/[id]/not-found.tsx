import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogNotFound() {
  return (
    <div className="py-20 text-center">
      <div className="container px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-4">블로그 포스트를 찾을 수 없습니다</h1>
        <p className="text-lg text-gray-600 mb-8">요청하신 블로그 포스트가 존재하지 않거나 삭제되었습니다.</p>
        <Link href="/blog">
          <Button className="bg-[#217346] hover:bg-[#185C37]">블로그 목록으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  )
}
