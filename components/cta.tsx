"use client"

import { motion } from "framer-motion"
import { CtaButton } from "./ui/cta-button"

export default function Cta() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-[#217346] text-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">지금 바로 상담 받아보세요!</h2>

          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            무료 상담 및 과정안내와 견적안내까지, 상세하게 안내 받을 수 있습니다. 
          </p>

          <CtaButton variant="white" />

          <div className="pt-6">
            <p className="text-sm opacity-80">
              이미 10개 이상의 학원이 ClassFlow와 함께하고 있습니다. 지금 바로 시간을 절약하고 학원 운영에 집중하세요.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
