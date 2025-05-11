"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import { supabase } from "@/lib/supabase";
import { sendInquiryEmail } from "@/lib/email";
import type { InquiryFormData } from "@/types/inquiry";

const options = [
  {
    label: "엑셀만 사용",
    value: "엑셀만 사용",
  },
  {
    label: "구글 시트",
    value: "구글 시트",
  },
  {
    label: "구글 클라스룸",
    value: "구글 클라스룸",
  },
  {
    label: "레플릿",
    value: "레플릿",
  },
  {
    label: "ACA2000",
    value: "ACA2000",
  },
  {
    label: "학원조이",
    value: "학원조이",
  },
  {
    label: "클라스업 (classup)",
    value: "클라스업 (classup)",
  },
  {
    label: "기타 (직접 입력)",
    value: "기타",
  },
];

export default function RequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    phone: "",
    automation_needs: "",
    current_tools: "",
    tool_issues: "",
    otherTool: "",
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, current_tools: value }));
    if (errors.current_tools) {
      setErrors((prev) => ({ ...prev, current_tools: null }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string | null> = {};

    // Required fields validation
    if (!formData.name.trim()) newErrors.name = "이름을 입력해주세요";

    // Phone validation with Korean format
    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요";
    } else {
      // Remove any non-digit characters for validation
      const digitsOnly = formData.phone.replace(/\D/g, "");
      // Korean phone numbers are typically 10-11 digits
      if (digitsOnly.length < 10 || digitsOnly.length > 11) {
        newErrors.phone = "올바른 전화번호 형식이 아닙니다";
      }
    }

    if (!formData.automation_needs.trim())
      newErrors.automation_needs = "자동화하고 싶은 내용을 입력해주세요";
    if (!formData.current_tools)
      newErrors.current_tools = "현재 사용 중인 툴을 선택해주세요";

    if (formData.current_tools && !formData.tool_issues?.trim()) {
      newErrors.tool_issues = "현재 툴의 문제점을 입력해주세요";
    }

    if (formData.current_tools === "기타" && !formData.otherTool?.trim()) {
      newErrors.otherTool = "사용 중인 툴을 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      automation_needs: "",
      current_tools: "",
      tool_issues: "",
      otherTool: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare data for submission
      const submissionData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        automation_needs: formData.automation_needs.trim(),
        current_tools:
          formData.current_tools === "기타"
            ? formData.otherTool?.trim()
            : formData.current_tools,
        tool_issues: formData.tool_issues?.trim(),
        status: "pending" as const,
      };

      // 1. Save to database
      const { error: dbError } = await supabase
        .from("inquiry")
        .insert(submissionData);

      if (dbError) {
        console.error("데이터베이스 저장 오류:", dbError);
        throw dbError;
      }

      // 2. Send email notification
      const { error: emailError } = await sendInquiryEmail(submissionData);

      if (emailError) {
        console.warn("이메일 전송 실패, 문의는 정상 접수됨:", emailError);
        // Still show success since inquiry was saved
      }

      // 3. Show success toast and update UI
      toast.success("상담 신청이 완료되었습니다!", {
        description: "빠른 시일 내에 연락드리겠습니다.",
        duration: 5000,
      });
      resetForm();

      // 4. Update UI state
      setIsSubmitted(true);
    } catch (error) {
      console.error("상담 신청 처리 중 오류:", error);
      toast.error("상담 신청 중 오류가 발생했습니다.", {
        description: "잠시 후 다시 시도해주세요.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format phone number as user types
  useEffect(() => {
    if (formData.phone) {
      // Remove non-digits
      const digitsOnly = formData.phone.replace(/\D/g, "");

      // Format based on length
      let formatted = "";
      if (digitsOnly.length <= 3) {
        formatted = digitsOnly;
      } else if (digitsOnly.length <= 7) {
        formatted = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
      } else {
        formatted = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(
          3,
          7
        )}-${digitsOnly.slice(7, 11)}`;
      }

      // Only update if it's different to avoid cursor jumping
      if (formatted !== formData.phone) {
        setFormData((prev) => ({ ...prev, phone: formatted }));
      }
    }
  }, [formData.phone]);

  return (
    <div className="min-h-screen bg-[#F1F1F1] py-12">
      <Toaster position="top-right" richColors />
      <div className="container max-w-3xl px-4 md:px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm font-medium text-[#217346] hover:underline"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          메인 페이지로 돌아가기
        </Link>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-[#217346]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#217346]/10">
                  <CheckCircle className="h-8 w-8 text-[#217346]" />
                </div>
                <CardTitle className="text-2xl">
                  상담 요청이 완료되었습니다!
                </CardTitle>
                <CardDescription>
                  입력하신 전화번호로 빠른 시일 내에 연락드리겠습니다.
                  감사합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  onClick={() => router.push("/")}
                  className="mt-4 bg-[#217346] hover:bg-[#185C37]"
                >
                  메인 페이지로 돌아가기
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  학원에 맞는 상담 요청하기
                </CardTitle>
                <CardDescription>
                  제출 후에 빠르게 전화상담 드립니다. 전화 상담 후, 필요하신
                  자동화와 견적을 보내드립니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">성함</Label>
                    <Input
                      placeholder="홍길동"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-red-500" : ""}
                      disabled={isSubmitting}
                      maxLength={50}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">전화번호</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "border-red-500" : ""}
                      disabled={isSubmitting}
                      maxLength={13}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="automation_needs">
                      자동화하고 싶은 내용
                    </Label>
                    <Textarea
                      placeholder="예시) 스프레드 시트에서 자동으로 문자 빌송, 웹사이트에서 자동으로 채팅 답변, 파일 및 문서 자동생성 및 발송 등.."
                      id="automation_needs"
                      name="automation_needs"
                      rows={4}
                      value={formData.automation_needs}
                      onChange={handleChange}
                      className={
                        errors.automation_needs ? "border-red-500" : ""
                      }
                      disabled={isSubmitting}
                      maxLength={1000}
                    />
                    {errors.automation_needs && (
                      <p className="text-xs text-red-500">
                        {errors.automation_needs}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current_tools">
                      지금 사용하고 있는 업무 툴
                    </Label>
                    <Select
                      value={formData.current_tools}
                      onValueChange={handleSelectChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        className={errors.current_tools ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="사용 중인 툴을 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.current_tools && (
                      <p className="text-xs text-red-500">
                        {errors.current_tools}
                      </p>
                    )}

                    {formData.current_tools === "기타" && (
                      <div className="mt-2">
                        <Input
                          id="otherTool"
                          name="otherTool"
                          placeholder="사용 중인 툴을 입력해주세요"
                          value={formData.otherTool}
                          onChange={handleChange}
                          className={errors.otherTool ? "border-red-500" : ""}
                          disabled={isSubmitting}
                          maxLength={100}
                        />
                        {errors.otherTool && (
                          <p className="text-xs text-red-500">
                            {errors.otherTool}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {formData.current_tools && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="tool_issues">
                        사용하던 툴의 문제점
                      </Label>
                      <Textarea
                        placeholder="예시) 문자 빌송 기능이 없어서 문자 발송이 불편하다, 웹사이트에서 채팅 답변이 불편하다, 파일 및 문서 자동생성 및 발송이 불편하다, 등.."
                        id="tool_issues"
                        name="tool_issues"
                        rows={4}
                        value={formData.tool_issues}
                        onChange={handleChange}
                        className={errors.tool_issues ? "border-red-500" : ""}
                        disabled={isSubmitting}
                        maxLength={1000}
                      />
                      {errors.tool_issues && (
                        <p className="text-xs text-red-500">
                          {errors.tool_issues}
                        </p>
                      )}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#217346] hover:bg-[#185C37]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        제출 중...
                      </>
                    ) : (
                      "상담 요청하기"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
