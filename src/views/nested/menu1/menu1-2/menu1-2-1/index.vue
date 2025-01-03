<template>
  <div class="sh-[200px] p-[20px] rounded">
    <el-badge :value="valu" class="mr-4">
      <el-button @click="valu--">comments</el-button>
    </el-badge>
    <el-badge :value="3" class="mr-4">
      <el-button>replies</el-button>
    </el-badge>
    <el-badge :value="1" class="mr-4" type="primary">
      <el-button>comments</el-button>
    </el-badge>
    <el-badge :value="2" class="mr-4" type="warning">
      <el-button>replies</el-button>
    </el-badge>
    <el-badge :value="1" class="mr-4" color="green">
      <el-button>custom background</el-button>
    </el-badge>
  </div>
</template>

<script setup>
const valu = ref(12)
</script>

<style lang="scss" scoped></style>