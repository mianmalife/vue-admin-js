<template>
  <el-menu v-if="layoutTypeStore.value === 'top'" class="flex w-[100%] pr-[10px] !h-[48px] !border-b-0"
    :class="topStore.isLeft ? '' : 'justify-end'" :default-active="route.path" mode="horizontal">
    <template v-for="menuItem in topStore.allRoutes">
      <el-sub-menu :index="menuItem.path" v-if="menuItem.children && menuItem.children.length > 0">
        <template #title>
          <v-svg-icon :name="menuItem.meta.icon" v-if="menuItem.meta.icon" class="mr-3" />
          <span>{{ t(`${menuItem.meta.title}`) }}</span>
        </template>
        <sidemenu :menuItem="menuItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="menuItem.path" @click="handlerMenuItem(menuItem.meta.url || menuItem.path)">
        <v-svg-icon :name="menuItem.meta.icon" v-if="menuItem.meta.icon" class="mr-3" />
        <template #title>
          <app-link :to="menuItem.meta.url || menuItem.path" @click.stop="() => { }">
            <span>{{ t(`${menuItem.meta.title}`) }}</span>
          </app-link>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
  <el-menu v-else class="flex flex-1 pr-[10px] !h-[48px] !border-b-0" :class="topStore.isLeft ? '' : 'justify-end'"
    :default-active="topStore.activeKey" mode="horizontal">
    <template v-for="menuObj in topStore.allRoutes">
      <el-menu-item :index="menuObj.path === '/' ? '/workplace' : menuObj.path"
        @click="handlerMenuItem(menuObj.path === '/' ? '/workplace' : menuObj.meta.url || menuObj.path)">
        <app-link :to="menuObj.path === '/' ? '/workplace' : menuObj.meta.url || menuObj.path"
          class="flex items-center h-[100%]" @click.stop="() => { }">
          <v-svg-icon :name="menuObj.meta.icon" v-if="menuObj.meta.icon" class="mr-3" />
          {{ t(`${menuObj.meta.title}`) }}
        </app-link>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import AppLink from '@/components/AppLink.vue';
import vSvgIcon from '@/components/v-svg-icon.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { useActiveStore } from '@/stores/topmenu';
import { useLayoutTypeStore } from '@/stores/layoutType'
import sidemenu from './sidermenu.vue'
const topStore = useActiveStore()
const layoutTypeStore = useLayoutTypeStore()
const route = useRoute()
const router = useRouter()
function handlerMenuItem(path) {
  if (path.startsWith('http')) {
    window.open(path, path)
  } else {
    router.push(path)
  }
}
</script>

<style lang="scss" scoped>
.el-menu--horizontal>.el-menu-item.is-active {
  background-color: var(--el-menu-hover-bg-color) !important;
}
</style>