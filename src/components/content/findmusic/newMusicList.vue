<template>
  <div class="newMusicContainer">
    <!-- 切换按钮 -->
    <div class="btnGroup">
      <el-button
        type="info"
        round
        @click="changeType(0)"
        :class="[typeFlag ? 'is_active' : '', 'switch']"
        >新歌速递</el-button
      >
      <el-button
        type="info"
        round
        @click="changeType(1)"
        :class="[typeFlag ? '' : 'is_active', 'switch']"
        >最受欢迎</el-button
      >
    </div>

    <!-- 分类区域 -->
    <div>
      <span v-for="(item, index) in catInfo" :key="item.id">
        <el-button type="text" @click="changeTags(index)" class="catBtn">
          {{ item.name }}
        </el-button>
        <el-divider direction="vertical" v-if="item.id !== 16"></el-divider>
      </span>
    </div>

    <!-- 内容区域 -->
    <div>
      <el-table
        :data="newListInfo"
        stripe
        style="width: 100%"
        @row-click="addMuiceInList"
        :show-header="false"
      >
        <el-table-column type="index"> </el-table-column>
        <el-table-column width="75">
          <template slot-scope="scope">
            <img :src="scope.row.album.picUrl" alt="" class="albumPic" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="歌名"> </el-table-column>
        <el-table-column prop="artists[0].name" label="歌手"> </el-table-column>
        <el-table-column prop="album.name" label="专辑"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 切换flag
      typeFlag: true,
      // 列表信息
      newListInfo: [],
      // 参数信息
      catInfo: [
        { id: 0, name: '全部' },
        { id: 7, name: '华语' },
        { id: 96, name: '欧美' },
        { id: 8, name: '日本' },
        { id: 16, name: '韩国' }
      ],
      // 请求参数
      queryInfo: {
        type: 0
      },
      // 请求参数2
      queryInfo2: {
        limit: 50,
        offset: 0,
        area: 'ALL',
        type: 'new'
      }
    }
  },
  created () {
    this.getNewList()
  },
  methods: {
    // 获取最新音乐
    getNewList () {
      this.$http.get('/top/song', { params: this.queryInfo }).then(res => {
        this.newListInfo = res.data.data
      })
    },
    // 获取最热大碟
    getHotList () {
      this.$http.get('/top/album', { params: this.queryInfo2 }).then(res => {
        this.newListInfo = res.data.data
      }).catch(err => err)
    },
    // 切换类型
    changeType (num) {
      if (num) {
        this.typeFlag = false
        this.getHotList()
      } else {
        this.typeFlag = true
        this.getNewList()
      }
    },
    // 更改标签
    changeTags (index) {
      this.queryInfo.type = this.catInfo[index].id
      if (this.typeFlag) {
        this.getNewList()
      } else {
        this.getHotList()
      }
    },
    // 双击添加歌曲到歌单并播放
    addMuiceInList (event) {
      this.$store.commit('addPlayingList', { song: event, isPlay: true })
      this.$emit('play')
    }

  }
}
</script>

<style scoped>
.newMusicContainer {
  width: 90%;
  margin: auto;
}
.btnGroup {
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  border: 1px solid #909399;
  border-radius: 20px;
}
.switch {
  padding: 8px 23px !important;
}
.el-button + .el-button {
  margin: 0;
}
.el-button--info {
  color: #909399;
  background-color: white;
  border-color: white;
}
.switch:hover,
.switch:focus {
  color: black;
}
.el-button:hover {
  background-color: rgb(216, 213, 213);
  border-color: rgb(216, 213, 213);
}
.is_active {
  background-color: rgb(166, 169, 173);
  border-color: rgb(166, 169, 173);
  color: black;
}
.el-divider--vertical {
  margin: 0 12px;
}
.catBtn {
  color: black;
  padding: 0;
  padding: 8px 16px !important;
  margin: 12px 0;
}
.catBtn:hover {
  background-color: #fff;
  border: 1px solid white;
}
.albumPic {
  border-radius: 10px;
  width: 60px;
  height: 60px;
}
.el-table__row {
  padding: 0;
}
</style>