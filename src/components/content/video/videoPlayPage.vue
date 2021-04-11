<template>
  <div class="container">
    <el-row :gutter="10">
      <!-- 左侧视频、详情、评论 -->
      <el-col :span="16">
        <!-- 返回上一页 -->
        <el-col :span="1">
          <p
            style="text-align: right; line-height: 21px; cursor: pointer"
            @click="goback"
          >
            &lt;&nbsp;&nbsp;
          </p>
        </el-col>
        <el-col :span="3">
          <p style="cursor: pointer" @click="goback" v-if="mvflag">MV详情</p>
          <p style="cursor: pointer" @click="goback" v-else>视频详情</p>
        </el-col>

        <!-- 视频区域 -->
        <el-col>
          <video width="100%" :src="mvpath" controls="controls"></video>
        </el-col>

        <!-- 视频信息区域 -->
        <el-col>
          <!-- 头像、歌手 -->
          <el-col class="topandbottomPadding12">
            <!-- <img
              :src="videoInfo.data.artists[0].img1v1Url"
              alt=""
              class="avaimg"
            /> -->
            {{ videoInfo.data.artistName }}
          </el-col>

          <!-- 日期 -->
          <el-col class="topandbottomPadding12 data_playCount">
            <el-col :span="4">{{
              "发布:" + videoInfo.data.publishTime
            }}</el-col>
            <el-col :span="4">{{
              "播放次数:" + videoInfo.data.playCount
            }}</el-col>
          </el-col>

          <!-- 按钮 -->
          <el-col class="topandbottomPadding12">
            <el-button round icon="el-icon-folder-add">{{
              "收藏(" + videoInfo.data.subCount + ")"
            }}</el-button>
            <el-button round icon="el-icon-connection">{{
              "分享(" + videoInfo.data.shareCount + ")"
            }}</el-button>
          </el-col>

          <!-- 评论 -->
          <el-col class="data_playCount">
            <p class="data_playCount">
              <strong>评论</strong> ({{ videoInfo.data.commentCount }})
            </p>

            <!-- 评论区域 -->
            <div v-if="hotComments.length !== 0">
              <h5>最热评论:</h5>
              <div>
                <el-row>
                  <el-col
                    v-for="(item, index) in hotComments"
                    :key="index"
                    class="commentSection"
                  >
                    <el-col :span="1">
                      <img :src="item.user.avatarUrl" alt="" class="avatar" />
                    </el-col>
                    <el-col :span="23" class="commentInner">
                      <el-col>{{
                        item.user.nickname + ":" + item.content
                      }}</el-col>
                      <el-col
                        v-if="item.beReplied.length !== 0"
                        class="repely"
                        >{{
                          "@" +
                          item.beReplied[0].user.nickname +
                          ":" +
                          item.beReplied[0].content
                        }}</el-col
                      >
                      <el-col>
                        <el-col :span="5">{{ item.time | dateFormat }}</el-col>
                        <el-col :span="5" style="float: right">
                          <el-button icon="el-icon-thumb"></el-button>
                          <el-divider direction="vertical"></el-divider>
                          <el-button icon="el-icon-chat-dot-round"></el-button>
                          <el-divider direction="vertical"></el-divider>
                          <el-button icon="el-icon-collection-tag"></el-button>
                        </el-col>
                      </el-col>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
            </div>

            <h5>最新评论:</h5>
            <!-- 评论区域 -->
            <div>
              <el-row>
                <el-col
                  v-for="(item, index) in commentInfo"
                  :key="index"
                  class="commentSection"
                >
                  <el-col :span="1">
                    <img :src="item.user.avatarUrl" alt="" class="avatar" />
                  </el-col>
                  <el-col :span="23" class="commentInner">
                    <el-col>{{
                      item.user.nickname + ":" + item.content
                    }}</el-col>
                    <el-col v-if="item.beReplied.length !== 0" class="repely">{{
                      "@" +
                      item.beReplied[0].user.nickname +
                      ":" +
                      item.beReplied[0].content
                    }}</el-col>
                    <el-col>
                      <el-col :span="5">{{ item.time | dateFormat }}</el-col>
                      <el-col :span="5" style="float: right">
                        <el-button icon="el-icon-thumb"></el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button icon="el-icon-chat-dot-round"></el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button icon="el-icon-collection-tag"></el-button>
                      </el-col>
                    </el-col>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-col>
      </el-col>

      <!-- 右侧相关推荐 -->
      <el-col :span="8">
        <p>相关推荐</p>

        <!-- 内容区域 -->
        <el-col
          v-for="item in simiMv"
          :key="item.id"
          style="margin-top: 5px"
          class="simi"
        >
          <el-col v-if="mvflag">
            <el-col :span="11">
              <img
                :src="item.cover"
                alt=""
                width="100%"
                style="border-radius: 5px; cursor: pointer"
                @click="toVideoPage(item.id)"
              />
            </el-col>
            <el-col :span="13">
              <p class="name" @click="toVideoPage(item.id)">
                {{ item.name }}
              </p>
              <p>{{ item.artistName }}</p>
            </el-col>
          </el-col>
          <el-col v-else>
            <el-col :span="11">
              <img
                :src="item.coverUrl"
                alt=""
                width="100%"
                style="border-radius: 5px; cursor: pointer"
                @click="toVideoPage(item.vid)"
              />
            </el-col>
            <el-col :span="13">
              <p class="name" @click="toVideoPage(item.vid)">
                {{ item.title }}
              </p>
              <p>{{ item.creator[0].userName }}</p>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 视频信息
      videoInfo: {},
      commentInfo: [],
      hotComments: [],
      // mv播放地址
      mvpath: '',
      // 推荐mv
      simiMv: [],
      mvflag: true
    }
  },
  created () {
    if (this.$route.params.id.length == 8) {// 长度为8则是mv的id
      this.mvflag = true
    } else {
      this.mvflag = false
    }
    this.getVideo()
    this.getComment()
    this.getMvPath()
    this.getsimilarMv()
  },
  methods: {
    // 返回上一级
    goback () {
      history.back()
    },
    // 获得视频
    getVideo () {
      if (this.mvflag) {
        this.$http.get(`/mv/detail?mvid=${this.$route.params.id}`).then(res => {
          this.videoInfo = res.data
        })
      } else {
        this.$http.get(`/video/detail?id=${this.$route.params.id}`).then(res => {
          this.videoInfo = res.data
        })
      }
    },
    // 评论信息
    getComment () {
      let path = ''
      if (this.mvflag) {
        path = '/comment/mv'
      } else {
        path = '/comment/video'
      }
      this.$http.get(path, { params: { id: this.$route.params.id, limit: 50 } }).then(res => {
        this.commentInfo = res.data.comments
        this.hotComments = res.data.hotComments
      })
    },
    // mv/video播放地址
    getMvPath () {
      if (this.mvflag) {
        this.$http.get(`/mv/url?id=${this.$route.params.id}`).then(res => {
          this.mvpath = res.data.data.url
        })
      } else {
        this.$http.get(`/video/url?id=${this.$route.params.id}`).then(res => {
          this.mvpath = res.data.urls[0].url
        })
      }
    },
    // 相似mv
    getsimilarMv () {
      let path = ''
      let docPath = void 0
      if (this.mvflag) {
        path = `/simi/mv?mvid=${this.$route.params.id}`
        docPath = 'res.data.mvs'
      } else {
        path = `/related/allvideo?id=${this.$route.params.id}`
        docPath = 'res.data.data'
      }
      this.$http.get(path).then(res => {
        path = res
        this.simiMv = eval(docPath)
      })
    },
    // 跳转播放
    toVideoPage (id) {
      this.$router.push(`/videoPlayPage/${id}`)
    }
  }
}
</script>

<style scoped>
.simi p {
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.simi .name {
  color: black;
  font-weight: 800;
  cursor: pointer;
}
.container {
  max-width: 1400px;
  width: 95%;
  margin: 15px auto;
}
.avaimg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 15px;
}
.data_playCount {
  color: gray;
  font-size: 10px;
}
.topandbottomPadding12 {
  margin: 12px auto 0;
}
strong {
  font-size: 20px;
  font-weight: 800;
  color: #000;
}
.avatar {
  padding-top: 7px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.commentSection {
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(150, 150, 153);
  font-size: 13px;
}
.repely {
  padding: 5px 0;
  background-color: rgb(216, 216, 219);
  text-indent: 1em;
}
.commentInner .el-col {
  padding: 5px 0;
}
.el-col-5 {
  width: auto;
}
.el-button {
  padding: 0;
  border: 0;
}
.el-button:focus,
.el-button:hover {
  color: black;
}
h5 {
  margin-bottom: 0;
}
.topandbottomPadding12 .el-button {
  padding: 5px 18px;
  border: 1px solid rgb(212, 212, 212);
}
.video {
  width: 100%;
}
</style>