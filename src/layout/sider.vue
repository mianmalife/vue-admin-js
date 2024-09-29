<template>
  <el-menu :default-active="route.path" @open="handleOpen" @close="handleClose" router :collapse="false">
    <template v-for="menuItem in sideStore.menulist">
      <el-sub-menu :index="menuItem.path" v-if="menuItem.children && menuItem.children.length > 0">
        <template #title>
          <Icon :icon="menuItem.meta.icon" v-if="menuItem.meta.icon" class="text-[18px]" />
          <span class="pl-[6px]">{{ menuItem.meta.title }}</span>
        </template>
        <sidemenu :menuItem="menuItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="menuItem.path">
        <Icon :icon="menuItem.meta.icon" v-if="menuItem.meta.icon" class="text-[18px]" />
        <span class="pl-[6px]">{{ menuItem.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import sidemenu from './sidemenu.vue'
import { useSideMenuStore } from '@/stores/sidemenu'
const sideStore = useSideMenuStore()
const route = useRoute()
const props = defineProps({
  isSplit: {
    type: Boolean,
    default: true
  }
})

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