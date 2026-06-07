<script setup>
import { computed } from 'vue'
import { t } from '../lib/locale'

const props = defineProps({
  data: { type: Object, default: null },
})

// 對應 medmanager：homePage 的 processEyebrow / processHeading / processSteps[]
//（每筆 stepNo + title + description）。無資料一律顯示「-」。
const eyebrow = computed(() => t(props.data?.processEyebrow) || '-')
const heading = computed(() => t(props.data?.processHeading) || '-')
const steps = computed(() => {
  const fromCms = props.data?.processSteps
  if (fromCms?.length) {
    return fromCms.map((s) => ({ stepNo: s.stepNo || '-', title: t(s.title) || '-', description: t(s.description) || '-' }))
  }
  return []
})
</script>

<template>
  <section id="process" class="bg-slate-900 py-24 text-white">
    <div class="mx-auto max-w-6xl px-5">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-sm font-semibold uppercase tracking-wider text-brand-300">{{ eyebrow }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{{ heading }}</h2>
      </div>

      <p v-if="!steps.length" class="mt-16 text-center text-2xl font-bold text-slate-600">-</p>
      <ol v-else class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        <li v-for="(step, i) in steps" :key="i" class="relative">
          <span class="text-3xl font-bold text-brand-400">{{ step.stepNo }}</span>
          <h3 class="mt-3 text-lg font-bold">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-400">{{ step.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
