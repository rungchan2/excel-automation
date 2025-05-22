"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TeamMember {
  name: string
  position: string
  image: string
  experience: string[]
  email: string
  instagram: string
}

const teamMembers: TeamMember[] = [
  {
    name: "이희찬",
    position: "CEO & 개발자",
    image: "/heechan.png",
    experience: [
      "(전)노코드 스타트업 해치하이커 주니어 개발자",
      "두잉협동조합 웹페이지 개발&PM",
      "넥톤 세일즈 리드생성 플랫폼 \"유링\" 개발",
      "프로그래머스 풀스택 과정 수료",
      "학습플랫폼 \"스퀴즈에듀\" 풀스택 개발",
      "인플루언서 데이터 크롤링 플랫폼 개발",
      "학원, 마케팅 대행사 자동화 외주 5건+",
    ],
    email: "leeh09077@gmail.com",
    instagram: "leehc_09",
  },
  {
    name: "음동현",
    position: "학원 운영 및 세일즈",
    image: "/donghyeon.png",
    experience: ["CRM 시스템 구축 전문가", "학원 운영,관리 1년+", "세일즈 전문가"],
    email: "donghyeon.eum@alumni.mondragon.edu",
    instagram: "eum5857783",
  },
]

export default function Team() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="text-[#217346]">전문가</span>와 함께하는 학원 자동화
          </h2>
          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            학원 운영과 IT 기술을 모두 이해하는 전문가들이 여러분의 학원 자동화를 도와드립니다.
          </p> */}
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="w-full md:flex-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row p-6 gap-6">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-[#217346]/20">
              <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-[#217346] font-medium mb-3">{member.position}</p>

            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              {member.experience.map((exp, i) => (
                <li key={i} className="flex items-start">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#217346] mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>{exp}</span>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex mt-auto space-x-3 justify-center md:justify-start">
              <Link
                href={`mailto:${member.email}`}
                className="text-gray-500 hover:text-[#217346] transition-colors"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                href={`https://instagram.com/${member.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#217346] transition-colors"
                aria-label={`${member.name}'s Instagram`}
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
