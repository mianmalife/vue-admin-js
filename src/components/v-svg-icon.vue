<template>
  <svg aria-hidden="true" class="w-[16px] h-[16px]">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
export default defineComponent({
  name: 'vSvgIcon',
  props: {
    prefix: {
      type: String,
      default: '/__spritemap#sprite'
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const symbolId = computed(() => `${props.prefix}-${props.name}`)
    return { symbolId }
  }
})
</script>

<style lang="scss" scoped></style>