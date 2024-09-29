<template>
  <div class="p-[20px]">
    <el-breadcrumb separator="/" v-show="route.path !== '/workplace'">
      <el-breadcrumb-item :to="{ path: '/workplace' }" @click="handleSider">工作台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: breadcrumb.path }" v-for="breadcrumb in breadcrumbList">{{ breadcrumb.label
        }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

</template>

<script setup>
import { useSideMenuStore } from '@/stores/sidemenu'
const route = useRoute()
const sideStore = useSideMenuStore()

const breadcrumbList = computed(() => {
  const paths = route.matched.map(record => ({
    path: record.children ? null : record.path,
    name: record.name,
    label: record.meta.title,
  }));

  return paths;
});

const handleSider = () => {
  // topStore.setKey(nextTab.path)
  sideStore.setSideMenu([])
}
</script>

<style lang="scss" scoped></style>