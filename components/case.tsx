"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import Image from "next/image"
import { BlogListItem } from "@/types/blog"
import { supabase } from "@/lib/supabase"

// Blog grid layout background colors
const bgColors = ["bg-[#E6F4EA]", "bg-[#E8F0FE]", "bg-[#FEF7E0]", "bg-[#FEEAE6]"]

export default function Case() {
  const [cases, setCases] = useState<BlogListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentCases() {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("blog")
        .select("id, title, subtitle, created_at, image_url")
        .order("created_at", { ascending: false })
        .limit(4)

      if (error) {
        console.error("Error fetching case studies:", error)
      } else {
        setCases(data || [])
      }
      setIsLoading(false)
    }

    fetchRecentCases()
  }, [])

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="text-[#217346]">성공 사례</span>로 증명된 효과
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            다양한 학원들이 StudyFlow와 함께 업무 효율을 높이고 시간을 절약한 사례를 확인하세요.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((_, idx) => (
              <Card key={idx} className="animate-pulse overflow-hidden border-t-4 border-t-[#217346] h-full">
                <div className="h-40 bg-gray-200"></div>
                <CardHeader className="bg-gray-100">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {cases.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="will-change-transform"
              >
                <Card className="overflow-hidden border-t-4 border-t-[#217346] h-full">
                  <div className="absolute right-0 top-0 h-16 w-16 opacity-10">
                    <div className="grid h-full w-full grid-cols-4 grid-rows-4">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="border border-[#217346]"></div>
                      ))}
                    </div>
                  </div>

                  {caseStudy.image_url && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={caseStudy.image_url}
                        alt={caseStudy.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <CardHeader className={`${bgColors[index % bgColors.length]} bg-opacity-30`}>
                    <CardTitle className="text-xl">{caseStudy.title}</CardTitle>
                    <CardDescription className="text-gray-700">
                      {format(new Date(caseStudy.created_at), "yyyy년 MM월 dd일", { locale: ko })}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <p className="text-gray-600">{caseStudy.subtitle}</p>
                  </CardContent>

                  <CardFooter>
                    <Link href={`/blog/${caseStudy.id}`}>
                      <Button variant="ghost" className="text-[#217346] hover:bg-[#E6F4EA] hover:text-[#217346] p-0">
                        자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button className="bg-[#217346] hover:bg-[#185C37]">모든 활용 사례 보기</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
