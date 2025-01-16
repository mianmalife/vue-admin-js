import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLangStore = defineStore('v-lang', () => {
  const lang = ref('zh-cn')

  function setLang(lan) {
    lang.value = lan
  }

  return { lang, setLang }
}, {
  persist: true
})
