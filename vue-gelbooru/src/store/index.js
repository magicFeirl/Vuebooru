import {
  createStore
} from 'vuex'

import {
  imageViewer
} from './modules';

const store = createStore({
  state: {
    search: '',
  },
  mutations: {
    search(state, keyword) {
      state.search = keyword;
    }
  },
  modules: {
    imageViewer
  }
})

export default store
