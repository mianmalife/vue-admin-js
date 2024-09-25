<template>
  <el-menu :default-active="topStore.activeKey" :ellipsis="false" @select="handleSelect" mode="horizontal" router>
    <el-menu-item v-for="menuObj in topmenu" :index="menuObj.redirect || menuObj.path">
      <Icon :icon="menuObj.meta.icon" v-if="menuObj.meta.icon" class="mr-3 text-[18px]" />
      {{ menuObj.meta.title }}
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useActiveStore } from '@/stores/topmenu';
import { useSideMenuStore } from '@/stores/sidemenu'
import { staticRoutes, dynamicRoutes } from '@/router';
const filterPath = ['/', '/login']
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const topmenu = computed(() => {
  return staticRoutes.filter(item => filterPath.includes(item.path) === false).concat(dynamicRoutes)
})
const handleSelect = (key, keyPath) => {
  sideStore.setSideMenu(dynamicRoutes.find(item => item.redirect === key))
  topStore.setKey(key)
}
</script>

<style lang="scss" scoped></style>