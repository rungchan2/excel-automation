"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { InquiryRecord } from "@/types/inquiry"
import { updateInquiry } from "@/lib/admin"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface InquiryEditModalProps {
  inquiry: InquiryRecord
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function InquiryEditModal({ inquiry, open, onOpenChange, onSuccess }: InquiryEditModalProps) {
  const [formData, setFormData] = useState({
    name: inquiry.name,
    phone: inquiry.phone,
    automation_needs: inquiry.automation_needs,
    current_tools: inquiry.current_tools || "",
    tool_issues: inquiry.tool_issues || "",
    status: inquiry.status,
    notes: inquiry.notes || "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await updateInquiry(inquiry.id, formData)
      if (error) {
        toast.error("수정 중 오류가 발생했습니다.")
        return
      }
      toast.success("문의가 수정되었습니다.")
      onSuccess()
    } catch (error) {
      toast.error("수정 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>문의 수정</DialogTitle>
          <DialogDescription>문의 정보를 수정하세요.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">상태</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">대기중</SelectItem>
                <SelectItem value="processing">처리중</SelectItem>
                <SelectItem value="completed">완료</SelectItem>
                <SelectItem value="cancelled">취소</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="automation_needs">자동화하고 싶은 내용</Label>
            <Textarea
              id="automation_needs"
              value={formData.automation_needs}
              onChange={(e) => handleChange("automation_needs", e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_tools">현재 사용 중인 툴</Label>
            <Input
              id="current_tools"
              value={formData.current_tools}
              onChange={(e) => handleChange("current_tools", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tool_issues">툴 사용 시 문제점</Label>
            <Textarea
              id="tool_issues"
              value={formData.tool_issues}
              onChange={(e) => handleChange("tool_issues", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">관리자 메모</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={3}
              placeholder="내부 메모를 입력하세요..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" disabled={loading} className="bg-[#217346] hover:bg-[#185C37]">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                "저장"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
