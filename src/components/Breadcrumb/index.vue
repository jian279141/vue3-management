<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { RouteLocationMatched } from "vue-router";
import { compile } from 'path-to-regexp'
const route = useRoute()
const router = useRouter()
onMounted(() => {
  getBreadcrumb()
})

watch(route, () => {
  getBreadcrumb()
})

const levelList = ref()

const getBreadcrumb = () => {
  let matched: RouteLocationMatched[] = route.matched.filter(item => item.meta && item.meta.title)


  // console.log(matched)
  const first = matched[0]

  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched as any) as any
  }

  levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

const isDashboard = (route: any) => {
  const name = route?.name
  if (!name) return false
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}


const handleClick = (item: any) => {
  const { redirect, path } = item
  if (redirect === 'noRedirect') {
    router.push(redirect)
    return
  }

  router.push(pathCompile(path))
}

const pathCompile = (path: string) => {
  const { params } = route
  var toPath = compile(path)
  return toPath(params)
}
</script>

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title
      }}</span>
      <a v-else @click.prevent="handleClick(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 24px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
