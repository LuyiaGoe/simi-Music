<template>
  <div class="container">
    <!-- 头部区域 -->
    <el-row :gutter="20" style="margin-bottom: 15px">
      <!-- 照片区域 -->
      <el-col :span="4">
        <img :src="singerDetail.img1v1Url" alt="" />
      </el-col>
      <!-- 信息区域 -->
      <el-col :span="16">
        <el-col
          ><h2>{{ singerDetail.name }}</h2></el-col
        >
        <el-col>{{ singerDetail.alias[0] }}</el-col>
        <el-col class="countFont">
          单曲数:{{ singerDetail.musicSize }}&nbsp;&nbsp; MV数:{{
            singerDetail.mvSize
          }}&nbsp;&nbsp; 专辑数:{{ singerDetail.albumSize }}&nbsp;&nbsp;
        </el-col>
      </el-col>
    </el-row>

    <!-- tab区域 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="专辑" name="album">
        <album :hot50="hot50" :album="album"></album>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <singmv :singermv="singermv"></singmv>
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="detail">
        <intro
          :singerIntro="singerIntro"
          :singername="singerDetail.name"
        ></intro>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import album from 'c:/Users/LuyiaGoe/Desktop/vue/vue-pro-03/src/components/content/singer/singerAlbum.vue'
import singmv from 'c:/Users/LuyiaGoe/Desktop/vue/vue-pro-03/src/components/content/singer/singerMv.vue'
import intro from 'c:/Users/LuyiaGoe/Desktop/vue/vue-pro-03/src/components/content/singer/singerIntro.vue'

export default {
  data () {
    return {
      activeName: 'album',
      // 歌手最热的50首
      hot50: [],
      // 歌手详情
      singerDetail: [],
      // 歌手介绍
      singerIntro: [],
      // 歌手专辑
      album: [],
      // 歌手MV
      singermv: []
    }
  },
  components: {
    album,
    singmv,
    intro
  },
  methods: {
    // 歌手MV
    getsingerMv () {
      this.$http.get(`/artist/mv?id=${this.$route.params.id}`).then(res => {
        this.singermv = res.data.mvs
      })

    },
    // 歌手热门50首歌曲
    gethotsongs () {
      this.$http.get(`/artist/top/song?id=${this.$route.params.id}`).then(res => {
        this.hot50 = res.data.songs
        this.getAlbum()
      })
    },

    // 获取歌手专辑 此处只展示5个
    getAlbum () {
      this.$http.get(`/artist/album?id=${this.$route.params.id}`, { params: { limit: 5 } }).then(res => {
        this.album = res.data.hotAlbums
        this.album.forEach(item => {
          this.$http.get(`/album?id=${item.id}`).then(res => {
            item.songs = res.data.songs
          })
        })
      })
    },

    // 获取歌手详情
    getSingerInfo () {
      this.$http.get(`/artists?id=${this.$route.params.id}`).then(res => {
        this.singerDetail = res.data.artist
      })
    },

    // 获取歌手介绍
    getSingerIntro () {
      this.$http.get(`/artist/desc?id=${this.$route.params.id}`).then(res => {
        this.singerIntro = res.data
      })

    }
  },
  created () {
    this.getSingerInfo()
    this.gethotsongs()
    this.getSingerIntro()
    this.getsingerMv()
  }
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: 15px auto;
}
.el-col img {
  width: 100%;
}
.countFont {
  margin-top: 8px;
  font-size: 14px;
}
</style>