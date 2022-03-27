import {
  createStore
} from 'vuex'

import {
  imageViewer
} from './modules';

const store = createStore({
  state: {
    search: '',
    posts: [],
    currentImageIndex: 0,
  },
  mutations: {
    search(state, keyword) {
      state.search = keyword;
    },
    updatePosts(state, posts) {
      state.posts = posts;
    },
    setCurrentImageIndex(state, index) {
      state.currentImageIndex = index;
    },
    incCurrentImageIndex(state, value) {
      const result = state.currentImageIndex + value;
      if (result >= 0 && result < state.posts.length) {
        state.currentImageIndex = result;
      }
    },
  },
  getters: {
    currentImage(state) {
      return state.posts[state.currentImageIndex];
    }
  },
  modules: {
    imageViewer
  }
})

export default store
