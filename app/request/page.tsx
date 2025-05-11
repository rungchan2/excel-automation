"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RequestPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    automationNeeds: "",
    currentTool: "",
    toolIssues: "",
    otherTool: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, currentTool: value }))
    if (errors.currentTool) {
      setErrors((prev) => ({ ...prev, currentTool: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "이름을 입력해주세요"
    if (!formData.phone.trim()) newErrors.phone = "전화번호를 입력해주세요"
    else if (!/^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/.test(formData.phone.replace(/-/g, "")))
      newErrors.phone = "올바른 전화번호 형식이 아닙니다"
    if (!formData.automationNeeds.trim()) newErrors.automationNeeds = "자동화하고 싶은 내용을 입력해주세요"
    if (!formData.currentTool) newErrors.currentTool = "현재 사용 중인 툴을 선택해주세요"
    if (formData.currentTool && !formData.toolIssues.trim()) newErrors.toolIssues = "현재 툴의 문제점을 입력해주세요"
    if (formData.currentTool === "기타" && !formData.otherTool.trim())
      newErrors.otherTool = "사용 중인 툴을 입력해주세요"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(true)
        setIsSubmitting(false)
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1] py-12">
      <div className="container max-w-3xl px-4 md:px-6">
        <Link href="/" className="mb-8 inline-flex items-center text-sm font-medium text-[#217346] hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" />
          메인 페이지로 돌아가기
        </Link>

        {isSubmitted ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-[#217346]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#217346]/10">
                  <CheckCircle className="h-8 w-8 text-[#217346]" />
                </div>
                <CardTitle className="text-2xl">상담 요청이 완료되었습니다!</CardTitle>
                <CardDescription>입력하신 전화번호로 빠른 시일 내에 연락드리겠습니다. 감사합니다.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={() => router.push("/")} className="mt-4 bg-[#217346] hover:bg-[#185C37]">
                  메인 페이지로 돌아가기
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Contact Form - Quick Phone Consultation</CardTitle>
                <CardDescription>입력하고 기다리면 빠르게 전화상담 드립니다~</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름 (Name)</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">전화번호 (Phone Number)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="automationNeeds">자동화하고 싶은 내용 (What to automate)</Label>
                    <Textarea
                      id="automationNeeds"
                      name="automationNeeds"
                      rows={4}
                      value={formData.automationNeeds}
                      onChange={handleChange}
                      className={errors.automationNeeds ? "border-red-500" : ""}
                    />
                    {errors.automationNeeds && <p className="text-xs text-red-500">{errors.automationNeeds}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentTool">지금 사용하고 있는 업무 툴 (Current tools)</Label>
                    <Select value={formData.currentTool} onValueChange={handleSelectChange}>
                      <SelectTrigger className={errors.currentTool ? "border-red-500" : ""}>
                        <SelectValue placeholder="사용 중인 툴을 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="엑셀만 사용">엑셀만 사용</SelectItem>
                        <SelectItem value="구글 시트">구글 시트</SelectItem>
                        <SelectItem value="네이버 오피스">네이버 오피스</SelectItem>
                        <SelectItem value="원샷 CRM">원샷 CRM</SelectItem>
                        <SelectItem value="팝업 스쿨">팝업 스쿨</SelectItem>
                        <SelectItem value="프림 아카데미">프림 아카데미</SelectItem>
                        <SelectItem value="기타">기타 (직접 입력)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.currentTool && <p className="text-xs text-red-500">{errors.currentTool}</p>}

                    {formData.currentTool === "기타" && (
                      <div className="mt-2">
                        <Input
                          id="otherTool"
                          name="otherTool"
                          placeholder="사용 중인 툴을 입력해주세요"
                          value={formData.otherTool}
                          onChange={handleChange}
                          className={errors.otherTool ? "border-red-500" : ""}
                        />
                        {errors.otherTool && <p className="text-xs text-red-500">{errors.otherTool}</p>}
                      </div>
                    )}
                  </div>

                  {formData.currentTool && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="toolIssues">사용하던 툴의 문제점 (Issues with current tools)</Label>
                      <Textarea
                        id="toolIssues"
                        name="toolIssues"
                        rows={4}
                        value={formData.toolIssues}
                        onChange={handleChange}
                        className={errors.toolIssues ? "border-red-500" : ""}
                      />
                      {errors.toolIssues && <p className="text-xs text-red-500">{errors.toolIssues}</p>}
                    </motion.div>
                  )}

                  <Button type="submit" className="w-full bg-[#217346] hover:bg-[#185C37]" disabled={isSubmitting}>
                    {isSubmitting ? "제출 중..." : "상담 요청하기"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
