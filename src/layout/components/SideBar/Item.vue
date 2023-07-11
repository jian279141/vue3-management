<script setup lang="ts">
import { defineComponent, computed } from "vue"

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
const svgName = computed(() => {
  return `svg-${props.icon}`
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'Item',
})
</script>

<template>
  <svg-icon :name="svgName" />
  <span slot="title">{{ title }}</span>
</template>

<style lang="scss" scoped></style>
