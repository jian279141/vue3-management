<script setup lang="ts">
import { defineComponent, computed } from "vue"

const props = defineProps(['modelValue'])

const emit = defineEmits(['update:modelValue'])

const comment_disable = computed({
  get: () => props.modelValue,
  set: (val) => { emit('update:modelValue', val) }
})

</script>

<script lang="ts">
export default defineComponent({
  name: 'CommentDropdown',
})
</script>

<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>
      {{ !comment_disable ? 'Comment Open' : 'Comment Close' }}
      <el-icon>
        <CaretBottom />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-radio-group v-model="comment_disable">
            <el-radio :label="false">Comment Open</el-radio>
            <el-radio :label="true">Comment Close</el-radio>
          </el-radio-group>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>

  </el-dropdown>
</template>

<style lang="scss" scoped></style>
