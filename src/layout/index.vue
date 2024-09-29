<template>
  <el-container class="h-[100%]">
    <el-header class="bg-[var(--header-bgcolor)] flex items-center justify-between !px-[20px] !pr-[40px]">
      <div class="w-[230px] h-[40px] leading-[40px] my-[10px] font-bold">
        VUE-ADMIN-JS
      </div>
      <div class="flex flex-1 items-center justify-between">
        <topmenu v-if="sideStore.autoSplit" />
        <div v-else></div>
        <opti />
      </div>
    </el-header>
    <el-container>
      <el-aside width="260px" class="bg-[var(--header-bgcolor)]" v-if="sideStore.menulist.length > 0">
        <siderComp />
      </el-aside>
      <el-container>
        <multiTabs />
        <el-main class="!p-[10px]">
          <breadcrumb />
          <router-view v-slot="{ Component }">
            <transition name="slide" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
        <el-footer class="flex justify-center" height="30px">Copyright © {{ new Date().getFullYear() }}
          vue-admin-js</el-footer>
      </el-container>
    </el-container>
    <el-drawer v-model="drawer" title="设置" size="320" :append-to-body="true">
      <div>
        <div>
          <div class="mb-2">
            <el-text>导航模式</el-text>
          </div>
          <div class="flex items-center mb-4">
            <el-tooltip :effect="isDark ? 'dark' : 'light'" content="混合布局" placement="top">
              <div @click="isLayout = 'fixed'"
                class="relative cursor-pointer rounded w-[60px] h-[50px] shadow bg-[var(--topmenu-active-bgcolor)]">
                <div
                  class="w-[100%] h-[10px] rounded-t bg-[var(--topmenu-active-bgcolor)] border-b-[var(--el-border-color)] border-b border-b-solid">
                </div>
                <div
                  class="w-[20px] h-[40px] bg-[var(--topmenu-active-bgcolor] border-r-[var(--el-border-color)] border-r border-r-solid">
                </div>
                <i-ep-check v-if="isLayout === 'fixed'"
                  class="absolute right-[10px] top-[24px] text-[var(--el-color-primary)]"></i-ep-check>
              </div>
            </el-tooltip>
          </div>
          <div class="flex justify-between items-end mb-2">
            <el-text class="mr-2">自动分割菜单</el-text>
            <el-switch v-model="sideStore.autoSplit" />
          </div>
        </div>
        <el-divider></el-divider>
        <div class="flex justify-between items-end mb-2">
          <el-text class="mr-2">暗黑模式</el-text>
          <el-switch v-model="isDark" />
        </div>
        <div class="flex justify-between items-end mb-2">
          <el-text class="mr-2">主题色</el-text>
          <el-color-picker v-model="themeColor" @change="changeThemeColor" />
        </div>
        <el-divider></el-divider>
      </div>
      <!-- <div
        :class="['translate-all duration-300 ease-ease fixed top-[40%] bg-[var(--setting-bgcolor)] p-4 cursor-pointer rounded rounded-tr-none rounded-br-none right-[320px] z-[2200]']"
        @click="handleDrawer">
        <i-ep-close class="text-[18px]"></i-ep-close>
      </div> -->
    </el-drawer>
    <div
      :class="['translate-all ease-ease fixed top-[40%] bg-[var(--setting-bgcolor)] p-4 cursor-pointer rounded rounded-tr-none rounded-br-none right-0 z-10']"
      @click="handleDrawer">
      <i-ep-setting class="text-[18px]"></i-ep-setting>
    </div>
  </el-container>
</template>

<script setup>
import topmenu from './topmenu.vue';
import opti from './opti.vue';
import siderComp from './sider.vue';
import { useActiveStore } from '@/stores/topmenu';
import { useSideMenuStore } from '@/stores/sidemenu'
import multiTabs from './multiTabs.vue';
import breadcrumb from './breadcrumb.vue';
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const route = useRoute()
const drawer = ref(false)
const themeColor = ref('#409EFF')
const isDark = ref(false)
const isLayout = ref('fixed')

watch(() => isDark.value, newValue => {
  document.documentElement.classList.toggle('dark')
})

watch(() => sideStore.autoSplit, bool => {
  console.log(bool)
  sideStore.setSplit(bool)
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
      sideStore.setSideMenu([])
    } else {
      const prefixUrl = route.path.match(/(\/\w+)/) ? route.path.match(/(\/\w+)/)[1] : null
      const sideMenu = topStore.allRoutes.find(item => item.path === prefixUrl)
      topStore.setKey(prefixUrl)
      sideStore.setSideMenu(sideMenu.children)
    }
  }
})

function handleDrawer() {
  drawer.value = !drawer.value
}

function changeThemeColor(color) {
  console.log(color)
  document.documentElement.style.setProperty('--el-color-primary', color)
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