<template>
  <div class="flex items-center">
    <el-dropdown @command="handleCommand">
      <div class="flex items-center outline-none">
        <el-avatar size="small" class="mr-2">
          <template #default>
            <i-ep-user-filled></i-ep-user-filled>
          </template>
        </el-avatar>
        <el-link class="outline-0">
          admin
        </el-link>
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
import { useMultiTabsStore } from '@/stores/multiTabs';
const multiTabsStore = useMultiTabsStore()
const router = useRouter()
function handleCommand(key) {
  if (key === 'logout') {
    localStorage.removeItem('token')
    multiTabsStore.removeData()
    nextTick(() => {
      router.push({ name: 'login' })
    })
  }
}
</script>

<style lang="scss" scoped></style>