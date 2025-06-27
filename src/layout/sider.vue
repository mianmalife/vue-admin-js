<template>
  <el-menu :class="siderStyle" :default-active="route.path" :collapse="sideStore.collapse" :collapse-transition="false">
    <template v-for="menuItem in sideStore.menulist">
      <el-sub-menu :index="menuItem.path" v-if="menuItem.children && menuItem.children.length > 0">
        <template #title>
          <v-svg-icon :name="menuItem.meta.icon" v-if="menuItem.meta.icon"
            :class="sideStore.collapse ? 'mx-auto' : ''" />
          <span :class="sideStore.collapse || sideStore.autoSplit ? 'pl-0' : 'pl-[6px]'">{{ t(`${menuItem.meta.title}`)
            }}</span>
        </template>
        <sidermenu :menuItem="menuItem.children" />
      </el-sub-menu>
      <app-link v-else :to="menuItem.meta.url || menuItem.path" class="w-[100%]">
        <li class="el-menu-item" v-if="menuItem.meta.url">
          <v-svg-icon :name="menuItem.meta.icon" v-if="menuItem.meta.icon"
            :class="sideStore.collapse ? 'mx-auto' : ''" />
          <span v-if="!sideStore.collapse" :class="sideStore.autoSplit ? 'pl-0' : 'pl-[6px]'">{{
            t(`${menuItem.meta.title}`)
            }}</span>
        </li>
        <el-menu-item v-else :index="menuItem.path">
          <v-svg-icon :name="menuItem.meta.icon" v-if="menuItem.meta.icon"
            :class="sideStore.collapse ? 'mx-auto' : ''" />
          <template #title>
            <app-link :to="menuItem.path" class="w-[100%]" @click.stop="() => { }">
              <span :class="sideStore.collapse || sideStore.autoSplit ? 'pl-0' : 'pl-[6px]'">{{
                t(`${menuItem.meta.title}`)
              }}</span>
            </app-link>
          </template>
        </el-menu-item>
      </app-link>
    </template>
  </el-menu>
</template>

<script setup>
import AppLink from '@/components/AppLink.vue'
import vSvgIcon from '@/components/v-svg-icon.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import sidermenu from './sidermenu.vue'
import { useSideMenuStore } from '@/stores/sidemenu'
const sideStore = useSideMenuStore()
const route = useRoute()
const props = defineProps({
  isSplit: {
    type: Boolean,
    default: true
  }
})
const siderStyle = computed(() => ({
  'w-[100%] overflow-auto': true,
  'h-[calc(100%-50px)]': !sideStore.autoSplit,
  'h-[100%]': sideStore.autoSplit,
  '!w-[64px]': sideStore.collapse,
  '!w-[260px]': !sideStore.collapse,
}))
</script>

<style lang="scss" scoped>
:deep(.el-menu-item.is-active) {
  background-color: var(--el-menu-hover-bg-color) !important;
}

:deep(.el-sub-menu.is-active)>.el-sub-menu__title {
  color: var(--el-menu-active-color);
}
</style>