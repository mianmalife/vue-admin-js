<template>
  <el-container class="h-[100%]">
    <el-header class="bg-white shadow-sm flex items-center  justify-between !px-[20px]">
      <div class="w-[190px] h-[40px] leading-[40px] my-[10px] font-bold">
        VUE-ADMIN-JS
      </div>
      <div class="flex flex-1 items-center justify-between">
        <topmenu />
        <opti />
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="bg-white shadow-sm" v-if="menulist.length > 0">
        <siderComp />
      </el-aside>
      <el-container>
        <el-main class="!p-[10px]">
          <div class="bg-white">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer class="flex justify-center" height="30px">Copyright © {{ new Date().getFullYear() }}
          vue-admin-js</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import topmenu from './topmenu.vue';
import opti from './opti.vue';
import siderComp from './sider.vue';
import { useSideMenuStore } from '@/stores/sidemenu'
const sideStore = useSideMenuStore()
const menulist = computed(() => sideStore.menulist?.children || [])
</script>

<style lang="scss" scoped></style>