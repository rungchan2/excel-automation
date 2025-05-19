export interface Blog {
  id: string
  title: string
  subtitle: string | null
  content: string
  created_at: string
  image_url?: string | null
  recordMap?: any // Notion 페이지 렌더링을 위한 recordMap
}

export interface BlogListItem {
  id: string
  title: string
  subtitle: string | null
  created_at: string
  image_url?: string | null
}
