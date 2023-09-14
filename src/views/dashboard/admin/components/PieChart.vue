<script setup lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import * as echarts from 'echarts'
import vintage from '../theme/vintage.json'

defineProps({
  className: {
    type: String,
    default: 'chart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '300px'
  },
})

const echartsRef = ref()
let myChart = ref()

onMounted(() => {
  initCharts()
})

const initCharts = () => {
  echarts.registerTheme('vintage', vintage)
  myChart.value = echarts.init(echartsRef.value, 'vintage')
  myChart.value.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      bottom: '10',
      data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
    },
    series: [
      {
        name: 'WEEKLY WRITE ARTICLES',
        type: 'pie',
        roseType: 'radius',
        radius: [15, 95],
        center: ['50%', '38%'],
        data: [
          { value: 320, name: 'Industries' },
          { value: 240, name: 'Technology' },
          { value: 149, name: 'Forex' },
          { value: 100, name: 'Gold' },
          { value: 59, name: 'Forecasts' }
        ],
        animationEasing: 'cubicInOut',
        animationDuration: 2600
      }
    ]
  })
}


</script>

<script lang="ts">
export default defineComponent({
  name: 'PieChart',
})
</script>

<template>
  <div :class="className" ref="echartsRef" :style="{ width: width, height: height }"></div>
</template>

<style lang="scss" scoped></style>
