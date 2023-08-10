<script setup lang="ts">
import variables from '@/styles/variables.module.scss'
import { defineComponent } from "vue"
import { usePermissionStore } from '@/store/modules/permission';
import SidebarItem from './SidebarItem.vue'

const permissionStore = usePermissionStore()
// console.log(permissionStore.permissionRoutes);

</script>

<script lang="ts">
export default defineComponent({
  name: 'SideBar'
})
</script>

<template>
  <div class="">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :background-color="variables.menuBg" default-active="">
        <sidebar-item v-for="route in permissionStore.permissionRoutes" :key="route.path" :item="route"
          :basePath="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped></style>
