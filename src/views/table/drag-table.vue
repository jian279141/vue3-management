<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue"
import { fetchList } from '@/api/article'
import { timestampToTime } from '@/utils'
import Sortable from 'sortablejs';

const statusTranslate = (status: string) => {
  const statusMap: any = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}

onMounted(() => {
  getList()
})

const dragTable = ref()
const sortable = ref()
const list = ref()
const total = ref()
const oldList = ref([])
const newList = ref([])

const getList = async () => {
  const { data } = await fetchList({})
  list.value = data.items
  total.value = data.total
  oldList.value = list.value.map((item: any) => item.id)
  newList.value = oldList.value.slice()
  nextTick(() => {
    setSort()
  })
}

const setSort = () => {
  const el = dragTable.value.$el.querySelector('.el-table__body-wrapper tbody')
  sortable.value = Sortable.create(el, {
    ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
    onEnd: (evt: any) => {
      const targetRow = list.value.splice(evt.oldIndex, 1)[0]
      list.value.splice(evt.newIndex, 0, targetRow)
      const tempIndex = newList.value.splice(evt.oldIndex, 1)[0]
      newList.value.splice(evt.newIndex, 0, tempIndex)
    }
  })
}
</script>

<template>
  <div class="app-container">
    <el-table border :data=list ref="dragTable">

      <el-table-column label="ID" align="center" width="65">
        <template #default="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Date" align="center" width="180px">
        <template #default="{ row }">
          <span>{{ timestampToTime(row.timestamp) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Title" min-width="300px">
        <template #default="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Author" align="center" width="110px">
        <template #default="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Importance">
        <template #default="{ row }">
          <svg-icon v-for="n in row.importance" :key="n" name="svg-star" class="icon-star"></svg-icon>
        </template>
      </el-table-column>

      <el-table-column label="Reading" align="center">
        <template #default="{ row }">
          {{ row.pageviews }}
        </template>
      </el-table-column>

      <el-table-column label="Status" align="center">
        <template #default="{ row }">
          <el-tag :type="statusTranslate(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Drag" align="center">
        <template #default="{}">
          <svg-icon name="svg-drag" class="icon-drag"></svg-icon>
        </template>
      </el-table-column>


    </el-table>
    <div class="show-d">
      <el-tag>
        The default order:
      </el-tag>{{ oldList }}
    </div>
    <div class="show-d">
      <el-tag>
        The default order:
      </el-tag>{{ newList }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sortable-ghost {
  opacity: .8;
  color: #fff !important;
  background: #42b983 !important;
}

.icon-star {
  margin-right: 2px;
}
</style>
