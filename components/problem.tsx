"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  FileSpreadsheet,
  RotateCcw,
  Zap,
  ChevronDown,
  FileText,
  DownloadCloud,
} from "lucide-react";
import Image from "next/image";

// ClientOnly wrapper component
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  // Animation variants for Excel formulas
  const formulaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 0.05, // 낮은 투명도
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  // Excel formulas for background decoration
  const excelFormulas = [
    "=VLOOKUP(A2,학생목록!A:C,3,FALSE)",
    '=COUNTIF(C2:C50,"결석")',
    '=IF(D5="미납","문자발송","")',
    '=CONCATENATE(B2," 학생 ",C2," 상태")',
    '=SUMIF(E2:E50,"완료",F2:F50)',
    "=TODAY()",
    "=AVERAGE(G2:G20)",
  ];

  // Store positions in state to avoid hydration mismatch
  const [formulaPositions, setFormulaPositions] = useState<
    Array<{
      top: string;
      left: string;
      rotate: string;
    }>
  >([]);

  // Calculate positions on client side only
  useEffect(() => {
    const positions = excelFormulas.map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      rotate: `rotate(${Math.random() * 20 - 10}deg)`,
    }));
    setFormulaPositions(positions);
  }, []);

  // 순환형 다이어그램 애니메이션 컨트롤
  const cycleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cycleItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  // 순환 애니메이션
  const rotationVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 60,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // 각 주기 항목에 대한 세부 정보
  const cycleItems = [
    {
      title: "복잡한 행정 업무",
      icon: <FileText className="h-10 w-10 text-red-500" />,
      description: "출결/수납/문자 업무에 매일 2시간 이상 소요",
      color: "from-red-100 to-red-50",
      borderColor: "border-red-200",
      iconBg: "bg-red-100",
    },
    {
      title: "새 프로그램 도입",
      icon: <DownloadCloud className="h-10 w-10 text-orange-500" />,
      description: "새로운 솔루션 습득에 한 달 이상 소요",
      color: "from-orange-100 to-orange-50",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-100",
    },
    {
      title: "결국 엑셀로 회귀",
      icon: <FileSpreadsheet className="h-10 w-10 text-blue-500" />,
      description: "익숙함을 찾아 결국 엑셀로 돌아옴",
      color: "from-blue-100 to-blue-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="service"
      className="relative py-16 bg-[#F1F1F1] overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Excel formula decorations */}
      <ClientOnly>
        {formulaPositions.length > 0 &&
          excelFormulas.map((formula, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={formulaVariants}
              className={`absolute text-[#217346] text-xl md:text-2xl font-mono hidden md:block`}
              style={{
                top: formulaPositions[index].top,
                left: formulaPositions[index].left,
                transform: formulaPositions[index].rotate,
              }}
            >
              {formula}
            </motion.div>
          ))}
      </ClientOnly>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div style={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
          {/* Section title and intro - 더 간결한 텍스트 */}
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4"
            >
              매일 반복되는 행정업무,
              <span className="block text-[#217346]">익숙한 이야기인가요?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              매일 반복되는 업무, 이 문제를 해결하려고 새로운 툴 도입, 하지만
              결국 원래 쓰던 기본적인 도구로 돌아오는 악순환. 지금 나의 학원
              이야기 아닌가요?
            </motion.p>
          </div>

          {/* 순환형 다이어그램 - 핵심 시각적 요소 */}
          <motion.div
            className="mb-16 flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cycleVariants}
          >
            {/* 순환 사이클 다이어그램 */}
            <div className="relative w-full max-w-4xl h-[320px] md:h-[450px] mx-auto">
              {/* 느린 회전 배경 요소 */}
              <motion.div
                className="absolute inset-0 m-auto w-[80%] h-[80%] opacity-5 z-0"
                variants={rotationVariants}
                animate="animate"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-full h-full rounded-full border-8 border-[#217346]"></div>
              </motion.div>

              {/* 순환 경로 베이스 - 더 두꺼운 원형 경로 */}
              <div
                className="absolute w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full border-4 border-dashed border-gray-200 opacity-60"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>

              {/* 주기 항목들 */}
              {cycleItems.map((item, index) => {
                // Calculate position with 120 degree spacing (360/3 = 120)
                // Start from top (-90 degrees)
                const angle = (index * 120 - 90) * (Math.PI / 180);
                const radius = 170; // Circle radius
                const x = (Math.cos(angle) * radius).toFixed(2);
                const y = (Math.sin(angle) * radius).toFixed(2);
                console.log(x, y);

                return (
                  <motion.div
                    key={index}
                    className="absolute w-[160px] md:w-[200px] z-10"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    initial={{
                      x: `calc(-50% + ${x}px)`,
                      y: `calc(-50% + ${y}px)`,
                    }}
                    animate={{
                      x: `calc(-50% + ${x}px)`,
                      y: `calc(-50% + ${y}px)`,
                    }}
                    variants={cycleItemVariants}
                  >
                    <div
                      className={`p-4 rounded-lg border ${item.borderColor} bg-gradient-to-b ${item.color} shadow-md`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`${item.iconBg} p-3 rounded-full mb-2`}>
                          {item.icon}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* 연결 화살표 - SVG 사용 - 더 두껍고 선명한 화살표 */}
              <svg
                className="absolute pointer-events-none"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "340px",
                  height: "340px",
                }}
                viewBox="-170 -170 340 340"
                fill="none"
              >
                <motion.path
                  d="M0,-130 C-130,-130 -130,0 -130,0 C-130,130 0,130 0,130 C130,130 130,0 130,0 C130,-130 0,-130 0,-130"
                  stroke="#9CA3AF"
                  strokeWidth="4"
                  strokeDasharray="12 6"
                  fill="none"
                  variants={arrowVariants}
                />
              </svg>

              {/* 중앙 메시지 - 완벽하게 중앙 정렬 */}
              <motion.div
                className="absolute flex items-center justify-center w-[120px] h-[120px] z-10"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "-50%",
                  y: "-50%",
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  x: "-50%",
                  y: "-50%",
                }}
                transition={{
                  duration: 0.5,
                  delay: 1.2,
                  type: "spring",
                  stiffness: 200,
                }}
                viewport={{ once: true }}
              >
                <div className="rounded-full w-full h-full shadow-lg bg-white border-2 border-[#217346] flex items-center justify-center">
                  <div className="text-center text-[#217346] font-bold">
                    <span className="block text-sm">끝나지 않는</span>
                    <span className="block text-xl">악순환</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 인용문 스타일의 눈에 띄는 마무리 문구 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-xl p-8 text-center relative overflow-hidden"
          >
            {/* 인용 부호 */}
            <div className="absolute top-4 left-4 text-[#E6F4EA] text-7xl font-serif opacity-50">
              &ldquo;
            </div>
            <div className="absolute bottom-4 right-4 text-[#E6F4EA] text-7xl font-serif opacity-50">
              &rdquo;
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#217346]">
                새로운 툴은 필요 없습니다.
              </h3>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                익숙한 엑셀에서 시작하는 자동화로
                <span className="bg-[#E6F4EA] px-2 mx-1 font-bold text-[#217346]">
                  업무 시간을 70% 절약
                </span>
                하세요.
              </p>
            </div>
          </motion.div>

          {/* 다음 섹션으로 이동하는 시각적 인디케이터 */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <ChevronDown className="h-8 w-8 text-[#217346]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// CountUp component for future use
function CountUp({ end, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const duration = 1000; // 카운트업 지속 시간 (ms)

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      const value = Math.floor(easedProgress * end);
      setDisplayValue(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      startTime = null;
    };
  }, [inView, end]);

  return (
    <span ref={ref}>
      {isMounted ? displayValue : "0"}
      {suffix}
    </span>
  );
}
