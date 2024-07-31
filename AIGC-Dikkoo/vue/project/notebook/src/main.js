import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'lib-flexible/flexible.js'
import { Button } from 'vant' // 按需引入vant组件

import App from './App.vue'
import router from './router'

import './assets/css/reset.css'
import 'vant/lib/index.css' // 全局引入vant样式

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button) // 使用vant组件

app.mount('#app')
