<template>
  <div class="h-[200px] p-[20px] rounded">
    <el-button :plain="true" @click="open">Show message</el-button>
    <el-button :plain="true" @click="openVn">VNode</el-button>
  </div>
</template>

<script setup>
const open = () => {
  ElMessage('This is a message.')
}

const openVn = () => {
  ElMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}
</script>

<style lang="scss" scoped></style>