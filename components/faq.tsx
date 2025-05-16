"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";

export default function Faq() {
  const faqs = [
    {
      question: "정말 기존 엑셀 파일을 그대로 사용할 수 있나요?",
      answer:
        "네, 엑셀 및 구글스프레드 시트를 사용해서 그대로 사용하려 필요한 자동화를 추가할 수 있습니다.",
    },
    {
      question: "사용하던 시트의 데이터는 어떻게 하나요?",
      answer:
        "기존에 갖고 있던 시트를 그대로 활용하는 것이기 때문에 수동으로 데이터를 입력, 업로드할 필요가 전혀 없습니다.",
    },
    {
      question: "우리 학원에 맞게 커스터마이징이 가능한가요?",
      answer:
        "네, 가능합니다. 학원의 특성과 요구사항에 맞게 완전히 맞춤화된 자동화 솔루션을 제공합니다. 상담을 통해 구체적인 요구사항을 파악하고 최적의 솔루션을 제안해 드립니다.",
    },
    {
      question: "사용 중 문제가 발생하면 어떻게 지원받을 수 있나요?",
      answer:
        "이메일, 전화, 채팅을 통해 친절한 사후 지원을 받을 수 있습니다. 이해가 안되거나, 사용하는데 예기치 못한 문제가 생겼을 경우, 최대한 빠르게 도와드립니다.",
    },
    {
      question: "추가로 필요한 비용이 있나요?",
      answer:
        "필요시 기타 서비스 이용비, 추가 비용이 발생할 수 있습니다. 상담을 통해 구체적인 요구사항을 파악하고 최적의 솔루션을 제안해 드립니다.",
    },
    {
      question: "추가 자동화가 필요한 경우 어떻게 하나요?",
      answer:
        "추가 자동화가 필요한 경우, 빠르게 요구사항을 파악 한 뒤, 견적을 제시해 드립니다.",
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
