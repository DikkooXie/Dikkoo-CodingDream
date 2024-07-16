## hash-router

- http协议是无状态的，服务器端不可主动推送数据到浏览器。
- 路由的改变 `/` -> `/page2` 会让浏览器刷新页面，并重新发送请求，服务器端返回全部的HTML。

### 单页应用带来的全新体验

单页应用（Single Page Application, SPA）的特点：
- url改变，但不会刷新页面。
- 路由改变，只会请求数据，不会请求HTML、CSS、JS等资源。
- 加载快，不会白屏，用户体验好。

单页应用就是在实现“不刷新页面”的基础上，实现页面的动态刷新/切换。这很符合手机App的体验。

技术原理：
- `#/page2` 锚链接，不会刷新页面，只会改变url。
- `hashChange` 事件 联动 ajax / DOM 操作 / router-view 实现组件切换

### 手搓一个hash-router

```js
// hash-router.js

```