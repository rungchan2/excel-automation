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
            매일 2시간씩 출결/문자 관리, <br/>주 4시간의 수납 확인...
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
          ‘이거 지난번에도 했던 건데…’라는 생각, 하루에도 몇 번씩 드시죠? <br/>기억에 의존하고, 엑셀에 흩어지고, 대화가 반복되는 지금의 운영 방식. 이제 바꿔야 할 시간입니다.
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
  const [inView, setInView] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])
  
  useEffect(() => {
    if (!inView) return
    
    let startTime: number | null = null
    const duration = 1000 // 카운트업 지속 시간 (ms)
    
    const easeInOutCubic = (t: number): number => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
    }
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsedTime = timestamp - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      const easedProgress = easeInOutCubic(progress)
      
      const value = Math.floor(easedProgress * end)
      setDisplayValue(value)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(end)
      }
    }
    
    requestAnimationFrame(animate)
    
    return () => {
      startTime = null
    }
  }, [inView, end])

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  )
}
