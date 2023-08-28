<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { fetchList } from "@/api/article"



const listData = ref()
const fileName = ''


onMounted(() => {
  getList()
})

const getList = async () => {
  const { data } = await fetchList()
  listData.value = data.items
}

const handleDownload = () => {
  import('@/vendor/Export2Zip').then((zip) => {
    const tHeader = ['ID', 'Title', 'Author', 'Readings', 'Date']
    const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
    const list = listData.value
    const data = formatJson(filterVal, list)
    zip.export2zip(tHeader, data, fileName, fileName)
  }
  )
}

const formatJson = (filterVal, jsonData) => {
  return jsonData.map((v) => filterVal.map((j) => v[j]))
}


</script>

<script lang="ts">
export default defineComponent({
  name: 'ZipExport',
})
</script>

<template>
  <div class="app-container">
    <el-input v-model="fileName" placeholder="Please enter the file name (default file)" style="width:300px;"
      prefix-icon="Document" />
    <el-button type="primary" @click="handleDownload" class="export-button">
      <el-icon style="margin-right:5px">
        <Document />
      </el-icon>
      Export
    </el-button>

    <!-- table -->

    <el-table :data="listData" border fit highlight-current-row>
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template #default="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template #default="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="95" align="center">
        <template #default="{ row }">
          <el-tag>{{ row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template #default="{ row }">
          {{ row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template #default="{ row }">
          <div class="flex items-center justify-center">
            <el-icon>
              <Timer />
            </el-icon>
            <span>{{ row.display_time }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.export-button {
  margin-left: 20px;
}
</style>
