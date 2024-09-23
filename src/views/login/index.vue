<template>
  <div class="relative min-h-[100%] flex items-center justify-center">
    <el-form
      ref="userRef"
      :model="userForm"
      status-icon
      :rules="rules"
      label-width="auto"
      size="large"
      class="w-[400px] p-[30px] shadow-xl bg-white rounded-md"
    >
      <div class="text-center w-[100%] pb-[20px] font-bold">vue-admin-js</div>
      <el-alert
        v-show="isLoginError"
        title="用户名或密码错误"
        type="error"
        show-icon
        @close="isLoginError = false"
      />
      <el-form-item class="mt-[20px]" label="" prop="username">
        <el-input
          v-model="userForm.username"
          type="text"
          autocomplete="off"
          placeholder="账户：admin"
        >
          <template #prefix>
            <el-icon color="var(--el-color-primary)"><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          v-model="userForm.password"
          type="password"
          autocomplete="off"
          show-password
          placeholder="密码：admin"
        >
          <template #prefix>
            <el-icon color="var(--el-color-primary)"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="w-full" type="primary" @click="handleForm">登&nbsp;录</el-button>
      </el-form-item>
    </el-form>
    <div class="absolute bottom-[5px] h-[30px]">
      Copyright © {{ new Date().getFullYear() }} vue-admin-js
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useActiveStore } from '@/stores/topmenu'
const topStore = useActiveStore()
const router = useRouter()

let isLoginError = ref(false)
const userRef = ref()

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}

const validateName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('用户名不能为空'))
  } else {
    callback()
  }
}

const userForm = reactive({
  password: '',
  username: ''
})

const rules = {
  password: [{ validator: validatePass }],
  username: [{ validator: validateName }]
}

const handleForm = async () => {
  try {
    await userRef.value.validate((valid) => {
      if (!valid) return
      if (userForm.username === 'admin' && userForm.password === 'admin') {
        localStorage.setItem('token', 'true')
        router.push('/workplace')
        topStore.setKey('/workplace')
      } else {
        isLoginError.value = true
      }
    })
  } catch (error) {
    ElMessage.error(error.message)
  }
}
</script>

<style lang="scss" scoped></style>
