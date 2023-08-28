<script setup lang="ts">
import { defineComponent } from "vue"
import Chart from '@/components/Charts/LineMarker.vue'
</script>

<script lang="ts">
export default defineComponent({
  name: 'LineChart',
})
</script>

<template>
  <div class="chart-container">
    <Chart height="100%" width="100%" />
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 64px);
}
</style>
