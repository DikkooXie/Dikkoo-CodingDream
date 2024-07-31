import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home.vue')
        },
        {
            path: '/post/:id',
            name: 'detail',
            component: () => import('../views/Detail.vue')
        }
    ]
});

export default router;