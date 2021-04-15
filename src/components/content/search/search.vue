<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="container">
      <el-tab-pane label="单曲" name="songList"
        ><listPart :songlist="songList" @playingList="play"></listPart
      ></el-tab-pane>
      <el-tab-pane label="歌手" name="albumList">
        <list :list="songList"></list>
      </el-tab-pane>
      <el-tab-pane label="专辑" name="singerList">
        <album :list="albumList"></album>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="playList">
        <song :list="playList"></song>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import listPart from 'c:\\Users\\LuyiaGoe\\Desktop\\vue\\vue-pro-03\\src\\components\\content\\playlist\\list.vue'
import list from 'C:/Users/LuyiaGoe/Desktop/vue/vue-pro-03/src/components/content/search/searchsingerList.vue'
import song from 'C:/Users/LuyiaGoe/Desktop/vue/vue-pro-03/src/components/content/search/songList.vue'
import album from 'C:/Users/LuyiaGoe/Desktop/vue/vue-pro-03/src/components/content/search/albumList.vue'
export default {
  props: ['searchKeyWords'],
  data () {
    return {
      activeName: 'songList',
      // 单曲列表 type：1
      songList: [],
      // 专辑 type：10
      albumList: [],
      // 歌手 type：100
      singerList: [],
      // 歌单 type：1000
      playList: []
    }
  },
  components: {
    listPart: listPart,
    list,
    song,
    album
  },
  methods: {
    // 关键词搜索
    searchEvent () {
      let keywords = this.searchKeyWords
      // 搜索单曲
      this.$http.get(`/cloudsearch?keywords=${keywords}`, { params: { type: 1 } }).then(res => {
        this.songList = res.data.result.songs
        this.songList.tracks = res.data.result.songs
      })
      // 专辑
      this.$http.get(`/cloudsearch?keywords=${keywords}`, { params: { type: 10 } }).then(res => {
        this.albumList = res.data.result
        this.albumList.tracks = res.data.result.albums
      })
      // 歌手
      this.$http.get(`/search?keywords=${keywords}`, { params: { type: 100, limit: 5 } }).then(res => {
        this.singerList = res.data.result
        this.singerList.tracks = res.data.result.artists
      })
      // 歌单
      this.$http.get(`/cloudsearch?keywords=${keywords}`, { params: { type: 1000 } }).then(res => {
        this.playList = res.data.result
        this.playList.tracks = res.data.result.playlists
      })
    },

    // 播放
    play () {
      this.$emit('play')
    },
    // 切换tab栏触发
    handleClick () {
    }
  },
  created () {
    this.searchEvent()
  }
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: 15px auto;
}
</style>