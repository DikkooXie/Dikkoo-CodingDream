# React 组件化

### 构建React项目的两个脚手架

1. create-react-app（官方构建工具）
    - `npm create-react-app my-app`
2. vite（新一代构建工具）
    - `npm init vite` -> 选择构建react项目

### JavaScript模块化

早期的JavaScript是没有模块化的，其业务主要是DOM交互与事件处理，不存在太多扩展文件的需求。

node.js的出现，使得JavaScript的模块化成为可能。

Node.js的V8引擎封装到命令行，js解析、数据库、文件、网络...都可以通过node.js实现。

node.js的模块化采用CommonJS规范，即`module.exports`与`require`。

CommonJS规范是ES6模块化的前身，但是CommonJS是同步加载模块，而ES6模块化是异步加载模块。

### React组件化

React组件化是指将页面拆分成多个组件，每个组件负责一部分功能，最终组合成一个完整的页面。

- 组件（Component）
    - 根组件 App
        - JSX里用html标签的方式来插入元素
        - 标签不是html内置标签，而是组件本身
    - 子组件
    - 旧开发打理的是真实DOM树
    - 组件树（React组件树）子组件
- 关系
    - 网页（#root） -> 组件（App） -> element 节点 + css + js
- 极致的模块化：一个组件（文件）只做一件事