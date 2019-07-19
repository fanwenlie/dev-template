const userList = {
  state: {
    userid: ''
  },
  mutations: {
    CHANGE_USERID (state, userid) {
      state.userid = userid
    }
  }
}

export default userList