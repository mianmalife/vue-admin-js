<template>
  <el-container class="h-[100%]">
    <el-header class="bg-white shadow-sm flex items-center justify-between !px-[10px]">
      <div class="w-[190px] h-[40px] leading-[40px] my-[10px] font-bold">
        VUE-ADMIN-JS
      </div>
      <headerMenuItem />
    </el-header>
    <el-container>
      <el-aside width="200px" class="bg-white shadow-sm">
        <siderMenuItem />
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
import headerMenuItem from './headerMenuItem.vue';
import siderMenuItem from './siderMenuItem.vue';
</script>

<style lang="scss" scoped></style>