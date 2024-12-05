<template>
  <el-menu class="flex flex-1 pr-[10px]" :class="topStore.isLeft ? '' : 'justify-end'"
    :default-active="topStore.activeKey" @select="handleSelect" mode="horizontal">
    <el-menu-item v-for="menuObj in topStore.allRoutes" :index="menuObj.path">
      <Icon :icon="menuObj.meta.icon" v-if="menuObj.meta.icon" class="mr-3 text-[18px]" />
      {{ t(`${menuObj.meta.title}`) }}
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { Icon } from '@iconify/vue'
import { useActiveStore } from '@/stores/topmenu';
import { useSideMenuStore } from '@/stores/sidemenu'
const router = useRouter()
const sideStore = useSideMenuStore()
const topStore = useActiveStore()
const handleSelect = (key, keyPath) => {
  console.log(key, topStore.allRoutes)
  let currentObj
  topStore.setKey(key)
  if (key === '/workplace') {
    currentObj = null
    sideStore.setSideMenu([])
    nextTick(() => {
      router.push({ path: '/workplace' })
    })
  } else {
    currentObj = topStore.allRoutes.find(item => item.path === key)
    console.log(currentObj.children, 'currentObj.children')
    sideStore.setSideMenu(currentObj.children)
    // 暂时先跳redirect 如果没有redirect 要跳第一个菜单
    nextTick(() => {
      router.push({ path: currentObj.redirect })
    })
  }
}
</script>

<style lang="scss" scoped></style>