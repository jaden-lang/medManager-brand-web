import { ref, onMounted } from 'vue'
import { fetchHomePage, fetchSiteSettings, fetchLatestNews } from '../sanity/queries'

/**
 * 載入首頁 CMS 內容、全站設定與最新消息。
 * - data：Sanity 回傳的 homePage 文件（可能為 null）
 * - settings：siteSettings 文件（可能為 null）
 * - news：最新消息清單（可能為空陣列）
 * 各區塊元件以 props 接收後，找不到欄位 / 無資料時一律顯示「-」，不使用假資料。
 */
export function useHomePage() {
  const data = ref(null)
  const settings = ref(null)
  const news = ref([])
  const loading = ref(true)
  const error = ref(null)

  onMounted(async () => {
    try {
      const [home, site, latestNews] = await Promise.all([
        fetchHomePage(),
        fetchSiteSettings(),
        fetchLatestNews(),
      ])
      data.value = home
      settings.value = site
      news.value = latestNews || []
    } catch (e) {
      error.value = e
      // 讀取失敗時不阻斷畫面，各欄位會顯示「-」
      console.error('[brand-web] 讀取 Sanity 內容失敗：', e)
    } finally {
      loading.value = false
    }
  })

  return { data, settings, news, loading, error }
}
