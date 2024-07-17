import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        redirect: '/dashboard', // 配置重定向，访问根路径时重定向到 /dashboard
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [ // 配置多级路由
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('../views/Dashboard.vue'),
                meta: {
                    title: "系统首页",
                    permission: '11', // 配置权限码
                }
            },
            {
                path: '/system-user',
                name: 'system-user',
                component: () => import('../views/SystemUser.vue'),
                meta: {
                    title: '用户管理',
                    permission: '12' // 配置权限码
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: {
            title: '登录',
            noAuth: true // 无需登录认证
        }
    },
    {
        path: '/403',
        name: '403',
        component: () => import('../views/403.vue'),
        meta: {
            title: '无访问权限 - 403',
            noAuth: true // 无需登录认证
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue'),
        meta: {
            title: '页面不存在 - 404',
            noAuth: true // 无需登录认证
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => { 

    // to: 即将要进入的目标路由对象;
    // from: 当前导航正要离开的路由; 
    // next: 一定要调用该方法来 resolve 这个钩子

    // 设置页面标题
    document.title = to.meta.title || '后台管理系统';

    const role = localStorage.getItem('role_name') || 'user'; // 获取用户角色
    const permission = {
        'admin': ['11', '12'],
        'user': ['11']
    };

    if (!to.meta.noAuth) { // 不是无需登录的页面
        if(!role) { // 未登录
            next('/login'); // 跳转到登录页
        } else if (!permission[role].includes(to.meta.permission)) { // 无访问权限
            next('/403');
        } else {
            next();
        }
    } else { // 无需登录的页面
        next();
    }
});

export default router;