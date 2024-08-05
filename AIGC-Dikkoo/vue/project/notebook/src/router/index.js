import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'

const homeRoutes = [
  {
    path: '/follow',
    name: 'Follow',
    meta: {
      title: '关注',
      login: true,
      cache: true
    },
    component: () => import('../views/app/home/Follow.vue')
  },
  {
    path: '/hot',
    name: 'Hot',
    meta: {
      title: '热门',
      login: false,
      cache: true
    },
    component: () => import('../views/app/home/Hot.vue')
  },
  {
    path: '/function',
    name: 'Function',
    meta: {
      title: '功能',
      login: false,
      cache: true
    },
    component: () => import('../views/app/home/Function.vue')
  },
  {
    path: '/order',
    name: 'Order',
    meta: {
      title: '订单',
      login: true,
      cache: true
    },
    component: () => import('../views/app/home/Order.vue')
  }
]

const rootRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/app/Home.vue'),
    children: homeRoutes,
    redirect: '/hot'
  },
  {
    path: '/tags',
    name: 'Tags',
    component: () => import('../views/app/Tags.vue')
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/app/Messages.vue')
  },
  {
    path: '/myspace',
    name: 'MySpace',
    component: () => import('../views/app/MySpace.vue')
  }
]

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/app',
    name: 'App',
    children: rootRoutes,
    component: Main
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全局的路由守卫
const whitePath = ['/login', '/register']

// router.beforeEach((to, from, next) => {
//   if(whitePath.includes(to.path)) {
//     next()
//   } else {
//     const token = localStorage.getItem('token')
//     if(token) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

export default router
