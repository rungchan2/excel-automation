"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Cta() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-[#217346] text-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">지금 바로 무료로 시작하세요</h2>

          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            2주 무료 체험으로 StudyFlow의 모든 기능을 경험해보세요. 별도의 신용카드 정보 없이 바로 시작할 수 있습니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-[#217346] hover:bg-gray-100">2주 무료 체험 시작하기</Button>

            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/request">
                1:1 맞춤 상담 신청 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="pt-6">
            <p className="text-sm opacity-80">
              이미 10개 이상의 학원이 StudyFlow와 함께하고 있습니다. 지금 바로 시간을 절약하고 학원 운영에 집중하세요.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
