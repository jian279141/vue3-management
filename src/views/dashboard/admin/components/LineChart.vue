<script setup lang="ts">
import { defineComponent, ref, onMounted, nextTick, watch } from "vue"
import * as echarts from 'echarts'
import vintage from '../theme/vintage.json'
const props = defineProps({
  height: {
    type: String,
    default: '350px'
  },
  width: {
    type: String,
    default: '100%'
  },
  className: {
    type: String,
    default: 'chart'
  },
  autoResize: {
    type: Boolean,
    default: true
  },
  chartData: {
    type: Object,
    required: true
  }
})

watch(() => props.chartData, (val) => {
  setOptions(val)
})

onMounted(() => {
  nextTick(() => {
    initCharts()
  })
})

const echartsRef = ref()
let myChart = ref()

function initCharts() {
  echarts.registerTheme('vintage', vintage)
  myChart.value = echarts.init(echartsRef.value, 'vintage')
  setOptions(props.chartData)
}

function setOptions({ expectedData = [], actualData = [] } = {}) {

  myChart.value.setOption({
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false,
      axisTick: {
        show: false
      }
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [5, 10]
    },
    yAxis: {
      axisTick: {
        show: false
      }
    },
    legend: {
      data: ['expected', 'actual']
    },
    series: [
      {
        name: 'expected',
        color: '#FF005A',
        lineStyle: {
          color: '#FF005A',
          width: 2
        },
        smooth: true,
        type: 'line',
        data: expectedData,
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      },
      {
        name: 'actual',
        smooth: true,
        type: 'line',
        color: '#3888fa',
        lineStyle: {
          color: '#3888fa',
          width: 2
        },
        areaStyle: {
          opacity: 0.05
        },
        data: actualData,
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }]
  })
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'LineChart',
})
</script>

<template>
  <div ref="echartsRef" :style="{ height: height, width: width }"></div>
</template>

<style lang="scss" scoped></style>
