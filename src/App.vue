<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
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
