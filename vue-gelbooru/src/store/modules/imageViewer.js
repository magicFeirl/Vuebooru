import {
  get_posts_tags
} from '../../api'

export default {
  namespaced: true,
  state: {
    showImageViewer: false,
    image: {},
    index: 0
  },
  mutations: {
    async setImage(state, payload) {
      const {
        index,
        image
      } = payload;

      if (!image.cached) {
        const {
          data
        } = await get_posts_tags(image.id);
        image.tags = data.tags;
        image.favorited = data.favorited;
        image.cached = true;
      }

      state.image = image;
      state.index = index;
      state.showImageViewer = true;
    },
    closeImageViewer(state) {
      state.showImageViewer = false;
    }
  },
}
