// CSS
import './assets/reset.css'

// Vue3
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Vant4
// 1. 引入你需要的组件
import { Button, Area, ActionSheet, Cell, CellGroup } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
// 3. 注册你需要的组件
app.use(Button);
app.use(Area);
app.use(ActionSheet);
app.use(Cell);
app.use(CellGroup);