// 作品資料：首頁顯示「個人專案」與「精選 AI 協作」，其餘 AI 協作視覺作品放在 /ai-works
// 預覽圖放進 src/assets/projects/，檔名填到 image 欄位

// 排序原則：實務性質的專案在前，課程作業型往後
// TODO：duration 請填上實際起訖月份；highlight 請確認與當時的技術決策相符
export const PERSONAL_PROJECTS = [
  {
    name: '衛生局稽查流程優化（提案專案）',
    description:
      '實地訪談台南市衛生局菸酒業務單位，釐清現行紙本派案流程的痛點，' +
      '產出流程圖與可操作 prototype 並參與提案，將使用者需求轉譯為系統設計方向。',
    role: '需求訪談 / 流程設計 / 原型製作',
    duration: '',
    highlight:
      '使用單位講的是「表單很難填」，實際卡點是派案與回報分屬兩套流程；先畫流程圖對齊認知，再用 prototype 讓對方在畫面上確認，需求才收斂得下來。',
    tags: ['需求訪談', '流程設計', 'Prototype', 'Vue 3'],
    repo: '',
    link: 'https://fabio7621.github.io/tabacoco/#/',
    image: 'tabacoco.jpg',
  },
  {
    name: '大東洋（企業官網切版）',
    description: '服務案例 — 企業官網靜態切版，著重 RWD 與版面細節處理。',
    role: '獨立負責前端切版',
    duration: '',
    highlight:
      '首頁的鮮活報報,不使用JS利用CSS的position的z-index前後圖層關係，讓每個選單在hover時能顯示各自相對應的圖片。',
    tags: ['HTML', 'CSS', 'RWD'],
    repo: '',
    link: 'https://www.freshlife.com.tw/',
    image: 'don.jpg',
  },
  {
    name: '蔡教練',
    description: '服務案例 — 教練個人形象網站靜態切版，含 RWD 排版。',
    role: '獨立負責前端切版',
    duration: '',
    highlight:
      '以形象頁為主的單頁結構，把版面拆成可重複套用的區塊，讓後續增減段落不用重寫樣式。',
    tags: ['HTML', 'CSS', 'RWD'],
    repo: 'https://github.com/fabio7621/tsai-coach',
    link: 'https://fabio7621.github.io/tsai-coach/',
    image: 'ten.jpg',
  },
  {
    name: 'HelmentShop',
    description:
      '安全帽電商網站前後台，Vue 3 Options API + Vite + Pinia + Router，串接 RESTful API。',
    role: '獨立開發',
    duration: '',
    highlight:
      '購物車狀態要在商品頁、結帳頁與後台之間同步，用 props 傳遞會讓路由層層耦合，改以 Pinia 集中管理並統一處理 API 失敗時的回滾。',
    tags: ['Vue 3', 'Vite', 'Pinia', 'RESTful API'],
    repo: 'https://github.com/fabio7621/HelmentShop',
    link: 'https://fabio7621.github.io/HelmentShop/#/',
    image: 'helment.jpg',
  },
  {
    name: 'MusicShop',
    description:
      'React.js + Vite + chart.js 打造的音樂商店與儀錶板，練習資料視覺化與商品列表互動。',
    role: '獨立開發',
    duration: '',
    highlight:
      'chart.js 在資料更新時會整張重繪，改為只更新 dataset 並控制重新渲染的時機，避免切換分類時畫面卡頓。',
    tags: ['React', 'Vite', 'chart.js'],
    repo: 'https://github.com/fabio7621/musicstore-react',
    link: 'https://fabio7621.github.io/musicstore-react/',
    image: 'music.jpg',
  },
];

