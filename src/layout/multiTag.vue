<template>
  <el-scrollbar class="!h-[36px]">
    <div class="bg-[var(--el-bg-color)] px-[10px] py-[6px] h-[36px] flex flex-items-center">
      <el-tag v-for="routeObj in tagStore.tagList" :key="routeObj.path" :closable="routeObj.path !== '/workplace'"
        :type="route.path === routeObj.path ? 'primary' : 'info'" class="mr-[10px] cursor-pointer"
        @close="close(routeObj)" @click="clickTag(routeObj)">
        {{ t(`${routeObj.meta.title}`) }}
      </el-tag>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { useTagStore } from '@/stores/multiTag'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const tagStore = useTagStore()

function close(obj) {
  if (obj.path === route.path) {
    const index = tagStore.tagList.findIndex(item => item.path === obj.path)
    const frontPath = (tagStore.tagList[index - 1]).path
    router.push(frontPath)
  }
  tagStore.removeTag(obj.path)
}

function clickTag(obj) {
  if (obj.path !== route.path) {
    router.push(obj.path)
  }
}
</script>

<style lang="scss" scoped></style>