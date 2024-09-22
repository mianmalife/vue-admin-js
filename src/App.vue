<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useActiveStore } from '@/stores/topmenu';
import { useSideMenuStore } from '@/stores/sidemenu'
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
const route = useRoute()
watch(() => route.path, () => {
  console.log(route.path)
  if (route.path === '/workplace') {
    sideStore.setSideMenu({})
    topStore.setKey('/workplace')
  }
})
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
