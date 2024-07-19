import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
// 引入全局样式
import './assets/styles/reset.css';
import './assets/styles/variable.css';
// 引入路由
import router from './router';
// element-plus 完整引入
// import ElementPlus from 'element-plus' // 引入element-plus
// import 'element-plus/dist/index.css' // 引入element-plus样式
// element-plus icon 完整引入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
const pinia = createPinia();

app
    .use(router)
    .use(pinia)
    // .use(ElementPlus) // element-plus 完整引入
    .mount('#app');

// 引入 element-plus icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 自定义指令
import { usePermissionStore } from './store/permission';
const permissionStore = usePermissionStore();
app.directive('permission', {
    mounted(el, binding) {
        if(binding.value && permissionStore.role.includes(binding.value)) {
            el['hidden'] = true;
        }
    }
})