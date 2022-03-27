export default {
  namespaced: true,
  state: {
    showImageViewer: false,
    image: {}
  },
  mutations: {
    showImageViewer(state, image) {
      state.showImageViewer = true;
      state.image = image;
    },

    closeImageViewer(state) {
      state.showImageViewer = false;
      state.image = {};
    }
  }
}
