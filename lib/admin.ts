import { createClient } from "@/lib/supabase/client"

export async function getInquiries(
  page = 1,
  pageSize = 10,
  search = "",
  statusFilter = "",
  toolsFilter = "",
  dateFrom = "",
  dateTo = "",
): Promise<{ data: any; error: any; count: number }> {
  const supabase = createClient()
  let query = supabase.from("inquiry").select("*", { count: "exact" }).order("created_at", { ascending: false })

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,automation_needs.ilike.%${search}%`)
  }

  // Apply status filter
  if (statusFilter) {
    query = query.eq("status", statusFilter)
  }

  // Apply tools filter
  if (toolsFilter) {
    query = query.ilike("current_tools", `%${toolsFilter}%`)
  }

  // Apply date range filter
  if (dateFrom) {
    query = query.gte("created_at", dateFrom)
  }
  if (dateTo) {
    query = query.lte("created_at", dateTo)
  }

  // Apply pagination
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1
  query = query.range(start, end)

  const { data, error, count } = await query

  return { data, error, count: count || 0 }
}

export async function updateInquiryStatus(
  id: string,
  status: string,
  notes?: string,
): Promise<{ data: any; error: any }> {
  const supabase = createClient()
  const updateData: any = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (notes !== undefined) {
    updateData.notes = notes
  }

  const { data, error } = await supabase.from("inquiry").update(updateData).eq("id", id).select().single()

  return { data, error }
}

export async function updateInquiry(id: string, updates: any): Promise<{ data: any; error: any }> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("inquiry")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  return { data, error }
}

export async function deleteInquiry(id: string): Promise<{ data: any; error: any }> {
  const supabase = createClient()
  const { data, error } = await supabase.from("inquiry").delete().eq("id", id)

  return { data, error }
}

export async function getInquiryById(id: string): Promise<{ data: any; error: any }> {
  const supabase = createClient()
  const { data, error } = await supabase.from("inquiry").select("*").eq("id", id).single()

  return { data, error }
}

export async function getProfile() {
  const supabase = createClient()
  const { data: user } = await supabase.auth.getUser()
  console.log(user)
  if (!user.user?.id) return { data: null, error: "Unauthorized" }
  
  const { data, error } = await supabase.from("profiles").select("role").eq("id", user.user.id).single()

  if (error) return { data: null, error }

  if (!data) return { data: null, error: "User not found" }

  return { role: data.role }
}
