import { createApp } from 'vue';
import App from './App.vue';
// 引入全局样式
import './assets/reset.css';
// 引入路由
import router from './router';
// element-plus 完整引入
// import ElementPlus from 'element-plus' // 引入element-plus
// import 'element-plus/dist/index.css' // 引入element-plus样式

createApp(App)
    .use(router)
    // .use(ElementPlus) // element-plus 完整引入
    .mount('#app');
