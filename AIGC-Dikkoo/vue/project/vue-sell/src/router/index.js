import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: () => import('../views/Goods.vue')
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('../views/Comment.vue')
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import('../views/Seller.vue')
    }
  ]
})

export default router
