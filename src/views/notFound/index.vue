<template>
  <el-result title="404" sub-title="啊！找不到这个页面~" class="h-[100%]">
    <template #extra>
      <el-button type="primary" @click="back">Back</el-button>
    </template>
  </el-result>
</template>

<script setup>
const router = useRouter()
function back() {
  router.push('/')
}
</script>