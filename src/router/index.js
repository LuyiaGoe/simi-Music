import Vue from 'vue'
import VueRouter from 'vue-router' //导入路由

import home from '../components/home.vue'
import findMusic from '../components/content/findmusic/findMusic.vue'


Vue.use(VueRouter) //启用路由

// 设定路由地址
const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: home,
    children: [
      { path: '/findMusic', component: findMusic }
    ]
  }
]

// 创建路由并放入地址
const router = new VueRouter({
  routes
})

// 暴露路由
export default router
