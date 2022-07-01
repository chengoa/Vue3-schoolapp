import {
  areaAxios
} from "@/utils/request.js"
import {setCacheVal} from "@/utils/LocalStorageKit.ts"

const state = {
  news:[],
  high:[],
  mid:[]
}

const mutations = {
  setNews(state,item){
    state.news = item
    setCacheVal("news",JSON.stringify(item))
  },
  setHigh(state,item){
    state.high = item
    setCacheVal("high",JSON.stringify(item))

  },
  setMid(state,item){
    state.mid = item
    setCacheVal("mid",JSON.stringify(item))

  }
}

const actions = {
  setNews(context,item){
    context.commit("setNews",item)
  },
  setHigh(context,item){
    context.commit("setHigh",item)
  },
  setMid(context,item){
    context.commit("setMid",item)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}