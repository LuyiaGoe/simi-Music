<template>
  <div>
    <el-table
      :data="listInfo.tracks"
      :show-header="false"
      @row-click="toSingerPage"
    >
      <el-table-column prop="coverImgUrl" width="70">
        <template slot-scope="scope">
          <img :src="scope.row.al.picUrl" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="ar[0].name"></el-table-column>
      <el-table-column> </el-table-column>
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
    toSingerPage (event) {
      this.$router.push(`/singer/${event.ar[0].id}`)
    }
  },
  watch: {
    list (n) {
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