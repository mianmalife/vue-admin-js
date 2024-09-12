<script setup>
</script>

<template>
  <main>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-date-picker type="date" />
    <el-pagination :total="100" />
    {{ $t('hello') }}
  </main>
</template>
