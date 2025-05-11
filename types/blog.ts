export interface Blog {
  id: string
  title: string
  subtitle: string | null
  content: string
  created_at: string
  image_url?: string | null
}

export interface BlogListItem {
  id: string
  title: string
  subtitle: string | null
  created_at: string
  image_url?: string | null
}
