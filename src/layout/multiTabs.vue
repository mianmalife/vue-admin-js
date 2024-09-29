<template>
  <div
    class="mutab__cls flex items-center justify-between pt-[10px] bg-[var(--card-bgcolor)] border-b border-solid border-[var(--el-border-color)]">
    <el-tabs class="px-[10px] bg-[var(--card-bgcolor)]" type="card" :model-value="route.path" @tab-click="tabClick"
      :closable="multiTabsStore.multiTabslist.length > 1" @tab-remove="handleTabsRemove">
      <el-tab-pane v-for="multiTabs in multiTabsStore.multiTabslist" :name="multiTabs.path" :key="multiTabs.path">
        <template #label>
          {{ multiTabs.meta.title }}
          <i class="el-icon icon-refresh  ml-[5px]" v-show="multiTabs.path === route.path">
            <i-ep-refreshRight class=" ease-ease duration-300 hover:scale-120" />
          </i>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-dropdown class="mb-[15px] mr-[20px]" @command="handleCommand" size="small">
      <span class="el-dropdown-link">
        <i class=" text-[var(--el-text-color-primary)] hover:text-[var(--el-color-primary)]">
          <i-ep-moreFilled class="rotate-[90deg]" />
        </i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="close"
            :disabled="!(multiTabsStore.multiTabslist.length > 1)">关闭其他</el-dropdown-item>
          <el-dropdown-item command="refresh">刷新当前页</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

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
// console.log(multiTabsStore.multiTabslist)

const tabClick = (TabsPaneContext, evevt) => {
  console.log(TabsPaneContext.props.name)
  if (TabsPaneContext.props.name === '/workplace') {
    topStore.setKey(TabsPaneContext.props.name)
    // 自动分割菜单
    if (sideStore.autoSplit) {
      sideStore.setSideMenu([])
    } else {
      const filteWorkPlace = topStore.allRoutes.map(item => {
        if (item.path === '/workplace') {
          return {
            ...item,
            children: []
          }
        } else {
          return item
        }
      })
      sideStore.setSideMenu(filteWorkPlace)
    }
  } else {
    const prefixUrl = TabsPaneContext.props.name.match(/(\/\w+)/) ? TabsPaneContext.props.name.match(/(\/\w+)/)[1] : null
    const sideMenu = topStore.allRoutes.find(item => item.path === prefixUrl)
    topStore.setKey(prefixUrl)
    if (sideStore.autoSplit) {
      sideStore.setSideMenu(sideMenu.children)
    } else {
      const filteWorkPlace = topStore.allRoutes.map(item => {
        if (item.path === '/workplace') {
          return {
            ...item,
            children: []
          }
        } else {
          return item
        }
      })
      sideStore.setSideMenu(filteWorkPlace)
    }
  }
  nextTick(() => {
    router.push({ path: TabsPaneContext.props.name })
  })
}

const handleTabsRemove = (targetTab) => {
  // console.log(targetTab)
  // console.log(route)
  const tabs = multiTabsStore.multiTabslist
  let activeTab = route.path
  if (activeTab === targetTab) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetTab) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeTab = nextTab.path
          console.log(activeTab)
        }
      }
    })
  }
  router.push({ path: activeTab })
  multiTabsStore.multiTabslist = tabs.filter((tab) => tab.path !== targetTab)
}

const handleCommand = (command) => {
  if (command === 'close') {
    console.log(route.path, multiTabsStore.multiTabslist)
    multiTabsStore.multiTabslist = multiTabsStore.multiTabslist.filter((tab) => tab.path === route.path)

    console.log(multiTabsStore.multiTabslist)
  } else {
    console.log(command)
  }
}

// const handleRefresh = (TabsPaneContext) => {
//   console.log(TabsPaneContext)
//   router.push({ path: TabsPaneContext })
// }
</script>

<style lang="scss" scoped>
.el-tabs--border-card>.el-tabs__content {
  display: none;
}

// .el-tabs--card>.el-tabs__header {
//   margin-bottom: 0 !important;
//   border-bottom: 2px solid #000000;
// }

// .el-tabs--card>.el-tabs__header .el-tabs__item {
//   border-bottom: none;
// }

// .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
//   border-bottom: 2px solid var(--el-bg-color);
// }

.el-tabs {
  --el-font-size-base: 12px;
}

.el-dropdown-link:focus {
  outline: none;
}

.icon-refresh:hover svg {
  transform: scale(1.5);
}
</style>
<style lang="scss">
.mutab__cls {
  .el-tabs--card>.el-tabs__header {
    margin-bottom: 10px;
  }
}
</style>