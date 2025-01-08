<template>
  <transition name="slide" mode="out-in" class="v-card bg-white p-[10px] rounded-lg shadow">
    <slot></slot>
  </transition>
</template>

<script setup>
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.15s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
