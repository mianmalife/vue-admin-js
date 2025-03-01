<template>
  <el-container class="h-[100%] overflow-auto">
    <el-header class="flex items-center justify-between !h-[48px] border-b border-[var(--el-menu-border-color)] border-solid
    bg-[var(--el-menu-bg-color)] z-[100] fixed top-0 left-0 w-[100%]" style="--el-header-padding: 0">
      <div class="w-[240px] flex-shrink-0 h-[100%] font-bold flex items-center ml-[20px]">
        VUE-ADMIN-JS
      </div>
      <div
        class="flex flex-1 flex-shrink-0 items-center justify-between border-b border-[var(--el-menu-border-color)] border-solid">
        <topmenu v-if="sideStore.autoSplit" />
        <opti />
      </div>
    </el-header>
    <el-container>
      <el-aside :class="sideStore.menulist.length > 0 ? 'w-[260px] h-[100%] fixed top-[48px] left-0' : '!w-auto'"
        v-if="sideStore.menulist.length > 0">
        <siderComp />
        <div v-if="!sideStore.autoSplit" @click="sideStore.setCollapse(!sideStore.collapse)"
          class="flex items-center absolute bottom-5 pl-[20px] px-[1px] box-border py-4 cursor-pointer hover:bg-[var(--el-menu-hover-bg-color)]"
          :class="sideStore.collapse ? '!w-[63px]' : '!w-[259px]'">
          <v-svg-icon name="menu-unfold" v-if="sideStore.collapse" class="w-[18px] h-[18px]" />
          <v-svg-icon name="menu-fold" v-else class="w-[18px] h-[18px]" />
        </div>
      </el-aside>
      <el-container direction="vertical" class="max-h-[100%] mt-[48px]"
        :class="sideStore.menulist.length > 0 ? 'ml-[260px] width-[100%]' : ''">
        <multiTabs v-if="multiTabsStore.isVisible" />
        <breadcrumb v-if="breadcurmbStore.showBread" />
        <el-main class="!p-[10px] !pb-0 overflow-none">
          <router-view v-slot="{ Component }" v-if="isrefreshing" class="mb-[10px]">
            <transition name="slide" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
        <el-footer class="flex justify-center" height="30px">
          <el-text>Copyright © 2024-PRESENT skea and llf000 contributors</el-text>
        </el-footer>
      </el-container>
    </el-container>
    <settings />
  </el-container>
</template>

<script setup>
provide('refreshPage', handleRefresh)
import vSvgIcon from '@/components/v-svg-icon.vue'
import topmenu from './topmenu.vue';
import opti from './opti.vue';
import siderComp from './sider.vue';
import { useActiveStore } from '@/stores/topmenu';
import { useSideMenuStore } from '@/stores/sidemenu'
import { useMultiTabsStore } from '@/stores/multiTabs'
import { useBreadcurmbStore } from '@/stores/breadcurmb'
import multiTabs from './multiTabs.vue';
import breadcrumb from './breadcrumb.vue';
import settings from './settings.vue'
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const multiTabsStore = useMultiTabsStore()
const breadcurmbStore = useBreadcurmbStore()
const route = useRoute()
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