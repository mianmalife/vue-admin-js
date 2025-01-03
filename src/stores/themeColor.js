import { defineStore } from "pinia"

export const useThemeColor = defineStore('themeColor', () => {
  const color = ref('#fd5732')

  function setThemeColor(newColor) {
    color.value = newColor
  }

  return {
    color,
    setThemeColor
  }
}, {
  persist: true
})