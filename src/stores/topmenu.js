import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useActiveStore = defineStore('topActiveKey', () => {
  const activeKey = ref('')
  const allRoutes = ref([])
  const isLeft = ref(true)
  function setKey(data) {
    activeKey.value = data
  }
  function setAllRoutes(routes) {
    allRoutes.value = routes
  }
  function setIsLeft(bool) {
    isLeft.value = bool
  }
  function clear() {
    activeKey.value = ''
    allRoutes.value = []
  }
  return { activeKey, setKey, allRoutes, setAllRoutes, isLeft, setIsLeft, clear }
}, {
  persist: true
})
