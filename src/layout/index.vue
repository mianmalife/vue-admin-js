<template>
  <el-container class="h-[100%]">
    <el-header class="flex items-center justify-between !h-[48px] border-b border-[var(--el-menu-border-color)] border-solid
    bg-[var(--el-menu-bg-color)] z-2" style="--el-header-padding: 0">
      <div class="w-[240px] flex-shrink-0 h-[100%] my-[10px] font-bold flex items-center ml-[20px]">
        VUE-ADMIN-JS
      </div>
      <div
        class="flex flex-1 flex-shrink-0 items-center justify-between border-b border-[var(--el-menu-border-color)] border-solid">
        <topmenu v-if="sideStore.autoSplit" />
        <opti />
      </div>
    </el-header>
    <el-container>
      <el-aside class="!w-auto bg-[var(--header-bgcolor)] relative" v-if="sideStore.menulist.length > 0">
        <siderComp />
        <div v-if="!sideStore.autoSplit" @click="sideStore.setCollapse(!sideStore.collapse)"
          class="transition-all w-[100%] flex items-center absolute bottom-5 pl-[20px] py-4 cursor-pointer text-[18px] hover:bg-[var(--el-menu-hover-bg-color)]">
          <v-svg-icon name="menu-unfold" v-if="sideStore.collapse" />
          <v-svg-icon name="menu-fold" v-else />
        </div>
      </el-aside>
      <el-container>
        <multiTabs v-if="multiTabsStore.isVisible" />
        <el-main class="!p-[10px]">
          <breadcrumb />
          <router-view v-slot="{ Component }" v-if="isrefreshing">
            <vCard><component :is="Component" /></vCard>
          </router-view>
        </el-main>
        <el-footer class="flex justify-center" height="30px">Copyright © {{ new Date().getFullYear() }}
          vue-admin-js</el-footer>
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
import multiTabs from './multiTabs.vue';
import breadcrumb from './breadcrumb.vue';
import settings from './settings.vue'
import vCard from '@/components/v-card.vue';
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const multiTabsStore = useMultiTabsStore()
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

<style lang="scss" scoped></style>