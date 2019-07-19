import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import userList from './modules/userList'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    userList
  },
  getters
})

export default store
