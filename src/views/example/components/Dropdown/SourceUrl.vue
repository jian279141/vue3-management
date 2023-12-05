<script setup lang="ts">
import { defineComponent, computed } from "vue"

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const source_url = computed({
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
  <el-dropdown :show-timeout="100" trigger="click" :hide-on-click="false">
    <el-button plain>
      Link
      <el-icon>
        <CaretBottom />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu style="width: 400px;" class="no-padding no-border">
        <el-dropdown-item>
          <el-input v-model="source_url" placeholder="Please input source url">
            <template #prepend>
              URL
            </template>
          </el-input>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped></style>
