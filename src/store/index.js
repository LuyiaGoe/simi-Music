import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 正在播放的歌单
    playingList: [],
    // 正在播放的歌曲id
    playingId: 1815684465
  },
  mutations: {
    // 切换歌曲  需改
    switchsong (state, params) {
      state.playingList.some((item, index) => {
        if (item.id == state.playingId) { // 查找到要切换的歌，首先匹配到当前的歌
          let switchIndex = 0
          if (index + params == -1) {
            switchIndex = state.playingList.length - 1
          } else if (index + params == state.playingList.length) {
            switchIndex = 0
          } else {
            switchIndex = index + params
          }
          let target = state.playingList[switchIndex] // 再根据index+params锁定它在歌单的位置
          state.playingId = target.id
          return true
        }
      })
    },

    // 切换歌单
    switchPlayingList (state, newList) {
      state.playingList = newList
      // 切换完后立马置换正在播放的歌曲  为新歌单的第一首
      state.playingId = newList[0].id
    },

    // 往歌单内添加歌曲
    addPlayingList (state, params) {
      state.playingList.some((item, index) => {
        if (item.歌曲id == state.playingId) {
          // 新建一个歌单，将正在播放的歌曲前面的歌，放入并push新歌
          let newList = state.playingList.slice(0, index + 1)
          state.playingList = newList.push(params).concat(state.playingList.slice(index + 1))
          return true
        }
      })
    }
  },
  actions: {
  },
  getters: {
    playingIdurl (state) {
      return state.playingId
    }

  },
  modules: {
  }
})
