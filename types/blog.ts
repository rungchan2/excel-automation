export interface Blog {
  id: string
  title: string
  subtitle: string
  content: string
  created_at: string
  image_url?: string
}

export interface BlogListItem {
  id: string
  title: string
  subtitle: string
  created_at: string
  image_url?: string
}
