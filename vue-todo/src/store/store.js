import Vue from 'vue'
import Vuex from 'vuex'
import todoApp from './modules/todoApp'

Vue.use(Vuex)


//const로 설정하는 순간 store를 밖에서 사용할 수 있음.
export const store = new Vuex.Store({
  modules: {
    todoApp
  }
});