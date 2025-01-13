<template>
  <el-menu class="flex flex-1 pr-[10px] !h-[48px] !border-b-0" :class="topStore.isLeft ? '' : 'justify-end'"
    :default-active="topStore.activeKey" mode="horizontal" router>
    <el-menu-item v-for="menuObj in topStore.allRoutes" :index="menuObj.path">
      <Icon :icon="menuObj.meta.icon" v-if="menuObj.meta.icon" class="mr-3 text-[16px]" />
      {{ t(`${menuObj.meta.title}`) }}
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { Icon } from '@iconify/vue'
import { useActiveStore } from '@/stores/topmenu';
const topStore = useActiveStore()
</script>

<style lang="scss" scoped>
.el-menu--horizontal > .el-menu-item.is-active {
  background-color: var(--el-menu-hover-bg-color) !important;
}
</style>