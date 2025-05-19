import { NotionAPI } from "notion-client";

const authToken = process.env.NOTION_TOKEN || "";

if (!authToken) {
  throw new Error("NOTION_TOKEN is not set");
}

const notion = new NotionAPI({
  authToken,
});

export default async function getRecordMap(pageId: string) {
  if (!pageId) {
    throw new Error(`Invalid page ID: "${pageId}"`);
  }
  
  // 페이지 ID 정규화 (하이픈 제거)
  const normalizedPageId = pageId.replace(/-/g, '');
  
  try {
    const recordMap = await notion.getPage(normalizedPageId);
    return recordMap;
  } catch (error) {
    console.error('Notion API Error:', error);
    
    // 더 상세한 에러 정보 제공
    if (error instanceof Error) {
      if (error.message.includes('Unauthorized')) {
        throw new Error(`Notion page is private or requires authentication: "${pageId}"`);
      }
      if (error.message.includes('not found') || error.message.includes('Not found')) {
        throw new Error(`Notion page not found: "${pageId}". Please check if the page exists and is accessible.`);
      }
    }
    
    throw new Error(`Failed to fetch Notion page "${pageId}": ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}