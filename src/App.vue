<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import layout from '@/layout/index.vue'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
const route = useRoute()
watch(() => route.path, () => {
  console.log(route.path)
})
</script>

<template>
  <el-config-provider :locale="locale">
    <!-- <layout v-if='route.path !== "/login"'></layout> -->
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