// 首頁精選：偏產品／工程面的 AI 協作專案
export const FEATURED_AI_PROJECTS = [
  {
    name: '捷運懶人導航(AI-assisted development)',
    description:
      'Vue 3(Composition API)+ Vite · Vitest + Vue Test Utils · Geolocation API · 部署於 GitHub Pages',
    role: 'AI協作開發',
    duration: '2026.10',
    highlight:
      '給不熟台北捷運的人用的逐步導航：選好起訖站，畫面一次只告訴你「現在該做的那一件事」——進站搭車、坐幾站、在哪轉乘、往哪個方向。 路線用 Dijkstra 演算法計算,節點設計成「車站 + 正在搭的列車」,把轉乘算成額外成本(轉一次約等於多坐 3.5 站),也能正確處理中和新蘆線、新北投等分支; 卡片底色直接換成該路線顏色,對應站內指標,主要按鈕固定在拇指按得到的底部; 支援定位找最近的站、站名模糊搜尋(臺/台、車站代碼),導航進度存在本機,重新整理也能接續。',
    tags: [
      'Vue 3',
      'Dijkstra 路徑演算法',
      'Geolocation API',
      'Vitest 測試',
      'RWD / 行動優先',
    ],
    repo: 'https://github.com/fabio7621/mrt-lazy-nav-vue',
    link: 'https://fabio7621.github.io/mrt-lazy-nav-vue/',
    image: 'mrt.jpg',
  },
  {
    name: '冰箱貼任務板完成版(AI-assisted development)',
    description:
      'Vue 3 + Vite · Node.js / Express · MongoDB · Socket.IO · Docker Compose 一行啟動',
    role: 'AI協作開發',
    duration: '2026.09 - 2026.10',
    highlight:
      '以冰箱便利貼為靈感的全端任務板：組員發布任務、自由認領，完成後賺取發布者的點數再兌換獎品。 先寫規格文件再交給 AI 開發，規則沒寫到的不讓 AI 自行決定; 搶單與兌換的「只有一人成功」靠 MongoDB 交易在後端保證,不依賴前端狀態; 同組操作經 Socket.IO 依組別房間即時廣播,先寫入資料庫成功才推送,斷線重連後重新同步整個任務板。',
    tags: [
      'Vue 3',
      'Pinia',
      'Node.js / Express',
      'MongoDB 交易',
      'Socket.IO 即時同步',
      'JWT 驗證',
      'Docker Compose',
    ],
    repo: 'https://github.com/fabio7621/group-task-bord',
    link: '',
    image: 'taskbordf.jpg',
  },
];

