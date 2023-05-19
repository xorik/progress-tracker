import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: {showCategories: true},
    },
    {
      path: '/settings',
      component: () => import('../views/SettingsView.vue'),
      children: [
        {
          path: 'categories',
          component: () => import('../views/settings/CategoriesView.vue')
        },
        {
          path: 'goals',
          component: () => import('../views/settings/GoalsView.vue'),
          meta: {showCategories: true},
        },
        {
          path: 'key',
          component: () => import('../views/settings/ApiKeyView.vue')
        },
      ]
    },
  ]
})

export default router