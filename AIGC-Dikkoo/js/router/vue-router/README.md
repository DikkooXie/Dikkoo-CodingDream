# 手写 vue-router

## Vue Router 的关键功能

1. router 初始化以及配置
2. 路由守卫
    - router.beforeEach：全局前置守卫
3. 路由懒加载, 可以更快显示页面的主要内容。
    ```js
    {
        path: '/about',
        component: () => import('./views/About.vue') // 使用 import() 实现懒加载
    }
    ```
4. router-link 和 router-view 组件
    > Vue的组件
    > - 自定义组件：我们自己定义的组件
    > - 内置组件：Vue自带的组件，如router-link和router-view
    > - 全局组件：在Vue实例中注册的组件
    > 如果组件没有被引入（不存在）的话，dom会把它当作一般标签解析。

## Vue Router 的实现原理

Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。Vue Router 通过定义路由表的方式，将 URL 和组件映射关系的路由表，来实现路由的功能。

### router-link 与 router-view

- 这两个组件都来自于 vue-router，属于注入的全局组件。
    - vue.component() 全局组件的理解
- vue.use() vue向插件生态注入
- router 插件 准备好install方法

- 写一个全局组件
    - 组件注册 
        - 官方文档： https://cn.vuejs.org/guide/components/registration.html
        - 具体方法：
            ```js
            import 'RouterLink' from './RouterLink.vue'; // 引入自己编写的组件
            app.component('router-link', RouterLink); // 将自己写的组件注入到全局
            ```
    - 在组件中使用`<slot></slot>` 插槽
        - 官方文档： https://cn.vuejs.org/guide/components/slots.html
        - 将组件的内部内容交给外部自定义
        - 提升了组件的可复用性

- http://localhost:5173/posts/:id?a=1&b=2#/about
    - 协议 http://
    - 域名 localhost
    - 端口号 5173
    - path /posts
    - params :id
    - query ?a=1&b=2
    - hash #/about

## 高级的响应式
- ref/reactive
- 在模板、在组件、在任何地方 都会更新