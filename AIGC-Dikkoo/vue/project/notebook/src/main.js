import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'lib-flexible/flexible.js'
import 'wc-waterfall'

import App from './App.vue'
import router from './router'

import './assets/css/reset.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
