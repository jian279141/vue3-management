<script setup lang="ts">
import { ref } from "vue"

const headerSearchSelect = ref<HTMLElement | null>(null)
const show = ref<boolean>(false)
const click = () => {
  show.value = !show.value
  if (show.value) {
    headerSearchSelect.value?.focus()
  }
}

const search = ref<string>('')
</script>

<template>
  <div class="header-search flex-row" :class="{ 'show': show }">
    <svg-icon name="svg-search" @click="click" className="search-icon" class="" />
    <el-select ref="headerSearchSelect" v-model="search" placeholder="Search" class="header-search-select" filterable>
      <el-option label="document 1" value="1" />
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;



    // aria-describedby="el-popover-1234"
    // /*将小箭头的样式去去掉*/
    // :deep(.el-icon-arrow-up:before) {
    //   content: '';
    // }


  }



  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}

:deep(.el-input) {
  --el-input-focus-border: #fff;
  --el-input-transparent-border: 0 0 0 0px;
  --el-input-border-color: #fff;
  --el-input-hover-border: 0px !important;
  --el-input-hover-border-color: #fff;
  --el-input-focus-border-color: #fff;
  --el-input-clear-hover-color: #fff;
  box-shadow: 0 0 0 0px !important;
  --el-input-border: 0px;
}

:deep(.el-select .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 0px !important;
}

:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: 0 0 0 0px !important;
}

:deep(.el-select) {
  --el-select-border-color-hover: #fff !important;
}
</style>
