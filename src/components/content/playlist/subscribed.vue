<template>
  <div>
    <div v-if="subscribInfo.length == 0" class="nosubscriber">
      <p>暂无收藏者</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      subscribInfo: {}
    }
  },
  created () {
    this.getScrib()
  },
  methods: {
    getScrib () {
      this.$http.get('/playlist/subscribers', { params: { id: this.$route.params.id } }).then(res => {
        this.subscribInfo = res.data.subscribers
      })
    }
  }
}
</script>

<style scoped>
.nosubscriber {
  text-align: center;
  color: gray;
  font-size: 15px;
}
</style>