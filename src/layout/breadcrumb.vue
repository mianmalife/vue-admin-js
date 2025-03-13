<template>
  <div class="px-[10px] pt-[10px]" v-if="route.path !== '/workplace'">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/workplace' }" @click="handleSider">{{ t('Workbenches') }}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: breadcrumb.path }" v-for="breadcrumb in breadcrumbList">{{
        t(`${breadcrumb.label}`)
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { useActiveStore } from '@/stores/topmenu'
import { useSideMenuStore } from '@/stores/sidemenu'
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const route = useRoute()

function getDeepPath(val) {
  if (val[0] && val[0].children.length > 0) {
    return getDeepPath(val[0].children)
  }
  return val[0].path
}

const breadcrumbList = computed(() => {
  const paths = route.matched.map(record => ({
    path: record.children.length === 0 ? null : getDeepPath(record.children),
    name: record.name,
    label: record.meta.title,
  }));
  console.log(paths)
  return paths;
});

const handleSider = () => {
  topStore.setKey(route.path)
  sideStore.setSideMenu([])
}
</script>

<style lang="scss" scoped>
:deep(.el-breadcrumb__inner.is-link) {
  font-weight: normal;
}

:deep(.el-breadcrumb__separator) {
  margin: 0 6px;
}
</style>