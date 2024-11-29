<template>
  <div
    class="mutab__cls flex items-center justify-between pt-[10px] bg-[var(--card-bgcolor)] border-b border-solid border-[var(--el-border-color)]">
    <el-tabs class="px-[10px] bg-[var(--card-bgcolor)]" type="card" :model-value="route.path" @tab-click="tabClick"
      :closable="multiTabsStore.multiTabslist.length > 1" @tab-remove="handleTabsRemove">
      <el-tab-pane v-for="multiTabs in multiTabsStore.multiTabslist" :name="multiTabs.path" :key="multiTabs.path">
        <template #label>
          {{ t(`${multiTabs.meta.title}`) }}
          <i class="el-icon icon-refresh  ml-[5px]" v-show="multiTabs.path === route.path">
            <i-ep-refreshRight class="hover:scale-150" :class="{ animateRotate: refresh }" @click="handleRefresh" />
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
          <el-dropdown-item command="close" :disabled="!(multiTabsStore.multiTabslist.length > 1)">{{ t('closeOther')
            }}</el-dropdown-item>
          <el-dropdown-item command="refresh">{{ t('Refresh') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

</template>

<script setup>
const refreshPage = inject('refreshPage')
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { useActiveStore } from '@/stores/topmenu'
import { useSideMenuStore } from '@/stores/sidemenu'
import { useMultiTabsStore } from '@/stores/multiTabs';
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const multiTabsStore = useMultiTabsStore()
const route = useRoute()
const router = useRouter()

const refresh = ref(false)

const tabClick = (TabsPaneContext, event) => {
  console.log(TabsPaneContext.props.name)
  event.stopPropagation();
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
  console.log(tabs)
  let activeTab = route.path
  if (activeTab === targetTab) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetTab) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (sideStore.autoSplit) {
          if (nextTab.path === '/workplace') {
            topStore.setKey(nextTab.path)
            sideStore.setSideMenu([])
          } else {
            const prefixUrl = nextTab.path.match(/(\/\w+)/) ? nextTab.path.match(/(\/\w+)/)[1] : null
            const sideMenu = topStore.allRoutes.find(item => item.path === prefixUrl)
            topStore.setKey(prefixUrl)
            sideStore.setSideMenu(sideMenu.children)
          }
        }
        activeTab = nextTab.path
      }
    })
  }

  router.push({ path: activeTab })
  multiTabsStore.removeItem(targetTab)
}

const handleCommand = (command) => {
  if (command === 'close') {
    // console.log(route.path, multiTabsStore.multiTabslist)
    multiTabsStore.removeOtherItem(route.path)
    // console.log(multiTabsStore.multiTabslist)
  } else {
    console.log(command)
    refreshPage()
  }
}

const handleRefresh = (e) => {
  refresh.value = true;
  setTimeout(() => {
    refresh.value = false
  }, 1000)
  e.stopPropagation()
  refreshPage()
}
</script>

<style lang="scss" scoped>
.el-tabs--border-card>.el-tabs__content {
  display: none;
}

.el-tabs {
  --el-font-size-base: 12px;
  overflow-x: auto;
}

.el-dropdown-link:focus {
  outline: none;
}

// .icon-refresh:active svg {
//   transform: rotate(360deg);
// }

.animateRotate {
  animation: rotates 1s linear infinite;
}

@keyframes rotates {

  0% {
    transform: rotate(0deg);
    scale: 1.5;
  }

  30% {
    transform: rotate(100deg);
    scale: 1.5;
  }

  50% {
    transform: rotate(180deg);
    scale: 1.5;
  }

  70% {
    transform: rotate(270deg);
    scale: 1.5;
  }

  100% {
    transform: rotate(360deg);
    scale: 1.5;
  }

}
</style>
<style lang="scss">
.mutab__cls {
  .el-tabs--card>.el-tabs__header {
    border-bottom: none;
    margin-bottom: 10px;
  }

  .el-tabs--card>.el-tabs__header .el-tabs__item {
    border-bottom: 1px solid var(--el-border-color-light);
  }
}
</style>