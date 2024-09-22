<template>
  <el-menu :default-active="route.path" @open="handleOpen" @close="handleClose" v-if="menulist.length > 0" router>
    <template v-for="menuItem in menulist">
      <el-sub-menu :index="menuItem.path" v-if="menuItem.children && menuItem.children.length > 0">
        <template #title>
          <span>{{ menuItem.meta.title }}</span>
        </template>
        <sidemenu :menuItem="menuItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="menuItem.path">
        <span>{{ menuItem.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import sidemenu from './sidemenu.vue'
import { useSideMenuStore } from '@/stores/sidemenu'
const sideStore = useSideMenuStore()
const route = useRoute()
const menulist = computed(() => sideStore.menulist?.children || [])
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
:deep(.el-sub-menu.is-active)>.el-sub-menu__title {
  color: var(--el-menu-active-color);
}
</style>