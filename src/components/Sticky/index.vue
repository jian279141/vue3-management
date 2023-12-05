<script setup lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, onActivated } from "vue"
const props = defineProps({
  stickyTop: {
    type: Number,
    default: 0
  },
  zIndex: {
    type: Number,
    default: 0
  },
  className: {
    type: String,
    default: ''
  }
})

const elRef = ref()
const height = ref()
const elWidth = ref()
const isSticky = ref(false)
const position = ref()
const active = ref(false)

onMounted(() => {
  height.value = elRef.value.getBoundingClientRect().height
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
})

onActivated(() => {
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})



function sticky() {
  if (active.value) return
  position.value = 'fixed'
  active.value = true
  elWidth.value = elWidth.value + 'px'
  isSticky.value = true
}

function reset() {
  position.value = ''
  elWidth.value = 'auto'
  active.value = false
  isSticky.value = false
}

function handleReset() {
  if (!active.value) {
    return
  }
  reset()
}

function handleResize() {
  if (isSticky.value) {
    elWidth.value = elRef.value.getBoundingClientRect().width + 'px'
  }
}

function handleScroll() {
  const width = elRef.value.getBoundingClientRect().width
  elWidth.value = width || 'auto'
  const offsetTop = elRef.value.getBoundingClientRect().top

  if (offsetTop < props.stickyTop) {
    sticky()
    return
  }
  handleReset()
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'Sticky',
})
</script>

<template>
  <div :style="{ height: height + 'px', zIndex: zIndex }" ref="elRef">
    <div :class="className"
      :style="{ top: (isSticky ? stickyTop + 'px' : ''), zIndex: zIndex, position: position, width: elWidth, height: height + 'px' }">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
