"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#217346]">Study</span>
              <span className="text-2xl font-bold text-gray-800">Flow</span>
            </div>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#service" className="text-sm font-medium hover:text-[#217346] transition-colors">
            서비스
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-[#217346] transition-colors">
            기능
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-[#217346] transition-colors">
            요금
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-[#217346] transition-colors">
            상담
          </Link>
          <Button className="bg-[#217346] hover:bg-[#185C37] text-white">
            <Link href="/request">상담받기!</Link>
          </Button>
        </nav>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col space-y-4 px-4 py-6 bg-white border-t">
            <Link
              href="#service"
              className="text-sm font-medium hover:text-[#217346]"
              onClick={() => setIsMenuOpen(false)}
            >
              서비스
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:text-[#217346]"
              onClick={() => setIsMenuOpen(false)}
            >
              기능
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-[#217346]"
              onClick={() => setIsMenuOpen(false)}
            >
              요금
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-[#217346]"
              onClick={() => setIsMenuOpen(false)}
            >
              상담
            </Link>
            <Button className="bg-[#217346] hover:bg-[#185C37] text-white w-full" onClick={() => setIsMenuOpen(false)}>
              <Link href="/request">상담받기!</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}
