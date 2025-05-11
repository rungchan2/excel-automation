"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { UserCheck, MessageSquare, CreditCard } from "lucide-react"
import Image from "next/image"

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-[#F1F1F1]">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            주요 <span className="text-[#217346]">자동화 기능</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            StudyFlow의 주요 기능으로 학원 관리의 효율성을 높이고 시간을 절약하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="출결관리 자동화"
            description="QR코드 체크인으로 출결 상태를 자동으로 기록하고 관리합니다."
            icon={<UserCheck className="h-10 w-10 text-[#217346]" />}
            percentage={85}
            backContent={
              <>
                <h4 className="font-bold mb-2">주요 기능</h4>
                <ul className="text-sm space-y-1 text-left">
                  <li>• QR코드 기반 출석 체크</li>
                  <li>• 엑셀 시트 자동 업데이트</li>
                  <li>• 결석/지각 자동 집계</li>
                  <li>• 출결 통계 자동 생성</li>
                </ul>
                <div className="mt-4">
                  <Image
                    src="/placeholder.svg?height=100&width=200"
                    alt="출결관리 스크린샷"
                    width={200}
                    height={100}
                    className="rounded-md mx-auto"
                  />
                </div>
              </>
            }
          />

          <FeatureCard
            title="문자 자동발송"
            description="출결 상태에 따라 맞춤형 문자를 자동으로 발송합니다."
            icon={<MessageSquare className="h-10 w-10 text-[#217346]" />}
            percentage={90}
            backContent={
              <>
                <h4 className="font-bold mb-2">주요 기능</h4>
                <ul className="text-sm space-y-1 text-left">
                  <li>• 결석/지각 시 자동 문자 발송</li>
                  <li>• 수업 알림 자동 발송</li>
                  <li>• 맞춤형 메시지 템플릿</li>
                  <li>• 발송 이력 자동 기록</li>
                </ul>
                <div className="mt-4">
                  <Image
                    src="/placeholder.svg?height=100&width=200"
                    alt="문자 자동발송 스크린샷"
                    width={200}
                    height={100}
                    className="rounded-md mx-auto"
                  />
                </div>
              </>
            }
          />

          <FeatureCard
            title="수납관리 자동화"
            description="입금 내역을 자동으로 확인하고 미납자에게 알림을 보냅니다."
            icon={<CreditCard className="h-10 w-10 text-[#217346]" />}
            percentage={75}
            backContent={
              <>
                <h4 className="font-bold mb-2">주요 기능</h4>
                <ul className="text-sm space-y-1 text-left">
                  <li>• 입금 내역 자동 확인</li>
                  <li>• 미납자 자동 식별</li>
                  <li>• 납부 알림 자동 발송</li>
                  <li>• 월별 수납 통계 자동 생성</li>
                </ul>
                <div className="mt-4">
                  <Image
                    src="/placeholder.svg?height=100&width=200"
                    alt="수납관리 스크린샷"
                    width={200}
                    height={100}
                    className="rounded-md mx-auto"
                  />
                </div>
              </>
            }
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ title, description, icon, percentage, backContent }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="h-[400px] perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 p-6 flex flex-col items-center text-center backface-hidden">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>

          <div className="mt-auto w-full">
            <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#217346]"
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>시간 절약</span>
              <span className="font-bold">{percentage}%</span>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card
          className="absolute inset-0 p-6 flex flex-col items-center text-center backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="space-y-4">{backContent}</div>
        </Card>
      </motion.div>
    </div>
  )
}
