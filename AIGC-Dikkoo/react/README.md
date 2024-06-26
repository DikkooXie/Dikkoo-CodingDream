# 前端第一框架 React

## 开始一个 React 项目

1. 全局安装项目脚手架

```bash
npm i -g create-react-app
```

> `-g` 全局安装去了哪？
> `npm root -g` 查看全局安装路径。
> `npm config ls` 查看配置信息，`create-react-app -> path -> prefix` 为全局安装路径。

2. 创建一个名为`my-react`的react项目

```bash
create-react-app my-react
```

> create-react-app 做了什么事情？
> - git clone 模板项目
> - 下载依赖
>     - npm i react
>     - npm i react-dom

3. 理解项目结构

- my-react
    - src：开发目录
        - index.js 入口文件
        - index.css 全局样式文件
    - package.json： 项目描述文件
    - node_modules：依赖包
    - public：静态资源目录
        - index.html 首页 
            react功能挂载点`root`：
            ```html
            <div id="root"></div>
            ```

4. 启动项目

```bash
npm run start
```

> 项目启动时发生了什么？
> 1. 启用Web Server运行在3000端口；
> 2. 将 public/index.html 作为首页；
> 3. 将 src/ 下所有react开发代码打包成 /public/js/bundle.js，动态加载到index.html；
> 4. react 接管 index.html 的 root 节点，开启react世界。

localhost:3000 -> / -> index.html -> load index.js -> react 接管项

## 原理解读

编译页面时

```html
<script defer="" src="/static/js/bundle.js"></script>
```

- defer 异步加载
    推迟到 DOMContentLoaded 之后
- async 异步加载
    不会推迟，但不影响后续代码执行