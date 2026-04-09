import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HubView from '@/views/HubView.vue'
import lenis from '@/lenis'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/en' },
    {
      path: '/:locale(en|fr|es)',
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'hub', name: 'hub', component: HubView },
      ],
    },
  ],
})

router.afterEach(() => {
  lenis.scrollTo(0, { immediate: true })
})

export default router
