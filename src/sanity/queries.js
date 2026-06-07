import { client } from './client'

// 首頁（單例）：對應 studio-medmanager 的 homePage schema
// 欄位名稱以 studio-medmanager/schemaTypes/homePage.ts 為準；各區塊（Hero、服務、
// 為什麼選我們、方案、最新消息、使用流程、CTA）皆已有對應欄位，未填者前端顯示「-」。
export const homePageQuery = /* groq */ `
*[_type == "homePage"][0]{
  heroBadge, heroTitle, heroSubtitle, heroImage,
  heroCtaText, heroCtaLink,
  heroSecondaryCtaText, heroSecondaryCtaUrl,
  highlights[]{value, label},

  servicesEyebrow, servicesTitle, servicesSubheading,
  featuredServices[]->{_id, title, summary, image, icon},

  whyEyebrow, whyHeading, whyBody, whyCtaText, whyCtaUrl,
  whyPoints[]{title, description},

  plansEyebrow, plansTitle, plansSubheading, plansNote,
  featuredPlans[]->{_id, title, price, priceUnit, summary, features, isFeatured, ctaText, ctaUrl},

  newsEyebrow, newsTitle, showLatestNews,

  processEyebrow, processHeading,
  processSteps[]{stepNo, title, description},

  ctaHeading, ctaSubtitle,
  ctaPrimaryText, ctaPrimaryUrl,
  ctaSecondaryText, ctaSecondaryUrl
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
