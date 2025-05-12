"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const companyInfo = {
  이름: "몬스터 협동조합",
  대표자: "강승원",
  사업자등록번호: "246-88-02301",
  주소: "서울시 마포구 양화로 124, 로컬스티치 3F",
  전화번호: "010-2625-9706",
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="flex gap-8 justify-between flex-col md:flex-row">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-[#217346]">Class</span>
                <span className="text-2xl font-bold text-gray-800">Flow</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                익숙한 엑셀에서 시작하는 스마트한 학원 관리 자동화 솔루션
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-[#217346]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#217346]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="mailto:info@monstercoop.co.kr"
                className="text-gray-500 hover:text-[#217346]"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-500 hover:text-[#217346]">
                  출결관리 자동화
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-[#217346]">
                  문자 자동발송
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-[#217346]">
                  수납관리 자동화
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-[#217346]">
                  맞춤형 솔루션
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">회사</h3>
            <ul className="space-y-2 text-sm">
              {Object.entries(companyInfo).map(([key, value]) => (
                <li key={key} className="text-gray-500">
                  {key}: {value}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">고객 지원</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#217346]" />
                <Link href="tel:01026259706" className="text-gray-500">
                  010-2625-9706
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#217346]" />
                <Link
                  href="mailto:info@monstercoop.co.kr"
                  className="text-gray-500"
                >
                  info@monstercoop.co.kr
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-gray-500 hover:text-[#217346]"
                >
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} ClassFlow. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-[#217346]"
              >
                개인정보처리방침
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-[#217346]"
              >
                이용약관
              </Link>
              <Link
                href="/sitemap.xml"
                target="_blank"
                className="text-xs text-gray-500 hover:text-[#217346]"
              >
                사이트맵
              </Link>
            </div>
          </div>
        </div>

        {/* Excel spreadsheet bottom-bar style */}
        {/* <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 bg-[#F1F1F1] p-2 rounded text-xs text-gray-500 flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#217346]"></div>
            <span>Ready</span>
          </div>
          <div>
            <span>ClassFlow v1.0</span>
          </div>
        </motion.div> */}
      </div>
    </footer>
  );
}
