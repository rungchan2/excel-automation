"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InquiryDataTable } from "@/components/admin/inquiry-data-table";
import { getInquiries } from "@/lib/admin";
import type { InquiryRecord } from "@/types/inquiry";
import { toast, Toaster } from "sonner";
import { Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [toolsFilter, setToolsFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Simple password authentication
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, use proper authentication
    if (password === "studyflow2025") {
      setIsAuthenticated(true);
      toast.success("인증되었습니다.");
    } else {
      toast.error("비밀번호가 올바르지 않습니다.");
    }
  };

  // Fetch inquiries data
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error, count } = await getInquiries(
        currentPage,
        10,
        searchTerm,
        statusFilter,
        toolsFilter,
        dateFrom,
        dateTo
      );

      if (error) {
        console.error("Error fetching inquiries:", error);
        toast.error("문의 데이터를 불러오는 중 오류가 발생했습니다.");
        return;
      }

      setInquiries(data || []);
      setTotalCount(count);
    } catch (error) {
      console.error("Error:", error);
      toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      const supabase = createClient()
      console.log("fetchRole", supabase)
      const { data: { session } } = await supabase.auth.getSession()
      const { data: { user } } = await supabase.auth.getUser()
      console.log("user", user)
      console.log("session", session)
    }
    fetchRole()
  }, [])

  // Fetch data when filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [
    isAuthenticated,
    currentPage,
    searchTerm,
    statusFilter,
    toolsFilter,
    dateFrom,
    dateTo,
  ]);

  // Authentication form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F1F1F1] flex items-center justify-center">
        <Toaster position="top-right" richColors />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#217346]/10">
                <Lock className="h-8 w-8 text-[#217346]" />
              </div>
              <CardTitle className="text-2xl">관리자 인증</CardTitle>
              <CardDescription>
                관리자 페이지에 접근하려면 비밀번호를 입력하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="관리자 비밀번호를 입력하세요"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#217346] hover:bg-[#185C37]"
                >
                  로그인
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-[#F1F1F1] py-8">
      <Toaster position="top-right" richColors />
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter mb-2">
            문의 관리 대시보드
          </h1>
          <p className="text-gray-600">
            StudyFlow 상담 문의를 관리하고 처리하세요.
          </p>
        </div>

        <InquiryDataTable
          data={inquiries}
          loading={loading}
          totalCount={totalCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          toolsFilter={toolsFilter}
          onToolsFilterChange={setToolsFilter}
          dateFrom={dateFrom}
          onDateFromChange={setDateFrom}
          dateTo={dateTo}
          onDateToChange={setDateTo}
          onDataChange={fetchInquiries}
        />
      </div>
    </div>
  );
}
