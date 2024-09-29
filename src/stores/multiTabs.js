import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMultiTabsStore = defineStore('MultiTabs', () => {
  const multiTabslist = ref([])
  function setMultiTabsStore(data) {
    if (multiTabslist.value) {
      if (!multiTabslist.value.find(item => item.path === data.path)) {
        multiTabslist.value.push(data)
      }
    }

  }

  function removeData() {
    multiTabslist.value = []
  }

  return { multiTabslist, setMultiTabsStore, removeData }
}, {
  persist: true
})
