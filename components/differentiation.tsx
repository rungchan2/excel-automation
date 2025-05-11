"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

export default function Differentiation() {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="text-[#217346]">익숙한 툴</span>을 활용한 스마트한 선택
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            새로운 프로그램을 배우는 것과 익숙한 엑셀을 활용하는 것, 어떤 선택이 더 효율적일까요?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-red-500 mb-2">새로운 프로그램 배우기</h3>
              <p className="text-gray-600">시간과 비용의 추가 투자가 필요합니다</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <XCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">긴 적응 기간</h4>
                  <p className="text-sm text-gray-500">새로운 시스템 적응에 평균 2-3개월 소요</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">데이터 이전 필요</h4>
                  <p className="text-sm text-gray-500">기존 데이터를 새 시스템으로 옮기는 작업 필요</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">높은 초기 비용</h4>
                  <p className="text-sm text-gray-500">라이센스 비용 및 교육 비용 발생</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">제한된 커스터마이징</h4>
                  <p className="text-sm text-gray-500">기성 프로그램의 한계로 맞춤화 어려움</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-lg border border-[#217346]"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#217346] mb-2">익숙한 엑셀 활용하기</h3>
              <p className="text-gray-600">이미 알고 있는 도구로 바로 시작하세요</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#217346] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">즉시 적용 가능</h4>
                  <p className="text-sm text-gray-500">익숙한 엑셀 환경에서 바로 시작</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#217346] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">기존 데이터 그대로 활용</h4>
                  <p className="text-sm text-gray-500">데이터 이전 없이 기존 파일 그대로 사용</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#217346] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">합리적인 비용</h4>
                  <p className="text-sm text-gray-500">추가 라이센스 비용 없이 저렴한 구독료</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#217346] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">완전한 커스터마이징</h4>
                  <p className="text-sm text-gray-500">학원 특성에 맞게 100% 맞춤 설정 가능</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">기존 엑셀 파일과의 연동 과정</h3>

          <div className="relative">
            {/* Process flow */}
            <div className="absolute left-[21px] top-0 h-full w-1 bg-[#217346]"></div>

            <div className="space-y-12">
              <ProcessStep
                number={1}
                title="기존 엑셀 파일 연결"
                description="현재 사용 중인 엑셀 파일을 StudyFlow에 연결합니다. 데이터 구조를 변경할 필요가 없습니다."
              />

              <ProcessStep
                number={2}
                title="자동화 설정"
                description="출결, 문자, 수납 등 자동화하고 싶은 기능을 선택하고 간단히 설정합니다."
              />

              <ProcessStep
                number={3}
                title="테스트 및 조정"
                description="실제 환경에서 테스트하고 필요에 따라 세부 설정을 조정합니다."
              />

              <ProcessStep
                number={4}
                title="실시간 모니터링"
                description="자동화된 시스템이 작동하는 것을 실시간으로 모니터링하고 관리합니다."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ number, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex items-start gap-6"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#217346] text-white flex items-center justify-center font-bold z-10">
        {number}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}
