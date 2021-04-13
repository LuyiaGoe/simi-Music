<template>
  <div id="index">
    <el-container class="home">
      <!-- 头部区域 -->
      <el-header>
        <!-- logo区域 -->
        <div class="logo" @click="backHome">
          <img src="../..\public\imgs\logo.png" alt="" />
          <span class="logoText">网一云音乐</span>
        </div>

        <!-- 搜索区域 -->
        <div class="search">
          <el-input
            placeholder="搜索单曲,歌手,视频,歌单"
            size="mini"
            v-model="searchInput"
            prefix-icon="el-icon-search"
          >
            <el-button slot="suffix" class="searchBtn" size="mini"></el-button>
          </el-input>
        </div>

        <!-- 登陆区域 -->
        <div class="login">
          <div v-if="currentUserInfo == null ? true : false">
            <img
              src="../..\public\imgs\userIcon.png"
              class="userIcon_unlogin"
              @click="loginDialog"
            />
            <el-tag
              effect="plain"
              @click="loginDialogVisible = true"
              class="logina"
              >登录</el-tag
            >
          </div>
          <div v-else class="logined">
            <img
              :src="currentUserInfo.avatarUrl"
              class="userIcon_unlogin"
              @click="loginDialog"
            />
            <span class="nickname">{{ currentUserInfo.nickname }}</span>
            <el-button
              type="danger"
              size="mini"
              @click="logout"
              class="logoutBtn"
              >退出</el-button
            >
          </div>
          <div>
            <a
              href="https://gitee.com/LuyiaGoe/imitating-netease-cloud"
              style="margin-left: 10px"
              target="_blank"
            >
              <img src="../../public/imgs/gitee.png" alt="" />
            </a>
            <a
              href="https://github.com/LuyiaGoe/simi-Music"
              style="margin-left: 10px"
              target="_blank"
            >
              <img src="../../public/imgs/github.png" alt="" />
            </a>
          </div>
        </div>
      </el-header>

      <!-- 中间区域 -->
      <div class="shuiping">
        <!-- 侧边栏区域 -->
        <el-aside width="200px">
          <el-menu
            default-active="/findMusic"
            :router="true"
            active-text-color="black"
          >
            <el-menu-item-group>
              <template slot="title">推荐</template>
              <el-menu-item index="/findMusic">发现音乐</el-menu-item>
              <el-menu-item index="/videoPage">视频</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">我的音乐</template>
              <el-menu-item index="/cloudMusic">我的音乐云盘</el-menu-item>
            </el-menu-item-group>

            <el-submenu index="1">
              <template slot="title">创建的歌单</template>
              <el-menu-item-group>
                <span v-for="(item, index) in currentUserPlayList" :key="index">
                  <el-menu-item
                    v-if="
                      item.creator.avatarImgId == currentUserInfo.avatarImgId
                    "
                    :index="'/songlist/' + item.id"
                  >
                    {{ item.name }}
                  </el-menu-item>
                </span>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">收藏的歌单</template>
              <el-menu-item-group>
                <span v-for="(item, index) in currentUserPlayList" :key="index">
                  <el-menu-item
                    v-if="
                      item.creator.avatarImgId !== currentUserInfo.avatarImgId
                    "
                    :index="'/songlist/' + item.id"
                  >
                    {{ item.name }}
                  </el-menu-item>
                </span>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 主体区域 -->
        <el-main>
          <!-- play事件用于子组件（歌单页面的playAll触发）触发播放 -->
          <router-view :key="$route.path" @play="getSongDetail"></router-view>
        </el-main>
      </div>

      <!-- 底部区域 -->
      <el-footer>
        <!-- 歌曲信息 -->
        <div class="musicPic">
          <img :src="music.al.picUrl" alt="" v-if="music.al.picUrl" />
          <img src="../..\public\imgs\logo.png" v-else alt="" />
          <div>
            <p>{{ music.name }}</p>
            <p>
              {{ music.ar[0].name }}
            </p>
          </div>
        </div>

        <!-- 进度条组件 -->
        <div>
          <!-- 上一首 播放/暂停 下一首控件 -->
          <div class="playitems">
            <img
              src="../..\public\imgs\prev.png"
              alt=""
              style="border-radius: 100%; cursor: pointer"
              @click="switchMusic(-1)"
            />

            <img
              v-if="isPlay"
              src="../..\public\imgs\pauseMusic.png"
              alt=""
              style="
                border-radius: 100%;
                cursor: pointer;
                margin-left: 25px;
                width: 40px;
                height: 40px;
              "
              @click="swichPlayStatus(0)"
            />

            <img
              v-else
              src="../..\public\imgs\playMusic.png"
              alt=""
              style="
                border-radius: 100%;
                cursor: pointer;
                margin-left: 25px;
                width: 40px;
                height: 40px;
              "
              @click="swichPlayStatus(1)"
            />

            <img
              src="../..\public\imgs\next.png"
              alt=""
              style="border-radius: 100%; cursor: pointer; margin-left: 25px"
              @click="switchMusic(1)"
            />
          </div>

          <!-- 滑动条控件 -->
          <div class="slidediv">
            <span class="playtimes starttime">{{
              this.musicDuration | timeFormat
            }}</span>

            <!--音乐播放进度条-->
            <el-slider
              v-model="musicDuration"
              :max="totalDuration"
              :show-tooltip="false"
              @change="musicDurationChange"
            ></el-slider>

            <span class="playtimes stoptime">{{
              totalDuration | timeFormat
            }}</span>
          </div>
        </div>

        <!--歌单、音量控制-->
        <div class="volumediv">
          <el-popover
            placement="top"
            width="400"
            title="播放列表"
            trigger="click"
          >
            <el-table :data="playListInfo" stripe @row-dblclick="playMusic">
              <el-table-column
                property="artist"
                label="歌手"
                width="80"
              ></el-table-column>
              <el-table-column
                label="歌曲名"
                property="songName"
              ></el-table-column>
              <el-table-column label="时长" width="80">
                <template slot-scope="scope">
                  {{ (scope.row.dt / 1000) | timeFormat }}
                </template>
              </el-table-column>
            </el-table>
            <img
              slot="reference"
              style="cursor: pointer"
              src="imgs/songList.png"
              alt=""
            />
          </el-popover>
          <img
            src="imgs/laba.png"
            v-if="silentflag == false"
            class="laba"
            slot="reference"
            style="cursor: pointer"
            @click="silentflag = !silentflag"
          />

          <img
            src="imgs/shutUp.png"
            v-else
            alt=""
            class="laba"
            slot="reference"
            style="cursor: pointer"
            @click="silentflag = !silentflag"
          />
          <el-slider
            v-model="musicVolume"
            :show-tooltip="false"
            @change="changeVolume"
          >
          </el-slider>
        </div>
      </el-footer>
      <audio
        :src="musicUrl"
        autoplay
        class="playMusicAudio"
        ref="audio"
      ></audio>
    </el-container>

    <!-- 登录对话框 -->
    <el-dialog
      title="网易云账户登录"
      :visible.sync="loginDialogVisible"
      width="300px"
    >
      <div class="logindialog">
        <img src="imgs/loginDialog.png" alt="" @click="tianru" />
        <el-form
          :model="loginInfo"
          :rules="loginInfoRules"
          ref="loginRef"
          label-width="0px"
        >
          <el-form-item prop="phone">
            <el-input
              style="display: block; margin: 0 auto; width: 100%"
              prefix-icon="el-icon-user"
              v-model="loginInfo.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              style="display: block; margin: 0 auto; width: 100%"
              prefix-icon="el-icon-user"
              v-model="loginInfo.password"
              placeholder="请输入手机号"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          style="
            background-color: red;
            width: 80%;
            display: block;
            margin: 0 auto;
          "
          @click="login"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default ({
  data () {
    return {
      // 搜索框内容
      searchInput: '',
      //播放音乐的链接
      musicUrl: '',
      //当前音乐详情对象
      music: {
        name,
        al: {
          picUrl: ''
        },
        ar: [
          {
            name: ''
          }
        ]
      },
      //当前音乐的进度条
      musicDuration: 0,
      //当前音乐的id
      curId: 0,
      //总进度条
      totalDuration: 0,
      //音乐的音量
      musicVolume: 100,
      //默认是否在播放
      isPlay: false,
      //播放列表
      playListInfo: [],
      //当前播放的歌单的所有歌曲的url和其他信息
      currentMusicListInfo: [],
      //当前播放的歌单的id
      songListInfo: [],
      // 展示右边的歌单对话框
      showRightPlayListDialog: false,
      //展示登录的对话框
      loginDialogVisible: false,
      //登录的信息
      loginInfo: {
        phone: '',
        password: ''
      },
      //登录的校验规则
      loginInfoRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      //当前用户的用户信息
      currentUserInfo: window.localStorage.getItem('currentUserInfo') === 'null' ? null : JSON.parse(window.localStorage.getItem('currentUserInfo')),
      //当前用户的歌单
      currentUserPlayList: [],
      //搜索条件
      searchData: '',
      // 侧边栏大小
      asideHeight: '800px',
      // 静音标识
      silentflag: false
    }
  },
  created () {
    if (this.currentMusicListInfo !== null) {
      this.getUserPrivatePlayList()
    }
    if (this.$store.state.playingId.length !== 0) {
      this.getSongDetail()
    }
  },
  methods: {
    // 返回首页
    backHome () {
      this.$router.push('/home')
    },

    //查询用户私人歌单
    getUserPrivatePlayList () {
      this.$http.get('user/playlist', { params: { uid: this.currentUserInfo.userId } }).then(r => {
        console.log(r);
        this.currentUserPlayList = r.data.playlist
        sessionStorage.setItem('userPlayList', JSON.stringify(this.currentUserPlayList))
      }).catch(err => err)
    },

    // 弹出登录框
    loginDialog () {
      this.loginDialogVisible = true
    },

    // 登录网易云
    login () {
      this.$refs.loginRef.validate(valid => {
        if (!valid) return this.$message.error('请填写正确的信息')
        this.$http.get('login/cellphone', { params: this.loginInfo }).then(res => {
          if (res.status !== 200) return this.$message.error('登陆失败,请检查登录信息!')
          //保存cookie的信息
          window.localStorage.setItem('musicCookie', res.data.cookie)
          //保存用户信息,退出时删除
          window.localStorage.setItem('currentUserInfo', JSON.stringify(res.data.profile))
          //放入用户的信息
          this.currentUserInfo = res.data.profile

          this.getUserPrivatePlayList()

          //隐藏弹窗
          this.loginDialogVisible = false
        })
      })
    },

    // 退出登录
    logout () {
      this.$http.get('logout').then(() => {
        //当前用户信息设置为null
        this.currentUserInfo = null
        //存储用户信息的localstorage设置为null
        window.localStorage.setItem('currentUserInfo', null)
        //查询出来的用户私人歌单设置为空
        this.currentUserPlayList = []
      })
    },

    // 获取音乐详情
    getSongDetail () {
      let playingId = this.$store.state.playingId
      this.$http.get(`/song/detail?ids=${playingId}`).then(res => {
        this.music = res.data.songs[0]
      })
      this.$http.get(`/song/url?id=${playingId}`).then(res => {
        this.musicUrl = res.data.data[0].url
        this.getMusicInfo()
      })
      this.getPlayListInfo()
    },

    // 获取页面右下角播放列表
    getPlayListInfo () {
      this.playListInfo = [...this.$store.state.playingList]
      this.playListInfo.map(item => {
        if (item.ar) {
          item.artist = item.ar[0].name
          item.songName = item.name
          item.songId = item.id
          item.id = item.songId
        }
      })
      console.log(this.playListInfo);
    },

    // 获取播放信息
    getMusicInfo () {
      let audio = document.querySelectorAll('.playMusicAudio')[0]
      audio.addEventListener("timeupdate", () => {
        if (!audio.duration) return this.isPlay = false
        this.totalDuration = audio.duration | '00:00'
        this.musicDuration = audio.currentTime | '00:00'
        if (this.totalDuration === '00:00' && this.$store.playingId) {
          this.$message.error('该首无法播放')
        }
        //当前歌曲播放完毕自动播放下一首
        if (audio.currentTime >= audio.duration) {
          this.switchMusic(1)
        }
      })
      this.isPlay = true
    },

    // 拖动条变化
    musicDurationChange () {
      // let audio = document.querySelector('.playMusicAudio')
      let audio = this.$refs.audio
      audio.currentTime = this.musicDuration

    },

    // 切歌
    switchMusic (num) {
      this.$store.commit('switchsong', num)
      this.getSongDetail()
    },

    // 切换播放状态
    swichPlayStatus (num) {
      let audio = document.querySelector('.playMusicAudio')
      console.log(audio);
      if (!num) {
        audio.pause()
      } else {
        audio.play()
      }
      this.isPlay = !this.isPlay
    },

    // 音量控制
    changeVolume () {
      let audio = this.$refs.audio
      audio.volume = this.musicVolume / 100
    },

    // 播放列表歌曲
    playMusic (song) {
      console.log(song);
      this.$store.commit('addPlayingList', { song: song, isPlay: true })
      this.getSongDetail()
    },


    // 自动填入！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    tianru () {
      this.loginInfo = {
        phone: 15307470613,
        password: 'LuoJiahao970327'
      }
    }
  },
  watch: {
    loginDialogVisible (n) {
      if (!n) {
        this.$refs.loginRef.resetFields()
      }
    },
    musicVolume (n) {
      if (!n) {
        this.silentflag = true
      } else {
        this.silentflag = false
      }
    }
  }
})
</script>

