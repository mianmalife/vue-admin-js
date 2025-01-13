<template>
  <div
    class="transition-all duration-300 ease-ease w-[320px] h-[100%] fixed top-0 right-[-320px] bg-[#fff] text-[rgb(114, 118, 123] z-[2000]"
    :class="drawer ? 'right-[0]' : ''">
    <!-- 遮罩层 -->
    <div
      class="opacity-0 transition-all duration-300 ease-ease fixed top-0 left-0 right-0 bottom-0 bg-[var(--el-overlay-color-lighter)] overflow-auto"
      :class="drawer ? 'opacity-100 visible' : 'invisible'" @click="handleDrawer">
    </div>
    <div
      class="translate-all ease-ease absolute top-[40%] right-[320px] bg-[var(--el-menu-active-color)] p-3 cursor-pointer rounded rounded-tr-none rounded-br-none text-[#fff]"
      @click="handleDrawer">
      <i-ep-setting class="text-[14px]" v-if="!drawer"></i-ep-setting>
      <i-ep-close class="text-[14px]" v-else></i-ep-close>
    </div>
    <el-card class="w-[100%] h-[100%] relative z-3000">
      <template #header>
        <div class="card-header flex justify-between">
          <span>{{ t('Settings') }}</span>
          <button aria-label="关闭此对话框" type="button" class="hover:text-[var(--el-color-primary)]" @click="handleDrawer">
            <i-ep-close></i-ep-close>
          </button>
        </div>
      </template>
      <!-- 导航模式 -->
      <div>
        <div class="mb-2">
          <el-text>{{ t('Navigation Mode') }}</el-text>
        </div>
        <div class="flex items-center mb-4">
          <el-tooltip :content="t('Mixed layout')" placement="top">
            <div @click="isLayout = 'fixed'"
              class="relative cursor-pointer rounded w-[60px] h-[50px] shadow bg-[var(--topmenu-active-bgcolor)]">
              <div
                class="w-[100%] h-[10px] rounded-t bg-[var(--topmenu-active-bgcolor)] border-b-[var(--el-border-color)] border-b border-b-solid">
              </div>
              <div
                class="w-[20px] h-[40px] bg-[var(--topmenu-active-bgcolor] border-r-[var(--el-border-color)] border-r border-r-solid">
              </div>
              <i-ep-check v-if="isLayout === 'fixed'"
                class="absolute right-[10px] top-[24px] text-[var(--el-color-primary)]"></i-ep-check>
            </div>
          </el-tooltip>
        </div>
        <div class="flex justify-between items-end mb-2">
          <el-text class="mr-2">{{ t('Top menu to the left') }}</el-text>
          <el-switch v-model="topStore.isLeft" :disabled="!sideStore.autoSplit" />
        </div>
        <div class="flex justify-between items-end mb-2">
          <el-text class="mr-2">{{ t('Auto-split menu') }}</el-text>
          <el-switch v-model="sideStore.autoSplit" />
        </div>
      </div>
      <!-- <el-divider></el-divider> -->
      <!-- 主题 -->
      <!-- <div class="flex justify-between items-end mb-2">
        <el-text class="mr-2">{{ t('Theme Color') }}</el-text>
        <el-color-picker v-model="themeColorStore.color" />
      </div> -->
      <el-divider></el-divider>
      <!-- 标签栏 -->
      <div class="flex justify-between items-end mb-2">
        <el-text class="mr-2">{{ t('Tab Bar') }}</el-text>
        <el-switch v-model="multiTabsStore.isVisible" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useActiveStore } from '@/stores/topmenu';
import { useSideMenuStore } from '@/stores/sidemenu'
import { useMultiTabsStore } from '@/stores/multiTabs'
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const multiTabsStore = useMultiTabsStore()
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { useThemeColor } from '@/stores/themeColor'
const themeColorStore = useThemeColor()
const drawer = ref(false)
const isLayout = ref('fixed')

watch(() => themeColorStore.color, newValue => {
  console.log(newValue)
  document.documentElement.style.setProperty('--el-color-primary', newValue)
}, {
  immediate: true
})

function handleDrawer() {
  drawer.value = !drawer.value
}

</script>

<style lang="scss" scoped></style>