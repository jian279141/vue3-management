<script setup lang="ts">
import { defineComponent, ref } from "vue"
import TabPane from "./components/TabPane.vue";

const tabMapOptions = ref([
  { label: 'China', key: 'CN' },
  { label: 'USA', key: 'US' },
  { label: 'Japan', key: 'JP' },
  { label: 'Eurozone', key: 'EU' },
])

const createTimes = ref(0)
const addCreateTimes = () => {
  createTimes.value++
}

const activeName = ref('CN')
</script>

<script lang="ts">
export default defineComponent({
  name: 'Tab',
})
</script>

<template>
  <div class="app-container">
    <div class=" flex items-center">
      <el-tag class="inline-block">mounted:{{ createTimes }}</el-tag>
      <el-alert :closable="false" style="width: 200px;  margin-left: 20px;" title="Tab with keep-alive"
        type="success"></el-alert>
    </div>

    <!-- tabs -->
    <el-tabs type="border-card" class="mt-4" v-model="activeName">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="activeName == item.key" :type="item.key" @create="addCreateTimes()"></tab-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped></style>
