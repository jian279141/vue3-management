<script setup lang="ts">
import { reactive, defineComponent, ref, onMounted } from "vue"
import { Document } from "@element-plus/icons-vue";
import type { tableDataItem } from "@/types/export-excel"
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'



onMounted(() => {
  fetchList({}).then(res => {
    tableData.value = res.data.items
    console.log(tableData.value);
  })
})

function formatJson(filterVal: string[], jsonData: any) {
  return jsonData.map((v: any) => filterVal.map(j => {
    if (j === 'timestamp') {
      return parseTime(v[j])
    } else {
      return v[j]
    }
  }))
}

const formData = reactive({
  filename: '',
  autoWidth: false,
  type: 'xlsx'
})

const tableData = ref<tableDataItem[]>()
const handleExport = () => {
  import("@/vendor/Export2Excel").then(excel => {

    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
    const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
    const list = tableData.value
    const data = formatJson(filterVal, list)


    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: formData.filename,
      autoWidth: formData.autoWidth,
      bookType: formData.type
    })
  })
}

</script>

<script lang="ts">
export default defineComponent({
  name: "ExportExcel",
})
</script>

<template>
  <div class="app-container">

    <!-- form表单 -->
    <el-form :inline="true" :model="formData">
      <!-- 输入文件名 -->
      <el-form-item label="Filename">
        <el-input v-model="formData.filename" placeholder="Please enter the file name" :prefix-icon="Document"></el-input>
      </el-form-item>
      <!-- 单元格自适应 -->
      <el-form-item label="Cell Auto-Width">
        <el-radio-group v-model="formData.autoWidth">
          <el-radio :label="true">true</el-radio>
          <el-radio :label="false">false</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 导出格式 -->
      <el-form-item label="Export Format">
        <el-select v-model="formData.type" placeholder="Please select">
          <el-option label="xlsx" value="xlsx"></el-option>
          <el-option label="csv" value="csv"></el-option>
          <el-option label="txt" value="txt"></el-option>
        </el-select>
      </el-form-item>
      <!-- 导出按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleExport">Export Excel</el-button>
      </el-form-item>
    </el-form>

    <!-- table表格 -->
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="Id" width="95" align="center"></el-table-column>
      <el-table-column prop="title" label="Title"></el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template #default="{ row }">
          <el-tag>{{ row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pageviews" label="Readings" width="115"></el-table-column>
      <el-table-column prop="display_time" label="Date" width="220" align="center"></el-table-column>
    </el-table>

  </div>
</template>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}
</style>
