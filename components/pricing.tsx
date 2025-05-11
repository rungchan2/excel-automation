"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-[#F1F1F1]">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            합리적인 <span className="text-[#217346]">요금제</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">학원 규모와 필요에 맞는 요금제를 선택하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard
            title="기본형"
            price="49,000"
            description="소규모 학원을 위한 기본 자동화 패키지"
            features={[
              { name: "출결 관리 자동화", included: true },
              { name: "문자 자동 발송 (월 500건)", included: true },
              { name: "기본 수납 관리", included: true },
              { name: "Excel 연동", included: true },
              { name: "기술 지원", included: true },
              { name: "맞춤형 설정", included: false },
              { name: "고급 통계 분석", included: false },
              { name: "무제한 문자 발송", included: false },
            ]}
            buttonText="2주 무료 체험"
            popular={false}
          />

          <PricingCard
            title="프리미엄형"
            price="89,000"
            description="중대형 학원을 위한 고급 자동화 패키지"
            features={[
              { name: "출결 관리 자동화", included: true },
              { name: "문자 자동 발송 (무제한)", included: true },
              { name: "고급 수납 관리", included: true },
              { name: "Excel 연동", included: true },
              { name: "우선 기술 지원", included: true },
              { name: "맞춤형 설정", included: true },
              { name: "고급 통계 분석", included: true },
              { name: "API 연동", included: true },
            ]}
            buttonText="2주 무료 체험"
            popular={true}
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-2">모든 요금제는 월간 구독 기준이며, 연간 결제 시 20% 할인됩니다.</p>
          <p className="text-sm font-medium text-[#217346]">지금 가입하시면 얼리버드 30% 할인!</p>
        </div>
      </div>
    </section>
  )
}

function PricingCard({ title, price, description, features, buttonText, popular }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className={`overflow-hidden ${popular ? "border-[#217346] shadow-lg" : ""}`}>
        {popular && (
          <div className="bg-[#217346] text-white text-center py-1 text-sm font-medium">가장 인기 있는 선택</div>
        )}

        <CardHeader className="pb-0">
          <div className="text-center">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-gray-500 mb-4">{description}</p>
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-bold">{price}</span>
              <span className="text-gray-500 ml-1">원/월</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                {feature.included ? (
                  <Check className="h-5 w-5 text-[#217346] mr-2 flex-shrink-0" />
                ) : (
                  <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                )}
                <span className={feature.included ? "" : "text-gray-400"}>{feature.name}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <Button className={`w-full ${popular ? "bg-[#217346] hover:bg-[#185C37]" : "bg-gray-800 hover:bg-gray-700"}`}>
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
