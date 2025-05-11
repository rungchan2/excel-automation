export interface InquiryFormData {
  name: string
  phone: string
  automation_needs: string
  current_tools?: string
  tool_issues?: string
  otherTool?: string // For handling "기타" option
}

export interface InquiryRecord extends InquiryFormData {
  id: string
  status: "pending" | "processing" | "completed" | "cancelled"
  created_at: string
  updated_at: string
  notes?: string
}
