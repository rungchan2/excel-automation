import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "클래스플로우 ClassFlow",
    short_name: "클래스플로우",
    description: "학원 운영에 필요한 반복적인 업무들로 부터 해방! 효율적인 자동화로 시간을 되찾으세요",
    start_url: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#217346",
    background_color: "#ffffff",
    categories: ["education", "productivity", "business", "업무 자동화", "생산성", "학원 운영"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon"
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    screenshots: [
      {
        src: "/og-image.png",
        type: "image/png",
        sizes: "1200x630",
        form_factor: "wide"
      }
    ],
    prefer_related_applications: false,
    related_applications: [],
    lang: "ko-KR",
    dir: "ltr",
  }
}
