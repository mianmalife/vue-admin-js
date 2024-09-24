<template>
  <div class="flex items-center">
    <el-dropdown @command="handleCommand">
      <span class="text-[#333] outline-0">
        admin
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
const router = useRouter()
function handleCommand(key) {
  if (key === 'logout') {
    localStorage.clear()
    router.push({ name: 'login' })
  }
}
</script>

<style lang="scss" scoped></style>