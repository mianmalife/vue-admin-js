import { createI18n } from 'vue-i18n'
import zhCn from './zh-cn.json'
import en from './en.json'

const i18n = createI18n({
  locale: 'zh-cn',
  messages: {
    'zh-cn': zhCn,
    'en-us': en
  }
})

export default i18n