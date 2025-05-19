"use server";

import { Client, APIErrorCode } from "@notionhq/client";
import { TBlogResult } from "@/types/notion";

const databaseId = process.env.NOTION_DATABASE_ID as string;

if (!databaseId) {
  throw new Error("NOTION_DATABASE_ID is not set");
}

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});


export async function getBlogList(limit: number = 10): Promise<{
  blogs: TBlogResult[];
  error: any;
  total: number;
}> {
  try {
    const blogList = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "publish",
        status: {
          equals: "published",
        },
      },
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
      page_size: limit,
    });
    return {
      blogs: blogList.results as TBlogResult[],
      error: null,
      total: blogList.results.length,
    };
  } catch (error: any) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      return {
        blogs: [],
        error: error,
        total: 0,
      };
    } else {
      return {
        blogs: [],
        error: error,
        total: 0,
      };
    }
  }
}
