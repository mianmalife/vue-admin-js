import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSideMenuStore = defineStore('Sidemenu', () => {
  const menulist = ref([])
  function setSideMenu(data) {
    menulist.value = data
  }

  return { menulist, setSideMenu }
}, {
  persist: true
})
