<template>
  <el-tabs type="border-card" :model-value="route.path" @tab-click="tabClick">
    <el-tab-pane v-for="multiTabs in multiTabsStore.multiTabslist" :name="multiTabs.path" :key="multiTabs.path"
      :label="multiTabs.meta.title">{{
        multiTabs.meta.title }}</el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { useMultiTabsStore } from '@/stores/multiTabs';
const multiTabsStore = useMultiTabsStore()
const route = useRoute()
const router = useRouter()
console.log(multiTabsStore.multiTabslist)

const tabClick = (TabsPaneContext, evevt) => {
  console.log(TabsPaneContext)
  router.push({ path: TabsPaneContext.props.name })
}
</script>

<style lang="scss" scoped></style>