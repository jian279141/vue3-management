<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from "vue"
const router = useRouter()
const route = useRoute()
onMounted(() => {
  const { params, query } = route
  const { path } = params
  router.push({ path: `/${path}`, query })
})
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
