<template>
  <template v-for="menu in props.menuItem">
    <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 0">
      <template #title>
        <span>{{ t(`${menu.meta.title}`) }}</span>
      </template>
      <sidermenu :menuItem="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else-if="!menu.meta.url" :index="menu.path" @click="handlerMenuItem(menu.path)">
      <app-link :to="menu.path" class="w-[100%]" @click.stop="() => { }">
        <span>{{ t(`${menu.meta.title}`) }}</span>
      </app-link>
    </el-menu-item>
    <li v-else class="el-menu-item" @click="handlerExternal(menu.meta.url)">
      <app-link :to="menu.meta.url" class="w-[100%]" @click.stop="() => { }">
        <span>{{ t(`${menu.meta.title}`) }}</span>
      </app-link>
    </li>
  </template>
</template>

<script setup>
import AppLink from '@/components/AppLink.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter()
const props = defineProps(['menuItem'])
function handlerMenuItem(path) {
  router.push(path)
}
function handlerExternal(url) {
  window.open(url, url)
}
</script>

<style lang="scss" scoped></style>