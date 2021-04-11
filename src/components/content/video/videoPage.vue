<template>
  <div class="videoContainer">
    <div class="head">
      <!-- 导航条 -->
      <el-menu
        :default-active="defaultTag"
        mode="horizontal"
        class="menu"
        :router="true"
      >
        <el-menu-item @click="changeDefault()" index="/video"
          >视频</el-menu-item
        >
        <el-menu-item @click="changeDefault()" index="/mv">MV</el-menu-item>
      </el-menu>
    </div>

    <!-- 内容区域 -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default ({
  data () {
    return {
      // 导航条高亮
      defaultTag: '/video'
    }
  },
  created () {
    this.changeDefault()
  },
  methods: {
    // 
    changeDefault () {
      this.defaultTag = this.$route.path
    }
  }
})
</script>

<style scoped>
.videoContainer {
  max-width: 1400px;
  width: 90%;
  margin: auto;
  margin-top: 15px;
}
.head {
  margin-bottom: 20px;
}
.el-menu {
  border: 0;
  font-weight: 800;
}
.el-menu-item {
  width: auto !important;
  font-size: 18px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid rgb(236, 65, 65);
}
.el-button.is-round {
  padding: 5px 18px !important;
}
</style>
