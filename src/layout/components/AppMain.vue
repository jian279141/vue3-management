<script setup lang="ts">
import { computed, } from "vue"
// import { useRoute } from "vue-router"
import { useTagsViewStore } from "@/store/modules/tagsView";

// const route = useRoute()
const tagsViewStore = useTagsViewStore()

// const key = computed(() => {
//   return route.path
// })

// watch(route, () => {
//   console.log(tagsViewStore.cachedViews);

// })

const cachedViews = computed(() => {
  return tagsViewStore.cachedViews
})

</script>

<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- <keep-alive :include="cachedView">
      <router-view :key="key" />
    </keep-alive> -->
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  // 50px是navbar的高度
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
}

.fixed-header+.app-main {
  margin-top: 90px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}

.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
