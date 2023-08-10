<script setup lang="ts">
import { defineComponent, ref } from "vue"
import switchRoles from "./components/SwitchRoles.vue"

// 用于每次切换的时候，重新
const key = ref(0)

const handleRolesChange = () => {
  key.value++
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'DirectivePermission',
})
</script>

<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top: 30px;">
      <div>
        <span v-permission="['admin']">
          only
          <el-tag>admin</el-tag>
          can see this
        </span>
        <el-tag v-permission="['admin']">
          v-permission="['admin']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['editor']">
          only
          <el-tag>editor</el-tag>
          can see this
        </span>
        <el-tag v-permission="['editor']">
          v-permission="['editor']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['admin', 'editor']">
          both
          <el-tag>editor,admin</el-tag>
          can see this
        </span>
        <el-tag v-permission="['admin', 'editor']">
          v-permission="['admin','editor']"
        </el-tag>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
