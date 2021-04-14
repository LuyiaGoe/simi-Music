import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 正在播放的歌单,歌单中不应有重复的歌曲
    playingList: new Set(),
    // 正在播放的歌曲id
    playingId: '',
    // 正播放的index
    playingIndex: 0
  },
  mutations: {
    // 切换歌曲
    switchsong (state, params) {
      let arr = Array.from(state.playingList)
      arr.some((item, index) => {
        if (item.id == state.playingId) { // 查找到要切换的歌，首先匹配到当前的歌
          let switchIndex = 0
          if (index + params == -1) {
            switchIndex = arr.length - 1
          } else if (index + params == arr.length) {
            switchIndex = 0
          } else {
            switchIndex = index + params
          }
          let target = arr[switchIndex] // 再根据index+params锁定它在歌单的位置
          state.playingId = target.id
          return true
        }
      })
    },

    // 切换歌单
    switchPlayingList (state, newList) {
      state.playingList = new Set(newList)
      // 切换完后立马置换正在播放的歌曲  为新歌单的第一首
      state.playingId = newList[0].id
    },

    // 往歌单内添加歌曲,isPlay与否决定是否立即播放,concat与否决定是否添加在当前歌单后面
    addPlayingList (state, params) {
      let arr = [...state.playingList]
      if (params.concat) { // 目前只是歌单页面中那个大红色的 + 按钮会触发
        if (state.playingList.size == 0) { // 若目前歌单为空，则将传入歌单推入
          arr = arr.concat(params.list)
          state.playingId = params.list[0].id
        } else {
          arr = arr.concat(params.list) // 不为空则在当前歌单后面接上传入歌单
        }
      } else {
        if (state.playingList.size == 0) {
          arr.push(params.song)
          state.playingId = params.song.id
        } else {
          arr.some((item, index) => {
            if (item.id == state.playingId) {
              // 新建一个歌单，将正在播放的歌曲前面的歌截取放一个新的列表中，并push新歌
              arr.splice(index + 1, 0, params.song)
              return true
            }
          })
        }
      }
      state.playingList = new Set(arr)
      if (params.isPlay) {
        state.playingId = params.song.id
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
