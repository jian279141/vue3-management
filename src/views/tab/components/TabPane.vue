<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { fetchList } from "@/api/article";

const props = defineProps({
  type: {
    type: String,
    default: 'CN'
  }
})

const emit = defineEmits(['create'])

const listData = ref()

onMounted(() => {
  getList()
})

const listQuery = {
  page: 1,
  limit: 20,
  type: props.type,
  sort: '+id'
}

const getList = () => {
  emit('create')
  fetchList(listQuery).then(response => {
    listData.value = response.data.items
  })
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'TabPane',
})
</script>

<template>
  <div class="">
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

<style lang="scss" scoped></style>
