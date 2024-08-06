import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'lib-flexible/flexible.js'
import 'wc-waterfall'

import App from './App.vue'
import router from './router'

import './assets/css/reset.css'
import 'vant/es/toast/style'
import 'vant/es/notify/style'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
