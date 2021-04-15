<template>
  <div class="songlistContainer">
    <!-- 头部区域 -->
    <div class="headArea">
      <!-- 图片 -->
      <div class="imgdiv">
        <img :src="album.picUrl" alt="" class="listPic" />
      </div>
      <!-- 歌单信息 -->
      <div>
        <div>
          <el-tag type="danger" effect="plain">专辑</el-tag>
          <span class="listtitle">{{ album.name }}</span>
        </div>

        <!-- 操作 -->
        <div style="margin-top: 10px">
          <el-button
            type="danger"
            icon="el-icon-caret-right"
            class="playAll"
            @click="playAll()"
          >
            全部播放
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-plus"
            class="addList"
            @click="addAll()"
          ></el-button>
          <el-button round icon="el-icon-folder-add">{{ "收藏" }}</el-button>
        </div>

        <!-- 标签、播放、简介信息 -->
        <div>
          <ul class="listInfo">
            <li>歌手：{{ album.artist.name }}</li>
            <li>创建时间：{{ album.publishTime | dateFormatToYMD }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div>
      <!-- 导航条 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲" name="songlist"
          ><song :songlist="songlist" @playingList="play"></song
        ></el-tab-pane>
        <el-tab-pane label="评论" name="singerList">
          <comment :list="albumListId"></comment>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import song from 'c:/Users/LuyiaGoe/Desktop/vue/vue-pro-03/src/components/content/album/albumsonglist.vue'
import comment from 'c:/Users/LuyiaGoe/Desktop/vue/vue-pro-03/src/components/content/album/comment.vue'
export default {
  data () {
    return {
      activeName: 'songlist',
      //页面id号
      pageID: '',
      // 歌单清单
      songlist: [],
      // 用户歌单收藏按钮禁用flag
      userListFlag: true,
      activeIndex: '/list/',
      // 专辑信息
      album: [],
      // 用于父子组件传值的评论列表
      albumListId: ''
    }
  },
  components: {
    song,
    comment
  },
  created () {
    this.activeIndex = this.$route.path
    this.pageID = this.$route.params.id
    this.getAlbumInfo()
  },
  methods: {
    // 播放
    play () {
      this.$emit('play')
    },

    // 按照route传来的id获取专辑信息
    getAlbumInfo () {
      let listId = this.$route.params.id
      this.$http.get(`/album?id=${listId}`).then(res => {
        this.album = res.data.album
        this.songlist = res.data.songs
        this.albumListId = res.data.album.commentThreadId
      }).catch(err => {
        err
      })
    },

    // 全部播放按钮，将歌单替换掉,并触发home的播放
    playAll () {
      this.$store.commit('switchPlayingList', this.songlist.tracks)
      this.$emit('play')
    },

    // 添加全部，往歌单后面添加本歌单内容
    addAll () {
      this.$store.commit('addPlayingList', { list: this.playingList, concat: true })
    },

    // 获取到列表详情，即歌单
    getListDet () {
      this.$http.get('/playlist/detail', { params: { id: this.$route.params.id } }).then(res => {
        let songsId = []
        res.data.playlist.trackIds.map(item => songsId.push(item.id))
        this.$http.get(`/song/detail?ids=${songsId}`).then(res => {
          this.songlist = res.data.songs
          this.passDetail()
        })
      }).catch(err => {
        err
      })
    },

  }
}
</script>

<style scoped>
.songlistContainer {
  width: 90%;
  margin: 12px auto 0;
}
.headArea {
  display: flex;
}
.imgdiv {
  height: 200px;
  overflow: hidden;
  width: 200px;
  border-radius: 10px;
  margin-right: 20px;
}
.listPic {
  width: 200px;
  margin-right: 20px;
}
.listtitle {
  margin-left: 10px;
  vertical-align: middle;
  font-weight: 1000;
  font-size: 25px;
}
.userIcon_unlogin {
  cursor: pointer;
  margin-right: 10px;
  vertical-align: middle;
  width: 30px;
  border-radius: 50%;
}
.font12 {
  font-size: 12px;
}
.playAll {
  padding: 5px 6px 5px 10px;
  border-radius: 19px 0 0 19px;
  border-right: 1px solid white;
}
.el-button:focus {
  color: white;
}
.menu {
  margin-top: 20px !important;
  margin-bottom: 15px !important;
}
.el-menu-item {
  width: auto !important;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid rgb(236, 65, 65);
}
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
.addList {
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 0 19px 19px 0;
  margin-left: 0 !important;
}
.el-icon-caret-right:before {
  font-size: 20px;
  vertical-align: middle;
}
.el-button.is-round {
  padding: 5px 18px;
}
.listInfo {
  list-style: none;
  font-size: 15px;
  padding: 0;
  color: grey;
}
</style>