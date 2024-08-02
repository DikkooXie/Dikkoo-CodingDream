import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const rootRoutes:RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomePage/HomePage.vue')
  }
]

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/views/TheRoot.vue'),
    redirect: '/home',
    children: rootRoutes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
