<template>
  <div class="newMusicContainer">
    <!-- 切换按钮 -->
    <div class="btnGroup">
      <el-button
        type="info"
        round
        @click="changeType(0)"
        :class="typeFlag ? 'is_active' : ''"
        >新歌速递</el-button
      >
      <el-button
        type="info"
        round
        @click="changeType(1)"
        :class="typeFlag ? '' : 'is_active'"
        >最受欢迎</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 切换flag
      typeFlag: true,
      // 列表信息
      newListInfo: [],
      // 参数信息
      catInfo: [],
      // 请求参数
      queryInfo: {
        order: 'new',
        cat: '全部',
        limit: 30
      }
    }
  },
  created () {
    // this.getNewList()
    this.getCat()
  },
  methods: {
    // 获取分类
    getCat () {
      this.$http.get('/playlist/hot').then(res => {
        this.catInfo = res.data.tags
      })
    },
    // 获取最新音乐
    getNewList () {
      this.$http.get('/top/playlist', { params: this.queryInfo }).then(res => {
        this.newListInfo = res.data.playlists
        console.log(res)
      })
    },
    // 切换类型
    changeType (num) {
      if (num) {
        this.typeFlag = false
        this.queryInfo.order = 'new'
      } else {
        this.typeFlag = true
        this.queryInfo.order = 'hot'
      }
      console.log(1)
      this.getNewList()
    }
  }
}
</script>

<style scoped>
.newMusicContainer {
  width: 90%;
  margin: auto;
}
.btnGroup {
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  border: 1px solid #909399;
  border-radius: 20px;
}
.el-button + .el-button {
  margin: 0;
}
.el-button {
  padding: 8px 23px !important;
}
.el-button--info {
  color: #909399;
  background-color: white;
  border-color: white;
}
.el-button:hover,
.el-button:focus {
  color: black;
}
.el-button:hover {
  background-color: rgb(216, 213, 213);
  border-color: rgb(216, 213, 213);
}
.is_active {
  background-color: rgb(166, 169, 173);
  border-color: rgb(166, 169, 173);
  color: black;
}
</style>