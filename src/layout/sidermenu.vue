<template>
  <template v-for="menu in props.menuItem">
    <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 0">
      <template #title>
        <span>{{ t(`${menu.meta.title}`) }}</span>
      </template>
      <sidermenu :menuItem="menu.children" />
    </el-sub-menu>
    <app-link v-else :to="menu.meta.url || menu.path" class="w-[100%]" @click.stop="() => { }">
      <li class="el-menu-item" v-if="menu.meta.url">
        <span>{{ t(`${menu.meta.title}`) }}</span>
      </li>
      <el-menu-item v-else :index="menu.path">
        <span>{{ t(`${menu.meta.title}`) }}</span>
      </el-menu-item>
    </app-link>
  </template>
</template>

<script setup>
import AppLink from '@/components/AppLink.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps(['menuItem'])
</script>

<style lang="scss" scoped></style>