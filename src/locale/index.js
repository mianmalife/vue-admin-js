import { createI18n } from 'vue-i18n'
import zhCn from './zh-cn.json'
import enUs from './en-us.json'

const lang = localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')).lang : 'zh-cn'
const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: 'zh-cn',
  messages: {
    'zh-cn': zhCn,
    'en-us': enUs
  }
})

export default i18n