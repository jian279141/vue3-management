<script setup lang="ts">
import { computed } from "vue"
import { useUserStore } from '@/store/modules/user'

const emit = defineEmits(['change'])

const roles = computed(() => {
  return useUserStore().roles
})

const switchRoles = computed({
  get() {
    return roles.value[0]
  },
  set(val) {
    useUserStore().changRoles(val).then(() => {
      emit('change')
    })
  }
})
</script>

<template>
  <div class="">
    <div style="margin-bottom: 15px;">
      Your roles:{{ roles }}
    </div>
    Switch roles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<style lang="scss" scoped></style>
