import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/styles/index.scss' // 加载全局样式

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
