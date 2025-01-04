<template>
  <!-- <div class="mutab__cls flex items-center justify-between pt-[10px] pb-[-20px]  border-b border-solid">
    <el-tabs class="px-[10px] mb-[-10px]" type="card" :model-value="route.path" @tab-click="tabClick"
      @tab-remove="handleTabsRemove">
      <el-tab-pane v-for="multiTabs in multiTabsStore.multiTabslist" :name="multiTabs.path" :key="multiTabs.path"
        :closable="multiTabs.name !== 'workplace'">
        <template #label>
          {{ t(`${multiTabs.meta.title}`) }}
          <i class="el-icon icon-refresh  ml-[5px]" v-show="multiTabs.path === route.path">
            <i-ep-refreshRight class="hover:scale-125" :class="{ animateRotate: refresh }" @click="handleRefresh" />
          </i>
        </template>
</el-tab-pane>
</el-tabs>
</div> -->

  <div class="mutab h-[48px] pt-[8px] flex items-center justify-between relative ">
    <div class="h-[100%] relative overflow-x-auto">
      <div class="mutab_list h-[100%] flex px-[10px] whitespace-nowrap">
        <div
          class="mutab_item h-[100%] px-[20px] flex shrink-0 items-center justify-center font-medium text-[var(--el-text-color-primary] text-[12px] bg-black/[.02]"
          :class="multiTabs.path === route.path ? 'isActive' : ''" v-for="multiTabs in multiTabsStore.multiTabslist"
          :key="multiTabs.path" @click="tabClick(multiTabs)">
          <span>{{ t(`${multiTabs.meta.title}`) }}</span>
          <i class="ml-[5px]" v-show="multiTabs.path === route.path">
            <i-ep-refreshRight class="hover:scale-125" :class="{ animateRotate: refresh }"
              @click.stop="handleRefresh" />
          </i>
          <i class="ml-[5px] hover:scale-125" v-show="multiTabs.name !== 'workplace'">
            <i-ep-close @click.stop="handleTabsRemove(multiTabs.path)" />
          </i>
        </div>
      </div>
    </div>
    <el-dropdown class="mr-[20px]" @command="handleCommand" size="small">
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

const tabClick = (context) => {
  console.log(context.path)
  if (context.path === '/workplace') {
    topStore.setKey(context.path)
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
    const prefixUrl = context.path.match(/(\/\w+)/) ? context.path.match(/(\/\w+)/)[1] : null
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
    router.push({ path: context.path })
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
        console.log('22')
      }
    })
  }

  router.push({ path: activeTab })
  multiTabsStore.removeItem(targetTab)
}

const handleCommand = (command, e) => {
  if (command === 'close') {
    // console.log(route.path, multiTabsStore.multiTabslist)
    multiTabsStore.removeOtherItem(route.path)
    // console.log(multiTabsStore.multiTabslist)
  } else {
    handleRefresh()
  }
}

const handleRefresh = () => {
  refresh.value = true;
  setTimeout(() => {
    refresh.value = false
  }, 1000)
  // e.stopPropagation()
  refreshPage()
}
</script>

<style lang="scss" scoped>
.mutab::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(5, 5, 5, .06)
}

.mutab_item {
  box-sizing: border-box;
  margin: 0 1px;
  border: 1px solid rgba(5, 5, 5, .06);
  border-radius: 8px 8px 0 0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  overflow: hidden;
  z-index: 10;

  span {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}

.mutab_item:hover {
  cursor: pointer;

  span {
    color: var(--el-color-primary);
  }

}

.mutab_item.isActive {
  background: #ffffff;
  border-bottom-color: #ffffff;

  span {
    color: var(--el-color-primary);
  }

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
</style>