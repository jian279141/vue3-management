<script setup lang="ts">
import { ref, defineComponent } from "vue"

const key = ref(1)

const defaultFormThead = ['apple', 'banana']
const formThead = ref(defaultFormThead)
const tableData = ref([
  {
    name: 'fruit-1',
    apple: 'apple-1',
    banana: 'banana-1',
    orange: 'orange-1'
  },
  {
    name: 'fruit-2',
    apple: 'apple-2',
    banana: 'banana-2',
    orange: 'orange-2'
  }
])
</script>

<script lang="ts">
defineComponent({
  name: 'UnfixedThead'
})
</script>

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="formThead">
        <el-checkbox label="apple">apple</el-checkbox>
        <el-checkbox label="banana">banana</el-checkbox>
        <el-checkbox label="orange">orange</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" border fit highlight-current-row style="width:100%" :key="key">
      <el-table-column prop="name" label="FruitName"></el-table-column>
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template #default="{ row }">
          {{ row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped></style>
