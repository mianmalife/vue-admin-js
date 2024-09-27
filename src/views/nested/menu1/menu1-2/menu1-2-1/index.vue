<template>
  <div class="bg-[var(--card-bgcolor)] h-[200px] p-[20px] rounded shadow">
    <el-badge :value="12" class="mr-4">
      <el-button>comments</el-button>
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
    <el-dropdown trigger="click">
      <span class="flex">
        Click Me
        <i-ep-caret-bottom />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item class="clearfix">
            comments
            <el-badge class="mark" :value="12" />
          </el-dropdown-item>
          <el-dropdown-item class="clearfix">
            replies
            <el-badge class="mark" :value="3" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>