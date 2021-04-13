<template>
  <div class="findMusicContainer">
    <el-tabs v-model="tabname" @tab-click="handleClick">
      <el-tab-pane label="  个性推荐" name="diyRecommend"> </el-tab-pane>
      <el-tab-pane label="歌单" name="musicListPage"> </el-tab-pane>
      <el-tab-pane label="排行榜" name="musicRank"> </el-tab-pane>
      <el-tab-pane label="歌手" name="singerList"> </el-tab-pane>
      <el-tab-pane label="最新音乐" name="newMusicList"> </el-tab-pane>
      <router-view @play="playMusic"> </router-view>
    </el-tabs>
  </div>
</template>

<script>

export default ({
  data () {
    return {
      tabname: 'diyRecommend'
    }
  },
  created () {
    this.activeTab()
  },
  methods: {
    // 点击tab栏进行跳转
    handleClick () {
      this.$router.push({ path: '/' + this.tabname })
    },
    // 刷新后根据页面，激活相对应的tab标签
    activeTab () {
      this.tabname = this.$route.path.slice(1)
    },
    // 触发home的播放
    playMusic () {
      this.$emit('play')
    }
  }
})
</script>

<style scoped>
.findMusicContainer {
  width: 95%;
  margin: auto;
}
.el-tabs__active-bar {
  background-color: black !important;
}
</style>
