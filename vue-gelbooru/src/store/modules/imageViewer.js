export default {
  namespaced: true,
  state: {
    showImageViewer: false,
    image: {},
    index: 0
  },
  mutations: {
    setImage(state, payload) {
      const {
        index,
        image
      } = payload;
      state.image = image;
      state.index = index;
      state.showImageViewer = true;
    },
    closeImageViewer(state) {
      state.showImageViewer = false;
    }
  },
}
