import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)      // Vue 只负责组件思想、mvvm、响应式... 等技术 **核心**
                    // 其它的功能交给 **社区生态** ，一起开源，一起维护；
app.use(router)    // vue-router 就是 Vue生态中的路由模块，这些模块统一使用 `use()` 方法来注册
    .mount('#app');

console.log('createApp返回的内容：',app);