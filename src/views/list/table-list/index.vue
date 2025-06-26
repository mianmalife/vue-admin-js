<template>
  <div>
    <v-card>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="title">
          <el-input v-model="formInline.user" placeholder="title" clearable />
        </el-form-item>
        <el-form-item label="category">
          <el-select v-model="formInline.region" placeholder="category" clearable class="!w-[200px]">
            <el-option label="beauty" value="beauty" />
            <el-option label="fragrances" value="fragrances" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border>
        <el-table-column prop="title" label="title" />
        <el-table-column prop="category" label="category" />
        <el-table-column prop="price" label="price" />
        <el-table-column prop="tags" label="tag">
          <template #default="scope">
            <el-tag type="primary" size="small" v-for="tag in scope.row.tags" :key="tag" class="mr-[4px]">{{ tag
              }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </v-card>
  </div>
</template>

<script setup>
import axios from '@/shared/axios'
const tableData = ref([])
const formInline = reactive({
  title: '',
  category: '',
})

onMounted(() => {
  axios({ url: 'https://dummyjson.com/products?limit=15' }).then(res => {
    tableData.value = res?.products || []
  }).catch(() => {
    tableData.value = []
  })
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="scss" scoped></style>