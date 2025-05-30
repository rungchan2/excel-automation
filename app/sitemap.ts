import { getBlogList } from "@/lib/notion"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  const { blogs } = await getBlogList(100) // Get up to 100 blog posts for the sitemap

  // Base URLs
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://classflow.monstercoop.co.kr"

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/request`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ] as MetadataRoute.Sitemap

  // Add blog posts to sitemap
  if (blogs) {
    const blogUrls = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.id}`,
      lastModified: new Date(blog.created_time),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    return [...routes, ...blogUrls]
  }

  return routes
}
