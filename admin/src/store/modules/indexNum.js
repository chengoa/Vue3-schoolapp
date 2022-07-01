const state = () => ({
  user:Number,
  health:Number,
  activity:Number
})

const mutations = {
  user(state,item){
    state.user += item
    console.log(store)
  },
  changeuser(state) {
    state.user += 1
  },
  changehealth(state) {
    state.health += 1
  },
  changeactivity(state) {
    state.activity += 1
  }
  
}

const actions = {

}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}