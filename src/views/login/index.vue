<template>
  <div>
    <el-button type="primary" @click="login">去登录</el-button>
  </div>
</template>

<script setup>
import { useActiveStore } from '@/stores/topmenu'
const topStore = useActiveStore()
const router = useRouter()
function login() {
  localStorage.setItem('token', Math.random())
  router.push('/workplace')
  topStore.setKey('/workplace')
}
</script>

<style lang="scss" scoped></style>