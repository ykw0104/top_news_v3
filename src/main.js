import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/styles/index.scss' // 加载全局样式

const app = createApp(App)
app.use(router)
app.mount('#app')
