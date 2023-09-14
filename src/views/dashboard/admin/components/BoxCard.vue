<script setup lang="ts">
import { defineComponent } from "vue"
import { useUserStore } from "@/store/modules/user";
// import PanThumb from "@/components/PanThumb.vue"
import Mallki from "@/components/TextHoverEffect/Mallki.vue"

const userStore = useUserStore()


</script>

<script lang="ts">
export default defineComponent({
  name: 'BoxCard',
})
</script>

<template>
  <el-card class="box-card-component" style="margin: left 8px;">
    <!-- header -->
    <template #header>
      <div class="box-card-header">
        <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
      </div>
    </template>
    <!-- body -->
    <div style="position:relative;">
      <pan-thumb :image="userStore.avatar" class="panThumb" />
      <mallki class-name="mallki-text" text="vue-element-admin" />
      <div style="padding-top:35px;" class="progress-item">
        <span>Vue</span>
        <el-progress :percentage="70" />
      </div>
      <div class="progress-item">
        <span>JavaScript</span>
        <el-progress :percentage="18" />
      </div>
      <div class="progress-item">
        <span>CSS</span>
        <el-progress :percentage="12" />
      </div>
      <div class="progress-item">
        <span>ESLint</span>
        <el-progress :percentage="100" status="success" />
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.box-card-component {
  :deep(.el-card__header) {
    padding: 0px !important;
  }

  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
      transition: all .2s linear;

      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%)
      }
    }
  }

  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }

  .panThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute !important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;
  }

  .progress-item {
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>
