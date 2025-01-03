<template>
  <div class="p-[20px]">
    <el-skeleton :rows="5" animated :loading="loading">
      <template #default>
        <h1>工作台</h1>
        <el-button @click="count++">count++</el-button>
        count: {{ count }}
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
const loading = ref(true)
const count = ref(0)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<style lang="scss" scoped></style>