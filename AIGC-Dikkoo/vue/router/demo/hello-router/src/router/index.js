import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // 引入组件

const router = createRouter({
  // 路由模式：hash、history
  history: createWebHistory(import.meta.env.BASE_URL), // 一般使用history模式
  routes: [ // 路由配置
    {
      path: '/',           // 路由路径：url上的路径
      name: 'home',        // 路由名称：用于编程式导航，可以不写
      component: HomeView  // 对应的组件：路由匹配到时渲染的组件
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue') // 另一种引入组件的方式，懒加载（按需加载）
    }
  ]
})

export default router; // 导出路由实例，供main.js引入
