import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

// 判断是否有权限
function hasPermission(roles: string[], route: any) {
  if (route.meta && route.meta.roles) {
    return roles.some((role: any) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// 递归过滤异步路由表，返回符合用户角色权限的路由表
export function filterAsyncRoutes(routes: any[], roles: string[]) {
  const res: any[] = []
  routes.forEach((route: any) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

interface State {
  routes: any,
  addRoutes: any
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): State => ({
    routes: [],
    addRoutes: []
  }),
  getters: {
    permissionRoutes: (state) => state.routes,
  },
  actions: {
    SET_ROUTES(routes: any[]) {
      this.routes = constantRoutes.concat(routes)
      this.addRoutes = routes
    },
    generateRoutes(roles: string[]) {
      return new Promise<Array<any>>(resolve => {
        let accessedRoutes: RouteRecordRaw[]
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        this.SET_ROUTES(accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})

