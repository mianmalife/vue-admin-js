<template>
  <div>
    <v-card>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="Approved by">
          <el-input v-model="formInline.user" placeholder="Approved by" clearable />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="formInline.region" placeholder="Activity zone" clearable class="!w-[200px]">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </v-card>
  </div>
</template>

<script setup>
import axios from '@/shared/axios'
const tableData = ref([])
const formInline = reactive({
  user: '',
  region: 'shanghai',
  date: '',
})

onMounted(() => {
  axios({ url: '/api/user/table' }).then(res => {
    tableData.value = res.data
  })
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="scss" scoped></style>