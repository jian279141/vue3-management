<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import screenfull from 'screenfull'
const isFullscreen = ref(false)

const click = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', change)
  }
})

onBeforeUnmount(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change', change)
  }
})

</script>

<template>
  <div>
    <svg-icon :name="isFullscreen ? 'svg-exit-fullscreen' : 'svg-fullscreen'" @click="click" />
  </div>
</template>

<style lang="scss" scoped></style>
