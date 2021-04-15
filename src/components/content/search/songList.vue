<template>
  <div>
    <el-table
      :data="listInfo.tracks"
      :show-header="false"
      @row-click="toSongListPage"
    >
      <el-table-column width="70">
        <template slot-scope="scope">
          <img :src="scope.row.coverImgUrl" alt="" />
        </template>
      </el-table-column>
      <el-table-column width="280" prop="name"> </el-table-column>
      <el-table-column>
        <template slot-scope="scope"> {{ scope.row.trackCount }}首 </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <span class="by">by</span>{{ scope.row.creator.nickname }}
        </template>
      </el-table-column>
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
    if (this.listInfo.tracks) {
      this.listInfo.tracks.forEach(item => {
        if (!item.coverImgUrl) {
          item.coverImgUrl = item.picUrl
        }
        if (item.alll) {
          item.coverImgUrl = item.al.picUrl
        }
      })
    }
  },
  methods: {
    toSongListPage (item) {
      this.$router.push(`/songlist/${item.id}`)
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
.by {
  color: gray;
  font-size: 11px;
  margin-right: 5px;
}
</style>