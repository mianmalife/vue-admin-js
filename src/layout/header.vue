<template>
  <el-menu :default-active="route.path" :ellipsis="false" @select="handleSelect" mode="horizontal" router>
    <el-menu-item v-for="menuObj in topmenu" :index="menuObj.redirect || menuObj.path">{{ menuObj.meta.title
      }}</el-menu-item>
  </el-menu>
</template>

<script setup>
import { useSideMenuStore } from '@/stores/sidemenu'
import { staticRoutes, dynamicRoutes } from '@/router';
const filterPath = ['/', '/login']
const route = useRoute()
const sideStore = useSideMenuStore()
const topmenu = computed(() => {
  return staticRoutes.filter(item => filterPath.includes(item.path) === false).concat(dynamicRoutes)
})
const handleSelect = (key, keyPath) => {
  sideStore.setSideMenu(dynamicRoutes.find(item => item.redirect === key))
}
</script>

<style lang="scss" scoped>
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
  background-color: transparent;
}
</style>