"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1])

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity, scale }} className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              익숙한 엑셀에서 시작하는 <span className="text-[#217346]">스마트한 자동화</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              새로운 프로그램을 배울 필요 없이, 지금 사용하고 있는 엑셀 파일 그대로 자동화를 시작하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">기존 엑셀 파일을 그대로 활용</h3>
              <p className="text-gray-600">
                새로운 시스템으로 데이터를 옮기거나 변환할 필요가 없습니다. 지금 사용하고 계신 엑셀 파일을 그대로
                연결하여 자동화를 시작합니다.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-[#217346] rounded-full p-1 text-white">
                    <ArrowRight size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">출결 관리 자동화</h4>
                    <p className="text-sm text-gray-500">QR코드 체크인으로 자동 출결 기록</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-[#217346] rounded-full p-1 text-white">
                    <ArrowRight size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">문자 자동 발송</h4>
                    <p className="text-sm text-gray-500">출결 상태에 따른 맞춤형 문자 자동 발송</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-[#217346] rounded-full p-1 text-white">
                    <ArrowRight size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">수납 관리 자동화</h4>
                    <p className="text-sm text-gray-500">입금 내역 자동 확인 및 미납자 알림</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[300px] w-full rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Make.com integration with Excel"
                  width={500}
                  height={300}
                  className="object-cover"
                />
              </div>

              {/* Workflow visualization */}
              <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#217346]"></div>
                  <div className="h-0.5 w-8 bg-gray-300"></div>
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <div className="h-0.5 w-8 bg-gray-300"></div>
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
