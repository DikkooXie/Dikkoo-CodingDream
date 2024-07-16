import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // 状态仓库

createApp(App)
    .use(store)
    .mount('#app')