// 偏畫面表現的 AI 協作作品，獨立放在 /ai-works
export const AI_SHOWCASE_PROJECTS = [
  {
    name: '升空計畫 Ascent(AI-assisted development)',
    description:
      'Vue 3 + Vite · Three.js / WebGL · GLSL · Web Audio API · 捲動驅動動畫',
    role: 'AI協作開發',
    duration: '2026.10',
    highlight:
      '捲動驅動的火箭升空動畫：發射台 → 穿越大氣 → 衝出卡門線。 畫面與所有遙測數字都來自頁面載入時跑的一次兩級火箭飛行模擬(重力轉彎、指數大氣、Max-Q、熱分離); three.js 物件不放進 Vue 響應式系統,只把要顯示的數字抄給 HUD,每幀更新成本很低; 結尾可自由觀察 360° 旋轉,並藏有黑騎士衛星彩蛋。',
    tags: [
      'Vue 3',
      'Three.js 渲染技術',
      'GLSL Shader',
      '物理運動模擬',
      'Web Audio API',
    ],
    repo: 'https://github.com/fabio7621/ascent-launch',
    link: 'https://fabio7621.github.io/ascent-launch/',
    image: 'ascent.jpg',
  },
  {
    name: '冰箱貼任務板-動畫版本(AI-assisted development)',
    description:
      '原生 JavaScript(ES Modules)· Three.js / WebGL · Canvas 2D · 零建置(importmap + CDN)',
    role: 'AI協作開發',
    duration: '2026.09',
    highlight:
      '由冰箱上面會有的便簽紙來當作團隊中交付任務以及領取獎賞概唸所做出的動畫頁面demo',
    tags: [
      'JavaScript (ES6+)',
      'Three.js 渲染技術',
      '後製光暈 (Bloom)',
      'Canvas 2D 貼圖',
      'Web Audio API',
    ],

    repo: 'https://github.com/fabio7621/group-tesk',
    link: 'https://fabio7621.github.io/group-tesk/',
    image: 'taskdemo.jpg',
  },
  {
    name: '小遊艇港灣God did(AI-assisted development)',
    description:
      '原生 JavaScript(ES Modules)· Three.js / WebGL · Canvas 2D · 零建置(importmap + CDN)',
    role: 'AI協作開發',
    duration: '2026.08',
    highlight:
      '開著小遊艇在港灣航行的互動作品集 —— 靠上碼頭光圈自動停靠、上岸瀏覽履歷／作品／部落格／聯絡。 海面波高由單一純函式供給,海浪、船身浮沉與浮標共用同一組浪; 碰撞為不依賴 Three.js 的純幾何解算,碼頭與小島擋得住,船會靠上去而不是穿過去; 小地圖用 Canvas 2D 手繪,不額外開第二顆相機。',
    tags: ['JavaScript', 'Three.js 渲染技術', '物理運動模擬', 'Canvas 2D'],
    repo: 'https://github.com/fabio7621/harbor-portfolio',
    link: 'https://fabio7621.github.io/harbor-portfolio/',
    image: 'boat.jpg',
  },
  {
    name: 'F-16 OVER TAIPEI(AI-assisted development)',
    description:
      'HTML5 + CSS3 + Vanilla JavaScript(ES6+) — 單檔架構,零建置工具、零框架依賴',
    role: 'AI協作開發',
    duration: '',
    highlight:
      '點陣風格飛行模擬，使用飛行模擬物理結合協調轉彎:轉彎率 ω = g·tanφ / V,必須壓坡度(bank)才會轉彎,能量管理:爬升損失空速,升力分量:大坡度轉彎時垂直升力減少,會自然掉高度等等',
    tags: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Three.js 渲染技術'],
    repo: 'https://github.com/fabio7621/voxel-f16-taipei',
    link: 'https://fabio7621.github.io/voxel-f16-taipei/',
    image: 'jet.jpg',
  },
  {
    name: '浮水染工坊 · Suminagashi Lab(AI-assisted development)',
    description: 'Vue 3(組合式 API)· Vite · Pinia · WebGL2 / GLSL',
    role: 'AI協作開發',
    duration: '',
    highlight:
      'A4 水盤上的即時 GPU 流體墨流模擬 —— 滴墨、排水、梳針,蓋下朱印做成拓印帖。 以 WebGL2 在著色器中求解 Navier–Stokes(Stable Fluids)與 Marangoni 界面張力, 重現日本浮水染(墨流し / suminagashi)的同心圓與羽狀紋路',
    tags: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Three.js 渲染技術'],
    repo: 'https://github.com/fabio7621/suminagashi',
    link: 'https://fabio7621.github.io/suminagashi/',
    image: 'water.jpg',
  },
  {
    name: '擲筊God did(AI-assisted development)',
    description:
      'Vue 3(組合式 API)· Vite · Pinia · Three.js / WebGL · TypeScript',
    role: 'AI協作開發',
    duration: '',
    highlight:
      '長按抓起筊杯、向上甩出的 3D 擲筊 —— 聖筊、笑筊、陰筊、立筊即時判定,落定後顯示筊象與解說。 自寫剛體解算器以半隱式尤拉積分推進位置、四元數一階近似積分姿態, 取凸包最低點做地面穿透修正並分離法向與切向(庫倫摩擦)衝量, 對近乎側立的姿態施加傾倒力矩,讓立筊維持應有的罕見程度',
    tags: ['Vue 3', 'TypeScript', 'Three.js 渲染技術', '剛體物理模擬'],
    repo: 'https://fabio7621.github.io/goddid/',
    link: 'https://fabio7621.github.io/goddid/',
    image: 'goddid.jpg',
  },
];
