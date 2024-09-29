import { ref } from 'vue'
import { defineStore } from 'pinia'
import MultiTabs from '@/layout/multiTabs.vue'

export const useMultiTabsStore = defineStore('MultiTabs', () => {
  const multiTabslist = ref([])
  function setMultiTabsStore(data) {
    if (multiTabslist.value) {
      if (!multiTabslist.value.find(item => item.path === data.path)) {
        multiTabslist.value.push(data)
      }
    }

  }

  function removeItem(path) {
    multiTabslist.value = multiTabslist.value.filter(multiTabs => multiTabs.path !== path)
  }

  function removeOtherItem(path) {
    multiTabslist.value = multiTabslist.value.filter(multiTabs => multiTabs.path === path)
  }

  function removeData() {
    multiTabslist.value = []
  }

  return { multiTabslist, setMultiTabsStore, removeItem, removeOtherItem, removeData }
}, {
  persist: true
})
