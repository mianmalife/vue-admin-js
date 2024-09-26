<template>
  <el-tabs type="border-card" :model-value="route.path" @tab-click="tabClick">
    <el-tab-pane v-for="multiTabs in multiTabsStore.multiTabslist" :name="multiTabs.path" :key="multiTabs.path"
      :label="multiTabs.meta.title">{{
        multiTabs.meta.title }}</el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { useActiveStore } from '@/stores/topmenu'
import { useSideMenuStore } from '@/stores/sidemenu'
import { useMultiTabsStore } from '@/stores/multiTabs';
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const multiTabsStore = useMultiTabsStore()
const route = useRoute()
const router = useRouter()
console.log(multiTabsStore.multiTabslist)

const tabClick = (TabsPaneContext, evevt) => {
  console.log(TabsPaneContext.props.name)
  if (TabsPaneContext.props.name === '/workplace') {
    topStore.setKey(TabsPaneContext.props.name)
    sideStore.setSideMenu({})
  } else {
    const prefixUrl = TabsPaneContext.props.name.match(/(\/\w+)/) ? TabsPaneContext.props.name.match(/(\/\w+)/)[1] : null
    const sideMenu = topStore.allRoutes.find(item => item.path === prefixUrl)
    topStore.setKey(prefixUrl)
    sideStore.setSideMenu(sideMenu)
  }
  nextTick(() => {
    router.push({ path: TabsPaneContext.props.name })
  })
}
</script>

<style lang="scss" scoped></style>