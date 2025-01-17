<template>
  <div class="h-[100%] flex flex-col items-center ">
    <div class="flex grow justify-center items-center">
      <el-form ref="userRef" :model="userForm" status-icon :rules="rules" label-width="auto" size="large"
        class="w-[400px]  p-[30px] shadow-xl bg-[var(--card-bgcolor)] rounded-md">
        <div class="text-center w-[100%] pb-[20px] font-bold">vue-admin-js</div>
        <el-alert v-show="isLoginError" :title="t('Username or password is incorrect')" type="error" show-icon
          @close="isLoginError = false" />
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
        <el-form-item>
          <el-button class="w-full" type="primary" @click="handleForm" :loading="loading">{{ t('Signin') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class=" h-[30px]">
      Copyright © {{ new Date().getFullYear() }} vue-admin-js
    </div>
  </div>
</template>

<script setup>
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

<style lang="scss" scoped></style>
