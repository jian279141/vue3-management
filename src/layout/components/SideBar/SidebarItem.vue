<script setup lang="ts">
import { defineComponent, ref } from "vue"
import { isExternal } from "@/utils/validate"
import Link from './Link.vue'
import Item from './Item.vue'
import path from 'path-browserify'
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    required: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

// 解析路径
const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {

    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}

// 判断是否只有一个子菜单
const onlyOneChild = ref()
const hasOneShowingChild = (children = [], parent: any) => {
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })
  // 如果只有一个子菜单，且不是外链，则默认展开
  if (showingChildren.length === 1) {
    return true
  }
  // 如果没有子菜单，则不展示该父菜单
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return false
  }
  // 其他情况正常展示
  return false
}

const resolveSubPath = (childPath: string) => {
  return path.resolve(props.basePath, childPath)
}

</script>

<script lang="ts">
export default defineComponent({
  name: 'SidebarItem',
})
</script>

<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item)">
      <Link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
        <Item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title" />
      </el-menu-item>>
      </Link>
    </template>

    <!-- 如果有多个子路由 -->
    <el-sub-menu v-else :index="resolvePath(item.path)" teleported>
      <template #title>
        <Item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- <SidebarItem v-for="child in item.children" :key="child.path" :item="child" :isNest="true"
        :basePath="resolvePath(item.path)" class="nest-menu" /> -->
      <router-link v-for="child in item.children" :key="child.path" :to="resolveSubPath(child.path)">
        <el-menu-item :index="child.path">{{ child.path }}</el-menu-item>
      </router-link>
    </el-sub-menu>

  </div>
</template>

<style lang="scss" scoped>
.el-menu-item {
  color: rgb(191, 203, 217)
}

.el-sub-menu {
  --el-menu-text-color: rgb(191, 203, 217);

  :deep(.el-menu--inline) {
    --el-menu-bg-color: rgb(24, 31, 40) !important;
  }
}

.el-menu-item.is-active {
  color: #409eff
}
</style>
