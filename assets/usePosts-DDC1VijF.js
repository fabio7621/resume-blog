const i=`---
title: "Vue 走過路過不要錯過 Day01 - Vue 是怎麼來的?框架又是什麼？"
subtitle: "Vue 是怎麼來的?框架又是什麼？"
day: 1
date: "2026-09-15"
excerpt: "很多人以為 Vue 是為了「取代」某個工具而出現的，但其實不太是這樣。 Vue的作者尤雨溪以前在Google Creative Lab工作，常常需要快速做出網頁原型。 那個時候他們使用的是Angular，喜歡上資料驅動畫面。但問題是 Ang…"
source: "https://ithelp.ithome.com.tw/articles/10410930"
series: "ithome-ironman-2026"
---

# Vue 是為了取代什麼誕生的？

![https://d1dwq032kyr03c.cloudfront.net/upload/images/20260915/20184288pi3MzGM8Hm.jpg](https://d1dwq032kyr03c.cloudfront.net/upload/images/20260915/20184288pi3MzGM8Hm.jpg)

很多人以為 Vue 是為了「取代」某個工具而出現的，但其實不太是這樣。

Vue的作者尤雨溪以前在Google Creative Lab工作，常常需要快速做出網頁原型。  
那個時候他們使用的是Angular，喜歡上資料驅動畫面。但問題是 Angular的門檻太高了，為了用這個功能，得先學一堆額外的概念和規則，舉個例子想用個資料綁定，就得先把 module、controller、依賴注入這些東西全部學起來

所以他就想：乾脆把 Angular裡最好用的那塊抽出來，自己做一個Lite輕量版吧！就這樣Vue在2014年就此誕生。

說它想取代什麼的話，比較像是取代手動操作DOM的寫法。以前資料變了，要自己記得去改畫面；有了 Vue，只要改資料，畫面就會自己更新。

## 框架跟函式庫差在哪？

![https://d1dwq032kyr03c.cloudfront.net/upload/images/20260915/20184288bllKzUmCIj.png](https://d1dwq032kyr03c.cloudfront.net/upload/images/20260915/20184288bllKzUmCIj.png)  
打開 Vue 官網，一進去就會看到超大的標題：The Progressive JavaScript Framework。這個 Framework 就是「框架」，那它跟函式庫（Library）又差在哪？

函式庫就像計算機，你想算的時候按它，它才幫你算，不按它就不會動。什麼時候用、用在哪裡，全部由你決定。

框架比較像學校的課表，上課時間、下課時間都已經排好了，你不用自己決定幾點要上課，只要負責每堂課要做什麼，鐘聲一響，就照課表進行。

像 Vue 的 onMounted，我們只是把函式丟進去，真正呼叫它的是 Vue，它會在元件掛載好的時候自己執行。  
框架其實沒有幫 JavaScript 加什麼新功能，原生 JS 做得到的它才做得到，但它讓開發變得輕鬆很多：

宣告式渲染：只要描述畫面長怎樣，不用一步步下指令改 DOM

-   響應式：資料變了，畫面自動更新，不怕漏改
-   元件化：把畫面拆成一塊塊積木，寫一次到處用
-   寫法統一：大家照同一套規則寫，接手別人的專案也比較快上手
-   官方生態系：Router、Pinia、Vite、Nuxt 都幫你準備好了

不過也要記得，這些「自動」的背後其實都是 JavaScript 在運作。JS 基礎越穩，Vue 就越好懂，這也是接下來這個系列會從 Proxy 這些基礎開始聊的原因。
`,u=`---
title: "Vue 走過路過不要錯過 Day02 - Vue 可以只是一個 script 標籤：從 CDN 到 Vite，看懂 .vue 檔背後的轉換"
subtitle: "Vue 可以只是一個 script 標籤：從 CDN 到 Vite，看懂 .vue 檔背後的轉換"
day: 2
date: "2026-09-16"
excerpt: "昨天聊到Vue他是一個Framework它可以小到像JQuery一樣在HTML裡面就能跑，但使用上更方便，大也可以撐起整個正式專案的重責大任。 備註：不過兩者雖然用起來一樣輕巧，思考方式卻很不同：jQuery 是由你親手去改畫面，Vue 則…"
source: "https://ithelp.ithome.com.tw/articles/10411646"
series: "ithome-ironman-2026"
---

## 前言

昨天聊到Vue他是一個Framework它可以小到像JQuery一樣在HTML裡面就能跑，但使用上更方便，大也可以撐起整個正式專案的重責大任。

> 備註：不過兩者雖然用起來一樣輕巧，思考方式卻很不同：jQuery 是由你親手去改畫面，Vue 則是你改資料，畫面自己跟著變

講起來好像有點八股很常見到，但實際上差異在哪？讓我們今天用一個簡單的計數器從最小的那一端開始在慢慢引領個到目前業界最常用到的Vite專案，最後在偷看一下\`.vue\`檔案在背後被轉換成什麼。

## 最小的 Vue：一個 HTML 檔就能跑

不用安裝任何東西，開一個 \`index.html\`，貼上這段：

\`\`\`html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <title>CDN 版計數器</title>
</head>
<body>
  <div id="app">
    <button @click="count++">點了 {{ count }} 次</button>
  </div>
 
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>
  <script>
    const { createApp, ref } = Vue
 
    createApp({
      setup() {
        const count = ref(0)
        return { count }
      }
    }).mount('#app')
  <\/script>
</body>
</html>
\`\`\`

直接用瀏覽器打開，按鈕就會動了。這段程式碼做了三件事：

1.  透過 CDN 載入 Vue，它會在全域掛上一個 \`Vue\` 物件，我們從裡面取出 \`createApp\` 和 \`ref\`。
2.  在 \`setup()\` 裡用 \`ref(0)\` 建立一個會變動的資料 \`count\`，並且把它 **\`return\` 出去**，模板才看得到它。
3.  \`mount('#app')\` 讓 Vue 接管 \`#app\` 這個區塊，裡面的 \`{{ count }}\` 和 \`@click\` 才會生效。  
    這裡先記住第 2 點「要自己 \`return\`」，文章最後會再回來看它。

至於為什麼模板裡寫 \`count\` 就好，JS 裡卻要用 \`ref()\` 包起來，這牽涉到 Vue 的響應式機制，後面幾天會從 Proxy 開始慢慢拆解。

## 頁面變大之後，問題就出現了

CDN 版很方便，但需求一多就會開始卡。假設我們想把按鈕抽成一個可以重複使用的組件：

\`\`\`html
<div id="app">
  <counter-button label="蘋果"></counter-button>
  <counter-button label="香蕉"></counter-button>
</div>
 
<script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>
<script>
  const { createApp, ref } = Vue
 
  const CounterButton = {
    props: ['label'],
    setup() {
      const count = ref(0)
      return { count }
    },
    template: \`
      <button @click="count++">{{ label }}：{{ count }}</button>
    \`
  }
 
  createApp({})
    .component('CounterButton', CounterButton)
    .mount('#app')
<\/script>
\`\`\`

還能跑，但可以想像當組件變成十個、二十個的時候：

-   **模板寫在字串裡**：編輯器沒有語法提示，打錯標籤也不容易發現。
-   **所有東西擠在同一個檔案**：沒辦法很自然地「一個組件一個檔案」。
-   **樣式和組件分開**：CSS 還是得寫在別的地方，組件改名或刪除時容易留下沒用到的樣式。
-   **每個 \`setup()\` 都要手動 \`return\`**：變數一多，漏寫一個就會在模板裡找不到。
-   **直接寫在 HTML 裡的模板有限制**：瀏覽器會先解析 HTML，所以組件名稱只能用 \`counter-button\` 這種小寫連字號，也不能寫自閉合標籤。  
    這些問題不是 Vue 本身的缺點，而是「沒有建置工具幫忙」時必然會遇到的狀況。所以接下來，換個方式寫同一個東西。

## 換成 Vite：同一個計數器

打開終端機，用官方的 \`create-vue\` 建立專案：

\`\`\`bash
npm create vue@latest
\`\`\`

過程中會問專案名稱和要不要加入 TypeScript、Router、Pinia 等功能，今天先全部不選，保持最乾淨的狀態。建好之後：

\`\`\`bash
cd my-vue-app
npm install
npm run dev
\`\`\`

終端機會顯示一個本機網址，打開就能看到預設畫面。

### 只看三個檔案就好

專案資料夾裡檔案不少，但今天只需要認識三個：

\`\`\`
my-vue-app/
├─ index.html
└─ src/
   ├─ main.js
   └─ App.vue
\`\`\`

**\`index.html\`**：整個應用程式的入口。打開會發現裡面很空，只有一個 \`<div id="app"></div>\` 和一行 \`<script type="module" src="/src/main.js">\`。

**\`src/main.js\`**：

\`\`\`js
import { createApp } from 'vue'
import App from './App.vue'
 
createApp(App).mount('#app')
\`\`\`

有沒有覺得眼熟？這和 CDN 版做的是**同一件事**：建立 app、掛載到 \`#app\`。差別只在 \`Vue\` 從全域變數變成了 \`import\`，組件設定從寫在原地變成從 \`App.vue\` 引入。

**\`src/App.vue\`**：把預設內容清空，換成我們的計數器：

\`\`\`vue
<script setup>
import { ref } from 'vue'
 
const count = ref(0)
<\/script>
 
<template>
  <button @click="count++">點了 {{ count }} 次</button>
</template>
 
<style scoped>
button {
  padding: 8px 16px;
  font-size: 16px;
}
</style>
\`\`\`

這就是 SFC（Single-File Component，單檔組件）：一個 \`.vue\` 檔裡，邏輯、模板、樣式各自放在 \`<script>\`、\`<template>\`、\`<style>\` 區塊。加上 \`scoped\` 之後，樣式只會作用在這個組件上，不會影響到別人。

仔細看 \`<script setup>\` 的部分：**沒有 \`setup()\` 函式，也沒有 \`return\`**。宣告完 \`count\`，模板就直接能用了。

## 兩個版本放在一起比

| 比較項目 | CDN 版 | Vite + SFC 版 |
| --- | --- | --- |
| 需要安裝 | 不用，引入 script 即可 | 需要 Node.js 和建置工具 |
| 模板寫在哪 | HTML 裡或 JS 字串裡 | \`.vue\` 檔的 \`<template>\` |
| 變數給模板用 | 在 \`setup()\` 裡手動 \`return\` | \`<script setup>\` 宣告即可 |
| 組件拆檔 | 不方便 | 一個組件一個檔案 |
| 樣式管理 | 另外寫 CSS | \`<style scoped>\` 跟著組件走 |
| 編輯器支援 | 模板字串沒有語法提示 | 完整的語法提示與檢查 |
| 適合情境 | 既有頁面局部加互動 | 從零開始的完整應用程式 |

兩種都是 Vue，沒有誰比較「正統」，而是看需求選擇。這也是「漸進式框架」真正的意思：你可以依照專案規模，決定要用到 Vue 的多少。

## 那 \`.vue\` 檔最後變成了什麼？

到這裡可能會有個疑問：瀏覽器根本不認識 \`.vue\` 這種檔案，它是怎麼跑起來的？

答案是：Vite 在背後透過 Vue 的編譯器，把 \`.vue\` 檔轉換成瀏覽器看得懂的 JavaScript。我們可以用官方的 [Vue SFC Playground](https://play.vuejs.org/) 親眼看看。

把剛剛的 \`App.vue\` 貼進 Playground 左側，切到右上方的「JS」分頁，就能看到編譯結果。實際輸出會因為版本和模式有些差異，這邊只挑重點、簡化後長這樣：

\`\`\`js
import { ref } from 'vue'
 
const __sfc__ = {
  setup() {
    const count = ref(0)
    return { count }   // ← 編譯器幫你補上的 return
  }
}
 
function render(_ctx, _cache, $props, $setup) {
  return _createElementBlock('button', {
    onClick: () => $setup.count++
  }, '點了 ' + _toDisplayString($setup.count) + ' 次')
}
\`\`\`

這裡只需要看懂兩件事：

**第一，\`return\` 回來了。** 還記得 CDN 版一定要自己寫 \`return { count }\` 嗎？\`<script setup>\` 並不是不需要 \`return\`，而是編譯器自動幫你補上了。

**第二，\`<template>\` 變成了一個 \`render\` 函式。** 我們寫的 HTML 模板，最後會被轉成一段 JavaScript 函式，負責產生畫面。所以模板不是被瀏覽器「直接讀取」，而是先被翻譯成程式碼。

至於 \`render\` 函式裡那些 \`_createElementBlock\` 做了什麼，今天先點到為止，知道「模板會被編譯成函式」就夠了。

## 明天見

今天從一個 script 標籤出發，看到 Vite 和 SFC 幫我們解決了哪些問題，也知道 \`<script setup>\` 省下的 \`return\` 其實是編譯器代勞的。

但還有一件事沒解釋：按下按鈕、\`count++\` 之後，畫面就自動更新了。**Vue 是怎麼知道資料變了？**

明天就從 Vue 3 響應式系統的底層，JavaScript 的 \`Proxy\` 開始說起。
`,c=`---
title: "Vue 走過路過不要錯過 Day03 -為什麼改資料畫面就會動？從 JS 的 Proxy 說起"
subtitle: "為什麼改資料畫面就會動？從 JS 的 Proxy 說起"
day: 3
date: "2026-09-17"
excerpt: "寫 Vue 的時候，我們很習慣這樣做： 改完資料，畫面上的數字就跟著變了。我們沒有呼叫任何「更新畫面」的函式，Vue 卻知道資料被改了。 它到底是怎麼知道的？ 這個問題的答案，其實不在 Vue 裡，而在 JavaScript 本身。今天先把…"
source: "https://ithelp.ithome.com.tw/articles/10412683"
series: "ithome-ironman-2026"
---

寫 Vue 的時候，我們很習慣這樣做：

\`\`\`js
state.count++
\`\`\`

改完資料，畫面上的數字就跟著變了。我們沒有呼叫任何「更新畫面」的函式，Vue 卻知道資料被改了。

它到底是怎麼知道的？

這個問題的答案，其實不在 Vue 裡，而在 JavaScript 本身。今天先把 Vue 放一邊，來認識 Vue 3 響應式系統的地基：**Proxy**。

---

## 先想一個問題：怎麼「偷聽」一個物件？

假設有一個普通物件：

\`\`\`js
const user = { name: '小明', age: 18 }
\`\`\`

需求是這樣的：**每次有人讀取或修改 \`user\` 的屬性，就要印出一行 log。**

條件是不能要求大家改寫成 \`user.getName()\` 這種函式呼叫，就是要照常寫 \`user.name\`。

你會怎麼做？可以先停下來想一下。

### 以前的做法：Object.defineProperty

在 Proxy 出現之前，比較常見的做法是用 \`Object.defineProperty\`，替屬性裝上 getter 和 setter：

\`\`\`js
const user = { name: '小明', age: 18 }
let _name = user.name

Object.defineProperty(user, 'name', {
  get() {
    console.log('讀取 name')
    return _name
  },
  set(value) {
    console.log('修改 name')
    _name = value
  }
})

user.name          // 讀取 name
user.name = '小華' // 修改 name
\`\`\`

能用，但仔細想想會發現幾個麻煩：

1.  **要一個屬性一個屬性包。** \`age\` 也要監聽的話，就要再寫一次。
2.  **之後新增的屬性聽不到。** \`user.hobby = '畫畫'\` 完全不會觸發，因為當初沒有包到它。
3.  **有些操作根本攔不到。** 像是 \`delete user.name\`、\`'name' in user\`。

問題的根源在於：這個做法是「改造物件上的每個屬性」。

那如果換個思路，**不去改物件，而是在整個物件前面放一個守門人**呢？

這就是 Proxy。

---

## Proxy 的基本語法

\`\`\`js
const proxy = new Proxy(target, handler)
\`\`\`

只需要兩樣東西：

| 名詞 | 意思 |
| --- | --- |
| \`target\` | 原本的物件，真正存放資料的地方 |
| \`handler\` | 一個物件，裡面放各種攔截規則 |
| trap | handler 裡的每個方法，例如 \`get\`、\`set\`，名稱是固定的 |

可以把它想成：\`target\` 是倉庫，\`proxy\` 是站在倉庫門口的守門人，\`handler\` 是守門人手上的規則手冊。

先看一個什麼規則都沒有的例子：

\`\`\`js
const user = { name: '小明' }
const p = new Proxy(user, {})

p.name = '小華'
console.log(user.name) // '小華'
\`\`\`

handler 是空的時候，所有操作都會直接轉交給 target，就像守門人什麼都不管，全部放行。

這裡有一個很重要的觀念：**要透過 proxy 操作，才會被攔截。** 如果你直接改 \`user\`，等於從後門進倉庫，守門人完全不知道。

---

## get：讀取的時候攔下來

一般物件讀取不存在的屬性，會默默拿到 \`undefined\`。打錯字的時候很難發現：

\`\`\`js
user.nmae // undefined，不會報錯
\`\`\`

如果我們想在讀到不存在的屬性時給個提示，可以用 \`get\` trap：

\`\`\`js
const user = { name: '小明', age: 18 }

const p = new Proxy(user, {
  get(target, key) {
    if (key in target) {
      return target[key]
    }
    return \`沒有「\${String(key)}」這個屬性\`
  }
})

p.name  // '小明'
p.nmae  // '沒有「nmae」這個屬性'
\`\`\`

每次透過 \`p\` 讀屬性，JS 都會呼叫 \`get\`，並把「原物件」和「屬性名稱」傳進來。回傳什麼，讀取的人就拿到什麼。

有一個小細節值得記住：**key 永遠是字串或 Symbol。** 就算你寫 \`p[0]\`，trap 收到的 key 也是字串 \`'0'\`。

---

## set：寫入之前先檢查

接著來做資料驗證。規則是：\`age\` 必須是 0 到 150 的整數。

\`\`\`js
const p = new Proxy(user, {
  set(target, key, value) {
    if (key === 'age') {
      if (!Number.isInteger(value) || value < 0 || value > 150) {
        throw new TypeError('age 要是 0~150 的整數')
      }
    }
    target[key] = value
    return true
  }
})

p.age = 20   // 成功
p.age = -5   // TypeError: age 要是 0~150 的整數
p.age = 18.5 // TypeError: age 要是 0~150 的整數
\`\`\`

有兩行很容易漏掉：

-   \`target[key] = value\`：驗證通過後，要**自己把值存進去**。忘了寫，資料就不會被寫入。
-   \`return true\`：告訴 JS 寫入成功。在嚴格模式下（ES module 和 class 裡預設就是），\`set\` 回傳 falsy 值會直接丟出 TypeError。

### 參數名稱為什麼每篇教學都不一樣？

看其他資料時，你可能會發現有人寫 \`get(target, key)\`，有人寫 \`get(target, prop)\`，MDN 則寫 \`get(target, property, receiver)\`。

其實**參數名稱是自己取的，JS 只看順序**：

| trap | 第 1 個 | 第 2 個 | 第 3 個 | 第 4 個 |
| --- | --- | --- | --- | --- |
| \`get\` | 原物件 | 屬性名稱 | receiver | — |
| \`set\` | 原物件 | 屬性名稱 | 要寫入的值 | receiver |

大家常用 \`key\`、\`value\`，只是因為物件本來就是 key: value 的結構，讀起來比較直覺。

那麼第三、第四個參數的 \`receiver\` 是什麼？這就要談到 Proxy 的好搭檔。

---

## Reflect：為什麼不直接寫 target\\[key\\]？

先看一個有 getter 的物件：

\`\`\`js
const parent = {
  first: '爸爸',
  get title() {
    return this.first + '的物件'
  }
}
\`\`\`

現在把它包成 Proxy，並讓另一個物件 \`child\` 繼承這個 Proxy：

\`\`\`js
const p = new Proxy(parent, {
  get(target, key) {
    return target[key]
  }
})

const child = Object.create(p)
child.first = '小孩'

child.title // ?
\`\`\`

\`child.title\` 會是什麼？

答案是 \`'爸爸的物件'\`。

因為 \`target[key]\` 是直接對 \`target\`（也就是 parent）讀取，getter 裡的 \`this\` 就被固定成 parent，而不是真正發起讀取的 child。

這時候就輪到 \`receiver\` 上場，它代表「真正發起這次操作的物件」。搭配 \`Reflect.get\`，就能把正確的 \`this\` 傳下去：

\`\`\`js
const p = new Proxy(parent, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  }
})

const child = Object.create(p)
child.first = '小孩'

child.title // '小孩的物件'
\`\`\`

\`Reflect\` 是 JS 內建的物件，**每個 trap 都有一個同名的 Reflect 方法，參數也一模一樣**。它們做的事情就是「這個操作原本的預設行為」。

所以前面的 \`set\` 可以改寫得更乾淨：

\`\`\`js
set(target, key, value, receiver) {
  if (key === 'age' && (!Number.isInteger(value) || value < 0 || value > 150)) {
    throw new TypeError('age 要是 0~150 的整數')
  }
  return Reflect.set(target, key, value, receiver)
}
\`\`\`

\`Reflect.set\` 會幫你存值，也會回傳正確的 true 或 false，一行解決前面容易漏掉的兩件事。

寫 Proxy 的好習慣：**只攔你在意的部分，其他原封不動交給 Reflect。**

---

## 不只 get 和 set

前面提到 \`Object.defineProperty\` 攔不到 \`delete\` 和 \`in\`，Proxy 則都有對應的 trap：

| trap | 被什麼觸發 |
| --- | --- |
| \`get\` | \`obj.x\`、\`obj[x]\` |
| \`set\` | \`obj.x = 1\` |
| \`has\` | \`'x' in obj\` |
| \`deleteProperty\` | \`delete obj.x\` |
| \`ownKeys\` | \`Object.keys(obj)\`、\`for...in\` |
| \`apply\` | target 是函式時，呼叫 \`fn()\` |

而且因為守門人管的是整個物件，**之後才新增的屬性一樣會被攔截**。前面 defineProperty 的三個麻煩，Proxy 全部解決了。

---

## 回到 Vue：自己做一個迷你響應式

終於可以回答開頭的問題了。

「改資料，畫面就更新」拆開來，其實是兩件事：

1.  **讀取的時候**，記下「誰用到了這個資料」
2.  **修改的時候**，通知「用到這個資料的人」重新執行

讀取和修改，剛好就是 \`get\` 和 \`set\` 能攔到的時機。我們來寫一個非常簡化的版本：

\`\`\`js
let activeEffect = null
const deps = new Map()

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 1. 讀取時：記下是誰在用這個 key
      if (activeEffect) {
        if (!deps.has(key)) deps.set(key, new Set())
        deps.get(key).add(activeEffect)
      }
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      // 2. 修改時：通知用到這個 key 的函式重新執行
      deps.get(key)?.forEach(fn => fn())
      return result
    }
  })
}

function effect(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}
\`\`\`

實際用用看：

\`\`\`html
<p id="count"></p>
<button id="btn">+1</button>
\`\`\`

\`\`\`js
const state = reactive({ count: 0 })

effect(() => {
  document.querySelector('#count').textContent = state.count
})

document.querySelector('#btn').addEventListener('click', () => {
  state.count++
})
\`\`\`

流程是這樣的：

1.  \`effect\` 先執行一次更新畫面的函式，函式裡讀了 \`state.count\`
2.  讀取觸發 \`get\`，把這個函式記在 \`count\` 底下
3.  按下按鈕，\`state.count++\` 觸發 \`set\`
4.  \`set\` 找出所有用到 \`count\` 的函式，重新執行，畫面就更新了

整個過程中，我們沒有手動呼叫任何更新畫面的程式，只是改了資料。

當然這個版本非常陽春，只能處理單一物件、沒有處理巢狀物件，也沒有批次更新。但 Vue 3 的 \`reactive()\` 核心概念就是這樣：**用 get 收集依賴，用 set 觸發更新。**

---

## 小結

-   \`Object.defineProperty\` 是改造單一屬性，Proxy 是在整個物件前面放守門人
-   \`new Proxy(target, handler)\`，handler 裡的 trap 決定要攔哪些操作
-   trap 的參數名稱可以自己取，JS 只看順序
-   trap 裡的預設行為交給同名的 \`Reflect\` 方法，並記得傳 \`receiver\`
-   Vue 3 的響應式，本質上就是「get 時記錄、set 時通知」

明天 Day 4 會正式進入 Vue：既然有了 \`reactive\`，為什麼 Vue 還需要 \`ref\`？

---
`,p=`---
title: "Vue 走過路過不要錯過 Day04 - 有了 reactive，為什麼還要 ref？從 .value 說起"
subtitle: "有了 reactive，為什麼還要 ref？從 .value 說起"
day: 4
date: "2026-09-18"
excerpt: "昨天我們自己做了一個迷你響應式，核心只有兩件事： get 的時候記錄是誰在用， set 的時候通知它們重新執行。 寫完之後， reactive 看起來已經很萬能了。那為什麼 Vue 還要多給我們一個 ref ，而且每次都要多寫一個 .val…"
source: "https://ithelp.ithome.com.tw/articles/10413220"
series: "ithome-ironman-2026"
---

昨天我們自己做了一個迷你響應式，核心只有兩件事：\`get\` 的時候記錄是誰在用，\`set\` 的時候通知它們重新執行。

寫完之後，\`reactive\` 看起來已經很萬能了。那為什麼 Vue 還要多給我們一個 \`ref\`，而且每次都要多寫一個 \`.value\`？

第一次寫 Vue 3 的人幾乎都問過這句：「不能全部用 reactive 就好嗎？」

今天就來回答這個問題。而且跟昨天一樣，答案不在 Vue 裡，在 JavaScript 本身。

---

## 先試試看：reactive 可以包數字嗎

直接把昨天的 \`reactive\` 拿來包一個數字：

\`\`\`js
const count = reactive(0)
\`\`\`

先想一下會發生什麼事。

昨天的 \`reactive\` 實作是這樣：

\`\`\`js
function reactive(obj) {
  return new Proxy(obj, { /* ... */ })
}
\`\`\`

所以這行其實等於 \`new Proxy(0, handler)\`。丟進瀏覽器跑跑看：

\`\`\`js
new Proxy(0, {})
// TypeError: Cannot create proxy with a non-object as target
\`\`\`

直接報錯。

**Proxy 的 target 必須是物件或函式**，原始型別（number、string、boolean、null、undefined）一律不行。這是 JavaScript 規格層級的規定，不是 Vue 擋你。

那 Vue 真正的 \`reactive()\` 呢？它不會報錯，但也沒有幫你做什麼：

\`\`\`js
import { reactive } from 'vue'

const count = reactive(0)
// [Vue warn] value cannot be made reactive: 0
console.log(count) // 0，原封不動還給你
\`\`\`

Vue 在開發模式下印一行警告，然後把原本的值還給你。所以 \`reactive(0)\` 不是「不建議」，是**根本做不到**。

---

## 就算 Proxy 能包數字，還是攔不到

到這裡你可能會想：那是 Proxy 的問題，如果哪天 JS 讓 Proxy 能包數字，不就解決了嗎？

我們退一步假設它可以好了。來看這段：

\`\`\`js
let count = reactive(0)
count++
\`\`\`

\`count++\` 本質上是 \`count = count + 1\`。

問題來了：**這行改的是「count 這個變數指向誰」，不是某個物件的屬性。**

昨天我們能攔截，是因為 \`state.count++\` 動到的是 \`state\` 這個物件的 \`count\` 屬性，Proxy 的守門人站在 \`state\` 前面，看得到這個動作。

但 \`count = 1\` 這種變數賦值，JavaScript 沒有提供任何插手的機制。沒有 trap，沒有 hook，沒有事件。你無法知道一個變數被重新指向了別的值。

這才是真正的核心限制：

> Vue 的攔截能力，完全建立在「物件的屬性存取」這件事上。沒有屬性，就沒有 get 和 set 可以攔。

---

## 換個思路：那就自己生一個屬性出來

既然只有屬性攔得到，而我們手上是一個數字，那解法其實只剩一條路：

**把值塞進一個物件的屬性裡。**

\`\`\`js
const count = { value: 0 }
count.value = 1  // 這下有屬性可以攔了
\`\`\`

就這樣。\`ref\` 的整個設計動機就是這一行。

\`.value\` 不是 Vue 想讓你多打幾個字，而是**把「變數賦值」硬是改寫成「屬性賦值」的唯一辦法**。

---

## 自己寫一個 myRef

有了方向，接著就能實作。這裡直接沿用昨天的 \`activeEffect\` 和 \`effect\`：

\`\`\`js
let activeEffect = null

function effect(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}
\`\`\`

然後寫 \`myRef\`：

\`\`\`js
function myRef(initialValue) {
  let _value = initialValue
  const dep = new Set()   // 記錄誰用到這個值

  return {
    get value() {
      if (activeEffect) {
        dep.add(activeEffect)        // 讀取時：收集
      }
      return _value
    },
    set value(newValue) {
      if (newValue === _value) return // 值沒變就不用通知
      _value = newValue
      dep.forEach(fn => fn())         // 修改時：通知
    }
  }
}
\`\`\`

跟昨天的 \`reactive\` 比對一下會很清楚：

|  | reactive | ref |
| --- | --- | --- |
| 攔截方式 | Proxy 的 get / set trap | 物件的 getter / setter |
| 攔截範圍 | 整個物件的所有屬性 | 只有 \`.value\` 一個屬性 |
| 依賴存在哪 | 一個 key 一個 Set | 只有一個 Set |

因為只需要顧一個 \`.value\`，用 getter / setter 就夠了，不必開一個 Proxy。

實際用用看：

\`\`\`html
<p id="count"></p>
<button id="btn">+1</button>
\`\`\`

\`\`\`js
const count = myRef(0)

effect(() => {
  document.querySelector('#count').textContent = count.value
})

document.querySelector('#btn').addEventListener('click', () => {
  count.value++
})
\`\`\`

流程跟昨天一模一樣：

1.  \`effect\` 執行更新畫面的函式，函式裡讀了 \`count.value\`
2.  讀取觸發 getter，把這個函式記進 \`dep\`
3.  按下按鈕，\`count.value++\` 觸發 setter
4.  setter 通知 \`dep\` 裡的函式重新執行，畫面更新

---

## 三個容易誤會的地方

### 一、ref 不是 Proxy

很多教學會說「ref 和 reactive 都是用 Proxy 實作的」，這不太精確。

Vue 原始碼裡的 ref 是一個叫 \`RefImpl\` 的 class，本質上就是我們上面寫的那種帶 getter / setter 的物件。因為只要追蹤一個 \`.value\`，開一個完整的 Proxy 反而更重。

### 二、ref 也能裝物件

\`ref\` 不是只能包原始型別。當你傳一個物件進去時，Vue 內部會用 \`reactive()\` 把它轉成 Proxy，再存進 \`.value\`：

\`\`\`js
const user = ref({ name: '小明' })

user.value.name = '小華'        // 有響應式，因為 .value 裡面是 reactive
user.value = { name: '小美' }   // 整包換掉也有響應式
\`\`\`

注意第二行。這是 \`reactive\` 做不到的事：

\`\`\`js
let state = reactive({ name: '小明' })
state = { name: '小美' }  // 響應式斷了，畫面不會更新
\`\`\`

因為 \`state = ...\` 又回到了「變數賦值」，守門人管不到。而 \`ref\` 因為外面包了一層 \`.value\`，換掉內容物是屬性賦值，攔得到。

這就是為什麼官方建議**預設就用 ref**：原始型別、物件、整包替換它都能處理，reactive 則只能處理物件，而且不能整包換。

### 三、模板裡為什麼不用寫 .value

\`\`\`vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
<\/script>

<template>
  <p>{{ count }}</p>
</template>
\`\`\`

因為 \`<script setup>\` 頂層的 ref 在編譯時會自動解包。

但**只有頂層會**。這個坑很常踩：

\`\`\`js
const obj = { count: ref(0) }
\`\`\`

\`\`\`vue
<template>
  {{ obj.count }}        <!-- 印出一個 ref 物件 -->
  {{ obj.count.value }}  <!-- 這才是 0 -->
</template>
\`\`\`

\`obj\` 是普通物件，Vue 的自動解包不會往裡面鑽。

---

## 這不是只有你覺得困惑

如果你覺得「兩個 API 做類似的事，很難選」，這不是你的錯覺。

2021 年，尤雨溪提出了一個叫 **Reactivity Transform** 的實驗性提案（RFC #369），想用編譯期語法糖讓你這樣寫：

\`\`\`js
let count = $ref(0)
count++              // 編譯成 count.value++
\`\`\`

他在提案的動機裡直接寫道：自從 Composition API 推出以來，ref 與 reactive 該怎麼選一直是主要的未解問題之一；到處寫 \`.value\` 很繁瑣，在沒有型別系統輔助時又容易漏掉，所以有些使用者乾脆只用 \`reactive()\` 來迴避 ref。

同一份文件裡，他也解釋了 \`.value\` 為什麼非存在不可：原本的寫法不需要任何編譯就能運作，但受限於 JavaScript 的運作方式，必須透過 \`.value\` 這個屬性，Vue 才能攔截它的 get / set，藉此進行依賴追蹤與觸發更新。

跟我們今天從 \`new Proxy(0, {})\` 一路推下來的結論，完全是同一件事。

---

## 但這個提案最後被放棄了

2023 年 2 月，尤雨溪宣布團隊有共識放棄這個語法糖。理由裡有一條特別值得想一下：

**拿掉 \`.value\` 之後，反而更難看出哪些東西正在被追蹤、哪一行會觸發更新。** 在小組件裡不明顯，但在大型專案裡心智負擔會被放大。

其他理由還包括：有人只敢在 SFC 裡用、SFC 外不用，造成兩套心智模型；外部函式仍然需要真正的 ref 物件，轉換無可避免，反而讓初學者更困惑；以及讓變數賦值就能觸發副作用，扭曲了 JavaScript 原本的語義。

所以結論有點反直覺：

> \`.value\` 看起來是缺點，但它同時是一個「這行會觸發更新」的視覺標記。

你每次寫 \`.value\` 的時候，其實是在跟未來的自己說：這裡碰到的是響應式資料。

---

## 小結

-   \`reactive\` 靠 Proxy，而 Proxy 不能包原始型別，所以 \`reactive(0)\` 做不到
-   就算能包也沒用，因為 JS 攔不到「變數賦值」，只攔得到「屬性存取」
-   \`ref\` 的解法就是造一個 \`{ value }\` 物件，把變數賦值轉成屬性賦值
-   \`ref\` 內部是 getter / setter，不是 Proxy；傳物件進去時才用 \`reactive\` 包內容物
-   \`ref\` 可以整包替換，\`reactive\` 不行，這是預設選 ref 的主因
-   \`<script setup>\` 頂層的 ref 在模板會自動解包，巢狀的不會
-   官方試過拿掉 \`.value\`，最後發現它其實是個有用的標記

昨天的 mini reactive 還留了一個洞：它只能處理單層物件，巢狀物件完全沒管。明天 Day 5 就來補這個洞，順便談 \`reactive\` 最常見的陷阱——為什麼解構出來的變數就失去響應式了，以及 \`toRefs\` 到底在做什麼。

---
`,d=`---
title: "Vue 走過路過不要錯過 Day05 - 解構為什麼讓 reactive 失效？toRefs 到底在做什麼"
subtitle: "解構為什麼讓 reactive 失效？toRefs 到底在做什麼"
day: 5
date: "2026-09-19"
excerpt: "昨天我們談了 ref 存在的理由： reactive 只能包物件，而且不能整包替換， ref 用一個 .value 補上了這兩個洞。 但 reactive 還有一個更常踩到的坑，幾乎每個 Vue 3 新手都掉進去過： 看起來只是在偷懶少打幾…"
source: "https://ithelp.ithome.com.tw/articles/10413838"
series: "ithome-ironman-2026"
---

昨天我們談了 \`ref\` 存在的理由：\`reactive\` 只能包物件，而且不能整包替換，\`ref\` 用一個 \`.value\` 補上了這兩個洞。

但 \`reactive\` 還有一個更常踩到的坑，幾乎每個 Vue 3 新手都掉進去過：

\`\`\`js
const state = reactive({ count: 0 })
const { count } = state
\`\`\`

看起來只是在偷懶少打幾個字，結果畫面再也不會更新了。

今天就來拆這件事。跟前幾天一樣，答案不在 Vue 裡，在 JavaScript 本身。

---

## 先講結論

> **reactive 的響應式，綁在「Proxy 物件的屬性存取」上。值一旦被取出來、離開這個物件，就斷線了。**  
> **\`toRefs\` 做的事，是讓取出來的東西「每次讀寫都回頭問原物件」。**

支撐這個結論的有三個論點：

1.  **為什麼會斷線**：Proxy 只追蹤屬性存取，而解構是把值複製出來
2.  **toRefs 怎麼補**：讓 ref 的 getter / setter 轉發回原物件
3.  **哪裡還會踩到**：不只解構，還有幾種情況一樣會斷，以及該怎麼避開

---

## 先想三個問題

\`\`\`js
const state = reactive({ count: 0 })
const { count } = state
\`\`\`

1.  這行解構，用一般 JS 改寫等於什麼？
2.  執行的那一刻，\`count\` 拿到的是什麼？是「數字 0」，還是「某個能連回 state 的東西」？
3.  之後 \`state.count++\`，這個 \`count\` 變數會跟著變嗎？

想一下再往下看。

第 1 題：\`const { count } = state\` 等於 \`const count = state.count\`。

第 2 題：\`state.count\` 是原始型別的數字，JS 對原始型別是「複製值」，所以 \`count\` 只是一個獨立的 \`0\`，跟 \`state\` 已經沒有關係。

第 3 題：不會。這跟 Day 4 是同一個結論：**JS 攔不到變數賦值，也沒有機制讓一個變數自己去追蹤它的來源。**

---

## 論點一：為什麼會斷線

### 用迷你版 reactive 驗證

沿用前幾天的概念，精簡成可以直接貼進 console 的版本：

\`\`\`js
let activeEffect = null

function effect(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}

function reactive(obj) {
  const deps = {}                       // 一個 key 一個 Set
  return new Proxy(obj, {
    get(target, key) {
      if (activeEffect) (deps[key] ??= new Set()).add(activeEffect)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      deps[key]?.forEach(fn => fn())
      return true
    }
  })
}
\`\`\`

先看解構的情況：

\`\`\`js
const state = reactive({ count: 0 })
const { count } = state

effect(() => console.log(count))  // 印 0
state.count++                     // 沒有任何輸出
\`\`\`

再看正確的讀法：

\`\`\`js
effect(() => console.log(state.count))  // 印 0
state.count++                           // 印 1
\`\`\`

差別只有一個：effect 裡面讀的是 \`state.count\`（經過 Proxy）還是 \`count\`（普通變數）。

### 斷線的兩層原因

1.  **解構時的讀取不在 effect 裡面**：\`const { count } = state\` 雖然也會觸發 Proxy 的 get，但當下 \`activeEffect\` 是 \`null\`，沒有人被收集。
2.  **拿到的是複製的值**：\`count\` 就是一個普通的數字 \`0\`。之後 effect 讀它，根本不會經過 Proxy。

> Vue 的追蹤能力，完全建立在「透過 Proxy 讀取屬性」這件事上。值一旦離開 Proxy，Vue 就看不到了。

---

## 論點二：toRefs 怎麼補

### 先想：能不能讓取出來的東西「一直連回原物件」？

Day 4 學過，\`ref\` 的本質是一個帶 getter / setter 的 \`{ value }\` 物件。

那如果這個 getter / setter **不自己存值，而是轉發到 \`state[key]\`**，會怎樣？

-   讀 \`.value\` 時，走的是 \`state[key]\`，會觸發 Proxy 的 get，被追蹤
-   寫 \`.value\` 時，走的是 \`state[key] = v\`，會觸發 Proxy 的 set，通知更新

換句話說，這個東西雖然被拿走了，但每次讀寫都會**回頭經過 Proxy**。

這就是 \`toRefs\` 在做的事。

### 自己寫一個 myToRefs

\`\`\`js
function myToRef(obj, key) {
  return {
    get value() { return obj[key] },
    set value(v) { obj[key] = v }
  }
}

function myToRefs(obj) {
  const result = {}
  for (const key in obj) {
    result[key] = myToRef(obj, key)
  }
  return result
}
\`\`\`

不到十行。驗證看看：

\`\`\`js
const state = reactive({ count: 0 })
const { count } = myToRefs(state)         // 解構出來的是 ref 物件，不是數字

effect(() => console.log(count.value))    // 印 0
state.count++                             // 印 1（從原物件改）
count.value++                             // 印 2（從 ref 改，一樣會回到 state）
\`\`\`

兩個方向都通。因為 \`count\` 手上拿的不是值，而是一個「代理人」，每次都去問 \`state\`。

### 真正的 Vue 用法

\`\`\`js
import { reactive, toRefs } from 'vue'

const state = reactive({ count: 0, name: '小明' })
const { count, name } = toRefs(state)

count.value++
console.log(state.count) // 1
\`\`\`

官方文件的說法也是這樣：\`toRefs\` 會把 reactive 物件轉成一組 ref，這些 ref 與原物件維持連線。代價是解構出來的東西要用 \`.value\`。

### 一個常見的錯誤寫法

\`\`\`js
const count = ref(state.count)
\`\`\`

這行看起來像「幫 \`state.count\` 做一個 ref」，其實只是把**當下的值**複製進一個全新的 ref，跟 \`state\` 沒有任何連線。斷線的原因跟解構完全一樣。

要「連回原物件」的 ref，用 \`toRef\`：

\`\`\`js
const count = toRef(state, 'count')
\`\`\`

---

## 論點三：哪裡還會踩到，怎麼避開

### 一、同樣會斷線的情況

原因都一樣：**值被複製出去，或引用被換掉。**

| 寫法 | 為什麼斷 |
| --- | --- |
| \`const { count } = state\` | 解構是複製值 |
| \`let n = state.count\` | 一樣是複製值 |
| \`foo(state.count)\` | 傳給函式的是複製的數字（傳整個 \`state\` 則不會斷） |
| \`ref(state.count)\` | 只是用當下的值做一個新 ref |
| \`state = { count: 1 }\` | 變數換了指向，新物件不是 Proxy |

### 二、toRefs 本身的限制

\`toRefs\` 只會處理**呼叫當下已經存在的屬性**。如果屬性是之後才出現的（例如可有可無的欄位），就用 \`toRef(state, 'key')\`，它可以處理還不存在的屬性。

### 三、根本的對策

1.  **預設用 ref**：一開始就一個個宣告成 ref，就不會有「解構會斷線」的問題。這也是社群偏好預設用 ref 的原因之一。
2.  **一定要用 reactive 時，在 composable 回傳 \`...toRefs(state)\`**：讓使用的人可以放心解構。
3.  **只想拿其中一個屬性時，用 \`toRef(state, 'key')\`**。

### 補充：defineProps 解構為什麼在 3.5 之後可以用

你可能看過這種寫法：

\`\`\`js
const { foo } = defineProps(['foo'])
\`\`\`

在 Vue 3.5 之前，這樣解構出來的變數同樣是斷線的。3.5 之後，Vue 讓它在 \`<script setup>\` 裡保持響應式，做法不是魔法，而是**編譯器直接幫你改寫**：讀取 \`foo\` 的地方，會被自動編譯成 \`props.foo\`。

這跟今天的主題是同一個道理：JS 攔不到變數，所以 Vue 選擇在編譯階段把「變數讀取」改寫成「屬性讀取」，讓它重新經過 Proxy。

但要注意，這也帶來一個限制：如果想把解構出來的 prop 交給 \`watch\` 或 composable，必須包成 getter，例如 \`watch(() => foo, ...)\`，直接寫 \`watch(foo, ...)\` 會在編譯階段報錯。

順帶一提，Day 4 提到的 Reactivity Transform（\`$ref\` 那套語法糖）就是想在更大範圍做同樣的事，最後因為種種理由被移除了。

---

## 小結

| 層級 | 一句話 |
| --- | --- |
| 結論 | 值離開 Proxy 物件就斷線；\`toRefs\` 讓取出來的東西「隨時回頭問原物件」 |
| 原因 | 只有 Proxy 的 get / set 有追蹤；解構是複製原始值，而且讀取時不在 effect 裡 |
| 解法 | ref 的 getter / setter 轉發到 \`state[key]\`，讀寫都會經過 Proxy |
| 邊界 | 解構、傳值、\`ref(state.x)\`、整包替換都會斷；預設用 ref 最省事 |

幾個重點：

-   解構等於 \`const count = state.count\`，是複製值，不是連結
-   \`toRefs\` 不是魔法，就是十行以內的 getter / setter 轉發
-   \`ref(state.count)\` 是複製，\`toRef(state, 'count')\` 才是連結
-   \`toRefs\` 只處理呼叫當下存在的屬性，之後才出現的屬性用 \`toRef\`
-   預設用 ref，可以直接避開大部分解構的坑

Day 4 結尾還留了一個洞：我們的迷你 reactive 只能處理單層物件，\`state.nested.count++\` 是不會觸發更新的。下一篇就來補這個洞。

---
`,m=`---
title: "Vue 走過路過不要錯過 Day06 - computed：不只是「快取」這麼簡單"
subtitle: "computed：不只是「快取」這麼簡單"
day: 6
date: "2026-09-20"
excerpt: "用 Vue 一陣子之後，大多數人對 computed 的印象是「會快取結果的函式」。這句話不算錯，但只講對了一半。computed 什麼時候重算、什麼時候不算、為什麼有時候明明資料變了畫面卻沒動，這些都要回到它的運作原理才講得清楚。 這篇會…"
source: "https://ithelp.ithome.com.tw/articles/10414399"
series: "ithome-ironman-2026"
---

用 Vue 一陣子之後，大多數人對 computed 的印象是「會快取結果的函式」。這句話不算錯，但只講對了一半。computed 什麼時候重算、什麼時候不算、為什麼有時候明明資料變了畫面卻沒動，這些都要回到它的運作原理才講得清楚。

這篇會從基本用法開始，接著整理它的幾個核心特性，簡單拆解原理，最後列出實務上容易踩到的坑。

---

## 一、基本用法

\`\`\`
<script setup>
import { ref, computed } from 'vue'

const price = ref(100)
const qty = ref(2)

const total = computed(() => price.value * qty.value)
<\/script>

<template>
  <p>總價：{{ total }}</p>
</template>
\`\`\`

幾個基本觀念：

-   \`computed()\` 接收一個 getter 函式，回傳一個**唯讀的 ref**。
-   在 \`<script>\` 中要用 \`total.value\` 取值；在 template 中會自動解包，直接寫 \`total\` 就好。
-   它的定位是**衍生資料**：從現有的狀態「算出」另一份資料，而不是另外存一份。

---

## 二、核心特性

### 特性 1：依據「響應式依賴」快取

先修正一個常見的說法：computed 並不是「函式結果的快取」，而是**依據它讀取到的響應式依賴來決定要不要重算**。

用 methods 對照最容易看出差別：

\`\`\`
<script setup>
import { ref, computed } from 'vue'

const count = ref(1)

const doubleComputed = computed(() => {
  console.log('computed 執行')
  return count.value * 2
})

function doubleMethod() {
  console.log('method 執行')
  return count.value * 2
}
<\/script>

<template>
  <p>{{ doubleComputed }} {{ doubleComputed }} {{ doubleComputed }}</p>
  <p>{{ doubleMethod() }} {{ doubleMethod() }} {{ doubleMethod() }}</p>
</template>
\`\`\`

打開 console 會看到：

-   \`computed 執行\` 只出現 **1 次**
-   \`method 執行\` 出現 **3 次**

只要 \`count\` 沒變，不論讀幾次 computed，都直接拿上次的結果。

這裡的關鍵字是**響應式**。非響應式的值就算改變，也不會觸發重算：

\`\`\`
const price = ref(100)
let tax = 1.05 // 普通變數

const total = computed(() => price.value * tax)

price.value = 200 // ✅ 重算：price 是 ref，Vue 追蹤得到
tax = 1.1         // ❌ 不重算：Vue 根本不知道 tax 變了
\`\`\`

### 特性 2：惰性求值（lazy）

computed 不會在依賴改變的當下馬上重算。它只做一件事：**把自己標記為「過期」**。等到下次有人讀取 \`.value\`，才真正執行 getter。

\`\`\`
const count = ref(1)
const double = computed(() => {
  console.log('計算中')
  return count.value * 2
})

count.value = 2
count.value = 3
count.value = 4
// 到這裡為止，一次「計算中」都沒印

console.log(double.value) // 這時候才印「計算中」，結果是 8
\`\`\`

連續改三次，只算一次。沒有人讀取的 computed，完全不會執行。

### 特性 3：依賴是「動態收集」的

computed 追蹤的是**上一次執行時實際讀到的**響應式資料，不是 getter 裡「寫到」的所有變數。

\`\`\`
const isLogin = ref(false)
const user = ref({ name: 'Fabio' })

const message = computed(() => {
  if (!isLogin.value) return '請先登入'
  return \`歡迎，\${user.value.name}\`
})
\`\`\`

當 \`isLogin\` 是 \`false\` 時，函式在第一個 \`return\` 就結束，根本沒讀到 \`user\`。所以這時候改 \`user.value.name\`，computed **不會**重算。

這是刻意的設計：當下用不到的資料，本來就沒必要追蹤。等 \`isLogin\` 變成 \`true\` 重新執行後，\`user\` 才會被收進依賴裡。除錯時如果遇到「明明改了卻沒反應」，可以先想想是不是這個原因。

### 特性 4：值沒變，就不通知下游（Vue 3.4+）

從 Vue 3.4 開始，computed 重算後如果**結果和上次相同**，就不會通知依賴它的 effect 更新。

\`\`\`
const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

watchEffect(() => console.log(isEven.value))

count.value = 2 // isEven 還是 true，watchEffect 不會再跑
\`\`\`

不過這個比較用的是 \`Object.is\`。如果每次都回傳**新的物件或陣列**，參考不同，就一律視為改變：

\`\`\`
// 每次都是新物件，下游每次都會更新
const info = computed(() => ({ isEven: count.value % 2 === 0 }))
\`\`\`

3.4 之後，getter 可以透過參數拿到舊值，自行決定要不要沿用：

\`\`\`js
const info = computed((oldValue) => {
  const next = { isEven: count.value % 2 === 0 }
  if (oldValue && oldValue.isEven === next.isEven) return oldValue
  return next
})
\`\`\`

---

## 三、可寫的 computed

computed 預設是唯讀的，直接賦值會在開發環境跳出警告。需要寫入時，要傳入 \`get\` / \`set\`：

\`\`\`
const firstName = ref('承哲')
const lastName = ref('陳')

const fullName = computed({
  get: () => \`\${lastName.value}\${firstName.value}\`,
  set: (val) => {
    lastName.value = val.slice(0, 1)
    firstName.value = val.slice(1)
  }
})

fullName.value = '王小明' // 觸發 set，改的是原始資料
\`\`\`

要注意，setter 的工作是**回頭修改原始資料**，而不是修改 computed 本身。computed 永遠是從原始資料算出來的。實務上可寫 computed 最常用在搭配 \`v-model\` 的元件封裝。

---

## 四、原理拆解：一個 dirty flag 撐起快取與惰性

前面介紹 Proxy 與 reactive 時提過兩個核心動作：讀取時**收集依賴（track）**，寫入時**觸發更新（trigger）**。computed 就是建立在這個機制上，再加一個「是否過期」的旗標。

下面是概念示意，**不是 Vue 原始碼**。實際實作從 3.4、3.5 以來改成版本號計數等更複雜的方式，但核心想法相同：

\`\`\`
function computed(getter) {
  let value
  let dirty = true // 是否過期，一開始當然是過期的

  // 用 effect 包住 getter，讓裡面讀到的響應式資料被收集成依賴
  const runner = effect(getter, {
    lazy: true, // 先不要執行
    scheduler() {
      // 依賴改變時不重算，只標記過期，並通知「用到我的人」
      if (!dirty) {
        dirty = true
        trigger(obj, 'value')
      }
    }
  })

  const obj = {
    get value() {
      if (dirty) {
        value = runner() // 過期才真的重算
        dirty = false
      }
      track(obj, 'value') // 讓外面讀取我的 effect 也能追蹤到我
      return value
    }
  }

  return obj
}
\`\`\`

對照前面的特性：

| 特性 | 對應的程式 |
| --- | --- |
| 快取 | \`dirty\` 為 \`false\` 時直接回傳 \`value\` |
| 惰性 | \`lazy: true\`，而且 scheduler 只改旗標、不執行 getter |
| 只追蹤響應式資料 | 依賴是靠 Proxy 的 get 攔截收集的，普通變數不會經過 Proxy |
| 動態依賴 | 每次執行 \`runner()\` 都重新收集，沒讀到的就不在名單上 |

理解這段之後，第二節那幾個特性就不需要死背了。

---

## 五、容易疏忽的地方

### 1\\. getter 裡寫副作用

\`\`\`
// ❌
const total = computed(() => {
  count.value++       // 修改其他狀態
  fetch('/api/log')   // 發請求
  return price.value * qty.value
})
\`\`\`

從上面的原理可以知道，getter **什麼時候執行、執行幾次，都不是你能控制的**（可能不執行，也可能被快取跳過）。把副作用放在這裡，行為會變得無法預測。副作用請交給 \`watch\` / \`watchEffect\`。

### 2\\. 不小心改到原始陣列

\`sort()\`、\`reverse()\`、\`splice()\` 會直接修改原陣列：

\`\`\`
// ❌ list 本身被排序了
const sorted = computed(() => list.value.sort((a, b) => a.price - b.price))

// ✅ 先複製
const sorted = computed(() => [...list.value].sort((a, b) => a.price - b.price))

// ✅ 或用 ES2023 不修改原陣列的方法
const sorted = computed(() => list.value.toSorted((a, b) => a.price - b.price))
\`\`\`

這個 bug 很隱蔽，因為畫面看起來「是對的」，但原始資料已經被動過了。

### 3\\. 依賴非響應式的值

\`\`\`js
// ❌ 永遠停在第一次讀取的時間
const now = computed(() => Date.now())
\`\`\`

\`Date.now()\`、\`Math.random()\`、\`localStorage\`、一般的 \`let\` 變數，Vue 都追蹤不到。需要即時更新時，要自己用 \`ref\` 搭配計時器或事件更新：

\`\`\`js
const now = ref(Date.now())
setInterval(() => (now.value = Date.now()), 1000)
\`\`\`

### 4\\. 想寫成 async

\`\`\`
// ❌ 拿到的是 Promise，不是資料
const user = computed(async () => await fetchUser(id.value))
\`\`\`

computed 必須同步回傳值。非同步資料請用 \`watch\` 搭配 \`ref\`：

\`\`\`
const user = ref(null)
watch(id, async (newId) => {
  user.value = await fetchUser(newId)
}, { immediate: true })
\`\`\`

或使用 VueUse 的 \`computedAsync\`。

### 5\\. 想傳參數進去

computed 的 getter 不接收自訂參數（3.4 以後唯一的參數是舊值）。常見的變通寫法是回傳一個函式：

\`\`\`
const getItemTotal = computed(() => (id) => {
  const item = list.value.find(i => i.id === id)
  return item.price * item.qty
})

getItemTotal.value(3)
\`\`\`

但這樣**被快取的是那個函式，而不是計算結果**。每次呼叫 \`getItemTotal.value(3)\` 都會重新 find、重新相乘，效果和一般函式差不多。需要帶參數的運算，直接寫成一般函式通常會更清楚。

### 6\\. 解構後失去響應性

\`\`\`
const state = reactive({ count: 1 })
const { count } = state // count 只是數字 1，和 state 斷了連結

const double = computed(() => count * 2) // ❌ 永遠是 2
\`\`\`

改成直接讀 \`state.count\`，或用 \`toRefs(state)\` 保留連結。

> 補充：Vue 3.5 起，在 \`<script setup>\` 裡解構 \`defineProps\` 會由編譯器自動轉成 \`props.xxx\`，所以仍然保有響應性。但解構 \`reactive()\` 還是會失效，兩者不要混為一談。

### 7\\. 修改 computed 回傳的結果

\`\`\`
const activeList = computed(() => list.value.filter(i => i.active))

activeList.value.push(newItem) // ❌ 下次重算就消失了
\`\`\`

computed 的結果是衍生出來的快照，改它沒有意義。要改就改原始資料 \`list\`。

---

## 六、computed、methods、watch 怎麼選

|  | computed | methods | watch |
| --- | --- | --- | --- |
| 有沒有快取 | 有 | 沒有，每次呼叫都執行 | 不適用 |
| 有沒有回傳值 | 有 | 有 | 沒有 |
| 能不能傳參數 | 不行 | 可以 | 不適用 |
| 能不能非同步 | 不行 | 可以 | 可以 |
| 適合用在 | 從狀態算出新資料 | 事件處理、需要參數的運算 | 資料變了之後要**做某件事** |

判斷原則很簡單：**要「得到一個值」用 computed，要「做一件事」用 watch**。

---

## 小結

-   computed 依據**響應式依賴**快取，非響應式的值改變不會觸發重算。
-   它是**惰性**的，依賴改變時只標記過期，被讀取時才重算。
-   依賴是**動態收集**的，只追蹤上一次執行時實際讀到的資料。
-   Vue 3.4 起，結果沒變就不通知下游，但新物件永遠視為改變。
-   getter 要保持純粹：不寫副作用、不修改原始資料、不做非同步。

記住「dirty flag + track / trigger」這個模型，大部分 computed 的行為都能自己推導出來。
`,f=`---
title: "Vue 走過路過不要錯過 Day07 - watch 與 watchEffect：什麼時候該用哪一個"
subtitle: "watch 與 watchEffect：什麼時候該用哪一個"
day: 7
date: "2026-09-21"
excerpt: "資料變了，我們常常需要「順便做點什麼」：打 API、存進 localStorage、印個 log。Vue 3 給了我們 computed 、 watch 、 watchEffect 三個看起來都跟「資料變化」有關的工具，於是問題就來了：到底…"
source: "https://ithelp.ithome.com.tw/articles/10414857"
series: "ithome-ironman-2026"
---

## 前言

資料變了，我們常常需要「順便做點什麼」：打 API、存進 localStorage、印個 log。Vue 3 給了我們 \`computed\`、\`watch\`、\`watchEffect\` 三個看起來都跟「資料變化」有關的工具，於是問題就來了：到底該用哪一個？

先講結論：

> **需要一個值，用 computed；需要做一件事，用 watch 系列。要明確指定來源、拿到舊值、或不想一開始就執行，用 watch；只想「用到什麼就追蹤什麼」並且立刻執行，用 watchEffect。**

接下來分成三個部分說明：先排除 computed，再從三個角度比較 watch 與 watchEffect，最後整理成一張決策表。

---

## 先排除：你真的需要 watch 嗎？

很多人在問「watch 還是 watchEffect」之前，其實該先問「我需不需要 watch」。分界只有一句話：

> **你需要的是「一個值」→ computed；你需要的是「做一件事」→ watch。**

computed 是從既有資料**推導出新的值**，會回傳結果、有快取，依賴沒變就不重算，應該保持純粹。watch 則是資料變化時去**執行副作用**，本身不產生值給畫面用。

最常見的誤用，是拿 watch 去「同步」一個其實算得出來的值：

\`\`\`js
// 不建議：用 watch 手動同步衍生值
const firstName = ref('承')
const lastName = ref('哲')
const fullName = ref('')
 
watch([firstName, lastName], ([f, l]) => {
  fullName.value = f + l
}, { immediate: true })
 
// 建議：它本來就是推導出來的值
const fullName = computed(() => firstName.value + lastName.value)
\`\`\`

判斷訊號：**如果 watch 的 callback 裡唯一做的事是「把結果塞給另一個 ref」，那它八成該是 computed。**

確認自己是要「做事」之後，才進入 watch 與 watchEffect 的選擇。

---

## 比較一：依賴怎麼決定

### watch：你明確告訴它要看誰

watch 的第一個參數叫 **source（來源）**，可以是以下幾種：

\`\`\`js
const count = ref(0)
const state = reactive({ keyword: '', page: 1 })
 
watch(count, (newVal, oldVal) => {})              // 一個 ref
watch(state, (newVal, oldVal) => {})              // 一個 reactive 物件
watch(() => state.keyword, (newVal, oldVal) => {}) // getter 函式
watch([count, () => state.page], ([c, p]) => {})  // 陣列，同時看多個
\`\`\`

這裡有個新手很常踩的坑：想監聽 reactive 物件裡的某個屬性，直接寫成這樣是**無效**的：

\`\`\`js
watch(state.keyword, () => {}) // ❌ 傳進去的只是一個字串，不是響應式來源
watch(() => state.keyword, () => {}) // ✅ 用 getter 包起來
\`\`\`

\`state.keyword\` 在傳進 watch 的那一刻就已經被取值成普通字串了，Vue 沒辦法從一個字串知道它該監聽什麼，所以要用 getter 函式，讓 Vue 在執行 getter 時去收集依賴。

### watchEffect：用到什麼，就追蹤什麼

watchEffect 不需要指定來源：

\`\`\`js
const userId = ref(1)
 
watchEffect(() => {
  fetchUser(userId.value)
})
\`\`\`

它怎麼知道要在 \`userId\` 變化時重新執行？答案就在 Day 3 做過的迷你 reactive 裡：**Proxy 的 get 被觸發時，會記錄「現在是誰在讀我」。**

watchEffect 做的事，概念上就是把自己登記成「目前正在執行的 effect」，然後立刻跑一次你的函式。函式裡讀到 \`userId.value\`，觸發了 get，get 就把這個 effect 記進 \`userId\` 的依賴清單。之後 \`userId\` 被修改、觸發 set，就會通知清單裡的 effect 重新執行。

\`\`\`js
// 概念示意，非 Vue 原始碼
let activeEffect = null
 
function watchEffect(fn) {
  const effect = () => {
    activeEffect = effect
    fn()               // 執行期間讀到的響應式資料，都會在 get 裡被 track
    activeEffect = null
  }
  effect()
}
 
// 在 Proxy 的 get 裡：
// if (activeEffect) track(target, key, activeEffect)
\`\`\`

所以 watchEffect 的依賴是「**執行時實際讀到的東西**」，而且每次重新執行都會重新收集一次。

這也帶來一個限制：**只有同步執行期間讀到的資料才會被追蹤**。\`await\` 之後才讀的值，已經不在那次執行的追蹤範圍內了：

\`\`\`js
watchEffect(async () => {
  const res = await fetch(\`/api/user/\${userId.value}\`) // ✅ await 之前讀到，會追蹤
  const data = await res.json()
  console.log(filter.value) // ❌ await 之後才讀，不會被追蹤
})
\`\`\`

### 對照 React 的 useEffect

如果你寫過 React，watchEffect 看起來很像 \`useEffect\`：都是丟一個函式進去放副作用，也都會先執行一次。但關鍵差別正好是自動追蹤：

\`\`\`js
// React：依賴要自己列
useEffect(() => {
  fetchUser(userId)
}, [userId])
 
// Vue watch：來源要自己指定，比較接近上面這個
watch(userId, (id) => fetchUser(id))
 
// Vue watchEffect：不用列，自動追蹤
watchEffect(() => fetchUser(userId.value))
\`\`\`

還有一個容易搞混的地方：useEffect **不寫依賴陣列**時，會在每次 render 後都執行；watchEffect 沒有依賴陣列，卻**只會**在它讀到的響應式資料變化時重跑。兩邊「沒寫依賴」的意思剛好相反。原因在於 React 每次 render 都會重新執行整個元件函式，而 Vue 的 setup 只跑一次，更新靠的是響應式系統精準通知。

---

## 比較二：什麼時候執行

**watch 預設是 lazy 的。** 元件建立時 callback 不會執行，要等來源第一次變化才跑：

\`\`\`js
watch(keyword, (val) => {
  search(val) // 一開始不會執行，keyword 改變後才執行
})
 
watch(keyword, (val) => {
  search(val) // 加上 immediate，一開始就會先跑一次
}, { immediate: true })
\`\`\`

**watchEffect 則是建立當下就立刻執行一次**，因為它必須先跑過一遍，才知道自己依賴了誰。

---

## 比較三：拿不拿得到舊值

**watch 會把新值和舊值傳進 callback**，適合需要比較前後差異的情境：

\`\`\`js
watch(page, (newPage, oldPage) => {
  console.log(\`從第 \${oldPage} 頁換到第 \${newPage} 頁\`)
})
\`\`\`

但要注意一個陷阱：如果來源直接是一個 **reactive 物件**，Vue 會預設深層監聽，而 \`newVal\` 和 \`oldVal\` 會指向**同一個物件**，拿不到真正的舊值：

\`\`\`js
const state = reactive({ count: 0 })
 
watch(state, (newVal, oldVal) => {
  console.log(newVal === oldVal) // true
})
\`\`\`

如果需要某個屬性的舊值，改用 getter 監聽那個屬性即可：

\`\`\`js
watch(() => state.count, (newCount, oldCount) => {
  console.log(oldCount, '→', newCount)
})
\`\`\`

**watchEffect 沒有舊值**，它只關心「現在」的狀態。

---

## 補充：停止監聽

watch 與 watchEffect 本身都會**回傳一個停止監聽的函式**。在 setup 裡同步建立的 watcher 會跟著元件卸載自動停止，大多數時候不用手動處理；但如果是在非同步流程裡才建立的，就要記得自己停掉：

\`\`\`js
const stop = watchEffect(() => {
  console.log(userId.value)
})
 
// 不需要時
stop()
\`\`\`

---

## 總結：決策流程

先問自己：**我要的是一個值，還是要做一件事？**

要一個值 → \`computed\`。要做一件事，再往下看：

| 比較維度 | watch | watchEffect |
| --- | --- | --- |
| 依賴怎麼決定 | 明確指定 source | 執行時讀到什麼就追蹤什麼 |
| 什麼時候執行 | 預設 lazy，來源變化才執行（可加 \`immediate\`） | 建立時立刻執行一次 |
| 拿不拿得到舊值 | 可以（直接監聽 reactive 物件時例外） | 不行 |
| 適合情境 | 只想對特定資料反應、需要前後比較、不想一開始就執行 | 依賴很多、只在乎最新狀態、一開始就要執行 |

一句話收尾：**watch 是「我告訴你看誰」，watchEffect 是「你自己看我用了誰」。**
`,v=`---
title: "Vue 走過路過不要錯過 Day08 - 改完資料，DOM 為什麼還是舊的？認識 nextTick"
subtitle: "改完資料，DOM 為什麼還是舊的？認識 nextTick"
day: 8
date: "2026-09-22"
excerpt: "在 Day03 我們用 Proxy 做了一個迷你 reactive，只要資料一改，畫面就馬上跟著更新。 但當時我有留一個伏筆： 真正的 Vue 並不是這樣做的。 今天就來把這個伏筆收回來，順便認識一個很常用、但很多人不太懂的 API： ne…"
source: "https://ithelp.ithome.com.tw/articles/10415533"
series: "ithome-ironman-2026"
---

## 前言

在 Day03 我們用 Proxy 做了一個迷你 reactive，只要資料一改，畫面就馬上跟著更新。

但當時我有留一個伏筆：**真正的 Vue 並不是這樣做的。**

今天就來把這個伏筆收回來，順便認識一個很常用、但很多人不太懂的 API：\`nextTick\`。

---

## 先看一個奇怪的現象

\`\`\`html
<div id="app">
  <p ref="msg">{{ count }}</p>
  <button @click="add">+1</button>
</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const count = ref(0)
      const msg = ref(null)

      function add() {
        count.value++
        console.log('資料：', count.value)
        console.log('畫面：', msg.value.textContent)
      }

      return { count, msg, add }
    }
  }).mount('#app')
<\/script>
\`\`\`

點一下按鈕，console 會印出：

\`\`\`
資料： 1
畫面： 0
\`\`\`

資料已經變成 1 了，但畫面上讀到的還是 0。

這不是 bug，而是 Vue 故意這樣設計的。

---

## 為什麼 Vue 不馬上更新畫面？

用點餐來比喻。

你在餐廳點了一碗麵、一杯紅茶、一盤小菜，服務生不會每聽到一道就跑一次廚房，而是全部寫在點單上，等你點完再一次送過去。

Vue 更新畫面也是一樣的邏輯：

-   你改資料 → 就像在點菜
-   Vue 先把「要更新畫面」這件事記下來
-   等這段程式碼全部跑完，再一次更新畫面

這樣做的好處是，就算你連續改了 100 次資料：

\`\`\`js
for (let i = 0; i < 100; i++) {
  count.value++
}
\`\`\`

畫面也只會更新 1 次，而不是 100 次。操作 DOM 是很耗效能的事情，能少做就少做。

這個機制叫做**批次更新**。

---

## 回頭看 Day03

Day03 的迷你 reactive 大概長這樣：

\`\`\`js
set(target, key, value) {
  target[key] = value
  effect() // 一改就馬上執行
  return true
}
\`\`\`

這就像服務生每聽到一道菜就跑一次廚房。

真正的 Vue 多做了一步：不馬上執行，而是**先放進一個待辦清單，晚一點再統一執行**。這就是 Day03 留下的伏筆。

---

## 「晚一點」是多晚？

Vue 會把更新畫面的工作，放進 \`Promise.then()\` 裡面執行。

在 JavaScript 裡，\`Promise.then()\` 的內容會在**目前的同步程式碼全部跑完之後**才執行。

\`\`\`js
console.log('A')
Promise.resolve().then(() => console.log('B'))
console.log('C')

// 印出順序：A → C → B
\`\`\`

所以 Vue 的更新流程是：

1.  你的程式碼執行，資料被修改（同步）
2.  你的程式碼跑完
3.  Vue 在 \`Promise.then()\` 裡一次更新畫面

這也解釋了一開始的現象：\`console.log\` 是在第 1 步執行的，那時畫面還沒更新。

---

## nextTick 登場

如果我們改完資料，就是想拿到更新後的畫面，該怎麼辦？

答案就是 \`nextTick\`，它的意思是：**等畫面更新完，再繼續往下執行。**

\`\`\`js
import { ref, nextTick } from 'vue'

async function add() {
  count.value++
  await nextTick()
  console.log('畫面：', msg.value.textContent) // 1
}
\`\`\`

\`nextTick\` 本身也是一個 Promise，而且它會排在 Vue 更新畫面的那個 Promise 後面，所以等到它的時候，畫面一定已經更新好了。

---

## 實際會用到的情境

### 情境一：按下編輯，輸入框自動 focus

\`\`\`html
<button @click="startEdit">編輯</button>
<input v-if="isEditing" ref="inputRef" />
\`\`\`

\`\`\`js
const isEditing = ref(false)
const inputRef = ref(null)

async function startEdit() {
  isEditing.value = true   // 讓輸入框出現
  await nextTick()         // 等畫面更新
  inputRef.value.focus()   // 輸入框已經在畫面上了
}
\`\`\`

如果沒有 \`nextTick\`，\`isEditing\` 剛改成 \`true\` 時，輸入框還沒被建立，\`inputRef.value\` 是 \`null\`，就會報錯。

### 情境二：新增訊息後，自動捲到最底

\`\`\`js
async function addMessage(text) {
  messages.value.push(text)
  await nextTick()
  listRef.value.scrollTop = listRef.value.scrollHeight
}
\`\`\`

新訊息要先出現在畫面上，高度才會變，這時捲動才會捲到正確的位置。

---

## 什麼時候需要 nextTick？

記一句話就好：

> **改完資料後，下一步要操作畫面上的元素，就加 \`await nextTick()\`。**

例如 focus、捲動、量元素的寬高。

如果只是讀資料本身，就不需要，因為資料是立刻改好的，只有畫面是晚一點才更新。

---

## 小結

-   Vue 改資料後，不會馬上更新畫面，而是等程式碼跑完再一次更新（批次更新）
-   這樣可以避免重複操作 DOM，效能比較好
-   Vue 用 \`Promise.then()\` 來安排「晚一點」的更新時機
-   \`nextTick\` 可以讓我們等到畫面更新完再繼續
-   常見用途：focus 輸入框、捲動到底部、量元素尺寸

明天會繼續往下走，我們下一篇見。

---
`,y=`---
title: "Vue 走過路過不要錯過 Day09 - 從 {{ }} 到 v-bind：動態綁定 class 與 style"
subtitle: "從 {{ }} 到 v-bind：動態綁定 class 與 style"
day: 9
date: "2026-09-23"
excerpt: "前幾天我們用 Proxy 做出迷你 reactive，也認識了 ref、reactive、watch。資料已經會「變」了，但使用者看不到資料，只看得到畫面。今天要講的就是資料和畫面之間的那座橋：模板語法。 大括號裡可以放「一個 JavaSc…"
source: "https://ithelp.ithome.com.tw/articles/10416002"
series: "ithome-ironman-2026"
---

前幾天我們用 Proxy 做出迷你 reactive，也認識了 ref、reactive、watch。資料已經會「變」了，但使用者看不到資料，只看得到畫面。今天要講的就是資料和畫面之間的那座橋：模板語法。

## 一、{{ }}：它只負責「文字」

\`\`\`
<script setup>
import { ref } from 'vue'
const name = ref('Fabio')
const user = ref({ age: 30 })
<\/script>
 
<template>
  <p>哈囉，{{ name }}</p>
  <p>{{ name.toUpperCase() }}</p>
  <p>{{ user }}</p>
</template>
\`\`\`

大括號裡可以放「一個 JavaScript 表達式」。只要能算出一個值就行，例如三元運算、呼叫函式、陣列方法；但 \`if\`、\`for\`、宣告變數這類陳述句不行。

有幾個細節容易被忽略：

1.  **物件會被 JSON.stringify**。上面的 \`{{ user }}\` 會顯示 \`{ "age": 30 }\`；而 \`null\` 和 \`undefined\` 會顯示成空字串，不會真的印出 "undefined"。
2.  **它是 textContent，不是 innerHTML**。放進去的 \`<b>粗體</b>\` 會原封不動顯示成文字，這是 Vue 預設幫你擋掉 XSS。真的要塞 HTML 得改用 \`v-html\`，而且只能用在你信任的內容上。
3.  **模板裡不是什麼全域變數都能用**。\`Math\`、\`Date\` 這類白名單可以用，但你自己掛在 \`window\` 上的東西不行。  
    最關鍵的一點是：**{{ }} 不能用在屬性上。**

\`\`\`vue
<!-- ❌ 不會動，id 就是字面上的 "{{ dynamicId }}" -->
<div id="{{ dynamicId }}"></div>
\`\`\`

這就是 v-bind 登場的原因。

## 二、v-bind：把資料接到屬性上

\`\`\`vue
<img v-bind:src="imgUrl" />
<img :src="imgUrl" />          <!-- 縮寫 -->
<img :src />                   <!-- 3.4+ 同名縮寫，等於 :src="src" -->
\`\`\`

冒號後面那串，Vue 會當成 JavaScript 表達式來求值，而不是字串。所以 \`:count="1"\` 拿到的是數字 1，\`count="1"\` 拿到的是字串 "1"。傳 props 時，這個差別很重要。

### 值是 false、null 時會發生什麼？

這是最常被忽略的地方。Vue 3 的規則是：

| 綁定的值 | 一般屬性（id、aria-\\*） | 布林屬性（disabled、checked） |
| --- | --- | --- |
| \`null\` / \`undefined\` | 移除屬性 | 移除屬性 |
| \`false\` | 保留，值為 \`"false"\` | 移除屬性 |
| \`""\` 空字串 | 保留，值為空 | 保留（也就是啟用） |

所以想「拿掉」一個屬性時，請給 \`null\`，不要給 \`false\`。像 \`:aria-hidden="false"\` 會真的輸出 \`aria-hidden="false"\`，這對無障礙來說反而是正確的行為。

### 一次綁一整包

\`\`\`
<script setup>
import { ref } from 'vue'
const inputAttrs = { type: 'email', placeholder: '請輸入 Email', required: true }
const attrName = ref('title')
<\/script>
 
<template>
  <input v-bind="inputAttrs" />
  <div :[attrName]="'我是動態屬性名'"></div>
</template>
\`\`\`

\`v-bind="物件"\` 在包裝元件、轉傳一堆屬性時非常好用。\`:[attrName]\` 則是動態參數，連「要綁哪個屬性」都可以是變數。

## 三、:class，Vue 幫你特別加強的綁定

一般屬性綁的是字串，但 class 和 style 太常需要「條件式組合」，所以 Vue 對這兩個屬性額外支援物件和陣列。

### 物件語法：key 是 class 名，value 決定要不要加

\`\`\`
<div class="btn" :class="{ active: isActive, 'is-error': hasError }"></div>
\`\`\`

這裡有兩件事要注意：靜態的 \`class\` 和 \`:class\` 可以並存，Vue 會把兩者合併；含 \`-\` 的 class 名要加引號。

### 陣列語法：直接列出要加的 class

\`\`\`
<div :class="[sizeClass, isActive ? 'active' : '']"></div>
<div :class="[sizeClass, { active: isActive }]"></div>  <!-- 陣列裡也能放物件 -->
\`\`\`

### 條件一多，就搬進 computed

\`\`\`
<script setup>
import { computed } from 'vue'
const props = defineProps({ type: String, disabled: Boolean })
 
const btnClass = computed(() => ({
  'btn-primary': props.type === 'primary',
  'btn-danger': props.type === 'danger',
  'is-disabled': props.disabled
}))
<\/script>
 
<template>
  <button :class="btnClass"><slot /></button>
</template>
\`\`\`

這樣模板保持乾淨，邏輯集中在一個地方，還能享有 computed 的快取。

### 在元件上寫 class，會跑去哪？

\`\`\`
<MyButton class="mt-4" />
\`\`\`

如果 \`MyButton\` 只有一個根元素，\`mt-4\` 會自動加到那個根元素上，並和元件內部原本的 class 合併，這叫屬性透傳（fallthrough attributes）。如果元件有多個根元素，Vue 不知道要給誰，就得自己用 \`$attrs.class\` 指定。

### ⚠️ 搭配 Tailwind 的陷阱

\`\`\`vue
<!-- ❌ Tailwind 掃描原始碼時看不到完整 class 名，這些樣式可能根本沒被產生 -->
<div :class="\`bg-\${color}-500\`"></div>
\`\`\`

Tailwind 在建置時是用文字掃描找出你用到的 class，它不會執行你的 JavaScript。所以 class 名必須以完整字串出現在原始碼裡：

\`\`\`
// ✅ 用對照表，每個 class 都完整寫出來
const colorMap = {
  red: 'bg-red-500',
  blue: 'bg-blue-500'
}
\`\`\`

\`\`\`
<div :class="colorMap[color]"></div>
\`\`\`

這個問題不是 Vue 造成的，但在 Vue + Tailwind 專案裡非常常見：開發時看起來正常（剛好別處有用到同一個 class），上線後樣式卻消失了。

## 四、:style，行內樣式的綁定

\`\`\`vue
<div :style="{ color: textColor, fontSize: size + 'px' }"></div>
<div :style="{ 'font-size': size + 'px' }"></div>  <!-- kebab-case 要加引號 -->
\`\`\`

幾個重點：

1.  **單位不會自動補**。\`fontSize: 16\` 不會變成 16px，要自己加上去。
2.  **可以用陣列合併多個樣式物件**：\`:style="[baseStyle, overrideStyle]"\`，後面的會蓋掉前面的。
3.  **Vue 會自動補瀏覽器前綴**。需要的話也能給多個值，讓瀏覽器挑自己支援的那個：\`{ display: ['-webkit-box', 'flex'] }\`。
4.  **可以設定 CSS 變數**，這個很實用：

\`\`\`vue
<div class="card" :style="{ '--theme-color': themeColor }"></div>
 
<style>
.card {
  border-color: var(--theme-color);
}
</style>
\`\`\`

JS 負責提供動態的值，CSS 負責決定怎麼使用這個值，分工更清楚。

## 五、另一條路：在 \`<style>\` 裡用 v-bind()

SFC 還有一個很多人沒注意到的功能：

\`\`\`vue
<script setup>
import { ref } from 'vue'
const themeColor = ref('#42b883')
<\/script>
 
<template>
  <p class="title">Hello</p>
</template>
 
<style scoped>
.title {
  color: v-bind(themeColor);
}
</style>
\`\`\`

它背後的原理正是上一段的 CSS 變數：Vue 會把 \`themeColor\` 轉成一個帶 hash 的 CSS 變數，掛在元件根元素的 inline style 上，而且是響應式的。樣式寫在 CSS 裡，值由 JS 控制，兩邊都不用妥協。

## 六、打開 SFC Playground 看一眼

還記得 Day 2 提到的 SFC Playground 嗎？把這段貼進去：

\`\`\`vue
<div :class="{ active: isActive }">hi</div>
\`\`\`

在右邊的 JS 分頁，會看到類似這樣的編譯結果：

\`\`\`js
_createElementVNode("div", {
  class: _normalizeClass({ active: $setup.isActive })
}, "hi", 2 /* CLASS */)
\`\`\`

這裡有兩個值得一看的地方：

1.  **\`normalizeClass\`**：不管你給的是字串、物件還是陣列，最後都會被整理成一個普通的 class 字串。\`:style\` 則對應 \`normalizeStyle\`。
2.  **\`2 /* CLASS */\`**：這是 patchFlag。編譯器在編譯階段就知道「這個節點只有 class 是動態的」，所以資料變動時，Vue 只比對 class，其他部分都跳過。  
    把它跟 Day 3 串起來：\`isActive\` 被 Proxy 追蹤 → 值改變 → 觸發元件重新渲染 → patchFlag 告訴 Vue 只需要更新 class。從資料到畫面的整條路，到這裡就接起來了。

## 小結

-   \`{{ }}\` 負責文字內容，是安全的 textContent，不能用在屬性上
-   \`v-bind\` 負責屬性，值是 JS 表達式；想移除屬性請給 \`null\`，而不是 \`false\`
-   \`:class\` 和 \`:style\` 支援物件與陣列，條件一多就搬進 computed
-   動態值可以透過 CSS 變數，或 \`<style>\` 裡的 \`v-bind()\` 交給 CSS 處理
-   編譯器會用 patchFlag 標記動態部分，讓更新只做必要的事
`,h=`---
title: "Vue 走過路過不要錯過 Day10 - v-if 與 v-show：一個拆掉，一個只是藏起來"
subtitle: "v-if 與 v-show：一個拆掉，一個只是藏起來"
day: 10
date: "2026-09-24"
excerpt: "前幾天聊了 ref、reactive、computed、watch，都是在處理「資料怎麼變」。今天換個角度，看資料變了以後， 畫面上的東西要怎麼出現、怎麼消失 。 Vue 提供兩個看起來很像的指令： v-if 和 v-show 。很多教學會…"
source: "https://ithelp.ithome.com.tw/articles/10416006"
series: "ithome-ironman-2026"
---

## 前言

前幾天聊了 ref、reactive、computed、watch，都是在處理「資料怎麼變」。今天換個角度，看資料變了以後，**畫面上的東西要怎麼出現、怎麼消失**。

Vue 提供兩個看起來很像的指令：\`v-if\` 和 \`v-show\`。很多教學會用一句話帶過：「v-if 會移除 DOM，v-show 只是切換 display」。這句話沒錯，但真正在專案裡踩到的坑，幾乎都是這句話的延伸後果，尤其是跟 \`v-for\` 搭在一起的時候。

今天我們把它們拆開來看。

---

## 一、先看 DOM：同一個開關，兩種消失

\`\`\`js
<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
<\/script>
 
<template>
  <button @click="isOpen = !isOpen">切換</button>
  <div v-if="isOpen">我是 v-if</div>
  <div v-show="isOpen">我是 v-show</div>
</template>
\`\`\`

在 \`isOpen\` 為 \`false\` 的時候，打開 DevTools 看 Elements 面板，會看到：

\`\`\`js
<button>切換</button>
<!--v-if-->
<div style="display: none;">我是 v-show</div>
\`\`\`

-   \`v-if\` 的 div **整個不存在**，只留一個註解當佔位符，讓 Vue 知道之後要把東西插回哪裡。
-   \`v-show\` 的 div **還在**，只是多了一個 inline style。  
    這就是標題說的：一個拆掉，一個只是藏起來。

---

## 二、看編譯結果：它們根本是兩種東西

把上面的程式碼貼到 [SFC Playground](https://play.vuejs.org)，切到 JS 分頁，會看到類似這樣的輸出（簡化後）：

\`\`\`js
// v-if
isOpen.value
  ? (openBlock(), createElementBlock("div", { key: 0 }, "我是 v-if"))
  : createCommentVNode("v-if", true)
 
// v-show
withDirectives(
  createElementVNode("div", null, "我是 v-show", 512),
  [[vShow, isOpen.value]]
)
\`\`\`

-   \`v-if\` 被編譯成一個**三元運算子**。條件不成立時，根本不會建立那個 div 的 VNode，只建立一個註解節點。它是 render function 層級的 if/else。
-   \`v-show\` 則是**先照常建立 div**，再透過 \`withDirectives\` 掛上 \`vShow\` 這個指令，由指令去改 \`el.style.display\`。  
    所以 v-if 決定的是「**要不要產生這個東西**」，v-show 決定的是「**產生之後要不要讓人看到**」。後面所有的差異和陷阱，都可以從這一點推導出來。

---

## 三、生命週期與狀態：拆掉就是真的沒了

既然 v-if 是真的不產生，那放在裡面的元件也會真的被建立和銷毀。我們寫一個有自己狀態的子元件來驗證：

\`\`\`js
<!-- Counter.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const count = ref(0)
onMounted(() => console.log('mounted'))
onUnmounted(() => console.log('unmounted'))
<\/script>
 
<template>
  <button @click="count++">點了 {{ count }} 次</button>
</template>
\`\`\`

\`\`\`js
<Counter v-if="isOpen" />
<Counter v-show="isOpen" />
\`\`\`

實際操作一次會發現：

|  | v-if | v-show |
| --- | --- | --- |
| 每次打開 | 觸發 \`mounted\` | 只有第一次觸發 |
| 每次關閉 | 觸發 \`unmounted\` | 不觸發 |
| 關掉再打開後的 \`count\` | 歸零 | 保留原本的數字 |

這也表示在元件裡用 \`setInterval\`、事件監聽這類東西時，v-if 會在 \`onUnmounted\` 給你清理的機會；v-show 藏起來的元件，計時器會**一直在背景跑**。

那如果想「拆掉又保留狀態」呢？Vue 有 \`<KeepAlive>\` 可以處理，這個之後再開一天來聊。

---

## 四、成本：付在一開始，還是付在每一次

-   **v-if 是惰性的**：初始條件為 \`false\` 時什麼都不做，初始成本低；但每次切換都要重新建立或銷毀整個區塊。
    
-   **v-show 一定會先渲染**：就算初始是 \`false\`，DOM 和元件也都會建好，初始成本高；但之後的切換只是改一個 style，非常便宜。  
    所以常見的選擇原則是：
    
-   **頻繁切換**（tab、下拉選單、手風琴）→ \`v-show\`
    
-   **很少變動，或大部分時候是 false**（權限區塊、錯誤訊息、登入後才有的內容）→ \`v-if\`
    

---

## 五、單一元素時就會遇到的陷阱

### 1\\. v-show 裡面的內容還是會被執行

\`\`\`js
<script setup>
import { ref } from 'vue'
const user = ref(null) // 等 API 回來才有資料
<\/script>
 
<template>
  <div v-show="user">{{ user.name }}</div> <!-- 💥 Cannot read properties of null -->
  <div v-if="user">{{ user.name }}</div>   <!-- ✅ -->
</template>
\`\`\`

v-show 會照常渲染裡面的內容，所以 \`user.name\` 一定會被執行。**v-if 可以當守門員，v-show 不行。**

### 2\\. 空陣列是 truthy

\`\`\`js
<ul v-if="list">...</ul>        <!-- list 是 [] 也會渲染 -->
<ul v-if="list.length">...</ul> <!-- ✅ -->
\`\`\`

這其實是 JS 的 truthy/falsy 問題：\`[]\` 和 \`{}\` 都是 truthy，只有 \`0\`、\`''\`、\`null\`、\`undefined\`、\`NaN\`、\`false\` 是 falsy。

### 3\\. v-show 會跟 CSS 打架

v-show 做的事只有兩件：條件為 false 時加上 inline 的 \`display: none\`；條件為 true 時把 display 還原成原本的值。所以：

\`\`\`js
<!-- Tailwind 的 hidden 就是 display: none，v-show 為 true 也不會出現 -->
<div class="hidden" v-show="isOpen">永遠看不到</div>
 
<!-- !important 的權重比 inline style 高，v-show 為 false 也藏不住 -->
<div class="!flex" v-show="isOpen">永遠藏不住</div>
\`\`\`

用 Tailwind 或自己寫 utility class 的人特別容易遇到。

### 4\\. v-show 不能用在 \`<template>\` 上，也沒有 \`v-else\`

\`<template>\` 不會產生真實的 DOM，v-show 自然沒有 style 可以改。\`v-else\` 則是 v-if 那套三元運算的一部分，v-show 沒有這個結構。

### 5\\. v-show 在多根節點元件上會失效

Vue 3 允許元件有多個根節點（fragment），但 v-show 需要一個明確的元素來設定 style。對多根元件使用 v-show 時，Vue 會在 console 警告指令無法正常作用。

### 6\\. v-if 與 template ref 的時間差

\`\`\`js
<script setup>
import { ref, nextTick } from 'vue'
const isOpen = ref(false)
const inputRef = ref(null)
 
async function open() {
  isOpen.value = true
  console.log(inputRef.value) // null，DOM 還沒建好
  await nextTick()
  inputRef.value.focus()      // ✅
}
<\/script>
 
<template>
  <input v-if="isOpen" ref="inputRef" />
</template>
\`\`\`

v-if 為 false 時元素不存在，ref 就是 \`null\`。切成 true 後，要等 Vue 完成下一次更新才拿得到。如果換成 v-show，ref 從頭到尾都在。

---

## 六、遇上 v-for：誤區最多的地方

前面的陷阱都還算直觀，真正讓人卡很久的是列表。我們用一個待辦清單當例子：

\`\`\`js
const todos = ref([
  { id: 1, title: '寫鐵人賽', done: false },
  { id: 2, title: '買牛奶', done: true },
  { id: 3, title: '倒垃圾', done: false },
])
\`\`\`

需求是：**只顯示還沒完成的項目**。

### 誤區 1：v-if 和 v-for 寫在同一個元素上

直覺寫法：

\`\`\`js
<li v-for="todo in todos" v-if="!todo.done">{{ todo.title }}</li>
\`\`\`

在 Vue 3 中，**v-if 的優先級比 v-for 高**。也就是 Vue 會先判斷 \`v-if\`，這時候 \`todo\` 還沒被 v-for 定義出來，於是得到錯誤：\`todo is undefined\`。

官方文件也明確建議不要把兩者放在同一個元素上，ESLint 的 \`vue/no-use-v-if-with-v-for\` 規則也會擋這種寫法。

### 誤區 2：用 \`<template>\` 包起來就沒問題了嗎？

常見的修法是把 v-for 移到外層：

\`\`\`js
<template v-for="todo in todos" :key="todo.id">
  <li v-if="!todo.done">{{ todo.title }}</li>
</template>
\`\`\`

這樣可以動，但有兩個隱藏成本。

**第一，每次重新渲染都會把整個陣列跑一遍。** 就算只是元件裡某個不相關的狀態改變（例如頁面上另一個計數器），觸發重新渲染後，所有項目的 \`!todo.done\` 都會重新判斷一次。

**第二，index 不再連續。**

\`\`\`js
<template v-for="(todo, index) in todos" :key="todo.id">
  <li v-if="!todo.done">{{ index + 1 }}. {{ todo.title }}</li>
</template>
\`\`\`

畫面會顯示：

\`\`\`
1. 寫鐵人賽
3. 倒垃圾
\`\`\`

因為 index 是原陣列的位置，被 v-if 過濾掉的第 2 項還是佔著編號。

比較好的做法是**用 computed 先過濾**：

\`\`\`js
<script setup>
import { computed } from 'vue'
const activeTodos = computed(() => todos.value.filter(t => !t.done))
<\/script>
 
<template>
  <li v-for="(todo, index) in activeTodos" :key="todo.id">
    {{ index + 1 }}. {{ todo.title }}
  </li>
</template>
\`\`\`

computed 有快取，只有 \`todos\` 真的改變時才重新過濾；index 也是過濾後的位置，編號自然連續。這也呼應前面講 computed 時提到的：**衍生資料交給 computed，template 只負責呈現**。

### 誤區 3：那用 v-show 就沒有優先級問題了吧？

\`\`\`js
<li v-for="todo in todos" :key="todo.id" v-show="!todo.done">{{ todo.title }}</li>
\`\`\`

沒錯，v-show 只是一個指令，不會跟 v-for 搶優先級，這樣寫**可以正常運作**。但它帶來另外幾個問題。

**(a) 全部的項目都在 DOM 裡。** 列表有 1000 筆、只顯示 10 筆時，另外 990 個 \`<li>\` 還是被建立、還是佔記憶體。如果每個項目是一個元件，990 個元件實例也都活著。

**(b) CSS 的 \`:nth-child\` 和 \`:last-child\` 會算錯。**

\`\`\`css
li:nth-child(odd) { background: #f5f5f5; }   /* 斑馬紋 */
li:last-child { border-bottom: none; }        /* 最後一項不要底線 */
\`\`\`

被 v-show 藏起來的 \`<li>\` 仍然是 DOM 裡的元素，CSS 選擇器照樣把它算進去。結果就是斑馬紋錯位，或最後一個看得到的項目多了一條底線。

v-if 或 computed 過濾就不會有這個問題：v-if 留下的佔位是註解節點，不是元素，\`:nth-child\` 不會算它。

**(c) 「沒有資料」的提示永遠不會出現。**

\`\`\`js
<li v-for="todo in todos" :key="todo.id" v-show="todo.title.includes(keyword)">
  {{ todo.title }}
</li>
<p v-if="todos.length === 0">找不到符合的項目</p>
\`\`\`

使用者搜尋一個不存在的關鍵字時，所有 \`<li>\` 都被藏起來了，但 \`todos.length\` 還是 3，所以提示文字不會出現。畫面上就是一片空白。

改成 computed 過濾後，判斷 \`filteredTodos.length === 0\` 就好了。

### 誤區 4：用 index 當 key，再搭配過濾

假設每個項目是一個元件，而元件裡有自己的狀態：

\`\`\`js
<!-- TodoItem.vue -->
<script setup>
import { ref } from 'vue'
const props = defineProps(['todo'])
const note = ref('') // 每個項目自己的備註，沒有存回父層
<\/script>
 
<template>
  <li>{{ todo.title }} <input v-model="note" placeholder="備註" /></li>
</template>
\`\`\`

\`\`\`js
<TodoItem v-for="(todo, index) in activeTodos" :key="index" :todo="todo" />
\`\`\`

在「寫鐵人賽」的備註欄打了字，然後把它標記為完成。它從 \`activeTodos\` 被過濾掉以後，**備註跑到了「倒垃圾」身上**。

原因是 key 用的是 index。過濾前「寫鐵人賽」是 index 0，過濾後「倒垃圾」變成 index 0。Vue 看到 key 一樣，就認為是同一個元件，只更新了 props，元件內部的 \`note\` 則原封不動地留著。

有趣的是，如果這裡用的是 v-show，因為元素沒有被移除，位置不會變動，反而不會出現這個錯位問題。但這不是選 v-show 的理由，正確的解法是**用穩定且唯一的值當 key**，例如 \`todo.id\`。

### 誤區 5：v-show 放在 \`<template v-for>\` 上

\`\`\`js
<template v-for="todo in todos" :key="todo.id" v-show="!todo.done">
  <li>{{ todo.title }}</li>
</template>
\`\`\`

跟第五節說的一樣，\`<template>\` 不會產生真實元素，v-show 沒地方可以設定 style。這段程式碼不會報錯，但**也不會有任何效果**，是很難察覺的 bug。

### v-for 小結

| 寫法 | 能不能動 | 問題 |
| --- | --- | --- |
| \`v-for\` + \`v-if\` 同一元素 | ❌ | v-if 先執行，拿不到 item |
| \`<template v-for>\` + 內層 \`v-if\` | ✅ | 每次渲染都重跑整個陣列、index 不連續 |
| \`v-for\` + \`v-show\` 同一元素 | ✅ | DOM 全部保留、\`:nth-child\` 算錯、空狀態判斷失效 |
| \`<template v-for>\` + \`v-show\` | ⚠️ | 沒有效果 |
| **computed 過濾 + \`v-for\`** | ✅ | **大多數情況的首選** |

只有一種情況我會考慮在列表上用 v-show：**項目數量少、切換非常頻繁，而且確定沒有用到 \`:nth-child\` 或空狀態判斷**，例如固定幾個項目的篩選 tab。

---

## 七、怎麼選：一張判斷清單

-   內容依賴**可能還不存在的資料**嗎？→ \`v-if\`
-   關掉時需要**重置狀態或釋放資源**（計時器、監聽）嗎？→ \`v-if\`
-   用在 \`<template>\` 或**多根節點元件**上嗎？→ 只能用 \`v-if\`
-   要**過濾列表**嗎？→ computed，不要在 template 裡用 v-if 或 v-show 過濾
-   **頻繁切換**，而且內容一開始就能安全渲染嗎？→ \`v-show\`

---

## 結語

回到標題：v-if 是**拆掉**，v-show 只是**藏起來**。

今天列的每一個陷阱，本質上都是在問同一件事：**這個元素（和它裡面的元件）現在到底存不存在？**

-   存在，所以 \`user.name\` 會被執行、\`:nth-child\` 會算到它、\`length\` 也不會變。
-   不存在，所以 ref 是 null、狀態會重置、index key 會對到別人。  
    把這個問題想清楚，就不用死記哪個情境要用哪個了。下次遇到「畫面沒出現」或「東西藏不起來」的 bug，先打開 DevTools 看看：它是**被拆掉了**，還是**只是被藏起來**？答案通常就在那裡。

如果只能帶走一句話，我會選這句：

> **條件渲染交給 v-if 或 v-show，列表過濾交給 computed。**

---
`,g=`---
title: "Vue 走過路過不要錯過 Day11 -  v-for 與 key：為什麼不要用 index 當 key"
subtitle: "v-for 與 key：為什麼不要用 index 當 key"
day: 11
date: "2026-09-25"
excerpt: "寫 Vue 的人幾乎都聽過這句話：「v-for 要加 key，而且不要用 index。」 但如果再追問一句「為什麼？」，很多人（包括以前的我）只能回答「因為會出 bug」「因為效能比較差」。會出什麼 bug？差在哪裡？今天就來把這件事拆開來…"
source: "https://ithelp.ithome.com.tw/articles/10417078"
series: "ithome-ironman-2026"
---

寫 Vue 的人幾乎都聽過這句話：「v-for 要加 key，而且不要用 index。」

但如果再追問一句「為什麼？」，很多人（包括以前的我）只能回答「因為會出 bug」「因為效能比較差」。會出什麼 bug？差在哪裡？今天就來把這件事拆開來看。

## 一、先看一個怪 bug

先把下面這段丟到 [SFC Playground](https://play.vuejs.org/) 跑跑看：

\`\`\`js
<script setup>
import { ref } from 'vue'

const todos = ref([
  { id: 1, text: '買牛奶' },
  { id: 2, text: '寫鐵人賽' },
  { id: 3, text: '倒垃圾' },
])

function removeFirst() {
  todos.value.shift()
}
<\/script>

<template>
  <button @click="removeFirst">刪除第一項</button>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      {{ todo.text }}
      <input placeholder="備註" />
    </li>
  </ul>
</template>
\`\`\`

操作步驟：

1.  在「買牛奶」旁邊的輸入框打上「要全脂的」
2.  按下「刪除第一項」

結果你會看到：「買牛奶」確實不見了，但「要全脂的」這幾個字跑到「寫鐵人賽」旁邊了。

資料有錯嗎？打開 Vue Devtools 看，\`todos\` 裡面乾乾淨淨，就是 \`寫鐵人賽\`、\`倒垃圾\` 兩筆。**資料是對的，錯的是畫面上的 DOM 被重複利用的方式。**

現在把 \`:key="index"\` 改成 \`:key="todo.id"\`，重新做一次，備註就會跟著「買牛奶」一起消失。這才是我們要的行為。

---

## 二、結論先講

> **key 是 Vue 在比對新舊畫面時，用來判斷「這是不是同一個節點」的身分證。**

用 \`todo.id\` 當 key，身分證跟著「資料本身」走；用 \`index\` 當 key，身分證跟著「座位號碼」走。

人換了座位，Vue 看的卻是座位號碼，當然會認錯人。

接下來分三段說明：Vue 更新列表時到底在做什麼、index 當 key 具體會壞在哪、以及好的 key 該從哪裡來。

---

## 三、v-for 快速回顧

正式進入主題前，快速帶過幾個常用寫法：

\`\`\`js
<!-- 遍歷陣列：第二個參數是 index -->
<li v-for="(item, index) in items" :key="item.id">{{ item.name }}</li>

<!-- 遍歷物件：value、key、index 的順序 -->
<li v-for="(value, key, index) in profile" :key="key">{{ key }}: {{ value }}</li>

<!-- 數字範圍：從 1 開始，不是 0 -->
<span v-for="n in 5" :key="n">⭐</span>
\`\`\`

另外一個 Vue 3 的小提醒：**\`v-if\` 的優先級比 \`v-for\` 高**。所以寫在同一個元素上時，\`v-if\` 會先執行，這時候還拿不到 \`v-for\` 的變數：

\`\`\`js
<!-- ❌ 會報錯：todo 還沒被定義 -->
<li v-for="todo in todos" v-if="!todo.done" :key="todo.id">...</li>

<!-- ✅ 用 computed 先過濾 -->
<li v-for="todo in undoneTodos" :key="todo.id">...</li>
\`\`\`

---

## 四、Vue 更新列表時在做什麼

回想 Day 3 講的響應式：資料一變，元件就會重新執行 render，產生一份新的虛擬 DOM（vnode）。接著 Vue 要把「新的 vnode 列表」和「舊的 vnode 列表」做比對（diff），然後只對真實 DOM 做最少的修改。

問題來了：**Vue 要怎麼知道新列表的第 N 項，對應到舊列表的哪一項？**

### 沒有 key：就地更新

如果沒給 key，Vue 會採用「就地更新（in-place patch）」策略：新舊列表照順序一個一個對，第 1 個對第 1 個、第 2 個對第 2 個……能重用的 DOM 就重用，只改裡面的內容。多出來的就新建，少掉的就從尾巴刪。

在原始碼裡，這段邏輯叫做 \`patchUnkeyedChildren\`。

官方文件對這個策略的描述很精準：它很有效率，但**只適用於列表輸出不依賴子元件狀態或暫時 DOM 狀態（例如表單輸入值）的情況**。

### 有 key：用身分證找人

有 key 的話，Vue 會走 \`patchKeyedChildren\`，比對的依據就不是位置，而是 key：

1.  先從頭開始比，key 相同就直接 patch，遇到不同就停
2.  再從尾巴開始比，一樣 key 相同就 patch
3.  中間剩下的部分，如果只是新增或刪除，直接處理
4.  如果中間順序亂掉了，會建一張 key 對照表，再用「最長遞增子序列」找出哪些節點不用動、哪些需要搬移

演算法細節這篇先不深入，重點只有一個：**有 key 的時候，Vue 會搬移 DOM 而不是改寫 DOM。**

---

## 五、index 當 key 會出什麼事

### 1\\. 用開場的例子實際走一遍

刪除前：

| key | 資料 | DOM |
| --- | --- | --- |
| 0 | 買牛奶 | \`<li>\`①，input 裡有「要全脂的」 |
| 1 | 寫鐵人賽 | \`<li>\`② |
| 2 | 倒垃圾 | \`<li>\`③ |

刪除後，新的 vnode 是：

| key | 資料 |
| --- | --- |
| 0 | 寫鐵人賽 |
| 1 | 倒垃圾 |

Vue 的判斷過程：

-   key 0 新舊都有 → 同一個節點，重用 \`<li>\`①，把文字從「買牛奶」改成「寫鐵人賽」
-   key 1 新舊都有 → 重用 \`<li>\`②，文字改成「倒垃圾」
-   key 2 不見了 → 刪掉 \`<li>\`③

發現了嗎？**我們明明刪的是第一項，Vue 實際上刪掉的卻是最後一個 \`<li>\`。** 而 \`<li>\`① 裡面那個 input，因為它的值不是由 Vue 的資料控制的，Vue 只改了文字、沒碰它，所以「要全脂的」就留在原地，變成「寫鐵人賽」的備註了。

換成 \`:key="todo.id"\`：

-   舊的 key 是 \`1, 2, 3\`，新的是 \`2, 3\`
-   從尾巴比：3 對 3、2 對 2，都是同一個節點
-   剩下 key 1 → 刪掉 \`<li>\`①

只動了一個 DOM，而且刪的是對的那一個。

> 換句話說，**用 index 當 key，效果跟沒寫 key 幾乎一樣**，都是照位置在對。寫了等於沒寫。

### 2\\. 子元件的內部狀態會錯位

不只 input，只要子元件有自己的狀態，都會遇到同樣的事：

\`\`\`js
<!-- Counter.vue -->
<script setup>
import { ref } from 'vue'
defineProps(['label'])
const count = ref(0)
<\/script>

<template>
  <div>{{ label }}：{{ count }} <button @click="count++">+1</button></div>
</template>
\`\`\`

\`\`\`js
<Counter v-for="(item, index) in list" :key="index" :label="item.name" />
\`\`\`

在第一個 Counter 按幾下 +1，再刪掉第一筆資料，你會發現剛剛累積的數字留在「新的第一個」身上。原因一樣：key 0 還在，Vue 就認定元件實例不用換，只更新 \`label\` 這個 prop，\`count\` 這個內部狀態原封不動。

除了 \`ref\` 狀態，focus 游標位置、捲軸位置、\`<video>\` 播放進度，也都是同樣的道理。

### 3\\. 動畫會亂掉

使用 \`<TransitionGroup>\` 時 key 是必填，Vue 也是靠 key 判斷哪個元素要播離場動畫。用 index 的話，刪第一項時播離場動畫的會是最後一項，其他項目則只是文字被換掉，看起來就是畫面在閃。

### 4\\. 效能反而比較差

很多人以為 index 當 key「至少有寫」，效能應該還可以。但從上面的例子就能看出來：

-   用 id：刪一個 DOM
-   用 index：刪一個 DOM，**外加**更新後面每一個節點的內容

列表越長、每一項越複雜，差距就越明顯。

---

## 六、那什麼時候 index 可以用？

不是說 index 一定不能用，而是要知道代價。符合以下條件時，用 index 沒什麼問題：

-   列表是純展示，**不會新增、刪除、排序**
-   每一項**沒有自己的狀態**（沒有 input、沒有帶狀態的子元件）

例如評分星星：

\`\`\`js
<span v-for="n in 5" :key="n">⭐</span>
\`\`\`

這種列表位置就是它的身分，不會有換座位的問題。

---

## 七、好的 key 從哪裡來

### ✅ 後端給的 id

首選。資料庫的主鍵本來就是唯一且穩定的。

### ✅ 資料建立時就產生

前端自己新增的資料，可以在**建立資料的當下**就給它一個 id：

\`\`\`js
function addTodo(text) {
  todos.value.push({
    id: crypto.randomUUID(),
    text,
  })
}
\`\`\`

注意 \`crypto.randomUUID()\` 需要在安全環境（HTTPS 或 localhost）才能使用。如果環境不支援，用遞增的計數器也可以。

### ❌ 在 template 裡產生

\`\`\`js
<!-- 千萬不要 -->
<li v-for="todo in todos" :key="Math.random()">...</li>
\`\`\`

每次重新 render，key 都是新的，Vue 會認為每一項都是全新的節點，把整個列表砍掉重建。比 index 更糟。

### 其他規則

-   key 要用字串或數字這類原始值，不要用物件
-   同一層的 key 必須唯一
-   Vue 3 中 \`<template v-for>\` 的 key 要寫在 \`<template>\` 本身，不是寫在裡面的子元素上

---

## 八、延伸：key 不只能用在 v-for

理解「key 是身分證」之後，就會發現它還有一個很實用的用法：**換掉 key，強制元件重建。**

\`\`\`js
<UserForm :key="userId" :user-id="userId" />
\`\`\`

當 \`userId\` 從 A 換成 B，Vue 看到 key 不同，就會把舊的 \`UserForm\` 整個卸載、重新掛載一個新的。表單裡的輸入內容、內部狀態、\`onMounted\` 的邏輯全部重來一次。

這比在元件裡寫一堆 watch 去手動重置狀態乾淨得多。

---

## 九、小結

今天的重點其實只有一句話：

> **key 要跟著資料走，不要跟著位置走。**

-   key 是 Vue diff 時辨認節點的身分證
-   沒有 key 或用 index 當 key，Vue 都是照位置比對、就地更新
-   就地更新會讓 input 值、子元件狀態、動畫留在原來的位置，造成錯位
-   用 index 效能也不會比較好，刪前面的項目時反而要更新更多節點
-   靜態、不重排、無狀態的列表可以用 index
-   好的 key 來自後端 id，或是在建立資料時就產生
-   換 key 可以強制元件重建

明天見！
`,b=`---
title: "Vue 走過路過不要錯過 Day12 -v-on 與事件修飾符：.prevent、.stop 幫你省下的那幾行"
subtitle: "v-on 與事件修飾符：.prevent、.stop 幫你省下的那幾行"
day: 12
date: "2026-09-26"
excerpt: "寫原生 JS 的時候，下面兩段應該都不陌生： 我們真正想做的事只有 save() 和 like() 。那兩行 e.preventDefault() 、 e.stopPropagation() 算什麼？它們跟資料一點關係都沒有，只是在跟瀏覽器…"
source: "https://ithelp.ithome.com.tw/articles/10417556"
series: "ithome-ironman-2026"
---

寫原生 JS 的時候，下面兩段應該都不陌生：

\`\`\`js
// 表單送出，不要讓頁面重新整理
form.addEventListener('submit', (e) => {
  e.preventDefault()
  save()
})
 
// 卡片裡的愛心按鈕，不要連卡片一起點開
likeBtn.addEventListener('click', (e) => {
  e.stopPropagation()
  like()
})
\`\`\`

我們真正想做的事只有 \`save()\` 和 \`like()\`。那兩行 \`e.preventDefault()\`、\`e.stopPropagation()\` 算什麼？它們跟資料一點關係都沒有，只是在跟瀏覽器交代「這個事件要怎麼處理」。

Vue 的事件修飾符就是為了這幾行而存在的。今天從 \`v-on\` 開始，先補一下 JS 的事件流，再來看修飾符到底幫我們省了什麼。

---

## 一、結論先講

> 修飾符把「跟資料無關的 DOM 細節」從 method 搬到 template。

\`\`\`js
<form @submit.prevent="save">
\`\`\`

\`save\` 裡面不用再寫 \`e.preventDefault()\`，甚至連 \`e\` 都不用接。這帶來兩個好處：

-   method 只剩資料邏輯，讀起來就是「存檔」這件事
-   method 不依賴 event 物件，可以在別的地方直接呼叫，也比較好測試  
    所以省下的不只是一行字，而是讓 method 跟 DOM 脫鉤。

---

## 二、v-on 基本用法

### 縮寫

\`\`\`js
<button v-on:click="count++">+1</button>
<button @click="count++">+1</button>
\`\`\`

兩行完全一樣，實務上幾乎都用 \`@\`。

### 兩種寫法：method handler 與 inline handler

\`\`\`js
<script setup>
import { ref } from 'vue'
 
const count = ref(0)
 
function add(event) {
  console.log(event.target.tagName) // BUTTON
  count.value++
}
 
function addBy(n) {
  count.value += n
}
<\/script>
 
<template>
  <!-- method handler：只給函式名稱，Vue 會自動把 event 傳進去 -->
  <button @click="add">+1</button>
 
  <!-- inline handler：自己呼叫，event 不會自動傳進去 -->
  <button @click="addBy(5)">+5</button>
</template>
\`\`\`

Vue 在編譯時會判斷引號裡是「一個函式名稱」還是「一段運算式」：

-   函式名稱 → 直接當作 handler，事件觸發時會收到 event
-   運算式 → 包成 \`($event) => { addBy(5) }\`，event 被包在外層，你的函式拿不到

### 又要傳參數、又要 event

\`\`\`js
<button @click="addBy(5, $event)">+5</button>
<button @click="(e) => addBy(5, e)">+5</button>
\`\`\`

兩種都可以。不過看完今天的內容你會發現，很多時候之所以要拿 event，只是為了呼叫 \`preventDefault()\` 或 \`stopPropagation()\`，那其實交給修飾符就好，不用拿了。

### 綁在元件上

\`<MyButton @click="...">\` 監聽的是元件 emit 出來的事件（或是落到元件根元素上的原生事件，第七段會講到踩雷的情況），之後講元件事件那篇再展開。

---

## 三、先補 JS 基礎：事件流

修飾符大部分都在操作「事件流」。這段沒弄懂，\`.stop\`、\`.self\`、\`.capture\` 就只能死背。

### 事件的三個階段

點一下頁面上的某個按鈕，事件不是只發生在按鈕身上，而是走了一趟來回：

1.  **捕獲（capture）**：從 \`window\` 一路往下傳到按鈕
2.  **目標（target）**：抵達按鈕本身
3.  **冒泡（bubble）**：從按鈕一路往上傳回 \`window\`  
    \`addEventListener\` 預設在冒泡階段觸發，所以我們平常感覺到的是「內層先、外層後」。

### preventDefault 和 stopPropagation 是兩件事

這兩個常被混在一起講，但擋的東西完全不同：

|  | 擋的是什麼 | 例子 |
| --- | --- | --- |
| \`preventDefault()\` | 瀏覽器的預設行為 | 表單送出會重新整理、\`<a>\` 會跳頁、checkbox 會打勾 |
| \`stopPropagation()\` | 事件繼續傳遞 | 外層元素的 click 監聽收不到 |

呼叫 \`stopPropagation()\` 擋不住跳頁；呼叫 \`preventDefault()\`，外層還是照樣收到事件。

### target 與 currentTarget

-   \`e.target\`：實際被點到的元素，可能是最裡面的 \`<span>\`
-   \`e.currentTarget\`：這個監聽器綁在誰身上  
    後面講 \`.self\` 的時候，就是靠這兩個的比較。

### 動手看看

把這段丟到 [SFC Playground](https://play.vuejs.org/)：

\`\`\`js
<script setup>
import { ref } from 'vue'
 
const logs = ref([])
 
function log(name) {
  logs.value.push(name)
}
<\/script>
 
<template>
  <div class="box outer" @click="log('outer')">
    outer
    <div class="box middle" @click="log('middle')">
      middle
      <div class="box inner" @click="log('inner')">inner</div>
    </div>
  </div>
 
  <button @click="logs = []">清空</button>
  <p>{{ logs.join(' → ') }}</p>
</template>
 
<style>
.box { padding: 16px; margin: 8px; border: 1px solid #999; cursor: pointer; }
.outer { background: #fde68a; }
.middle { background: #bbf7d0; }
.inner { background: #bfdbfe; }
</style>
\`\`\`

點 inner 會得到：

\`\`\`js
inner → middle → outer
\`\`\`

這就是冒泡。接下來每介紹一個修飾符，都可以回來改這段，看順序怎麼變。

---

## 四、常用修飾符與原生寫法對照

| 修飾符 | 等同原生 JS |
| --- | --- |
| \`.prevent\` | \`e.preventDefault()\` |
| \`.stop\` | \`e.stopPropagation()\` |
| \`.self\` | \`if (e.target !== e.currentTarget) return\` |
| \`.once\` | \`addEventListener(type, fn, { once: true })\` |
| \`.capture\` | \`addEventListener(type, fn, { capture: true })\` |
| \`.passive\` | \`addEventListener(type, fn, { passive: true })\` |

### .prevent

\`\`\`js
<form @submit.prevent="save">...</form>
 
<a href="/detail" @click.prevent="openModal">看詳情</a>
\`\`\`

也可以只寫修飾符、不給 handler，單純擋掉預設行為：

\`\`\`js
<form @submit.prevent>...</form>
\`\`\`

### .stop

回到開場的卡片：

\`\`\`js
<div class="card" @click="openDetail">
  <img :src="product.img" />
  <h3>{{ product.name }}</h3>
  <button @click.stop="like">♥</button>
</div>
\`\`\`

點愛心只會按讚，不會連卡片一起打開。

### .self

最經典的場景是 Modal 的遮罩：點遮罩關閉，點內容不關閉。

\`\`\`js
<div class="overlay" @click.self="close">
  <div class="modal">
    <h2>確認刪除？</h2>
    <p>刪除後無法復原</p>
    <button>確定</button>
  </div>
</div>
\`\`\`

只有 \`e.target\` 是 overlay 本身的時候才會觸發。點 modal 裡的文字，target 是 \`<p>\` 或 \`<h2>\`，不是 overlay，所以不會關。

### .self 和 .stop 差在哪？

這兩個都能做到「點裡面的時候，外面不要反應」，但方向剛好相反：

-   **\`.stop\` 寫在內層**：我把事件擋下來，不讓它往外傳
-   **\`.self\` 寫在外層**：事件照樣傳上來，但不是我本人被點到，我就不理  
    用三層 demo 改 middle 來對照，同樣點 inner：

\`\`\`js
<!-- middle 改成 .stop -->
<div class="box middle" @click.stop="log('middle')">
// 結果：inner → middle（outer 收不到）
 
<!-- middle 改成 .self -->
<div class="box middle" @click.self="log('middle')">
// 結果：inner → outer（middle 跳過，但事件還是傳到 outer）
\`\`\`

所以什麼時候只能用哪一個？

-   **卡片只能用 \`.stop\`**：如果改成在卡片上寫 \`.self\`，點到卡片裡的圖片或標題時，target 是 \`<img>\`、\`<h3>\`，卡片反而打不開了
-   **Modal 遮罩適合用 \`.self\`**：modal 裡的元素很多，不可能每個都加 \`.stop\`。就算只在 \`.modal\` 外框加一個 \`.stop\`，也會把事件擋死，更外層的監聽（例如綁在 \`document\` 上的）通通收不到

### .once

\`\`\`js
<button @click.once="startMusic">開始播放</button>
\`\`\`

觸發一次之後，監聽器就被移除。要注意它是「這個元素這輩子只觸發一次」，**不是防連點**。如果拿來防表單重複送出，送出失敗想再按一次時，按鈕已經沒反應了。防連點還是用 loading 狀態加上 \`:disabled\` 比較穩。

### .capture

把三層 demo 的 outer 改成：

\`\`\`js
<div class="box outer" @click.capture="log('outer')">
\`\`\`

點 inner 會得到：

\`\`\`js
outer → inner → middle
\`\`\`

outer 在捕獲階段就先觸發了。實務上比較少用，常見於想在所有子元素處理之前先攔截，例如統一記錄使用者的點擊行為。

### .passive

\`\`\`js
<div @scroll.passive="onScroll">...</div>
<div @touchmove.passive="onTouchMove">...</div>
\`\`\`

意思是告訴瀏覽器：「這個監聽器保證不會呼叫 \`preventDefault()\`」。瀏覽器就不用等 handler 跑完才決定要不要捲動，捲動會比較順。適合用在 scroll、touchmove、wheel 這類觸發頻率很高的事件。

---

## 五、串接順序會影響結果

修飾符可以串在一起用：

\`\`\`js
<a href="/a" @click.stop.prevent="go">...</a>
\`\`\`

大部分情況下順序沒差，但遇到 \`.self\` 就有差了，因為修飾符會**照寫的順序**一個一個檢查：

\`\`\`js
<!-- 先 prevent 再檢查 self：點自己或點子元素，預設行為都會被擋 -->
<a href="/a" @click.prevent.self="go">
  <span>點我</span>
</a>
 
<!-- 先檢查 self：點到子元素就直接結束，prevent 根本沒被執行 -->
<a href="/a" @click.self.prevent="go">
  <span>點我</span>
</a>
\`\`\`

第二種寫法點到 \`<span>\` 時，\`.self\` 判斷「不是 a 本人」就直接結束，\`preventDefault()\` 沒被呼叫，頁面就跳走了。為什麼會這樣，第八段看編譯結果就懂了。

---

## 六、按鍵與滑鼠修飾符

### 按鍵修飾符

\`\`\`js
<input @keyup.enter="submit" />
<input @keyup.esc="clear" />
<input @keyup.page-down="onPageDown" />
\`\`\`

Vue 比對的是 \`KeyboardEvent.key\`，任何合法的 key 名稱轉成 kebab-case 都能當修飾符（\`PageDown\` → \`.page-down\`）。常用的有內建別名：

-   \`.enter\`、\`.tab\`、\`.esc\`、\`.space\`
-   \`.delete\`（Delete 和 Backspace 都算）
-   \`.up\`、\`.down\`、\`.left\`、\`.right\`

### 系統鍵與 .exact

-   \`.ctrl\`、\`.alt\`、\`.shift\`
-   \`.meta\`（Mac 是 ⌘，Windows 是 ⊞）

\`\`\`js
<!-- Ctrl + Enter -->
<textarea @keydown.ctrl.enter="send"></textarea>
 
<!-- 只有 Ctrl，沒有同時按住其他系統鍵 -->
<button @click.ctrl.exact="onCtrlClick">A</button>
 
<!-- 完全沒按任何系統鍵 -->
<button @click.exact="onClick">B</button>
\`\`\`

組合鍵建議用 \`keydown\`。用 \`keyup.ctrl\` 的話，要按住 Ctrl 的同時放開另一個鍵才會觸發，單獨放開 Ctrl 是不會觸發的。

來看一個很常見的需求：聊天輸入框，Enter 送出、Shift + Enter 換行。

\`\`\`js
<textarea
  v-model="message"
  @keydown.enter.exact.prevent="send"
></textarea>
\`\`\`

-   只按 Enter：\`.exact\` 通過 → \`.prevent\` 擋掉換行 → 呼叫 \`send\`
-   按 Shift + Enter：\`.exact\` 不通過，直接結束，瀏覽器照預設行為換行  
    一行就搞定，原生寫法要自己判斷 \`e.shiftKey\`、\`e.ctrlKey\`、\`e.altKey\`、\`e.metaKey\` 四個。

### 滑鼠修飾符

-   \`.left\`、\`.right\`、\`.middle\`

\`\`\`js
<div @click.right.prevent="openContextMenu">按右鍵開選單</div>
\`\`\`

有個小細節：瀏覽器按右鍵其實不會觸發 \`click\`，所以 Vue 編譯時會把 \`@click.right\` 轉成 \`contextmenu\` 事件，搭配 \`.prevent\` 就能擋掉瀏覽器原生的右鍵選單。

---

## 七、踩雷區

### 1\\. .passive 和 .prevent 不要一起用

\`.passive\` 本身就是承諾「不會擋預設行為」，再加 \`.prevent\` 會被忽略，瀏覽器也可能在 console 丟警告。Vue 官方文件也明確說不要這樣寫。

### 2\\. .stop 用太兇，外層監聽收不到

很常見的「點外面關閉下拉選單」：

\`\`\`js
<script setup>
import { onMounted, onUnmounted } from 'vue'
 
function closeDropdown() {
  // 關閉選單
}
 
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})
 
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
<\/script>
\`\`\`

如果頁面上某個元件為了自己方便加了 \`@click.stop\`，點到它的時候事件永遠傳不到 \`document\`，下拉選單就關不起來。這種 bug 很難找，因為兩段程式碼可能相隔很遠。

原則：\`.stop\` 只用在「真的要阻止外層行為」的地方。如果只是「外層不要反應」，優先考慮在外層用 \`.self\`，或在外層的 handler 裡自己判斷 target。

### 3\\. 中文輸入法的 Enter

用注音、倉頡選字時，會按 Enter 確認選字。在某些瀏覽器（Safari 最常見），這個 Enter 也會觸發 \`keydown.enter\`，結果字還沒打完，訊息就送出去了。

這時候就得拿 event 出來判斷：

\`\`\`js
function send(e) {
  // 輸入法組字中按下的 Enter 不算
  if (e.isComposing || e.keyCode === 229) return
  // 送出訊息
}
\`\`\`

\`keyCode\` 雖然已經被標為棄用，但各瀏覽器在組字時的行為不一致，目前這是很常見的相容寫法。這也說明修飾符不是萬能的，遇到修飾符表達不了的條件，還是回到 handler 裡處理。

### 4\\. 舊文章裡的 .native

如果你在網路上看到 \`@click.native\`，那是 Vue 2 的寫法，Vue 3 已經移除了。現在的規則是：

-   元件有在 \`emits\` 宣告 \`click\` → \`@click\` 只監聽元件 emit 出來的事件
-   沒有宣告 → 會當成原生監聽器，落到元件的根元素上  
    所以這樣寫會踩雷：

\`\`\`js
<!-- MyButton.vue -->
<script setup>
defineEmits(['click'])
<\/script>
 
<template>
  <button>按我</button>
</template>
\`\`\`

\`\`\`js
<!-- 父元件 -->
<MyButton @click="hello" />
\`\`\`

\`hello\` 永遠不會被呼叫。因為宣告了 \`click\` 是元件事件，Vue 就不會把它綁到 \`<button>\` 上，但元件裡又從來沒有 emit 過。

---

## 八、Vue 在背後做了什麼

跟 Day 2 一樣，把這段丟到 SFC Playground，切到 JS 分頁看編譯結果：

\`\`\`js
<template>
  <form @submit.prevent="save">
    <input @keyup.enter="search" />
    <button @click.once="start">開始</button>
  </form>
</template>
\`\`\`

簡化之後大致長這樣（實際輸出依版本略有不同）：

\`\`\`js
_createElementVNode("form", {
  onSubmit: _withModifiers(save, ["prevent"])
}, [
  _createElementVNode("input", {
    onKeyup: _withKeys(search, ["enter"])
  }),
  _createElementVNode("button", {
    onClickOnce: start
  }, "開始")
])
\`\`\`

可以看出修飾符其實分成三類：

1.  **\`.prevent\`、\`.stop\`、\`.self\`、\`.exact\`、滑鼠鍵** → 用 \`withModifiers\` 包一層函式，在呼叫你的 handler 之前先做檢查
2.  **按鍵修飾符** → 用 \`withKeys\` 包一層，比對按下的是不是指定的鍵
3.  **\`.once\`、\`.capture\`、\`.passive\`** → 直接變成事件名稱的後綴（\`onClickOnce\`），最後當作 \`addEventListener\` 的 options 傳進去。因為原生本來就支援，不需要另外包函式  
    \`withModifiers\` 的核心邏輯簡化後長這樣：

\`\`\`js
const guards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  // ...其他修飾符
}
 
function withModifiers(fn, modifiers) {
  return (event, ...args) => {
    for (const m of modifiers) {
      const guard = guards[m]
      // guard 回傳 true 就直接結束，不呼叫 fn
      if (guard && guard(event)) return
    }
    return fn(event, ...args)
  }
}
\`\`\`

這就是一個高階函式：接收一個函式，回傳一個包裝過的新函式。

回頭看第五段的順序問題就很清楚了：

-   \`stop\`、\`prevent\` 做完事情後回傳 \`undefined\`，迴圈繼續往下走
-   \`self\` 在「不是本人」時回傳 \`true\`，迴圈直接 \`return\`  
    所以 \`.self.prevent\` 點到子元素時，第一圈就 \`return\` 了，\`prevent\` 根本輪不到執行。

---

## 九、小結

今天的重點一句話：

> **method 只管資料，事件的細節交給 template 宣告。**

-   \`@\` 是 \`v-on:\` 的縮寫；給函式名稱會自動收到 event，寫運算式要用 \`$event\` 拿
-   \`preventDefault\` 擋預設行為，\`stopPropagation\` 擋事件傳遞，是兩件不同的事
-   \`.stop\` 寫在內層、擋住事件；\`.self\` 寫在外層、不理子元素傳上來的事件
-   \`.once\` 不是防連點，\`.passive\` 不要跟 \`.prevent\` 一起用
-   修飾符照順序執行，遇到 \`.self\` 要特別注意
-   \`.stop\` 用太多會讓外層的監聽收不到
-   修飾符背後就是 \`withModifiers\` 包的一層高階函式  
    明天見！
`,k=`---
title: "Vue 走過路過不要錯過 Day13 -v-model 表單綁定：input、checkbox、select 與修飾符"
subtitle: "v-model 表單綁定：input、checkbox、select 與修飾符"
day: 13
date: "2026-09-27"
excerpt: "登入、註冊、搜尋、篩選條件，幾乎每個專案都少不了表單。只要有使用者輸入，就得處理一件事：畫面上輸入框裡的值，要怎麼跟程式裡的資料保持一致？ v-model 大家都會用，但先來試試這三題： 多個 checkbox 綁同一個變數，這個變數除了陣…"
source: "https://ithelp.ithome.com.tw/articles/10417957"
series: "ithome-ironman-2026"
---

登入、註冊、搜尋、篩選條件，幾乎每個專案都少不了表單。只要有使用者輸入，就得處理一件事：畫面上輸入框裡的值，要怎麼跟程式裡的資料保持一致？

v-model 大家都會用，但先來試試這三題：

1.  多個 checkbox 綁同一個變數，這個變數除了陣列，還能用什麼型別？
2.  \`v-model.trim\` 只會修掉資料的空白，還是連輸入框上顯示的文字也會變？
3.  select 用 \`:value\` 綁物件時，初始值給一個「內容相同，但不是同一個」的物件，會被選中嗎？

三題都有把握的話，可以直接找文中的「💡 進階補充」區塊來看。沒把握也沒關係，我們從頭開始。

---

## 一、沒有 v-model 的時候

先用原生 JS 做一件簡單的事：輸入框打字，下方同步顯示。

\`\`\`js
// <input id="name" />
// <p id="output"></p>

const input = document.querySelector('#name')
const output = document.querySelector('#output')

let name = ''

input.addEventListener('input', (e) => {
  name = e.target.value      // 畫面 → 資料
  output.textContent = name  // 資料 → 畫面
})
\`\`\`

兩個方向都要自己處理。只要程式裡其他地方改了 \`name\`，就得記得回頭更新 \`input.value\`，不然畫面和資料就會對不上。

換成 Vue 之後，「資料 → 畫面」交給響應式系統處理，我們只需要負責「畫面 → 資料」：

\`\`\`js
<script setup>
import { ref } from 'vue'

const name = ref('')
<\/script>

<template>
  <input :value="name" @input="name = $event.target.value" />
  <p>{{ name }}</p>
</template>
\`\`\`

\`:value\` 加上 \`@input\` 的組合太常出現，所以 Vue 把它們合成一個指令：

\`\`\`js
<input v-model="name" />
\`\`\`

---

## 二、v-model 會依元素類型換一套做法

v-model 不是永遠都展開成 \`:value\` 加 \`@input\`，而是看你綁在什麼元素上：

| 元素 | 綁定的屬性 | 監聽的事件 |
| --- | --- | --- |
| \`<input type="text">\`、\`<textarea>\` | \`value\` | \`input\` |
| \`<input type="checkbox">\`、\`<input type="radio">\` | \`checked\` | \`change\` |
| \`<select>\` | \`value\` | \`change\` |

checkbox 綁的是 \`checked\`，因為勾選框真正會變動的狀態是「有沒有被勾起來」；\`value\` 只是勾選後代表的值，使用者並不會去改它。

把範例貼到 [Vue SFC Playground](https://play.vuejs.org/)，切到 JS 分頁，會看到類似這樣的編譯結果：

\`\`\`js
_withDirectives(_createElementVNode("input", {
  "onUpdate:modelValue": $event => (name.value = $event)
}, null, 512), [
  [_vModelText, name.value]
])
\`\`\`

實際上負責處理的是內建指令 \`vModelText\`；換成 checkbox 會變成 \`vModelCheckbox\`，select 則是 \`vModelSelect\`。

> 💡 **進階補充：動態 type**
> 
> 如果寫成 \`<input :type="inputType" v-model="x">\`，編譯時無法確定元素的類型，所以會改用 \`vModelDynamic\`。它在執行期看 \`tagName\` 和 \`type\` 屬性，再轉給對應的指令處理。原始碼裡的 \`resolveDynamicModel\` 就是一個簡單的 \`switch\`：
> 
> \`\`\`js
> function resolveDynamicModel(tagName, type) {
>   switch (tagName) {
>     case 'SELECT':
>       return vModelSelect
>     case 'TEXTAREA':
>       return vModelText
>     default:
>       switch (type) {
>         case 'checkbox': return vModelCheckbox
>         case 'radio':    return vModelRadio
>         default:         return vModelText
>       }
>   }
> }
> \`\`\`

---

## 三、input 與 textarea

\`\`\`js
<script setup>
import { ref } from 'vue'

const message = ref('')
const note = ref('')
<\/script>

<template>
  <input v-model="message" />
  <textarea v-model="note"></textarea>
</template>
\`\`\`

textarea 裡寫 \`{{ note }}\` 插值是沒有效果的，一定要用 v-model。

### 中文輸入法

在注音或拼音輸入法組字期間，v-model 不會更新資料。打「ㄋㄧˇ」還沒選字前，\`message\` 都不會變；選字完成變成「你」之後才會同步。

如果要做「邊打邊搜尋」這類需要即時反應的功能，就要改回手動綁定：

\`\`\`js
<input :value="keyword" @input="keyword = $event.target.value" />
\`\`\`

> 💡 **進階補充：它是怎麼辦到的**
> 
> \`vModelText\` 另外監聽了 \`compositionstart\` 和 \`compositionend\` 兩個事件：
> 
> \`\`\`js
> function onCompositionStart(e) {
>   e.target.composing = true
> }
> 
> function onCompositionEnd(e) {
>   const target = e.target
>   if (target.composing) {
>     target.composing = false
>     target.dispatchEvent(new Event('input'))
>   }
> }
> \`\`\`
> 
> 組字開始時，在元素上掛一個 \`composing\` 旗標，\`input\` 監聽器看到旗標就直接 \`return\`。組字結束時，Vue 會自己補發一次 \`input\` 事件，資料才更新。
> 
> 另外，加上 \`.lazy\` 時這兩個監聽器根本不會被掛上去，因為 \`.lazy\` 只在 \`change\` 時同步，本來就不會被組字過程干擾。

---

## 四、checkbox 與 radio

### 單一 checkbox：綁 boolean

\`\`\`js
<input type="checkbox" v-model="agree" />
\`\`\`

如果後端要的不是 \`true\` / \`false\`，可以用 \`true-value\` 和 \`false-value\` 指定：

\`\`\`js
<input
  type="checkbox"
  v-model="subscribe"
  true-value="yes"
  false-value="no"
/>
\`\`\`

### 多個 checkbox：綁同一個陣列

\`\`\`js
<script setup>
import { ref } from 'vue'

const hobbies = ref([])
<\/script>

<template>
  <label><input type="checkbox" value="閱讀" v-model="hobbies" /> 閱讀</label>
  <label><input type="checkbox" value="運動" v-model="hobbies" /> 運動</label>
  <label><input type="checkbox" value="音樂" v-model="hobbies" /> 音樂</label>
</template>
\`\`\`

勾選的值會自動加入陣列，取消時自動移除，不用自己寫 \`push\` 或 \`splice\`。

### radio：綁單一值

\`\`\`js
<label><input type="radio" value="male" v-model="gender" /> 男</label>
<label><input type="radio" value="female" v-model="gender" /> 女</label>
\`\`\`

同一組 radio 綁同一個變數，Vue 會自動處理互斥。

> 💡 **進階補充：第 1 題，也可以綁 Set**
> 
> \`vModelCheckbox\` 在 \`change\` 時會先判斷資料的型別：
> 
> \`\`\`js
> if (isArray(modelValue)) {
>   // 陣列：用 looseIndexOf 找位置，再 concat 或 splice
> } else if (isSet(modelValue)) {
>   const cloned = new Set(modelValue)
>   checked ? cloned.add(elementValue) : cloned.delete(elementValue)
>   assign(cloned)
> } else {
>   // 單一 checkbox：true / false 或 true-value / false-value
> }
> \`\`\`
> 
> 所以 \`const hobbies = ref(new Set())\` 也能正常運作，而且 \`select multiple\` 同樣支援 Set。
> 
> 不過要注意比對方式不同：陣列用 \`looseIndexOf\` 做**深層比較**，Set 用的是 \`has\`，屬於**參考比較**。value 綁物件時，用 Set 必須是同一個物件參考才會被判定為勾選。

---

## 五、select

\`\`\`js
<script setup>
import { ref } from 'vue'

const city = ref('')
const cityOptions = [
  { id: 1, label: '台北', value: 'taipei' },
  { id: 2, label: '台中', value: 'taichung' },
  { id: 3, label: '台南', value: 'tainan' }
]
<\/script>

<template>
  <select v-model="city">
    <option disabled value="">請選擇城市</option>
    <option v-for="item in cityOptions" :key="item.id" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>
\`\`\`

那個 \`disabled\` 的空選項不只是提示文字。當 v-model 的初始值對不到任何 option 時，iOS 上會出現選不到第一個選項的問題，官方建議加上它。

多選的話加上 \`multiple\`，並綁定陣列即可。

### value 也可以綁物件

原生 HTML 的 \`value\` 只能是字串，但在 Vue 裡用 \`:value\` 可以綁任何型別：

\`\`\`js
<select v-model="selectedCity">
  <option v-for="item in cityOptions" :key="item.id" :value="item">
    {{ item.label }}
  </option>
</select>
\`\`\`

選完之後 \`selectedCity\` 就是整個物件，不用再拿 id 回頭去陣列裡找。

> 💡 **進階補充：第 3 題，會被選中**
> 
> 單選 select 在比對選項時用的是 \`looseEqual\`：
> 
> \`\`\`js
> } else if (looseEqual(getValue(option), value)) {
>   if (el.selectedIndex !== i) el.selectedIndex = i
>   return
> }
> \`\`\`
> 
> \`looseEqual\` 會深層比較物件內容，所以就算初始值是從 API 拿回來的新物件，只要內容相同就會被選中，radio 也是一樣的邏輯。
> 
> 至於 \`getValue\` 為什麼能拿到物件？因為 Vue 把 \`:value\` 綁定的原始值存在元素的 \`_value\` 屬性上，而不是轉成字串寫進 DOM。

---

## 六、修飾符

| 修飾符 | 作用 |
| --- | --- |
| \`.lazy\` | 改成監聽 \`change\`，也就是離開輸入框後才同步 |
| \`.number\` | 嘗試轉成數字，轉不了就保留原值 |
| \`.trim\` | 去掉頭尾空白 |

\`\`\`js
<input v-model.lazy.trim="username" />
<input v-model.number="age" />
\`\`\`

另外，\`type="number"\` 的 input 會自動套用 \`.number\`，不需要另外加。

> 💡 **進階補充：第 2 題，連畫面也會變**
> 
> \`\`\`js
> if (trim || castToNumber) {
>   addEventListener(el, 'change', () => {
>     el.value = castValue(el.value, trim, castToNumber)
>   })
> }
> \`\`\`
> 
> 打字期間輸入框保留你打的空白，但一離開輸入框觸發 \`change\`，Vue 就會把**畫面上的值**也一起修掉。\`.number\` 也是一樣，失焦後顯示值會變成轉換後的結果。
> 
> 還有一點：\`.number\` 內部用的是 \`looseToNumber\`，本質上就是 \`parseFloat\`，轉出 \`NaN\` 時才保留原值。所以輸入 \`'12abc'\` 會得到 \`12\`，而不是維持字串。如果需要嚴格驗證，還是要自己處理。

---

## 七、常見踩坑

**1\\. HTML 上寫的初始值會被忽略**

\`\`\`js
<!-- ❌ value="預設文字" 不會出現 -->
<input v-model="message" value="預設文字" />
\`\`\`

v-model 會忽略元素上的 \`value\`、\`checked\`、\`selected\` 屬性，初始值要寫在 ref 裡。

**2\\. 數字欄位清空會得到空字串**

就算是 \`type="number"\`，使用者把欄位清空時拿到的也是 \`''\`，送出前記得處理。

**3\\. 不能直接對 props 用 v-model**

props 是單向資料流，子元件不能直接修改。自訂元件要雙向綁定，得透過元件的 v-model 機制（Vue 3.4 之後可以用 \`defineModel\`）。

---

## 八、對照一下 React

有寫過 React 的話，可以這樣對照：React 沒有 v-model，每個輸入框都要自己寫 \`value\` 加 \`onChange\`，也就是所謂的受控元件。

\`\`\`js
function Form() {
  const [name, setName] = useState('')

  return <input value={name} onChange={e => setName(e.target.value)} />
}
\`\`\`

有個容易搞混的地方：React 的 \`onChange\` 每打一個字就會觸發，行為對應的是原生的 **\`input\`** 事件，而不是原生的 \`change\` 事件。

所以：

-   React 的 \`onChange\` ≈ Vue 預設的 v-model（監聽 \`input\`）
-   Vue 的 \`.lazy\`（監聽原生 \`change\`）在 React 裡沒有直接對應，要改用 \`onBlur\` 之類的方式自己處理

兩者的核心想法一樣，都是「輸入框的值由狀態決定」。差別在於 Vue 把常見的模式包成指令，還順手處理了中文輸入法組字、型別轉換這些細節；React 則把這些都交給開發者自己寫。

---

## 九、練習

### 基礎：報名表單

\`\`\`js
<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  age: null,
  hobbies: [],
  city: '',
  agree: false
})
<\/script>

<template>
  <form @submit.prevent="console.log(form)">
    <input v-model.trim="form.name" placeholder="姓名" />
    <input type="number" v-model="form.age" placeholder="年齡" />

    <label><input type="checkbox" value="閱讀" v-model="form.hobbies" /> 閱讀</label>
    <label><input type="checkbox" value="運動" v-model="form.hobbies" /> 運動</label>

    <select v-model="form.city">
      <option disabled value="">請選擇城市</option>
      <option value="taipei">台北</option>
      <option value="tainan">台南</option>
    </select>

    <label><input type="checkbox" v-model="form.agree" /> 我同意服務條款</label>
    <button type="submit">送出</button>
  </form>

  <pre>{{ form }}</pre>
</template>
\`\`\`

可以試試看：姓名前後多打空白再離開輸入框、清空年齡欄位，觀察 \`<pre>\` 裡的資料怎麼變化。

### 挑戰：三種 UI 共用同一份資料

同一個 \`selected\` 陣列，同時綁給一排 checkbox、一個 \`select multiple\`，以及一排可以點 × 移除的標籤。

\`\`\`js
<script setup>
import { ref } from 'vue'

const cityOptions = [
  { id: 1, label: '台北', value: 'taipei' },
  { id: 2, label: '台中', value: 'taichung' },
  { id: 3, label: '台南', value: 'tainan' }
]

const selected = ref([])

const labelOf = (value) => cityOptions.find(c => c.value === value)?.label

function remove(value) {
  selected.value = selected.value.filter(v => v !== value)
}
<\/script>

<template>
  <label v-for="item in cityOptions" :key="item.id">
    <input type="checkbox" :value="item.value" v-model="selected" />
    {{ item.label }}
  </label>

  <select v-model="selected" multiple>
    <option v-for="item in cityOptions" :key="item.id" :value="item.value">
      {{ item.label }}
    </option>
  </select>

  <span v-for="value in selected" :key="value">
    {{ labelOf(value) }}
    <button @click="remove(value)">×</button>
  </span>
</template>
\`\`\`

動手之前先想想：在 checkbox 勾選「台南」，select 裡的台南會不會被選起來？點標籤的 × 呢？

三個 UI 都只是同一個陣列的投影。不管從哪裡改，改的都是 \`selected\`，其他兩個自然就會跟著更新。這也是 v-model 會忽略 HTML 初始值的原因：**資料才是唯一的真相來源。**

---
`,w=`---
title: "Vue 走過路過不要錯過 Day14 -想直接操作 DOM 的時候：模板 ref 與 useTemplateRef"
subtitle: "想直接操作 DOM 的時候：模板 ref 與 useTemplateRef"
day: 14
date: "2026-09-28"
excerpt: "寫 jQuery 的年代，要對某個元素做事，第一步通常是 $('#xxx') 把它抓出來。來到 Vue 之後，大部分時間我們改資料、畫面自己跟著變，已經很少需要親手碰 DOM。 但「很少」不等於「不用」。讓 input 自動聚焦、捲動到某個…"
source: "https://ithelp.ithome.com.tw/articles/10418397"
series: "ithome-ironman-2026"
---

寫 jQuery 的年代，要對某個元素做事，第一步通常是 \`$('#xxx')\` 把它抓出來。來到 Vue 之後，大部分時間我們改資料、畫面自己跟著變，已經很少需要親手碰 DOM。

但「很少」不等於「不用」。讓 input 自動聚焦、捲動到某個位置、量元素的寬高，或把元素交給 Bootstrap、Chart.js 這類第三方套件，這些事情 Vue 的響應式幫不上忙，最後還是得拿到那個真實的 DOM 節點。

這篇就來聊 Vue 裡拿 DOM 的正確方式：模板 ref，以及 Vue 3.5 新增的 \`useTemplateRef\`。後半段會拿我自己以前寫的電商後台當例子，回頭檢查當時的 Bootstrap Modal 寫法漏了什麼。

---

## 為什麼不直接 document.querySelector？

在元件裡寫 \`document.querySelector('#myInput')\` 其實跑得動，但會遇到幾個問題：

1.  **元件會被重複使用。** 同一個元件在頁面上出現三次，\`#myInput\` 就有三個，\`querySelector\` 只會抓到第一個，而且不一定是你這個元件的那一個。
2.  **它不知道元素什麼時候存在。** 元素如果包在 \`v-if\` 裡，條件為 false 時根本不在 DOM 上；切換回來後又是一個新的節點。
3.  **它是往整份 document 找。** 元件應該只管自己的範圍，往外找容易抓到別人的東西。

模板 ref 解決的就是這些：它讓「這個元件實例」拿到「自己模板裡的那個元素」，而且會跟著元素的掛載、卸載自動更新。

---

## 基本用法

### Vue 3.5 以前：ref 變數名稱 ＝ 模板上的字串

\`\`\`js
<script setup>
import { ref, onMounted } from 'vue'

// 變數名稱必須跟模板上 ref="searchInput" 一模一樣
const searchInput = ref(null)

onMounted(() => {
  searchInput.value.focus()
})
<\/script>

<template>
  <input ref="searchInput" placeholder="搜尋商品" />
</template>
\`\`\`

Vue 編譯時會看模板上的 \`ref="searchInput"\`，然後去 \`<script setup>\` 裡找同名的 ref 變數，把 DOM 元素塞進去。

這個寫法的連結是靠「名字剛好一樣」。哪天有人把變數改名成 \`inputEl\`，卻忘了改模板，不會有任何錯誤訊息，只會在執行到 \`.focus()\` 時噴出 \`Cannot read properties of null\`。

### Vue 3.5 之後：useTemplateRef

\`\`\`js
<script setup>
import { useTemplateRef, onMounted } from 'vue'

// 用字串明確指定要拿哪一個 ref，變數名稱可以自己取
const inputEl = useTemplateRef('search-input')

onMounted(() => {
  inputEl.value.focus()
})
<\/script>

<template>
  <input ref="search-input" placeholder="搜尋商品" />
</template>
\`\`\`

差別在於連結方式從「變數名稱對得上」變成「用字串指名」。變數叫什麼都可以，意圖也寫得更清楚：這個變數就是拿來接模板 ref 的，不是一般的響應式資料。

更大的好處是它可以寫在 composable 裡，後面的 Modal 例子就會用到。

### 什麼時候拿得到？

不管哪種寫法，在 \`<script setup>\` 最上層直接印出來都是 \`null\`：

\`\`\`js
const inputEl = useTemplateRef('search-input')
console.log(inputEl.value) // null
\`\`\`

\`<script setup>\` 的程式碼在元件「建立」時執行，這時候模板還沒渲染，DOM 自然不存在。要等到 \`onMounted\` 之後，元素掛上畫面，ref 才會有值。

如果元素包在 \`v-if\` 裡，條件變成 false 時 ref 會回到 \`null\`，所以在事件處理或 watch 裡使用時，記得先確認它存在。

---

## ref 掛在元件上：拿到的是元件實例

\`ref\` 不只可以放在 HTML 元素上，也可以放在子元件上。這時候拿到的不是 DOM，而是子元件的實例。

不過 \`<script setup>\` 的元件預設是封閉的，父層拿到實例也碰不到裡面的變數和方法。子元件要用 \`defineExpose\` 主動決定開放什麼：

\`\`\`js
// 子元件
<script setup>
const open = () => { /* ... */ }
const close = () => { /* ... */ }

defineExpose({ open, close })
<\/script>
\`\`\`

\`\`\`js
// 父元件
<script setup>
import { useTemplateRef } from 'vue'
import BaseModal from './BaseModal.vue'

const dialog = useTemplateRef('dialog')
<\/script>

<template>
  <button @click="dialog.open()">開啟</button>
  <BaseModal ref="dialog" />
</template>
\`\`\`

這個「預設封閉、主動開放」的設計很重要。子元件內部怎麼實作是它自己的事，父層只能用它願意給的介面，之後子元件要重構也不會影響到外面。

---

## 實戰：我的舊專案怎麼接 Bootstrap Modal

Bootstrap 的 Modal 是 ref 最典型的使用情境。它不看 Vue 的響應式資料，它要的是一個真實的 DOM 節點，拿到後自己去加 class、塞 backdrop、綁鍵盤事件。這些事 Vue 管不到，只能把元素交出去。

以前做 [HelmentShop](https://github.com/fabio7621/HelmentShop) 這個安全帽電商時，後台有商品、訂單、優惠券、文章好幾個 Modal，所以我把 Bootstrap Modal 的初始化抽成了一個 composable。當時專案用的是 Vue 3.4，還沒有 \`useTemplateRef\`：

\`\`\`js
// composables/useModal.js
import { onMounted, ref } from 'vue'
import BsModal from 'bootstrap/js/dist/modal'

export function useModal(modalRef) {
  const modal = ref(null)

  function openModal() {
    if (modal.value) {
      modal.value.show()
    }
  }

  function hideModal() {
    if (modal.value) {
      modal.value.hide()
    }
  }

  onMounted(() => {
    const modalElement = modalRef.value
    if (modalElement) {
      modal.value = new BsModal(modalElement)
    }
  })

  return { modal, openModal, hideModal }
}
\`\`\`

刪除商品的 Modal 元件這樣用：

\`\`\`js
// DelModal.vue
<script setup>
import { ref } from 'vue'
import { useModal } from '@/composables/useModal'

const modalRef = ref(null)
const { openModal, hideModal } = useModal(modalRef)

defineExpose({ openModal, hideModal })
<\/script>

<template>
  <div ref="modalRef" class="modal fade" tabindex="-1">
    <!-- 省略 modal 內容 -->
  </div>
</template>
\`\`\`

商品管理頁再透過元件 ref 呼叫：

\`\`\`js
// AdminProduct.vue
const delModalRef = ref(null)

function openDelModal(item) {
  Object.assign(tempProduct, { ...item })
  delModalRef.value.openModal()
}
\`\`\`

一個例子裡就用到了三件事：ref 拿 DOM 交給 Bootstrap、ref 拿子元件實例、\`defineExpose\` 開放方法給父層。當時寫完覺得很乾淨，現在回頭看，有幾個地方可以更好。

---

## 回頭檢查：漏掉的三件事

### 1\\. 沒有 dispose

元件被卸載時，Vue 會把自己渲染的 DOM 移除，但 Bootstrap 那邊不知道。

翻 Bootstrap 5 的原始碼會看到，它內部用一個 \`Map\` 記錄「哪個元素對應哪個實體」。元素從畫面上移除了，\`Map\` 還抓著它，這個元素就不會被垃圾回收。後台頁面切來切去，這些殘留會一直累積。

另一個比較容易被看見的狀況：Modal 開著的時候按瀏覽器上一頁，元件被卸載了，Bootstrap 塞在 \`<body>\` 上的 backdrop 還留在畫面上，整頁變成半透明黑色、什麼都點不到。

Bootstrap 有提供 \`dispose()\` 來清掉實體、事件和 backdrop，我們要做的是在元件卸載前呼叫它：

\`\`\`js
onBeforeUnmount(() => {
  modal?.dispose()
})
\`\`\`

這其實是使用第三方套件時的通則：**把 DOM 交給 Vue 管不到的東西，也要記得在元件離開時收回來。** 計時器、\`window\` 上的事件監聽、各種圖表套件都是同樣的道理。

> 補充：\`dispose()\` 會移除 backdrop，但不會還原 \`<body>\` 上的 \`modal-open\` class 和 \`overflow: hidden\`。如果你的 Modal 有可能在開著的狀態下被卸載，卸載時要另外把 body 的狀態清掉，不然頁面會卡在無法捲動。

### 2\\. Bootstrap 實體放進了 ref()

\`\`\`js
const modal = ref(null)
modal.value = new BsModal(modalElement)
\`\`\`

回想 Day 3 講的 Proxy：放進 \`ref()\` 的物件會被 Vue 包成響應式代理，讀寫屬性都會經過追蹤。

但這裡有任何畫面依賴 \`modal.value\` 的變化嗎？沒有。它只是一個讓我們呼叫 \`show()\`、\`hide()\` 的工具物件，Vue 完全不需要追蹤它。用一般變數存就好：

\`\`\`js
let modal = null
\`\`\`

如果真的有需要放進響應式結構（例如要 return 出去給外面判斷有沒有初始化完成），可以用 \`shallowRef\` 或 \`markRaw\`，告訴 Vue 不要往物件內部深入代理。

### 3\\. 靠變數名稱連結模板

\`DelModal.vue\` 裡的 \`const modalRef = ref(null)\` 和模板上的 \`ref="modalRef"\` 必須同名，composable 還要靠元件把 ref 傳進來。

五個 Modal 元件，每個都要重複「建 ref → 傳進 composable」這兩步，而且任何一個名字打錯都不會報錯。

---

## 用 useTemplateRef 改寫

\`\`\`js
// composables/useModal.js（Vue 3.5+）
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import BsModal from 'bootstrap/js/dist/modal'

export function useModal(refKey = 'modalRef') {
  // composable 自己去拿模板上的 ref
  const modalEl = useTemplateRef(refKey)
  // 外部實體，不需要響應式
  let modal = null

  onMounted(() => {
    modal = new BsModal(modalEl.value)
  })

  onBeforeUnmount(() => {
    modal?.dispose()
  })

  return {
    openModal: () => modal?.show(),
    hideModal: () => modal?.hide(),
  }
}
\`\`\`

元件裡的 script 只剩這樣：

\`\`\`js
// DelModal.vue
<script setup>
import { useModal } from '@/composables/useModal'

const { openModal, hideModal } = useModal('modalRef')

defineExpose({ openModal, hideModal })
<\/script>
\`\`\`

模板上的 \`ref="modalRef"\` 和父層的呼叫方式都不用動。

對照一下改了什麼：

|  | 舊寫法（3.4） | 新寫法（3.5+） |
| --- | --- | --- |
| 拿 DOM | 元件建 ref，再傳進 composable | composable 用字串自己拿 |
| Bootstrap 實體 | 放在 \`ref()\` 裡，被 Proxy 包起來 | 一般變數 |
| 卸載 | 沒處理 | \`onBeforeUnmount\` 裡 \`dispose()\` |

\`useTemplateRef\` 能寫在 composable 裡這點很關鍵。它只要在 \`setup\` 執行期間被呼叫就好，所以 composable 可以把「拿 DOM → 初始化 → 清理」整段生命週期包起來，元件完全不用知道細節。

---

## 補充：v-for 裡的 ref 與函式 ref

**v-for 裡的 ref 會拿到陣列：**

\`\`\`js
<script setup>
import { useTemplateRef, onMounted } from 'vue'

const list = ['安全帽', '護目鏡', '手套']
const itemEls = useTemplateRef('items')

onMounted(() => {
  console.log(itemEls.value) // [li, li, li]
})
<\/script>

<template>
  <ul>
    <li v-for="item in list" :key="item" ref="items">{{ item }}</li>
  </ul>
</template>
\`\`\`

要注意的是，官方文件有提醒這個陣列的順序**不保證**跟原始資料一樣。如果需要對應到某筆資料，最好用資料本身的 id 去找，不要依賴索引。

**函式 ref：** \`:ref\` 也可以綁一個函式，元素掛載時會傳入元素，卸載時傳入 \`null\`。適合需要自己決定怎麼存的情況，例如存進以 id 為 key 的物件：

\`\`\`js
<li
  v-for="item in products"
  :key="item.id"
  :ref="(el) => { itemMap[item.id] = el }"
>
  {{ item.title }}
</li>
\`\`\`

---

## 什麼時候不該用 ref？

有了 ref 之後，很容易又回到 jQuery 的習慣：想改文字就拿元素改 \`textContent\`，想隱藏就改 \`style.display\`，想切換樣式就 \`classList.add\`。

這些在 Vue 裡都不該用 ref 做。因為 Vue 會根據資料重新渲染，你手動改的 DOM 下一次更新時可能被蓋掉，而且資料和畫面從此對不起來。

我自己的判斷方式是問一句：**這件事能不能用「資料」描述？**

-   文字內容、顯示或隱藏、class、style、input 的值 → 可以，交給響應式資料和模板。
-   聚焦、捲動、量尺寸、播放影片、交給第三方套件 → 不行，這些是「動作」或「Vue 以外的世界」，才用 ref。

以 Modal 來說，如果你改用 Vue 自己寫 Modal（\`v-if\` 搭配 \`<Teleport>\`），開關就只是一個 \`isOpen\` 的布林值，根本不需要 ref。會需要 ref，是因為我們選擇把這件事交給 Bootstrap。

---

## 小結

-   模板 ref 讓元件拿到「自己模板裡」的元素，不會被重複使用的元件或 \`v-if\` 搞混。
-   \`onMounted\` 之後才拿得到值，\`v-if\` 為 false 時會變回 \`null\`。
-   Vue 3.5 的 \`useTemplateRef\` 用字串明確指定 ref，而且能寫在 composable 裡。
-   ref 放在元件上拿到的是實例，子元件要用 \`defineExpose\` 決定開放什麼。
-   把 DOM 交給第三方套件時，記得在 \`onBeforeUnmount\` 清理；套件實體不需要響應式。
-   能用資料描述的事就交給響應式，ref 留給 Vue 管不到的部分。

---
`,x=`---
title: "Vue 走過路過不要錯過 Day15 - 組件拆分與生命週期：setup、onMounted、onUnmounted"
subtitle: "組件拆分與生命週期：setup、onMounted、onUnmounted"
day: 15
date: "2026-09-29"
excerpt: "寫專案寫到一半，常常會有一個瞬間：打開 App.vue ，捲軸拉了半天還到不了底。上面是 header，中間有搜尋框和商品列表，旁邊塞了一個計時器，最下面還有一個彈窗。每次要改東西，都要先花時間找「這段在哪裡」。 這時候就會開始想兩件事： …"
source: "https://ithelp.ithome.com.tw/articles/10418840"
series: "ithome-ironman-2026"
---

寫專案寫到一半，常常會有一個瞬間：打開 \`App.vue\`，捲軸拉了半天還到不了底。上面是 header，中間有搜尋框和商品列表，旁邊塞了一個計時器，最下面還有一個彈窗。每次要改東西，都要先花時間找「這段在哪裡」。

這時候就會開始想兩件事：

1.  這個檔案該怎麼拆？
2.  拆出去之後，每一塊「什麼時候出生、什麼時候消失」？  
    今天就把這兩件事放在一起聊，因為它們其實是同一件事的兩面：**組件拆得越多，越需要清楚每個組件自己的一生。**

---

## 一、組件拆分：拆的是「職責」，不是「行數」

先看一個拆分前的樣子：

\`\`\`js
<!-- App.vue：什麼都有 -->
<template>
  <header>...</header>
 
  <input v-model="keyword" placeholder="搜尋商品" />
 
  <ul>
    <li v-for="item in filteredList" :key="item.id">
      {{ item.name }} - {{ item.price }}
    </li>
  </ul>
 
  <div class="timer">已經專注 {{ seconds }} 秒</div>
 
  <div class="modal">...</div>
</template>
\`\`\`

拆分之後：

\`\`\`js
<!-- App.vue：只負責組裝 -->
<template>
  <AppHeader />
  <SearchBar v-model="keyword" />
  <ProductList :items="filteredList" />
  <FocusTimer />
  <ProductModal />
</template>
\`\`\`

光看 template 就知道這個頁面由哪幾塊組成，這就是拆分最直接的好處。

### 為什麼要拆？

-   **重複使用**：\`SearchBar\` 在商品頁用得到，在訂單頁可能也用得到
-   **單一職責**：每個組件只做一件事，出問題時知道要去哪裡找
-   **好讀好維護**：一個檔案幾十行，比一個檔案幾百行好理解太多

### 什麼時候該拆？

我自己的判斷方式是：**這一塊能不能用一句話說清楚它在做什麼？**

-   「顯示商品列表」→ 可以，這是一個組件
-   「顯示商品列表，然後可以搜尋，然後計時，然後彈窗」→ 說不清楚，代表還能拆  
    不是寫超過一百行就一定要拆，而是當一個組件開始「身兼多職」時，就是該拆的訊號。

### 組件和 composable 的差別

拆分的時候常會卡在一個問題：這段要拆成組件，還是抽成 composable？

-   要重用的是**畫面**（有 template）→ 拆成組件
-   要重用的是**邏輯**（沒有 template，只有資料和行為）→ 抽成 composable，也就是 \`useXxx\` 函式  
    這個差別等等講到生命週期時會再回來用到。

至於拆開之後資料怎麼傳，簡單說就是 props 往下傳、emit 往上通知，這裡先不展開。

---

## 二、每個組件實例都有自己的一生

組件拆開之後，有一個很重要的觀念：**每一個組件實例，都有一條獨立的生命週期。**

\`App.vue\` 裡用了五個子組件，就有五條各自的生命週期，加上 \`App\` 自己總共六條。它們各自出生、各自更新、各自消失。

一個組件的一生大致是這樣：

\`\`\`js
setup（建立）
  ↓
onBeforeMount → onMounted（掛載到畫面上）
  ↓
onBeforeUpdate → onUpdated（資料變動、畫面重新渲染，可能發生很多次）
  ↓
onBeforeUnmount → onUnmounted（從畫面上移除）
\`\`\`

這些 \`onXxx\` 就是生命週期鉤子（lifecycle hooks），意思是「在某個時間點，讓我插一段程式碼進去執行」。

鉤子很多，但日常開發最常用的其實就三個：**setup、onMounted、onUnmounted**。下面一個一個看。

---

## 三、setup：組件的出生證明

在 \`<script setup>\` 裡寫的程式碼，本身就是在 setup 階段執行的。組件被建立時，這段程式碼會**從上到下跑一次**。

\`\`\`js
<script setup>
import { ref, useTemplateRef } from 'vue'
 
console.log('setup 執行了')
 
const count = ref(0)
const inputEl = useTemplateRef('input')
 
console.log(inputEl.value) // null
<\/script>
 
<template>
  <input ref="input" />
</template>
\`\`\`

為什麼 \`inputEl.value\` 是 \`null\`？因為 setup 執行的時候，Vue 還在「準備資料」，template 還沒被渲染成真正的 DOM。這也接回 Day 14 講模板 ref 時提到的：**DOM 要等掛載之後才拿得到。**

如果寫過 Vue 2，會記得有 \`beforeCreate\` 和 \`created\` 兩個鉤子。在 Vue 3 的 Composition API 裡不需要它們了，原本寫在那裡的東西，直接寫在 setup 裡就好。

| Vue 2（Options API） | Vue 3（Composition API） |
| --- | --- |
| beforeCreate / created | 直接寫在 setup 裡 |
| mounted | onMounted |
| beforeDestroy | onBeforeUnmount |
| destroyed | onUnmounted |

---

## 四、onMounted：DOM 準備好了

onMounted 的時機是：\\*\\*組件的 DOM 已經產生，而且放進頁面了。\\*\\*所以凡是需要碰到 DOM 的事情，都放這裡。

\`\`\`js
<script setup>
import { useTemplateRef, onMounted } from 'vue'
 
const inputEl = useTemplateRef('input')
 
onMounted(() => {
  inputEl.value.focus() // 這時候拿得到了
})
<\/script>
 
<template>
  <input ref="input" />
</template>
\`\`\`

適合放在 onMounted 的事情：

-   操作 DOM：focus、捲動、量元素寬高
-   初始化需要 DOM 的第三方套件：Bootstrap Modal、Chart.js、Swiper 這類  
    延續 Day 14 的 Bootstrap Modal 例子，\`new Modal()\` 需要傳入一個真實的 DOM 元素，所以一定要等到 onMounted：

\`\`\`js
<script setup>
import { useTemplateRef, onMounted } from 'vue'
import { Modal } from 'bootstrap'
 
const modalEl = useTemplateRef('modal')
let modal = null
 
onMounted(() => {
  modal = new Modal(modalEl.value)
})
<\/script>
 
<template>
  <div ref="modal" class="modal">...</div>
</template>
\`\`\`

如果把 \`new Modal()\` 寫在 setup 最外層，拿到的會是 \`null\`，套件就會報錯。

### 打 API 要放 setup 還是 onMounted？

這是很常被問的問題，兩種寫法都看得到：

\`\`\`js
// 寫法 A：直接在 setup 裡呼叫
fetchProducts()
 
// 寫法 B：等掛載完再呼叫
onMounted(() => {
  fetchProducts()
})
\`\`\`

單純抓資料的話兩種都可以，差別只在時機：寫法 A 比較早發出請求，寫法 B 會等畫面出來之後才發。如果抓資料這件事跟 DOM 無關，放在 setup 裡就夠了。

另外補充一點：如果是用 Nuxt 這類 SSR 框架，onMounted 只會在瀏覽器端執行，伺服器端不會跑，所以那邊抓資料通常會改用框架提供的方法（像 \`useFetch\`）。

---

## 五、onUnmounted：記得收拾善後

onUnmounted 的時機是：**組件從畫面上被移除之後。**

它最重要的用途只有一個：**清理**。這個鉤子最容易被忽略，因為忘了寫，畫面看起來也完全正常。直接看例子。

### 一個忘記清理的計時器

\`\`\`js
<!-- FocusTimer.vue -->
<script setup>
import { ref } from 'vue'
 
const seconds = ref(0)
 
setInterval(() => {
  seconds.value++
  console.log('計時中', seconds.value)
}, 1000)
<\/script>
 
<template>
  <p>已經專注 {{ seconds }} 秒</p>
</template>
\`\`\`

在父組件用 \`v-if\` 控制它的顯示：

\`\`\`js
<!-- App.vue -->
<script setup>
import { ref } from 'vue'
import FocusTimer from './FocusTimer.vue'
 
const showTimer = ref(true)
<\/script>
 
<template>
  <button @click="showTimer = !showTimer">切換計時器</button>
  <FocusTimer v-if="showTimer" />
</template>
\`\`\`

打開 console，連續按幾次切換按鈕，會看到：

-   計時器已經從畫面上消失了，console 還在一直印「計時中」
-   每按一次顯示，就多一組新的計時在跑，log 越印越快  
    原因是：組件被移除了，但 \`setInterval\` 是瀏覽器的東西，Vue 不會幫你關掉它。而且計時器的 callback 還抓著 \`seconds\`，這些資料也沒辦法被回收，這就是記憶體洩漏（memory leak）。

### 加上 onUnmounted

\`\`\`js
<!-- FocusTimer.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
 
const seconds = ref(0)
let timerId = null
 
onMounted(() => {
  timerId = setInterval(() => {
    seconds.value++
    console.log('計時中', seconds.value)
  }, 1000)
})
 
onUnmounted(() => {
  clearInterval(timerId)
})
<\/script>
\`\`\`

再切換一次，這次組件一消失，console 就安靜了。

這裡我把 \`setInterval\` 也移到了 onMounted 裡，養成一個習慣：\\*\\*在 onMounted 開始的東西，就在 onUnmounted 結束。\\*\\*兩個鉤子成對出現，比較不容易漏。

### 常見需要清理的東西

-   計時器：\`setInterval\`、\`setTimeout\`
-   綁在組件外面的事件監聽：\`window\`、\`document\` 上的 \`addEventListener\`
-   觀察器：\`IntersectionObserver\`、\`ResizeObserver\`
-   第三方套件的實例：例如 Bootstrap Modal 的 \`dispose()\`、Chart.js 的 \`destroy()\`
-   WebSocket 連線  
    判斷方式很簡單：\\*\\*這個東西是不是 Vue 以外的人在管？\\*\\*如果是，Vue 就不會幫你收，要自己收。

至於寫在 template 上的 \`@click\` 這種事件，Vue 會自己處理，不用手動移除。

### onBeforeUnmount 什麼時候用？

onBeforeUnmount 在「準備移除、但 DOM 還在」的時候執行。如果清理的時候還需要讀 DOM，例如要記下使用者捲到哪裡，就放在 onBeforeUnmount；單純關計時器、移除監聽，用 onUnmounted 就好。

---

## 六、把出生到死亡打包成 composable

回到第一段講的：邏輯要重用，就抽成 composable。

「在 onMounted 綁定、在 onUnmounted 解除」這件事每次都要寫一次，很適合包起來：

\`\`\`js
// composables/useEventListener.js
import { onMounted, onUnmounted } from 'vue'
 
export function useEventListener(target, event, handler) {
  onMounted(() => {
    target.addEventListener(event, handler)
  })
 
  onUnmounted(() => {
    target.removeEventListener(event, handler)
  })
}
\`\`\`

有了它，要監聽視窗寬度就變得很乾淨：

\`\`\`js
// composables/useWindowWidth.js
import { ref } from 'vue'
import { useEventListener } from './useEventListener'
 
export function useWindowWidth() {
  const width = ref(window.innerWidth)
 
  useEventListener(window, 'resize', () => {
    width.value = window.innerWidth
  })
 
  return { width }
}
\`\`\`

\`\`\`js
<!-- 任何組件裡 -->
<script setup>
import { useWindowWidth } from './composables/useWindowWidth'
 
const { width } = useWindowWidth()
<\/script>
 
<template>
  <p>目前視窗寬度：{{ width }}px</p>
</template>
\`\`\`

這裡有一個很關鍵的觀念：**composable 裡的生命週期鉤子，會綁在「呼叫它的那個組件」身上。**

A 組件呼叫 \`useWindowWidth()\`，監聽就跟著 A 的一生走，A 被移除時監聽就解除；B 組件也呼叫的話，B 會有自己一份，互不影響。使用的人完全不用記得要清理，因為清理已經寫在 composable 裡了。

Day 14 的 \`useModal\` 也可以用同樣的思路補上清理：

\`\`\`js
// composables/useModal.js
import { useTemplateRef, onMounted, onUnmounted } from 'vue'
import { Modal } from 'bootstrap'
 
export function useModal(refName) {
  const modalEl = useTemplateRef(refName)
  let modal = null
 
  onMounted(() => {
    modal = new Modal(modalEl.value)
  })
 
  onUnmounted(() => {
    modal?.dispose()
  })
 
  const open = () => modal?.show()
  const close = () => modal?.hide()
 
  return { open, close }
}
\`\`\`

順帶一提，[VueUse](https://vueuse.org/) 已經把很多這類 composable 寫好了，像 \`useEventListener\`、\`useWindowSize\`、\`useIntervalFn\`，實務上可以直接用。不過自己寫過一次，會更清楚它們背後在做什麼。

---

## 七、容易踩到的坑

### 1\\. 鉤子要在 setup 裡同步註冊

\`\`\`js
// ❌ 不會執行
setTimeout(() => {
  onMounted(() => {
    console.log('我不會被印出來')
  })
}, 0)
\`\`\`

生命週期鉤子在註冊時，需要知道「現在是哪個組件在執行 setup」。放進 \`setTimeout\` 或 \`.then()\` 這類非同步 callback 裡，Vue 已經不知道它屬於誰了，console 會出現警告，鉤子也不會執行。

最保險的做法：**鉤子一律寫在 setup 的最外層，由上往下同步註冊。**

### 2\\. v-if 會觸發掛載和卸載，v-show 不會

-   \`v-if\` 為 \`false\`：組件真的被移除，會觸發 onUnmounted；變回 \`true\` 是一個全新的組件，會重新跑 setup 和 onMounted
-   \`v-show\` 為 \`false\`：組件還在，只是被加上 \`display: none\`，生命週期不會變化  
    所以前面計時器的例子，如果把 \`v-if\` 換成 \`v-show\`，計時器會一直跑下去，這通常是符合預期的，因為組件本來就還活著。選哪一個，要看你希望組件「藏起來」還是「消失」。

### 3\\. 父子組件的掛載順序

在父子組件裡各自印出 log：

\`\`\`js
Parent setup
Parent onBeforeMount
Child setup
Child onBeforeMount
Child onMounted
Parent onMounted
\`\`\`

子組件的 onMounted 會比父組件先執行。原因是父組件要等底下所有子組件都掛載完成，自己才算完整地掛上去。

所以在父組件的 onMounted 裡，可以放心地存取子組件的 DOM。

### 4\\. KeepAlive 裡的組件不會 unmount

如果組件被 \`<KeepAlive>\` 包起來，切換時不會被移除，而是被暫存起來，所以 onUnmounted 不會觸發。這種情況要改用 \`onActivated\`（重新顯示時）和 \`onDeactivated\`（被暫存時）。這裡先知道有這件事就好。

---

## 八、整理

| 鉤子 | 什麼時候執行 | 適合做什麼 | 常見錯誤 |
| --- | --- | --- | --- |
| setup | 組件建立時，最先執行 | 宣告資料、computed、watch，發 API 請求 | 在這裡操作 DOM，拿到 null |
| onMounted | DOM 產生並放進頁面後 | 操作 DOM、初始化第三方套件、開計時器與監聽 | 忘記開了的東西要關 |
| onBeforeUnmount | 準備移除，DOM 還在 | 需要讀 DOM 的清理，例如記錄捲動位置 | 和 onUnmounted 分不清楚 |
| onUnmounted | 組件移除後 | 清計時器、移除監聽、銷毀套件實例 | 忘了寫，造成記憶體洩漏 |

回到開頭那個越寫越長的 \`App.vue\`：拆分讓每個組件只做一件事，生命週期讓每個組件把自己開的東西自己收好。兩件事都做到，組件才能放心地搬到別的頁面重複使用，不會拖著一堆沒關掉的計時器跟著走。

---
`,V=`---
title: "Vue 走過路過不要錯過 Day16 - props：defineProps 與單向資料流的規矩"
subtitle: "props：defineProps 與單向資料流的規矩"
day: 16
date: "2026-09-30"
excerpt: "假設你在做一個商品列表頁，每個商品都要顯示名稱、價格。最直覺的做法是把卡片的 HTML 直接複製貼上，再一張張改文字。商品只有三個的時候還撐得住，等到變成三十個，改一個樣式就要改三十個地方。 Day 15 我們已經學會把畫面拆成組件。拆出來…"
source: "https://ithelp.ithome.com.tw/articles/10419275"
series: "ithome-ironman-2026"
---

# Day16 - props：defineProps 與單向資料流的規矩

## 前言：同一張商品卡片，為什麼不能寫死？

假設你在做一個商品列表頁，每個商品都要顯示名稱、價格。最直覺的做法是把卡片的 HTML 直接複製貼上，再一張張改文字。商品只有三個的時候還撐得住，等到變成三十個，改一個樣式就要改三十個地方。

Day 15 我們已經學會把畫面拆成組件。拆出來的卡片組件只負責「長什麼樣子」，至於「顯示哪一個商品」，應該交給使用它的人決定。這個「由外面把資料傳進來」的機制，就是 props。

## 為什麼需要 props

如果一份資料不是全域都需要，只有某一塊畫面用得到，最自然的做法是由**父組件**握有這份資料，需要的時候再傳給**子組件**。子組件不用知道資料從哪來，只管拿到什麼就顯示什麼。這樣同一個組件餵不同的資料，就能長出不同的內容，復用起來也很輕鬆。

相對地，像是登入狀態、購物車這類很多頁面都要讀寫的資料，就不適合一層一層傳下去，那是全域狀態要處理的事（Pinia 之後會談到）。判斷的方式很簡單：**只有這個組件和它的上下層用得到，就用 props；很多地方都要用，再考慮全域**。

## defineProps 的基本寫法

在 \`<script setup>\` 裡，用 \`defineProps\` 宣告這個組件接受哪些 props。它是編譯巨集，不需要 import 就能直接使用。

\`\`\`js
<script setup>
const props = defineProps({
  title: { type: String, required: true },
  price: { type: Number, default: 0 },
  tags: { type: Array, default: () => [] }
})
<\/script>

<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>NT$ {{ price }}</p>
  </div>
</template>
\`\`\`

幾個常見的重點：

-   模板裡可以直接用 \`title\`，不用寫 \`props.title\`；在 script 裡則要透過 \`props.title\` 存取。
-   \`type\` 讓 Vue 在開發模式下幫你檢查型別，傳錯會在 console 出現警告。
-   \`required: true\` 代表一定要傳，\`default\` 是沒傳時的預設值。
-   物件與陣列的預設值要寫成函式（\`() => []\`），避免多個組件實例共用同一個參考。

父組件這邊這樣使用：

\`\`\`js
<script setup>
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'

const products = ref([
  { id: 1, title: '安全帽 A 款', price: 1200 },
  { id: 2, title: '安全帽 B 款', price: 1500 }
])
<\/script>

<template>
  <ProductCard
    v-for="item in products"
    :key="item.id"
    :title="item.title"
    :price="item.price"
  />
</template>
\`\`\`

這裡有個新手常踩的小地方：如果寫成 \`price="1200"\`（沒有冒號），傳進去的是字串 \`"1200"\`，會和 \`Number\` 型別對不上而出現警告。要傳「JS 的值」而不是純文字，記得加上 \`:\`（也就是 \`v-bind\`）。

## 單向資料流：資料只能由上往下

Vue 對 props 訂了一條規矩：**資料由父組件流向子組件，子組件不應該反過來修改它**。

先看最直接的違規寫法：

\`\`\`js
<script setup>
const props = defineProps({
  count: Number
})

function add() {
  props.count++ // 直接改 props
}
<\/script>
\`\`\`

這樣寫，開發模式下 Vue 會在 console 警告 props 是唯讀的，值也不會被改掉。

但事情沒有這麼單純。如果傳進來的是物件呢？

\`\`\`js
<script setup>
const props = defineProps({
  product: { type: Object, required: true }
})

function toggleFavorite() {
  props.product.isFavorite = true // 改的是物件內部的屬性
}
<\/script>
\`\`\`

這一次 Vue **不會警告**，而且畫面還真的會更新。原因是 props 的唯讀只擋「整個 prop 被重新賦值」這一層，物件內部的屬性並沒有被凍結。子組件拿到的其實是父組件那個物件的同一個參考，所以這一行改到的是**父組件的資料**。

看起來能動，為什麼還是不好？

-   **資料來源變得不明確**：想知道 \`isFavorite\` 是誰改的，你得翻遍所有拿到這個物件的子組件。
-   **一份資料被多處修改，除錯困難**：如果同一個物件同時傳給好幾個子組件，任何一個都能偷偷改它，畫面出現異常時很難追查。
-   **組件失去獨立性**：子組件悄悄依賴「父組件的資料可以被我改」，換個地方使用就可能出問題。

單向資料流的意義就在這裡：資料的修改權集中在擁有它的那一層，任何變動都能循著同一條路徑追蹤。

## 子組件真的需要「改」的時候怎麼辦

實務上常見的情況大致有三種，各有各的處理方式。

**1\\. 只是把 props 當作初始值**

例如傳進來一個初始數量，子組件之後自己管理。這時候複製一份到本地的 ref：

\`\`\`js
<script setup>
import { ref } from 'vue'

const props = defineProps({
  initialCount: { type: Number, default: 0 }
})

const count = ref(props.initialCount)
<\/script>
\`\`\`

要注意這只會在建立時複製一次，之後父組件再改 \`initialCount\`，本地的 \`count\` 不會跟著變。

**2\\. 需要根據 props 算出另一個值**

例如傳進來原價，卡片要顯示打折後的價格。這種情況用 computed，會跟著 props 的變化自動更新：

\`\`\`js
<script setup>
import { computed } from 'vue'

const props = defineProps({
  price: { type: Number, default: 0 }
})

const salePrice = computed(() => Math.round(props.price * 0.8))
<\/script>
\`\`\`

**3\\. 子組件想「請父組件」修改資料**

像前面的收藏按鈕，子組件不自己改資料，而是通知父組件「使用者按了收藏」，由父組件決定要不要改、怎麼改。這正是 \`emit\` 的工作，下一篇會詳細介紹。這邊先記住核心觀念：**props 往下傳，事件往上報**。

## 補充：解構 props 的注意事項

Day 5 我們談過，一般的 reactive 物件解構後會失去響應式。props 也有類似的情況：如果在 script 裡用 \`const { title } = props\` 這種寫法取值，之後 \`title\` 就只是一個普通變數，不會再跟著更新。

Vue 3.5 之後，直接在 \`defineProps\` 上解構（\`const { title } = defineProps(...)\`）會由編譯器幫你保持響應式。但如果你的專案版本較舊，或是在其他地方解構，就要改用 \`toRefs(props)\` 或直接使用 \`props.title\`。

## 小結

-   props 讓父組件決定資料，子組件專心負責呈現，同一個組件可以輕鬆復用。
-   \`defineProps\` 是編譯巨集，不需要 import，可以搭配 \`type\`、\`required\`、\`default\` 做基本驗證。
-   資料只能由上往下流。整個 prop 重新賦值會被 Vue 警告，但修改物件內部屬性不會，這是最容易忽略的陷阱。
-   子組件需要「改」資料時：初始值用本地 ref、衍生值用 computed、要通知父組件則用 emit。
`,j=Object.assign({"../content/posts/10410930.md":i,"../content/posts/10411646.md":u,"../content/posts/10412683.md":c,"../content/posts/10413220.md":p,"../content/posts/10413838.md":d,"../content/posts/10414399.md":m,"../content/posts/10414857.md":f,"../content/posts/10415533.md":v,"../content/posts/10416002.md":y,"../content/posts/10416006.md":h,"../content/posts/10417078.md":g,"../content/posts/10417556.md":b,"../content/posts/10417957.md":k,"../content/posts/10418397.md":w,"../content/posts/10418840.md":x,"../content/posts/10419275.md":V}),M=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/,E=n=>{try{return JSON.parse(n)}catch{return n}},P=(n,e)=>{const[,o="",a=e]=e.match(M)??[],l=Object.fromEntries(o.split(/\r?\n/).filter(t=>t.includes(":")).map(t=>{const s=t.indexOf(":");return[t.slice(0,s).trim(),E(t.slice(s+1).trim())]}));return{slug:n.split("/").pop().replace(/\.md$/,""),...l,body:a}},r=Object.entries(j).map(([n,e])=>P(n,e)).sort((n,e)=>n.date.localeCompare(e.date)||(n.day??0)-(e.day??0));function D(){return{posts:r,getPostIndex:e=>r.findIndex(o=>o.slug===e)}}export{D as u};
