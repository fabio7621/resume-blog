import { onBeforeUnmount, onMounted } from 'vue'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

const FANCYBOX_SELECTOR = "[data-fancybox='project-gallery']"

// 專案預覽圖：src/assets/projects/ 底下的圖片，用檔名查出打包後的網址
const projectImages = import.meta.glob('../assets/projects/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})

export const getProjectImage = (fileName) =>
  fileName ? (projectImages[`../assets/projects/${fileName}`] ?? '') : ''

// 作品頁共用的燈箱：掛載時綁定，離開頁面時解除並關掉開著的燈箱
export function useProjectGallery() {
  onMounted(() => {
    Fancybox.bind(FANCYBOX_SELECTOR, {
      // 跟著站上的 light / dark 切換走
      theme: () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light'),
      Carousel: { infinite: false },
      // 開燈箱時不改網址 hash，避免跟 vue-router 的錨點捲動互相干擾
      Hash: false,
    })
  })

  onBeforeUnmount(() => {
    Fancybox.unbind(FANCYBOX_SELECTOR)
    Fancybox.close()
  })
}
