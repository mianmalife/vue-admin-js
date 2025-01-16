<template>
  <el-menu class="flex flex-1 pr-[10px] !h-[48px] !border-b-0" :class="topStore.isLeft ? '' : 'justify-end'"
    :default-active="topStore.activeKey" mode="horizontal" router>
    <el-menu-item v-for="menuObj in topStore.allRoutes" :index="menuObj.path">
      <v-svg-icon :name="menuObj.meta.icon" v-if="menuObj.meta.icon" class="mr-3" />
      {{ t(`${menuObj.meta.title}`) }}
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import vSvgIcon from '@/components/v-svg-icon.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { useActiveStore } from '@/stores/topmenu';
const topStore = useActiveStore()
</script>

<style lang="scss" scoped>
.el-menu--horizontal>.el-menu-item.is-active {
  background-color: var(--el-menu-hover-bg-color) !important;
}
</style>