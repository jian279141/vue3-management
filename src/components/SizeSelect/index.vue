<script setup lang="ts">
import { reactive } from "vue"
const sizeOptions = reactive([
  { label: 'Default', value: 'default' },
  { label: 'Medium', value: 'medium' },
  { label: 'Small', value: 'small' },
  { label: 'Mini', value: 'mini' }
])
</script>

<template>
  <el-dropdown trigger="click">
    <div>
      <svg-icon name="svg-size" className="size-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in sizeOptions" :key="item.value" :command="item.value">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.el-dropdown {
  line-height: 50px;
}
</style>
