import { defineStore } from "pinia"

export const useThemeColor = defineStore('themeColor', () => {
  const color = ref('#409EFF')

  function setThemeColor(newColor: string) {
    color.value = newColor
  }

  return {
    color,
    setThemeColor
  }
}, {
  persist: true
})