<template>
  <div class="cloudContainer">
    <!-- 头部区域 -->
    <div class="head">
      <h2>我的音乐云盘</h2>
      <div class="cloudSizeContainer">
        <p>云盘容量:</p>
        <el-progress
          :percentage="
            cloudSize / maxcloudSize == 0
              ? 0
              : cloudSize / maxcloudSize <= 5
              ? 5
              : cloudSize / maxcloudSize
          "
          :format="format"
          class="progress"
        ></el-progress>
        <p>歌曲永久保存，随时随地永久畅听</p>
        <el-button type="text" class="kuorong">扩容</el-button>
      </div>

      <!-- 操作区 -->
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

      <!-- 搜索框 -->
      <el-input
        size="mini"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="searchInput"
        class="searchInput"
        width="50px"
        :clearable="true"
      >
      </el-input>
    </div>

    <!-- 歌曲清单 -->
    <div class="listArea">
      <el-table
        :data="cloudSongList"
        stripe
        style="width: 100%"
        @row-click="addMuiceInList"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column label="歌曲名字">
          <template slot-scope="scope">
            {{ scope.row.fileName.slice(0, -4) }}
          </template>
        </el-table-column>
        <el-table-column prop="artist" label="歌手"> </el-table-column>
        <el-table-column prop="album" label="专辑"> </el-table-column>
        <el-table-column label="专辑" width="80">
          <template slot-scope="scope">
            {{ (scope.row.simpleSong.dt / 1000) | timeFormat }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default ({
  data () {
    return {
      // 云盘歌曲列表
      cloudSongList: [],
      // 云盘容量
      cloudSize: '',
      maxcloudSize: '',
      // 搜索框
      searchInput: ''
    }
  },
  created () {
    this.getCloudMusic()
  },
  methods: {
    // 全部播放按钮，将歌单替换掉,并触发home的播放
    playAll () {
      this.$store.commit('switchPlayingList', this.cloudSongList)
      this.$emit('play')
    },
    // 添加全部，往歌单后面添加本歌单内容
    addAll () {
      this.$store.commit('addPlayingList', { list: this.cloudSongList, concat: true })
    },

    getCloudMusic () {
      this.$http.get('/user/cloud').then(res => {
        this.cloudSongList = res.data.data
        this.cloudSongList.map(item => {
          item.id = item.songId
        })
        this.cloudSize = res.data.size
        this.maxcloudSize = res.data.maxSize
      })
    },
    // 进度条文字内容
    format () {
      let max = this.maxcloudSize / 1024 / 1024 / 1024 / 10
      let nowsize = this.cloudSize / 1024 / 1024 / 1024 / 10
      max = max.toFixed(1)
      nowsize = nowsize.toFixed(1)
      return `${nowsize}G/${max}G`
    },
    // 双击添加歌曲到歌单并播放
    addMuiceInList (event) {
      this.$store.commit('addPlayingList', { song: event, isPlay: true })
      this.$emit('play')
    }

  }
})
</script>

<style scoped>
.cloudContainer {
  width: 95%;
  margin: 20px auto;
  position: relative;
  max-width: 1400px;
}
.el-progress {
  display: flex;
  width: 200px;
}
.el-progress-bar {
  display: inline-block;
  width: 200px;
}
p {
  margin: 0 15px;
}
.cloudSizeContainer {
  display: flex;
}
.progress {
  padding-top: 4px;
}
.kuorong {
  padding: 3px;
}
.playAll {
  margin-top: 10px;
  padding: 5px 6px 5px 10px;
  border-radius: 19px 0 0 19px;
  border-right: 1px solid white;
}
.addList {
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 0 19px 19px 0;
  margin-left: 0 !important;
  margin-top: 10px;
}
.head {
  top: 60px;
  z-index: 999;
  position: fixed;
  width: 1400px;
  padding-bottom: 15px;
  border-bottom: 1px solid gray;
  background-color: #fff;
}
.searchInput {
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 200px;
}
.listArea {
  padding-top: 140px;
}
</style>
