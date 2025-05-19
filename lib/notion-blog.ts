import { Client, APIErrorCode } from "@notionhq/client";
import getRecordMap from "./noiton-page-render";
import type { Blog, BlogListItem } from "@/types/blog";

// Notion API 클라이언트 초기화
const notionApiKey = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID as string;

if (!notionApiKey) {
  throw new Error("NOTION_API_KEY 또는 NOTION_TOKEN이 설정되지 않았습니다");
}

if (!databaseId) {
  throw new Error("NOTION_DATABASE_ID가 설정되지 않았습니다");
}

// 공식 Notion API 클라이언트 초기화
const notion = new Client({
  auth: notionApiKey,
});

// Notion 속성에서 데이터 추출 도우미 함수
function extractTitle(properties: any): string {
  const titleProp = properties.title || properties.Name || properties["이름"];
  if (!titleProp) return "제목 없음";
  
  return titleProp.title?.map((t: any) => t.plain_text).join("") || "제목 없음";
}

function extractSubtitle(properties: any): string | null {
  const subtitleProp = properties["sub-title"] || properties.subtitle || properties["부제목"];
  if (!subtitleProp) return null;
  
  return subtitleProp.rich_text?.map((t: any) => t.plain_text).join("") || null;
}

function extractDate(properties: any): string {
  const dateProp = properties.date || properties.created_at || properties["생성일"];
  if (!dateProp?.date) {
    return new Date().toISOString();
  }
  
  return dateProp.date.start || new Date().toISOString();
}

function extractCoverImage(page: any): string | null {
  if (!page.cover) return null;
  
  if (page.cover.type === "external") {
    return page.cover.external.url;
  } else if (page.cover.type === "file") {
    return page.cover.file.url;
  }
  
  return null;
}

// 전체 블로그 목록 가져오기 (페이지네이션 포함)
export async function getAllNotionBlogs(
  page = 1,
  pageSize = 9
): Promise<{ data: BlogListItem[] | null; error: Error | null; count: number }> {
  try {
    // 게시 상태(publish=true)인 항목만 필터링하도록 설정
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "publish",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
      page_size: 100, // 일단 최대치로 가져온 후 클라이언트에서 페이지네이션
    });
    
    // 결과를 BlogListItem 형식으로 변환
    const blogs = response.results.map((page: any) => {
      return {
        id: page.id,
        title: extractTitle(page.properties),
        subtitle: extractSubtitle(page.properties),
        created_at: extractDate(page.properties),
        image_url: extractCoverImage(page),
      };
    });
    
    // 페이지네이션 적용
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedBlogs = blogs.slice(start, end);
    
    return { 
      data: paginatedBlogs, 
      error: null, 
      count: blogs.length 
    };
  } catch (error: any) {
    console.error("Notion API 오류:", error);
    return { 
      data: null, 
      error: new Error(error.message || "알 수 없는 오류가 발생했습니다"), 
      count: 0 
    };
  }
}

// ID로 블로그 가져오기 (상세 페이지용)
export async function getNotionBlogById(id: string): Promise<{ data: Blog | null; error: Error | null }> {
  try {
    // 공식 API로 페이지 메타데이터 가져오기
    const page = await notion.pages.retrieve({ page_id: id }) as any;
    
    // notion-client로 recordMap 가져오기 (리치 콘텐츠 렌더링용)
    const recordMap = await getRecordMap(id);
    
    // Blog 형식으로 데이터 변환
    const blog: Blog = {
      id: page.id,
      title: extractTitle(page.properties),
      subtitle: extractSubtitle(page.properties),
      content: "", // recordMap으로 렌더링하므로 미사용
      created_at: extractDate(page.properties),
      image_url: extractCoverImage(page),
      recordMap: recordMap,
    };
    
    return { data: blog, error: null };
  } catch (error: any) {
    console.error("Notion 블로그 조회 오류:", error);
    return { 
      data: null, 
      error: new Error(error.message || "블로그 포스트를 찾을 수 없습니다") 
    };
  }
}

// 관련 블로그 포스트 가져오기
export async function getNotionRelatedBlogs(
  currentId: string,
  limit = 3
): Promise<{ data: BlogListItem[] | null; error: Error | null }> {
  try {
    // 현재 포스트를 제외하고 최신 순으로 가져오기
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "publish",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
      page_size: 100,
    });
    
    // 현재 포스트 제외하고 변환
    const blogs = response.results
      .filter((page: any) => page.id !== currentId)
      .map((page: any) => {
        return {
          id: page.id,
          title: extractTitle(page.properties),
          subtitle: extractSubtitle(page.properties),
          created_at: extractDate(page.properties),
          image_url: extractCoverImage(page),
        };
      })
      .slice(0, limit);
      
    return { data: blogs, error: null };
  } catch (error: any) {
    console.error("관련 블로그 조회 오류:", error);
    return { data: null, error: new Error(error.message) };
  }
} 