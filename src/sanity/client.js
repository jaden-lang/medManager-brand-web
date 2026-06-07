import { createClient } from '@sanity/client'

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'qrepjm4m'
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-10-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // 形象站為純讀取的公開內容，開啟 CDN 取得較快的回應
  useCdn: true,
  perspective: 'published',
})
