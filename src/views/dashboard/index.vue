<script setup lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import adminDashboard from "./admin/index.vue"
import editorDashboard from "./editor/index.vue"
import { useUserStore } from "@/store/modules/user"

const userStore = useUserStore()

const currentRole = ref('adminDashboard')

onMounted(() => {
  if (userStore.roles.includes('admin')) {
    currentRole.value = 'adminDashboard'
  } else {
    currentRole.value = 'editorDashboard'
  }
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'Dashboard',
  components: {
    adminDashboard,
    editorDashboard
  }
})
</script>

<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<style lang="scss" scoped></style>
