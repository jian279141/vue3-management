<script setup lang="ts">
import { defineComponent } from "vue"
import { ElMessage } from 'element-plus'

defineProps({
  user: {
    type: Object,
    default: () => {
      return {
        name: '',
        email: ''
      }
    }
  }
})

const submit = () => {
  ElMessage({
    message: 'Update successfully',
    type: 'success',
    duration: 1500
  })
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'Account',
})

</script>

<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name"></el-input>
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit()">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
