# brand-web — 守護健檢形象網站

健檢會員平台的產品形象網站，使用 **Vue 3 + Vite + Tailwind CSS v4** 撰寫。

對應需求：`medManager/documents/requirements/產品形象網站WP.md`
（服務介紹 / 方案介紹 / 登入 / 免費註冊；登入與註冊為入口，導向會員端 WEB）

## 啟動

```bash
cd brand-web
npm install
npm run dev
```

瀏覽器開啟終端機顯示的網址（預設 http://localhost:5173）。

## 頁面區塊

| 區塊 | 元件 | 內容 |
|---|---|---|
| 導覽列 | `TheNavbar.vue` | Logo、錨點導覽、登入 / 免費註冊 |
| 首屏 | `HeroSection.vue` | 主標語、CTA、儀表板示意卡 |
| 服務介紹 | `ServicesSection.vue` | 預約 / 報告 / 子帳號 / 監護人 四項 |
| 為什麼選我們 | `WhySection.vue` | 四個信任點 |
| 方案介紹 | `PlansSection.vue` | 免費 / 付費 / 家庭 三方案 |
| 使用流程 | `ProcessSection.vue` | 五步驟 |
| CTA | `CtaSection.vue` | 行動呼籲 |
| 頁尾 | `TheFooter.vue` | 連結、付款方式 |

## 設計調整

- 全站色系集中在 `src/style.css` 的 `@theme` 區塊（`--color-brand-*` / `--color-accent-*`），改一處即全站套用。
- 文案、方案、服務項目都以陣列定義在各自元件最上方的 `<script setup>`，直接改陣列即可。

## 待接項目

- 登入 / 免費註冊按鈕目前指向 `/login`、`/register`，正式上線需改為導向會員端 WEB。
- 圖片目前為佔位設計（SVG / 純色卡），可替換為實際品牌素材。
- 價格 `$XXX` 為佔位，需帶入真實方案定價。
