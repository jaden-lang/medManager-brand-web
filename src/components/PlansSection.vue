<script setup>
import { computed } from 'vue'
import { t } from '../lib/locale'

const props = defineProps({
  data: { type: Object, default: null },
})

// 對應 medmanager：homePage.plansTitle + featuredPlans[]->plan。無資料一律顯示「-」。
// 欄位對照：name←plan.title、unit←plan.priceUnit、description←plan.summary、featured←plan.isFeatured。
// 小標 / 副標 / 備註、方案按鈕文字與連結在 medmanager 無對應欄位，顯示「-」（按鈕連結退回 #）。
const eyebrow = computed(() => t(props.data?.plansEyebrow) || '-')
const heading = computed(() => t(props.data?.plansTitle) || '-')
const subheading = computed(() => t(props.data?.plansSubheading) || '-')
const note = computed(() => t(props.data?.plansNote) || '-')
const plans = computed(() => {
  const fromCms = props.data?.featuredPlans
  if (fromCms?.length) {
    return fromCms.map((p) => ({
      _id: p._id,
      name: t(p.title) || '-',
      price: p.price || '-',
      unit: t(p.priceUnit) || '-',
      description: t(p.summary) || '-',
      features: (p.features || []).map((f) => t(f) || '-'),
      ctaText: t(p.ctaText) || '-',
      ctaUrl: p.ctaUrl || '#',
      featured: !!p.isFeatured,
    }))
  }
  return []
})
</script>

<template>
  <section id="plans" class="py-24">
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

      <p v-if="!plans.length" class="mt-16 text-center text-2xl font-bold text-slate-300">-</p>
      <div v-else class="mt-16 grid items-start gap-8 lg:grid-cols-3">
        <div
          v-for="plan in plans"
          :key="plan._id"
          :class="[
            'relative rounded-3xl p-8 transition',
            plan.featured
              ? 'bg-brand-600 text-white shadow-2xl shadow-brand-600/30 lg:-translate-y-4'
              : 'bg-white text-slate-900 ring-1 ring-slate-200',
          ]"
        >
          <span
            v-if="plan.featured"
            class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-4 py-1 text-xs font-bold text-white"
          >
            最受歡迎
          </span>

          <h3 class="text-lg font-bold">{{ plan.name }}</h3>
          <div class="mt-4 flex items-baseline gap-1">
            <span class="text-4xl font-bold">{{ plan.price }}</span>
            <span :class="plan.featured ? 'text-brand-100' : 'text-slate-500'" class="text-sm">{{ plan.unit }}</span>
          </div>
          <p :class="plan.featured ? 'text-brand-50' : 'text-slate-600'" class="mt-3 text-sm leading-relaxed">
            {{ plan.description }}
          </p>

          <ul v-if="plan.features.length" class="mt-6 space-y-3">
            <li v-for="(f, i) in plan.features" :key="i" class="flex items-start gap-3 text-sm">
              <svg
                :class="plan.featured ? 'text-brand-200' : 'text-brand-500'"
                class="mt-0.5 h-5 w-5 flex-none"
                fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 6L9 17l-5-5" />
              </svg>
              <span :class="plan.featured ? 'text-brand-50' : 'text-slate-700'">{{ f }}</span>
            </li>
          </ul>
          <p v-else class="mt-6 text-sm" :class="plan.featured ? 'text-brand-100' : 'text-slate-400'">-</p>

          <a
            :href="plan.ctaUrl"
            :class="[
              'mt-8 block rounded-full py-3 text-center text-sm font-semibold transition',
              plan.featured
                ? 'bg-white text-brand-700 hover:bg-brand-50'
                : 'bg-brand-600 text-white hover:bg-brand-700',
            ]"
          >
            {{ plan.ctaText }}
          </a>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-slate-400">
        {{ note }}
      </p>
    </div>
  </section>
</template>
