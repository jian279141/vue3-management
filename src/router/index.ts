import { createRouter, createWebHistory } from 'vue-router';

import Layout from '@/layout/index.vue';
import tableRouter from './modules/table';

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    // 不会在侧边栏出现
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/index',
    hidden: true,
    children: []
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'dashboard',
          affix: true
        }
      }]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index.vue'),
        name: 'Documentation',
        meta: {
          title: 'Documentation',
          icon: 'documentation',
          affix: true
        }
      }]
  },
  // 为了防止刷新页面，动态添加的路由消失，导致not found，所以要在这里添加一下
  {
    path: '/:catchAll(.*)*',
    hidden: true,
    // name: '404',不能加名字否则会导航到这个页面
    component: () => import('@/views/error/404.vue'),
    children: []
  },
]

export const asyncRoutes = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create.vue'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'list',
        component: () => import('@/views/example/list.vue'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit.vue'),
        hidden: true,
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true,
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel.vue'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel.vue'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      }
    ]
  },
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index.vue'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download.vue'),
    hidden: true
  },
  {
    path: '/theme',
    component: Layout,
    redirect: '/theme/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index.vue'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    redirect: '/clipboard/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index.vue'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index.vue'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    redirect: '/tab/index',
    alwaysShow: true,
    name: 'Tab',
    meta: { title: 'Tab', icon: 'tab' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index.vue'),
        name: 'Tab',
        meta: { title: 'Tab' }
      }]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/linechart',
    alwaysShow: true,
    name: 'Charts',
    meta: { title: 'Charts', icon: 'chart' },
    children: [
      {
        path: 'linechart',
        component: () => import('@/views/chart/line.vue'),
        name: 'LineChart',
        meta: { title: 'Line Chart' }
      },
      {
        path: 'keyboard',
        component: () => import('@/views/chart/keyboard.vue'),
        name: 'KeyboardChart',
        meta: { title: 'Keyboard Chart' }
      },
      {
        path: 'mixchart',
        component: () => import('@/views/chart/mix-chart.vue'),
        name: 'MixChart',
        meta: { title: 'Mix Chart' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index.vue'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  tableRouter,
  // 外链接
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/jian279141/vue3-management',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})


export function resetRouter() {
  // //获取所有路由
  // router.getRoutes().forEach((route) => {
  //   const { name } = route;   //获取路由name
  //   if (name) {
  //     router.hasRoute(name) && router.removeRoute(name);
  //   }
  // });
  // //重置路由
  // location.reload();

}


export default router;