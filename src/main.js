import { createApp } from 'vue'
import pina from '@/stores/creaPinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from './locale'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/es/components/message/style/css'
import "./index.css"
import './main.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pina)
pina.use(piniaPluginPersistedstate)
app.use(i18n)
app.use(router)

async function enableMocks() {
  return true
  // if (process.env.NODE_ENV !== 'development') {
  //   return
  // }
  // const { worker } = await import('../mock/browser')
  // return worker.start({ onUnhandledRequest: 'bypass' })
}

enableMocks().then(() => {
  app.mount('#app')
})
