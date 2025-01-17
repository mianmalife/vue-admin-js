import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBreadcurmbStore = defineStore('breadcurmb', () => {
  const showBread = ref(true)

  function toggleBread(visible) {
    showBread.value = visible
  }

  return {
    showBread,
    toggleBread
  }
}, {
  persist: true
})