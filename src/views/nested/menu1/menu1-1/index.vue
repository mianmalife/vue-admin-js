<template>
  <div class="flex gap-[10px] flex-wrap">
    <v-card class="flex-1">
      <el-empty v-if="isError" :image-size="200" />
      <div v-else class="flex flex-1 flex-col" v-loading="loading">
        <!-- header -->
        <el-radio-group v-model="gender" class="flex justify-center">
          <el-radio-button label="Man" value="male" />
          <el-radio-button label="Woman" value="female" />
        </el-radio-group>
        <!-- avatar -->
        <div
          class="flex my-[10px] py-[4px] border-solid border-[var(--el-border-color)] border-[1px] rounded-[4px] relative"
          v-for="user in currPageData">
          <div class="flex flex-col items-center justify-center mx-[10px]">
            <el-avatar class="cursor-pointer hover:scale-110 transition-all" size="large" :src="user.picture.large"
              @click="openDialog(user)" />
            <div class="text-[10px] w-[60px] text-center truncate">
              {{ user.name.title + '.' + user.name.last }}
            </div>
          </div>
          <!-- 信息 -->
          <div class="flex flex-col justify-center">
            <div class="flex mb-6px">
              <div class="w-[80px] text-[var(--el-text-color-regular)] text-base14">Email:</div>
              <el-text>{{ user.email }}</el-text>
            </div>
            <div class="flex mb-6px">
              <div class="w-[80px] text-base14 text-[var(--el-text-color-regular)]">Phone:</div>
              <el-text>{{ user.phone }}</el-text>
            </div>
            <div class="flex">
              <div class="w-[80px] text-base14 text-[var(--el-text-color-regular)]">Registered:</div>
              <el-text>{{ user.registered.date.slice(0, 10) }}</el-text>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div>
          <el-pagination size="small" layout="prev, pager, next" v-model:current-page="currentPage"
            :page-size="pageSize" :total="50" @current-change="handleCurrentChange" />
        </div>
      </div>
      <!-- 详细信息 -->
      <el-dialog v-model="showDialog" width="600" align-center :modal="false" @close="showDialog = false">
        <div class="flex mt-[10px] py-[10px] border-solid border-[var(--el-border-color)] border-[1px] rounded-[4px]">
          <div class="flex flex-col mx-[10px] items-center">
            <el-avatar style="--el-avatar-size: 82px" :src="currUser.picture.large" />
          </div>

          <div class="flex flex-col">
            <div class="flex mb-[6px]">
              <div class="w-[80px]">Name:</div>
              <el-text>{{ currUser.name.first + ' ' + currUser.name.last }}</el-text>
            </div>
            <div class="flex mb-[6px]">
              <div class="w-[80px]">Email:</div>
              <el-text>{{ currUser.email }}</el-text>
            </div>

            <div class="flex mb-[6px]">
              <div class="w-[80px]">Phone:</div>
              <el-text>{{ currUser.phone }}</el-text>
            </div>

            <div class="flex mb-[6px]">
              <div class="w-[80px]">Id:</div>
              <div class="flex flex-col">
                <div class="flex">
                  <div class="w-[40px]">name:</div>
                  <el-text>{{ currUser.id.name }}</el-text>
                </div>
                <div class="flex">
                  <div class="w-[40px]">value:</div>
                  <el-text>{{ currUser.id.value }}</el-text>
                </div>
              </div>
            </div>

            <div class="flex mb-[6px]">
              <div class="w-[80px]">Registered:</div>
              <div class="flex flex-col">
                <div class="flex">
                  <div class="w-[40px]">date:</div>
                  <el-text>{{ currUser.registered.date.slice(0, 10) }}</el-text>
                </div>
                <div class="flex">
                  <div class="w-[40px]">age:</div>
                  <el-text>{{ currUser.registered.age }}</el-text>
                </div>
              </div>
            </div>

            <div class="flex mb-[6px]">
              <el-text class="w-[80px]">Timezone:</el-text>
              <el-text>{{ currUser.location.timezone.offset + ' '
                + currUser.location.timezone.description }}</el-text>
            </div>

            <div class="flex mb-[6px]">
              <el-text class="w-[80px]">Location:</el-text>
              <el-text>{{
                currUser.location.country + ',' + currUser.location.city + ','
                + currUser.location.street.number + ' '
                + currUser.location.street.name }}</el-text>
            </div>

            <div class="flex">
              <el-text class="w-[80px]">Net:</el-text>
              <el-text>{{ currUser.nat }}</el-text>
            </div>
          </div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="showDialog = false">Close</el-button>
          </div>
        </template>
      </el-dialog>
    </v-card>
  </div>
</template>

<script setup>
import axios from '@/shared/axios';

const isError = ref(false)
const loading = ref(false)
const showDialog = ref(false)
const currUser = ref({})
const genders = ['male', 'female']
const gender = ref(genders[0])
const API_URL = `https://randomuser.me/api/?results=10&gender=`

const currPageData = ref([])
const currentPage = ref(1);
const pageSize = ref(10);

// 处理页码变化  
function handleCurrentChange(val) {
  currentPage.value = val;
  console.log(currentPage.value)
}

watchEffect(async () => {
  try {
    loading.value = true
    const url = `${API_URL}${gender.value}&page=${currentPage.value}`
    const response = await axios.get(url)

    if (response?.results) {
      isError.value = false
      currPageData.value = response.results
    } else {
      isError.value = true
    }
  } catch (error) {
    isError.value = true
    console.log(error)
  } finally {
    loading.value = false
  }
})

function openDialog(user) {
  currUser.value = user || {}
  showDialog.value = true
  console.log(currUser.value, 10000)
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>