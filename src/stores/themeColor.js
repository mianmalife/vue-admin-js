import { defineStore } from "pinia"

export const useThemeColor = defineStore('themeColor', () => {
  const color = ref('#409EFF')

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