<script setup>
import { computed } from 'vue'
import { t } from '../lib/locale'

const props = defineProps({
  data: { type: Object, default: null },
})

// 對應 medmanager：homePage 的 whyEyebrow / whyHeading / whyBody / whyCtaText /
// whyCtaUrl / whyPoints[]（每筆 title + description）。無資料一律顯示「-」。
const eyebrow = computed(() => t(props.data?.whyEyebrow) || '-')
const heading = computed(() => t(props.data?.whyHeading) || '-')
const body = computed(() => t(props.data?.whyBody) || '-')
const ctaText = computed(() => t(props.data?.whyCtaText) || '-')
const ctaUrl = computed(() => props.data?.whyCtaUrl || '#')
const points = computed(() => {
  const fromCms = props.data?.whyPoints
  if (fromCms?.length) return fromCms.map((p) => ({ title: t(p.title) || '-', description: t(p.description) || '-' }))
  return []
})
</script>

<template>
  <section id="why" class="bg-slate-50 py-24">
    <div class="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
      <div>
        <p class="text-sm font-semibold uppercase tracking-wider text-brand-600">{{ eyebrow }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {{ heading }}
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-slate-600">
          {{ body }}
        </p>
        <a
          :href="ctaUrl"
          class="mt-8 inline-flex rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
        >
          {{ ctaText }}
        </a>
      </div>

      <p v-if="!points.length" class="text-2xl font-bold text-slate-300">-</p>
      <div v-else class="grid gap-5 sm:grid-cols-2">
        <div
          v-for="(p, i) in points"
          :key="i"
          class="rounded-2xl bg-white p-6 ring-1 ring-slate-100"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3 class="mt-4 font-bold text-slate-900">{{ p.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ p.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
