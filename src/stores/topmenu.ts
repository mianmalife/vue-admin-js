import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useActiveStore = defineStore('topActiveKey', () => {
  const activeKey = ref('')
  const allRoutes = ref([])
  function setKey(data: string) {
    activeKey.value = data
  }
  function setAllRoutes(routes: []) {
    allRoutes.value = routes
  }
  return { activeKey, setKey, allRoutes, setAllRoutes }
}, {
  persist: true
})
