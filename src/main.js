import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from './locale'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "./index.css"

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)

app.mount('#app')
