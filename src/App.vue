<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useLangStore } from './stores/language'
const langStore = useLangStore()
const locale = computed(() => (langStore.lang === 'zh-cn' ? zhCn : en))
</script>

<template>
  <el-config-provider :locale="locale" :button="{ autoInsertSpace: true }">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
