"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[calc(100dvh-81px)] flex items-center overflow-hidden">
      {/* Excel grid background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="grid h-full w-full grid-cols-12 grid-rows-12">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-gray-300"></div>
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-4"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              익숙한 엑셀에서 시작하는 스마트한 학원 관리 자동화
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl">
              새로운 툴은 그만, 익숙한 환경에서 시작하는 스마트 학원 관리
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button className="bg-[#217346] hover:bg-[#185C37] text-white">
                2주 무료 체험
              </Button>
              <Button
                variant="outline"
                className="border-[#217346] text-[#217346] hover:bg-[#F1F1F1]"
              >
                <Link href="/request">상담받기</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative h-[300px] w-[400px] sm:h-[400px] sm:w-[500px]">
              <Image
                src="/hero.svg"
                alt="Excel automation illustration"
                width={500}
                height={400}
                className="object-contain"
                priority
              />

              {/* Animated gears */}
              <motion.div
                className="absolute top-1/4 right-1/4"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div className="h-12 w-12 rounded-full border-4 border-[#217346] border-t-transparent" />
              </motion.div>

              <motion.div
                className="absolute bottom-1/3 left-1/3"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div className="h-8 w-8 rounded-full border-4 border-[#185C37] border-t-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
