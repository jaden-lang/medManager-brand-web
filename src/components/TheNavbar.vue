<script setup>
import { ref, computed } from 'vue'
import { t } from '../lib/locale'

const props = defineProps({
  settings: { type: Object, default: null },
})

// 品牌名稱取自 siteSettings.siteName；無資料顯示「-」
const siteName = computed(() => t(props.settings?.siteName) || '-')

const navLinks = [
  { label: '服務介紹', href: '#services' },
  { label: '為什麼選我們', href: '#why' },
  { label: '方案介紹', href: '#plans' },
  { label: '最新消息', href: '#news' },
  { label: '使用流程', href: '#process' },
]

const open = ref(false)
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
    <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
      <!-- Logo -->
      <a href="#top" class="flex items-center gap-2">
        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </span>
        <span class="text-lg font-bold tracking-tight text-slate-900">{{ siteName }}</span>
      </a>

      <!-- Desktop nav -->
      <ul class="hidden items-center gap-8 md:flex">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href" class="text-sm font-medium text-slate-600 transition hover:text-brand-700">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Actions -->
      <div class="hidden items-center gap-3 md:flex">
        <a href="/login" class="text-sm font-semibold text-slate-700 transition hover:text-brand-700">登入</a>
        <a
          href="/register"
          class="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          免費註冊
        </a>
      </div>

      <!-- Mobile toggle -->
      <button
        class="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 md:hidden"
        @click="open = !open"
        aria-label="開啟選單"
      >
        <svg v-if="!open" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu -->
    <div v-show="open" class="border-t border-slate-100 bg-white md:hidden">
      <div class="space-y-1 px-5 py-4">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50"
          @click="open = false"
        >
          {{ link.label }}
        </a>
        <div class="mt-3 flex gap-3 px-3">
          <a href="/login" class="flex-1 rounded-full border border-slate-200 py-2 text-center text-sm font-semibold text-slate-700">登入</a>
          <a href="/register" class="flex-1 rounded-full bg-brand-600 py-2 text-center text-sm font-semibold text-white">免費註冊</a>
        </div>
      </div>
    </div>
  </header>
</template>
