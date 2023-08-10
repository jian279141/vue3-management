<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { Search, Download, Edit } from '@element-plus/icons-vue'
import { fetchList } from "@/api/article";
import { timestampToTime } from "@/utils";

interface calendarTypeObj {
  [key: string]: string
}
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj,such as { CN : "China", US : "USA" } use typescript
const calendarTypeObj: calendarTypeObj = calendarTypeOptions.reduce((obj: calendarTypeObj, item) => {
  obj[item.key] = item.display_name
  return obj
}, {})

const showReviewer = ref(false)
const listQuery = reactive({
  page: 1,
  limit: 20,
  importance: undefined,
  title: undefined,
  type: undefined,
  sort: '+id'
})

const importanceOptions = ref([
  "1", "2", "3"
])

//用于刷新table
const tableKey = ref(0)

const sortOptions = ref([{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }])

// table数据
onMounted(() => {
  getList()
})
const listData = ref()
const total = ref(0)
const getList = () => {
  fetchList(listQuery).then((res) => {
    console.log(res.data.items);

    listData.value = res.data.items
    total.value = res.data.total
  })
}

const statusTranslate = (status: string) => {
  const statusMap: any = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}

const handleFilter = () => {
  listQuery.page = 1
  getList()
}

const formatJson = (filterVal: any[]) => {
  return listData.value.map((v: any) => filterVal.map(j => {
    if (j === 'timestamp') {
      return timestampToTime(v[j])
    } else {
      return v[j]
    }
  }))
}

const handleDownload = () => {
  import("@/vendor/Export2Excel").then(excel => {

    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
    const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
    const data = formatJson(filterVal)


    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: listQuery.title || 'table-list',
    })
  })
}
</script>

<template>
  <div class="">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="title" style="width: 200px;" class="filter-item" />

      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px;" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>

      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px;">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name + '(' + item.key + ')'"
          :value="item.key" />
      </el-select>

      <el-select v-model="listQuery.sort" style="width: 140px;" class="filter-item" @change="handleFilter()">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>

      <el-button class="filter-item" type="primary" :icon="Search" style="margin-left: 10px;"
        @click="handleFilter">Search</el-button>
      <el-button class="filter-item" type="primary" :icon="Edit">Add</el-button>
      <el-button class="filter-item" type="primary" :icon="Download" @click="handleDownload">Export</el-button>

      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left: 15px;"
        @change="tableKey = tableKey + 1">
        reviewer
      </el-checkbox>

      <!-- 表格 -->
      <el-table :key="tableKey" :data="listData" highlight-current-row style="width: 100%;margin-top: 20px;" border>
        <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
          <template #default="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Date" align="center" width="150px">
          <template #default="{ row }">
            <span>{{ timestampToTime(row.timestamp) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Title" min-width="150">
          <template #default="{ row }">
            <span>{{ row.title }}</span>
            <el-tag>{{ calendarTypeObj[row.type] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Author" width="110px" align="center">
          <template #default="{ row }">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
          <template #default="{ row }">
            <span style="color:red;">{{ row.reviewer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Imp" width="80px">
          <template #default="{ row }">
            <svg-icon v-for="n in  row.importance" :key="n" name="svg-star" class="meta-item__icon" />
          </template>
        </el-table-column>
        <el-table-column label="Readings" align="center" width="95">
          <template #default="{ row }">
            <span v-if="row.pageviews" class="link-type">{{ row.pageviews }}</span>
            <span v-else>0</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" class-name="status-col" width="100">
          <template #default="{ row }">
            <el-tag :type="statusTranslate(row.status)">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template #default="{ row }">
            <el-button type="primary" size="small">
              Edit
            </el-button>
            <el-button v-if="row.status != 'published'" size="small" type="success">
              Publish
            </el-button>
            <el-button v-if="row.status != 'draft'" size="small">
              Draft
            </el-button>
            <el-button v-if="row.status != 'deleted'" size="small" type="danger">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination v-model:current-page="listQuery.page" :total="total" :page-size="listQuery.limit"
        @current-change="getList()" />

      <!--  -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
