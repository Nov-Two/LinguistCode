import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home/index.vue';
import Curriculum from '@/views/Curriculum/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/curriculum',
      name: 'curriculum',
      component: Curriculum
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
