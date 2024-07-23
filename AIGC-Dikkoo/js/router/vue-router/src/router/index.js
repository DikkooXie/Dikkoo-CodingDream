// import { createRouter, createWebHistory } from 'vue-router';
import { createRouter, createWebHashHistory } from './our-router/index.js';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home // 首页必定要渲染，所以不需要懒加载
    },
    {
        path: '/about',
        name: 'About',
        // component: () => import('../pages/About.vue'), // 懒加载
        component: About
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;