<template>
  <div class="bg-white p-[20px] rounded shadow">
    <el-skeleton :rows="5" animated :loading="loading">
      <template #default>
        <h1>工作台</h1>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<style lang="scss" scoped></style>