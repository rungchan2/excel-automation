"use client"

import { useState } from "react"
import dayjs from "@/lib/dayjs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, Search, Filter, Eye, Edit, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import type { InquiryRecord } from "@/types/inquiry"
import { InquiryDetailModal } from "./inquiry-detail-modal"
import { InquiryEditModal } from "./inquiry-edit-modal"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"
import { updateInquiryStatus, deleteInquiry } from "@/lib/admin"
import { toast } from "sonner"

interface InquiryDataTableProps {
  data: InquiryRecord[]
  loading: boolean
  totalCount: number
  currentPage: number
  onPageChange: (page: number) => void
  searchTerm: string
  onSearchChange: (search: string) => void
  statusFilter: string
  onStatusFilterChange: (status: string) => void
  toolsFilter: string
  onToolsFilterChange: (tools: string) => void
  dateFrom: string
  onDateFromChange: (date: string) => void
  dateTo: string
  onDateToChange: (date: string) => void
  onDataChange: () => void
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const statusLabels = {
  pending: "대기중",
  processing: "처리중",
  completed: "완료",
  cancelled: "취소",
}

export function InquiryDataTable({
  data,
  loading,
  totalCount,
  currentPage,
  onPageChange,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  toolsFilter,
  onToolsFilterChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onDataChange,
}: InquiryDataTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null)

  const pageSize = 10
  const totalPages = Math.ceil(totalCount / pageSize)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(data.map((item) => item.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    }
  }

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const { error } = await updateInquiryStatus(id, newStatus)
      if (error) {
        toast.error("상태 업데이트 중 오류가 발생했습니다.")
        return
      }
      toast.success("상태가 업데이트되었습니다.")
      onDataChange()
    } catch (error) {
      toast.error("상태 업데이트 중 오류가 발생했습니다.")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await deleteInquiry(id)
      if (error) {
        toast.error("삭제 중 오류가 발생했습니다.")
        return
      }
      toast.success("문의가 삭제되었습니다.")
      onDataChange()
      setDeleteDialogOpen(false)
      setSelectedInquiry(null)
    } catch (error) {
      toast.error("삭제 중 오류가 발생했습니다.")
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            필터 및 검색
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="이름, 전화번호, 내용 검색..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="pending">대기중</SelectItem>
                <SelectItem value="processing">처리중</SelectItem>
                <SelectItem value="completed">완료</SelectItem>
                <SelectItem value="cancelled">취소</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              placeholder="시작 날짜"
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
            />

            <Input
              type="date"
              placeholder="종료 날짜"
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>문의 목록 ({totalCount}건)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedRows.length === data.length && data.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>이름</TableHead>
                      <TableHead>전화번호</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>자동화 요청</TableHead>
                      <TableHead>사용 툴</TableHead>
                      <TableHead>접수일</TableHead>
                      <TableHead className="w-12">작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(inquiry.id)}
                            onCheckedChange={(checked) => handleSelectRow(inquiry.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{inquiry.name}</TableCell>
                        <TableCell>{inquiry.phone}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[inquiry.status as keyof typeof statusColors]}>
                            {statusLabels[inquiry.status as keyof typeof statusLabels]}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <span title={inquiry.automation_needs}>{truncateText(inquiry.automation_needs, 50)}</span>
                        </TableCell>
                        <TableCell>{inquiry.current_tools || "-"}</TableCell>
                        <TableCell>
                          {dayjs(inquiry.created_at).format("YYYY.MM.DD HH:mm")}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedInquiry(inquiry)
                                  setDetailModalOpen(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                상세보기
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedInquiry(inquiry)
                                  setEditModalOpen(true)
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                수정
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusUpdate(inquiry.id, "processing")}
                                disabled={inquiry.status === "processing"}
                              >
                                처리중으로 변경
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusUpdate(inquiry.id, "completed")}
                                disabled={inquiry.status === "completed"}
                              >
                                완료로 변경
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedInquiry(inquiry)
                                  setDeleteDialogOpen(true)
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                삭제
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    {totalCount}건 중 {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalCount)}
                    건 표시
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      {currentPage} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      {selectedInquiry && (
        <>
          <InquiryDetailModal inquiry={selectedInquiry} open={detailModalOpen} onOpenChange={setDetailModalOpen} />
          <InquiryEditModal
            inquiry={selectedInquiry}
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            onSuccess={() => {
              onDataChange()
              setEditModalOpen(false)
            }}
          />
          <DeleteConfirmDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={() => handleDelete(selectedInquiry.id)}
            title="문의 삭제"
            description={`${selectedInquiry.name}님의 문의를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
          />
        </>
      )}
    </div>
  )
}
