"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useScroll, useTransform } from "framer-motion"
import { MessageSquare, Search, DollarSign, CheckCircle, XCircle } from "lucide-react"

export default function Solution2() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity, scale }} className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <span className="text-[#217346]">자동화</span> 기능 살펴보기
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              엑셀 기반으로 학원 운영의 핵심 업무를 자동화하여 시간과 비용을 절약하세요.
            </p>
          </div>

          {/* 학부모 문자 자동화 */}
          <div className="relative py-12">
            <h3 className="text-2xl font-bold text-[#217346] text-center mb-8">학부모 문자 자동화</h3>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              출결 상태에 입력하면 문자 자동 발송, 별도 툴 없이 엑셀 그대로 사용가능합니다.
            </p>

            {/* Central Excel spreadsheet mockup */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden z-10 relative">
              <div className="bg-[#217346] text-white p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm">출결관리.xlsx</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#E6F4EA] border-b border-gray-300">
                      <th className="p-2 border-r border-gray-300">학생명</th>
                      <th className="p-2 border-r border-gray-300">학년</th>
                      <th className="p-2 border-r border-gray-300">5/10</th>
                      <th className="p-2 border-r border-gray-300">5/11</th>
                      <th className="p-2 border-r border-gray-300">5/12</th>
                      <th className="p-2">문자발송</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 border-r border-gray-300">김학생</td>
                      <td className="p-2 border-r border-gray-300">고1</td>
                      <td className="p-2 border-r border-gray-300 text-center">출석</td>
                      <td className="p-2 border-r border-gray-300 text-center">출석</td>
                      <td className="p-2 border-r border-gray-300 text-center text-red-500 font-medium">결석</td>
                      <td className="p-2 text-center text-[#217346]">완료</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 border-r border-gray-300">이학생</td>
                      <td className="p-2 border-r border-gray-300">고2</td>
                      <td className="p-2 border-r border-gray-300 text-center">출석</td>
                      <td className="p-2 border-r border-gray-300 text-center text-orange-500 font-medium">지각</td>
                      <td className="p-2 border-r border-gray-300 text-center">출석</td>
                      <td className="p-2 text-center text-[#217346]">완료</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 border-r border-gray-300">박학생</td>
                      <td className="p-2 border-r border-gray-300">고3</td>
                      <td className="p-2 border-r border-gray-300 text-center">출석</td>
                      <td className="p-2 border-r border-gray-300 text-center">출석</td>
                      <td className="p-2 border-r border-gray-300 text-center">출석</td>
                      <td className="p-2 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 border-r border-gray-300">최학생</td>
                      <td className="p-2 border-r border-gray-300">고2</td>
                      <td className="p-2 border-r border-gray-300 text-center text-red-500 font-medium">결석</td>
                      <td className="p-2 border-r border-gray-300 text-center">출석</td>
                      <td className="p-2 border-r border-gray-300 text-center">출석</td>
                      <td className="p-2 text-center text-[#217346]">완료</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Floating message elements */}
            <motion.div
              className="absolute top-1/4 left-[5%] bg-white p-4 rounded-lg shadow-md border border-gray-200 max-w-[250px] z-20"
              animate={{
                y: [0, -10, 0],
                rotate: [-1, 1, -1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-6 w-6 text-[#217346]" />
                <p className="font-medium">자동 문자 발송</p>
              </div>
              <p className="text-sm text-gray-600">결석/지각 학생에게 맞춤형 메시지가 자동으로 발송됩니다.</p>
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 right-[5%] bg-[#217346] text-white p-4 rounded-lg shadow-md max-w-[250px] z-20"
              animate={{
                y: [0, 10, 0],
                rotate: [1, -1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
            >
              <p className="font-medium mb-1">연락 일람 문자 발송 완료</p>
              <p className="text-sm opacity-90">
                총 32명의 학생 중 결석 3명, 지각 2명에게 자동 문자 발송이 완료되었습니다.
              </p>
            </motion.div>

            <motion.div
              className="absolute top-1/2 right-[15%] bg-white p-3 rounded-full shadow-lg border-2 border-[#217346] z-20"
              animate={{
                scale: [1, 1.1, 1],
                rotate: 360,
              }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                },
                rotate: {
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
            >
              <MessageSquare className="h-8 w-8 text-[#217346]" />
            </motion.div>

            <motion.div
              className="absolute bottom-1/3 left-[15%] bg-white p-2 rounded-lg shadow-md border border-gray-200 z-20"
              animate={{
                x: [0, 10, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            >
              <p className="text-xs font-medium text-[#217346]">김학생 결석 알림 발송됨</p>
            </motion.div>
          </div>

          {/* 수납/미납 안내 자동화 */}
          <div className="relative py-12 group">
            <h3 className="text-2xl font-bold text-[#217346] text-center mb-8">수납/미납 안내 자동화</h3>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              청구서 예약 한 번이면 매월 자동 안내 미납 문자도 자동으로 보내드립니다.
            </p>

            {/* Central Excel spreadsheet mockup */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden z-10 relative">
              <div className="bg-[#217346] text-white p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm">수납관리.xlsx</div>
              </div>

              <div className="bg-gray-100 p-2 flex items-center gap-2 border-b border-gray-300">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="학생명 검색..."
                  className="bg-white border border-gray-300 rounded px-2 py-1 text-sm w-40"
                />
                <div className="ml-auto flex items-center gap-1 text-xs">
                  <span className="font-medium">필터:</span>
                  <span className="bg-white border border-gray-300 rounded px-2 py-1">전체</span>
                  <span className="bg-white border border-gray-300 rounded px-2 py-1">납부</span>
                  <span className="bg-white border border-gray-300 rounded px-2 py-1">미납</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#E6F4EA] border-b border-gray-300">
                      <th className="p-2 border-r border-gray-300">학생명</th>
                      <th className="p-2 border-r border-gray-300">학년</th>
                      <th className="p-2 border-r border-gray-300">수강료</th>
                      <th className="p-2 border-r border-gray-300">납부일</th>
                      <th className="p-2 border-r border-gray-300">상태</th>
                      <th className="p-2">안내</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 border-r border-gray-300">김학생</td>
                      <td className="p-2 border-r border-gray-300">고1</td>
                      <td className="p-2 border-r border-gray-300">350,000원</td>
                      <td className="p-2 border-r border-gray-300">2023-05-05</td>
                      <td className="p-2 border-r border-gray-300">
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">납부</span>
                      </td>
                      <td className="p-2 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-red-50">
                      <td className="p-2 border-r border-gray-300">이학생</td>
                      <td className="p-2 border-r border-gray-300">고2</td>
                      <td className="p-2 border-r border-gray-300">200,000원</td>
                      <td className="p-2 border-r border-gray-300">-</td>
                      <td className="p-2 border-r border-gray-300">
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">미납</span>
                      </td>
                      <td className="p-2 text-center text-[#217346]">완료</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 border-r border-gray-300">박학생</td>
                      <td className="p-2 border-r border-gray-300">고3</td>
                      <td className="p-2 border-r border-gray-300">400,000원</td>
                      <td className="p-2 border-r border-gray-300">2023-05-10</td>
                      <td className="p-2 border-r border-gray-300">
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">납부</span>
                      </td>
                      <td className="p-2 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-red-50">
                      <td className="p-2 border-r border-gray-300">최학생</td>
                      <td className="p-2 border-r border-gray-300">고2</td>
                      <td className="p-2 border-r border-gray-300">300,000원</td>
                      <td className="p-2 border-r border-gray-300">-</td>
                      <td className="p-2 border-r border-gray-300">
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">미납</span>
                      </td>
                      <td className="p-2 text-center text-[#217346]">완료</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Floating message elements that disappear on hover */}
            <motion.div
              className="absolute top-1/4 left-[5%] bg-white p-4 rounded-lg shadow-md border border-gray-200 max-w-[250px] z-20 transition-opacity duration-300 group-hover:opacity-0"
              animate={{
                y: [0, -10, 0],
                rotate: [-1, 1, -1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-6 w-6 text-[#217346]" />
                <p className="font-medium">자동 수납 관리</p>
              </div>
              <p className="text-sm text-gray-600">수강료 납부 상태를 자동으로 확인하고 관리합니다.</p>
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 right-[5%] bg-red-500 text-white p-4 rounded-lg shadow-md max-w-[250px] z-20 transition-opacity duration-300 group-hover:opacity-0"
              animate={{
                y: [0, 10, 0],
                rotate: [1, -1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
            >
              <p className="font-medium mb-1">미납 안내 메시지</p>
              <p className="text-sm opacity-90">
                이학생님의 수강료 200,000원이 미납 상태입니다. 빠른 시일 내에 납부 부탁드립니다.
              </p>
            </motion.div>

            <motion.div
              className="absolute top-1/2 right-[15%] bg-white p-3 rounded-full shadow-lg border-2 border-red-500 z-20 transition-opacity duration-300 group-hover:opacity-0"
              animate={{
                scale: [1, 1.1, 1],
                rotate: 360,
              }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                },
                rotate: {
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
            >
              <DollarSign className="h-8 w-8 text-red-500" />
            </motion.div>

            <motion.div
              className="absolute bottom-1/3 left-[15%] bg-white p-2 rounded-lg shadow-md border border-gray-200 z-20 transition-opacity duration-300 group-hover:opacity-0"
              animate={{
                x: [0, 10, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <p className="text-xs font-medium">납부 완료: 15명</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-1/3 right-[25%] bg-white p-2 rounded-lg shadow-md border border-gray-200 z-20 transition-opacity duration-300 group-hover:opacity-0"
              animate={{
                x: [0, -10, 0],
                y: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1.5,
              }}
            >
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <p className="text-xs font-medium">미납: 5명</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
