import { createApp } from 'vue'
import pina from '@/stores/creaPinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from './locale'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "./index.css"
import './main.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pina)
pina.use(piniaPluginPersistedstate)
app.use(i18n)
app.use(router)

app.mount('#app')
