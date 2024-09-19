<template>
  <div>
    <el-button type="primary" @click="login">去登录</el-button>
  </div>
</template>

<script setup>
const router = useRouter()
function login() {
  localStorage.setItem('token', Math.random())
  router.push('/workplace')
}
</script>

<style lang="scss" scoped></style>