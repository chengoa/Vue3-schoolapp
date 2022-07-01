const state = () => ({
  // avatar:'',
  // followers: '',
  // grade: '',
  // likes: '',
  // moments: '',
  // name: '',
  // nickname:'',
  // sex: '',
  user: {},
  avatar:''

})

const mutations = {
  saveUser(state, item) {
    state.user = item
  },
  setAvatar(state,item) {
    state.avatar = item
  }
  
}

const actions = {
  alterAvatar(context, item) {
    console.log(context)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}