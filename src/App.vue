<script setup>
import { useHomePage } from './composables/useHomePage'
import TheNavbar from './components/TheNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import WhySection from './components/WhySection.vue'
import PlansSection from './components/PlansSection.vue'
import NewsSection from './components/NewsSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import CtaSection from './components/CtaSection.vue'
import TheFooter from './components/TheFooter.vue'

// 從 Sanity 讀取首頁內容、全站設定與最新消息；無資料的欄位一律顯示「-」
const { data, settings, news } = useHomePage()
</script>

<template>
  <TheNavbar :settings="settings" />
  <main>
    <HeroSection :data="data" />
    <ServicesSection :data="data" />
    <WhySection :data="data" />
    <PlansSection :data="data" />
    <NewsSection :data="data" :news="news" />
    <ProcessSection :data="data" />
    <CtaSection :data="data" />
  </main>
  <TheFooter :settings="settings" />
</template>
