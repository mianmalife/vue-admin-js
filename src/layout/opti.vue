<template>
  <div class="flex flex-row-reverse items-center h-[60px] pr-[20px] border-b-default"
    :class="sideStore.autoSplit ? '' : 'flex-1'">
    <el-dropdown @command="setLanguage">
      <div class="flex items-center outline-none">
        <i-ant-design:global-outlined class="text-[18px]" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-cn">
            <span :class="langStore.lang === 'zh-cn' && '!text-[var(--el-color-primary)]'">{{ t('Simplified Chinese')
              }}</span>
          </el-dropdown-item>
          <el-dropdown-item command="en-us">
            <span :class="langStore.lang === 'en-us' && '!text-[var(--el-color-primary)]'">English</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown @command="handleCommand">
      <div class="flex flex-shrink-0 items-center outline-none">
        <el-avatar size="small" class="mr-2">
          <template #default>
            <i-ep-user-filled class="text-[18px]"></i-ep-user-filled>
          </template>
        </el-avatar>
        <el-link class="outline-0 mr-6 !text-[16px]">
          admin
        </el-link>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">
            <i-ant-design-logout-outlined class="mr-1"></i-ant-design-logout-outlined>
            {{ t('Sign out') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useSideMenuStore } from '@/stores/sidemenu'
const sideStore = useSideMenuStore()
import { useI18n } from 'vue-i18n'
import { useLangStore } from '@/stores/language'
import { useMultiTabsStore } from '@/stores/multiTabs';
const langStore = useLangStore()
const multiTabsStore = useMultiTabsStore()
const router = useRouter()
const { locale, t } = useI18n()
function handleCommand(key) {
  if (key === 'logout') {
    localStorage.removeItem('token')
    multiTabsStore.removeData()
    nextTick(() => {
      router.push({ name: 'login' })
    })
  }
}

function setLanguage(lang) {
  console.log(lang)
  langStore.setLang(lang)
  locale.value = lang
}
</script>

<style lang="scss" scoped></style>