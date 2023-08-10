import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import 'element-plus/dist/index.css'// element-plus css
import 'element-plus/theme-chalk/dark/css-vars.css'// element-plus dark theme
import '@/styles/index.scss'  // global css
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'// svg图标注册
import App from './App.vue'
import router from '@/router/index'// router
import '@/permission.ts' // permission control
import { createPinia } from 'pinia'
import SvgIcon from '@/components/SvgIcon/index.vue'; // svg component
import permission from '@/directive/permission/permission'
import clipboard from '@/directive/clipboard'


const app = createApp(App)
export const pinia = createPinia()

// 注册element-plus的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册自定义指令
app.directive('permission', permission)
app.directive('clipboard', clipboard)


app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.component("svg-icon", SvgIcon);
app.mount('#app')

export default app