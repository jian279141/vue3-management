<script setup lang="ts">
import { } from "vue"

</script>

<template>
  <el-scrollbar class="scroll-container" ref="scrollContainer" :vertical="false">
    <slot />
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.scroll-container {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  position: relative;

  :deep() {
    .el-scrollbar__bar {
      bottom: 0px;
    }

    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>

