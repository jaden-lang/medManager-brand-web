<script setup>
import { computed } from 'vue'
import { t } from '../lib/locale'

const props = defineProps({
  data: { type: Object, default: null },
})

// 對應 medmanager：homePage.servicesTitle + featuredServices[]->service。
// 無資料一律顯示「-」。註：medmanager 的 service 無 icon 欄位，卡片圖示固定用 shield；
// 服務描述取自 service.summary。小標 / 副標在 medmanager 無對應欄位，顯示「-」。
const eyebrow = computed(() => t(props.data?.servicesEyebrow) || '-')
const heading = computed(() => t(props.data?.servicesTitle) || '-')
const subheading = computed(() => t(props.data?.servicesSubheading) || '-')
const services = computed(() => {
  const fromCms = props.data?.featuredServices
  if (fromCms?.length) {
    return fromCms.map((s) => ({
      _id: s._id,
      icon: s.icon || 'shield',
      title: t(s.title) || '-',
      shortDescription: t(s.summary) || '-',
    }))
  }
  return []
})
</script>

<template>
  <section id="services" class="py-24">
    <div class="mx-auto max-w-6xl px-5">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-sm font-semibold uppercase tracking-wider text-brand-600">{{ eyebrow }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {{ heading }}
        </h2>
        <p class="mt-4 text-lg text-slate-600">
          {{ subheading }}
        </p>
      </div>

      <p v-if="!services.length" class="mt-16 text-center text-2xl font-bold text-slate-300">-</p>
      <div v-else class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="s in services"
          :key="s._id"
          class="group rounded-2xl border border-slate-100 bg-white p-7 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-slate-200/50"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
            <!-- calendar -->
            <svg v-if="s.icon === 'calendar'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 2v3M16 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
            </svg>
            <!-- document -->
            <svg v-else-if="s.icon === 'document'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 2v6h6M9 13h6M9 17h6" />
            </svg>
            <!-- family -->
            <svg v-else-if="s.icon === 'family'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <!-- shield -->
            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h3 class="mt-5 text-lg font-bold text-slate-900">{{ s.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ s.shortDescription }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
