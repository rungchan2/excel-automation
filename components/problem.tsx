"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])

  return (
    <section ref={sectionRef} id="service" className="relative py-20 bg-[#F1F1F1] overflow-hidden">
      {/* Excel formula decorations */}
      <div className="absolute top-10 left-10 opacity-10 text-[#217346] text-4xl font-mono">=SUM(A1:A10)</div>
      <div className="absolute bottom-10 right-10 opacity-10 text-[#217346] text-4xl font-mono">
        =VLOOKUP(A2,B:C,2,FALSE)
      </div>

      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity, y }} className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            매일 2시간씩 출결/문자 관리, 주 4시간의 수납 확인...
            <span className="block text-[#217346]">익숙한 이야기인가요?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="text-4xl font-bold text-[#217346] mb-2">
                  <CountUp end={14} suffix="시간" />
                </div>
                <p className="text-gray-500">주당 출결 관리 시간</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="text-4xl font-bold text-[#217346] mb-2">
                  <CountUp end={4} suffix="시간" />
                </div>
                <p className="text-gray-500">주당 수납 확인 시간</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="text-4xl font-bold text-[#217346] mb-2">
                  <CountUp end={10} suffix="시간" />
                </div>
                <p className="text-gray-500">주당 문자 발송 시간</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-lg text-gray-600">
            학원 운영에 필요한 반복적인 업무들이 소중한 시간을 빼앗고 있습니다. 이제 자동화로 시간을 되찾으세요.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Simple CountUp component
function CountUp({ end, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      const calculated = Math.floor(value * end)
      setDisplayValue(calculated > end ? end : calculated)
    })

    return () => unsubscribe()
  }, [scrollYProgress, end])

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  )
}
