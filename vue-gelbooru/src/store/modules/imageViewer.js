import {
  get_posts_tags,
  favorite,
  unfavorite
} from '../../api'

import {
  message as msgBox
} from '../../hooks/useMessageTip'

export default {
  namespaced: true,
  state: {
    showImageViewer: false,
    image: {},
    index: 0
  },
  mutations: {
    closeImageViewer(state) {
      state.showImageViewer = false;
    },
  },
  actions: {
    async setImage({
      state
    }, payload) {
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
    async addPostToFavorite(context, {
      favorited,
      image_id
    }) {
      const func_map = {
        true: unfavorite,
        false: favorite,
      };

      const {
        message,
        code
      } = await func_map[favorited](image_id);

      msgBox(message, '', 1500);

      return code === 200;
    },
  },
}
