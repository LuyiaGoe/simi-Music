<template>
  <div>
    <!-- 最新mv -->
    <div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 0px;
        "
      >
        <div>
          <p>最新MV</p>
        </div>
        <!-- 分类区域 -->
        <div>
          <span v-for="(item, index) in mvArea" :key="index">
            <el-button type="text" @click="getArea(item.name)">{{
              item.name == "" ? "全部" : item.name
            }}</el-button>
            <el-divider
              direction="vertical"
              v-if="item.id !== 2100"
            ></el-divider>
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
            <div style="position: relative" class="imgcontainer">
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
                    item.playCount >= 10000
                      ? (item.playCount / 10000).toFixed(0) + "万"
                      : item.playCount
                  }}
                </div>
              </div>
              <el-image
                :src="item.cover"
                @click="toVideoPage(item.id)"
                style="
                  box-shadow: 0 0 2px 2px gray;
                  border-radius: 10px;
                  cursor: pointer;
                "
              >
              </el-image>
            </div>

            <h1
              @click="toVideoPage(item.id)"
              style="cursor: pointer"
              class="title"
            >
              {{ item.name }}
            </h1>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 网易出品 -->
    <div>
      <div
        style="display: flex; justify-content: space-between; margin-top: 10px"
      >
        <div>
          <p>网易出品</p>
        </div>
      </div>

      <!-- 内容区域 -->
      <div>
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-for="(item, index) in hotvideoList"
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
                    item.playCount >= 10000
                      ? (item.playCount / 10000).toFixed(0) + "万"
                      : item.playCount
                  }}
                </div>
              </div>
              <el-image
                :src="item.cover"
                @click="toVideoPage(item.id)"
                style="
                  box-shadow: 0 0 2px 2px gray;
                  border-radius: 10px;
                  cursor: pointer;
                "
              >
              </el-image>
            </div>

            <h1
              @click="toVideoPage(item.id)"
              style="cursor: pointer"
              class="title"
            >
              {{ item.name }}
            </h1>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

export default ({
  data () {
    return {
      // 最新mv地区清单
      mvArea: [
        { name: '' },
        { name: '内地' },
        { name: '港台' },
        { name: '欧美' },
        { name: '日本' },
        { name: '韩国' }
      ],
      // 地区选择
      area: '',
      // 标签、分类id
      gcId: 58100,
      // 最新mv列表清单
      videoList: [],
      // 网易出品列表清单
      hotvideoList: [],
      // 分页标签
      offset: 0
    }
  },
  created () {
    this.getVideoGroup()
    this.getVidoCat()
    this.getArea()
    this.gethotvideo()
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
    getArea (name) {
      if (window.localStorage.getItem('currentUserInfo') === 'null') {
        return this.$message.error('需要登录获取视频数据!')
      }
      this.area = name
      this.$http.get(`/mv/first?limit=8`, { params: { area: this.area } }).then(res => {
        this.videoList = res.data.data
      })
    },
    // 获取网易mv
    gethotvideo () {
      this.$http.get(`/mv/exclusive/rcmd?limit=8`).then(res => {
        this.hotvideoList = res.data.data
        console.log(res)
        console.log(this.hotvideoList);
      })
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
.imgcontainer {
  width: 100%;
  height: 80%;
}
.el-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
