<template>
  <div class="diyCommand">
    <!-- 轮播图区域 -->
    <el-carousel :interval="3000" type="card" height="200px">
      <el-carousel-item v-for="(item, i) in bannerInfo" :key="i">
        <img :src="item.imageUrl" alt="" />
        <el-tag
          effect="dark"
          class="carousel_tag"
          :type="item.typeTitle === '独家策划' ? 'danger' : 'primary'"
          >{{ item.typeTitle }}</el-tag
        >
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单区域 -->
    <div>
      <span><b>推荐歌单</b></span>
      <el-divider></el-divider>

      <!-- 内容区域 -->
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in musicListInfo" :key="item.coverImgId">
          <div class="container_musicList">
            <!--播放量-->
            <div class="listening_bgc">
              <div style="float: right">
                <i class="el-icon-headset" style="margin-right: 5px"></i>
                {{
                  item.playCount >= 10000
                    ? (item.playCount / 10000).toFixed(0) + "万"
                    : item.playCount
                }}
              </div>
            </div>
            <img
              :src="item.coverImgUrl"
              @click="toSongListPage(item.id)"
              alt=""
              style="cursor: pointer"
            />
            <h1
              style="cursor: pointer"
              :title="item.name"
              @click="toSongListPage(item.id)"
            >
              {{
                item.name.toString().length >= 30
                  ? item.name.toString().substring(0, 27) + "···"
                  : item.name
              }}
            </h1>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 独家放送区域 -->
    <div>
      <span><b>独家放送</b></span>
      <el-divider></el-divider>

      <!-- 内容区域 -->
      <el-row :gutter="40">
        <el-col
          :span="8"
          v-for="item in privateListInfo"
          :key="item.coverImgId"
        >
          <div class="container_musicList">
            <img
              :src="item.sPicUrl"
              alt=""
              @click="toMvPage(item.id)"
              style="cursor: pointer"
            />
            <h1
              @click="toMvPage(item.id)"
              style="cursor: pointer; text-align: center"
            >
              {{ item.name }}
            </h1>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 最新音乐区域 -->
    <div>
      <span><b>最新音乐</b></span>
      <el-divider></el-divider>

      <!-- 内容区域 -->
      <el-row>
        <el-col :span="12">
          <el-table
            :data="newMusicList.slice(0, 5)"
            :show-header="false"
            stripe
            style="width: 100%"
            @row-click="addMuiceInList"
          >
            <el-table-column type="index"> </el-table-column>
            <el-table-column prop="coverImgUrl" width="100">
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" alt="" class="newmusic_pic" />
              </template>
            </el-table-column>
            <el-table-column prop="name">
              <template slot-scope="scope">
                <p>{{ scope.row.name }}</p>
                <p class="singer">
                  {{ scope.row.song.artists[0].name + " - " + scope.row.name }}
                </p>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            :data="newMusicList.slice(5)"
            :show-header="false"
            stripe
            style="width: 100%"
            @row-click="addMuiceInList"
          >
            <el-table-column type="index"> </el-table-column>
            <el-table-column prop="coverImgUrl" width="100">
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" alt="" class="newmusic_pic" />
              </template>
            </el-table-column>
            <el-table-column prop="name">
              <template slot-scope="scope">
                <p>{{ scope.row.name }}</p>
                <p class="singer">
                  {{ scope.row.song.artists[0].name + " - " + scope.row.name }}
                </p>
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
  data () {
    return {
      // 轮播图
      bannerInfo: [],
      // 推荐歌单信息
      musicListInfo: [],
      // 独家放送页
      privateListInfo: [],
      // 获取最新歌曲
      newMusicList: []
    }

  },
  created () {
    this.getbannerInfo()
    this.getMusicListInfo()
    this.getprivateListInfo()
    this.getNewMusicList()
  },
  methods: {
    // 获取轮播图信息
    getbannerInfo () {
      this.$http.get('banner').then(res => {
        this.bannerInfo = res.data.banners
      })
    },

    // 获取推荐歌单信息
    getMusicListInfo () {
      // 取出16个歌单
      this.$http.get('/top/playlist', {
        params: {
          offset: (Math.random() * 233).toFixed(0),
          limit: 16
        }
      }).then(res => {
        this.musicListInfo = res.data.playlists;
      })
    },

    // 获取独家播放信息
    getprivateListInfo () {
      this.$http.get('/personalized/privatecontent').then(res => {
        this.privateListInfo = res.data.result
      })
    },

    //推荐最新音乐
    getNewMusicList () {
      this.$http.get('personalized/newsong').then(res => {
        this.newMusicList = res.data.result
      })
    },

    // 双击添加歌曲到歌单并播放
    addMuiceInList (event) {
      this.$store.commit('addPlayingList', { song: event, isPlay: true })
      this.$emit('play')
    },

    // 跳转到歌单页面
    toSongListPage (id) {
      this.$router.push(`/songlist/${id}`)
    },

    // 跳转到mv页面
    toMvPage (id) {
      this.$router.push(`/videoPlayPage/${id}`)
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel {
  margin-bottom: 15px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  border-radius: 15px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  border-radius: 15px;
}

.el-carousel-item {
  position: relative;
}
.el-carousel-item img {
  width: 100% !important;
  height: 100%;
}
.carousel_tag {
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 15px 0 0 0;
}
.diyCommand {
  width: 80%;
  margin: auto;
}

.container_musicList {
  margin-bottom: 25px;
  position: relative;
}
.container_musicList img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: 0 0 3px #333;
}
h1 {
  font-size: 12px;
}

.newmusic_pic {
  height: 80px;
}
.singer {
  color: grey;
  font-size: 12px;
}
.listening_bgc {
  background: rgba(128, 128, 128, 0.2);
  color: white;
  width: 96%;
  position: absolute;
  z-index: 10;
  border-radius: 15px 15px 0 0;
}
</style>