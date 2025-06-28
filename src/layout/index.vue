<template>
  <el-container class="h-[100%]">
    <el-aside class="fixed left-0 top-0 pt-[48px] !w-[auto] h-[100%]" v-if="sideStore.menulist.length > 0">
      <siderComp v-if="layoutTypeStore.value === 'mix'" />
      <div v-if="!sideStore.autoSplit && layoutTypeStore.value !== 'top'"
        @click="sideStore.setCollapse(!sideStore.collapse)"
        class="px-[20px] mx-auto py-4 cursor-pointer bg-[var(--el-menu-bg-color)] hover:bg-[var(--el-menu-hover-bg-color)] border-r border-[var(--el-menu-border-color)] border-solid">
        <v-svg-icon name="menu-unfold" v-if="sideStore.collapse" class="w-[18px] h-[18px]" />
        <v-svg-icon name="menu-fold" v-else class="w-[18px] h-[18px]" />
      </div>
    </el-aside>
    <el-container direction="vertical" class="transition-all" :class="rightContentCls">
      <el-header class="flex items-center justify-between !h-[48px] border-b border-[var(--el-menu-border-color)] border-solid
    bg-[var(--el-menu-bg-color)] z-2 opacity-0" style="--el-header-padding: 0">
        <div class="w-[240px] flex-shrink-0 h-[100%] font-bold flex items-center ml-[20px]">
          VUE-ADMIN-JS
        </div>
        <div
          class="flex flex-1 flex-shrink-0 items-center justify-between border-b border-[var(--el-menu-border-color)] border-solid">
          <topmenu v-if="sideStore.autoSplit || layoutTypeStore.value === 'top'" />
          <opti />
        </div>
      </el-header>
      <el-header class="fixed left-0 top-0 w-[100%] flex items-center justify-between !h-[48px] border-b border-[var(--el-menu-border-color)] border-solid
    bg-[var(--el-menu-bg-color)] !z-[100]" style="--el-header-padding: 0">
        <div class="w-[240px] flex-shrink-0 h-[100%] font-bold flex items-center ml-[20px]">
          VUE-ADMIN-JS
        </div>
        <div
          class="flex flex-1 flex-shrink-0 items-center justify-between border-b border-[var(--el-menu-border-color)] border-solid">
          <topmenu v-if="sideStore.autoSplit || layoutTypeStore.value === 'top'" />
          <opti />
        </div>
      </el-header>
      <el-main class="!p-0" style="overflow: initial">
        <multi-tag v-if="tagStore.isVisible" />
        <breadcrumb v-if="breadcurmbStore.showBread" />
        <div class="m-[10px]">
          <router-view v-slot="{ Component }" v-if="isrefreshing" class="mb-[10px]">
            <transition name="slide" mode="out-in">
              <keep-alive :include="cachePageStore.cacheList">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
          <el-footer class="flex justify-center" height="30px">
            <el-text>Copyright © 2024-PRESENT skea and llf000 contributors</el-text>
          </el-footer>
        </div>
      </el-main>
    </el-container>
    <settings />
  </el-container>
</template>

<script setup>
provide('refreshPage', handleRefresh)
import multiTag from './multiTag.vue';
import vSvgIcon from '@/components/v-svg-icon.vue'
import topmenu from './topmenu.vue';
import opti from './opti.vue';
import siderComp from './sider.vue';
import { useTagStore } from '@/stores/multiTag';
import { useActiveStore } from '@/stores/topmenu';
import { useSideMenuStore } from '@/stores/sidemenu'
import { useBreadcurmbStore } from '@/stores/breadcurmb'
import { useLayoutTypeStore } from '@/stores/layoutType'
import { useCachePageStore } from '@/stores/cachePage';
import breadcrumb from './breadcrumb.vue';
import settings from './settings.vue'
const tagStore = useTagStore()
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const breadcurmbStore = useBreadcurmbStore()
const route = useRoute()
const layoutTypeStore = useLayoutTypeStore()
const cachePageStore = useCachePageStore()
const isrefreshing = ref(true)

watch(() => [sideStore.autoSplit, route.path], deps => {
  if (!deps[0]) {
    // 关闭自动分割菜单
    const filteWorkPlace = topStore.allRoutes.map(item => {
      if (item.path === '/workplace') {
        return {
          ...item,
          children: []
        }
      } else {
        return item
      }
    })
    sideStore.setSideMenu(filteWorkPlace)
  } else {
    if (route.path === '/workplace') {
      topStore.setKey('/workplace')
      sideStore.setSideMenu([])
    } else {
      const prefixUrl = route.path.match(/(\/\w+)/) ? route.path.match(/(\/\w+)/)[1] : null
      const sideMenu = topStore.allRoutes.find(item => item.path === prefixUrl)
      topStore.setKey(prefixUrl)
      sideStore.setSideMenu(sideMenu.children)
    }
    sideStore.setCollapse(false)
  }
}, {
  immediate: true
})

const rightContentCls = computed(() => ({
  '!ml-[260px]': layoutTypeStore.value !== 'top' && sideStore.menulist.length > 0,
  '!ml-[64px]': sideStore.collapse
}))

function handleRefresh() {
  isrefreshing.value = false
  nextTick(() => {
    isrefreshing.value = true
  })
}

</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.15s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>