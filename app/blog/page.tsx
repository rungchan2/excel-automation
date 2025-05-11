import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { getAllBlogs } from "@/lib/blog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// This enables dynamic rendering for this route
export const dynamic = "force-dynamic"

// BlogList component with pagination
async function BlogList({ page = 1 }: { page?: number }) {
  const pageSize = 9
  const { data: blogs, error, count } = await getAllBlogs(page, pageSize)

  if (error) {
    console.error("Error fetching blogs:", error)
    return <div className="text-center py-10">블로그 포스트를 불러오는 중 오류가 발생했습니다.</div>
  }

  if (!blogs || blogs.length === 0) {
    return <div className="text-center py-10">아직 작성된 블로그 포스트가 없습니다.</div>
  }

  const totalPages = Math.ceil(count / pageSize)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id} className="h-full">
            <Card className="h-full hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <Image
                  src={blog.image_url || "/placeholder.svg?height=200&width=400"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="flex-1">
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="line-clamp-2">{blog.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  {format(new Date(blog.created_at), "yyyy년 MM월 dd일", { locale: ko })}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-[#217346] hover:bg-[#E6F4EA] hover:text-[#217346]">
                  더 보기
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <Link
            href={`/blog?page=${Math.max(1, page - 1)}`}
            className={`p-2 rounded-full ${page <= 1 ? "text-gray-300 cursor-not-allowed" : "text-[#217346] hover:bg-[#E6F4EA]"}`}
            aria-disabled={page <= 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`/blog?page=${pageNum}`}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                pageNum === page ? "bg-[#217346] text-white" : "text-gray-700 hover:bg-[#E6F4EA]"
              }`}
            >
              {pageNum}
            </Link>
          ))}

          <Link
            href={`/blog?page=${Math.min(totalPages, page + 1)}`}
            className={`p-2 rounded-full ${page >= totalPages ? "text-gray-300 cursor-not-allowed" : "text-[#217346] hover:bg-[#E6F4EA]"}`}
            aria-disabled={page >= totalPages}
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const searchParamsObj = await searchParams
  const page = searchParamsObj.page ? Number.parseInt(searchParamsObj.page) : 1

  return (
    <div className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#217346]">
              홈
            </Link>
            <span>/</span>
            <span className="text-[#217346] font-medium">활용 사례</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            <span className="text-[#217346]">ClassFlow와</span> 활용 사례
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            다양한 학원들이 ClassFlow와 함께 업무 효율을 높이고 시간을 절약한 사례를 확인하세요. 실제 사용자들의 경험과
            성공 스토리를 통해 ClassFlow와가 어떻게 학원 운영을 개선하는지 알아보세요.
          </p>
        </div>

        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList page={page} />
        </Suspense>
      </div>
    </div>
  )
}

// Skeleton loader for blog list
function BlogListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="h-full overflow-hidden">
          <div className="h-48 w-full bg-gray-200 animate-pulse" />
          <CardHeader>
            <div className="h-6 w-3/4 bg-gray-200 animate-pulse mb-2" />
            <div className="h-4 w-full bg-gray-200 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-4 w-1/3 bg-gray-200 animate-pulse" />
          </CardContent>
          <CardFooter>
            <div className="h-8 w-20 bg-gray-200 animate-pulse" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
