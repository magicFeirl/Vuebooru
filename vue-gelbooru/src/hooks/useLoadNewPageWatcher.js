import {
  ref,
  watch
} from 'vue'

import {
  get_posts
} from '../api'


export default function (pid, search, posts) {
  let loading = ref(false);
  let has_more = ref(true);

  watch(
    [pid, search],
    (newValues, oldValues) => {
      // 搜索发生变化
      if (oldValues[1] !== undefined && newValues[1] !== oldValues[1]) {
        pid.value = 0;
        posts.value = [];
        has_more.value = true;
      }

      if (pid.value === 0) {
        if (search.value) {
          document.title = decodeURIComponent(search.value) + ' - Vuebooru';
        } else {
          document.title = 'Vuebooru'
        }
      }

      if (!has_more.value) {
        return;
      }

      loading.value = true;
      get_posts(pid.value, search.value).then((data) => {
        if (pid.value === 0) {
          posts.value = data['data'];
        } else {
          // posts.value = data['data'];
          const res_posts = data['data'];

          if (res_posts.length === 0) {
            has_more.value = false;
            return;
          }
          posts.value.push(...res_posts);
        }
      }).finally(() => {
        loading.value = false;
      });
    }, {
      immediate: true,
    }
  );

  return [loading, has_more]
}
