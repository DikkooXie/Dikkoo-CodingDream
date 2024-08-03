import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const rootRoutes:RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'HomePage',
    meta: {
      cache: true
    },
    component: () => import('@/views/Home/HomePage.vue')
  },
  {
    path: '/discount',
    name: 'DiscountPage',
    meta: {
      cache: true
    },
    component: () => import('@/views/Discount/DiscountPage.vue')
  }
]

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'App',
    component: () => import('@/views/TheRoot.vue'),
    redirect: '/home',
    children: rootRoutes
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
