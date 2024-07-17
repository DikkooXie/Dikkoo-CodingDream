# v3 后台管理系统

- 实习项目，外包必备技能

## 技术选型

- 前端框架：Vue 3
    - `npm init vite` 创建项目 vue + javascript
    - `npm i vue-router`
- 前端组件库
    - Element Plus
    - NProgress 进度条

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
    - 在该项目中，可以放心使用 **history 路由模式**
        - hash模式好在他的兼容性好，但url形式糟糕。
        - 后台页面仅供内部人使用，不兼容换一个浏览器就行了，不如放弃兼容性选择history模式。
        - hash模式一般用在用户/移动端页面、政府系统等对兼容性要求高的产品上。
    - 路由懒加载
        - 除了**首页**这类必须加载的页面，其它页面都应该使用`() => import('../views/403.vue')`的方式进行路由懒加载，以提高页面加载速度。
    - 路由守卫
        - 做好权限管理 + 登录拦截
        - 设置不同身份权限 admin/user/visitor/...
        - 设置好404、403页面


### Pinia

- 安装
    - `npm i pinia`

## 路由配置

- 多级（二级）路由
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
    - 配置页面标题动态显示 以及 鉴权管理
        ```js
        // router/index.js
        // ，，，
        router.beforeEach((to, from, next) => { 
            // to: 即将要进入的目标路由对象;
            // from: 当前导航正要离开的路由; 
            // next: 一定要调用该方法来 resolve 这个钩子

            // 设置页面标题
            document.title = to.meta.title || '后台管理系统';

            const role = localStorage.getItem('role_name') || ''; // 获取用户角色

            const permission = { // 权限组 - 模拟数据（一般从后端获取）
                'admin': ['11', '12'], // admin权限组下包含的权限
                'user': ['11'] // user权限组下包含的权限
            };

            if (!to.meta.noAuth) { // 不是无需登录的页面
                if(!role) { // 未登录
                    next('/login'); // 跳转到登录页
                } else if (!permission[role] || !permission[role].includes(to.meta.permission)) { // 用户组不存在或无访问权限
                    next('/403'); // 跳转到无访问权限页
                } else {
                    next(); // 有访问权限，准许访问
                }
            } else { // 无需登录的页面
                next(); // 直接准许访问
            }
        });
        ```
    - 添加 加载进度条
        - 安装 NProgress
            ```bash
            npm i nprogress
            ```
        - 引入并使用 NProgress
            ```js
            // router/index.js
            import NProgress from 'nprogress'; // 引入进度条
            import 'nprogress/nprogress.css'; // 进度条样式

            router.beforeEach((to, from, next) => {
                NProgress.start(); // 开始进度条
                // ...
            });

            router.afterEach(() => {
                NProgress.done(); // 结束进度条
            });
            ```
- 配置 404 页面重定向
    ```js
    const routes = [
        // ...
        {
            path: '/404',
            name: '404',
            component: () => import('../views/404.vue'),
            meta: {
                title: '页面不存在 - 404',
                noAuth: true // 无需登录认证
            }
        },
        {
            path: '/:path(.*)', // 使用正则匹配任意路径
            redirect: '/404' // 重定向到 404 页面
        }
    ];
    ```
- 配置 403、404 页面 返回上一页
    ```vue
    <template>
        <!-- ，，， -->
        <el-button class="error-btn" size="large" @click="goBack">返回上一页</el-button>
    </template>

    <script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const goBack = () => {
        router.go(-1); // 返回上一页
    }
    </script>
    ```

## 做一个登录页

### el-form 表单套件

- 常用组件
    - el-form
    - el-form-item
    - el-input
    - el-checkbox
    - el-button
- 数据绑定
    - v-model + input 双向绑定
    - el-form 组件的 model 属性绑定表单数据对象 reactive{ username: '', password: '' }
        - `:model="formData"` 绑定表单数据对象
    - el-form-item 组件的 prop 属性绑定表单数据对象的属性名
        - `prop="username"` 绑定表单数据对象的属性名
- 表单验证
    - el-form 组件的 rules 属性配置表单验证规则
        - `:rules="rules"` 配置表单验证规则
    - el-form-item 组件的 prop 属性绑定表单数据对象的属性名
        - `prop="username"` 绑定表单数据对象的属性名
    - el-form-item 组件的 rules 属性配置表单验证规则
        - 配置表单验证规则
            ```js
            const rules = {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ]
            };
            ```
    - el-form 组件的 ref 属性获取表单实例
        - `<el-form ... ref='formEl'></el-form>` 获取表单实例
    - 使用 el-form 表单实例的 `.validate()` 方法验证表单
        - `loginForm.validate()` 验证表单