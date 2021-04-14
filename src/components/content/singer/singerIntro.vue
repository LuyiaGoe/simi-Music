<template>
  <div>
    <!-- 简介部分 -->
    <h2>{{ sn }}简介</h2>
    <p>{{ briefDesc }}</p>
    <br />
    <!-- 其他 -->
    <div v-for="(item, index) in introduction" :key="index">
      <h2>{{ item.ti }}</h2>
      <p v-for="(item1, index) in item.txt.split('●')" :key="index">
        {{ item1 }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['singerIntro', 'singername'],
  data () {
    return {
      briefDesc: '',
      introduction: [],
      sn: '',
      daibiaozuopin: [],
      lichengbei: []
    }
  },
  created () {
    this.briefDesc = this.singerIntro.briefDesc
    this.introduction = this.singerIntro.introduction
    this.sn = this.singername
    this.deli()
  },
  methods: {
    // 分割字符
    deli () {
      this.daibiaozuopin = this.introduction[0].txt.split('。')
      this.lichengbei = this.introduction[1].txt.split('。')
    }
  },
  watch: {
    singerIntro (n) {
      this.briefDesc = n.briefDesc
      this.introduction = n.introduction
      this.deli()
    },
    singername (n) {
      this.sn = n
    }
  }
}
</script>

<style scoped>
p {
  text-indent: 2em;
}
</style>