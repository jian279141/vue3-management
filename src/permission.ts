import router from '@/router/index'// router
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { getToken } from '@/utils/auth'
import { RouteRecordRaw } from 'vue-router'


const whiteList = ['/login', '/auth-redirect']// no redirect whitelist
type Roles = string[]

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title as string || 'TOM Admin'
  const token = getToken()
  if (token) {
    // 有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      //  有token，但是没有roles
      const hasRoles = useUserStore().roles && useUserStore().roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 有token，但是没有roles，所以要获取roles
          await useUserStore().getInfo()
          const roles = useUserStore().roles
          // 生成可访问的路由表
          const accessRoutes = await usePermissionStore().generateRoutes(roles as Roles) as RouteRecordRaw[]
          // 动态添加可访问的路由
          // console.log(usePermissionStore().permissionRoutes);
          // console.log(accessRoutes);

          accessRoutes.forEach((route: RouteRecordRaw) => {
            router.addRoute(route)
          })
          // hack方法 确保addRoutes已完成
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error);

          // 移除token，重新登录
          await useUserStore().resetToken()
          next(`/login?redirect=${to.path}`)
        }
      }

    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
    }
  }
})