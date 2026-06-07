<script setup>
import { computed } from 'vue'
import { t } from '../lib/locale'

const props = defineProps({
  data: { type: Object, default: null },
})

// 對應 studio-medmanager 的 homePage。無資料一律顯示「-」，不使用假資料。
// 對應欄位：heroBadge / heroTitle / heroSubtitle / heroCtaText / heroCtaLink /
// heroSecondaryCtaText / heroSecondaryCtaUrl / highlights[]。
const badge = computed(() => t(props.data?.heroBadge) || '-')
const title = computed(() => t(props.data?.heroTitle) || '-')
const subtitle = computed(() => t(props.data?.heroSubtitle) || '-')
const primaryText = computed(() => t(props.data?.heroCtaText) || '-')
const primaryUrl = computed(() => props.data?.heroCtaLink || '#')
const secondaryText = computed(() => t(props.data?.heroSecondaryCtaText) || '-')
const secondaryUrl = computed(() => props.data?.heroSecondaryCtaUrl || '#')
const stats = computed(() => {
  const fromCms = props.data?.highlights
  if (fromCms?.length) return fromCms.map((s) => ({ value: s.value || '-', label: t(s.label) || '-' }))
  return []
})
</script>

<template>
  <section id="top" class="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white pt-28 pb-20">
    <!-- 背景裝飾 -->
    <div class="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-accent-400/20 blur-3xl"></div>

    <div class="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
      <!-- 文案 -->
      <div>
        <span class="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
          <span class="h-2 w-2 rounded-full bg-brand-500"></span>
          {{ badge }}
        </span>
        <h1 class="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          {{ title }}
        </h1>
        <p class="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
          {{ subtitle }}
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a
            :href="primaryUrl"
            class="rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
          >
            {{ primaryText }}
          </a>
          <a
            :href="secondaryUrl"
            class="rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 ring-1 ring-brand-200 transition hover:bg-brand-50"
          >
            {{ secondaryText }}
          </a>
        </div>

        <!-- 數據 -->
        <dl v-if="stats.length" class="mt-12 grid max-w-md grid-cols-3 gap-6">
          <div v-for="(s, i) in stats" :key="i">
            <dt class="text-2xl font-bold text-brand-700">{{ s.value }}</dt>
            <dd class="mt-1 text-sm text-slate-500">{{ s.label }}</dd>
          </div>
        </dl>
        <p v-else class="mt-12 text-2xl font-bold text-slate-300">-</p>
      </div>

      <!-- 視覺卡片（示意，固定樣式） -->
      <div class="relative">
        <div class="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold">健</div>
              <div>
                <p class="text-sm font-semibold text-slate-900">王小明 的健康儀表板</p>
                <p class="text-xs text-slate-400">付費會員 · 家庭方案</p>
              </div>
            </div>
            <span class="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">已啟用</span>
          </div>

          <div class="mt-6 space-y-3">
            <div class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span class="text-sm text-slate-600">下次健檢預約</span>
              <span class="text-sm font-semibold text-slate-900">06/18 · 仁愛診所</span>
            </div>
            <div class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span class="text-sm text-slate-600">最新健檢報告</span>
              <span class="text-sm font-semibold text-brand-700">查看 →</span>
            </div>
            <div class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span class="text-sm text-slate-600">家庭子帳號</span>
              <span class="text-sm font-semibold text-slate-900">3 位成員</span>
            </div>
          </div>
        </div>

        <!-- 浮動小卡 -->
        <div class="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-100 sm:block">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-accent-400/20 text-accent-600">✓</div>
            <div>
              <p class="text-xs text-slate-400">監護人陪同</p>
              <p class="text-sm font-semibold text-slate-900">已安排</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
