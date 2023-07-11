<script setup lang="ts">
import { onMounted, computed, watch } from "vue"
import ScrollPane from './ScrollPane.vue'
import { useTagsViewStore } from "@/store/modules/tagsView";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute()

// 页面加载时，添加tags
onMounted(() => {
  addTags()
})

// 监听路由变化，添加tags
watch(route, () => {
  addTags()
})
const tagsViewStore = useTagsViewStore()

// 访问过的tags
const visitedCache = computed(() => {
  return tagsViewStore.visitedViews
})

// 添加tags
const addTags = () => {
  const { name } = route
  if (name) {
    tagsViewStore.add_view(route)
  }
}
// 过滤出需要固定在tagsView的tags
const filterAffixTags = (routes: any, basePath = '/') => {
  let tags: any[] = []
  routes.forEach((route: any) => {
    if (route.meta && route.meta.affix) {
      tags.push({
        fullPath: basePath + route.path,
        path: route.path,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = tags.concat(tempTags)
      }
    }
  })
  return tags
}

// 判断是否是需要固定在tagsView的tag
const isAffixTag = (tag: any) => {
  return tag.meta && tag.meta.affix
}

// 判断是否是当前路由的tag
const isActiveTag = (tag: any) => {
  return tag.path === route.path
}

// 点击tag
const handlerClick = (tag: any) => {
  router.push(tag.path)
}

// 关闭tag
const handlerClose = (tag: any) => {
  tagsViewStore.del_view(tag).then(() => {
    if (isActiveTag(tag)) {
      toLastView(visitedCache.value)
    }
  })
}

// 去最后访问的tag
const toLastView = (visitedViews: any[]) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.path)
  } else {
    router.push('/')
  }
}
</script>

<script lang="ts">
export default {
  name: 'TagsView'
}
</script>

<template>
  <div id="tags-view-container" class="tags-view-container">
    <ScrollPane id="scroll-pane" class="scroll-pane">
      <div class="tags-view-wrapper">
        <div class="tags-view">
          <el-tag class="tags-view-item" v-for="tag in visitedCache" :key="tag.path"
            :type="isActiveTag(tag) ? 'success' : 'info'" :closable="!isAffixTag(tag)" effect="dark"
            @click="handlerClick(tag)" @close="handlerClose(tag)">
            {{ tag.title }}
          </el-tag>
          <!-- <el-tag class="tags-view-item" v-for="i in 10" :key="i" closable effect="dark">
            Tag {{ i }}
          </el-tag> -->
        </div>
      </div>
    </ScrollPane>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  background-color: #fff;

  .tags-view-wrapper {
    height: 100%;
    overflow: hidden;

    .tags-view {
      height: 100%;
      line-height: 34px;
      padding-left: 20px;

      .tags-view-item {
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
