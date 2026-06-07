<script setup>
import { computed } from 'vue'
import { t } from '../lib/locale'

const props = defineProps({
  settings: { type: Object, default: null },
})

// 品牌名稱與標語取自 siteSettings；無資料顯示「-」
const siteName = computed(() => t(props.settings?.siteName) || '-')
const slogan = computed(() => t(props.settings?.slogan) || '-')

const columns = [
  {
    title: '服務',
    links: [
      { label: '服務介紹', href: '#services' },
      { label: '方案介紹', href: '#plans' },
      { label: '使用流程', href: '#process' },
    ],
  },
  {
    title: '帳號',
    links: [
      { label: '會員登入', href: '/login' },
      { label: '免費註冊', href: '/register' },
    ],
  },
  {
    title: '關於',
    links: [
      { label: '隱私權政策', href: '#' },
      { label: '服務條款', href: '#' },
      { label: '聯絡我們', href: '#' },
    ],
  },
]
</script>

<template>
  <footer class="border-t border-slate-100 bg-white py-14">
    <div class="mx-auto max-w-6xl px-5">
      <div class="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div class="flex items-center gap-2">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
            <span class="text-lg font-bold text-slate-900">{{ siteName }}</span>
          </div>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
            {{ slogan }}
          </p>
        </div>

        <div v-for="col in columns" :key="col.title">
          <h4 class="text-sm font-semibold text-slate-900">{{ col.title }}</h4>
          <ul class="mt-4 space-y-3">
            <li v-for="link in col.links" :key="link.label">
              <a :href="link.href" class="text-sm text-slate-500 transition hover:text-brand-700">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
        <p class="text-sm text-slate-400">© {{ new Date().getFullYear() }} {{ siteName }}. 版權所有。</p>
        <div class="flex items-center gap-3 text-xs font-medium text-slate-400">
          <span>支援付款：</span>
          <span class="rounded bg-slate-100 px-2 py-1">PayNow</span>
          <span class="rounded bg-slate-100 px-2 py-1">WeChat Pay</span>
          <span class="rounded bg-slate-100 px-2 py-1">Alipay</span>
        </div>
      </div>
    </div>
  </footer>
</template>
