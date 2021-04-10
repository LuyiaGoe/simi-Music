<template>
  <div class="songlistContainer">
    <!-- 头部区域 -->
    <div class="headArea">
      <!-- 图片 -->
      <div class="imgdiv">
        <img :src="songlist.coverImgUrl" alt="" class="listPic" />
      </div>
      <!-- 歌单信息 -->
      <div>
        <div>
          <el-tag type="danger" effect="plain">歌单</el-tag>
          <span class="listtitle">{{ songlist.name }}</span>
        </div>
        <div style="margin-top: 10px">
          <img :src="songlist.creator.avatarUrl" class="userIcon_unlogin" />
          <span style="color: darkblue" class="font12">{{
            songlist.creator.nickname
          }}</span>
          <span style="margin-left: 10px" class="font12"
            >{{ songlist.createTime | dateFormatToYMD }}{{ "创建" }}</span
          >
        </div>

        <!-- 操作 -->
        <div style="margin-top: 10px">
          <el-button type="danger" icon="el-icon-caret-right" class="playAll">
            全部播放
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-plus"
            class="addList"
          ></el-button>
          <el-button
            round
            disabled
            icon="el-icon-folder-add"
            v-if="!userListFlag"
            >{{ "收藏 (" + songlist.subscribedCount + ")" }}</el-button
          >
          <el-button round icon="el-icon-folder-add" v-if="userListFlag">{{
            "收藏 (" + songlist.subscribedCount + ")"
          }}</el-button>
        </div>

        <!-- 标签、播放、简介信息 -->
        <div>
          <ul class="listInfo">
            <li v-if="!songlist.ordered">
              <span style="display: flex"
                >标签:
                <span
                  v-if="songlist.tags.length == 0"
                  style="margin-left: 10px; cursor: pointer"
                  >编辑标签</span
                >
                <el-breadcrumb
                  separator="/"
                  style="line-height: 21px; margin-left: 10px"
                  v-if="songlist.tags.length !== 0"
                >
                  <el-breadcrumb-item
                    :to="{ path: '/' }"
                    v-for="(item, index) in songlist.tags"
                    :key="index"
                  >
                    {{ item }}
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </span>
            </li>
            <li>
              <span style="margin-right: 10px">歌曲:</span>
              {{ songlist.trackCount }}
              <span style="margin: 0 10px">播放次数:</span>
              {{ songlist.playCount }}
            </li>
            <li v-if="!songlist.ordered">
              <span style="margin-right: 10px">简介:</span>
              <span v-if="songlist.description">{{
                songlist.description
              }}</span>
              <span v-else style="cursor: pointer">添加简介</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div>
      <!-- 导航条 -->
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        class="menu"
        :router="true"
      >
        <el-menu-item :index="'/list/' + pageID">歌曲列表</el-menu-item>
        <el-menu-item :index="'/comment/' + pageID">{{
          "评论(" + songlist.playCount + ")"
        }}</el-menu-item>
        <el-menu-item :index="'/subscribed/' + pageID">收藏者</el-menu-item>
      </el-menu>

      <!-- 内容路由 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //页面id号
      pageID: '',
      // 歌单清单
      songlist: {},
      // 用户歌单收藏按钮禁用flag
      userListFlag: true,
      activeIndex: '/list/'
    }
  },
  created () {
    this.activeIndex = this.$route.path
    this.pageID = this.$route.params.id
    this.getSonglist()
    console.log(this.songlist);
  },
  methods: {
    // 按照route传来的id获取歌单信息
    getSonglist () {
      let listId = this.$route.params.id
      // 用户歌单
      let userSongList = JSON.parse(sessionStorage.getItem('userPlayList'))

      // 通过id找到歌单
      userSongList.some(item => {
        if (item.id == listId) {
          this.songlist = item
          this.userListFlag = false
          return true
        }
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