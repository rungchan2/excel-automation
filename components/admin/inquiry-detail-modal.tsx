"use client"

import dayjs from "@/lib/dayjs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { InquiryRecord } from "@/types/inquiry"

interface InquiryDetailModalProps {
  inquiry: InquiryRecord
  open: boolean
  onOpenChange: (open: boolean) => void
}

const statusLabels = {
  pending: "대기중",
  processing: "처리중",
  completed: "완료",
  cancelled: "취소",
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export function InquiryDetailModal({ inquiry, open, onOpenChange }: InquiryDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>문의 상세 정보</DialogTitle>
          <DialogDescription>문의자의 상세 정보를 확인하세요.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-1">이름</h4>
              <p className="font-medium">{inquiry.name}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-1">전화번호</h4>
              <p>{inquiry.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-1">상태</h4>
              <Badge className={statusColors[inquiry.status as keyof typeof statusColors]}>
                {statusLabels[inquiry.status as keyof typeof statusLabels]}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-1">접수일</h4>
              <p>{dayjs(inquiry.created_at).format("YYYY년 MM월 DD일 HH:mm")}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium text-sm text-gray-500 mb-2">자동화하고 싶은 내용</h4>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="whitespace-pre-wrap">{inquiry.automation_needs}</p>
            </div>
          </div>

          {inquiry.current_tools && (
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-2">현재 사용 중인 툴</h4>
              <p>{inquiry.current_tools}</p>
            </div>
          )}

          {inquiry.tool_issues && (
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-2">툴 사용 시 문제점</h4>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="whitespace-pre-wrap">{inquiry.tool_issues}</p>
              </div>
            </div>
          )}

          {inquiry.notes && (
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-2">관리자 메모</h4>
              <div className="bg-blue-50 p-3 rounded-md border-l-4 border-blue-400">
                <p className="whitespace-pre-wrap">{inquiry.notes}</p>
              </div>
            </div>
          )}

          {inquiry.updated_at && inquiry.updated_at !== inquiry.created_at && (
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-1">최종 수정일</h4>
              <p className="text-sm text-gray-600">
                {dayjs(inquiry.updated_at).format("YYYY년 MM월 DD일 HH:mm")}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
