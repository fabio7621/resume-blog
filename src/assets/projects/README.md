# 專案預覽圖

把專案截圖放在這個資料夾，然後到 `src/pages/SinglePage.vue` 的 `projects`
陣列，把檔名填進對應專案的 `image` 欄位即可：

```js
{
  name: 'HelmentShop',
  // ...
  image: 'helmentshop.png',
}
```

- 支援副檔名：`.png` `.jpg` `.jpeg` `.webp` `.avif`
- 卡片版位固定 **16:9**，圖片會以 `object-cover` 裁切填滿
- 建議尺寸 1280×720（或等比放大），檔案盡量壓在 300KB 以內
- `image` 留空或檔名找不到時，會顯示 `[ 16 : 9 ]` 佔位框
