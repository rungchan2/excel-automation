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

// 호버 애니메이션 변수
const cardVariants = {
  initial: { 
    y: 0, 
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" 
  },
  hover: { 
    y: -12, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 2px rgba(33, 115, 70, 0.3)",
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
}

const imageVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.4 }
  }
}

const arrowVariants = {
  initial: { x: 0 },
  hover: { 
    x: 5,
    transition: { 
      repeat: Infinity,
      repeatType: "mirror" as const,
      duration: 0.7
    }
  }
}

const titleVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    color: "#185C37",
    transition: { duration: 0.2 }
  }
}

const gridVariants = {
  initial: { opacity: 0.1 },
  hover: { 
    opacity: 0.2,
    transition: { duration: 0.3 }
  }
}

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
        setCases(data)
      }
      setIsLoading(false)
    }

    fetchRecentCases()
  }, [])

  return (
    <section className="py-20 md:py-32 bg-white" id="case">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="text-[#217346]">성공 사례</span>로 증명된 효과
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            다양한 학원들이 ClassFlow와 함께 업무 효율을 높이고 시간을 절약한 사례를 확인하세요.
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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="will-change-transform"
              >
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  variants={cardVariants}
                  className="h-full rounded-lg overflow-hidden"
                >
                  <Link href={`/blog/${caseStudy.id}`} className="block h-full">
                    <Card className="overflow-hidden border-t-4 border-t-[#217346] h-full bg-white relative">
                      <motion.div className="absolute right-0 top-0 h-16 w-16 opacity-10" variants={gridVariants}>
                        <div className="grid h-full w-full grid-cols-4 grid-rows-4">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="border border-[#217346]"></div>
                          ))}
                        </div>
                      </motion.div>

                      {caseStudy.image_url && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <motion.div className="w-full h-full" variants={imageVariants}>
                            <Image
                              src={caseStudy.image_url}
                              alt={caseStudy.title}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        </div>
                      )}

                      <CardHeader className={`${bgColors[index % bgColors.length]} bg-opacity-30`}>
                        <motion.div variants={titleVariants}>
                          <CardTitle className="text-xl transition-colors">{caseStudy.title}</CardTitle>
                        </motion.div>
                        <CardDescription className="text-gray-700">
                          {format(new Date(caseStudy.created_at), "yyyy년 MM월 dd일", { locale: ko })}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <p className="text-gray-600">{caseStudy.subtitle}</p>
                      </CardContent>

                      <CardFooter>
                        <Button variant="ghost" className="text-[#217346] hover:bg-[#E6F4EA] hover:text-[#217346] px-2 group">
                          자세히 보기 
                          <motion.span variants={arrowVariants} className="inline-block ml-2">
                            <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
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
