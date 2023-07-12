<script setup lang="ts">
import { defineComponent } from "vue"
import FixedThead from "./components/FixedThead.vue"
import UnfixedThead from "./components/UnfixedThead.vue"
</script>

<script lang="ts">
export default defineComponent({
  name: 'DynamicTable'
})
</script>

<template>
  <div class="app-container">
    <div>Fixed Header,sort by header order</div>
    <FixedThead />
    <div>Unfixed Header,sort by header order</div>
    <UnfixedThead />
  </div>
</template>

<style lang="scss" scoped></style>
