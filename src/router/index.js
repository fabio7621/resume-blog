import { createRouter, createWebHistory } from 'vue-router'

// 對應 NavBar 的 h-14 高度，錨點捲動時不要被 sticky header 蓋住
const HEADER_OFFSET = 64
// 跨頁跳錨點時，等 out-in 過場動畫結束、目標區塊掛上 DOM 再捲
const PAGE_TRANSITION_MS = 350

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/SinglePage.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../pages/BlogPage.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'post',
    component: () => import('../pages/PostPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (!to.hash) return { top: 0 }

    const isCrossPage = from.matched.length > 0 && to.path !== from.path
    return new Promise((resolve) => {
      setTimeout(
        () => resolve({ el: to.hash, top: HEADER_OFFSET, behavior: 'smooth' }),
        isCrossPage ? PAGE_TRANSITION_MS : 0,
      )
    })
  },
})
