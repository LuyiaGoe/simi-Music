<template>
  <div class="container">
    <!-- 选择标签 -->
    <div>
      <el-popover
        placement="right-start"
        width="700"
        trigger="click"
        :content="activeCat"
      >
        <el-row :gutter="5">
          <el-col :span="24"
            ><el-button :type="btnType" @click="selectCat"
              >全部</el-button
            ></el-col
          >
          <el-divider></el-divider>
          <el-col :span="4">
            <el-button type="text" disabled icon="el-icon-connection">
              语种
            </el-button>
          </el-col>
          <el-col :span="20">
            <el-col :span="4" v-for="item in cat.slice(0, 5)" :key="item.id">
              <el-button :type="btnType" @click="selectCat">{{
                item.name
              }}</el-button>
            </el-col>
          </el-col>
          <el-divider></el-divider>
          <el-col :span="4">
            <el-button type="text" disabled icon="el-icon-guide">
              风格
            </el-button>
          </el-col>
          <el-col :span="20">
            <el-col :span="4" v-for="item in cat.slice(5)" :key="item.id">
              <el-button :type="btnType" @click="selectCat">{{
                item.name
              }}</el-button>
            </el-col>
          </el-col>
        </el-row>
        <el-button
          slot="reference"
          class="active_btn"
          style="margin-right: 50px"
          >{{ activeCat + "  >" }}</el-button
        >
      </el-popover>

      <el-button
        v-for="item in cat.slice(0, 5)"
        :key="item.id"
        class="active_btn wai"
        type="text"
        @click="selectCat"
        >{{ item.name }}</el-button
      >
    </div>

    <!-- 内容 -->
    <el-row :gutter="20">
      <el-col v-for="item in musicListInfo" :key="item.id" :span="6">
        <div class="container_musicList">
          <!--播放量-->
          <div class="listening_bgc">
            <div style="float: right">
              <i class="el-icon-headset" style="margin-right: 5px"></i>
              {{
                item.playCount >= 10000
                  ? (item.playCount / 10000).toFixed(0) + "万"
                  : item.playCount
              }}
            </div>
          </div>
          <img
            style="cursor: pointer"
            @click="toSongListPage(item.id)"
            :src="item.coverImgUrl"
            alt=""
            class="list_img"
          />
          <h1
            style="cursor: pointer"
            @click="toSongListPage(item.id)"
            :title="item.name"
          >
            {{ item.name }}
          </h1>
        </div>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="5"
      @current-change="pagechange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 歌单分类
      cat: [],
      // 当前激活标签
      activeCat: '全部',
      // 分类按钮类型
      btnType: 'text',
      // 歌单列表
      musicListInfo: [],
      // 热门标签
      hotTags: [],
      // 展示歌单
      pageList: [],
      // 页面信息
      total: 5,
      pagenum: 1
    }
  },
  created () {
    this.getCatInfo()
    this.getMusicListInfo()
  },
  methods: {
    // 获取分类信息
    getCatInfo () {
      this.$http.get('/playlist/highquality/tags').then(res => {
        this.cat = res.data.tags
        this.cat.forEach(item => {
          if (!item.hot) {
            this.hotTags.push(item)
          }
        })
      })
    },

    // 跳转到歌单页面
    toSongListPage (id) {
      this.$router.push(`/songlist/${id}`)
    },

    // 选中歌单分类并更改激活标签
    selectCat (event) {
      this.activeCat = event.target.childNodes[0].data === '' ? event.target.childNodes[2].innerHTML : event.target.childNodes[0].data
      this.getMusicListInfo()
    },

    // 请求歌单
    getMusicListInfo () {

      let params = { params: { cat: this.activeCat, limit: 20 } }
      if (this.musicListInfo.length > 0) {
        params.before = this.musicListInfo[this.musicListInfo.length - 1].updateTime
      }
      this.$http.get('/top/playlist/highquality', params).then(res => {
        this.musicListInfo = res.data.playlists
        this.pagechange(this.musicListInfo)
        this.total = this.musicListInfo.length / 20
      })
    },

    // 换页事件
    pagechange (n) {
      this.pagenum = n
      let s = eval(20 * (n - 1))
      this.pageList = this.musicListInfo.slice(s, s + 20)
      if (n < this.total || n == 1) {
        this.pageList = this.musicListInfo.slice(s, s + 20)

      } else {
        return null
      }
    }
  },
  watch: {
  },
  mounted () {
  }
}
</script>

<style scoped>
.el-col .el-button {
  border-radius: 50%;
  color: black;
  padding: 0;
  margin: 12px auto;
  border: 0;
}
.active_btn {
  height: 30px;
  border-radius: 50px;
  line-height: 30px;
  padding: 0 15px;
  color: black;
}
.wai {
  padding: 0;
  margin: 0 15px;
  border: 0;
}
.container {
  width: 90%;
  margin: auto;
}
.list_img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: 0 0 3px #333;
}
h1 {
  font-size: 12px;
}
.el-divider {
  margin: 8px 0;
}
.container_musicList {
  position: relative;
  margin-top: 10px;
}
.listening_bgc {
  background: rgba(128, 128, 128, 0.2);
  color: white;
  width: 96%;
  position: absolute;
  z-index: 10;
  border-radius: 15px 15px 0 0;
}
</style>