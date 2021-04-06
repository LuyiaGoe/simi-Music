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
            suffix-icon="el-icon-search"
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
            <a
              href="javascript:void 0"
              @click="loginDialogVisible = true"
              class="logina"
              >登录</a
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
              <el-menu-item index="/video">视频</el-menu-item>
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
                    v-if="!item.subscribed"
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
                    v-if="item.subscribed"
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
          <router-view></router-view>
        </el-main>
      </div>

      <!-- 底部区域 -->
      <el-footer>
        <div class="musicPic">
          <img src="../..\public\imgs\userIcon.png" alt="" />
          <div>
            <p>歌曲名</p>
            <p>歌手</p>
          </div>
        </div>
        <!-- 进度条组件 -->
        <el-row
          style="
            border-top: 1px solid rgb(230, 230, 230);
            background-color: white;
          "
        >
          <!--一首 暂停 下一首控件-->
          <el-col :span="2.5">
            <img
              src="../..\public\imgs\prev.png"
              alt=""
              style="border-radius: 100%; cursor: pointer"
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
            />

            <img
              src="../..\public\imgs\next.png"
              alt=""
              style="border-radius: 100%; cursor: pointer; margin-left: 25px"
            />
          </el-col>

          <el-col style="position: relative" :span="12" :offset="2">
            <!--秒数通过 过滤器处理成看得懂的样式-->
            <span style="position: absolute; top: 11px; left: -10px">{{
              this.musicDuration | timeFormat
            }}</span>

            <!--音乐播放进度条-->
            <el-slider
              v-model="musicDuration"
              :max="totalDuration"
              :show-tooltip="true"
            ></el-slider>

            <span style="position: absolute; left: 94%; bottom: 25%">{{
              totalDuration | timeFormat
            }}</span>
          </el-col>

          <el-col :span="5" style="position: relative" :offset="1">
            <!--音量控制-->
            <img
              src="imgs/laba.png"
              v-if="musicVolume !== 0"
              alt=""
              class="laba"
            />

            <img src="imgs/shutUp.png" v-else alt="" class="laba" />

            <img
              src="imgs/songList.png"
              alt=""
              style="position: absolute; top: 10px; right: 9%; cursor: pointer"
            />

            <el-slider
              v-model="musicVolume"
              :show-tooltip="false"
              style="width: 40%"
            >
            </el-slider>
          </el-col>
        </el-row>

        <audio :src="musicUrl" autoplay class="playMusicAudio"></audio>
      </el-footer>
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
      musicVolume: 20,
      //默认是否在播放
      isPlay: false,
      //播放列表
      playListInfo: window.localStorage.getItem('playList') === null ? [] : window.localStorage.getItem('playList').split(','),
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
      asideHeight: '800px'
    }
  },
  created () {
    if (this.currentMusicListInfo !== null) {
      this.getUserPrivatePlayList()
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
        this.currentUserPlayList = r.data.playlist
        console.log(r)
      })
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
          console.log(res)
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
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-footer {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  padding: 0;
  justify-content: space-between;
}
.el-header {
  justify-content: space-between;
}
.el-header div {
  display: inline-block;
  height: 100%;
}
.el-aside {
  padding-bottom: 60px;
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  overflow: hidden;
  overflow-y: auto;
}

.el-main {
  background-color: #e9eef3;
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
  text-decoration: none;
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

/* 主体系列 */
.redTheme {
  color: red;
}
</style>
