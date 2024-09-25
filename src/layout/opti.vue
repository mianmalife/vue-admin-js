<template>
  <div class="flex items-center">
    <el-dropdown @command="handleCommand">
      <div class="flex items-center outline-none">
        <el-avatar size="small" class="mr-2">
          <template #default>
            <i-ep-user-filled></i-ep-user-filled>
          </template>
        </el-avatar>
        <span class="text-[#333] outline-0">
          admin
        </span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">
            <i-ant-design-logout-outlined class="mr-1"></i-ant-design-logout-outlined>
            退出登录
          </el-dropdown-item>
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