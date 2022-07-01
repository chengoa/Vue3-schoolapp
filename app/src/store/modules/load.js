const state = () => ({
  loading: false,
  loadingMoments: false,
  isFabulous:null
})

const mutations = {
  updateLoad(state, num) {
    state.loading = num
    state.loadingMoments = num
  },
  changeisfabulous(state,index) {
    state.isFabulous = index
  }
  
}

const actions = {
  changeisfabulous(context,index) {
    context.commit("changeisfabulous",{...index})
    console.log("jevn",context.state.isFabulous)

  }
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}