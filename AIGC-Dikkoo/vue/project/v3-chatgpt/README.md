# 企业级vue3 开发，商业项目

- 项目架构
    - vue-router 单页应用，路由功能
    - http://localhost:5173/#/

- 理解项目的需求
    - url 改变 #hash **不会刷新**当前页面，单页应用的需求。
    - hashChange router-view 相应的组件显示到router-view位置就好了。
    - 路由分为两种模式
        - hashHistory：**兼容性更好**，使用锚链接的方式，但不美观。
            - `localhost:5173/#/home`
            - `localhost:5173/#/login`
        - history：兼容性较差，使用浏览器的历史记录，美观。
            - `localhost:5173/home`
            - `localhost:5173/login`
    
- 锚链接的原生能力
    ```html
    <a name="yilou"></a>
    <div style="height:80vh;background:green"></div>
    <div style="height:80vh;background:red"></div>
    <a name="sanlou"></a>
    <div style="height:80vh;background:black"></div>
    <div style="height:80vh;background:brown"></div>
    <div style="height:80vh;background:pink"></div>
    <a href="#sanlou">上电梯</a>
    ``` 
    - 点击a标签，会跳转到对应的锚点，不会刷新页面。
    - 锚点的跳转，不会改变浏览器的历史记录。

## Tailwind CSS

### 安装Tailwind CSS

- 安装tailwindcss
    - `npm i -D tailwindcss` // -D 意为 开发依赖（Development Dependency）
    - `npx tailwindcss init -p` // 初始化tailwindcss
        - 创建 `tailwind.config.js` 配置文件
        - 创建 `postcss.config.js` 配置文件

- 修改配置文件
    - 修改 `tailwind.config.js` 文件
    ```js
        /** @type {import('tailwindcss').Config} */
        export default {
            content: ["./src/**/*.{html,js,vue,jsx,tsx}"],
            theme: {
                extend: {},
            },
            plugins: [],
        }
        ```
        > `**` 代表所有的文件，不论层级。

- 将 Tailwind CSS 引入到项目中
    - 在项目引入的CSS文件中添加如下内容：
        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```

## 链接ChatGPT

### OpenAI 模型选择

- model: `gpt-3.5-turbo`
- messages 上下文
    - 将最近几次的聊天内容，作为上下文传递给模型。上下文越多，模型的回答越准确。
- role
    - 用于区分用户和机器人的身份，以便模型更好地理解对话。
    - `user`：用户
    - `assistant`：机器人