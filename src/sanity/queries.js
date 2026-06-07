import { client } from './client'

// 首頁（單例）：對應 studio-medmanager 的 homePage schema
// 注意：欄位名稱以 studio-medmanager/schemaTypes/homePage.ts 為準。
// 畫面上若有區塊在此 schema 沒有對應欄位（例：Hero 標籤、為什麼選我們、
// 使用流程、CTA），前端會顯示「-」，詳見 SANITY內容建置指南.md。
export const homePageQuery = /* groq */ `
*[_type == "homePage"][0]{
  heroTitle, heroSubtitle, heroImage,
  heroCtaText, heroCtaLink,
  highlights[]{value, label},

  servicesTitle,
  featuredServices[]->{_id, title, summary, image},

  plansTitle,
  featuredPlans[]->{_id, title, price, priceUnit, summary, features, isFeatured},

  newsTitle, showLatestNews
}
`

// 全站設定（單例）：導覽列 / 頁尾共用的品牌資訊
export const siteSettingsQuery = /* groq */ `
*[_type == "siteSettings"][0]{
  siteName, slogan, logo,
  phone, email, address,
  socialLinks[]{platform, url}
}
`

// 最新消息：置頂優先、再依發布日期新到舊，取前 3 筆
export const latestNewsQuery = /* groq */ `
*[_type == "news"] | order(isPinned desc, publishedAt desc)[0...3]{
  _id, title, slug, category, publishedAt, coverImage, excerpt
}
`

export function fetchHomePage() {
  return client.fetch(homePageQuery)
}

export function fetchSiteSettings() {
  return client.fetch(siteSettingsQuery)
}

export function fetchLatestNews() {
  return client.fetch(latestNewsQuery)
}
