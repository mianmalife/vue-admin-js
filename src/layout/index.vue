<template>
  <el-container class="h-[100%]">
    <el-header class="flex items-center justify-between !h-[48px] shadow-md header" style="--el-header-padding:0">
      <div class="w-[208px] flex-shrink-0 h-[30px] leading-[30px] my-[10px] pl-[20px] font-bold">
        VUE-ADMIN-JS
      </div>
      <div class="flex flex-1 flex-shrink-0 items-center justify-between">
        <topmenu v-if="sideStore.autoSplit" />
        <opti />
      </div>
    </el-header>
    <el-container>
      <el-aside class="!w-auto bg-[var(--header-bgcolor)] relative" v-if="sideStore.menulist.length > 0">
        <siderComp />
        <div v-if="!sideStore.autoSplit" @click="sideStore.setCollapse(!sideStore.collapse)"
          class="transition-all w-[100%] flex items-center absolute bottom-5 pl-[20px] py-4 cursor-pointer text-[18px]">
          <i-ant-design:menu-unfold-outlined v-if="sideStore.collapse" />
          <i-ant-design:menu-fold-outlined v-else />
        </div>
      </el-aside>
      <el-container>
        <multiTabs v-if="multiTabsStore.isVisible" />
        <el-main class="!p-[10px]">
          <breadcrumb />
          <router-view v-slot="{ Component }" v-if="isrefreshing">
            <transition name="slide" mode="out-in">
              <component :is="Component" />
            </transition>
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
import topmenu from './topmenu.vue';
import opti from './opti.vue';
import siderComp from './sider.vue';
import { useActiveStore } from '@/stores/topmenu';
import { useSideMenuStore } from '@/stores/sidemenu'
import { useMultiTabsStore } from '@/stores/multiTabs'
import multiTabs from './multiTabs.vue';
import breadcrumb from './breadcrumb.vue';
import settings from './settings.vue'
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const multiTabsStore = useMultiTabsStore()
const route = useRoute()
const isrefreshing = ref(true)

watch(() => sideStore.autoSplit, bool => {
  if (!bool) {
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
.header {
  z-index: calc(var(--el-index-normal) + 2)
}
</style>