# v3 后台管理系统

- 实习项目，外包必备技能

## 技术选型

- 前端框架：Vue 3
    - `npm init vite` 创建项目 vue + javascript
    - `npm i vue-router`
- 前端组件库：Element Plus

### Element Plus

- 安装
    - `npm i element-plus`
- 引入
    - **完整引入**：在 main.js 中引入 Element Plus。
        ```js
        import { createApp } from 'vue'
        import App from './App.vue'
        import ElementPlus from 'element-plus'
        import 'element-plus/lib/theme-chalk/index.css'

        createApp(App).use(ElementPlus).mount('#app')
        ```
    - **按需自动引入（首选）**：使用 unplugin-vue-components 插件，自动引入 Element Plus 组件。
        - 安装开发依赖
            ```bash
            npm install -D unplugin-vue-components unplugin-auto-import
            ```
        - 配置 vite.config.js
            ```js
            // vite.config.js
            import { defineConfig } from 'vite'
            import AutoImport from 'unplugin-auto-import/vite'
            import Components from 'unplugin-vue-components/vite'
            import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

            export default defineConfig({
            // ...
            plugins: [
                // ...
                AutoImport({
                resolvers: [ElementPlusResolver()],
                }),
                Components({
                resolvers: [ElementPlusResolver()],
                }),
            ],
            })
            ```
    - **按需手动引入**：在 main.js 中按需引入 Element Plus 组件。
        ```js
        import { createApp } from 'vue'
        import App from './App.vue'
        import { ElButton, ElSelect } from 'element-plus' // 解构引入
        import 'element-plus/lib/theme-chalk/index.css'

        const app = createApp(App)
        app.component(ElButton.name, ElButton)
        app.component(ElSelect.name, ElSelect)
        app.mount('#app')
        ```

### Vue Router

- 安装
    - `npm i vue-router`
- 引入
    - 在 src 目录下新建 router 目录，新建 index.js 文件。
        ```js
        // src/router/index.js
        import { createRouter, createWebHistory } from 'vue-router'
        import Home from '../views/Home.vue'

        const routes = [
            {
                path: '/',
                name: 'home',
                component: Home
            },
            //...
        ]

        const router = createRouter({
            history: createWebHistory(),
            routes
        })

        export default router
        ```
    - 在 main.js 中引入 router。
        ```js
        // main.js
        import { createApp } from 'vue'
        import App from './App.vue'
        import router from './router'

        createApp(App).use(router).mount('#app')
        ```
- 注意事项
    - 在该项目中，可以放心使用 history 模式，不用care hash的兼容性
        - 内部人使用，不兼容换一个浏览器就行了
    - 路由守卫
        - 做好权限管理 + 登录拦截
        - 设置不同身份权限 admin/user/visitor/...


### Pinia

- 安装
    - `npm i pinia`

## 路由配置

- 多级路由
    ```js
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
                },
                {
                    path: '/system-user',
                    name: 'system-user',
                    component: () => import('../views/SystemUser.vue'),
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
        }
    ];
    ```
- 用 `meta` 字段配置路由元信息
    ```js
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
                        permission: '11' // 配置权限码
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
                noAuth: true // 配置不需要登录的页面
            }
        }
    ];
    ```
- 路由守卫
    ```js
    // router/index.js

    // ，，，

    router.beforeEach((to, from, next) => { 

        // to: 即将要进入的目标路由对象;
        // from: 当前导航正要离开的路由; 
        // next: 一定要调用该方法来 resolve 这个钩子

        // 设置页面标题
        document.title = to.meta.title || '后台管理系统';
        // 判断是否需要登录
        if (!to.meta.noAuth) { // 需要登录的页面
            // 判断是否登录
            if (!localStorage.getItem('token')) {
                next('/login'); // 未登录则跳转到登录页面
            } else {
                next(); // 已登录则放行
            }
        } else { // 无需登录的页面
            next();
        }
    });
    ```