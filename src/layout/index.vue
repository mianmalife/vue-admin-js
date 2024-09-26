<template>
  <el-container class="h-[100%]">
    <el-header class="bg-white flex items-center  justify-between !px-[20px] !pr-[40px]">
      <div class="w-[190px] h-[40px] leading-[40px] my-[10px] font-bold">
        VUE-ADMIN-JS
      </div>
      <div class="flex flex-1 items-center justify-between">
        <topmenu />
        <opti />
      </div>
    </el-header>
    <el-container>
      <el-aside width="260px" class="bg-white" v-if="menulist.length > 0">
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
    <el-drawer v-model="drawer" title="" size="320" :append-to-body="true">
      <span>Hi there!</span>
    </el-drawer>
    <div
      :class="['transition-all duration-300 delay-75 ease-ease fixed top-[40%] bg-[var(--setting-bgcolor)] p-4 cursor-pointer rounded rounded-tr-none rounded-br-none', { ['right-0 z-10']: !drawer }, { ['right-[320px] z-[2200]']: drawer }]"
      @click="handleDrawer">
      <i-ep-setting class="text-[18px]" v-if="!drawer"></i-ep-setting>
      <i-ep-close class="text-[18px]" v-else></i-ep-close>
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
function handleDrawer() {
  drawer.value = !drawer.value
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