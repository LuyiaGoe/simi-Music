<template>
  <div>
    <!-- 标签区域 -->
    <div
      style="display: flex; justify-content: space-between; margin-bottom: 15px"
    >
      <div>
        <el-popover
          class="pop"
          placement="bottom-start"
          width="650"
          trigger="click"
        >
          <el-row class="popheight">
            <el-col
              ><el-button type="text" disabled style="cursor: default"
                >全部视频</el-button
              ></el-col
            >
            <el-divider></el-divider>
            <el-col :span="4" v-for="(item, index) in groupList" :key="index">
              <el-button type="text" @click="getId(item.id)">{{
                item.name
              }}</el-button>
            </el-col>
          </el-row>
          <el-button slot="reference" round class="allVideos"
            >全部视频&nbsp;&nbsp;&nbsp;></el-button
          >
        </el-popover>
      </div>

      <!-- 分类区域 -->
      <div>
        <span v-for="item in catList" :key="item.id">
          <el-button type="text" @click="getId(item.id)">{{
            item.name
          }}</el-button>
          <el-divider direction="vertical" v-if="item.id !== 2100"></el-divider>
        </span>
      </div>
    </div>

    <!-- 内容区域 -->
    <div>
      <el-row :gutter="20">
        <el-col
          :span="6"
          v-for="(item, index) in videoList"
          style="margin-top: 20px; position: relative"
          :key="index"
        >
          <div style="position: relative">
            <!--播放量-->
            <div
              style="
                background: rgba(128, 128, 128, 0.2);
                color: white;
                width: 100%;
                position: absolute;
                z-index: 10;
              "
              class="videosection"
            >
              <div style="float: right">
                <i class="el-icon-headset" style="margin-right: 5px"></i>
                {{
                  item.data.playTime >= 10000
                    ? (item.data.playTime / 10000).toFixed(0) + "万"
                    : item.data.playTime
                }}
              </div>
            </div>
            <el-image
              :src="item.data.coverUrl"
              @click="toVideoPage(item.data.vid)"
              style="
                box-shadow: 0 0 2px 2px gray;
                border-radius: 10px;
                cursor: pointer;
              "
            >
            </el-image>
          </div>

          <h1
            @click="toVideoPage(item.data.vid)"
            style="cursor: pointer"
            class="title"
          >
            {{ item.data.title }}
          </h1>
        </el-col>
      </el-row>
      <el-button
        round
        icon="el-icon-caret-left"
        @click="changeOffset(-1)"
        v-if="offset"
      ></el-button>
      <el-button
        round
        icon="el-icon-caret-left"
        disabled
        class="videoRight"
        v-if="!offset"
      ></el-button>
      <el-button
        round
        icon="el-icon-caret-right"
        class="videoRight"
        @click="changeOffset(1)"
      ></el-button>
    </div>
  </div>
</template>

<script>

export default ({
  data () {
    return {
      // 视频标签清单
      groupList: [],
      // 视频分类清单
      catList: [],
      // 标签、分类id
      gcId: 58100,
      // 视频列表清单
      videoList: [],
      // 分页标签
      offset: 0
    }
  },
  created () {
    this.getVideoGroup()
    this.getVidoCat()
    this.getId()
  },
  methods: {
    // 获取视频标签列表
    getVideoGroup () {
      this.$http.get('/video/group/list').then(res => {
        this.groupList = res.data.data
      })
    },
    // 获取视频分类列表
    getVidoCat () {
      this.$http.get('/video/category/list').then(res => {
        this.catList = res.data.data
      })
    },
    // 通过视频分类或标签请求视频列表
    getId (num) {
      if (window.localStorage.getItem('currentUserInfo') === 'null') {
        return this.$message.error('需要登录获取视频数据!')
      }
      if (num) this.gcId = num
      this.$http.get(`/video/group?id=${this.gcId}`, { params: { offset: this.offset } }).then(res => {
        this.videoList = res.data.datas
      })
    },
    // 换页
    changeOffset (num) {
      this.offset += num
      this.getId()
    },
    // 跳转到mv播放
    toVideoPage (id) {
      this.$router.push(`/videoPlayPage/${id}`)
    }
  }
})
</script>

<style scoped>
.videosection {
  border-radius: 10px;
  overflow: hidden;
  right: 0;
}
.title {
  font-weight: 400;
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.popheight {
  margin-left: 8px;
  height: 400px;
  overflow-y: auto;
}
.allVideos {
  padding: 8px 18px !important;
}
.popheight .el-button {
  padding: 8px 0;
}
.el-divider--horizontal {
  margin: 8px 0;
}
.el-button {
  color: black;
}
</style>
