import Vue from 'vue'
import VueRouter from 'vue-router' //导入路由

import home from '../components/home.vue'
import findMusic from '../components/content/findmusic/findMusic.vue'
import diyRecommend from '../components/content/findmusic/diyRecommend.vue'
import musicListPage from '../components/content/findmusic/musicListPage.vue'
import musicRank from '../components/content/findmusic/musicRank.vue'
import singerList from '../components/content/findmusic/singerList.vue'
import newMusicList from '../components/content/findmusic/newMusicList.vue'
import playPage from '../components/content/playlist/songlist.vue'
import list from '../components/content/playlist/list.vue'
import comment from '../components/content/playlist/comment.vue'
import subscribed from '../components/content/playlist/subscribed.vue'
import cloud from '../components/content/user/cloud.vue'
import videoPage from '../components/content/video/videoPage.vue'
import video from '../components/content/video/video.vue'
import mv from '../components/content/video/mv.vue'


Vue.use(VueRouter) //启用路由
// 设定路由地址
const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: home,
    redirect: '/findMusic',
    children: [
      {
        path: '/findMusic', component: findMusic, redirect: '/diyRecommend', children: [
          { path: '/diyRecommend', component: diyRecommend },
          { path: '/musicListPage', component: musicListPage },
          { path: '/musicRank', component: musicRank },
          { path: '/singerList', component: singerList },
          { path: '/newMusicList', component: newMusicList },
        ]
      }, {
        path: '/songlist/:id', component: playPage, redirect: '/list/:id',
        children: [
          { path: '/list/:id', component: list },
          { path: '/comment/:id', component: comment },
          { path: '/subscribed/:id', component: subscribed }
        ]
      }, {
        path: '/cloudMusic', component: cloud
      }, {
        path: '/videoPage', component: videoPage, redirect: '/video',
        children: [
          { path: '/video', component: video },
          { path: '/mv', component: mv },
        ]
      }
    ]
  }
]
// 获取router原型对象上的push
const originalPush = VueRouter.prototype.push
// 修改其方法，使得其不再报路由重复的错误
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 创建路由并放入地址
const router = new VueRouter({
  routes
})

// 暴露路由
export default router
