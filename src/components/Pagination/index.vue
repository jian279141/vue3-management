<script setup lang="ts">
import { computed } from "vue"
const props = defineProps({
  hidden: {
    type: Boolean,
    default: false
  },
  total: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 50]
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  }
})

const currentPage = computed({
  get: () => props.page,
  set(val) {
    this.$emit('update:page', val)
  }
})

const pageSize = computed({
  get: () => props.limit,
  set(val) {
    this.$emit('update:limit', val)
  }
})

function handleSizeChange(val: number) {
  this.$emit('pagination', { page: currentPage, limit: val })
  if (props.autoScroll) {
    window.scrollTo(0, 800)
  }
}

function handleCurrentChange(val: number) {
  this.$emit('pagination', { page: val, limit: pageSize })
  if (props.autoScroll) {
    window.scrollTo(0, 800)
  }
}
</script>

<template>
  <div :class="{ 'hidden': hidden }">
    <el-pagination :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :total="total"
      :layout="layout" :background="background" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<style lang="scss" scoped></style>
