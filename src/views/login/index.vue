<template>
  <div class="h-[100%] flex flex-col items-center ">
    <div class="flex grow justify-center items-center">
      <el-form ref="userRef" :model="userForm" status-icon :rules="rules" label-width="auto" size="large"
        class="w-[400px]  p-[30px] shadow-xl bg-white rounded-md">
        <div class="text-center w-[100%] pb-[20px] font-bold">vue-admin-js</div>
        <el-alert v-show="isLoginError" title="用户名或密码错误" type="error" show-icon @close="isLoginError = false" />
        <el-form-item class="mt-[20px]" label="" prop="username">
          <el-input v-model="userForm.username" type="text" autocomplete="off" placeholder="账户：admin">
            <template #prefix>
              <i-ep-user color="var(--el-color-primary)"></i-ep-user>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="userForm.password" type="password" autocomplete="off" show-password placeholder="密码：admin">
            <template #prefix>
              <i-ep-lock color="var(--el-color-primary)"></i-ep-lock>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary" @click="handleForm">登&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class=" h-[30px]">
      Copyright © {{ new Date().getFullYear() }} vue-admin-js
    </div>
  </div>
</template>

<script setup>
import { useActiveStore } from '@/stores/topmenu'
import { useSideMenuStore } from '@/stores/sidemenu';
import { staticRoutes, dynamicRoutes } from '@/router';
const filterPath = ['/', '/login']
const allRoutes = staticRoutes.filter(item => filterPath.includes(item.path) === false).concat(dynamicRoutes)
const topStore = useActiveStore()
const sideStore = useSideMenuStore()
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
        topStore.setAllRoutes(allRoutes)
        topStore.setKey('/workplace')
        sideStore.setSideMenu({})
        nextTick(() => {
          router.push({ name: 'workplace' })
        })
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
