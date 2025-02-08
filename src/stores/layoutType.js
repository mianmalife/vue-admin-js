import { ref } from "vue"
import { defineStore } from "pinia"

export const useLayoutTypeStore = defineStore('layoutType', () => {
  const mode = ref('mix')

  function setLayoutType(val) {
    mode.value = val
  }

  return {
    value: mode,
    setLayoutType
  }
}, {
  persist: true
})