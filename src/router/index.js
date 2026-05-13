import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
    meta: { title: 'About' },
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('../pages/SkillsPage.vue'),
    meta: { title: 'Skills' },
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../pages/PortfolioPage.vue'),
    meta: { title: 'Portfolio' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
    meta: { title: '404' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const base = 'Resume Blog'
  const pageTitle = to.meta?.title
  document.title = pageTitle ? `${pageTitle} · ${base}` : base
})

export default router
