## 相关推荐算法

- 大前端
    - 使用vue3 + vue router 制作单页应用
    - json-server 模拟后端数据
        - backend 使用AI进行相关推荐
    - 样式使用tailwind CSS
    - 接口请求使用axios
        - 所有请求均在api文件夹下的index.js中进行管理
        - fetch 也可以, 但码风很乱; axios很优雅, 是目前最火的ajax请求库

- router-link 高级用法
    - 动态路由
    ```js
    {
        path: '/article/:id',
        name: 'article',
        component: () => import('../views/Article.vue')
    }
    ```
    ```html
    <router-link :to="{name: 'article', params: {id: 1}}">文章1</router-link>
    ```
        - 配置项: `name` 路由名称, `params` 路由参数


## 后端准备

1. `backend`文件夹 `npm init -y` 初始化项目
2. 创建`db.json`数据源, 模拟后端返回的文章数据
3. 安装`json-server`模拟后端服务
    ```shell
    npm install json-server
    ```