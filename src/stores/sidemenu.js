import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSideMenuStore = defineStore('Sidemenu', () => {
  const menulist = ref([])
  const autoSplit = ref(true)

  function setSideMenu(data) {
    console.log(data, 'data')
    menulist.value = data
  }

  function setSplit(auto) {
    autoSplit.value = auto
  }

  return { menulist, setSideMenu, autoSplit, setSplit }
}, {
  persist: true
})
