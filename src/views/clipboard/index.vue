<script setup lang="ts">
import { ref } from "vue"
import clip from "@/utils/clipboard" // use clipboard directly
import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core' // use clipboard by VueUse


const handleCopy = (text: string, event: Event) => {
  clip(text, event)
}

const clipboardSuccess = () => {
  ElMessage({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

const tabItem = ref('first')

const inputData = ref('https://github.com/jian279141/vue3-management')

const { copy, copied } = useClipboard() // use clipboard by VueUse

const copyText = (): void => {
  copy(inputData.value)
  if (copied) {
    ElMessage({
      message: 'Copy successfully',
      type: 'success',
      duration: 1500
    })
  }
}
</script>

<template>
  <div class="clipboard-container">
    <el-tabs v-model="tabItem">
      <el-tab-pane label="use clipboard directly" name="first" class=" flex">
        <el-input v-model="inputData" placeholder="please input" />
        <el-button type="primary" @click="handleCopy(inputData, $event)">copy</el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="second" class="flex">
        <el-input v-model="inputData" placeholder="please input" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary"
          @click="">copy</el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by VueUse" name="third" class="flex">
        <el-input v-model="inputData" placeholder="please input" />
        <el-button type="primary" @click="copyText()">copy</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.clipboard-container {
  padding: 10px;
}
</style>
