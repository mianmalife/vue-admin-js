<template>
<div class="relative px-[10px] mt-[10px]">
  <el-tabs type="card" :model-value="route.path" @tab-click="tabClick"
      @tab-remove="handleTabsRemove">
      <el-tab-pane v-for="multiTabs in multiTabsStore.multiTabslist" :name="multiTabs.path" :key="multiTabs.path"
        :closable="multiTabs.name !== 'workplace'">
        <template #label>
          {{ t(`${multiTabs.meta.title}`) }}
          <i class="el-icon icon-refresh  ml-[5px]" v-show="multiTabs.path === route.path">
            <v-svg-icon name='refresh' class="hover:scale-125" :class="{ animateRotate: refresh }"
              @click="handleRefresh" />
          </i>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-dropdown class="!absolute top-[50%] translate-y-[-50%] right-[20px]" @command="handleCommand" size="small">
      <span class="el-dropdown-link">
        <i class=" text-[var(--el-text-color-primary)] hover:text-[var(--el-color-primary)]">
          <v-svg-icon name="epmore" class="rotate-[90deg]" />
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
import vSvgIcon from '@/components/v-svg-icon.vue'
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
  if (TabsPaneContext.props.name === route.path) return
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
  const tabs = multiTabsStore.multiTabslist
  if (tabs.length === 1) return
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
    multiTabsStore.removeOtherItem(route.path)
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
.el-tabs {
  --el-font-size-base: 12px;
}
.el-tabs--border-card>.el-tabs__content {
  display: none;
}

.el-dropdown-link:focus {
  outline: none;
}

:deep(.el-tabs__item) .is-icon-close:hover {
  --el-text-color-placeholder: var(--el-color-primary);
  opacity: 0.5;
}

.animateRotate {
  animation: rotates 1s linear infinite;
}

@keyframes rotates {

  0% {
    transform: rotate(0deg);
    scale: 1.25;
  }

  30% {
    transform: rotate(100deg);
    scale: 1.25;
  }

  50% {
    transform: rotate(180deg);
    scale: 1.25;
  }

  70% {
    transform: rotate(270deg);
    scale: 1.25;
  }

  100% {
    transform: rotate(360deg);
    scale: 1.25;
  }

}

:deep(.el-tabs__header) {
  margin-bottom: 0;
}
</style>