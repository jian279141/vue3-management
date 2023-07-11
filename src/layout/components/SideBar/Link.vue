<script setup lang="ts">
import { computed } from "vue"
import { isExternal } from "@/utils/validate";
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

const type = computed(() => {
  return isExternal(props.to) ? 'a' : 'router-link'
})

const isExternalFn = computed(() => {
  return isExternal(props.to)
})

const linkProps = (to: string) => {
  if (isExternalFn.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  } else {
    return {
      to: to
    }
  }
}
</script>

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped></style>
