<script setup lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import * as echarts from 'echarts'
import vintage from '../theme/vintage.json'

const animationDuration = 6000
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
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: 10,
      left: '2%',
      right: '2%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }],
    yAxis: [{
      type: 'value',
      axisTick: {
        show: false
      }
    }],
    series: [{
      name: 'pageA',
      type: 'bar',
      stack: 'vistors',
      barWidth: '60%',
      data: [79, 52, 200, 334, 390, 330, 220],
      animationDuration
    }, {
      name: 'pageB',
      type: 'bar',
      stack: 'vistors',
      barWidth: '60%',
      data: [80, 52, 200, 334, 390, 330, 220],
      animationDuration
    }, {
      name: 'pageC',
      type: 'bar',
      stack: 'vistors',
      barWidth: '60%',
      data: [30, 52, 200, 334, 390, 330, 220],
      animationDuration
    }]
  })
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'Index',
})
</script>

<template>
  <div :class="className" ref="echartsRef" :style="{ width: width, height: height }"></div>
</template>

<style lang="scss" scoped></style>
