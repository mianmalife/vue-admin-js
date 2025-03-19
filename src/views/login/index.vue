<template>
  <div class="h-[100%] flex flex-col items-center bg-gradient-to-b from-gray-50 to-white login__wrapper">
    <div class="flex grow justify-center items-center">
      <el-form ref="userRef" :model="userForm" status-icon :rules="rules" label-width="auto" size="large"
        class="w-[420px] p-[40px] shadow-lg bg-white rounded-[var(--el-border-radius-base)] transition-all duration-300 hover:shadow-xl">
        <div class="text-center w-[100%] pb-[30px]">
          <h1 class="text-[22px] font-bold text-gray-800 mb-2">vue-admin-js</h1>
          <p class="text-gray-500 text-sm">欢迎回来，请登录</p>
        </div>
        <el-alert v-show="isLoginError" :title="t('Username or password is incorrect')" type="error" show-icon
          @close="isLoginError = false" class="mb-4" />
        <el-form-item class="mt-[20px]" label="" prop="username">
          <el-input v-model="userForm.username" type="text" autocomplete="off" :placeholder="`${t('Username')}：admin`">
            <template #prefix>
              <v-svg-icon name="epuser" color="var(--el-color-primary)"></v-svg-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="userForm.password" type="password" autocomplete="off" show-password
            :placeholder="`${t('Password')}：admin`">
            <template #prefix>
              <v-svg-icon name="lock" color="var(--el-color-primary)"></v-svg-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="mt-8">
          <el-button class="w-full transition-all duration-300 hover:opacity-90 auto-insert-space" type="primary"
            @click="handleForm" :loading="loading">
            {{ t('Signin') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="h-[40px] text-gray-500 text-sm">
      Copyright © {{ new Date().getFullYear() }} vue-admin-js
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import vSvgIcon from '@/components/v-svg-icon.vue'
import getToken from '~/mock/getToken'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import router from '@/router';
import { useThemeColor } from '@/stores/themeColor'
import { useActiveStore } from "@/stores/topmenu"
const themeColorStore = useThemeColor()
const topStore = useActiveStore()

let isLoginError = ref(false)
const userRef = ref()
const loading = ref(false)

onMounted(() => {
  document.documentElement.style.setProperty('--el-color-primary', themeColorStore.color)
})

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(`${t('Password cannot be empty')}`))
  } else {
    callback()
  }
}

const validateName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(`${t('Username cannot be empty')}`))
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
    await userRef.value.validate(async (valid) => {
      if (!valid) return
      loading.value = true
      if (userForm.username === 'admin' && userForm.password === 'admin') {
        const tk = await getToken()
        localStorage.setItem('token', tk)
        router.push('/workplace')
        topStore.setKey('/workplace')
        loading.value = false
      } else {
        isLoginError.value = true
        loading.value = false
      }
    })
  } catch (error) {
    console.error(error)
    ElMessage.error(error.message)
  }
}
</script>

<style lang="scss" scoped>
.login__wrapper {
  --el-border-radius-base: 12px;
}
:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #e5e7eb inset;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 0 1px var(--el-color-primary) inset;
  }

  &.is-focus {
    box-shadow: 0 0 0 1px var(--el-color-primary) inset;
  }
}
</style>
