<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in mvList" :key="index">
        <el-col>
          <img
            :src="item.imgurl"
            alt=""
            class="pic"
            @click="toMvPage(item.id)"
          />
        </el-col>
        <p @click="toMvPage(item.id)">{{ item.name }}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['singermv'],
  data () {
    return {
      mvList: []
    }
  },
  created () {
    this.mvList = this.singermv
  },
  methods: {
    toMvPage (id) {
      this.$router.push(`/videoPlayPage/${id}`)
    }
  },
  watch: {
    singermv (n) {
      this.mvList = n
    }
  }
}
</script>

<style scoped>
.pic {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 3px gray;
  cursor: pointer;
}
p {
  margin: 5px;
  font-size: 12px;
  cursor: pointer;
}
.el-col {
  margin-bottom: 12px;
}
</style>