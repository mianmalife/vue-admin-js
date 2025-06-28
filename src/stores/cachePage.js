import { ref } from "vue"
import { defineStore } from "pinia"

export const useCachePageStore = defineStore('cachePage', () => {
  const cacheList = ref([])

  function setCacheList(val) {
    cacheList.value = [...cacheList.value, val]
  }

  return {
    cacheList,
    setCacheList
  }
}, {
  persist: true
})