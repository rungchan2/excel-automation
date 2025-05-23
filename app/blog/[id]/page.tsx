import * as React from "react";

import type { Metadata } from "next";
import Link from "next/link";
import dayjs from "@/lib/dayjs";

import { notFound } from "next/navigation";
import { getNotionBlogById, getNotionRelatedBlogs } from "@/lib/notion-blog";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import BlogNotionContent from "@/components/notion/BlogNotionContent";
import BlogImage from "@/components/blog/BlogImage";
import Image from "next/image";

// This enables dynamic rendering for this route
export const dynamic = "force-dynamic";
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://classflow.monstercoop.co.kr";

// Generate metadata for SEO
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const { data: blog, error } = await getNotionBlogById(id);

  if (error || !blog) {
    return {
      title: "블로그 포스트를 찾을 수 없습니다 | ClassFlow",
      description: "요청한 블로그 포스트를 찾을 수 없습니다.",
    };
  }

  return {
    title: `${blog.title} | ClassFlow 활용 사례`,
    description: blog.subtitle,
    openGraph: {
      title: blog.title,
      description: blog.subtitle || "",
      type: "article",
      publishedTime: blog.created_at,
      url: `${baseUrl}/blog/${blog.id}`,
      images: [
        {
          url: blog.image_url || `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.subtitle || "",
      images: [blog.image_url || `${baseUrl}/og-image.jpg`],
    },
  };
}

export default async function BlogDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const { data: blog, error } = await getNotionBlogById(id);

  if (error || !blog) {
    notFound();
  }

  const { data: relatedBlogs } = await getNotionRelatedBlogs(id);

  // Format the date
  const formattedDate = dayjs(blog.created_at).format("YYYY년 MM월 DD일");

  // Add structured data for SEO (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.subtitle || "",
    datePublished: blog.created_at,
    image: blog.image_url || `${baseUrl}/og-image.jpg`,
    category: blog.category,
    author: {
      "@type": "Organization",
      name: "ClassFlow",
    },
  };

  return (
    <>
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-12 md:py-20 max-w-[1080px] mx-auto">
        <div className="container px-4 md:px-6">
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[#217346]">
              홈
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#217346]">
              활용 사례
            </Link>
            <span>/</span>
            <span className="text-[#217346] font-medium truncate max-w-[200px]">
              {blog.title}
            </span>
          </div>

          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-[#217346] hover:underline mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            모든 활용 사례 보기
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            <div className="lg:col-span-5">
              {/* Blog post content */}
              <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                {blog.image_url && (
                  <Image
                    src={blog.image_url}
                    alt={blog.title}
                    width={1200}
                    height={630}
                  />
                )}

                <div className="pt-6">
                  <h1 className="text-3xl font-bold tracking-tighter mb-4">
                    {blog.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">{blog.subtitle}</p>
                  <div className="flex items-center gap-2 justify-between">
                    {blog.category && (
                      <div className="text-sm text-gray-500 mb-8 flex">
                        {blog.category.map((category) => (
                          <span
                            key={category}
                            className="mr-2  bg-[#496857] text-white rounded-lg p-2"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-sm text-gray-500 mb-8">
                      {formattedDate}
                    </div>
                  </div>

                  {/* Notion 콘텐츠 렌더링 */}
                  {blog.recordMap && (
                    <div className="notion-content">
                      <BlogNotionContent recordMap={blog.recordMap} />
                    </div>
                  )}
                </div>
              </article>
            </div>

            <div className="lg:col-span-2">
              {/* Related posts sidebar */}
              <div className="sticky top-32">
                <h2 className="text-xl font-bold mb-4">관련 사례</h2>

                {relatedBlogs && relatedBlogs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {relatedBlogs.map((relatedBlog) => (
                      <Link
                        href={`/blog/${relatedBlog.id}`}
                        key={relatedBlog.id}
                      >
                        <Card className="hover:shadow-md transition-shadow">
                          {relatedBlog.image_url && (
                            <BlogImage 
                              imageUrl={relatedBlog.image_url} 
                              title={relatedBlog.title} 
                              height="h-32"
                            />
                          )}
                          <CardHeader className="py-3">
                            <CardTitle className="text-base line-clamp-1">
                              {relatedBlog.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 text-xs">
                              {relatedBlog.subtitle}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">관련 사례가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
