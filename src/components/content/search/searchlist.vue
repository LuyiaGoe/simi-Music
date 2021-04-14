<template>
  <div>list</div>
</template>
 
<script>
export default {
  props: ['list'],
  data () {
    return {}
  },
  created () {
    this.listInfo = this.list
    console.log(this.listInfo);
  },
  methods: {

  },
  watch: {
    list (n) {
      console.log(n);
    }
  }
}
</script>

<style scoped>
</style>