<script setup lang="ts">
import { defineComponent, ref } from "vue"
import GithubCorner from "@/components/GithubCorner/index.vue"
import PanelGroup from "./components/PanelGroup.vue"
import LineChart from "./components/LineChart.vue"
import RadarChart from "./components/RadarChart.vue"
import PieChart from "./components/PieChart.vue"
import BarChart from "./components/BarChart.vue"
import TransactionTable from "./components/TransactionTable.vue"
import TodoList from "./components/TodoList/index.vue"
import BoxCard from "./components/BoxCard.vue"

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

const chartData = ref(lineChartData.newVisitis)

const handleSetLineChartData = (type: string) => {
  // @ts-ignore
  chartData.value = lineChartData[type]
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'AdminDashBoard',
})
</script>

<template>
  <div class="dashboard-admin-container">

    <github-corner class="github-corner"></github-corner>

    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

    <el-row style="background: #fff;padding: 16px 16px 0; margin-bottom: 32px;">
      <line-chart :chart-data="chartData"></line-chart>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <radar-chart></radar-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart></bar-chart>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }" :lg="{ span: 12 }" :xl="{ span: 12 }"
        style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 6 }" :xl="{ span: 6 }"
        style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 6 }" :xl="{ span: 6 }"
        style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-admin-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0px;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>