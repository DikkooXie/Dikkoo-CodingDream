import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/item',
        name: 'Item',
        component: () => import('../views/Item.vue')
    },
    {
        path: '/score',
        name: 'Score',
        component: () => import('../views/Score.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;