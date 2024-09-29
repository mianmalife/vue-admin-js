import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSideMenuStore = defineStore('Sidemenu', () => {
  const menulist = ref([])
  const autoSplit = ref(true)
  const collapse = ref(true)

  function setSideMenu(data) {
    console.log(data, 'data')
    menulist.value = data
  }

  function setSplit(auto) {
    autoSplit.value = auto
  }

  function setCollapse(bool) {
    collapse.value = bool
  }

  return { menulist, setSideMenu, autoSplit, setSplit, collapse, setCollapse }
}, {
  persist: true
})
