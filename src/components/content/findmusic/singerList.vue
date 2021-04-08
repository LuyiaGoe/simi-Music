<template>
  <div class="SingerListContainer">
    <!-- 歌手分类选择区域 -->
    <div class="cate">
      <div>
        <span class="catName">语种：</span>
        <span v-for="item in singerType" :key="item.id">
          <el-button type="text" class="danger" @click="changeType(item.id)">
            {{ item.name }}
          </el-button>
          <el-divider direction="vertical" v-if="item.id !== 3"></el-divider>
        </span>
      </div>
      <div>
        <span class="catName">分类：</span>
        <span v-for="item in singerLanguage" :key="item.id">
          <el-button type="text" class="danger" @click="changeArea(item.id)">
            {{ item.name }}
          </el-button>
          <el-divider direction="vertical" v-if="item.id !== 0"></el-divider>
        </span>
      </div>
      <div>
        <span class="catName">筛选：</span>
        <span v-for="item in firstLetter" :key="item.id">
          <el-button type="text" class="danger" @click="changeinitial(item.id)">
            {{ item.name }}
          </el-button>
          <el-divider direction="vertical" v-if="item.id !== 0"></el-divider>
        </span>
      </div>
      <el-divider class="fengexian"></el-divider>
    </div>

    <!-- 内容区域 -->
    <el-row :gutter="20">
      <el-col v-for="item in artList" :key="item.img1v1Id" :span="4">
        <div class="container_musicList">
          <img :src="item.img1v1Url" alt="" class="list_img" />
          <h1 style="cursor: pointer" :title="item.name">
            {{ item.name }}
          </h1>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 歌手列表
      artList: [],
      //歌手类型分类标签
      singerType: [
        { id: -1, name: '全部' },
        { id: 1, name: '男歌手' },
        { id: 2, name: '女歌手' },
        { id: 3, name: '乐队' }
      ],
      //歌手语种分类
      singerLanguage: [
        { id: -1, name: '全部' },
        { id: 7, name: '华语' },
        { id: 96, name: '欧美' },
        { id: 8, name: '日本' },
        { id: 16, name: '韩国' },
        { id: 0, name: '其他' }
      ],
      // 按首字母
      firstLetter: [
        { id: -1, name: '热门' },
        { id: 'a', name: 'a' }, { id: 'b', name: 'b' }, { id: 'c', name: 'c' }, { id: 'd', name: 'd' }, { id: 'e', name: 'e' },
        { id: 'f', name: 'f' }, { id: 'g', name: 'g' }, { id: 'h', name: 'h' }, { id: 'i', name: 'i' }, { id: 'j', name: 'j' },
        { id: 'k', name: 'k' }, { id: 'l', name: 'l' }, { id: 'm', name: 'm' }, { id: 'n', name: 'n' }, { id: 'o', name: 'o' },
        { id: 'p', name: 'p' }, { id: 'q', name: 'q' }, { id: 'r', name: 'r' }, { id: 's', name: 's' }, { id: 't', name: 't' },
        { id: 'u', name: 'u' }, { id: 'v', name: 'v' }, { id: 'w', name: 'w' }, { id: 'x', name: 'x' }, { id: 'y', name: 'y' },
        { id: 'z', name: 'z' }, { id: 0, name: '#' }
      ],
      // 查询歌手
      queryInfo: {
        // 激活歌手类型id
        type: -1,
        // 激活语种类型id
        area: -1,
        initial: -1
      }

    }
  },
  created () {
    this.getArtistList()
  },
  methods: {
    // 获取歌手列表
    getArtistList () {
      this.$http.get('/artist/list', { params: this.queryInfo }).then(res => {
        this.artList = res.data.artists
      })
    },
    // 更改歌手类型
    changeType (id) {
      this.queryInfo.type = id
      this.getArtistList()
    },
    // 更改语种类型
    changeArea (id) {
      this.queryInfo.area = id
      this.getArtistList()
    },
    // 更改首字母
    changeinitial (id) {
      this.queryInfo.initial = id
      this.getArtistList()
    }
  }
}
</script>

<style scoped>
.SingerListContainer {
  width: 90%;
  margin: auto;
}
.cate {
  font-size: 14px;
}
.catName {
  margin-right: 24px;
  cursor: default;
}
.el-button {
  color: black;
}
.el-divider--vertical {
  margin: 0 12px;
}
.fengexian {
  margin-top: 8px;
}
.list_img {
  width: 100%;
}
h1 {
  font-size: 8px;
  margin: 6px 0 24px;
}
.el-button {
  padding: 0;
  margin: 12px 0;
}
</style>