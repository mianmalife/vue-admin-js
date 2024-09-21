<template>
  <template v-for="menu in props.menuItem">
    <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 0">
      <template #title>
        <span>{{ menu.meta.title }}</span>
      </template>
      <sidemenu :menuItem="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <span>{{ menu.meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup>
const props = defineProps(['menuItem'])
</script>

<style lang="scss" scoped></style>