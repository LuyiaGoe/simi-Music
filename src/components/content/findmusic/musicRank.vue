<template>
  <div class="musicRankContainer">
    <!-- 官方榜 -->
    <div>
      <span><b>云音乐官方榜</b></span>
      <el-divider></el-divider>

      <!-- 内容区域 -->
      <el-row :gutter="20">
        <el-col
          :span="12"
          v-for="item in rankList.slice(0, 2)"
          :key="item.coverImgId"
        >
          <el-col :span="7">
            <div style="position: relative">
              <img
                :src="item.coverImgUrl"
                alt=""
                class="top_rank"
                @click="playAll(item.id)"
              />
              <div class="updateFrequency">{{ item.updateFrequency }}</div>
            </div>
          </el-col>
          <el-col :span="17">
            <el-table
              :data="item.tracks"
              stripe
              style="width: 100%"
              :show-header="false"
              @row-click="addMuiceInList"
            >
              <el-table-column type="index" height="100"></el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  {{
                    (scope.row.first + " - " + scope.row.second)
                      | nameStringFilter
                  }}
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-col>
        <el-col
          :span="12"
          v-for="item in rankList.slice(2, 4)"
          :key="item.coverImgId"
        >
          <div class="topRank_second_section">
            <el-col :span="7">
              <div style="position: relative">
                <img
                  :src="item.coverImgUrl"
                  alt=""
                  class="top_rank"
                  @click="playAll(item.id)"
                />
                <div class="updateFrequency">{{ item.updateFrequency }}</div>
              </div>
            </el-col>
            <el-col :span="17">
              <el-table
                :data="item.tracks"
                stripe
                style="width: 100%"
                :show-header="false"
              >
                <el-table-column type="index"></el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    {{
                      (scope.row.first + " - " + scope.row.second)
                        | nameStringFilter
                    }}
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 全球榜 -->
    <div class="globalRank">
      <span><b>全球榜</b></span>
      <el-divider></el-divider>

      <!-- 内容区域 -->
      <el-row :gutter="20">
        <el-col v-for="item in rankList.slice(4)" :key="item.id" :span="4">
          <img
            @click="toSongListPage(item.id)"
            style="cursor: pointer"
            :src="item.coverImgUrl"
            alt=""
            class="list_img"
          />
          <h1
            @click="toSongListPage(item.id)"
            style="cursor: pointer"
            :title="item.name"
          >
            {{ item.name | nameStringFilter }}
          </h1>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 排行榜信息
      rankList: []
    }
  },
  methods: {
    // 查找歌单排行榜页面
    getRankList () {
      this.$http.get('/toplist/detail').then(res => {
        this.rankList = res.data.list
      })
    },

    // 跳转到歌单页面
    toSongListPage (id) {
      this.$router.push(`/songlist/${id}`)
    },

    // 播放歌单
    playAll (id) {
      this.$http.get(`/playlist/detail?id=${id}`).then(res => {
        this.$store.commit('switchPlayingList', res.data.playlist.tracks)
        this.$emit('play')
      })
    },

    // 播放歌曲
    addMuiceInList (event) {
      let song = {}
      this.rankList.some(item => {
        item.tracks.some((item1, i) => {
          if (item1.first == event.first) {
            this.$http.get(`/playlist/detail?id=${item.id}`).then(res => {
              song = res.data.playlist.tracks[i]
              this.$store.commit('addPlayingList', { song: song, isPlay: true })
            })
            return
          }
        })
      })
      this.$emit('play')
    }
  },
  created () {
    this.getRankList()
  },
  filters: {
    nameStringFilter (str) {
      return str.length >= 30 ? str.substring(0, 27) + '……' : str
    }
  }
}
</script>

<style scoped>
.musicRankContainer {
  width: 90%;
  margin: auto;
}
.el-divider--horizontal {
  margin-top: 8px;
}
.topRank_second_section {
  margin-top: 24px;
}
.el-col {
  position: relative;
}
.el-table__body {
  height: 100%;
}
.updateFrequency {
  width: 100%;
  height: 30px;
  text-indent: 10px;
  font-size: 15px;
  line-height: 30px;
  color: white;
  position: absolute;
  bottom: 00px;
  /* left: 14px; */
  background-image: linear-gradient(transparent, #000);
}
.el-table {
  font-size: 5px;
}
.top_rank {
  width: 100%;
}
.index_column {
  color: red;
}

.globalRank {
  margin-top: 30px;
}

.list_img {
  width: 100%;
}
h1 {
  margin: 0 0 12px 0;
  font-size: 12px;
  font-weight: 500;
}
</style>