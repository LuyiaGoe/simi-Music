<template>
  <div>
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
              <el-col>{{ item.user.nickname + ":" + item.content }}</el-col>
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
            <el-col>{{ item.user.nickname + ":" + item.content }}</el-col>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentInfo: [],
      hotComments: []
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    getComment () {
      this.$http.get('/comment/playlist', { params: { id: this.$route.params.id } }).then(res => {
        this.commentInfo = res.data.comments
        this.hotComments = res.data.hotComments
      })
    }
  }
}
</script>

<style scoped>
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
  padding: 0 !important;
  border: 0 !important;
}
.el-button:focus,
.el-button:hover {
  color: black;
}
h5 {
  margin-bottom: 0;
}
</style>