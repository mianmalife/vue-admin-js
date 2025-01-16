<template>
  <span>
    <v-svg-icon name="moon" class="mr-[10px] cursor-pointer text-[var(--el-text-color-regular)] hover:text-[var(--el-color-primary)]" v-if="!isDark" @click="clickIcon" />
    <v-svg-icon name="sun" class="mr-[10px] cursor-pointer text-[var(--el-text-color-regular)] hover:text-[var(--el-color-primary)]" v-else @click="clickIcon" />
  </span>
</template>

<script setup>
import vSvgIcon from './v-svg-icon.vue'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
function clickIcon(e) {
  const isApperance = document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // 不支持startViewTransition或者用户开启了减弱动画功能
  if (!isApperance) {
    toggleDark()
    return
  }
  const { clientX, clientY } = e
  const endRadius = Math.hypot(
    Math.max(clientX, innerWidth - clientX),
    Math.max(clientY, innerHeight - clientY)
  )
  // 开始一次视图过渡
  const transition = document.startViewTransition(() => {
    toggleDark()
  })
  // 等待伪元素创建完成
  transition.ready.then(() => {
    const clipPath = [
      `circle(0 at ${clientX}px ${clientY}px)`,
      `circle(${endRadius}px at ${clientX}px ${clientY}px)`
    ]
    // 新视图的根元素动画
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath
      },
      {
        duration: 400,
        easing: 'ease-in',
        // 指定要附加动画的伪元素
        pseudoElement: isDark.value ? "::view-transition-old(root)" : "::view-transition-new(root)",
      }
    )
  })
}
</script>

<style lang="scss" scoped></style>