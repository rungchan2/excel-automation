"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";

export default function Faq() {
  const faqs = [
    {
      question: "기존 데이터를 그대로 사용할 수 있나요?",
      answer:
        "네, 기존에 사용하시던 엑셀 파일을 그대로 활용할 수 있습니다. 데이터 구조를 변경하거나 새로운 시스템으로 이전할 필요가 없습니다.",
    },
    {
      question: "코딩 지식이 필요한가요?",
      answer:
        "전혀 필요하지 않습니다. ClassFlow는 코딩 지식 없이도 쉽게 설정하고 사용할 수 있도록 설계되었습니다. 간단한 설정만으로 자동화를 시작할 수 있습니다.",
    },
    {
      question: "우리 학원에 맞게 커스터마이징이 가능한가요?",
      answer:
        "네, 가능합니다. 학원의 특성과 요구사항에 맞게 완전히 맞춤화된 자동화 솔루션을 제공합니다. 상담을 통해 구체적인 요구사항을 파악하고 최적의 솔루션을 제안해 드립니다.",
    },
    {
      question: "설치가 필요한가요?",
      answer:
        "별도의 프로그램 설치가 필요하지 않습니다. 클라우드 기반으로 작동하므로 인터넷이 연결된 환경에서 언제 어디서나 접근하고 관리할 수 있습니다.",
    },
    {
      question: "데이터는 안전한가요?",
      answer:
        "네, 모든 데이터는 암호화되어 안전하게 보관됩니다. 정기적인 백업과 보안 업데이트를 통해 데이터 보안을 최우선으로 고려하고 있습니다.",
    },
    {
      question: "사용 중 문제가 발생하면 어떻게 지원받을 수 있나요?",
      answer:
        "이메일, 전화, 실시간 채팅을 통해 신속한 기술 지원을 제공합니다. 프리미엄 요금제 사용자는 우선 지원을 받을 수 있습니다.",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            자주 묻는 <span className="text-[#217346]">질문</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ClassFlow에 대해 궁금한 점을 확인하세요.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Excel filter style header */}
          <div className="flex items-center gap-2 p-3 bg-[#217346] text-white rounded-t-lg">
            <Filter className="h-5 w-5" />
            <span className="font-medium">자주 묻는 질문 필터</span>
          </div>

          <div className="border border-t-0 rounded-b-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isLast={index === faqs.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
  isLast,
}: {
  question: string;
  answer: string;
  isLast: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${!isLast ? "border-b" : ""}`}>
      <button
        className="flex items-center justify-between w-full p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-[#217346] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-gray-600">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
