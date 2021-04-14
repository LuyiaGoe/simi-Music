<template>
  <div>
    <!-- hot50 -->
    <el-row :gutter="20">
      <el-col :span="4">
        <img src="../../../..\public\imgs\top50.png" alt="" />
      </el-col>
      <el-col :span="20">
        <el-col><h3>热门50首</h3></el-col>
        <el-table
          :data="hotList"
          stripe
          style="width: 100%"
          :show-header="false"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name"> </el-table-column>
          <el-table-column width="80">
            <template slot-scope="scope">
              {{ (scope.row.dt / 1000) | timeFormat }}
            </template>
          </el-table-column>
        </el-table>
        <p v-if="showAll" class="showAll" @click="displayAll">
          查看全部{{ hot50.length }}首
        </p>
      </el-col>
    </el-row>

    <!-- 其他专辑 -->
    <div v-for="(item, index) in singerAlbum" :key="index" class="albumDiv">
      <el-row :gutter="20">
        <el-col :span="4">
          <img :src="item.picUrl" alt="" />
        </el-col>
        <el-col :span="20">
          <el-col
            ><h3>{{ item.name }}</h3></el-col
          >
          <el-table
            :data="item.songs"
            stripe
            style="width: 100%"
            :show-header="false"
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name"> </el-table-column>
            <el-table-column width="80">
              <template slot-scope="scope">
                {{ (scope.row.dt / 1000) | timeFormat }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hot50', 'album'],
  data () {
    return {
      // 热门歌曲
      hotList: [],
      showAll: true,
      // 专辑
      singerAlbum: []
    }
  },
  created () {
    this.hotList = this.hot50.slice(0, 10)
    this.singerAlbum = this.album
  },
  methods: {
    // 展示全部
    displayAll () {
      this.hotList = this.hot50
      this.showAll = false
    }
  },
  watch: {
    hot50 (n) {
      this.hotList = n.slice(0, 10)
      this.showAll = true
    },
    album (n) {
      this.singerAlbum = n
    }
  }
}
</script>

<style scoped>
.showAll {
  cursor: pointer;
  text-align: right;
}
img {
  width: 100%;
}
.el-table__row {
  height: 35px;
}
.albumDiv {
  margin-bottom: 50px;
}
</style>