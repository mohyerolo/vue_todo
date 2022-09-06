import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
            arr.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
    return arr;
  },
};

//const로 설정하는 순간 store를 밖에서 사용할 수 있음.
export const store = new Vuex.Store({
  state: {
    // headerText: 'TODO it!',
    todoItems: storage.fetch()
  }
})