<script lang="ts" setup>
import { defineComponent, computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
})

const symbolId = computed<string>(() => `#${props.prefix}-${props.name}`)
const svgClass = computed<string>(() => `svg-icon ${props.className}`)
</script>

<script lang="ts">
export default defineComponent({
  name: 'SvgIcon'
})
</script>

<template>
  <svg aria-hidden="true" :class="svgClass">
    <use :href="symbolId" />
  </svg>
</template>



<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>