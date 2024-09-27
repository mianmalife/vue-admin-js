<template>
  <el-container class="h-[100%]">
    <el-header class="bg-[var(--header-bgcolor)] flex items-center  justify-between !px-[20px] !pr-[40px]">
      <div class="w-[190px] h-[40px] leading-[40px] my-[10px] font-bold">
        VUE-ADMIN-JS
      </div>
      <div class="flex flex-1 items-center justify-between">
        <topmenu />
        <opti />
      </div>
    </el-header>
    <el-container>
      <el-aside width="260px" class="bg-[var(--header-bgcolor)]" v-if="menulist.length > 0">
        <siderComp />
      </el-aside>
      <el-container>
        <multiTabs />
        <el-main class="!p-[10px]">
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
        <div class="flex justify-between items-end mb-2">
          <el-text class="mr-2">暗黑模式</el-text>
          <el-switch v-model="isDark" @change="changeDark" />
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
import { useSideMenuStore } from '@/stores/sidemenu'
import multiTabs from './multiTabs.vue';
const sideStore = useSideMenuStore()
const menulist = computed(() => sideStore.menulist?.children || [])
const drawer = ref(false)
const themeColor = ref('#409EFF')
const isDark = ref(false)
function handleDrawer() {
  drawer.value = !drawer.value
}
function changeThemeColor(color) {
  console.log(color)
  document.documentElement.style.setProperty('--el-color-primary', color)
}
function changeDark(isDa) {
  console.log(isDa)
  document.documentElement.classList.toggle('dark')
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