import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTagStore = defineStore('tagStore', () => {
  const tagList = ref([])
  const isVisible = ref(true)
  function setTagList(data) {
    const exist = tagList.value.find(item => item.path === data.path)
    if (exist) return
    tagList.value.push(data)
  }
  function removeTag(path) {
    tagList.value = tagList.value.filter(item => item.path !== path)
  }
  function clear() {
    tagList.value = []
  }
  return { tagList, setTagList, removeTag, isVisible, clear }
}, {
  persist: true
}) 