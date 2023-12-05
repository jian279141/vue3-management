<script setup lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue"
import { fetchList } from "@/api/article";

onMounted(() => {
  getList()
})

const list = ref([])
const listQuery = reactive({
  page: 1,
  limit: 20,
})

const total = ref(0)
function getList() {
  fetchList(listQuery).then(res => {
    list.value = res.data.items
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

function handleSizeChange(val: number) {
  listQuery.limit = val
  getList()
}

function handleCurrentChange(val: number) {
  listQuery.page = val
  getList()
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'ArticleList',
})
</script>

<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column align="center" label="ID" width="80">
        <template #default="{ row }">
          <span>
            {{ row.id }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Date" width="180px">
        <template #default="{ row }">
          <span>
            {{ row.timestamp }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Author" width="120px">
        <template #default="{ row }">
          <span>
            {{ row.author }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="Imp" width="80px">
        <template #default="{ row }">
          <svg-icon v-for="n in  row.importance" :key="n" name="svg-star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column label="Status" class-name="status-col" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="statusTranslate(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Title">
        <template #default="{ row }">
          <span>
            {{ row.title }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="Action" width="120" align="center">
        <template #default="{ row }">
          <router-link :to="'/example/edit/' + row.id">
            <el-button type="primary" size="small">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="listQuery.page" :page-size="listQuery.limit" :page-sizes="[5, 10, 20]" background
      layout="prev,pager,next,total,sizes" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<style lang="scss" scoped></style>
