<script setup lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import { transactionList } from '@/api/remote-search'

const list = ref()

onMounted(() => {
  transactionList({}).then(res => {
    list.value = res.data.items.slice(0, 8)
  })
})

const toThousand = (num: number) => {
  return (num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

const typeChange = (type: string) => {
  switch (type) {
    case 'success':
      return 'success'
    case 'pending':
      return 'danger'
    case 'failed':
      return 'danger'
    default:
      return 'info'
  }
}

</script>

<script lang="ts">
export default defineComponent({
  name: 'TransactionTable',
})
</script>

<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Order_No" min-width="200">
      <template #default="{ row }">
        {{ row.order_no }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template #default="{ row }">
        ￥{{ toThousand(row.price) }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template #default="{ row }">
        <el-tag :type="typeChange(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped></style>