<style scoped>
#index {
  height: 100%;
}
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.shuiping {
  display: flex;
  flex-grow: 1;
  padding: 60px 0 85px;
}

.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
  z-index: 99999;
}
.el-footer {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  padding: 0;
  justify-content: space-between;
  background-color: rgb(246, 246, 248);
  height: 85px !important;
}
.el-header {
  justify-content: space-between;
  background-color: rgb(236, 65, 65);
  color: #fff;
  position: fixed;
  width: 100%;
  z-index: 500;
}
.el-header div {
  display: inline-block;
  height: 100%;
}
.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  overflow: hidden;
  overflow-y: auto;
  border-right: 1px solid rgb(230, 230, 230);
}
.search .el-input__inner {
  background-color: rgb(225, 62, 62) !important;
}
.el-main {
  background-color: #fff;
  color: #333;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-header img {
  height: 20px;
  vertical-align: middle;
}
.logoText {
  font-size: 18px;
  font-weight: 800;
}
.logo {
  float: left;
  cursor: pointer;
}
.logo img {
  border-radius: 25%;
  margin-top: -5px;
}
.logo span {
  margin-left: 8px;
}
.search {
  margin-left: 60px;
  float: left;
}
.searchBtn {
  opacity: 0;
  position: absolute;
  float: right;
  width: 1px;
  height: 24px;
  left: -3px;
  margin-top: 15px !important;
  border-radius: 60%;
}
.login {
  position: absolute;
  left: 80%;
  font-weight: 800;
  color: #fff;
}
.logina {
  margin-left: 8px;
  background-color: rgb(236, 65, 65);
  border: none;
  color: #fff;
  cursor: pointer;
}
.nickname {
  margin-left: 8px;
}

