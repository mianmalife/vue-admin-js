import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useActiveStore = defineStore('topActiveKey', () => {
  const activeKey = ref('')
  function setKey(data) {
    activeKey.value = data
  }
  return { activeKey, setKey }
}, {
  persist: true
})
