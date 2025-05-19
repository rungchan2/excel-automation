"use server";

import { Client, APIErrorCode } from "@notionhq/client";

const databaseId = process.env.NOTION_DATABASE_ID as string;

if (!databaseId) {
  throw new Error("NOTION_DATABASE_ID is not set");
}

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

type Property = {
  id?: string;
  type?: string;
  [key: string]: any;
};

type BlogResult = {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: { object: "user"; id: string };
  last_edited_by: { object: "user"; id: string };
  cover:
    | { type: "file"; file: { url: string } }
    | { type: "external"; external: { url: string } }
    | null;
  icon: { type: "emoji"; emoji: string } | null;
  parent: {
    type: "database_id";
    database_id: string;
  };
  archived: boolean;
  in_trash: boolean;
  properties: {
    date: Property;
    publish: Property;
    "sub-title": Property;
    updated_at: Property;
    category: Property;
    thumbnail: Property;
    title: Property;
    [key: string]: Property;
  };
  url: string;
  public_url: string | null;
};

export async function getBlogList(): Promise<{
  blogs: BlogResult[];
  error: any;
  total: number;
}> {
  try {
    const blogList = await notion.databases.query({
      database_id: databaseId,
    });
    return {
      blogs: blogList.results as BlogResult[],
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
