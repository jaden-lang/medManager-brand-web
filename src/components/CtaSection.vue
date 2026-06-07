<script setup>
import { computed } from 'vue'
import { t } from '../lib/locale'

const props = defineProps({
  data: { type: Object, default: null },
})

// 注意：studio-medmanager 的 homePage 目前「沒有」行動呼籲（CTA）區塊的對應欄位，
// 因此整段固定顯示「-」。若要可在後台填寫，需於 medmanager 的 schema 新增對應欄位
// （可參考 jdnsite 的 ctaHeading/ctaSubtitle/ctaPrimaryText… 設計）。
const heading = computed(() => t(props.data?.ctaHeading) || '-')
const subtitle = computed(() => t(props.data?.ctaSubtitle) || '-')
const primaryText = computed(() => t(props.data?.ctaPrimaryText) || '-')
const primaryUrl = computed(() => props.data?.ctaPrimaryUrl || '#')
const secondaryText = computed(() => t(props.data?.ctaSecondaryText) || '-')
const secondaryUrl = computed(() => props.data?.ctaSecondaryUrl || '#')
</script>

<template>
  <section class="py-24">
    <div class="mx-auto max-w-5xl px-5">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-16 text-center text-white sm:px-16">
        <div class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"></div>
        <h2 class="relative text-3xl font-bold tracking-tight sm:text-4xl">
          {{ heading }}
        </h2>
        <p class="relative mx-auto mt-4 max-w-xl text-lg text-brand-50">
          {{ subtitle }}
        </p>
        <div class="relative mt-8 flex flex-wrap justify-center gap-4">
          <a :href="primaryUrl" class="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50">
            {{ primaryText }}
          </a>
          <a :href="secondaryUrl" class="rounded-full px-8 py-3.5 text-base font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/10">
            {{ secondaryText }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
