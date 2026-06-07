<script setup>
import { computed } from 'vue'
import { t } from '../lib/locale'
import { urlFor } from '../sanity/image'

const props = defineProps({
  data: { type: Object, default: null }, // homePage：newsTitle / showLatestNews
  news: { type: Array, default: () => [] }, // news 文件清單
})

// 後台 showLatestNews 關閉時隱藏整個區塊（未設定時預設顯示）
const visible = computed(() => props.data?.showLatestNews !== false)

// 對應 medmanager：homePage.newsEyebrow / newsTitle（未填顯示「-」）
const eyebrow = computed(() => t(props.data?.newsEyebrow) || '-')
const heading = computed(() => t(props.data?.newsTitle) || '-')

// news.category 代碼 → 顯示名稱（對應 medmanager news schema 的選項）
const CATEGORY_LABELS = {
  announcement: '公告',
  event: '活動',
  press: '媒體報導',
}

const items = computed(() =>
  (props.news || []).map((n) => ({
    _id: n._id,
    title: t(n.title) || '-',
    excerpt: t(n.excerpt) || '-',
    category: CATEGORY_LABELS[n.category] || '-',
    date: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString('zh-TW') : '-',
    image: n.coverImage ? urlFor(n.coverImage).width(800).height(450).fit('crop').url() : '',
  }))
)
</script>

<template>
  <section v-if="visible" id="news" class="bg-slate-50 py-24">
    <div class="mx-auto max-w-6xl px-5">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-sm font-semibold uppercase tracking-wider text-brand-600">{{ eyebrow }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {{ heading }}
        </h2>
      </div>

      <p v-if="!items.length" class="mt-16 text-center text-2xl font-bold text-slate-300">-</p>
      <div v-else class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="n in items"
          :key="n._id"
          class="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
        >
          <div class="aspect-[16/9] overflow-hidden bg-slate-100">
            <img
              v-if="n.image"
              :src="n.image"
              :alt="n.title"
              class="h-full w-full object-cover transition group-hover:scale-105"
            />
            <div
              v-else
              class="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 to-slate-100 text-3xl font-bold text-slate-300"
            >
              -
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3 text-xs">
              <span class="rounded-full bg-brand-100 px-3 py-1 font-semibold text-brand-700">{{ n.category }}</span>
              <time class="text-slate-400">{{ n.date }}</time>
            </div>
            <h3 class="mt-4 text-lg font-bold leading-snug text-slate-900">{{ n.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ n.excerpt }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