.logoutBtn {
  margin-left: 8px;
}
.login img {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.logindialog {
  text-align: center;
}
.userIcon_unlogin {
  cursor: pointer;
  border-radius: 30%;
}
.el-menu-item.is-active {
  color: black;
  border-left: 2px solid red !important;
}
/* 主题系列 */
.redTheme {
  color: red;
}

/* 脚部歌曲信息 */
.musicPic {
  display: flex;
  width: 200px;
}
.musicPic img {
  width: 55px;
  height: 55px;
  margin: 11px 10px;
  border-radius: 10px;
}
.musicPic div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 12px;
}
.musicPic p {
  text-align: left;
  margin: 0;
  margin-top: 17px;
  height: 15px;
  font-size: 15px;
  line-height: 15px;
  white-space: nowrap;
}

/* 播放控件 */
.playitems {
  margin-top: 8px;
  height: 40px;
}
.slidediv {
  width: 450px;
  position: relative;
}
.slidediv .el-slider {
  width: 75%;
  margin: auto;
}
.playtimes {
  position: absolute;
  height: 30px;
  line-height: 30px;
  top: 10%;
}
.starttime {
  left: 0;
}
.stoptime {
  right: 0;
}

/* 音量区域 */
.volumediv {
  width: 200px;
  display: flex;
  align-items: center;
}
.volumediv img {
  width: 20px;
  height: 20px;
  margin-right: 15px;
}
.volumediv .el-slider {
  width: 100px;
}
</style>
