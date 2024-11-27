import { ref } from 'vue'
import { defineStore } from 'pinia'

interface IMultiTabs {
  path?: string;
}
type IMu = IMultiTabs[]
export const useMultiTabsStore = defineStore('MultiTabs', () => {
  const multiTabslist = ref<IMu>([])
  const isVisible = ref(true)
  function setMultiTabsStore(data: any) {
    if (multiTabslist.value) {
      if (!multiTabslist.value.find(item => item.path === data.path)) {
        multiTabslist.value.push(data)
      }
    }

  }

  function removeItem(path:string) {
    multiTabslist.value = multiTabslist.value.filter(multiTabs => multiTabs.path !== path)
  }

  function removeOtherItem(path:string) {
    multiTabslist.value = multiTabslist.value.filter(multiTabs => multiTabs.path === path) as any
  }

  function removeData() {
    multiTabslist.value = []
  }

  function setVisible() {
    isVisible.value = !isVisible.value
  }

  return { multiTabslist, setMultiTabsStore, removeItem, removeOtherItem, removeData, isVisible, setVisible }
}, {
  persist: true
})
