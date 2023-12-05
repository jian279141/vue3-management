<script setup lang="ts">
import { defineComponent, computed } from "vue"

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const platformsOptions = [
  { key: 'a-platform', name: 'a-platform' },
  { key: 'b-platform', name: 'b-platform' },
  { key: 'c-platform', name: 'c-platform' }
]

const platforms = computed({
  get: () => props.modelValue,
  set: (val) => { emit('update:modelValue', val) }
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'Index',
})
</script>

<template>
  <el-dropdown :hide-on-click="false" :show-timeout="100" trigger="click">
    <el-button plain>
      Platforms({{ platforms.length }})
      <el-icon>
        <CaretBottom />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-checkbox-group v-model="platforms">
            <el-checkbox v-for="platform in platformsOptions" :key="platform.key" :label="platform.key">
              {{ platform.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped></style>
