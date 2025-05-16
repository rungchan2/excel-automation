"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, FileSpreadsheet } from "lucide-react";

export default function Differentiation() {
  return (
    <section className="py-20 md:py-32 bg-[#F1F1F1]">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl relative">
            <div className="relative inline-flex items-center justify-center group overflow-visible">
              <FileSpreadsheet className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/3 top-1/3 text-[#217346] opacity-20 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 transition-all duration-500 ease-in-out group-hover:opacity-40 group-hover:scale-110" />
              <span className="relative z-10 text-[#217346] px-3 py-1 transition-all duration-300 group-hover:font-extrabold">스프레드시트</span>
            </div>
            를 활용한
            스마트한 선택
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            새로운 프로그램을 배우는 것과 익숙한 엑셀을 활용하는 것, 어떤 선택이
            더 효율적일까요?
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
              <h3 className="text-xl font-bold text-red-500 mb-2">
                새로운 프로그램 익히기
              </h3>
              <p className="text-gray-600">
                익히는데 2~3달 소요되는 기능만 많은 비싼 프로그램 사용하기
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <XCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">긴 적응 기간</h4>
                  <p className="text-sm text-gray-500">
                    새로운 시스템 적응에 평균 2-3개월 소요
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">데이터 이전의 불편함</h4>
                  <p className="text-sm text-gray-500">
                    수동으로 학생 데이터를 입력해야하는 번거로움
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">높은 월간 사용료</h4>
                  <p className="text-sm text-gray-500">
                    월마다, 학생마다 나가는 높은 고정비용
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">커스터마이징 X</h4>
                  <p className="text-sm text-gray-500">
                    학원 상황과 맞지않는 기성 프로그램 기능들..
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden group"
          >
            {/* 애니메이션 테두리 효과 */}
            <motion.div 
              className="absolute inset-0 rounded-lg pointer-events-none"
              initial={{ boxShadow: "inset 0 0 0 2px #217346" }}
              animate={{ 
                boxShadow: ["inset 0 0 0 2px #217346", "inset 0 0 0 3px #217346", "inset 0 0 0 2px #217346"],
                borderColor: ["#217346", "#16A349", "#217346"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#217346] mb-2">
                클래스플로우의 자동화 서비스
              </h3>
              <p className="text-gray-600">
                학원 상황에 맞는 맞춤 자동화 서비스
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#217346] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">즉시 적용 가능</h4>
                  <p className="text-sm text-gray-500">
                    익숙한 엑셀 및 스프레드 시트 환경에서 바로 시작
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#217346] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">기존 데이터 그대로 활용</h4>
                  <p className="text-sm text-gray-500">
                    데이터 이전 없이 기존 파일 그대로 사용
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#217346] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">합리적인 비용</h4>
                  <p className="text-sm text-gray-500">
                    비싼 구독료 대신 1회 지불로 끝
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#217346] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">완전한 커스터마이징</h4>
                  <p className="text-sm text-gray-500">
                    학원 특성에 맞게 100% 맞춤 설정 가능
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            기존 엑셀 파일과의 연동 과정
          </h3>

          <div className="relative">
            {/* Process flow */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: [0, 0.5, 1] }}
              transition={{ 
                duration: 2, 
                ease: [0.23, 1, 0.32, 1],
                opacity: { duration: 2.5, times: [0, 0.2, 1] }
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="absolute left-[18px] top-0 h-[calc(100%-20px)] w-1 origin-top"
              style={{
                background: "linear-gradient(to bottom, #217346 85%, rgba(33, 115, 70, 0))"
              }}
            ></motion.div>

            <div className="space-y-12">
              <ProcessStep
                number={1}
                title="상담 및 설계"
                description="현재 학원의 상황과 필요에 맞는 자동화 서비스를 설계합니다."
              />

              <ProcessStep
                number={2}
                title="자동화 세팅"
                description="보통 구글 시트로 작업을 진행하며, 학원 특성에 맞게 세팅을 진행합니다."
              />

              <ProcessStep
                number={3}
                title="추가 연결해야하는 앱 및 모듈 추가"
                description="시트와 함께 사용하고 싶은 서비스를 편의성을 고려해 추가합니다."
              />

              <ProcessStep
                number={4}
                title="온보딩 및 시연"
                description="구현된 자동화에 대한 온라인 시연과 추후 사용방법에 대한 자세한 안내를 진행합니다."
              />
              <ProcessStep
                number={5}
                title="사후 지원 및 유지보수"
                description="한달간 무료 유지 보수 및 사용 지원을 진행합니다."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
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
  );
}
