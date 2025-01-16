<template>
  <el-menu class="h-[100%]" :class="sideStore.collapse && !sideStore.autoSplit ? '!w-[64px]' : '!w-[260px]'"
    :default-active="route.path" @open="handleOpen" @close="handleClose" router :collapse="sideStore.collapse"
    :collapse-transition="false">
    <template v-for="menuItem in sideStore.menulist">
      <el-sub-menu :index="menuItem.path" v-if="menuItem.children && menuItem.children.length > 0">
        <template #title>
          <v-svg-icon :name="menuItem.meta.icon"v-if="menuItem.meta.icon" class="text-[16px]"
            :class="sideStore.collapse ? 'mx-auto' : ''" />
          <span :class="sideStore.collapse || sideStore.autoSplit ? 'pl-0' : 'pl-[6px]'">{{ t(`${menuItem.meta.title}`)
            }}</span>
        </template>
        <sidemenu :menuItem="menuItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="menuItem.path">
        <v-svg-icon :name="menuItem.meta.icon" v-if="menuItem.meta.icon" class="text-[18px]"
          :class="sideStore.collapse ? 'mx-auto' : ''" />
        <template #title>
          <span :class="sideStore.collapse || sideStore.autoSplit ? 'pl-0' : 'pl-[6px]'">{{ t(`${menuItem.meta.title}`)
            }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import vSvgIcon from '@/components/v-svg-icon.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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

watch(() => sideStore.autoSplit, newValue => {
  if (newValue) {
    sideStore.setCollapse(false)
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
:deep(.el-menu-item.is-active) {
  background-color: var(--el-menu-hover-bg-color) !important;
}

:deep(.el-sub-menu.is-active)>.el-sub-menu__title {
  color: var(--el-menu-active-color);
}
</style>