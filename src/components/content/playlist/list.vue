<template>
  <div>
    <el-table
      :data="playDetails"
      stripe
      style="width: 100%"
      @row-dblclick="addMuiceInList"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="音乐标题" class="textNoWrap">
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手"> </el-table-column>
      <el-table-column prop="al.name" label="专辑" class="textNoWrap">
      </el-table-column>
      <el-table-column label="时长" width="60">
        <template slot-scope="scope">
          {{ Math.floor(scope.row.dt / 1000) | timeFormat }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playDetails: [],
    }
  },
  created () {
    this.getListDet()
  },
  methods: {
    // 获取到列表详情，即歌单
    getListDet () {
      this.$http.get('/playlist/detail', { params: { id: this.$route.params.id } }).then(res => {
        let songsId = []
        res.data.playlist.trackIds.map(item => songsId.push(item.id))
        this.$http.get(`/song/detail?ids=${songsId}`).then(res => {
          this.playDetails = res.data.songs
          this.passDetail()
        })
      }).catch(err => err)
    },

    // 触发父组件的事件playingList，并传递歌单
    passDetail () {
      this.$emit('playingList', this.playDetails)
    },

    // 双击添加歌曲到歌单并播放
    addMuiceInList (event) {
      this.$store.commit('addPlayingList', { song: event, isPlay: true })
      this.$emit('playingList', this.playDetails)
    }
  }
}
</script>

<style scoped>
</style>