<script setup lang="ts">
import { defineComponent } from "vue"
import { SideBar, NavBar, TagsView, AppMain } from './components'
</script>
<script lang="ts">
export default defineComponent({
  name: 'Layout'
})
</script>

<template>
  <div class="app-wrapper">
    <SideBar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <NavBar />
        <TagsView />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    // width这个表达式的意思是：100% - 210px
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }
}

.sidebar-container {
  transition: width 0.28s;
  width: 210px !important;
  background-color: #304256;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>
