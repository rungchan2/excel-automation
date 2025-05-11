import { supabase } from "./supabase"

export const sendInquiryEmail = async (inquiryData: {
  name: string
  phone: string
  automation_needs: string
  current_tools?: string
  tool_issues?: string
}) => {
  try {
    const emailBody = `
      <h2>새로운 상담 신청이 접수되었습니다.</h2>
      <p><strong>신청자명:</strong> ${inquiryData.name}</p>
      <p><strong>연락처:</strong> ${inquiryData.phone}</p>
      <p><strong>자동화 희망 내용:</strong></p>
      <p>${inquiryData.automation_needs}</p>
      ${
        inquiryData.current_tools
          ? `
        <p><strong>현재 사용 툴:</strong> ${inquiryData.current_tools}</p>
      `
          : ""
      }
      ${
        inquiryData.tool_issues
          ? `
        <p><strong>툴 사용 시 문제점:</strong> ${inquiryData.tool_issues}</p>
      `
          : ""
      }
      <hr>
      <p>신청 시간: ${new Date().toLocaleString("ko-KR")}</p>
    `

    const { data, error } = await supabase.functions.invoke("resend", {
      body: {
        to: "leeh09077@gmail.com",
        subject: `[ClassFlow] 새로운 상담 신청 - ${inquiryData.name}님`,
        html: emailBody,
      },
    })

    if (error) {
      console.error("문의 이메일 전송 오류:", error)
      throw error
    }

    return { data, error: null }
  } catch (err) {
    console.error("문의 이메일 전송 중 예외 발생:", err)
    return { data: null, error: err }
  }
}
