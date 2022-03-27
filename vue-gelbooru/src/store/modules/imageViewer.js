export default {
  namespaced: true,
  state: {
    showImageViewer: false
  },
  mutations: {
    showImageViewer(state) {
      state.showImageViewer = true;
    },
    closeImageViewer(state) {
      state.showImageViewer = false;
    }
  },
  getters: {
    image(state, getters, rootState, rootGetters) {
      return rootGetters.currentImage;
    }
  }
}
