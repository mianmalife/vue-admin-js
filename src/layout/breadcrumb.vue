<template>
  <div class="p-[10px]" v-if="route.path !== '/workplace'">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/workplace' }" @click="handleSider">工作台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: breadcrumb.path }" v-for="breadcrumb in breadcrumbList">{{ breadcrumb.label
        }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

</template>

<script setup>
import { useActiveStore } from '@/stores/topmenu'
import { useSideMenuStore } from '@/stores/sidemenu'
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const route = useRoute()

const breadcrumbList = computed(() => {
  const paths = route.matched.map(record => ({
    path: record.children ? null : record.path,
    name: record.name,
    label: record.meta.title,
  }));

  return paths;
});

const handleSider = () => {
  topStore.setKey(route.path)
  sideStore.setSideMenu([])
}
</script>

<style lang="scss" scoped></style>