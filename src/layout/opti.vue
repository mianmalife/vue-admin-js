<template>
  <div class="flex flex-row-reverse items-center h-[48px] pr-[20px] border-b-0"
    :class="sideStore.autoSplit ? '' : 'flex-1'">
    <el-dropdown @command="setLanguage">
      <div class="flex items-center outline-none">
        <v-svg-icon name="global"
          class="w-[22px] h-[22px] p-[2px] rounded-[50%] hover:bg-[var(--el-menu-hover-bg-color)] hover:text-[var(--el-color-primary)]" />
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
    <toggle-theme></toggle-theme>
    <el-dropdown @command="handleCommand">
      <div class="flex flex-shrink-0 items-center outline-none">
        <el-avatar size="small" class="mr-[10px]">
          <template #default>
            <v-svg-icon name="user" class="text-[18px]"></v-svg-icon>
          </template>
        </el-avatar>
        <el-link class="outline-0 mr-[20px] !text-[16px]">
          admin
        </el-link>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">
            <v-svg-icon name="epswitch-button" class="mr-[10px]"></v-svg-icon>
            {{ t('Signout') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import vSvgIcon from '@/components/v-svg-icon.vue'
import ToggleTheme from '@/components/toggle-theme.vue'
import { useActiveStore } from "@/stores/topmenu"
import { useTagStore } from '@/stores/multiTag'
import { useSideMenuStore } from '@/stores/sidemenu'
const topStore = useActiveStore()
const tagStore = useTagStore()
const sideStore = useSideMenuStore()
import { useI18n } from 'vue-i18n'
import { useLangStore } from '@/stores/language'
import { userInfoStore } from '@/stores/userInfo'
const langStore = useLangStore()
const router = useRouter()
const { locale, t } = useI18n()

function handleCommand(key) {
  if (key === 'logout') {
    userInfoStore().clear()
    topStore.clear()
    sideStore.clear()
    tagStore.clear()
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