<template>
  <div>
    <el-table
      :data="playDetails"
      stripe
      style="width: 100%"
      @row-click="addMuiceInList"
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
  props: ['songlist'],
  data () {
    return {
      playDetails: [],
    }
  },
  created () {
    this.playDetails = this.songlist
  },
  methods: {
    // 添加歌曲到歌单并播放
    addMuiceInList (event) {
      this.$store.commit('addPlayingList', { song: event, isPlay: true })
      this.$emit('playingList')
    }
  },
  watch: {
    songlist (n) {
      this.playDetails = n.tracks
    }
  }
}
</script>

<style scoped>
</style>