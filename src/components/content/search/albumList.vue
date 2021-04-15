<template>
  <div>
    <el-table
      :data="listInfo.tracks"
      :show-header="false"
      @row-click="toSongList"
    >
      <el-table-column width="70">
        <template slot-scope="scope">
          <img :src="scope.row.coverImgUrl" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="name"> </el-table-column>
      <el-table-column prop="artist.name"> </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
export default {
  props: ['list'],
  data () {
    return {
      listInfo: []
    }
  },
  created () {
    this.listInfo = this.list
  },
  methods: {
    toSongList (el) {
      this.$router.push(`/album/${el.id}`)
    }
  },
  watch: {
    list (n) {
      if (n.tracks) {
        n.tracks.forEach(item => {
          if (!item.coverImgUrl) {
            item.coverImgUrl = item.picUrl
          }
          if (item.al) {
            item.coverImgUrl = item.img1v1Url
          }
        })
      }
      this.listInfo = n
    }
  }
}
</script>

<style scoped>
img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
}
</style>