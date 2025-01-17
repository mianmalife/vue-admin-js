<template>
  <div>
    <v-card>              
      <h1>工作台</h1>
      <el-button @click="count++">count++</el-button>
      count: {{ count }}
    </v-card>
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