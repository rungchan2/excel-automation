import { supabase } from "./supabase"
import type { Blog, BlogListItem } from "@/types/blog"

export async function getAllBlogs(
  page = 1,
  pageSize = 9,
): Promise<{ data: BlogListItem[] | null; error: Error | null; count: number }> {
  // Calculate the range for pagination
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  // Get the total count for pagination
  const { count, error: countError } = await supabase.from("blog").select("*", { count: "exact", head: true })

  if (countError) {
    console.error("Error fetching blog count:", countError)
    return { data: null, error: countError, count: 0 }
  }

  // Fetch the paginated blog posts
  const { data, error } = await supabase
    .from("blog")
    .select("id, title, subtitle, created_at, image_url")
    .order("created_at", { ascending: false })
    .range(start, end)

  return { data, error, count: count || 0 }
}

export async function getBlogById(id: string): Promise<{ data: Blog | null; error: Error | null }> {
  const { data, error } = await supabase.from("blog").select("*").eq("id", id).single()

  return { data, error }
}

export async function getRelatedBlogs(
  currentId: string,
  limit = 3,
): Promise<{ data: BlogListItem[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("blog")
    .select("id, title, subtitle, created_at, image_url")
    .neq("id", currentId)
    .order("created_at", { ascending: false })
    .limit(limit)

  return { data, error }
}
