import { defineStore } from 'pinia'

export const userInfoStore = defineStore('userInfo', () => {
  const user = ref({})
  function setUser(data) {
    user.value = data || {}
  }
  function clear() {
    user.value = {}
  }
  return { user, setUser, clear }
}, {
  persist: true
})