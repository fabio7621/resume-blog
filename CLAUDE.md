# Resume Blog - 履歷兼職部落格

## 技術棧

- **框架**：Vite + Vue 3 (JavaScript)
- **路由**：Vue Router
- **狀態管理**：Pinia
- **樣式**：Tailwind CSS
- **文章管理**：Markdown 檔案（放在 `src/content/posts/` 目錄下）
- **Markdown 解析**：待選用（如 markdown-it 或 marked）

## 頁面規劃

| 頁面     | 路由             | 說明                         |
| -------- | ---------------- | ---------------------------- |
| 首頁     | `/`              | 簡介、重點摘要、最新文章預覽 |
| 關於我   | `/about`         | 個人經歷、學歷、自我介紹     |
| 技能     | `/skills`        | 技術能力、工具、語言等       |
| 作品集   | `/portfolio`     | 專案展示、截圖、連結         |
| 部落格   | `/blog`          | 文章列表                     |
| 文章內頁 | `/blog/:slug`    | 單篇 Markdown 文章內容       |
| 聯絡我   | `/contact`       | 聯絡表單或聯絡資訊           |

## 專案結構（預計）

```
src/
├── assets/          # 靜態資源（圖片、字型）
├── components/      # 共用元件（Navbar、Footer、Card 等）
├── content/
│   └── posts/       # Markdown 部落格文章
├── layouts/         # 頁面佈局
├── pages/           # 各頁面元件
├── router/          # Vue Router 設定
├── stores/          # Pinia stores
├── style.css        # 全域樣式 / Tailwind 入口
├── App.vue
└── main.js
```

## 開發規則

### 命名規範

- **元件檔名**：使用 PascalCase（如 `NavBar.vue`、`BlogCard.vue`）
- **頁面檔名**：使用 PascalCase（如 `HomePage.vue`、`AboutPage.vue`）
- **composables**：以 `use` 開頭，camelCase（如 `usePosts.js`、`useTheme.js`）
- **Props**：宣告用 camelCase，模板中用 kebab-case
- **事件名稱**：kebab-case（如 `@update-value`）
- **常數**：UPPER_SNAKE_CASE（如 `MAX_POSTS_PER_PAGE`）
- **CSS class**：遵循 Tailwind 語意，自訂 class 用 kebab-case

### Vue 元件規則

- 使用 Composition API + `<script setup>` 語法
- 每個元件只做一件事，保持單一職責
- Props 必須定義型別與預設值（用 `defineProps`）
- 事件用 `defineEmits` 明確宣告
- 計算屬性優先於方法（`computed` 有快取）
- `v-for` 必須搭配 `:key`
- 避免 `v-if` 和 `v-for` 用在同一元素上
- 路由頁面元件放 `pages/`，可複用元件放 `components/`

### Tailwind CSS v4 規則

- 使用 `@tailwindcss/vite` 插件整合（無需 PostCSS 設定）
- CSS 入口檔使用 `@import "tailwindcss"` 引入
- 設計 token（顏色、字型、間距）用 `@theme` 統一管理
- 優先使用 Tailwind utility class，減少自訂 CSS
- 長 class 列表保持一致的排序（layout → spacing → typography → visual）
- 響應式設計用 Tailwind 斷點前綴（`sm:`, `md:`, `lg:`）

### 狀態管理（Pinia）

- 每個 store 對應一個領域（如 `useBlogStore`、`useUserStore`）
- 使用 Composition API 風格定義 store
- 衍生狀態用 `computed`，非同步操作寫在 actions 中

### 路由規則（Vue Router）

- 路由層級頁面使用懶載入（`() => import('./pages/Xxx.vue')`）
- 路由設定集中在 `src/router/index.js`
- 頁面切換加上過渡動畫（`<Transition>`）

### 程式碼品質

- 使用 ESLint（flat config）+ Prettier 統一程式碼風格
- ESLint 搭配 `eslint-plugin-vue` 和 `eslint-config-prettier`
- 字串使用單引號
- 變數宣告優先用 `const`，需重新賦值才用 `let`，禁止 `var`
- 使用 ES Modules（`import` / `export`）
- 未使用的變數與 import 必須移除
- 提交前跑 lint 檢查（建議搭配 lint-staged + husky）

### 效能最佳實踐

- 圖片與大型元件使用懶載入（lazy loading）
- 避免不必要的響應式包裝（不要把靜態資料放進 `ref` / `reactive`）
- 列表渲染提供穩定的 `:key` 值
- 善用 `<KeepAlive>` 快取不常變動的路由頁面

### Git 規範

- Commit 訊息格式：`type: 簡短描述`
- type 包含：`feat`、`fix`、`style`、`refactor`、`docs`、`chore`、`test`
- 每次 commit 專注於一件事，避免混合不同目的的修改
